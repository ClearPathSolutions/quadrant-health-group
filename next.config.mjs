/**
 * Cutover redirect map.
 *
 * `statusCode: 301` rather than `permanent: true` — the latter emits 308, and
 * the audit specifies 301 throughout. Source paths are slashless to match the
 * current `trailingSlash` default; T1.1 settles the convention and T1.3 folds
 * the remaining 16 production pairs into this same array.
 */
const redirectMap = [
  // T3.1 — name corrected to the spelling used in her own bio and the bio doc.
  { source: "/team/monica-olivires", destination: "/team/monica-olivares/", statusCode: 301 },
  // T3.8 — the record was always Alicia Joslin's; only the URL carried another
  // person's name. Indexed on production today, so the old path must redirect.
  { source: "/team/trevor-amador", destination: "/team/alicia-joslin/", statusCode: 301 },
  // T3.5 — four people absent from the client's bio doc, which is the roster.
  { source: "/team/karen-pettit", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/tami-distefano", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/denise-edwards", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/nastasya-aracena", destination: "/about/meet-the-team/", statusCode: 301 },

  // T4.4 — V0090 probed /locations/des-moines-wellness-center; this build uses
  // the shorter form, matching /locations/fort-worth-wellness. Redirect so the
  // slug the audit named does not dead-end.
  { source: "/locations/des-moines-wellness-center", destination: "/locations/des-moines-wellness/", statusCode: 301 },

  // T1.3 / V0128 — the 16 production pairs. Derived from the production
  // sitemaps archived in _scrape/inv/, not hand-written, and every
  // destination was checked against this build.
  // 8 location slugs shortened on production -> descriptive form here.
  // (/locations/fort-worth-wellness already matches and needs no pair.)
  { source: "/locations/dallas", destination: "/locations/dallas-detox-center/", statusCode: 301 },
  { source: "/locations/hillside", destination: "/locations/hillside-mission-recovery/", statusCode: 301 },
  { source: "/locations/laguna", destination: "/locations/laguna-view-detox/", statusCode: 301 },
  { source: "/locations/marina", destination: "/locations/marina-harbor-detox/", statusCode: 301 },
  { source: "/locations/ocean-coast", destination: "/locations/ocean-coast-recovery/", statusCode: 301 },
  { source: "/locations/seaside", destination: "/locations/seaside-wellness/", statusCode: 301 },
  { source: "/locations/wellness-la", destination: "/locations/wellness-detox-la/", statusCode: 301 },
  { source: "/locations/wellness-nj", destination: "/locations/wellness-recovery-nj/", statusCode: 301 },
  // Blog index moved out of /about.
  { source: "/about/blog", destination: "/blog/", statusCode: 301 },
  // 7 dated WordPress permalinks -> flat /blog/<slug>.
  { source: "/2026/03/09/breaking-barriers-to-mental-health-treatment", destination: "/blog/breaking-barriers-to-mental-health-treatment/", statusCode: 301 },
  { source: "/2026/04/21/how-opiate-addiction-starts", destination: "/blog/how-opiate-addiction-starts/", statusCode: 301 },
  { source: "/2026/02/12/private-insurance-pays-for-addiction-treatment", destination: "/blog/private-insurance-pays-for-addiction-treatment/", statusCode: 301 },
  { source: "/2026/01/26/the-science-of-a-sustainable-reset-why-dry-january-requires-a-clinical-lens", destination: "/blog/the-science-of-a-sustainable-reset-why-dry-january-requires-a-clinical-lens/", statusCode: 301 },
  { source: "/2026/02/23/national-addiction-treatment-network-quadrant-health-group", destination: "/blog/national-addiction-treatment-network-quadrant-health-group/", statusCode: 301 },
  { source: "/2026/01/16/detox-vs-residential-vs-php-vs-iop-how-to-choose-the-right-level-of-addiction-treatment", destination: "/blog/detox-vs-residential-vs-php-vs-iop-how-to-choose-the-right-level-of-addiction-treatment/", statusCode: 301 },
  { source: "/2025/12/13/holiday-relapse-risk-why-december-is-the-most-dangerous-time-for-addiction", destination: "/blog/holiday-relapse-risk-why-december-is-the-most-dangerous-time-for-addiction/", statusCode: 301 },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // T1.1 / V0102 — all 12 production sites are slash-canonical; all 12 previews
  // were slashless. Matching production keeps every indexed inbound link off a
  // redirect at cutover. Canonicals, og:url and the sitemap follow via
  // `canonical()` in lib/site.ts.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return redirectMap;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
