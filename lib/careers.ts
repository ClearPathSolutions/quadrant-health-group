import { locations } from "./site";

const ADP =
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49";
const link = (ccId: string) => `${ADP}&ccId=${ccId}&lang=en_US`;

/**
 * ADP Career Center id per entity, from the client's "ADP Careers Center Links"
 * workbook. One ADP account (cid), one career centre (ccId) each.
 *
 * Marina Harbor's id is `19000101_000001` where every other is `92…_2`. That
 * shape is an epoch default rather than a generated id, so it is worth a check
 * in a browser — ADP renders its listings client-side, so fetching the URL
 * cannot tell a populated centre from an empty one. Used as supplied.
 */
const CC: Record<string, string> = {
  "dallas-detox-center": "9200865813587_2",
  "des-moines-wellness": "9201562455183_2",
  "fort-worth-wellness": "9201318903306_2",
  "greater-texas-behavioral": "9200865814254_2",
  "hillside-mission-recovery": "9200865817070_2",
  "laguna-view-detox": "9200865816229_2",
  "marina-harbor-detox": "19000101_000001",
  "ocean-coast-recovery": "9200866717655_2",
  "seaside-wellness": "9200867085656_2",
  "wellness-detox-la": "9200857811822_2",
  "wellness-ranch-kentucky": "9201728768392_2",
  "wellness-recovery-nj": "9200865815387_2",
  "ohio-recovery-collective": "9201746525360_2",
};

/** The network-wide centre, used by the "all roles" button. */
export const CAREERS_ALL = link("9200857813559_2");

export type CareerTile = {
  key: string;
  name: string;
  city: string;
  state: string;
  href: string;
  image?: string;
  /** True when the name is already set into the artwork (face-card photos). */
  hasCard?: boolean;
};

/**
 * Entities on the careers grid that are not treatment locations, so have no
 * entry in `locations`: the corporate office, the billing company and the sober
 * living brand. Ordered after the facilities.
 *
 * Their images are the banners from their own ADP career centres. Those are
 * embedded in the career-centre page as base64 data URIs rather than fetched,
 * which is why they are invisible to the jobs API and to any plain HTTP crawl —
 * they were pulled by rendering each page headless and reading the decoded
 * `src`. Each is cropped to the tile ratio around its subject, which also drops
 * the logo baked into the banner so the tile's own name does not duplicate it.
 */
const NON_LOCATION: CareerTile[] = [
  {
    key: "quadrant-health-group",
    image: "/images/careers/quadrant-health-group.jpg",
    name: "Quadrant Health Group",
    city: "Boca Raton",
    state: "FL",
    href: link("9200857813559_2"),
  },
  {
    key: "quadrant-billing-solutions",
    image: "/images/careers/quadrant-billing-solutions.jpg",
    name: "Quadrant Billing Solutions",
    city: "Boca Raton",
    state: "FL",
    href: link("9200865813294_2"),
  },
];

/**
 * Locations the careers page labels differently from the rest of the site.
 *
 * Both come from the client's ADP workbook and are scoped to this page on
 * purpose. `city` in `locations` drives the locations page, the per-location
 * schema and local SEO, so changing it there makes a claim about where a
 * treatment centre is. These only change what the careers tile reads.
 *
 * Dallas is worth a second look: Weatherford is ~90 miles west of Dallas and is
 * also Fort Worth Wellness's city on the row directly above it in the workbook,
 * which is what a copy-paste down a column looks like.
 */
const CAREERS_CITY: Record<string, { city: string; state: string }> = {
  "dallas-detox-center": { city: "Weatherford", state: "TX" },
  "greater-texas-behavioral": { city: "Boca Raton", state: "FL" },
};

/** Every tile on /careers: the treatment locations, then the two above. */
export const careerTiles: CareerTile[] = [
  ...locations
    .filter((l) => !l.comingSoon && CC[l.slug])
    .map((l) => ({
      key: l.slug,
      name: l.name,
      city: CAREERS_CITY[l.slug]?.city ?? l.city,
      state: CAREERS_CITY[l.slug]?.state ?? l.state,
      href: link(CC[l.slug]),
      image: l.image,
      hasCard: l.hasCard,
    })),
  ...NON_LOCATION,
];
