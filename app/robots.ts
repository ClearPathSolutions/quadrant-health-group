import type { MetadataRoute } from "next";
import { site, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // F-03 — the preview must not be crawlable while the production domain still
  // serves the WordPress site. Set SITE_INDEXABLE=true on the production
  // deployment at cutover; everything else stays closed by default.
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
