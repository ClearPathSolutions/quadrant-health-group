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
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER, reviewerLink } from "./content";
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
    // MedicalClinic alongside MedicalBusiness: `availableService` is defined on
    // MedicalClinic (and Hospital/Physician), not on plain MedicalBusiness, so
    // validators reported every location page as a markup error.
    "@type": ["MedicalBusiness", "MedicalClinic"],
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
  // Always Person. schema.org's Physician is an organisation type (a subtype
  // of MedicalOrganization), so jobTitle / worksFor on it are invalid and the
  // medical lead's bio was the one page reported with markup errors.
  return {
    "@context": "https://schema.org",
    "@type": "Person",
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

/**
 * One article. Emitted on each `/blog/<slug>` page: a MedicalWebPage carrying
 * the medical review, with the BlogPosting as its main entity. Every post has
 * a reviewer (see resolveReviewer), so reviewedBy is always present; there is
 * no review-date field, so lastReviewed is omitted.
 */
export function articleSchema(post: Post) {
  const url = canonical(`/blog/${post.slug}`);
  const reviewer = post.reviewer ?? DEFAULT_REVIEWER;
  const { href: reviewerUrl } = reviewerLink(reviewer);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: post.title,
        reviewedBy: {
          "@type": "Person",
          // Same @id as personSchema() on the reviewer's team page.
          "@id": `${reviewerUrl}#person`,
          url: reviewerUrl,
          name: reviewer.name,
          honorificSuffix: reviewer.credentials,
        },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        // Never an empty string: a Clarion post can arrive without an excerpt.
        description: post.excerpt?.trim() || post.title,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        datePublished: post.date,
        dateModified: post.date,
        ...(post.image ? { image: abs(post.image) } : {}),
        // Matches the visible "Written by" line; the editorial team has no
        // profile page of its own.
        author: { "@type": "Organization", name: post.author || DEFAULT_AUTHOR },
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
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
    // No `provider` on MedicalTherapy (schema.org does not define it there)
    // and no `possibleTreatment` pointing at the organisation (it expects a
    // MedicalTherapy). Both were reported as structured-data errors.
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
