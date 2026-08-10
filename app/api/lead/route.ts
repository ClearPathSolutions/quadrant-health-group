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

function resolveOrigin(req: Request): string {
  const o = req.headers.get("origin");
  if (o) return o; // must be an allowlisted origin
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return host ? `${proto}://${host}` : "";
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

  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const email = String(data.email || "").trim();
  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a phone or email are required." },
      { status: 422 }
    );
  }

  const origin = resolveOrigin(req);
  const text =
    `New website lead\n\n` +
    (
      [
        ["Name", name],
        ["Phone", phone],
        ["Email", email],
        ["Who needs help", data.who],
        ["Message", data.message],
        ["Source page", data.page_url],
      ] as [string, unknown][]
    )
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

  // F-02 / F-05 — when Clarion rejects or is unreachable the lead is NOT
  // captured anywhere. Two rules follow:
  //   1. Never report success we did not get. The response carries
  //      `delivered: false` and the form routes the visitor to the phone line
  //      instead of showing the thank-you state.
  //   2. Never write the lead itself to the log. Name, phone, email and the
  //      free-text message are health-related information and Vercel runtime
  //      logs are not a covered store. Only a correlation ref and the shape of
  //      the failure are logged, so `[lead] NOT DELIVERED` can be alerted on.
  // Still outstanding: a durable fallback (transactional email or webhook) so a
  // rejected lead is retained rather than only surfaced to the visitor.
  const ref = randomUUID().slice(0, 8);
  const logFailure = (why: string) =>
    console.error(
      `[lead] NOT DELIVERED ref=${ref} reason=${why} origin=${origin} ` +
        `hasPhone=${!!phone} hasEmail=${!!email} hasMessage=${!!data.message}`
    );

  const headers = {
    "Content-Type": "application/json",
    Origin: origin,
    "User-Agent": BROWSER_UA,
  };

  try {
    const s = await fetch(`${CLARION_API}/webchat/public/session`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        site_key: SITE_KEY,
        visitor_session_id: randomUUID(),
        page_url: data.page_url || origin,
        referrer: data.referrer || "",
        user_agent: req.headers.get("user-agent") || BROWSER_UA,
        utm: data.utm || {},
        gclid: data.gclid || "",
      }),
    });
    if (!s.ok) {
      logFailure(`session_${s.status}`);
      return NextResponse.json({ ok: true, delivered: false, ref });
    }

    const { conversation_id, visitor_token } = await s.json();
    const m = await fetch(`${CLARION_API}/webchat/public/messages`, {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${visitor_token}` },
      body: JSON.stringify({ client_msg_id: randomUUID(), text }),
    });
    if (!m.ok) {
      logFailure(`messages_${m.status}`);
      return NextResponse.json({ ok: true, delivered: false, ref });
    }

    console.log(`[lead] delivered ref=${ref} conversation=${conversation_id}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    logFailure(`exception_${(e as Error)?.name || "unknown"}`);
    return NextResponse.json({ ok: true, delivered: false, ref });
  }
}
