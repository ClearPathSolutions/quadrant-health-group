// Typed accessors over the scraped content data (generated into lib/content/*.json).
import teamData from "./content/team.json";
import postsData from "./content/posts.json";
import treatmentsData from "./content/treatments.json";
import locationDetailsData from "./content/locationDetails.json";

export type Section = { heading: string; body: string };
export type Faq = { q: string; a: string };

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string | null;
};

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
