/**
 * Schema.org builders (F-06).
 *
 * The audit found zero `application/ld+json` anywhere in the build while the
 * WordPress site being replaced emits it through Yoast on every page. Every
 * builder here reads data that already exists and is already typed — no new
 * content is invented, so nothing can drift out of sync with the page it
 * describes.
 *
 * All URLs go through `canonical()` so they carry the production domain in the
 * trailing-slash form settled by T1.1, matching the canonical and og:url tags.
 */
import { canonical, site, type Location } from "./site";
import type { Faq, LocationDetail, Post, TeamMember, Treatment } from "./content";

const abs = (path: string | null | undefined) =>
  path ? (path.startsWith("http") ? path : `${site.url}${path}`) : undefined;

/** The parent organisation. Emitted once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: canonical("/"),
    logo: abs("/images/logo.png"),
    image: abs("/images/photos/laguna-coast.jpg"),
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Boca Raton",
      addressRegion: "FL",
      postalCode: "33487",
      addressCountry: "US",
    },
    sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
    medicalSpecialty: ["Psychiatric", "Addiction Medicine"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "admissions",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
  };
}

/** One treatment centre. Emitted on each `/locations/<slug>` page. */
export function locationSchema(loc: Location, detail?: LocationDetail) {
  const url = canonical(`/locations/${loc.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${url}#facility`,
    name: loc.name,
    url,
    image: abs(loc.image),
    description: detail?.intro || loc.blurb,
    telephone: site.phone,
    // Street addresses are not in the dataset; locality and region are, and a
    // partial address is valid here. Adding a placeholder street would be worse
    // than omitting it.
    address: {
      "@type": "PostalAddress",
      addressLocality: detail?.city || loc.city,
      addressRegion: detail?.state || loc.state,
      addressCountry: "US",
    },
    parentOrganization: { "@id": `${site.url}/#organization` },
    availableService: (detail?.care?.length ? detail.care : loc.care)
      .filter((c) => c !== "Coming Soon")
      .map((c) => ({ "@type": "MedicalTherapy", name: c })),
    ...(detail?.amenities?.length
      ? {
          amenityFeature: detail.amenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a,
            value: true,
          })),
        }
      : {}),
  };
}

/** One staff member. Emitted on each `/team/<slug>` page. */
export function personSchema(m: TeamMember) {
  const url = canonical(`/team/${m.slug}`);
  // Physician carries more weight than Person, so the test stays conservative:
  // a stated clinical credential, or a role that is explicitly a physician one.
  // The 30 corporate records imported from the bio doc carry no `credentials`
  // value, so credentials alone would have mistyped the medical lead.
  const isPhysician =
    /\b(MD|DO|PsyD)\b/.test(m.credentials || "") ||
    /\b(physician|medical director|medical oversight)\b/i.test(m.role || "");
  return {
    "@context": "https://schema.org",
    "@type": isPhysician ? "Physician" : "Person",
    "@id": `${url}#person`,
    name: m.name,
    url,
    jobTitle: m.role,
    ...(m.credentials ? { honorificSuffix: m.credentials } : {}),
    ...(m.image ? { image: abs(m.image) } : {}),
    description: m.bio.split("\n")[0],
    worksFor: { "@id": `${site.url}/#organization` },
  };
}

/** One article. Emitted on each `/blog/<slug>` page. */
export function articleSchema(post: Post) {
  const url = canonical(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.image ? { image: abs(post.image) } : {}),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** FAQ pairs. Emitted wherever a page carries them. */
export function faqSchema(faqs: Faq[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A treatment programme or condition page. */
export function treatmentSchema(t: Treatment) {
  const url = canonical(`/treatment/${t.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": t.category === "addiction" ? "MedicalCondition" : "MedicalTherapy",
    "@id": `${url}#treatment`,
    name: t.title,
    url,
    description: t.metaDescription || t.intro.slice(0, 200),
    ...(t.image ? { image: abs(t.image) } : {}),
    ...(t.category === "addiction"
      ? { possibleTreatment: { "@id": `${site.url}/#organization` } }
      : { provider: { "@id": `${site.url}/#organization` } }),
  };
}

/** Breadcrumb trail. `crumbs` is ordered root-first, excluding Home. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonical(c.path),
    })),
  };
}
