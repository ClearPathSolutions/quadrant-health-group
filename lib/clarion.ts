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

/** Hosts that mean "this site" in a Clarion body link. */
const OWN_HOSTS = new Set(["quadranthealthgroup.com", "www.quadranthealthgroup.com"]);

function stripNofollow(attrs: string): string {
  return attrs.replace(/\srel\s*=\s*(["'])([^"']*)\1/i, (_m, q: string, value: string) => {
    const kept = value.split(/\s+/).filter((t) => t && t.toLowerCase() !== "nofollow");
    return kept.length ? ` rel=${q}${kept.join(" ")}${q}` : "";
  });
}

/**
 * Final pass over a Clarion post body before it is rendered:
 *
 * - links to this site become root-relative and trailing-slashed (the site's
 *   convention, so they no longer 308), and lose rel="nofollow";
 * - /blog/<slug> links to a post this site does not publish (Clarion shares
 *   posts across the group's sites) go to the blog index instead;
 * - external citations keep noopener/noreferrer but lose nofollow;
 * - images with no alt attribute get the post title as alt text.
 *
 * An empty `knownSlugs` (feed unreachable) leaves blog links untouched.
 */
export function finaliseBodyHtml(
  html: string,
  { title, knownSlugs }: { title: string; knownSlugs: ReadonlySet<string> },
): string {
  const withLinks = html.replace(/<a\b([^>]*)>/gi, (_full: string, rawAttrs: string) => {
    let attrs = stripNofollow(rawAttrs);
    const hrefMatch = attrs.match(/\shref\s*=\s*(["'])([^"']*)\1/i);
    if (!hrefMatch) return `<a${attrs}>`;
    const href = hrefMatch[2].trim();
    if (href.startsWith("#")) return `<a${attrs}>`;
    let url: URL;
    try {
      url = new URL(href, "https://www.quadranthealthgroup.com");
    } catch {
      return `<a${attrs}>`;
    }
    if (!/^https?:$/.test(url.protocol) || !OWN_HOSTS.has(url.hostname)) return `<a${attrs}>`;

    const segments = url.pathname.split("/").filter(Boolean);
    let path = segments.length ? `/${segments.join("/")}/` : "/";
    let suffix = url.search + url.hash;
    if (segments.length === 2 && segments[0] === "blog" && knownSlugs.size > 0 && !knownSlugs.has(segments[1])) {
      path = "/blog/";
      suffix = "";
    }
    attrs = attrs.replace(hrefMatch[0], ` href=${hrefMatch[1]}${path}${suffix}${hrefMatch[1]}`);
    return `<a${attrs}>`;
  });

  const safeTitle = title.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return withLinks.replace(/<img\b([^>]*?)(\s*\/?)>/gi, (full: string, attrs: string, close: string) =>
    /\salt\s*=/i.test(attrs) ? full : `<img${attrs} alt="${safeTitle}"${close}>`,
  );
}

/** Plain-text summary of an HTML body, for a meta description fallback. */
export function summariseHtml(html: string, max = 155): string {
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/[,;:\s]+\S*$/, "") + "…";
}
