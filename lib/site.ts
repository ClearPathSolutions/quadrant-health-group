// Central content + data source for Quadrant Health Group.
// Copy sourced from the live site; structured here for reuse across pages.

export const site = {
  name: "Quadrant Health Group",
  // CR-01 — client asked for the company name written out in full.
  shortName: "Quadrant Health Group",
  // CR-02/CR-07 — the network treats mental health as well as addiction;
  // "behavioral health" is the umbrella the client asked for.
  tagline: "Your trusted network of behavioral health centers",
  description:
    "Quadrant Health Group is a nationwide network of luxury, accredited addiction and mental health treatment centers delivering personalized, evidence-based care — from medical detox to outpatient support.",
  phone: "(888) 970-6234",
  phoneHref: "tel:+18889706234",
  email: "info@quadranthealthgroup.com",
  address: {
    line1: "5201 Congress Ave, Suite 275",
    line2: "Boca Raton, FL 33487",
  },
  social: {
    facebook: "https://facebook.com/quadranthealthgroup",
    instagram: "https://instagram.com/quadranthealthgroup/",
    linkedin: "https://linkedin.com/company/quadrant-health-group/",
  },
  url: "https://quadranthealthgroup.com",
};

/**
 * The canonical URL for a path, on the production domain, in the trailing-slash
 * form (T1.1 / V0102).
 *
 * All 12 production sites in the network are slash-canonical while all 12
 * previews were slashless, so every inbound link using the production
 * convention would have hit a redirect at cutover. `trailingSlash: true` in
 * next.config.mjs aligns the build; this helper is the single place the
 * convention is expressed, so canonicals (T1.4), og:url (T2.1) and the sitemap
 * cannot drift apart.
 */
export function canonical(path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${site.url}/${clean}/` : `${site.url}/`;
}

/**
 * Whether this deployment may be indexed (F-03, paired with T1.4 / V0092).
 *
 * Until DNS moves, this build serves from quadrant-health-group.vercel.app
 * while quadranthealthgroup.com still serves the WordPress site. The preview is
 * currently fully crawlable, so every page competes with its live twin as a
 * near-duplicate — the exact risk V0092 describes.
 *
 * Deliberately fail-safe: indexing is OFF unless `SITE_INDEXABLE` is explicitly
 * "true". A preview can therefore never be indexed by accident, and the switch
 * at cutover is one environment variable rather than a code change.
 */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

/** Site-wide Open Graph fallback image. */
export const OG_IMAGE = "/images/photos/laguna-coast.jpg";

/**
 * Destinations for the recurring "Therapies we offer" / "About us" bullets on
 * treatment pages (T5.2 — 43 rows, all reading "Link the bullet points to their
 * respective pages"). The bullets are plain strings inside `sections[].body`,
 * so the renderer resolves them through this map rather than the data carrying
 * markup. Keys are matched case-insensitively with punctuation stripped.
 */
export const BULLET_LINKS: Record<string, string> = {
  "individual therapy": "/treatment/individual-therapy",
  "family therapy": "/treatment/family-therapy",
  "group therapy": "/treatment/group-therapy",
  "equine therapy": "/treatment/equine-therapy",
  "our story & mission": "/about/our-story",
  "our locations": "/locations",
  "meet the staff": "/about/meet-the-team",
  "our alumni family": "/about/alumni",
};

/**
 * The canonical + Open Graph block for one page (T1.4 / V0092, T2.1 / V0093).
 *
 * Next merges metadata shallowly: a route that declares its own `openGraph`
 * replaces the layout's object rather than extending it. That is precisely what
 * produced the audit's split — 53 pages inheriting the layout's root-pointing
 * `og:url` and 38 more emitting none at all because they overrode `openGraph`
 * without setting `url`. Building the whole block in one place makes both
 * failure modes unreachable and keeps the canonical and og:url in lockstep.
 */
export function seo(opts: {
  path: string;
  title: string;
  description: string;
  images?: string[];
  type?: "website" | "article";
}) {
  const url = canonical(opts.path);
  return {
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      type: opts.type ?? ("website" as const),
      images: opts.images?.length ? opts.images : [OG_IMAGE],
    },
  };
}

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
};

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/our-story", desc: "Who we are and why we exist" },
      { label: "Meet the Team", href: "/about/meet-the-team", desc: "The people behind your care" },
      { label: "Blog & Resources", href: "/blog", desc: "Insights on recovery & treatment" },
      { label: "Alumni", href: "/about/alumni", desc: "A community for life after treatment" },
      { label: "FAQ", href: "/about/faq", desc: "Answers to common questions" },
    ],
  },
  {
    label: "Treatment",
    href: "/treatment",
    children: [
      { label: "Levels of Care", href: "/treatment#levels", desc: "Detox through outpatient" },
      { label: "What We Treat", href: "/treatment#treat", desc: "Substances & conditions" },
      { label: "Therapy Modalities", href: "/treatment#modalities", desc: "Evidence-based & holistic" },
    ],
  },
  { label: "Locations", href: "/locations" },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Get Help for Yourself", href: "/admissions/help-for-yourself", desc: "Start your own journey" },
      { label: "Get Help for a Loved One", href: "/admissions/help-for-loved-one", desc: "Support someone you love" },
      { label: "Admissions Process", href: "/admissions/admissions-process", desc: "What to expect, step by step" },
      { label: "Verify Your Insurance", href: "/admissions/insurance-verification", desc: "Fast, free & confidential" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  {
    value: "10+",
    label: "Years of Experience",
    text: "Over a decade of specialized addiction recovery experience, delivering proven inpatient and outpatient treatment for lasting sobriety.",
  },
  {
    value: "10,000+",
    label: "Lives Changed",
    text: "Over 10,000 people came to us with substance abuse and mental health issues, and left equipped to live the life they truly deserve.",
  },
  {
    value: "12",
    label: "Locations Nationwide",
    text: "There's always a center near you, offering luxury, fully equipped facilities and caring staff to support you on your recovery journey.",
  },
];

export type Level = {
  slug: string;
  title: string;
  abbr?: string;
  text: string;
  icon: string;
};

export const levels: Level[] = [
  {
    slug: "detox",
    title: "Detoxification",
    text: "The first step toward recovery begins with a safe, medically supervised detox. Our team ensures your comfort while managing withdrawal symptoms around the clock.",
    icon: "shield",
  },
  {
    slug: "residential",
    title: "Residential Inpatient",
    text: "Our inpatient residential program provides 24/7 care in a structured, supportive environment — ideal for those who need intensive treatment and a break from outside triggers.",
    icon: "home",
  },
  {
    slug: "php",
    title: "Partial Hospitalization",
    abbr: "PHP",
    text: "Our PHP offers full-day treatment while allowing clients to return home or to sober living in the evenings, bridging the gap between inpatient care and outpatient support.",
    icon: "sun",
  },
  {
    slug: "iop",
    title: "Intensive Outpatient",
    abbr: "IOP",
    text: "Our IOP is a flexible option for individuals ready to maintain daily responsibilities while continuing structured therapy and support several days a week.",
    icon: "calendar",
  },
  {
    slug: "virtual-iop",
    title: "Virtual Intensive Outpatient",
    abbr: "Virtual IOP",
    text: "With our secure Virtual IOP, you can receive high-quality care from the comfort of home — flexibility without compromising on treatment effectiveness.",
    icon: "monitor",
  },
  {
    slug: "dual-diagnosis",
    title: "Dual Diagnosis",
    text: "For those facing both addiction and mental health challenges, our dual diagnosis program provides integrated care that addresses both together for better, lasting outcomes.",
    icon: "heart",
  },
];

export const addictions = [
  "Alcohol",
  "Ambien",
  "Barbiturates",
  "Benzodiazepines",
  "Cocaine",
  "Fentanyl",
  "Heroin",
  "Inhalants",
  "Methadone",
  "Methamphetamine",
  "Opiates",
  "Prescription Drugs",
];

export const modalities = [
  {
    title: "Individual Therapy",
    text: "One-on-one sessions with a licensed clinician to work through the root causes of addiction at your own pace.",
    icon: "user",
  },
  {
    title: "Group Therapy",
    text: "Guided peer sessions that build connection, accountability, and the shared strength of a recovery community.",
    icon: "users",
  },
  {
    title: "Family Therapy",
    text: "Rebuild trust and communication with the people who matter most, and equip loved ones to support recovery.",
    icon: "heart",
  },
  {
    title: "Equine Therapy",
    text: "Experiential therapy with horses that fosters emotional awareness, trust, and healthy relationships.",
    icon: "leaf",
  },
];

export type Location = {
  slug: string;
  name: string;
  city: string;
  state: string;
  region: string;
  image: string;
  hasCard: boolean; // branded face-card (name baked into image) vs raw photo
  blurb: string;
  care: string[];
  comingSoon?: boolean;
  /** Production domain for the facility (T4.1 / V0091). */
  website?: string;
  /**
   * Suppress the outbound link even though `website` is set (T4.2).
   * V0086's verification found 106 of 107 Ocean Coast pages canonical to their
   * domain root rather than themselves, so the site currently disclaims every
   * page in favour of its homepage. Linking there passes authority nowhere and
   * the workbook flags the fix as unsafe until V0109 is corrected.
   */
  websiteHold?: string;
};

export const locations: Location[] = [
  {
    slug: "laguna-view-detox",
    name: "Laguna View Detox",
    city: "Laguna Beach",
    state: "CA",
    region: "California",
    image: "/images/locations/laguna-view.png",
    hasCard: true,
    blurb:
      "Perched along California's breathtaking coast, Laguna View Detox offers a serene, supportive environment where healing can truly begin.",
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
    website: "https://lagunaviewdetox.com",
  },
  {
    slug: "ocean-coast-recovery",
    name: "Ocean Coast Recovery Center",
    city: "Costa Mesa",
    state: "CA",
    region: "California",
    image: "/images/locations/ocean-coast.png",
    hasCard: true,
    blurb:
      "Minutes from the Pacific Coast, Ocean Coast Recovery offers a peaceful residential setting for those beginning their recovery journey.",
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
    // Client instruction 2026-08-13: link out to oceancoastrecovery.com from
    // the facility block. This overrides the `websiteHold` that V0086 argued
    // for — see the field's note. The link ships; V0109 is still worth fixing
    // on Ocean Coast's own build so the target stops disclaiming itself.
    website: "https://oceancoastrecovery.com",
  },
  {
    slug: "hillside-mission-recovery",
    name: "Hillside Mission Recovery",
    city: "Mission Viejo",
    state: "CA",
    region: "California",
    image: "/images/locations/hillside-mission.png",
    hasCard: true,
    blurb:
      "Nestled in the hills away from the hustle and bustle, Hillside Mission offers a calming, nature-filled retreat for recovery.",
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
    website: "https://hillsidemission.com",
  },
  {
    slug: "marina-harbor-detox",
    name: "Marina Harbor Detox",
    city: "San Francisco",
    state: "CA",
    region: "California",
    image: "/images/locations/marina-harbor.png",
    hasCard: true,
    blurb:
      "Located by the water in a quiet setting on Marina Boulevard, Marina Harbor Detox is a private, upscale facility.",
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
    website: "https://marinaharbordetox.com",
  },
  {
    slug: "wellness-detox-la",
    name: "Wellness Detox of LA",
    city: "Los Angeles",
    state: "CA",
    region: "California",
    image: "/images/locations/wellness-detox-la.png",
    hasCard: true,
    blurb:
      "Set in a tranquil corner of Los Angeles, Wellness Detox LA provides luxury amenities and evidence-based addiction care.",
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
    website: "https://wellnessdetoxla.com",
  },
  {
    slug: "dallas-detox-center",
    name: "Dallas Detox Center",
    city: "Dallas",
    state: "TX",
    region: "Texas",
    image: "/images/locations/dallas.png",
    hasCard: true,
    blurb:
      "Just outside the heart of Dallas, our state-of-the-art facility provides a full continuum of care including detox, residential treatment, and holistic therapies.",
    // CR-09 — client removed Virtual IOP from Dallas.
    care: ["Detox", "Residential", "Dual Diagnosis"],
    website: "https://dallasdetoxcenter.com",
  },
  {
    slug: "fort-worth-wellness",
    name: "Fort Worth Wellness Center",
    city: "Fort Worth",
    state: "TX",
    region: "Texas",
    image: "/images/photos/property-1.jpg",
    hasCard: false,
    blurb:
      "Fort Worth Wellness Center provides dedicated, primary residential mental health treatment in a comfortable, supportive setting.",
    // Scraped from fortworthwellness.org: their own nav lists Detox,
    // Residential Mental Health, Dual Diagnosis and Aftercare Planning. Ours
    // claimed only two of the four.
    care: ["Detox", "Mental Health Inpatient", "Dual Diagnosis", "Aftercare"],
    website: "https://fortworthwellness.org",
  },
  {
    slug: "seaside-wellness",
    name: "Seaside Wellness",
    city: "West Palm Beach",
    state: "FL",
    region: "Florida",
    image: "/images/locations/seaside.png",
    hasCard: true,
    blurb:
      "In West Palm Beach, Seaside Wellness is a premier destination for individuals seeking treatment for drug and alcohol addiction.",
    // CR-11 — client added mental health inpatient.
    care: ["Detox", "Residential", "Mental Health Inpatient", "Dual Diagnosis", "Aftercare"],
    website: "https://seasidewellnesspb.com",
  },
  {
    slug: "wellness-recovery-nj",
    name: "Wellness Recovery NJ",
    city: "West Windsor",
    state: "NJ",
    region: "New Jersey",
    image: "/images/locations/wellness-nj.png",
    hasCard: true,
    blurb:
      "In a welcoming, easily accessible part of New Jersey, our drug & alcohol rehab center is here to help you achieve lasting recovery.",
    // CR-11 — client added mental health outpatient.
    care: ["PHP", "IOP", "Virtual IOP", "Mental Health Outpatient", "Dual Diagnosis"],
    website: "https://wellnessrecoverynj.com",
  },
  {
    slug: "des-moines-wellness",
    name: "Des Moines Wellness Center",
    city: "Des Moines",
    state: "IA",
    region: "Iowa",
    // T8.3b — was aerial-2.jpg, a Texas ranch property standing in for an Iowa
    // facility. This is the real Des Moines Wellness Center exterior.
    image: "/images/locations/des-moines.jpg",
    hasCard: false,
    // T4.4 / V0090 + visual row 1084 — this was flagged "coming soon" with
    // `care: ["Coming Soon"]`, which excluded it from `generateStaticParams` and
    // left the network's Iowa centre with no page. The facility is open and
    // operating: desmoinesrecovery.com publishes the full programme list below,
    // and the workbook's own portfolio treats Des Moines as a live build.
    // Blurb and care levels are the client's own published wording.
    blurb:
      "Des Moines Wellness Center provides a full continuum of care including medical detox, inpatient residential treatment, and flexible PHP/IOP programs — specialising in dual diagnosis, treating addiction and co-occurring mental health conditions together in a trauma-informed environment.",
    // CR-11 — client added mental health inpatient.
    care: ["Detox", "Residential", "Mental Health Inpatient", "PHP", "IOP", "Dual Diagnosis", "Aftercare"],
    website: "https://desmoinesrecovery.com",
  },
  {
    // CR-12 — every field here was wrong on the first pass. theohiorc.com sits
    // behind a Cloudflare challenge that blocked server-side fetching, so this
    // was built from third-party directory listings. The client confirmed it was
    // wrong and the facility's own saved page settles it: "Ohio Recovery Center"
    // appears zero times on their site, the city is Steubenville not Van Wert,
    // and they are outpatient-only — the old entry advertised detox and
    // residential care the facility does not provide.
    slug: "ohio-recovery-collective",
    name: "The Ohio Recovery Collective",
    city: "Steubenville",
    state: "OH",
    region: "Ohio",
    image: "/images/locations/ohio-recovery-collective.jpg",
    hasCard: false,
    blurb:
      "At The Ohio Recovery Collective, compassionate, evidence-based outpatient care meets you where you are — with flexible PHP, IOP and virtual programming built around your life.",
    care: ["PHP", "IOP", "Outpatient", "Virtual"],
    website: "https://theohiorc.com",
  },
  {
    // CR-10 — client asked for Greater Texas Behavioral as its own tile. This
    // also closes V0090 and answers T7.3, which had been holding the question of
    // whether Greater Texas should be a location page or a service-line entry.
    //
    // V0044/V0046 established it is a virtual provider with no physical address,
    // so there is no facility to photograph and no city to name. The card is in
    // the Quadrant house style rather than using the GTB logo: the client's own
    // BRAND-DISCREPANCY note records that the glyph inside the Texas outline is
    // unresolved (shipping assets use a medical cross, official assets use two
    // speech bubbles), and no location card on this site uses a facility logo.
    slug: "greater-texas-behavioral",
    name: "Greater Texas Behavioral",
    city: "Statewide",
    state: "TX",
    region: "Texas",
    image: "/images/locations/greater-texas-behavioral.png",
    hasCard: true,
    blurb:
      "Greater Texas Behavioral delivers structured online treatment for addiction and mental health across Texas — a virtual IOP you can join from anywhere in the state, with the same licensed clinical team behind every session.",
    care: ["Virtual Outpatient", "Dual Diagnosis", "Mental Health"],
    website: "https://greatertexasbehavioral.com",
  },
  {
    // CR-13c — Kentucky existed nowhere in this file, so the network's Kentucky
    // centre had no tile and no page while the About timeline was due to claim
    // it. Everything below comes from the facility's own site (wellnessranchky.com
    // — the vercel.app link the client sent serves the same build).
    //
    // Their site publishes no town anywhere: the copy says "a private Kentucky
    // ranch campus" throughout, which reads as deliberate discretion for a
    // residential mental health facility rather than missing data. `city` uses
    // their own phrasing; swap in the town if the client wants it named.
    slug: "wellness-ranch-kentucky",
    name: "Wellness Ranch Kentucky",
    city: "Private ranch campus",
    state: "KY",
    region: "Kentucky",
    image: "/images/locations/wellness-ranch-kentucky.jpg",
    hasCard: false,
    blurb:
      "A private ranch campus in Kentucky built for mental wellness — residential mental health and integrated dual diagnosis care with medical detox and 24/7 clinical support, on tranquil grounds well away from everyday triggers.",
    care: [
      "Detox",
      "Residential",
      "Mental Health Inpatient",
      "Dual Diagnosis",
      "Aftercare",
    ],
    website: "https://wellnessranchky.com",
  },
];

export const whyPoints = [
  {
    title: "Personalized Care Plans",
    text: "Licensed professionals design a plan around you — evidence-based therapies, holistic care, and dual diagnosis support when needed.",
    icon: "clipboard",
  },
  {
    title: "Accredited Facilities",
    text: "Modern, comfortable, fully equipped centers that meet the highest standards of clinical and residential care.",
    icon: "badge",
  },
  {
    title: "Seamless Continuum of Care",
    text: "From detox to outpatient, we provide consistent support with smooth transitions between every level of treatment.",
    icon: "steps",
  },
  {
    title: "A Judgment-Free Environment",
    text: "Compassionate, human support that gives you the structure, flexibility, and dignity to rebuild your life on your terms.",
    icon: "heart",
  },
];

export const faqs = [
  {
    q: "Does insurance cover addiction treatment?",
    a: "We work with most major insurance providers. Verifying your benefits is fast, free, and completely confidential — and it won't affect your coverage. We'll help you understand exactly what your plan covers before you commit to anything.",
  },
  {
    q: "How do I know which level of care is right for me?",
    a: "Our admissions team performs a confidential assessment to recommend the right starting point — whether that's medical detox, residential inpatient, or an outpatient program. As you progress, we transition you between levels of care seamlessly.",
  },
  {
    q: "How quickly can I or my loved one start treatment?",
    a: "In many cases we can begin the admissions process the same day you call. Reach our admissions team at " +
      site.phone +
      " and we'll guide you through every step.",
  },
  {
    q: "What should I bring to treatment?",
    a: "Once your placement is confirmed, your admissions coordinator will send a simple checklist covering clothing, medications, and personal items — and answer any questions about what to expect on day one.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Absolutely. Every conversation with our team is 100% confidential. Reaching out carries no obligation and no judgment — just support.",
  },
];
