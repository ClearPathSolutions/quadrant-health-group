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
  // CR-04 — facility-level staff are no longer published on the parent site;
  // each facility's own site owns its team. These 66 pages were live and in
  // the sitemap, so they redirect to the team index rather than 404. The index is
  // the only destination that is correct for every one of them: per-person URLs
  // on the facility sites cannot be verified from here (several are behind
  // Cloudflare), and a wrong 301 is worse than a general one.
  { source: "/team/alanna-mcmurtrey", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/alicia-joslin", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/angela-taylor", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/antoine-gross", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/ashley-hurtado", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/christi-llamas", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/christina-lilly", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/deborah-wade", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/olivia-gibson", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/elizabeth-wald", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/emma-fyffe", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/riky-hanaumi", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/erin-crawford", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/gus-saadeh", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/haley-wadlington", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/halie-nall", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/ila-holgerson", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jaclyn-paradise", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jacob-cameron", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jada-spencer", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jeremiah-ross", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/joshua-leder", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/justin-white", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/lamont-damon", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/michael-mcarthur", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/michael-meagher", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/michelle-szwed", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/monica-olivares", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/norberto-segredo", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/olivia-hadjerioua", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/phillip-carter", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/shawn-young", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/shan-raiford", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/steve-ryan", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/timothy-foley", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/vahan-oknayan", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/sarah-bentley", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/corney-best", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jacci-westbrook", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/krystal-moore", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/robert-dzieniszewski", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/amy-baisden", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/zala-henry-samuel", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/sara-enderle", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/olivia-jones", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/kimberly-cotterell", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jordan-kane", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/neil-tucker", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/anthony-paccillo", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/laura-conners", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/danielle-foreman", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/deanna-koester", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/julie-mitchell", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/dylan-kuzinski", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/dr-shaun-hutton", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/april-blair", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/kate-gulam", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/wesley-starlin", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/lacey-stielow", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/parneet-sahota", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/alexander-maddux", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/bethany-hamilton", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/amanda-daniels", destination: "/about/meet-the-team/", statusCode: 301 },
  { source: "/team/jennifer-penny", destination: "/about/meet-the-team/", statusCode: 301 },

  // T4.4 — V0090 probed /locations/des-moines-wellness-center; this build uses
  // the shorter form, matching /locations/fort-worth-wellness. Redirect so the
  // slug the audit named does not dead-end.
  { source: "/locations/des-moines-wellness-center", destination: "/locations/des-moines-wellness/", statusCode: 301 },
  // CR-12 — the Ohio tile shipped on 2026-08-21 under a name and slug taken from
  // third-party directories. Both were wrong; the facility is The Ohio Recovery
  // Collective. The old slug was live and in the sitemap, so it redirects.
  { source: "/locations/ohio-recovery-center", destination: "/locations/ohio-recovery-collective/", statusCode: 301 },

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
  // T1.5 cutover diff, 2026-08-13. "Our Addiction Treatment Facilities" is live
  // and indexed on production but was dropped from the build — an eighth page
  // beyond the seven V0127 catalogued. /locations is the equivalent content, so
  // it redirects rather than 404s at cutover.
  { source: "/about/facilities", destination: "/locations/", statusCode: 301 },
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
          // Preconnect as an HTTP header, not a <link> in <head>.
          //
          // Next hoists its own font preloads, stylesheets and webpack preload
          // above anything the layout puts in <head>, so the tag landed 9th —
          // after everything it was meant to run ahead of. Lighthouse reported
          // it as "Unused preconnect" and still listed the origin as a
          // candidate worth 330ms. A Link header is acted on before the HTML is
          // parsed at all, which is the earliest the connection can start.
          {
            key: "Link",
            value:
              "<https://264810.tctm.co>; rel=preconnect, <https://264810.tctm.co>; rel=dns-prefetch",
          },
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
