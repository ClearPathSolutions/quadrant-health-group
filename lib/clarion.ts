// Server-side accessors for Clarion-managed blog posts.
//
// Clarion posts are fetched as data (not via the client embed script) so they
// can be merged with the native posts and share the same list/detail rendering.
// These functions run on the server only — they call Clarion's public API
// directly (server-to-server, so no CORS concern) and are cached by Next's
// fetch cache for a short window.
import "server-only";
import type { Post } from "./content";

const CLARION_API = process.env.CLARION_API || "https://api.clarionlabs.ai";
const CLARION_SITE_KEY =
  process.env.NEXT_PUBLIC_CLARION_SITE_KEY ||
  "cpx_-vOkPf-M2Zq1tmLgDgXOFblwF1FOh4sC";

// Clarion's edge blocks Node's default User-Agent, so present a browser UA.
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

// Revalidate the feed roughly every 5 minutes.
const REVALIDATE_SECONDS = 300;

type ClarionFeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  author_name?: string;
  published_at: string;
};

type ClarionFullPost = ClarionFeedPost & { body_html: string };

/** A blog post plus everything needed to render a Clarion post's HTML body. */
export type ClarionPost = Post & {
  source: "clarion";
  bodyHtml: string;
};

function feedToPost(p: ClarionFeedPost): Post & { source: "clarion" } {
  return {
    slug: p.slug,
    title: p.title,
    // Normalize to the YYYY-MM-DD prefix the native posts use.
    date: (p.published_at || "").slice(0, 10),
    excerpt: p.excerpt || "",
    image: p.cover_image_url || null,
    // No structured sections for Clarion posts — the HTML body is the content.
    // A single empty section keeps readingTime()/section maps from throwing.
    sections: [],
    source: "clarion",
  };
}

async function clarionFetch(path: string, params: Record<string, string>) {
  const qs = new URLSearchParams({ site_key: CLARION_SITE_KEY, ...params });
  const res = await fetch(`${CLARION_API}/${path}?${qs}`, {
    headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Clarion ${path} → ${res.status}`);
  return res.json();
}

/**
 * All Clarion-managed posts as list items. Returns [] on any failure so the
 * blog page still renders the native posts if Clarion is unreachable.
 */
export async function getClarionPosts(): Promise<
  (Post & { source: "clarion" })[]
> {
  try {
    const data = (await clarionFetch("blog/public/feed", {})) as {
      posts?: ClarionFeedPost[];
    };
    return (data.posts || []).map(feedToPost);
  } catch {
    return [];
  }
}

/** A single Clarion post with its HTML body, or null if not found/unreachable. */
export async function getClarionPost(slug: string): Promise<ClarionPost | null> {
  try {
    const data = (await clarionFetch("blog/public/post", { slug })) as
      | ClarionFullPost
      | { error: string };
    if (!("body_html" in data) || !data.slug) return null;
    return { ...feedToPost(data), bodyHtml: data.body_html };
  } catch {
    return null;
  }
}
