# Quadrant Health Group — Website

A modern, mobile-first rebuild of [quadranthealthgroup.com](https://quadranthealthgroup.com)
built with **Next.js 14 (App Router)** + **TypeScript**, optimized for deployment on **Vercel**.

## Highlights

- ⚡ **Fast & static** — all **96 pages** prerendered as static HTML; ~87 KB shared JS.
- 📚 **Complete content** — the full site was migrated: homepage, about, treatment,
  admissions, contact, **7 blog posts**, **44 team bios**, **21 treatment detail pages**
  (11 substances + 6 levels of care + 4 therapies), and **9 location detail pages** —
  all real copy and imagery pulled from the live site.
- 📱 **Mobile-optimized navigation** — sticky header with a slide-in drawer, collapsible
  submenus, and a pinned call-to-action; no horizontal overflow at any width (360 → 1440+).
- 🎨 **Cohesive design system** — one palette, type scale, and spacing rhythm
  (`app/globals.css`) so every section feels balanced and even.
- 🗂️ **Data-driven** — page content lives in `lib/content/*.json` + `lib/site.ts`, rendered
  through a handful of dynamic route templates. Edit data, not markup.
- 🖼️ **Optimized images** — `next/image` with AVIF/WebP, responsive `sizes`, and lazy loading;
  source images downscaled with `sharp`.
- ♿ **Accessible & resilient** — semantic landmarks, keyboard-friendly menus, skip link,
  reduced-motion support, and content that stays visible even if JavaScript never runs.
- 🔍 **SEO ready** — per-page metadata, Open Graph tags, `sitemap.xml` (all routes), and `robots.txt`.

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, header/footer
  page.tsx            Homepage
  home.module.css     Homepage section styles
  globals.css         Design system (tokens, primitives, components)
  content.module.css  Shared interior-page building blocks
  about/  about/meet-the-team/                 About + team grid
  treatment/  treatment/[slug]/                Treatment index + detail (addiction/level/modality)
  locations/  locations/[slug]/                Locations index + per-facility detail
  team/[slug]/                                 Individual staff bios
  blog/  blog/[slug]/                          Blog index + articles
  admissions/ contact/                         Interior pages
  privacy-policy/ sms-terms/                   Legal pages (replace copy before launch)
  sitemap.ts  robots.ts  not-found.tsx
components/
  Header.tsx          Sticky nav + mobile drawer
  Footer.tsx          Footer + CTA band
  LocationCard.tsx    Reusable location card
  LeadForm.tsx        Admissions/contact form (front-end demo — see note below)
  FaqList.tsx  Faq.tsx  PageHero.tsx  Reveal.tsx  Icon.tsx
lib/
  site.ts             Core config: contact, nav, locations, levels, addictions, FAQs
  content.ts          Typed accessors over the migrated content
  content/*.json      Migrated content: team, posts, treatments, locationDetails
public/
  images/             Logos, cards, team headshots, blog/treatment/facility photos
  icon.png favicon-32.png apple-icon.png
```

Core config (phone, nav, locations, levels of care) lives in [`lib/site.ts`](lib/site.ts);
migrated page content (blog posts, team bios, treatment & location detail) lives in
`lib/content/*.json`, accessed through [`lib/content.ts`](lib/content.ts).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Build & run the production output locally:

```bash
npm run build
npm start
```

## Deploy to Vercel

**Option A — Git (recommended):**
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset auto-detects **Next.js** — no configuration needed. Click **Deploy**.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

Then point the `quadranthealthgroup.com` domain at the Vercel project in
**Settings → Domains**.

## Before you go live

- **Wire up the form.** `components/LeadForm.tsx` currently simulates submission on the
  client. Point it at an API route (`app/api/lead/route.ts`) or a form provider
  (e.g. Formspree, HubSpot, your CRM) and add spam protection.
- **Replace legal copy.** `app/privacy-policy` and `app/sms-terms` contain placeholder
  summaries — swap in your reviewed policies.
- **Confirm details** in `lib/site.ts` (phone, email, address, social links) and the
  location list/blurbs.
- Add analytics (e.g. Vercel Analytics or GA4) if desired.
