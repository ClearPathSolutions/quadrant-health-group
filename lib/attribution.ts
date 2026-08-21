/**
 * First-touch campaign attribution + CallTrackingMetrics identity.
 *
 * Why this exists: attribution used to be read from `location.search` at submit
 * time. A visitor who lands on an ad and then reads two pages before filling in
 * a form arrives with a clean URL, so the lead files as direct traffic. The
 * record still looks populated — name, phone, landing page all present — which
 * is why it goes unnoticed. It shows up only as paid spend that appears to
 * convert at zero.
 *
 * So: capture the campaign on the FIRST pageview, keep it, and send it
 * explicitly at submit time.
 *
 * `localStorage`, not `sessionStorage`: a second tab is the same visit, and the
 * click that started it can be hours old.
 */

const STORE_KEY = "qhg.attribution.first_touch.v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days, matching CTM's own cookie

/**
 * `wbraid` / `gbraid` are Google's `gclid` substitutes under iOS ATT and
 * consent mode. CTM account 264810 routes on them, so omitting them means CTM
 * attributes those clicks while Clarion cannot.
 */
const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

type FirstTouch = {
  /** Raw campaign params exactly as they arrived. */
  params: Record<string, string>;
  /** The real entry page, with its query string. */
  landing_page_url: string;
  /** External referrer only — never a previous internal page. */
  referrer: string;
  at: number;
};

function read(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as FirstTouch | null;
    if (!v || typeof v !== "object" || typeof v.at !== "number") return null;
    return Date.now() - v.at < TTL_MS ? v : null;
  } catch {
    return null; // private mode, quota, or a hand-edited value
  }
}

function write(v: FirstTouch): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(v));
  } catch {
    /* storage unavailable — attribution degrades, submission must not */
  }
}

function currentParams(): Record<string, string> {
  const found: Record<string, string> = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of CAMPAIGN_KEYS) {
      const v = q.get(k);
      if (v) found[k] = v;
    }
  } catch {
    /* ignore */
  }
  return found;
}

/** The referrer, but only when it came from outside this site. */
function externalReferrer(): string {
  try {
    const r = document.referrer || "";
    return r && r.indexOf(window.location.origin) !== 0 ? r : "";
  } catch {
    return "";
  }
}

/**
 * Idempotent. Safe to call on every pageview, and it must be — a visitor can
 * land on any of the 90-odd pages, so this runs from the root layout rather
 * than from the form, which mounts on only five of them.
 */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;

  const params = currentParams();

  // A fresh click always wins. That is a new campaign, not a continuation of
  // the old one, so the landing page and referrer are re-stamped with it.
  if (Object.keys(params).length > 0) {
    write({
      params,
      landing_page_url: window.location.href,
      referrer: externalReferrer(),
      at: Date.now(),
    });
    return;
  }

  // Otherwise only record an entry point if we have none — an organic visit
  // still needs a landing page and referrer.
  if (read()) return;
  write({
    params: {},
    landing_page_url: window.location.href,
    referrer: externalReferrer(),
    at: Date.now(),
  });
}

/**
 * CTM's visitor session id: 24 hex characters, no dashes.
 *
 * `t.js` keeps this in the first-party `__ctmid` cookie for 30 days and
 * reconciles `__ctm.config.sid` against it on load, so there is deliberately no
 * copy of our own — a stashed copy could only ever be staler.
 */
export function ctmSessionId(): string | null {
  const CTM_ID = /^[0-9a-f]{24}$/i;

  let sid: string | null = null;
  let cookieId: string | null = null;

  try {
    sid = (window as unknown as { __ctm?: { config?: { sid?: string } } }).__ctm
      ?.config?.sid ?? null;
  } catch {
    /* t.js absent or blocked */
  }
  try {
    const m = document.cookie.match(/(?:^|;\s*)__ctmid=([^;]*)/);
    cookieId = m ? decodeURIComponent(m[1]) : null;
  } catch {
    /* ignore */
  }

  if (sid && CTM_ID.test(sid)) return sid;
  if (cookieId && CTM_ID.test(cookieId)) return cookieId;

  // Never substitute the app's own session id. `null` is the correct answer
  // when CTM's id is genuinely unavailable; a UUID here is the bug it looks
  // like a fix for, because CTM files the lead against no visit either way and
  // the wrong-shaped value hides the cause.
  return sid || cookieId || null;
}

export type LeadAttribution = {
  page_url: string;
  landing_page_url: string;
  referrer: string | null;
  utm: Record<string, string> | null;
  gclid: string | null;
  ctm_visitor_sid: string | null;
};

/**
 * Everything the lead needs, resolved at submit time. `utm` is emitted in
 * Clarion's un-prefixed shape (`{source, medium, ...}`) because that is what
 * their parser already accepts from the vendor capture script.
 */
export function leadAttribution(): LeadAttribution {
  const ft = typeof window === "undefined" ? null : read();
  const p = ft?.params ?? {};

  const utm: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = p[`utm_${k}`];
    if (v) utm[k] = v;
  }

  return {
    page_url: typeof window === "undefined" ? "" : window.location.href,
    landing_page_url:
      ft?.landing_page_url ??
      (typeof window === "undefined" ? "" : window.location.href),
    referrer: ft?.referrer || null,
    utm: Object.keys(utm).length > 0 ? utm : null,
    // gclid proper, else the iOS / consent-mode substitutes.
    gclid: p.gclid || p.wbraid || p.gbraid || null,
    ctm_visitor_sid: ctmSessionId(),
  };
}
