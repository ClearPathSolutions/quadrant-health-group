import type { MetadataRoute } from "next";
import { canonical, locations } from "@/lib/site";
import { pages, posts, team, treatments } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  // F-11 — was hardcoded to a fixed date, which goes stale silently. Build time
  // is the honest value for a fully static export.
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/about/meet-the-team",
    "/treatment",
    "/locations",
    "/admissions",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/editorial-policy",
    "/sms-terms",
  ];
  const dynamic = [
    // T1.2 — the seven pages ported back from production.
    ...pages.map((p) => `/${p.slug}`),
    ...treatments.map((t) => `/treatment/${t.slug}`),
    ...locations.filter((l) => !l.comingSoon).map((l) => `/locations/${l.slug}`),
    ...team.map((m) => `/team/${m.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: canonical(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
