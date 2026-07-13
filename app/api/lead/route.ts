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

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({} as Record<string, unknown>));
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

  // Never lose a lead: log it if Clarion is unreachable, still tell the visitor "ok".
  const logLead = (why: string) =>
    console.warn(`[lead] NOT delivered (${why}):`, {
      name,
      phone,
      email,
      message: data.message,
    });

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
      logLead(`session ${s.status}`);
      return NextResponse.json({ ok: true, delivered: false });
    }

    const { conversation_id, visitor_token } = await s.json();
    const m = await fetch(`${CLARION_API}/webchat/public/messages`, {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${visitor_token}` },
      body: JSON.stringify({ client_msg_id: randomUUID(), text }),
    });
    if (!m.ok) {
      logLead(`messages ${m.status}`);
      return NextResponse.json({ ok: true, delivered: false });
    }

    console.log(`[lead] delivered: ${conversation_id}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    logLead(String(e));
    return NextResponse.json({ ok: true, delivered: false });
  }
}
