import type { MetadataRoute } from "next";
import { site, locations } from "@/lib/site";
import { posts, team, treatments } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-01-01");
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
    "/sms-terms",
  ];
  const dynamic = [
    ...treatments.map((t) => `/treatment/${t.slug}`),
    ...locations.filter((l) => !l.comingSoon).map((l) => `/locations/${l.slug}`),
    ...team.map((m) => `/team/${m.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
