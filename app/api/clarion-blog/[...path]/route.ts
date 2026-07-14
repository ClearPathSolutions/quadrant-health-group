import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Same-origin proxy for Clarion's public blog API.
 *
 * The blog-embed widget fetches {data-api}/blog/public/feed and
 * /blog/public/post directly from the browser, but Clarion's API doesn't
 * return CORS headers, so those requests are blocked. Pointing the embed's
 * data-api at this route makes the calls same-origin; we forward them to
 * Clarion server-side (no CORS in server-to-server calls) and relay the JSON.
 */
const CLARION_API = process.env.CLARION_API || "https://api.clarionlabs.ai";
// Clarion's edge blocks Node's default UA.
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function siteOrigin(req: Request): string {
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return host ? `${proto}://${host}` : "https://quadranthealthgroup.com";
}

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const path = (params.path || []).join("/");
  const search = new URL(req.url).search; // preserves ?site_key=…&slug=…
  const upstream = `${CLARION_API}/${path}${search}`;

  try {
    const r = await fetch(upstream, {
      headers: {
        "User-Agent": BROWSER_UA,
        Origin: siteOrigin(req),
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const body = await r.text();
    return new NextResponse(body, {
      status: r.status,
      headers: {
        "Content-Type": r.headers.get("content-type") || "application/json",
        // Safe to cache the public feed briefly at the edge.
        "Cache-Control": "public, max-age=120, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { posts: [], error: "clarion_unreachable", detail: String(e) },
      { status: 502 }
    );
  }
}
