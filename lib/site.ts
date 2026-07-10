// Central content + data source for Quadrant Health Group.
// Copy sourced from the live site; structured here for reuse across pages.

export const site = {
  name: "Quadrant Health Group",
  shortName: "Quadrant Health",
  tagline: "Your trusted network of addiction treatment centers",
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
      { label: "Our Story", href: "/about#story", desc: "Who we are and why we exist" },
      { label: "Meet the Team", href: "/about/meet-the-team", desc: "The people behind your care" },
      { label: "Blog & Resources", href: "/blog", desc: "Insights on recovery & treatment" },
      { label: "Alumni", href: "/about#alumni", desc: "A community for life after treatment" },
      { label: "FAQ", href: "/about#faq", desc: "Answers to common questions" },
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
      { label: "Get Help for Yourself", href: "/admissions#self", desc: "Start your own journey" },
      { label: "Get Help for a Loved One", href: "/admissions#loved-one", desc: "Support someone you love" },
      { label: "Admissions Process", href: "/admissions#process", desc: "What to expect, step by step" },
      { label: "Verify Your Insurance", href: "/admissions#insurance", desc: "Fast, free & confidential" },
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
    value: "10",
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
    care: ["Detox", "Residential", "Virtual IOP", "Dual Diagnosis"],
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
    care: ["Mental Health Inpatient", "Dual Diagnosis"],
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
    care: ["Detox", "Residential", "Dual Diagnosis", "Aftercare"],
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
    care: ["PHP", "IOP", "Virtual IOP", "Dual Diagnosis"],
  },
  {
    slug: "des-moines-wellness",
    name: "Des Moines Wellness Center",
    city: "Des Moines",
    state: "IA",
    region: "Iowa",
    image: "/images/photos/aerial-2.jpg",
    hasCard: false,
    blurb:
      "A new Quadrant Health center is coming soon to the Midwest, bringing luxury, evidence-based recovery care to Iowa.",
    care: ["Coming Soon"],
    comingSoon: true,
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
