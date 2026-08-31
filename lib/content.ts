// Typed accessors over the scraped content data (generated into lib/content/*.json).
import teamData from "./content/team.json";
import postsData from "./content/posts.json";
import treatmentsData from "./content/treatments.json";
import locationDetailsData from "./content/locationDetails.json";
import pagesData from "./content/pages.json";

export type Section = {
  heading: string;
  body: string;
  /**
   * Heading level for this section's own heading (T5.1). Sections render at h2
   * by default; 10 of the workbook's 51 heading rows ask for h3/h4 instead.
   */
  level?: number;
  /**
   * In-body labels to promote to real headings, keyed by line text (T5.1).
   * The other 41 heading rows name a label that sits inside the body rather
   * than being a section of its own — see `components/Prose.tsx`.
   */
  promote?: Record<string, number>;
  /**
   * CR-15 — ported pages arrived as one prose blob per section, so anything that
   * was a tile, a numbered step or a CTA on the old site rendered as a flat
   * paragraph. These carry that structure back. All optional, so sections that
   * are genuinely prose are unaffected.
   */
  items?: SectionItem[];
  /** "steps" renders numbered cards; "tiles" a feature grid. */
  layout?: "steps" | "tiles";
  cta?: SectionCta;
};
export type SectionItem = { label: string; text: string };
export type SectionCta = { label: string; href: string };
export type Faq = { q: string; a: string };

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string | null;
  /** Department / facility grouping for the team page (T6.1, visual row 856). */
  group?: string;
};

/**
 * Display order for the team page.
 *
 * CR-04 — facility-level staff are no longer published on the parent site, so
 * the facility groups are gone; each facility's own site owns its team. CR-03
 * splits HR and Alumni out of the groups they were folded into.
 *
 * Groups with no members are skipped, so the corporate sections stay hidden
 * until T3.2 publishes those 30 bios and then appear in the right place with no
 * further change. People are assigned only where their own record — role, bio,
 * or a facility roster in locationDetails.json — states the facility; anyone
 * whose record names none stays in the general group rather than being guessed.
 */
export const TEAM_GROUP_ORDER = [
  "Founders",
  "Corporate Leadership Team",
  "Human Resources",
  "Business Development",
  "Admissions & Client Care",
  // Client instruction: alumni sits last. This array — not the order of records
  // in team.json — is what drives the section order on the page.
  "Alumni Services",
];

/** The roster split into row 856's groups, empty groups omitted. */
export function teamByGroup(): { group: string; members: TeamMember[] }[] {
  const seen = new Set<string>();
  const out: { group: string; members: TeamMember[] }[] = [];
  for (const g of TEAM_GROUP_ORDER) {
    const members = team.filter((m) => m.group === g);
    if (members.length) {
      out.push({ group: g, members });
      seen.add(g);
    }
  }
  // Anything carrying a group not in the list still gets shown, never dropped.
  const extra = team.filter((m) => m.group && !seen.has(m.group));
  for (const m of extra) {
    const bucket = out.find((o) => o.group === m.group);
    if (bucket) bucket.members.push(m);
    else out.push({ group: m.group!, members: [m] });
  }
  return out;
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  sections: Section[];
  // "native" = built from the scraped JSON; "clarion" = managed in Clarion and
  // fetched at request time. Absent on the raw JSON, defaulted where read.
  source?: "native" | "clarion";
};

export type TreatmentCategory = "addiction" | "level" | "modality";
export type Treatment = {
  slug: string;
  category: TreatmentCategory;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  image: string | null;
  sections: Section[];
  faqs: Faq[];
};

export type LocationDetail = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  amenities: string[];
  team: string[];
  care: string[];
  city?: string;
  state?: string;
};

/**
 * A page ported back from production (T1.2 / V0127). Seven pages — the whole
 * admissions funnel plus our-story, alumni and FAQ — were lost in the migration
 * and 404 on the build while returning 200 on production. Content is the
 * client's own, recovered from the crawl archived in `_scrape/`.
 */
export type ContentPage = {
  slug: string;
  title: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  metaDescription: string;
  sections: Section[];
  faqs: Faq[];
  bullets: string[];
};

export const pages = pagesData as ContentPage[];
export const getPage = (slug: string) => pages.find((p) => p.slug === slug);

export const team = teamData as TeamMember[];
export const posts = postsData as Post[];
export const treatments = treatmentsData as Treatment[];
export const locationDetails = locationDetailsData as Record<string, LocationDetail>;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// Native posts sort newest-first by ISO date (defensive — the JSON is usually
// already ordered). Used as the base for the merged feed.
const sortByDateDesc = <T extends { date: string }>(list: T[]) =>
  [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/**
 * All posts — native + Clarion-managed — merged and sorted newest-first, so
 * whichever source has the most recent post takes the top/feature spot.
 * Async + server-only because it fetches the Clarion feed at request time.
 */
export async function getAllPosts(): Promise<Post[]> {
  const { getClarionPosts } = await import("./clarion");
  const native = posts.map((p) => ({ ...p, source: "native" as const }));
  const clarion = await getClarionPosts();
  return sortByDateDesc([...native, ...clarion]);
}
export const getTeamMember = (slug: string) => team.find((t) => t.slug === slug);
export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const getLocationDetail = (slug: string): LocationDetail | undefined =>
  locationDetails[slug];

export const treatmentsByCategory = (cat: TreatmentCategory) =>
  treatments.filter((t) => t.category === cat);

/**
 * Chip label for an addiction page: "fentanyl-addiction" -> "Fentanyl Addiction".
 *
 * Derived from the slug, not the title. The titles in treatments.json are full
 * marketing headlines ("Struggling with fentanyl dependency? We're here to help
 * you"), and the regex that used to trim them only matched the handful ending
 * in "… Addiction Treatment" — every other page rendered its whole headline
 * inside a chip. Slugs are uniform, so the label is too.
 */
export const addictionLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Addiction pages in the alphabetical order the previous site listed them. */
export const addictionsAZ = () =>
  treatmentsByCategory("addiction")
    .map((t) => ({ ...t, label: addictionLabel(t.slug) }))
    .sort((a, b) => a.label.localeCompare(b.label));

// Nice display labels for the treatment categories.
export const categoryLabel: Record<TreatmentCategory, string> = {
  addiction: "What We Treat",
  level: "Levels of Care",
  modality: "Therapy Modalities",
};

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return "";
  return `${months[m - 1]} ${d}, ${y}`;
}

// Rough read-time estimate from section word counts.
export function readingTime(sections: Section[]): number {
  const words = sections.reduce((n, s) => n + s.body.split(/\s+/).length, 0);
  return Math.max(2, Math.round(words / 200));
}

// Read-time estimate for HTML bodies (Clarion posts) — strip tags, count words.
export function readingTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(2, Math.round(words / 200));
}
