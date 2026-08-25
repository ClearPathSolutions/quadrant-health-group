import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const runtime = "nodejs"; // MUST be Node, not Edge
export const dynamic = "force-dynamic";

const CLARION_API = process.env.CLARION_API || "https://api.clarionlabs.ai";
// Public site key — safe to ship. Env var wins; hardcoded fallback keeps the
// endpoint working even if the env var isn't set on a given deploy.
const SITE_KEY =
  process.env.CLARION_SITE_KEY || "cpx_-vOkPf-M2Zq1tmLgDgXOFblwF1FOh4sC";

// Clarion's edge blocks Node's default UA → you'd get a 000/connection reset.
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

/** CTM visitor session ids are 24 hex characters with no dashes. */
const CTM_ID = /^[0-9a-f]{24}$/i;

function resolveOrigin(req: Request): string {
  const o = req.headers.get("origin");
  if (o) return o; // must be an allowlisted origin
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return host ? `${proto}://${host}` : "";
}

/**
 * The CTM visitor session id, preferring the browser's value and falling back
 * to the `__ctmid` cookie.
 *
 * `__ctmid` is first-party, so it rides along on this request automatically.
 * That fallback is the point: a client-side regression cannot silently
 * un-attribute every lead, which is exactly the failure that is invisible from
 * the outside — Clarion still returns 200 and the lead still reaches a rep.
 */
function ctmVisitorSid(
  body: Record<string, unknown>,
  req: Request
): { sid: string | null; source: string } {
  const fromClient =
    typeof body.ctm_visitor_sid === "string" ? body.ctm_visitor_sid : null;
  if (fromClient && CTM_ID.test(fromClient)) {
    return { sid: fromClient, source: "client" };
  }

  const raw = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)__ctmid=([^;]*)/)?.[1];
  const fromCookie = raw ? decodeURIComponent(raw) : null;
  if (fromCookie && CTM_ID.test(fromCookie)) {
    return { sid: fromCookie, source: fromClient ? "cookie_after_bad_client" : "cookie" };
  }

  // Never substitute our own session id here. Passing a UUID through would make
  // CTM file the lead against no visit while looking like it had one.
  if (fromClient) return { sid: null, source: "unusable_client_value" };
  return { sid: null, source: "absent" };
}

// F-12 — the endpoint is unauthenticated with no throttle, so it is an open
// pipe for flooding the admissions team. In-memory and therefore per-instance:
// it blunts a naive flood but is not a substitute for edge rate limiting, which
// is the real fix before this sees production traffic.
const RATE_LIMIT = 5; // submissions per window, per IP
const RATE_WINDOW_MS = 60_000;
const MAX_BODY_BYTES = 16_000; // a legitimate lead is well under 2 KB
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude unbounded-growth guard
  return recent.length > RATE_LIMIT;
}

/** Trim a client-supplied string to something safe to forward. */
function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * Rebuild `utm` rather than passing the client's object through — this endpoint
 * is public and unauthenticated, so the shape is entirely attacker-controlled.
 */
function utm(v: unknown): Record<string, string> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const src = v as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const s = str(src[k], 200);
    if (s) out[k] = s;
  }
  return Object.keys(out).length > 0 ? out : null;
}

/* --- session sanitising -------------------------------------------------- *
 * The client sends a `session` object describing the visit. This endpoint is
 * public and unauthenticated, so that object's shape is entirely
 * attacker-controlled: it gets rebuilt from scratch rather than forwarded, and
 * every dimension that can grow is capped.
 * ------------------------------------------------------------------------- */

const SESSION_MAX_DEPTH = 4;
const SESSION_MAX_KEYS = 24;
const SESSION_MAX_ARRAY = 20;
const SESSION_MAX_STRING = 512;
const SESSION_MAX_BYTES = 4_000;

/**
 * `JSON.parse('{"__proto__": ...}')` creates a real own property, and
 * `Object.entries` will hand it back, so these are dropped by name.
 */
const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function sanitizeValue(v: unknown, depth: number): unknown {
  if (v === null) return null;
  const t = typeof v;
  if (t === "string") return (v as string).slice(0, SESSION_MAX_STRING);
  if (t === "number") return Number.isFinite(v as number) ? v : null;
  if (t === "boolean") return v;
  // Anything deeper than this is not attribution, whatever it claims to be.
  if (depth >= SESSION_MAX_DEPTH) return null;
  if (Array.isArray(v)) {
    return v
      .slice(0, SESSION_MAX_ARRAY)
      .map((x) => sanitizeValue(x, depth + 1))
      .filter((x) => x !== null);
  }
  if (t === "object") {
    const out: Record<string, unknown> = {};
    let kept = 0;
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (kept >= SESSION_MAX_KEYS) break;
      if (UNSAFE_KEYS.has(k)) continue;
      const clean = sanitizeValue(val, depth + 1);
      if (clean !== null) {
        out[k] = clean;
        kept++;
      }
    }
    return out;
  }
  return null; // functions, symbols, undefined
}

function sanitizeSession(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const clean = sanitizeValue(v, 0) as Record<string, unknown> | null;
  if (!clean || Object.keys(clean).length === 0) return null;
  // The per-field caps still allow a wide shallow object, so cap the total.
  if (JSON.stringify(clean).length > SESSION_MAX_BYTES) return null;
  return clean;
}

/**
 * Statuses worth one retry with `session` removed — the ones that plausibly
 * mean "I do not accept this field". Deliberately not every 4xx: a 403 is the
 * origin allowlist and a 429 is the throttle, and dropping a field fixes
 * neither, so retrying those would just double the traffic per lead.
 */
const RETRY_WITHOUT_SESSION = new Set([400, 409, 415, 422]);

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call us." },
      { status: 429 }
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }
  const data = (() => {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {} as Record<string, unknown>;
    }
  })();
  if (data.company) return NextResponse.json({ ok: true }); // honeypot

  const name = str(data.name, 200);
  const phone = str(data.phone, 50);
  const email = str(data.email, 200);
  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a phone or email are required." },
      { status: 422 }
    );
  }

  const origin = resolveOrigin(req);
  const visitorUa = req.headers.get("user-agent") || "";
  const { sid, source: sidSource } = ctmVisitorSid(data, req);

  // Mirrors the payload Clarion's own forms-capture.v1.js sends to this
  // endpoint, field for field. `ctm_visitor_sid` is FLAT and top-level because
  // that is where their parser looks for it — nesting it means the lead files
  // against no visit, with no error to show for it.
  const payload = {
    site_key: SITE_KEY,
    form_key: str(data.form_key, 100) || "website_lead",
    data: {
      name,
      phone,
      email,
      who: str(data.who, 200),
      message: str(data.message, 5000),
    },
    page_url: str(data.page_url, 2000) || origin,
    landing_page_url: str(data.landing_page_url, 2000) || null,
    referrer: str(data.referrer, 2000) || null,
    utm: utm(data.utm),
    gclid: str(data.gclid, 500) || null,
    ctm_visitor_sid: sid,
    user_agent: visitorUa || BROWSER_UA,
    session: sanitizeSession(data.session),
  };

  // F-02 / F-05 — when Clarion rejects or is unreachable the lead is NOT
  // captured anywhere. Two rules follow:
  //   1. Never report success we did not get. The response carries
  //      `delivered: false` and the form routes the visitor to the phone line
  //      instead of showing the thank-you state.
  //   2. Never write the lead itself to the log. Name, phone, email and the
  //      free-text message are health-related information and Vercel runtime
  //      logs are not a covered store. Only a correlation ref and the shape of
  //      the failure are logged, so `[lead] NOT DELIVERED` can be alerted on.
  //      The same rule covers attribution: `page_url` and `landing_page_url`
  //      identify a diagnosis on this site, so neither is ever logged.
  // Still outstanding: a durable fallback (transactional email or webhook) so a
  // rejected lead is retained rather than only surfaced to the visitor.
  const ref = randomUUID().slice(0, 8);
  const logFailure = (why: string) =>
    console.error(
      `[lead] NOT DELIVERED ref=${ref} reason=${why} origin=${origin} ` +
        `hasPhone=${!!phone} hasEmail=${!!email} hasMessage=${!!data.message} ` +
        `ctmSid=${sidSource}`
    );

  if (!sid) {
    // Not a failure — the lead still goes through. But it will land in CTM
    // attached to no visit, so it needs to be visible rather than silent.
    console.warn(
      `[lead] no CTM session id ref=${ref} reason=${sidSource} — ` +
        `t.js likely blocked; lead will not attach to a visit`
    );
  }

  const send = (body: unknown) =>
    fetch(`${CLARION_API}/forms/public/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Clarion pins the site key to an origin allowlist, so the relay has to
        // present the site's own origin rather than Vercel's default absence.
        Origin: origin,
        "User-Agent": visitorUa || BROWSER_UA,
      },
      body: JSON.stringify(body),
    });

  try {
    let res = await send(payload);
    let sessionDropped = false;

    // `session` is a key Clarion was never asked to accept. If their validation
    // is strict, an unknown field turns every lead into an error — and losing
    // admissions enquiries to gain attribution is not a trade worth making. The
    // lead goes through without it.
    if (!res.ok && payload.session && RETRY_WITHOUT_SESSION.has(res.status)) {
      console.warn(
        `[lead] ${res.status} with session ref=${ref} — retrying without it`
      );
      const { session: _omit, ...withoutSession } = payload;
      res = await send(withoutSession);
      sessionDropped = true;
    }

    if (!res.ok) {
      logFailure(`submit_${res.status}${sessionDropped ? "_no_session" : ""}`);
      return NextResponse.json({ ok: true, delivered: false, ref });
    }

    console.log(
      `[lead] delivered ref=${ref} form=${payload.form_key} ctmSid=${sidSource}` +
        `${sessionDropped ? " session=dropped" : ""}`
    );
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    logFailure(`exception_${(e as Error)?.name || "unknown"}`);
    return NextResponse.json({ ok: true, delivered: false, ref });
  }
}
