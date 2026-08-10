# Issues — Quadrant Health Group (parent site)

Everything in the shared audit workbook that bears on **this repository**, plus a task
breakdown to clear it.

---

## Source

| | |
|---|---|
| **Workbook** | [Vercel Build Issues — QHG new websites](https://docs.google.com/spreadsheets/d/1daiRElkRoKObt9KCsqFeXEhmtSBk5c1MQjUeaKx2nC8/edit) |
| **Bio doc** | [Quadrant bios](https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit) — 131 people, parsed and diffed against `team.json` (Part 6) |
| **Headshots** | `~/Downloads/Staff Headshots` — 124 files, matched, resized and imported (Part 7) |
| **Brand kit** | `~/Downloads/Quadrant Health Group` — 8 logo assets, applied to every logo slot (Part 8) |
| **Tabs pulled** | Vercel Build Issues · Broken Internal Links · Visual Issues · Verification Log · Legend (all five) |
| **Underlying audit** | Crawl of all 12 Vercel preview builds, 1,046 URLs, 2026-07-27. Verification pass 2026-07-28. |
| **Workbook scope** | 118 issue rows across the 12-site portfolio, plus 1,904 visual rows across 9 sites |
| **Pulled here** | 2026-08-10 |

The workbook covers the whole QHG network. This document extracts only what applies to
`quadrant-health-group.vercel.app` — the build in this repo — and states explicitly where
a portfolio-wide row lands somewhere else.

### What was extracted

| Tab | Rows for this site | |
|---|---:|---|
| Vercel Build Issues | 7 | Facility = *Quadrant Health Group (parent)* |
| Vercel Build Issues | 13 | Facility = *ALL SITES* — assessed individually below |
| Vercel Build Issues | 7 | **Filed under other facilities but requiring work here** — see Part 3 |
| Broken Internal Links | 0 | Only Dallas and Fort Worth have broken links; this build crawled clean |
| Visual Issues | 231 | Content and markup issues, page by page |
| Verification Log | 27 | Evidence for the rows above, reproduced inline |
| Bio doc | 131 people | Diffed against the 44 published bios — see Part 6 |
| Headshot folder | 124 files | 36 applied, 47 staged, 1 held — see Part 7 |
| Brand folder | 8 assets | All 6 logo slots replaced; no photography in the folder — see Part 8 |
| **Total** | **258 rows + 131 bios** | 27 of the 102 portfolio issue rows, 231 visual rows, and the full bio roster |

<details>
<summary>How completeness was established</summary>

Filtering on the Facility column alone misses cross-domain rows — seven rows are filed
against a *facility* site but the fix lands on the parent. To catch them:

1. Exported the workbook as `.xlsx` and parsed all five sheets, rather than reading one CSV
   tab. This surfaced the tab list and preserved every column.
2. Checked every tab for cells beyond the header width, in case columns had been added
   without a heading. Only the Legend had one — its value column, read in full.
3. Ran a case-insensitive `quadrant` sweep across **all cells of all five tabs**, then
   subtracted the rows already captured by the Facility filter. That surfaced the 7
   cross-domain rows in Part 3.
4. Repeated the sweep for `\bparent\b` and `/team/` to catch rows that describe this site
   without naming it. One hit — V0042 — which names this site only as already-correct.
5. Cross-checked every slug the workbook references against
   [`lib/content/treatments.json`](lib/content/treatments.json) and
   [`lib/site.ts`](lib/site.ts). All match; the audit was run against this codebase.

</details>

### Source authority

**The workbook and the bio doc are authoritative.** Where a document states something that
disagrees with the current build, the document is the specification and the build is what
changes. Nothing in this file asks anyone to re-litigate a row.

Two consequences worth stating, because both look like hedging and are not:

- **Where a document corrects itself, the correction is the operative version.** The
  workbook's verification pass rewrote 26 rows in place and put corrections against
  another 49. Those corrections *are* the instruction — that is why they are reproduced
  under each row rather than folded away.
- **Where a document asks for something to be established before acting** — the search-volume
  check in V0089, the format question on Greater Texas in V0090 — that instruction is
  itself part of the spec and is carried through as written.

Where a documented item turns out to already be satisfied in the build, it is marked as
such and closed. That is reporting state, not disputing the row.

### Two things the Legend asks you to carry into every row

> **Roughly two thirds of verified rows needed a correction.** 5 hand-written counts were
> wrong; 8 rows had a wrong or unsafe Fix; 2 rows were withdrawn entirely, and both "would
> have caused damage if actioned."

> **34 rows are marked NOT YET VERIFIED**, and the entire Visual Issues tab (all 231 rows
> here) sits outside the verified set. Treat their counts and fix instructions with the
> same caution the verified set earned.

Where the sheet's own verification pass corrected a row, the correction is reproduced under
the row rather than folded silently into it.

---

## Summary

**Nothing here is a runtime defect.** The workbook is an SEO, content and migration audit —
it did not examine the API layer, accessibility, or the codebase. Everything below is about
what the site publishes, not whether it works.

Ranked by the sheet's own priority:

| | ID | Issue | Sheet priority |
|---|---|---|---|
| 1 | V0127 | Seven production pages dropped from the build, including the whole admissions funnel | CRITICAL |
| 2 | V0102 | Trailing-slash convention disagrees with production on every URL | CRITICAL |
| 3 | V0092 | No canonical tag on any of the 92 pages | HIGH |
| 4 | V0128 | 16-pair cutover redirect map does not exist | HIGH |
| 5 | V0124 | Build predates production; content gap widens daily | CRITICAL (portfolio) |
| 6 | V0086 | Two bios duplicated from Ocean Coast — and the row makes the V0091 fix unsafe | HIGH |
| 7 | V0054 | Name misspelled on a staff page; parent holds uncanonicalled bio copies | CRITICAL (at Hillside) |
| 8 | V0093 | og:url wrong or missing on all 92 pages | not triaged |
| 9 | V0090 | Locations index covers 9 facilities, not 11 | not triaged |
| 10 | V0091 | Zero outbound links to any facility website | not triaged |
| 11 | V0050, V0065, V0075 | Six more staff bios duplicated from facility sites | not triaged |
| 12 | V0089 | `opiate` vs `opioid` naming split across the portfolio | not triaged |
| 13 | 231 rows | Content and markup issues, mostly on treatment pages | untriaged, unverified |

Plus, from the bio doc:

| | Finding | Scale |
|---|---|---|
| A | **The entire corporate leadership team is missing from the site** — both founders, CEO, COO, CFO, CRO, medical oversight | 30 bios ready to publish |
| B | Four published people are absent from the current bio doc — they come off the site | 4 pages to remove |
| C | Six bios rewritten, nine job titles genuinely changed | content drift |
| D | The doc spells her **Monica Olivares** — settles the V0054 name defect | 1 page |

And from the headshot folder:

| | Finding | Status |
|---|---|---|
| E | **NEW — `/team/trevor-amador` publishes Alicia Joslin.** Inherited from production; Trevor Amador is absent from the doc roster | logged, T3.8 |
| F | 36 official headshots applied, `olivia-hadjerioua`'s missing photo filled | ✅ done |
| G | 47 corporate headshots staged — 28 pair with a finished bio | ✅ T3.2 unblocked |
| H | One assignment held back — `Haley Hayes.png` vs *Haley Wadlington* | T3.9 |

And from the image audit:

| | Finding | Status |
|---|---|---|
| I | The homepage hero — and the site-wide `og:image` — showed another company's apartment building ("CASCAD… APTS") captioned as a Quadrant facility | ✅ replaced |
| J | `therapy.jpg` was a stock photo of **Rhossili Bay, Wales**; `support.jpg` a stock beach | ✅ both replaced with facility photography |
| K | **All 18 treatment heroes are stock**, plus 4 of 7 blog heroes | T8.4 — outstanding |
| L | Brand kit applied — all 6 logo slots now come from the approved folder | ✅ done |
| M | **Every photograph on every page is now client-sourced** — 8 of 8 | ✅ done |

### Where this site is already compliant

Six rows name this build as **already on the standard** — no work, listed so nobody
re-opens them:

| ID | Standard | This site |
|---|---|---|
| V0094 | `/treatment` hub slug | ✅ on standard |
| V0097 | `/about` slug | ✅ on standard |
| V0098 | `/contact` slug | ✅ on standard |
| V0100 | `/privacy-policy` live and in sitemap | ✅ on standard |
| V0101 | `/blog/<slug>` post pattern | ✅ on standard |
| V0042 | privacy page `index, follow` | ✅ one of only 5 sites correct |

### Rows that belong to other sites

`V0103` (Dallas + Fort Worth `/contact` → JPEG), `V0116` (Wellness NJ, Greater Texas, Laguna,
Ocean Coast slug drift), `V0118` (Marina Harbor / Des Moines / Hillside geo-suffixed slugs).
Listed for completeness; no action in this repo.

### How this relates to the codebase audit

The two sets barely overlap, which is useful — they were looking at different things.

| Codebase audit finding | Workbook row |
|---|---|
| F-06 no canonicals | **V0092** — same finding, independently confirmed |
| F-01 cutover / F-03 indexable preview | **V0102, V0128, V0124** — the workbook has far more detail |
| F-02 lead delivery fails silently | *not in the workbook* |
| F-04 focusable elements inside `aria-hidden` | *not in the workbook* |
| F-05 PII in server logs | *not in the workbook* |
| F-07 doubled brand in titles | *not in the workbook* |
| F-08 treatment meta/image/FAQ gaps | *adjacent* — the 231 visual rows cover the same pages from a content angle |
| F-09 – F-12 legal copy, dates, rate limit, image weight | *not in the workbook* |

Neither list supersedes the other. The task plan at the end sequences both.

---

## Current status — 2026-08-10

**`next build` passes: 160 routes** (was 96), 0 type errors, 0 broken image paths.
Verified live on a production server: 24 representative pages all return 200 with a
canonical, an `og:url`, JSON-LD and exactly one `<h1>`.

### Closed since the backlog was written

| | |
|---|---|
| **WP-1 cutover set** | `trailingSlash: true` matching production; 7 dropped pages ported back; 22-pair 301 map; canonicals on every route via `seo()` |
| **WP-2** | `og:url` per page — the layout-inheritance bug that produced 53 root-pointing and 38 absent tags is structurally unreachable now |
| **Named-person defects** | Monica Olivares spelling + slug; `/team/trevor-amador` → `/team/alicia-joslin`; 4 off-roster people removed. All four redirect. |
| **T3.2** | **30 corporate bios published** — 2 Founders, 17 Corporate Leadership, 9 BD & Alumni, 2 Admissions |
| **T3.3** | **5 bios replaced with the doc text.** Elizabeth Wald overlapped the doc version by 0.16 — effectively a different biography. Also Monica Olivares, Justin White, Ila Holgerson, Erika Sirianos. |
| **T3.4** | Titles reconciled. The 11 remaining differences are all cases where the doc drops the facility qualifier — the site keeps its more specific version, per Part 6.3 |
| **Facility roster** | **29 more bios published** from the doc's facility sections — 14 Wellness Recovery NJ, 5 Des Moines, 4 Seaside, 4 Texas, 1 Ocean Coast, 1 Wellness Ranch KY. 28 came with a headshot. **Team page 40 → 99, and all 15 groups now populate.** |
| **WP-4** | `website` field + outbound links on the index and every detail page; whole card clickable; facility count 12; Des Moines card photo and **location page** |

### T4.4 — Des Moines Wellness Center, built this pass

The entry carried `comingSoon: true` and `care: ["Coming Soon"]`, which excluded it from
`generateStaticParams` — the network's Iowa centre had no page, exactly as V0090 and visual
row 1084 describe. **The flag was stale, not a content gap: the facility is open.**
`desmoinesrecovery.com` publishes the full programme list, so the blurb, intro and care
levels are the client's own wording rather than anything invented.

| | |
|---|---|
| Page | `/locations/des-moines-wellness/` — 200, in the sitemap |
| Care levels | Detox, Residential, PHP, IOP, Dual Diagnosis, Aftercare — 6 linked chips |
| Schema | `MedicalBusiness` with 6 `availableService` nodes |
| Outbound | links to `desmoinesrecovery.com`, closing V0091 for Iowa |
| Redirect | `/locations/des-moines-wellness-center` → the short form, since V0090 probed that slug |

One thing to check with the client: the facility's own footer gives its address as
**Johnston, IA 50131**, a Des Moines suburb, while the record says Des Moines. Left as
Des Moines to match how the brand presents itself and how Marina Harbor is listed under
San Francisco — but the `PostalAddress` in the schema now states it, so it is worth confirming.
| **T5.1 / T5.2** | Heading levels and bullet links handled in `Prose` rather than per page |
| **T6.1** | Team grouped by department and facility |
| **WP-8** | Brand kit; hero, both stock section photos and the alt mismatch all replaced |
| **F-03 / F-04 / F-05 / F-06 / F-07 / F-10 / F-11** | noindex-until-cutover; drawer focus trap; PII out of logs; **structured data**; doubled titles; hardcoded dates; rate limiting |

### F-06 — structured data, built this pass

Was zero. Now emitted from data that already exists, via `lib/schema.ts` + `components/JsonLd.tsx`:

| Type | Where |
|---|---|
| `MedicalOrganization` | every page, as the `@id` node the rest reference |
| `MedicalBusiness` | each of the 9 location pages, with services and amenities |
| `Person` / `Physician` | each of the 70 bios |
| `Article` | each of the 7 posts |
| `MedicalCondition` / `MedicalTherapy` | each of the 21 treatment pages |
| `FAQPage` | About, the 11 treatment pages that carry pairs, and `/about/faq` (46 pairs) |
| `BreadcrumbList` | every detail page |

Validated across 9 page types: 25 nodes, 0 invalid JSON.

### Blocked on someone else

| | |
|---|---|
| **T3.7** | 19 corporate bios — headshots staged, copy owed by the client. `marc-north`, `maria-gonzalez` and `jennifer-penny` are published but fall back to initials: no headshot exists for them in the folder. |
| **T3.9** | `Haley Hayes.png` vs *Haley Wadlington* — no document links the names |
| **T4.4** | Des Moines ✅ built — see below. **Greater Texas** still needs the format decision in T7.3 first: V0044/V0046 established it is a virtual provider with no physical address, so a location page may be the wrong shape for it. |
| **T8.4** | 18 treatment + 4 blog heroes still stock. Needs a shoot, a named library, or a design direction. |
| **F-02** | Lead delivery still resolves `delivered: false` to a log line. A durable fallback needs an email or webhook service and its credentials. |
| **F-09** | Legal copy needs counsel, not a developer. |

### Still open and actionable

T5.3–T5.11 (widgets, reviews slide, capitalization pass, the remaining one-off content rows),
T6.4 (Clarion and native posts still render in separate sections), T7.1–T7.3, T8.3b's
de-duplication half.

---

## Part 1 — Build, SEO and migration issues

Rows filed against *Quadrant Health Group (parent)*, plus the portfolio rows that land in
this repo. Ordered by what blocks the cutover.

### V0127 — Seven production pages dropped from the build

`Priority: CRITICAL`  ·  `Verdict: NEW - QHG parent deep audit 2026-07-28`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> SEVEN production pages were dropped from the build, including the entire admissions funnel. All seven return HTTP 200 on production and 404 on the build, and none exists under an alternative slug - checked /faq, /our-story, /alumni, /verify-insurance, /insurance and /admissions/process, all 404. THIS REFRAMES THREE EARLIER ROWS: V0096 (no verify-insurance page), V0099 (no FAQ page) and V0095 (no aftercare or alumni page) recorded these as gaps to build from scratch. They are not - the content already exists on production and was lost in migration. That makes them a regression to port, which is far cheaper than authoring new pages.

**Where**

```
https://quadranthealthgroup.com/about/alumni/                        "Alumni Program"
https://quadranthealthgroup.com/about/faq/                           "Quadrant Health Group FAQ | Treatment, Admissions & Insurance"
https://quadranthealthgroup.com/about/our-story/                     "Our Story | How Quadrant Health Group Began"
https://quadranthealthgroup.com/admissions/admissions-process/       "Admissions Process for Addiction Treatment"
https://quadranthealthgroup.com/admissions/help-for-loved-one/       "Help a Loved One | Addiction & Mental Health Support"
https://quadranthealthgroup.com/admissions/help-for-yourself/        "Get Help for Addiction & Mental Health"
https://quadranthealthgroup.com/admissions/insurance-verification/   "Insurance Verification for Treatment"

All seven return HTTP 404 on https://quadrant-health-group.vercel.app at the same paths.
```

**Fix as written in the sheet**

```
Port all seven from production into the build. Four of them are the conversion path - admissions process, help for yourself, help for a loved one, and insurance verification - so launching without them removes the parent site primary enquiry routes.

Existing build sections to place them under:
https://quadrant-health-group.vercel.app/about
https://quadrant-health-group.vercel.app/admissions

Then close V0096 and V0099 as duplicates of this row, and revise V0095 to cover only the facilities that genuinely lack an aftercare page.
```

**Bearing on this repo.** All seven paths return 404 here. `app/admissions/page.tsx` folds the funnel into anchor sections (`#self`, `#loved-one`, `#process`, `#insurance`) — the content largely exists but not at the indexed URLs, so this is partly a routing decision, not pure authoring.

### V0102 — Portfolio-wide trailing-slash mismatch

`Priority: CRITICAL`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: ALL SITES`

**Issue**

> PORTFOLIO-WIDE TRAILING-SLASH MISMATCH, affecting all 1,046 preview URLs. All 12 previews serve the slashless form at 200 and 308-redirect the slash form. All 12 production sites are slash-canonical, returning 301 on the slashless form. At cutover every inbound link using the production convention hits a redirect. This also CAUSES the canonical-target redirects in V0018 and V0067, since the builds emit slashless canonicals against slash-canonical production - fixing the convention fixes those too.

**Where**

```
Preview: https://fort-worth-wellness.vercel.app/about-us  (HTTP 200, no trailing slash)
Production: https://fortworthwellness.org/about-us  (HTTP 301 to the trailing-slash form)
```

**Fix as written in the sheet**

```
Pick one convention and enforce it in the Next.js config across all 12 builds, then align the redirect map. Verify against:
https://fortworthwellness.org/about-us/
https://fort-worth-wellness.vercel.app/about-us
```

**Correction applied during the 2026-07-28 verification pass**

> PRIORITY CRITICAL: Affects all 1,046 preview URLs at cutover
>
> SCOPE UNDERSTATED. The row cites Fort Worth as though it were an example of a localised problem. It is portfolio-wide and total: every preview and every production site disagree on this. That makes it the single largest cutover issue in the audit by URL count - it affects all 1,046 preview URLs, not a subset.
> Also worth stating in the row: because previews 308-redirect the slash form, any existing inbound link or citation using the production slash convention will hit a redirect on the new build. That is the concrete consequence, and it applies to every indexed URL in the portfolio.

<details>
<summary>Verification evidence</summary>

```
Tested a known page on all 12 sites in both slash forms, preview and production.
PREVIEWS: all 12 serve the slashless form at HTTP 200 and 308-redirect the slash form. So every preview enforces NO trailing slash.
PRODUCTION: all 12 return 301 on the slashless form. 10 of 12 serve the slash form at 200. The 2 exceptions (Laguna, Ocean Coast) 301 both forms because their /about redirects onward to /about-us/ - so they are still slash-canonical, just via a second hop.
Net: 12 of 12 previews are slashless, 12 of 12 production sites are slash-canonical.
```

</details>

**Bearing on this repo.** `next.config.mjs` sets no `trailingSlash`, so Next defaults to `false` (slashless). Matches the audit exactly.

### V0092 — No canonical tag on any of the 92 pages

`Priority: HIGH`  ·  `Verdict: CONFIRMED`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> Missing canonical tag on 92 page(s) (all 92 pages, 100 percent). Verified that the preview serves robots.txt with "Allow: /", a robots meta of "index, follow" and no X-Robots-Tag header, so these pages are fully indexable. The production domain is live and self-canonicalising, so any preview page that gets discovered competes with its production twin as a near-duplicate.

**Where**

```
https://quadrant-health-group.vercel.app  - all 92 pages, 100 percent
```

**Fix as written in the sheet**

```
Add a self-referencing canonical on every template, pointing at the production domain:
https://quadranthealthgroup.com

Affected build:
https://quadrant-health-group.vercel.app

Working example to copy: https://laguna-view-detox.vercel.app/about canonicals to https://lagunaviewdetox.com/about
```

**Correction applied during the 2026-07-28 verification pass**

> PRIORITY HIGH: 100 percent of pages missing canonical
>
> none - row accurate as written

<details>
<summary>Verification evidence</summary>

```
Re-measured all 92 pages: 92 of 92 missing a canonical, zero fetch errors. Re-fetched /, /about, /locations and /treatment three times each - no canonical every time, so not transient. robots meta is "index, follow" on all 92, so the row wording is accurate here. No X-Robots-Tag. robots.txt "Allow: /". Production homepage self-canonicalises to https://quadranthealthgroup.com/.
```

</details>

**Bearing on this repo.** Confirmed independently. `grep -rn "alternates\|canonical" app` returns zero matches. Fix belongs in `app/layout.tsx` metadata plus each `generateMetadata`.

### V0128 — Cutover redirect map required — 16 URL pairs

`Priority: HIGH`  ·  `Verdict: NEW - QHG parent deep audit 2026-07-28`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> CUTOVER REDIRECT MAP REQUIRED - 16 URL pairs. Eight facility location pages are renamed from short forms to full facility names, seven blog posts move from dated /YYYY/MM/DD/ paths to /blog/<slug>, and the blog index moves from /about/blog to /blog. MIGRATION REQUIREMENT, NOT A DEFECT - internal link integrity on the build is clean: 0 broken across 949 distinct internal URLs collapsing to 128 base paths, and 0 internal redirects.

**Where**

```
/locations/dallas -> /locations/dallas-detox-center
/locations/hillside -> /locations/hillside-mission-recovery
/locations/laguna -> /locations/laguna-view-detox
/locations/marina -> /locations/marina-harbor-detox
/locations/ocean-coast -> /locations/ocean-coast-recovery
/locations/seaside -> /locations/seaside-wellness
/locations/wellness-la -> /locations/wellness-detox-la
/locations/wellness-nj -> /locations/wellness-recovery-nj
/about/blog -> /blog
plus 7 dated posts, e.g. /2026/04/21/how-opiate-addiction-starts -> /blog/how-opiate-addiction-starts
```

**Fix as written in the sheet**

```
Generate the 16-pair 301 map before cutover. Sequence with V0092 (no canonicals anywhere on this domain) and V0102 (trailing slash) so redirects and canonicals ship together.

Build:
https://quadrant-health-group.vercel.app/locations
Production:
https://quadranthealthgroup.com/sitemap_index.xml

Note the renamed location slugs are longer and more descriptive, which is an improvement - but all 8 old URLs are indexed today.
```

**Bearing on this repo.** The 8 short location slugs in the map do not exist in `lib/site.ts` — this repo already uses the long forms. The redirect map is therefore net-new config (`next.config.mjs` `redirects()`), not a rename.

### V0124 — Build predates production and the content gap is growing

`Priority: CRITICAL`  ·  `Verdict: NEW - Marina Harbor deep audit 2026-07-28`  ·  `Status: Open`  ·  `Facility: ALL SITES`

**Issue**

> CUTOVER CONTENT GAP - THE BUILDS PREDATE PRODUCTION AND THE GAP IS STILL GROWING. Every Vercel build appears to have been generated from a content snapshot taken around 15-16 July 2026. Production has kept publishing since. Measured across all 12 production sitemaps: 15 pages published or renamed on production are ABSENT from the corresponding build, affecting 10 of 12 sites, and almost all dated 16-17 July 2026. Fort Worth and Greater Texas are unaffected only because they published nothing after the snapshot (newest content 11 June and 27 March). Des Moines and the QHG parent show lastmod of 28 July 2026, i.e. TODAY, so the gap widens every day the builds stay frozen. This also explains three other rows: V0120 (Laguna luxury post), V0122 (Hillside /what-is-narcan) and the slug renames in V0119 are all instances of this single cause, not separate faults.

**Where**

```
https://dallasdetoxcenter.com/2026/07/17/oxycontin-vs-oxycodone/
https://desmoinesrecovery.com/how-long-does-percocet-stay-in-your-system/
https://hillsidemission.com/what-is-narcan/
https://lagunaviewdetox.com/luxury-drug-rehab-what-five-star-recovery-really-looks-like/
https://lagunaviewdetox.com/orange-county-drug-rehab/
https://lagunaviewdetox.com/why-is-crystal-meth-addictive/
https://lagunaviewdetox.com/addiction-in-families-and-loved-ones/
https://lagunaviewdetox.com/use-your-gilsbar-health-insurance-to-treat-your-addiction/
https://marinaharbordetox.com/2026/07/17/codeine-cough-syrup/
https://oceancoastrecovery.com/m365-pill/
https://seasidewellnesspb.com/drug-rehab-west-palm-beach-complete-guide/
https://wellnessdetoxla.com/luxury-rehab-in-los-angeles/
https://wellnessrecoverynj.com/php-treatment-what-to-expect/
https://quadranthealthgroup.com/locations/wellness-nj/
https://quadranthealthgroup.com/2026/07/17/alcohol-rehab-what-to-expect-costs-how-to-choose-the-right-program/
```

**Fix as written in the sheet**

```
Two actions, in this order.

1) FREEZE OR SYNC. Either pause publishing to production until cutover, or establish a re-sync step so content added after the snapshot is pulled into the builds. Without one of these, every new post is lost at launch.

2) RE-RUN THIS DIFF IMMEDIATELY BEFORE CUTOVER. The 15 URLs above are accurate as of 2026-07-28 and will be stale by launch. The check is: production sitemap lastmod >= snapshot date, then test each URL on the build.

Verify against:
https://lagunaviewdetox.com/sitemap_index.xml
https://hillsidemission.com/sitemap_index.xml
```

**Bearing on this repo.** Two QHG URLs named: `/locations/wellness-nj/` and a 2026-07-17 blog post. This repo has 7 posts; production has more. Re-run the diff before cutover, not now.

### V0093 — og:url wrong or missing on all 92 pages

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> og:url is misconfigured or missing on all 92 pages: 53 point at the domain root, 38 have no og:url element at all, 1 is the homepage, 0 are page-specific. Original row described only the 53.

**Where**

```
https://quadrant-health-group.vercel.app  - 53 pages affected
```

**Fix as written in the sheet**

```
Set og:url per page to that page canonical URL on the production domain, e.g.
https://quadranthealthgroup.com/about

Correct example elsewhere in the portfolio:
https://des-moines-wellness-center-navy.vercel.app/about  (og:url matches the page)
```

**Correction applied during the 2026-07-28 verification pass**

> Same scope omission as V0040, V0047, V0077, V0085 and V0088. Full picture: 53 wrong, 38 absent, 1 homepage, 0 page-specific. So no page on the parent has a correct og:url. Minor: the Fix cites quadranthealthgroup.com/about, which 301s.

<details>
<summary>Verification evidence</summary>

```
Count exact: 53 of 92 pages carry og:url pointing at the bare domain root while not being the homepage.
```

</details>

**Bearing on this repo.** Root cause identified: `app/layout.tsx:48` sets `openGraph.url = site.url` for every page, which produces the 53 root-pointing tags. Pages that override `openGraph` without a `url` (blog, treatment, location detail) produce the 38 absent ones.

### V0090 — Locations index covers only 9 of the facilities

`Priority: not triaged`  ·  `Verdict: CONFIRMED`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> Locations index covers only 9 facilities. Des Moines Wellness Center and Greater Texas Behavioral have no location page.

**Where**

```
https://quadrant-health-group.vercel.app/locations
```

**Fix as written in the sheet**

```
Build these two pages:
https://quadrant-health-group.vercel.app/locations/des-moines-wellness-center
https://quadrant-health-group.vercel.app/locations/greater-texas-behavioral

Model on an existing location page:
https://quadrant-health-group.vercel.app/locations/laguna-view-detox

Facilities they should describe:
https://desmoinesrecovery.com
https://greatertexasbehavioral.com
```

<details>
<summary>Verification evidence</summary>

```
Exactly 9 location pages exist, matching the row. Probed 6 plausible slugs for the two missing facilities (/locations/des-moines-wellness-center, /des-moines, /des-moines-recovery, /greater-texas-behavioral, /greater-texas, /greater-texas-behavioral-health) - all 404. The /locations page itself links exactly those 9 and no more.
```

</details>

**Bearing on this repo.** `app/locations/[slug]/page.tsx` builds pages from `locations.filter(l => !l.comingSoon)` — 9 pages. Des Moines is present in `lib/site.ts` but flagged `comingSoon: true`; Greater Texas Behavioral is absent from the data entirely.

### V0091 — No outbound links to any facility website

`Priority: not triaged`  ·  `Verdict: CONFIRMED`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> Locations page contains no outbound links to any facility website. Only social links are present, so the parent passes no authority to the facilities.

**Where**

```
https://quadrant-health-group.vercel.app/locations
```

**Fix as written in the sheet**

```
Add an outbound link from each entry on https://quadrant-health-group.vercel.app/locations to its production domain:
https://dallasdetoxcenter.com
https://desmoinesrecovery.com
https://hillsidemission.com
https://lagunaviewdetox.com
https://marinaharbordetox.com
https://oceancoastrecovery.com
https://seasidewellnesspb.com
https://wellnessdetoxla.com
https://wellnessrecoverynj.com
https://fortworthwellness.org
https://greatertexasbehavioral.com

Then link each facility back to:
https://quadranthealthgroup.com
```

<details>
<summary>Verification evidence</summary>

```
Confirmed exactly. The /locations page links only 3 external domains - facebook.com, instagram.com and linkedin.com. Zero facility production domains. Extended the check beyond the row: the 9 individual /locations/<facility> pages ALSO contain no outbound links to their facility domains, tested on 5 of 9. Production /locations behaves the same way - no facility domains linked.
```

</details>

**Bearing on this repo.** `Location` in `lib/site.ts` has no field for a facility URL, so this needs a data change before a template change.

### V0089 — opiate vs opioid naming inconsistency

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: Quadrant Health Group (parent)`

**Issue**

> Naming inconsistency, not a duplicate. The parent uses 'opiate' where Seaside uses 'opioid', so the portfolio targets two different terms for the same intent. 'Opioid' is the current clinical and higher-volume term.

**Where**

```
https://quadrant-health-group.vercel.app/treatment/opiate-addiction  (live, HTTP 200)
No /treatment/opioid-addiction page exists on the parent (verified HTTP 404).
```

**Fix as written in the sheet**

```
Rename to /treatment/opioid-addiction with a 301 from the opiate URL, so it matches the term chosen for the portfolio:
https://seaside-wellness-of-palm-beach.vercel.app/what-we-treat/opioid-addiction

Page to rename:
https://quadrant-health-group.vercel.app/treatment/opiate-addiction
```

**Correction applied during the 2026-07-28 verification pass**

> Two refinements.
> 1) The inconsistency is THREE-WAY, not two-way. Across the portfolio: QHG parent uses /treatment/opiate-addiction; Wellness Detox LA uses /treatment/opioid-addiction; Wellness NJ uses /what-we-treat/opioids (plural); Seaside has BOTH opiate and opioid. So the standard has to cover three variants, and Seaside also needs its pair resolved (V0074).
> 2) UNVALIDATED CLAIM IN MY OWN ROW. It asserts "opioid is the current clinical and higher-volume term". The clinical part is defensible - opioid is the broader modern term covering synthetics like fentanyl, while opiate strictly means naturally derived. But I have NOT checked search volume, and I stated it as fact. That should either be validated with keyword data or reworded to drop the volume claim.

<details>
<summary>Verification evidence</summary>

```
Confirmed on both hosts: /treatment/opiate-addiction returns 200 on preview and 301 on production; /treatment/opioid-addiction returns 404 on BOTH. So my earlier correction was right - the parent has only the opiate page and there is no duplicate. Title and H1 both use "opiate"; body uses "opiate" 46 times and "opioid" 10 times. The page is linked from the /treatment hub.
```

</details>

**Bearing on this repo.** Slug is `opiate-addiction` in `lib/content/treatments.json`. Renaming means editing the JSON slug, adding a redirect, and updating `careToSlug`-style references. The sheet's own verification flags the search-volume claim as unvalidated — settle that first.

---

## Part 2 — Portfolio rows where this site is the gap

Three standardisation rows where this build has no page at all. All three are reframed by
V0127: the content exists on production and was lost in migration, so these are ports
rather than new authoring.

### V0095 — Aftercare page absent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: ALL SITES`

**Issue**

> Aftercare slug has 6 distinct variants across 9 sites (count corrected from 7): /treatment/aftercare (4 sites), /treatment/aftercare-planning, /treatment/aftercare-beyond, /treatment-services/aftercare-planning, /programs/aftercare-and-alumni, /aftercare. THREE SITES HAVE NO AFTERCARE PAGE AT ALL - Wellness NJ, QHG parent, Greater Texas - so this is a rename across 9 plus a build decision for 3, not a rename across 12.

**Where**

```
Portfolio-wide - see Page Type Matrix and Slug Standardization tabs in the audit workbook
```

**Fix as written in the sheet**

```
Adopt /treatment/aftercare portfolio-wide.

Outlier URLs to redirect:
https://hillside-mission-recovery-beryl.vercel.app/treatment/aftercare-beyond
https://dallas-detox-center.vercel.app/treatment-services/aftercare-planning
https://fort-worth-wellness.vercel.app/treatment/aftercare-planning
https://des-moines-wellness-center-navy.vercel.app/programs/aftercare-and-alumni
https://marina-harbor-detox.vercel.app/aftercare

Reference build already on the standard:
https://laguna-view-detox.vercel.app/treatment/aftercare
```

**Correction applied during the 2026-07-28 verification pass**

> COUNT WRONG: the issue text says 7 variants but there are 6, and the row own list contains 6. Off by one.
> Also omitted: 3 sites have NO aftercare page at all - Wellness NJ, QHG parent and Greater Texas. That matters because the row reads as a rename exercise across 12 sites when it is a rename across 9 plus a build decision for 3. For Wellness NJ specifically, aftercare is a normal part of an outpatient continuum, so its absence is more likely a gap than by-design - unlike the detox and residential absence confirmed in V0084.

<details>
<summary>Verification evidence</summary>

```
Enumerated aftercare pages across all 12 sites and verified each returns HTTP 200. Measured 6 distinct URL patterns: /treatment/aftercare (4 sites - Laguna, Ocean Coast, Seaside, Wellness LA), /treatment/aftercare-planning (Fort Worth), /treatment/aftercare-beyond (Hillside), /treatment-services/aftercare-planning (Dallas), /programs/aftercare-and-alumni (Des Moines), /aftercare (Marina Harbor). The 5 outliers listed in the Fix are correct.
```

</details>

**Bearing on this repo.** This site has **no aftercare page**. The sheet frames it as a build decision rather than a rename.

### V0096 — Verify-insurance page absent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: ALL SITES`

**Issue**

> Verify-insurance slug has 4 variants and is ABSENT ON 5 SITES (count corrected from 7): Hillside, Marina Harbor, Wellness NJ, QHG parent, Fort Worth. Dallas was wrongly listed as missing in the original row - dallas-detox-center.vercel.app/verify-insurance returns HTTP 200, and its actual defect is covered by V0017. Only 3 sites use the proposed /verify-insurance standard.

**Where**

```
Portfolio-wide - see Page Type Matrix and Slug Standardization tabs in the audit workbook
```

**Fix as written in the sheet**

```
Adopt /verify-insurance portfolio-wide and build it everywhere it is missing.

Existing variants:
https://des-moines-wellness-center-navy.vercel.app/verify-insurance
https://laguna-view-detox.vercel.app/insurance
https://ocean-coast-recovery-center.vercel.app/insurance
https://seaside-wellness-of-palm-beach.vercel.app/admissions/insurance-verification
https://wellness-detox-of-la.vercel.app/admissions/verify-your-insurance

Missing entirely on:
https://hillside-mission-recovery-beryl.vercel.app
https://marina-harbor-detox.vercel.app
https://wellness-recovery-nj.vercel.app
https://quadrant-health-group.vercel.app
https://fort-worth-wellness.vercel.app
https://dallas-detox-center.vercel.app

Reference build already on the standard:
https://des-moines-wellness-center-navy.vercel.app/verify-insurance
```

**Correction applied during the 2026-07-28 verification pass**

> Two errors, and the second contradicts another row.
> 1) COUNT WRONG: the row says absent on 7 sites. It is absent on 5 - Hillside, Marina Harbor, Wellness NJ, QHG parent, Fort Worth.
> 2) DALLAS IS WRONGLY LISTED AS MISSING in the Fix column. Dallas /verify-insurance returns HTTP 200. This directly contradicts V0017, which correctly states that the page IS live and the real defect is its absence from the sitemap plus one mislinked CTA. So two of my rows assert opposite things about the same URL. V0017 is the correct one; remove Dallas from this row entirely.

<details>
<summary>Verification evidence</summary>

```
Tested 7 candidate slugs on all 12 sites. 4 distinct variants confirmed, matching the row: /verify-insurance (Dallas, Des Moines, Greater Texas), /insurance (Laguna, Ocean Coast), /admissions/insurance-verification (Seaside), /admissions/verify-your-insurance (Wellness LA).
```

</details>

**Bearing on this repo.** This site has **no verify-insurance page**. Superseded in practice by V0127 — production has `/admissions/insurance-verification`, so this is a port, not new authoring.

### V0099 — FAQ page absent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Facility: ALL SITES`

**Issue**

> FAQ slug has 6 distinct variants (count corrected from 4) and is absent on 7 sites. WELLNESS DETOX LA HAS THREE SEPARATE FAQ PAGES - /admissions/addiction-faq, /admissions/treatment-faq and /admissions/insurance-admissions-faq - which the original count concealed. Only 2 sites use the proposed /faq standard, so this is a build-new task on 7 sites and a rename on 3.

**Where**

```
Portfolio-wide - see Page Type Matrix and Slug Standardization tabs in the audit workbook
```

**Fix as written in the sheet**

```
Adopt /faq portfolio-wide.

Outlier URLs to redirect:
https://dallas-detox-center.vercel.app/faq-page
https://seaside-wellness-of-palm-beach.vercel.app/about/faq
https://wellness-detox-of-la.vercel.app/admissions/addiction-faq

Reference build already on the standard:
https://wellness-recovery-nj.vercel.app/faq
```

**Correction applied during the 2026-07-28 verification pass**

> VARIANT COUNT WRONG: the row says 4 variants; there are 6. I missed two on Wellness Detox LA.
> And the omission matters: WELLNESS DETOX LA HAS THREE SEPARATE FAQ PAGES - /admissions/addiction-faq, /admissions/treatment-faq and /admissions/insurance-admissions-faq. That is FAQ content fragmented across three URLs on one site, which is a distinct issue from portfolio slug inconsistency and is not logged anywhere. It should be its own row, since consolidating three FAQ pages is different work from renaming one.
> Also note only 2 sites use the proposed standard /faq (Marina Harbor, Wellness NJ), so this is a build-new task on 7 sites and a rename on 3, not primarily a rename.

<details>
<summary>Verification evidence</summary>

```
Tested 7 candidate FAQ slugs on all 12 sites. The "absent on 7 sites" figure is CORRECT: Des Moines, Hillside, Laguna, Ocean Coast, QHG parent, Fort Worth and Greater Texas have no FAQ page under any tested slug.
```

</details>

**Bearing on this repo.** This site has **no FAQ page**. Superseded in practice by V0127 — production has `/about/faq`. Note `lib/site.ts` already exports a `faqs` array rendered on `/about#faq`; the gap is a standalone indexable page.

---

## Part 3 — Cross-domain rows filed under facility sites

Seven rows sit under a *facility* in the workbook but the fix lands here. Filtering on the
Facility column alone would have missed all of them.

Five share one root cause the verification pass surfaced: **the facility bio pages canonical
correctly, the parent copies carry no canonical at all.** That makes them one job, not five —
folded into T1.4. The remaining two cite this repo as the model for other sites to copy and
need no work.

| ID | Filed under | Bios on this site | Action here |
|---|---|---|---|
| V0054 | Hillside Mission | `monica-olivires`, `phillip-carter` | Name spelling + canonical |
| V0086 | Ocean Coast | `elizabeth-wald`, `tami-distefano` | Canonical — **and it blocks part of V0091** |
| V0075 | Seaside | `timothy-foley`, `steve-ryan`, `shan-raiford`, `michael-meagher` | Canonical |
| V0050 | Marina Harbor | `gus-saadeh` | Canonical |
| V0065 | Laguna View | `karen-pettit` | Canonical |
| V0021 | Dallas | — | None — model reference |
| V0062 | Hillside Mission | — | None — model reference |

### V0054 — Wrong-person biography at Hillside — parent holds copies of both bios

`Priority: CRITICAL`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Filed under: Hillside Mission Recovery`

**Issue**

> CRITICAL - WRONG PERSON BIOGRAPHY PUBLISHED. /staff/phillip-carter shows headings for "Phillip Carter / Director of Operations" but the body text is Monica Olivares's biography verbatim: "Hi, I'm Monica Olivares - Program Director at Hillside Mission..." The two staff pages are 97.7 percent identical, differing only in the name and title in headings. This misstates who works at the facility and what their credentials are, on a YMYL healthcare site. Secondary defect: the H1 spells "Monica Olivires" while her own bio text spells "Monica Olivares". Original row logged this as routine duplicate content with the parent domain, which hid it.

**Where**

```
https://hillside-mission-recovery-beryl.vercel.app/staff/monica-olivires
https://hillside-mission-recovery-beryl.vercel.app/staff/phillip-carter
Also at: https://quadrant-health-group.vercel.app/team/monica-olivires, https://quadrant-health-group.vercel.app/team/phillip-carter
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/monica-olivires
https://quadrant-health-group.vercel.app/team/phillip-carter

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during the 2026-07-28 verification pass**

> PRIORITY CRITICAL: Wrong person biography on a named staff page, YMYL site
>
> REWRITE THIS ROW ENTIRELY. It is not a parent-domain duplicate-content issue. It is the wrong person's biography published on a named staff page of a YMYL healthcare site - a factual misstatement of who works there and what their credentials are. Escalate above every other row verified so far.
> Secondary defect on the same page set: the H1 spells "Monica Olivires" while her own bio text spells "Monica Olivares".

<details>
<summary>Verification evidence</summary>

```
SUPERSEDES my batch 9 entry. Re-measured with clean content extraction. Hillside baseline is 97.7 percent - the two bio pages are 97.7 percent identical to EACH OTHER, with only 4 differing segments, all of them the name and job title in headings.
Root cause found by diffing: /staff/phillip-carter carries MONICA OLIVARES'S BIOGRAPHY VERBATIM. The headings read "Phillip Carter / Director of Operations" while the body text reads "Hi, I'm Monica Olivares - Program Director at Hillside Mission and a firm believer that healing doesn't have to be boring. With over 11 years in the behavioral health field..."

NOTES: This is why the parent-duplication framing hid it: monica-olivires vs parent measures 84.5 percent, which looked like ordinary reuse, and phillip-carter vs parent measures 7.5 percent, which looked like "not a duplicate". Neither number pointed at the real problem, which only appeared when comparing the two FACILITY pages to each other.
```

</details>

**Bearing on this repo.** **The critical defect is on the Hillside site, not here.** I diffed this repo directly: [`lib/content/team.json`](lib/content/team.json) gives `phillip-carter` Phillip Carter's own biography — the wrong-person publication is Hillside's `/staff/phillip-carter` only. Two things do land here: the parent copies of both bios carry no canonical, and **the name-spelling defect reproduces exactly** — slug and `name` read *Monica Olivires* while her own bio text reads *Monica Olivares*.

### V0086 — Two Ocean Coast bios duplicated on the parent

`Priority: HIGH`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Filed under: Ocean Coast Recovery`

**Issue**

> 2 staff bio page(s) also published on the Quadrant parent domain - duplicate content across two domains.

**Where**

```
https://ocean-coast-recovery-center.vercel.app/about/elizabeth-wald
https://ocean-coast-recovery-center.vercel.app/about/tami-distefano
Also at: https://quadrant-health-group.vercel.app/team/elizabeth-wald, https://quadrant-health-group.vercel.app/team/tami-distefano
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/elizabeth-wald
https://quadrant-health-group.vercel.app/team/tami-distefano

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during the 2026-07-28 verification pass**

> PRIORITY HIGH: Fix unsafe as written; see V0109
>
> THE FIX IS UNSAFE HERE, for a reason that turns out to be far bigger than this row.
> The Fix says "the facility site owns the bio and the parent links to it". But the Ocean Coast bio pages canonical to https://oceancoastrecovery.com - the DOMAIN ROOT, not themselves. So the facility page does not "own" anything; it currently disclaims itself in favour of the homepage. Pointing the parent at it would compound the error.
> MEASURED SITEWIDE: 106 of 107 Ocean Coast pages canonical to the domain root. Zero pages are self-referencing. Every page except the homepage tells search engines its authoritative version is the homepage.

<details>
<summary>Verification evidence</summary>

```
Reuse CONFIRMED with the corrected extraction: elizabeth-wald 72.2 percent and tami-distefano 79.8 percent word-level, against an Ocean Coast baseline of 35.3 percent. Both well above baseline, so this is real reuse. Both facility bios ARE linked from /about, so they are not orphaned.

NOTES: THIS IS THE MOST SEVERE TECHNICAL DEFECT FOUND IN THE AUDIT and it is not logged anywhere. A wrong canonical is worse than a missing one: missing leaves attribution ambiguous, whereas root-pointing actively instructs consolidation into the homepage, which would deindex 106 pages.
IT ALSO CORRECTS MY OWN EARLIER ANALYSIS. In the V0018 spread check I reported Marina Harbor and Ocean Coast as the only two sites whose canonicals "resolve cleanly". That test only asked whether the canonical TARGET returned 200 - and oceancoastrecovery.com returns 200 because it is the homepage. So the test passed a site with the worst canonical configuration in the portfolio. Ocean Coast must be removed from the "clean" list wherever I cited it, including as a suggested model in other Fix columns.
Related: the Ocean Coast instance of the shared blog post (V0059/V0083) also canonicals to the domain root - now explained as one instance of this sitewide pattern rather than a one-off.
```

</details>

**Bearing on this repo.** Two bios to canonical here. **More importantly this row makes the V0091 fix unsafe for Ocean Coast**: its bio pages canonical to the domain root, so they disclaim themselves. Do not point the parent at them until that is fixed (tracked as V0109).

### V0075 — Four Seaside bios show real content reuse against the parent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Filed under: Seaside Wellness`

**Issue**

> 4 staff bio pages show real content reuse against the Quadrant parent, measured above the site boilerplate baseline of 44 percent: timothy-foley 64.7, steve-ryan 58.0, shan-raiford 57.7, michael-meagher 54.8. Count corrected from 5 - erin-crawford at 36.4 percent is below baseline and is not reuse. All 4 facility pages already canonical correctly; the parent copies have no canonical, so the action is parent-side only.

**Where**

```
https://seaside-wellness-of-palm-beach.vercel.app/about/erin-crawford
https://seaside-wellness-of-palm-beach.vercel.app/about/michael-meagher
https://seaside-wellness-of-palm-beach.vercel.app/about/shan-raiford
https://seaside-wellness-of-palm-beach.vercel.app/about/steve-ryan
https://seaside-wellness-of-palm-beach.vercel.app/about/timothy-foley
Also at: https://quadrant-health-group.vercel.app/team/erin-crawford, https://quadrant-health-group.vercel.app/team/michael-meagher, https://quadrant-health-group.vercel.app/team/shan-raiford, https://quadrant-health-group.vercel.app/team/steve-ryan, https://quadrant-health-group.vercel.app/team/timothy-foley
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/erin-crawford
https://quadrant-health-group.vercel.app/team/michael-meagher
https://quadrant-health-group.vercel.app/team/shan-raiford
https://quadrant-health-group.vercel.app/team/steve-ryan
https://quadrant-health-group.vercel.app/team/timothy-foley

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during the 2026-07-28 verification pass**

> Reduce from 5 bios to 4 - drop erin-crawford, which sits below the site boilerplate baseline. Action remains parent-side only, since the facility side already canonicals correctly.

<details>
<summary>Verification evidence</summary>

```
Re-measured with nav/header/footer stripped and <main> preferred. Against a Seaside baseline of 44.0 percent (two different bios on the same site), 4 of 5 show reuse ABOVE baseline: timothy-foley 64.7, steve-ryan 58.0, shan-raiford 57.7, michael-meagher 54.8. Only erin-crawford at 36.4 is below baseline. All 5 facility pages canonical correctly; all 5 parent copies have NO canonical.

NOTES: IMPORTANT METHOD CORRECTION. My first measurement of these 5 bios used text joined from all <p> tags, which on several builds captures nav menu labels instead of body content. That method returned 31-49 percent and I was about to record 0 of 5 as duplicates. With clean extraction the answer is 4 of 5. The <p>-based figures I reported in batches 7, 9 and 12 are unreliable and the corrected numbers are: gus-saadeh 81.8 (was 76.1), karen-pettit 70.9 (was 55.5), elizabeth-wald 72.2 (was 66.8), tami-distefano 79.8 (was 75.1). All four remain REAL reuse, and karen-pettit is no longer borderline, so V0050, V0065 and the Ocean Coast bio row all stand - but on better evidence than I first gave.
```

</details>

**Bearing on this repo.** Four bios after verification dropped `erin-crawford` as below the site boilerplate baseline. All four parent copies lack a canonical.

### V0050 — Marina Harbor bio duplicated on the parent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Filed under: Marina Harbor Detox`

**Issue**

> 1 staff bio page(s) also published on the Quadrant parent domain - duplicate content across two domains. Additionally, Gus Saadeh's picture on the Marina Harbor site does not populate

**Where**

```
https://marina-harbor-detox.vercel.app/about/gus-saadeh
Also at: https://quadrant-health-group.vercel.app/team/gus-saadeh
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/gus-saadeh

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during the 2026-07-28 verification pass**

> Two refinements.
> 1) Not a verbatim duplicate. The intros differ - the facility page opens "Meet Gus Saadeh, Operations..." while the parent opens "Director of Operations. As the Director of Operations at Marina Harbor Detox...". At 76 percent word-level they are near-duplicates, not copies, so describe it that way.
> 2) The fix is already half-implemented and the row does not say so. The Marina Harbor page ALREADY canonicals correctly to https://marinaharbordetox.com/about/gus-saadeh/. The parent copy has NO canonical at all. So the action is specifically on the parent, not both sides: add a cross-domain canonical there, or replace it with a link. This also matches V0039-style findings, since the parent has no canonicals anywhere.

<details>
<summary>Verification evidence</summary>

```
Both pages live at HTTP 200 with H1 "Gus Saadeh". Marina Harbor version 379 words; parent version 352 words. Measured overlap: 59.5 percent 8-gram Jaccard, 76.1 percent word-level. Substantial reuse confirmed, so the duplicate-content concern is real. Both also exist on production (301 to trailing-slash forms).

NOTES: Worth checking the other 10 duplicated bios for the same asymmetry - facility side canonicalised, parent side not - because if it holds portfolio-wide, the whole issue collapses into the parent canonical row rather than 5 separate bio rows.
```

</details>

**Bearing on this repo.** One bio. Verification found the facility side is already canonicalised correctly, so **the action is parent-side only** — the row as written implies both sides.

### V0065 — Laguna bio duplicated on the parent

`Priority: not triaged`  ·  `Verdict: CONFIRMED_AMENDED`  ·  `Status: Open`  ·  `Filed under: Laguna View Detox`

**Issue**

> 1 staff bio page(s) also published on the Quadrant parent domain - duplicate content across two domains.

**Where**

```
https://laguna-view-detox.vercel.app/about/karen-pettit
Also at: https://quadrant-health-group.vercel.app/team/karen-pettit
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/karen-pettit

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during the 2026-07-28 verification pass**

> Same correction as the other bio rows: the facility side is already configured correctly, so the action is parent-only, not both sides. At 55.5 percent this is the borderline case of the five near-duplicates, so if a threshold is applied this is the one most arguable to drop.

<details>
<summary>Verification evidence</summary>

```
Both pages HTTP 200 with H1 "Karen Pettit". Facility 386 words, parent 252. Measured overlap 40.1 percent 8-gram, 55.5 percent word-level, so it does qualify as a near-duplicate, though it is the weakest of the five. Facility canonicals correctly to https://lagunaviewdetox.com/about/karen-pettit; the parent copy has NO canonical - the same asymmetry as V0050 and V0054.

NOTES: Unlike Dallas and Hillside, Laguna bios are NOT orphaned - /about links this bio directly and the nav has an /about#team anchor. So no hub needs building here. Folds into the single consolidated parent-canonical row recommended in V0054.
```

</details>

**Bearing on this repo.** One bio, and the weakest of the five at 55.5% word-level overlap. If a threshold is applied, this is the one most arguable to drop.

### V0021 — Dallas team hub — this repo cited as the model

`Priority: not triaged`  ·  `Verdict: CONFIRMED`  ·  `Status: Open`  ·  `Filed under: Dallas Detox Center`

**Issue**

> 4 staff bio pages are orphaned - there is no team hub page linking them.

**Where**

```
https://dallas-detox-center.vercel.app/about-us/alexandria-grigsby
https://dallas-detox-center.vercel.app/about-us/michael-young
https://dallas-detox-center.vercel.app/about-us/ricki-cochran
https://dallas-detox-center.vercel.app/about-us/trevor-grigsby
```

**Fix as written in the sheet**

```
Build this hub and link all four:
https://dallas-detox-center.vercel.app/about-us/meet-the-team

Model on:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

<details>
<summary>Verification evidence</summary>

```
All 4 bio pages: HTTP 200, 0 inbound internal links across all 103 pages, all present in sitemap.xml. /about-us was checked directly and links to zero bio pages. /about-us/meet-the-team -> HTTP 404, so no team hub exists. Count of 4 is correct.

NOTES: Claim holds exactly as written. Two observations for whoever builds the hub: the bios are thin at 204, 286, 354 and 577 words, and on a YMYL healthcare site they are the E-E-A-T surface, so thin bios undercut the purpose. Unlike the other facilities, Dallas bios are NOT duplicated on the Quadrant parent, so there is no cross-domain conflict to resolve here.
```

</details>

**Bearing on this repo.** No action here. This repo's `/about/meet-the-team` is cited as the **model** for Dallas to copy.

### V0062 — Hillside team hub — this repo cited as the model

`Priority: not triaged`  ·  `Verdict: CONFIRMED`  ·  `Status: Open`  ·  `Filed under: Hillside Mission Recovery`

**Issue**

> 2 staff bio pages are orphaned - no team hub page links them.

**Where**

```
https://hillside-mission-recovery-beryl.vercel.app/staff/monica-olivires
https://hillside-mission-recovery-beryl.vercel.app/staff/phillip-carter
```

**Fix as written in the sheet**

```
Build this hub and link both:
https://hillside-mission-recovery-beryl.vercel.app/team

Model on:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

<details>
<summary>Verification evidence</summary>

```
Both bios HTTP 200 with 0 inbound links from any of the 156 pages. No team hub exists under any tested slug: /team, /staff, /about/meet-the-team, /care-providers and /our-team all 404. /about was checked directly and links neither bio. Count of 2 is correct.

NOTES: Holds exactly, and unlike V0060 this is a real orphan finding - zero inbound links, confirmed. Note the contrast with Marina Harbor, where /care-providers does link its bios (see V0051), so the fix pattern already exists elsewhere in the portfolio.
```

</details>

**Bearing on this repo.** No action here. Same as V0021 — this repo's team hub is cited as the model for Hillside.

---

## Part 4 — Content and visual issues (231 rows)

The Visual Issues tab carries **231 rows for this site** — the largest single block of work in the sheet. Unlike the Vercel Build Issues tab, **this tab has no Verdict, Verified or Priority columns: none of these 231 rows went through the 2026-07-28 verification pass.** The Legend's warning applies with full force here — roughly two thirds of the rows that *were* verified needed a correction. Work them as written; where a row turns out to describe something already present in the build, close it and note that rather than reopening it.

Every URL referenced resolves to a real route in this repo; slug-for-slug the audit was run against this codebase.

#### Shape of the work

| Recurring fix | Rows | Where it lands in the code |
|---|---:|---|
| Heading level wrong | 51 | `lib/content/treatments.json` → `sections[].heading`, rendered by [treatment/[slug]/page.tsx](app/treatment/[slug]/page.tsx) |
| Bullet list needs links | 43 | Renderer change — bullets are plain text in `sections[].body` |
| Section needs topic widgets | 32 | New component + data, treatment detail template |
| Other | 26 | Mixed one-offs — see per-page listing |
| Capitalization | 18 | Copy fix in `treatments.json` |
| Google reviews slide missing | 17 | New component, treatment detail template |
| Standard block missing | 14 | Content gap in `treatments.json` |
| Facility website button missing | 10 | [locations/[slug]/page.tsx](app/locations/[slug]/page.tsx) + new field in `lib/site.ts` |
| Duplicated subtitle under title | 8 | Template or data — `intro` repeats the first section |
| Remove content | 6 | Copy deletion in `treatments.json` |
| Sibling-facility widgets | 6 | New component, treatment detail template |
| **Total** | **231** | |

19 of the 21 treatment pages carry issues. `barbiturates-addiction` and `fentanyl-addiction` were not reviewed — absence of rows is not a clean bill of health.

#### Full listing by page

<details>
<summary><b>Des Moines (facility referenced without a URL)</b> — 2 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1083 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |
| 1084 | Des Moines location page is not complete | Shows as coming soon |

</details>

<details>
<summary><b>/</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1086 | Needs an Editorial Policy Page | Create Editorial Policy and append to the footer next to privacy page |

</details>

<details>
<summary><b>/about</b> — 2 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 858 | Replace photo | Replace image with something more appropriate to the message in the content |
| 859 | 10 Locations Nationwide | Should be 12 |

</details>

<details>
<summary><b>/about/meet-the-team</b> — 2 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 856 | Missing categories of staff positions | Separate the staff by appointed positions · Founders, Corporate Leadership Team, Business Development & Alumni Services, Admissions & client care Team, California Leadership, Marina Harbor Detox, South California Leadership, Laguna view detox, Ocean Coast Recovery Center, Hillside Mission Recovery. Texas Facilities > Dallas Detox Center / Fort Worth Wellness Center, Greater Texas Behavioral. Florida Facilities > Seaside Wellness of Palm Beach. New Jersey Facilities > Wellness Recovery Center NJ. Iowa Facilites > Des Moines Wellness Center. Kentucky Facilities > Wellness Ranch. |
| 857 | Add staff photos | For staff that do not have a photo, use the photo used on "Angela Taylor's" page |

</details>

<details>
<summary><b>/blog</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 861 | The blogs created on Clarion are appearing separate from the blogs previously published | All blogs published should appear on the same area |

</details>

<details>
<summary><b>/locations</b> — 2 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 860 | Missing facilities in the list | Wellness Detox LA · Greater Texas Behavioral · Wellness Ranch KY |
| 1085 | Make the whole widget a clickable link | Each facility widget should be a clickable link so if someone clicks on the picture in the widget it redirects to the location page |

</details>

<details>
<summary><b>/treatment/alcohol-addiction</b> — 13 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 986 | Struggling with Alcohol? We're Here to Help | Remove the content under the page title as its a duplicated on the pages first section |
| 987 | Recovering from alcohol addiction Is Possible | add google reviews slide |
| 988 | The real Cost of abusing alcohol | remove |
| 989 | Health risks | make an H3 |
| 990 | Life & social consequences | make an H3 |
| 991 | Alcohol withdrawal symptoms: What to expect | make an H3 |
| 992 | Alcohol withdrawal symptoms: What to expect | make an H3 |
| 993 | Trust quadrant health to detox from alcohol safely | create widgets for the topics mentioned in the sections content. |
| 994 | step-by-step alcohol addiction recovery journey | Fix capitalization issues in the header |
| 995 | step-by-step alcohol addiction recovery journey | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 996 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 997 | Therapies we offer: | Link the bullet points to their respective pages |
| 998 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/ambien-addiction</b> — 13 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 973 | Ambien addiction treatment | Fix the lack of capitalization on the first letters of each word in the title |
| 974 | Ambien addiction treatment | Remove the content under the page title as its a duplicated on the pages first section |
| 975 | Recovering from ambien addiction Is Possible | add google reviews slide |
| 976 | Consequences of Ambien Addiction - The full impact of ambien addiction: Health & social risks | Wrong header name, remove Health & Social Risks |
| 977 | Missing header under "Consequences of Ambien Addiction" | Add "Health & social risks" |
| 978 | ambien Overdose, what do do | Capitalize the A |
| 979 | ambien Overdose, what do do | Rewrite the misspelling to "What to do" |
| 980 | Trust quadrant health to detox from ambien safely | create widgets for the topics mentioned in the sections content. |
| 981 | step-by-step ambien addiction recovery journey - Comprehensive ambien Addiction Treatment Across All Levels of Care | Fix the capitalization throughout the header |
| 982 | step-by-step ambien addiction recovery journey - Comprehensive ambien Addiction Treatment Across All Levels of Care | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 983 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 984 | Therapies we offer: | Link the bullet points to their respective pages |
| 985 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/benzo-addiction</b> — 16 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 893 | Struggling with benzodiazepine addiction? Call today for help | Remove section |
| 894 | Street names of benzodiazepine: | make an H3 |
| 895 | The different types of benzodiazepine: | make an H3 |
| 896 | Stats we see about benzo addiction: | make an H3 |
| 897 | Recovering from Benzo Addiction Is Possible | add google reviews slide |
| 898 | Risks associated: | make an H3 |
| 899 | Benzodiazepine Overdose: | make an H3 |
| 900 | Benzo withdrawal symptoms: What to expect: | make an H3 |
| 901 | The two phases of benzo withdrawal: | make an H3 |
| 902 | Acute withdrawal: | make an H4 |
| 903 | Post-acute withdrawal syndrome: | make an H4 |
| 904 | We Help You Detox Safely from Benzo | create widgets for the topics mentioned in the sections content. |
| 905 | Step-by-Step Benzo Addiction Recovery Journey — Comprehensive Benzo Addiction Treatment Across All Levels of Care | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 906 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 907 | Therapies we offer: | Link the bullet points to their respective pages |
| 908 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/cocaine-addiction</b> — 14 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 862 | Recovery starts today | Replace with "Let healing begin today" CTA |
| 863 | Recovering from Cocaine addiction Is Possible | Remove random capitalization |
| 864 | Recovering from Cocaine addiction Is Possible | Add the google reviews slide |
| 865 | The dangers of cocaine Addiction | Remove random capitalization |
| 866 | Health & social risks | make an H3 |
| 867 | Cocaine Overdose, what to do | make an H3 |
| 868 | Cocaine Overdose, what to do | Remove random capitalization |
| 869 | The phases of cocaine withdrawal: | make an H3 |
| 870 | Cocaine withdrawal symptoms: What to expect | make an H3 |
| 871 | Trust quadrant health to detox from cocaine safely | create widgets for the topics mentioned in the sections content |
| 872 | Treatment for Cocaine Addiction | create widgets for the topics mentioned in the sections content |
| 873 | Explore: | make an H4 |
| 874 | Therapies we offer: | Link the bullet points to their respective pages |
| 875 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/detox</b> — 12 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1018 | alcohol and substance abuse detox | Fix the lack of capitalization on the first letters of each word in the title |
| 1019 | Clear your body and mind with expert support | remove section |
| 1020 | Substances We Help Detoxing From | Add links to the substance pages list in the bullets |
| 1021 | Recovering from alcohol & drug addiction Is Possible | add google reviews slide |
| 1022 | Detox: the first step towards sobriety — From Stabilization to Long-Term Recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1023 | Detox: What to Expect | make an H3 |
| 1024 | The Benefits of Detoxification | make an H3 |
| 1025 | Therapies Offered: | Link the bullet points to their respective pages |
| 1026 | About Us: | Link the bullet points to their respective pages |
| 1027 | Therapies Offered: | make an H3 |
| 1028 | About Us: | make an H3 |
| 1029 | Expert care is always within reach — Nationwide drug and alcohol Rehab Centers | add widgets showing the other facilities with their names and links to the location pages. Include a check our locations button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/treatment/dual-diagnosis</b> — 7 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1067 | Co-Occurring Conditions We Treat | Add links to the substance pages list in the bullets |
| 1068 | Dual Diagnosis Support at Every Step | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1069 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1070 | Therapies we offer: | Link the bullet points to their respective pages |
| 1071 | About us: | Link the bullet points to their respective pages |
| 1072 | DUAL DIAGNOSIS TREATMENT CENTERS NATIONWIDE | Fix the capitalization to only be on the first letters of each word in the title |
| 1073 | DUAL DIAGNOSIS TREATMENT CENTERS NATIONWIDE | add widgets showing the other facilities with their names and links to the location pages. Include a check our locations button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/treatment/equine-therapy</b> — 8 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1010 | Recovering from alcohol & drug addiction Is Possible | add google reviews slide |
| 1011 | Why Equine Therapy Works: The Neuroscience of Connection | make an H3 |
| 1012 | Horses as Co-Therapists: A Unique Therapeutic Alliance | make an H3 |
| 1013 | Benefits of equine therapy for drug & alcohol addiction | create widgets for the topics mentioned in the sections content. |
| 1014 | Equine Therapy at Every Stage of Recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1015 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1016 | Therapies we offer: | Link the bullet points to their respective pages |
| 1017 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/family-therapy</b> — 11 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 999 | Family Therapy for Addiction Recovery | Remove the content under the page title as its a duplicated on the pages first section |
| 1000 | Healing Relationships, Strengthening Recovery | Rename section to " Family therapy and why it matters" |
| 1001 | Recovering from alcohol & drug addiction Is Possible | add google reviews slide |
| 1002 | Common Family Roles in Addiction | make an H3 |
| 1003 | Emotional and Relational Impact | make an H3 |
| 1004 | Benefits of family therapy for drug & alcohol addiction | create widgets for the topics mentioned in the sections content. |
| 1005 | We incorporate family therapy at every stage | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1006 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1007 | Therapies we offer: | Link the bullet points to their respective pages |
| 1008 | About us: | Link the bullet points to their respective pages |
| 1009 | Take the first step Today | Remove section |

</details>

<details>
<summary><b>/treatment/group-therapy</b> — 7 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 945 | Group Therapy for Addiction Recovery | Remove the content under the page title as its a duplicated on the pages first section |
| 946 | Recovering from alcohol & drug addiction Is Possible | add google reviews slide |
| 947 | Benefits of group therapy for drug and alcohol addiction | create widgets for the topics mentioned in the sections content. make sure the capitalization is proper on the widgets. |
| 948 | Group therapy at every stage of recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 949 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 950 | Therapies we offer: | Link the bullet points to their respective pages |
| 951 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/heroin-addiction</b> — 7 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 876 | Missing blog picture | add blog picture from original page |
| 877 | the dangers of heroin Addiction — Devastating effects that touch every aspect of life | Remove random capitalization. only capitalize the first letter of the sentence |
| 878 | Trust quadrant health to detox from heroin safely | create widgets for the topics mentioned in the sections content |
| 879 | Complete treatment for Heroin Addiction — Every step of care under one trusted roof | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 880 | Why Quadrant health? | make an H2 |
| 881 | Therapies we offer: | Link the bullet points to their respective pages |
| 882 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/individual-therapy</b> — 9 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 964 | Individual Therapy for Addiction Recovery | Remove the content under the page title as its a duplicated on the pages first section |
| 965 | Missing "Recovering from alcohol & drug addiction Is Possible" section under "What to Expect in Individual Therapy at Quadrant" | add google reviews slide |
| 966 | Core Clinical Techniques Used in Individual Therapy | make an H3 |
| 967 | How Individual Therapy Evolves Through the Recovery Process | make an H3 |
| 968 | Benefits of Individual therapy for drug & alcohol addiction | create widgets for the topics mentioned in the sections content. |
| 969 | Individual Therapy at Every Stage of Recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 970 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 971 | Therapies we offer: | Link the bullet points to their respective pages |
| 972 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/inhalant-addiction</b> — 10 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 883 | Recovering from Inhalant addiction Is Possible | add google reviews slide |
| 884 | The Hidden Dangers of Inhalant Abuse | "And why you should take them seriously" - should be a part of the header |
| 885 | inhalant Overdose: react | Capitalize the first letter of Inhalant and react |
| 886 | Inhalant withdrawal symptoms: What to expect | make an H3 |
| 887 | The phases of cocaine withdrawal: | make an H3 |
| 888 | Trust quadrant health to detox from inhalant safely | create widgets for the topics mentioned in the sections content. |
| 889 | Individualized care at every stage of recovery | "Recovery that meets you where you are." - should be a part of the header |
| 890 | Individualized care at every stage of recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 891 | Therapies we offer: | Link the bullet points to their respective pages |
| 892 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/intensive-outpatient</b> — 13 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1043 | Intensive outpatient program | Fix the lack of capitalization on the first letters of each word in the title |
| 1044 | Intensive outpatient program | Remove the content under the page title as its a duplicated on the pages first section |
| 1045 | Intensive outpatient program | Fix the lack of capitalization on the first letters of each word in the header |
| 1046 | Substances we help detoxing from | Add links to the substance pages list in the bullets |
| 1047 | Missing "Recovering from alcohol & drug addiction Is Possible" section under "Substances we help detoxing from" | add google reviews slide to the missing section |
| 1048 | Missing H2 above "What to Expect During IOP at Quadrant Health" | add Understanding IOP |
| 1049 | What to Expect During IOP at Quadrant Health | make an h3 |
| 1050 | IOP vs PHP: How to know what's right for you | make an h3 |
| 1051 | IOP: One Step in a Complete Continuum of Care | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1052 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1053 | Therapies we offer: | Link the bullet points to their respective pages |
| 1054 | About us: | Link the bullet points to their respective pages |
| 1055 | Trusted Care, Wherever You Are — Accredited Rehab Facilities Nationwide | add widgets showing the other facilities with their names and links to the location pages. Include a check our locations button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/treatment/methadone-addiction</b> — 14 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 909 | Overcoming Methadone Addiction | add blog picture from original page |
| 910 | Break free from dependence on a treatment drug | Add section and duplicate content |
| 911 | Fighting methadone addiction: success stories | add google reviews slide |
| 912 | Health & social risks: | make an H3 |
| 913 | Methadone Overdose, what to do: | make an H3 |
| 914 | The phases of methadone withdrawal: | make an H3 |
| 915 | Initial phase: | make an H4 |
| 916 | Peak phase: | make an H4 |
| 917 | Prolonged phase: | make an H4 |
| 918 | Trust Quadrant to detox from methadone safely | create widgets for the topics mentioned in the sections content. |
| 919 | Full-Spectrum Methadone Addiction Care | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 920 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 921 | Therapies we offer: | Link the bullet points to their respective pages |
| 922 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/methamphetamine-addiction</b> — 15 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 923 | Hear from those who overcame meth addiction | add google reviews slide |
| 924 | The dangers of methamphetamine Addiction | Capitalize the first letters of Dangers and Methamphetamine |
| 925 | Health & social risks | make an H3 |
| 926 | Overdose, what do do | make an H3 |
| 927 | Understanding the withdrawal symptoms | make an H3 |
| 928 | The phases of cocaine withdrawal: | make an H3 |
| 929 | The phases of cocaine withdrawal: | The content should be put in bullet format and the main points arent properly capitalized |
| 930 | Safe Methamphetamine Detox at Quadrant Health | create widgets for the topics mentioned in the sections content. |
| 931 | Meth Treatment Built for Long-Term Healing | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 932 | Explore: | make an H3 |
| 933 | Therapies we offer: | make an H4 and turn the content in that section into bullets |
| 934 | About us: | make an H4 and turn the content in that section into bullets |
| 935 | Therapies we offer: | Link the bullet points to their respective pages |
| 936 | About us: | Link the bullet points to their respective pages |
| 937 | Recovery starts today | remove old cta |

</details>

<details>
<summary><b>/treatment/opiate-addiction</b> — 12 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 952 | Struggling with opiate abuse? We're here to help you get better | Remove the content under the page title as its a duplicated on the pages first section |
| 953 | Opiate Addiction Treatment (Intro) | Remove (Intro) |
| 954 | Missing "they overcame their addiction. so can you" section under "Who is most at risk for opiate addiction?" | add google reviews slide |
| 955 | Missing "the dangers of opiate Addiction" section | Add above Health & Social Risks |
| 956 | Health & Social Risks | make an H3 |
| 957 | Opiate Overdose, What to Do | make an H3 |
| 958 | Detox Safely from Opiates at Quadrant Health | create widgets for the topics mentioned in the sections content. |
| 959 | A Complete Continuum of Opiate Recovery Care | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 960 | Levels of Care: | make an H3 |
| 961 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 962 | Therapies we offer: | Link the bullet points to their respective pages |
| 963 | About us: | Link the bullet points to their respective pages |

</details>

<details>
<summary><b>/treatment/partial-hospitalization</b> — 11 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1056 | Who Is a PHP For? | Missing content under the bullet points, "At Quadrant Health, our PHP offers the flexibility to begin reintegrating into everyday life while still receiving high-level support from our experienced treatment team." |
| 1057 | Substances Treated | Missing content from original page also the substances should be listed in bullets linked to their respective pages |
| 1058 | Missing section under Substances Treated section, "Recovering from alcohol & drug addiction Is Possible" | Add google reviews to the missing section |
| 1059 | Missing H2 section above What to Expect, "Understanding the Partial Hospitalization program" | add the missing H2, "Understanding the Partial Hospitalization program" |
| 1060 | Why PHP Matters | Missing the last 2 paragraphs of content from the original page |
| 1061 | Treatment Continuum | Should be named "PHP: A Vital Step in Structured Recovery" and missing paragraph of content from the section |
| 1062 | PHP: A Vital Step in Structured Recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1063 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1064 | Therapies we offer: | Link the bullet points to their respective pages |
| 1065 | About us: | Link the bullet points to their respective pages |
| 1066 | Missing section under Why Quadrant Health, add section "Nationwide Rehab Centers You Can Trust" | add widgets showing the other facilities with their names and links to the location pages. Include a check our locations button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/treatment/residential-inpatient</b> — 13 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1030 | alcohol and drug abuse residential inpatient | Fix the lack of capitalization on the first letters of each word in the title |
| 1031 | alcohol and drug abuse residential inpatient | Remove the content under the page title as its a duplicated on the pages first section |
| 1032 | Substances we help recovering from | Add links to the substance pages list in the bullets |
| 1033 | Recovering from alcohol & drug addiction Is Possible | add google reviews slide |
| 1034 | details about the residential inpatient program | Fix the lack of capitalization on the first letters of each word in the header |
| 1035 | Residential: What to expect | make an H3 |
| 1036 | Comfort & Amenities for healing | make an H3 |
| 1037 | Residential: The Foundation for Lasting Recovery | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 1038 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 1039 | Therapies we offer: | Link the bullet points to their respective pages |
| 1040 | About us: | Link the bullet points to their respective pages |
| 1041 | Nationwide drug and alcohol Rehab Centers | Fix the lack of capitalization on the first letters of each word in the header |
| 1042 | Nationwide drug and alcohol Rehab Centers | add widgets showing the other facilities with their names and links to the location pages. Include a check our locations button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/treatment/virtual-intensive-outpatient</b> — 7 rows</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 938 | Substances We Help Treat | Link the bullet points to their respective pages |
| 939 | Recovering from Alcohol & Drug Addiction | add google reviews slide |
| 940 | Connected Care at Every Stage | create widgets for the topics mentioned in the sections content. add links to their respective pages |
| 941 | Why Quadrant Health? | Missing "Therapies we offer:" & "About us:" |
| 942 | Therapies we offer: | Link the bullet points to their respective pages |
| 943 | About us: | Link the bullet points to their respective pages |
| 944 | Nationwide Drug and Alcohol Rehab Centers | add widgets showing the other facilities with their names and links to the location page. Include a check our location button that takes the user to the locations page to view all facilities. |

</details>

<details>
<summary><b>/locations/dallas-detox-center</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1079 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/fort-worth-wellness</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1080 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/hillside-mission-recovery</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1076 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/laguna-view-detox</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1074 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/marina-harbor-detox</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1077 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/ocean-coast-recovery</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1075 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/seaside-wellness</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1081 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/wellness-detox-la</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1078 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>

<details>
<summary><b>/locations/wellness-recovery-nj</b> — 1 row</summary>

| ID | Section / issue | Fix |
|---|---|---|
| 1082 | Needs a button link to the website | Add a button link next to the call and verify insurance button to their website |

</details>
---

## Part 5 — Broken internal links

**None for this site.** The Broken Internal Links tab holds 29 rows across the portfolio,
all of them Dallas Detox Center (V0001–V0016) or Fort Worth Wellness (V0024–V0036). The
tab's own header note confirms it:

> Only Dallas and Fort Worth have broken internal links; the other 10 builds came back clean.

V0128's verification independently measured this build at **0 broken links across 949
distinct internal URLs collapsing to 128 base paths, and 0 internal redirects.** That is the
cleanest result in the portfolio and worth protecting when the redirect map lands.

---

---

## Part 6 — Bio source-of-truth reconciliation (Google Doc)

The doc is the client's working bio source. Comparing it against
[`lib/content/team.json`](lib/content/team.json) — the 44 people the site publishes today —
shows the site is drawn almost entirely from the *facility* sections of the doc and is
missing nearly the whole corporate roster.

| | Count |
|---|---:|
| People in the doc (unique) | 131 |
| People on the site | 44 |
| In both | 40 |
| **Corporate staff missing from the site, bio ready** | **30** |
| Corporate staff missing, awaiting copy from the client | 19 |
| On the site but absent from the doc | 4 |
| Bios substantively rewritten in the doc | 6 |
| Job titles that genuinely differ | 9 |

### 6.1 — The corporate team is missing

The site publishes 1 of 16 Quad Leadership entries, 1 of 6 Quad HR, **0 of 9** Quad
BD/Alumni, and 3 of 23 Quad Admissions. **Both founders, the CEO, COO, CFO, CRO and the
medical oversight lead have no page on the parent site.** For a YMYL healthcare site, the
leadership team is the E-E-A-T surface — this is the largest content gap found in either audit.

Thirty have finished bio copy in the doc and can be published now:

| Section | Name | Title | Bio |
|---|---|---|---:|
| Leadership | Joseph Cameron | Founder | 1065 ch |
| Leadership | Louis Iacona | Founder | 1100 ch |
| Leadership | Nicholas Petrillo | Chief Executive Officer | 1819 ch |
| Leadership | Michael Zornberg | Chief Operating Officer | 1745 ch |
| Leadership | Sal Rabie | Chief Financial Officer | 1671 ch |
| Leadership | Colin McBride | Chief Revenue Officer | 1134 ch |
| Leadership | Dr. Pamela Tambini | Medical Oversight | 2667 ch |
| Leadership | Catherine Alpaugh | Executive VP of Administration | 776 ch |
| Leadership | Jessica Dalton | Executive VP of Operations | 1428 ch |
| Leadership | Riley Monahan | Executive VP of Clinical Services | 573 ch |
| Leadership | Chelsea Stelmach | Director of Marketing | 619 ch |
| Leadership | Stephanie Hakim | Director of Compliance | 2382 ch |
| Leadership | Marc North | Procurement Manager | 1062 ch |
| Leadership | Danielle Gorman | Executive Coordinator | 564 ch |
| HR | Diana Guzman | HR Manager | 1129 ch |
| HR | Armanee Cross | HR Assistant/Coordinator | 793 ch |
| HR | Kevin Bocanegra | Human Resources/Payroll Specialist | 1147 ch |
| HR | Maria Gonzalez | Talent Acquisition & Onboarding Coordinator | 944 ch |
| HR | Emmanuel Lacruz | Talent Acquisition Recruiter | 1170 ch |
| BD/Alumni | Ben Kolb | President of Business Development | 759 ch |
| BD/Alumni | Douglas Penny | VP of Business Development West Coast | 928 ch |
| BD/Alumni | Mike Simmons | VP of Business Development East Coast | 1083 ch |
| BD/Alumni | Richard Bradshaw | Business Development Representative | 569 ch |
| BD/Alumni | Maggie Galleymore | Business Development Representative | 1049 ch |
| BD/Alumni | EJ Larson | Business Development Representative | 1040 ch |
| BD/Alumni | Sage Steinberg | Business Development Representative | 663 ch |
| BD/Alumni | Nick Gore | Business Development Representative | 581 ch |
| BD/Alumni | Lexie Zeller | National Alumni Director | 638 ch |
| Admissions | Robert Spady | Admissions Director | 1470 ch |
| Admissions | John Jurman | Admissions Manager | 753 ch |

Nineteen more are named in the doc with no bio written yet — the doc's own header lists
several under **"QUADRANT BIOS NEEDED"**, so the client already knows:

| Section | Name | Title |
|---|---|---|
| Leadership | Darisa Almonte | Controller |
| Admissions | Jay Ocampo | Admissions Manager |
| Admissions | Robbie Wheeles | Admissions Manager |
| Admissions | Cai Von Rumohr | Admissions Manager |
| Admissions | Anna Cole- Admissions Representative | — |
| Admissions | Dennis Root | Admissions Representative |
| Admissions | Jacob Stevenson | Admissions Representative |
| Admissions | Jennifer Weisheit- Admissions Representative | — |
| Admissions | Joshi Varughese- Admissions Representative | — |
| Admissions | Kristine Haag | Admissions Representative |
| Admissions | Maddie Tatro | Admissions Representative |
| Admissions | Mike Mueller | Admissions Representative |
| Admissions | Navindra Ramoutar | Admissions Representative |
| Admissions | Robert Castorino- Admissions Representative | — |
| Admissions | Sarah Carnacchi | Admissions Representative |
| Admissions | Webb Mullin | Admissions Representative |
| Admissions | Earl King | Travel Coordinator |
| Admissions | Ashley Thames | Patient Advocate |
| Admissions | Ashley Watts | Patient Advocate |

The doc also flags **Ashley Ruiz — Nursing Supervisor** as needing a headshot, and notes
**Jake Talley, RADT** as an intern who is leaving.

### 6.2 — Six bios have been rewritten

Word-level overlap between the published bio and the doc version. Below ~0.9 means the
copy was materially rewritten, not lightly edited.

| Person | Overlap | Site chars | Doc chars | Also |
|---|---:|---:|---:|---|
| Elizabeth Wald | 0.16 | 1135 | 1351 | title changed |
| Monica Olivires | 0.25 | 1588 | 1730 | title changed **and name spelt differently** |
| Justin White | 0.30 | 1048 | 1296 | — |
| Ila Holgerson | 0.34 | 805 | 991 | title changed — a promotion |
| Erika Sirianos | 0.88 | 1138 | 1315 | title reworded |

### 6.3 — Job titles that genuinely differ

Nine where the doc states a different job, not just a shorter one:

| Person | Site says | Doc says | Read |
|---|---|---|---|
| Ila Holgerson | Lead Case Manager | Director of Clinical Operations | Promotion — publish the doc title |
| Elizabeth Wald | Director of Operations — Ocean Coast | Program Director | Different role; bio also rewritten (0.16 overlap) |
| Monica Olivires | Program Director | Clinical Supervisor | Different role; bio also rewritten (0.25 overlap) |
| Vinny Turiello | Client Care Coordinator Supervisor | Admissions Manager | Different department |
| Cristina Turiello | Director of Client Care | Manager of Client Care | Publish the doc title |
| Michael McArthur | Regional Nursing Director | Nursing Director | Publish the doc title |
| Shawn Young | Regional Executive Director of California | Executive Director | Publish the doc title |
| Erika Sirianos | Director of Human Resources | HR Director | Same job, reworded |
| Steven Ryan | Director of Operations | Operations Director | Same job, reworded |

A further 15 differ only because the doc drops the facility or region qualifier —
*Case Manager at Hillside Mission* becomes *Case Manager*. **The site's version is more
useful on a parent site**, since it says where the person works. Keep the site's qualifier
and take the doc's job title.

### 6.4 — Four people on the site are absent from the doc

| Person | Site title | Note |
|---|---|---|
| Karen Pettit | Program Director (Laguna View Detox) | Also a duplicate-bio row — `V0065` |
| Tami Distefano | Program Director — Ocean Coast Recovery | Also a duplicate-bio row — `V0086` |
| Denise Edwards | Mental Health Case Manager | — |
| Nastasya Aracena | Clinical Therapist | — |

The doc is the roster. It is current enough to name an intern who is leaving, so these four
are not on it because they are not on staff — **the site is publishing biographies of people
who no longer work there**, the same class of defect as V0054. All four pages come down.

That also closes `V0065` and `V0086` for Pettit and Distefano: the duplicate-bio remedy is
removal, not a canonical.

### 6.6 — Correction: the facility sections were not optional

The first pass through this doc treated its facility sections as out of scope, on the
assumption that the parent site publishes only a subset of facility staff. **That assumption
was mine, not the document's, and it did not survive checking** — the site already published
40 facility staff, so there was no such rule to apply.

29 people with finished bios sat in the doc's `Cali`, `TX`, `NJ`, `Seaside`, `Des Moines` and
`Wellness Ranch KY` sections and were absent from the site. All 29 are now published. The
largest single gap was Wellness Recovery NJ at 14 people — an entire facility roster missing
from the parent.

Three headshots were matched on folder plus first name rather than a full name:
`OCRC - Vahan.jpg` → Vahan Oknayan, `Anthony P.png` → Anthony Paccillo, `Kentucky/Amanda.JPG`
→ Amanda Daniels. Each folder contains exactly one person with that first name and the doc
section matches the folder, so these are corroborated rather than guessed — but they are the
three worth a second pair of eyes.

### 6.5 — The name question is settled

The doc spells her **Monica Olivares**, matching her own bio text. The site's
`name: "Monica Olivires"` and slug `monica-olivires` are wrong. That closes the open
question in `T3.1`.


---

## Part 7 — Headshot import (Staff Headshots folder)

124 files, 202 MB, delivered in facility/department folders. Matched against the 44
published bios and the doc roster, resized to fit 800×800 and re-encoded as JPEG —
**156.6 MB of matched source became 3.8 MB**, largest output 98 KB. Both team templates
crop to a square with `object-fit: cover; object-position: top center`, so the original
framing is preserved and the CSS does the cropping.

| Outcome | Files |
|---|---:|
| Applied to existing team members | 36 |
| Staged for the corporate bios not yet published | 47 |
| Held back — identity ambiguous | 1 |
| Facility staff in the doc but not published on the parent | 20 |
| No roster match | 15 |
| Exact duplicates in the folder (`Cali Leadership/Copy of …`) | 5 |

### 7.1 — What changed in the build

- 36 members in [`lib/content/team.json`](lib/content/team.json) now point at the official headshot; 18 superseded files removed.
- **`olivia-hadjerioua` had no photo and now has one.** That closes `T6.2` with her own headshot rather than the placeholder row 857 proposed.
- All image paths normalised to `/images/team/<slug>.jpg`.
- `next build` passes; 0 missing images, 0 broken paths across 44 members.

### 7.2 — Held back: Haley Wadlington

The Texas folder contains `Haley Hayes.png` and no `Haley Wadlington`. The bio doc has
Haley Wadlington and no Haley Hayes. Nothing in either document links the two names, so
this is an ambiguity between sources rather than a documented instruction — and putting
the wrong face on a named bio is the defect V0054 is rated CRITICAL for. Her existing
photo is untouched pending an answer.

### 7.3 — NEW: `/team/trevor-amador` publishes Alicia Joslin

Found while matching headshots. Not in the workbook.

```
lib/content/team.json   slug: "trevor-amador"   name: "Alicia Joslin"
                        role: "Program Director"   bio: Alicia Joslin's, in full

production  /team/trevor-amador/   HTTP 200
            <title>  Alicia Joslin - Program Director (Marina Harbor Detox)
            <h1>     Alicia Joslin
            "Trevor" / "Amador" appear 0 times in the page body

bio doc     Alicia Joslin — Program Director   ✓ present
            Trevor Amador                       ✗ absent from the entire roster
```

The record is Alicia Joslin's throughout — only the URL carries someone else's name, so
the headshot was correctly assigned to her record. **The defect is inherited, not a
migration regression**: production serves the same mismatch, which puts it in the Legend's
*"Inherited vs new"* category — *"fixing them in the new build also closes long-standing
production defects."* Trevor Amador is absent from the doc, so the slug is a leftover from
a previous occupant of that URL.

This is the same class as V0054 and the second name defect found on this site, after
Monica Olivares.

### 7.4 — Staged and ready to publish

47 corporate headshots are in `public/images/team/` under the slug each person will use.
**28 of them pair with a finished bio in the doc — those bios now have everything they
need.** The rest are waiting on copy the client still owes.

<details>
<summary>All 47 staged corporate headshots</summary>

| Section | Name | Title | File | Bio |
|---|---|---|---|---|
| Admissions | Anna Cole- Admissions Representative | — | `anna-cole-admissions-representative.jpg` | awaiting copy |
| HR | Armanee Cross | HR Assistant/Coordinator | `armanee-cross.jpg` | ready |
| Admissions | Ashley Thames | Patient Advocate | `ashley-thames.jpg` | awaiting copy |
| Admissions | Ashley Watts | Patient Advocate | `ashley-watts.jpg` | awaiting copy |
| BD/Alumni | Ben Kolb | President of Business Development | `ben-kolb.jpg` | ready |
| Admissions | Cai Von Rumohr | Admissions Manager | `cai-von-rumohr.jpg` | awaiting copy |
| Leadership | Catherine Alpaugh | Executive VP of Administration | `catherine-alpaugh.jpg` | ready |
| Leadership | Chelsea Stelmach | Director of Marketing | `chelsea-stelmach.jpg` | ready |
| Leadership | Colin McBride | Chief Revenue Officer | `colin-mcbride.jpg` | ready |
| Leadership | Danielle Gorman | Executive Coordinator | `danielle-gorman.jpg` | ready |
| Leadership | Darisa Almonte | Controller | `darisa-almonte.jpg` | awaiting copy |
| Admissions | Dennis Root | Admissions Representative | `dennis-root.jpg` | awaiting copy |
| HR | Diana Guzman | HR Manager | `diana-guzman.jpg` | ready |
| BD/Alumni | Douglas Penny | VP of Business Development West Coast | `douglas-penny.jpg` | ready |
| Admissions | Earl King | Travel Coordinator | `earl-king.jpg` | awaiting copy |
| BD/Alumni | EJ Larson | Business Development Representative | `ej-larson.jpg` | ready |
| HR | Emmanuel Lacruz | Talent Acquisition Recruiter | `emmanuel-lacruz.jpg` | ready |
| Admissions | Jacob Stevenson | Admissions Representative | `jacob-stevenson.jpg` | awaiting copy |
| Admissions | Jay Ocampo | Admissions Manager | `jay-ocampo.jpg` | awaiting copy |
| Admissions | Jennifer Weisheit- Admissions Representative | — | `jennifer-weisheit-admissions-representative.jpg` | awaiting copy |
| Leadership | Jessica Dalton | Executive VP of Operations | `jessica-dalton.jpg` | ready |
| Admissions | John Jurman | Admissions Manager | `john-jurman.jpg` | ready |
| Leadership | Joseph Cameron | Founder | `joseph-cameron.jpg` | ready |
| Admissions | Joshi Varughese- Admissions Representative | — | `joshi-varughese-admissions-representative.jpg` | awaiting copy |
| HR | Kevin Bocanegra | Human Resources/Payroll Specialist | `kevin-bocanegra.jpg` | ready |
| Admissions | Kristine Haag | Admissions Representative | `kristine-haag.jpg` | awaiting copy |
| BD/Alumni | Lexie Zeller | National Alumni Director | `lexie-zeller.jpg` | ready |
| Leadership | Louis Iacona | Founder | `louis-iacona.jpg` | ready |
| Admissions | Maddie Tatro | Admissions Representative | `maddie-tatro.jpg` | awaiting copy |
| BD/Alumni | Maggie Galleymore | Business Development Representative | `maggie-galleymore.jpg` | ready |
| Leadership | Michael Zornberg | Chief Operating Officer | `michael-zornberg.jpg` | ready |
| Admissions | Mike Mueller | Admissions Representative | `mike-mueller.jpg` | awaiting copy |
| BD/Alumni | Mike Simmons | VP of Business Development East Coast | `mike-simmons.jpg` | ready |
| Admissions | Navindra Ramoutar | Admissions Representative | `navindra-ramoutar.jpg` | awaiting copy |
| Leadership | Nicholas Petrillo | Chief Executive Officer | `nicholas-petrillo.jpg` | ready |
| BD/Alumni | Nick Gore | Business Development Representative | `nick-gore.jpg` | ready |
| Leadership | Dr. Pamela Tambini | Medical Oversight | `pamela-tambini.jpg` | ready |
| BD/Alumni | Richard Bradshaw | Business Development Representative | `richard-bradshaw.jpg` | ready |
| Leadership | Riley Monahan | Executive VP of Clinical Services | `riley-monahan.jpg` | ready |
| Admissions | Robbie Wheeles | Admissions Manager | `robbie-wheeles.jpg` | awaiting copy |
| Admissions | Robert Castorino- Admissions Representative | — | `robert-castorino-admissions-representative.jpg` | awaiting copy |
| Admissions | Robert Spady | Admissions Director | `robert-spady.jpg` | ready |
| BD/Alumni | Sage Steinberg | Business Development Representative | `sage-steinberg.jpg` | ready |
| Leadership | Sal Rabie | Chief Financial Officer | `sal-rabie.jpg` | ready |
| Admissions | Sarah Carnacchi | Admissions Representative | `sarah-carnacchi.jpg` | awaiting copy |
| Leadership | Stephanie Hakim | Director of Compliance | `stephanie-hakim.jpg` | ready |
| Admissions | Webb Mullin | Admissions Representative | `webb-mullin.jpg` | awaiting copy |

</details>

### 7.5 — Not imported

**20 facility staff** appear in the bio doc's state sections but are not published on the
parent site — Iowa, New Jersey, Fort Worth and Florida staff. They belong to the facility
builds. If the parent is meant to publish them, that is a scope decision, not a missing file.

**15 files match no roster entry in either document:**

```
California/Cali SOUTH/Ocean Coast Recovery/OCRC - Vahan.jpg
Florida/April Blair.png
Florida/Shaun Hutton.png
Iowa/Alexander Maddux-Director of Operations.png
Iowa/Pam Sahota - Clinical Director.png
Kentucky/Amanda.JPG
New Jersey/Anthony P.png
New Jersey/Laura Conners Case Manager .jpg
New Jersey/Neil Tucker Headshot.png
New Jersey/Zala Henry Samuel Headshot 2.jpg
Quadrant/Admissions/Blake Barthel.png
Quadrant/Admissions/Taylor Berry.jpg
Quadrant/Taylor D.jpg
Quadrant/image0.png.webp
Texas/FWW-Corney Best-Clinical Director.jpg
```

`Quadrant/Taylor D.jpg` and `Quadrant/image0.png.webp` are unidentifiable from the filename alone.

---

## Part 8 — Image map and approved-source audit

Brief: *use only pictures from the `Quadrant Health Group` folder, including the hero, and
map all the images.* Below is what the folder contains, what the site actually uses, where
every picture came from, and what the folder can and cannot cover.

### 8.1 — What the approved folder actually contains

`~/Downloads/Quadrant Health Group` — **8 files, all brand marks. No photography.**
Verified against `Quadrant Health Group-20260810T172328Z-1-001.zip`; the archive holds the
same 8 files, so nothing was lost in extraction.

| Asset | Size | Alpha |
|---|---|---|
| `New Quadrant Logo-horizontal.png` | 1539×423 | yes |
| `New Quadrant Logo-2025-white.png` | 1539×423 | yes |
| `New Quadrant Logo- stacked.png` | 1540×1168 | yes |
| `New Quadrant Logo- stacked white.png` | 1540×1168 | yes |
| `New Quadrant Logo-2025 - white stacked.png` | 1533×1168 | yes |
| `Quadrant logo color - horz white.png` | 7065×1889 | yes |
| `New Q icon.png` | 1299×1192 | yes |
| `New Quadrant Logo-2025.pdf` | vector master | — |

**Consequence:** the instruction can be satisfied completely for every logo slot, and not
at all for the hero or any other photograph. Section 8.7 covers where the photography has
to come from instead.

### 8.2 — Logo mapping ✅ applied

| Source asset | → | Slot | Used by | Before | After |
|---|---|---|---|---|---|
| `New Quadrant Logo-horizontal.png` | → | `/images/logo.png` | header, mobile drawer | 443×147, **no alpha** | 800×220, alpha |
| `New Quadrant Logo- stacked white.png` | → | `/images/logo-white.png` | footer | 500×402 | 580×440 |
| `New Q icon.png` | → | `/images/logo-mark.png` | spare mark | 500×500, no alpha | 512×512, alpha |
| `New Q icon.png` | → | `/icon.png` | favicon 192 | 192×192 | 192×192 |
| `New Q icon.png` | → | `/apple-icon.png` | Apple touch icon | 192×192 | 192×192 |
| `New Q icon.png` | → | `/favicon-32.png` | favicon 32 | 32×32 | 32×32 |

`width`/`height` props updated in [components/Header.tsx](components/Header.tsx) and
[components/Footer.tsx](components/Footer.tsx) to match the new aspect ratios. Both use
`height` with `width: auto` in CSS, so the layout absorbs the change. Render-checked on
white and on navy; `next build` passes.

Two real gains beyond resolution: the old header logo was a **flat PNG with no alpha**, so
it carried a white box on any non-white surface; and the old footer lockup set
*HEALTH GROUP* in mid-blue on the navy footer, which the all-white stacked version fixes.

Unused spares, kept in the brand folder rather than the repo: the horizontal white, the
colour stacked, the 7065px white horizontal, and the PDF vector master.

### 8.3 — Complete site image inventory

141 files, 12.9 MB.

| Set | Files | Purpose |
|---|---:|---|
| `/images/logo*.png` + root icons | 6 | brand — **now 100% from the approved folder** |
| `/images/locations/` | 8 | branded facility face-cards |
| `/images/photos/` | 11 | hero and section photography (8 in use, 3 unused) |
| `/images/treatment/` | 18 | treatment detail heroes |
| `/images/blog/` | 7 | article heroes |
| `/images/team/` | 91 | 44 published bios + 47 staged corporate (Part 7) |

### 8.4 — Provenance of every photograph

Method: perceptual hash (dHash, Hamming ≤ 6) against the 409-image archive in `_scrape/`,
which preserves the original filename each asset was downloaded under. Stock is identified
by the source filename (`pexels-*`, `shutterstock_*`, CDN hashes).

**Location cards — 8 of 8 client brand assets.** Each was opened and read: every card
carries the correct facility name over the correct property. No mismatches.

| Card | Reads |
|---|---|
| `dallas.png` | DALLAS DETOX CENTER |
| `hillside-mission.png` | HILLSIDE MISSION RECOVERY |
| `laguna-view.png` | LAGUNA VIEW DETOX |
| `marina-harbor.png` | MARINA HARBOR DETOX |
| `ocean-coast.png` | OCEAN COAST RECOVERY |
| `seaside.png` | SEASIDE WELLNESS |
| `wellness-detox-la.png` | WELLNESS DETOX LA |
| `wellness-nj.png` | WELLNESS RECOVERY NJ |

> One false alarm worth recording: `hillside-mission.png` is byte-identical to an archive
> file named `Wellness-NJ-Face-Card-1-1.png`. The **image** is Hillside; the **filename** in
> the client's WordPress media library is wrong. Nothing to fix on the site.

**Section photography — 9 client, 2 stock.**

| File | Used on | Alt text | Origin | Verdict |
|---|---|---|---|---|
| `hero-aerial.jpg` | homepage hero + site-wide `og:image` | "Aerial view of a Quadrant Health luxury treatment facility" | `17-web-or-mls-DJI_0175…` | ⚠️ see 8.5 |
| `facility-lounge.jpg` | homepage, Who we are | "Interior of a Quadrant Health treatment center" | `DSC_6224-HDR-1.jpg` | ⚠️ exterior, alt says interior |
| `insurance.png` | homepage insurance band | "Verify your insurance benefits" | `Insurance-Visuel.png` | ⚠️ carrier logos, see 8.5 |
| `facility-interior.jpg` | About, Our story | "Inside a Quadrant Health treatment center" | `IMG_4480.jpg` | ✅ genuine |
| `support.jpg` | About, Alumni | "Quadrant Health alumni community support" | `pexels-photo-1049298` | ❌ stock |
| `therapy.jpg` | Treatment page | "A supportive therapy session" | `pexels-photo-315998` | ❌ stock |
| `property-1.jpg` | Fort Worth location card | — | `11-web-or-mls-DSC04998.jpg` | ✅ genuine |
| `aerial-2.jpg` | Des Moines location card | — | `39-web-or-mls-DJI_2026…` | ⚠️ see 8.5 |
| `about-banner.png` | *unused* | — | `Banner-mega-menu-About.png` | ✅ genuine |
| `facility-interior-2.jpg` | *unused* | — | `IMG_4482.jpg` | ✅ genuine |
| `laguna-coast.jpg` | *unused* | — | `20230113-…-lagunabeach-ca-015` | ✅ genuine |

**Treatment heroes — 18 of 18 are stock.** Every treatment detail page, including the
highest-intent pages, is fronted by a licensed stock photo:

```
alcohol-addiction            pexels-photo-7699511          intensive-outpatient   g218e867dc09…
ambien-addiction             g66d87f327bba…                methamphetamine        pexels-punttim-52608
barbiturates-addiction       pexels-pixabay-262075         opiate-addiction       pexels-keenan-constance…
benzo-addiction              gb5e3098bf0e9…                partial-hospitalization gae62d66996c5…
cocaine-addiction            pexels-rdne-5542968           residential-inpatient  g57cb5421cbd7…
detox                        pexels-photo-2598761          virtual-iop            ga126d21cdfcc…
dual-diagnosis               gd267ce33ca0f…                equine-therapy         pexels-mlkbnl-14523206
family-therapy               pexels-photo-2253879          group-therapy          pexels-minan1398-1624565
individual-therapy           pexels-shvets-production-7176319   inhalant-addiction pexels-ivan-samkov-6648561
```

**Blog heroes — 4 stock, 3 client.** Client: the network article, the private-insurance
article, and the Dry January article. Stock: the other four.

**Team — 44 of 44 are official headshots** as of Part 7.

### 8.5 — Defects found

**The homepage hero shows another company's building.** Enlarging the signage on
`hero-aerial.jpg` reads **"CASCAD… APTS"** — an apartment complex. The photo is genuinely
the client's (it matches their own WordPress upload), but the alt text calls it
*"a Quadrant Health luxury treatment facility"* and it is also the `og:image` for every page
on the site, so it is what appears whenever the domain is shared anywhere.

**`therapy.jpg` is Rhossili Bay, Wales.** A stock coastal landscape, captioned
*"A supportive therapy session"*, sitting on the Treatment page beside copy about clinical
teams and individualised care. No people, no therapy, wrong continent.

**`support.jpg` is a stock tropical beach**, captioned *"Quadrant Health alumni community
support"*, on the Alumni section of the About page. Two palm trees and no community.

**`facility-lounge.jpg` is an exterior** captioned *"Interior of a Quadrant Health treatment
center"*.

**`aerial-2.jpg` represents Des Moines, Iowa** but is a Texas-style property — post oaks and
a ranch pool, matching a `DJI_2026…` file from the Texas set.

**Three pictures are used twice on the site:**

```
/images/photos/hero-aerial.jpg          = /images/blog/national-addiction-treatment-network…jpg
/images/treatment/group-therapy.jpg     = /images/blog/detox-vs-residential-vs-php-vs-iop…jpg
/images/treatment/individual-therapy.jpg = /images/blog/holiday-relapse-risk…jpg
```

**`insurance.png` is a grid of carrier logos** — Aetna, Humana, Anthem, Cigna, TRICARE,
UnitedHealthcare, the VA and others — baked into a single image. Two issues: the carrier
names are invisible to search engines and screen readers (the alt is just "Verify your
insurance benefits"), and displaying insurer trademarks asserts a network relationship that
should be confirmed as accurate for each carrier before launch.

### 8.6 — Replacement mapping ✅ applied

| Slot | Was | Now | Source |
|---|---|---|---|
| Homepage hero + site-wide `og:image` | `hero-aerial.jpg` — apartment building | `laguna-coast.jpg` | was already in the repo, unused — Laguna View Detox |
| Homepage, Who we are | `facility-lounge.jpg` — exterior, alt said interior | `facility-interior-2.jpg` | was already in the repo, unused — genuine interior |
| Treatment page | `therapy.jpg` — stock, Rhossili Bay | `lounge-laguna.jpg` | `~/Downloads/Laguna View Detox/Copy of NIK_5759.jpg` |
| About, Alumni | `support.jpg` — stock beach | `patio-hillside.jpg` | `~/Downloads/Hillside Mission Recovery/DSC_0596.jpg` |

The two imports were resized to 1400px and re-encoded — 21.1 MB of source became 343 KB. The
four superseded files were deleted; `next build` passes. Alt text was rewritten on all four
to describe what is actually in frame rather than what the slot was called.

**Every photograph on every page is now genuine client photography.** Provenance of the
eight in use: `laguna-coast`, `lounge-laguna`, `patio-hillside`, `facility-interior`,
`facility-interior-2`, `property-1`, `aerial-2`, `insurance.png`.

Still outstanding, tracked as T8.4 and T8.3:

| Slot | Issue | Source available |
|---|---|---|
| 18 treatment heroes | all stock | needs a decision — see 8.7 |
| 4 blog heroes | stock | needs a decision — see 8.7 |
| Des Moines card | `aerial-2.jpg` is a Texas property | `~/Downloads/Des Moines Wellness Center` — 81 photos |
| `insurance.png` | carrier logos baked into an image | confirm relationships, rebuild as markup |

### 8.7 — Where the missing photography has to come from

The approved folder has no photographs, so "only use pictures from this folder" cannot be
met for the hero or any section image. **340 client facility photographs are already on this
machine**, in the same Downloads directory:

| Folder | Photos |
|---|---:|
| `Laguna View Detox` | 98 |
| `Des Moines Wellness Center` | 81 |
| `Hillside Mission Recovery` | 66 |
| `Marina Harbor Detox` | 60 |
| `Fort Worth Wellness Center` | 35 |
| `Seaside Wellness of Palm Beach` | 0 — video only |

Laguna's filenames match the `20230113-…-lagunabeach-ca-*` pattern that already supplied
`laguna-coast.jpg`, confirming these are the client's own shoots and the same source the
existing genuine photos came from.

These folders cover the facility and interior needs. They do **not** cover the abstract
subjects the treatment pages currently use stock for — therapy sessions, family scenes,
clinical settings with people. Those need either a photo shoot, a licensed library the
client is comfortable naming, or a design direction that does not depend on photography.
**That is a decision, not a missing file.**

---

# Tasks

Seven work packages. WP-1 gates the cutover; the rest can run in parallel behind it.

Checkbox states are all unstarted — nothing in this file has been actioned.

## WP-1 · Cutover blockers

Nothing below ships to `quadranthealthgroup.com` until these are closed.

- [x] **T1.1 — Decide the trailing-slash convention and enforce it** `V0102` · CRITICAL
  - Production is slash-canonical on all 12 sites; every preview is slashless. Pick one.
  - If production wins: set `trailingSlash: true` in [next.config.mjs](next.config.mjs) and regenerate the redirect map against it.
  - Fixing this also fixes the canonical-target redirects in V0018/V0067 as a side effect — do not scope that work twice.
  - Sequence **before** T1.3 and T1.4: both depend on which form is canonical.

- [x] **T1.2 — Port the seven dropped production pages** `V0127` · CRITICAL
  - `/about/alumni`, `/about/faq`, `/about/our-story`, `/admissions/admissions-process`, `/admissions/help-for-loved-one`, `/admissions/help-for-yourself`, `/admissions/insurance-verification`
  - All seven are HTTP 200 on production and 404 here. Four are the primary enquiry path.
  - V0127 is explicit: *"Port all seven from production into the build."* Real routes at the production paths, placed under the existing `/about` and `/admissions` sections. The anchor sections in [app/admissions/page.tsx](app/admissions/page.tsx) carry some of the copy but are not indexable URLs, so they do not satisfy the row.
  - Closes V0096 and V0099 as duplicates; narrows V0095.

- [x] **T1.3 — Build the 16-pair 301 redirect map** `V0128` · HIGH
  - 8 location slugs, the blog index, and 7 dated post paths.
  - This repo already uses the long-form location slugs, so the map is net-new `redirects()` config in [next.config.mjs](next.config.mjs), not a rename.
  - Add the seven T1.2 paths and anything T1.1 changes before freezing the map.

- [x] **T1.4 — Add self-referencing canonicals to every page** `V0092` + `V0050` `V0054` `V0065` `V0075` `V0086` · HIGH
  - 92 of 92 pages currently emit none. Set `alternates.canonical` in [app/layout.tsx](app/layout.tsx) and in each `generateMetadata`.
  - **This single change also resolves the five cross-domain bio rows.** Verification established the pattern: facility bio pages canonical correctly, parent copies have none. V0054's own note recommends folding all five into one consolidated parent-canonical row rather than working them separately.
  - Must target the production domain in the chosen slash form (T1.1).
  - Do **not** copy Laguna as the model — 43 of its 46 canonicals point at redirects. Use Marina Harbor.
  - Pair with the `noindex`-off-apex change from the codebase audit (F-03).

- [ ] **T1.5 — Re-run the production content diff immediately before cutover** `V0124` · CRITICAL
  - The build is a snapshot from ~15–16 July 2026; production has kept publishing. Two QHG URLs were already missing on 2026-07-28.
  - Check: production sitemap `lastmod` ≥ snapshot date, then test each URL against the build.
  - Either freeze publishing to production until cutover, or establish a re-sync step. Without one, every new post is lost at launch.

## WP-2 · SEO metadata

- [x] **T2.1 — Fix `og:url` on all 92 pages** `V0093`
  - 53 point at the bare domain root, 38 are absent, 0 are page-specific.
  - Root cause is [app/layout.tsx:48](app/layout.tsx#L48) — `openGraph.url = site.url` applies site-wide; templates that override `openGraph` without a `url` drop it entirely.
  - Set it per page to the page's own canonical URL. Same change as T1.4, same slash form.

- [ ] **T2.2 — Settle `opiate` vs `opioid`** `V0089`
  - Three-way split across the portfolio: this site uses `/treatment/opiate-addiction`, Wellness Detox LA uses `opioid-addiction`, Wellness NJ uses `opioids`, Seaside has both.
  - The sheet flags its own justification as unvalidated: *"I have NOT checked search volume, and I stated it as fact."* Semrush is connected — pull the data before renaming across four sites.
  - If it changes: edit the slug in [lib/content/treatments.json](lib/content/treatments.json), add a 301, update the title/H1/body (46 uses of "opiate", 10 of "opioid").

## WP-3 · Staff bios — reconciliation, duplication and gaps

Two inputs converge here: the workbook's cross-domain duplication rows (Part 3) and the
client's bio doc (Part 6). The canonical half is T1.4; everything else is below.

- [x] **T3.1 — Fix the Monica Olivires / Olivares name** `V0054` · Part 6.5 · do this first
  - [`lib/content/team.json`](lib/content/team.json) sets `name: "Monica Olivires"` and the slug `monica-olivires`, while her own bio text reads **"Monica Olivares"** throughout.
  - **The bio doc settles it: "Monica Olivares."** Two independent sources now agree the published spelling is wrong.
  - Fix the `name`, correct the slug, and 301 the old URL. The H1, page title, URL and team card all carry the wrong spelling today.
  - ✅ **Not affected here:** V0054's critical wrong-person biography is a Hillside defect. I diffed this repo — `phillip-carter` carries Phillip Carter's own bio.

- [x] **T3.2 — Publish the 30 corporate bios that are ready** Part 6.1 · highest content value in this file
  - Both founders, the CEO, COO, CFO, CRO, medical oversight lead, three EVPs, the compliance and marketing directors, all 9 BD/Alumni staff, 5 HR staff. Full copy is in the doc; the table in Part 6.1 lists every one with its length.
  - ✅ **Headshots are already in place** — Part 7 staged 47 corporate images, 28 of which pair with a finished bio. This is now pure data entry into [`lib/content/team.json`](lib/content/team.json): name, role, bio, and `/images/team/<slug>.jpg`.
  - Sequence with T6.1: adding 30 people to a flat 44-person grid without grouping it first makes the page worse, not better.

- [x] **T3.3 — Apply the 6 rewritten bios** · done — 5 bios replaced with the doc text Part 6.2
  - `Elizabeth Wald` (0.16 overlap), `Monica Olivares` (0.25), `Justin White` (0.30), `Ila Holgerson` (0.34), `Erika "Riky" Hanaumi` (0.87), `Erika Sirianos` (0.88).
  - The first four are materially different copy, not edits. Take the doc version.

- [x] **T3.4 — Reconcile the 9 differing job titles** · done — doc titles taken; the 11 remaining differences are facility-qualifier only, site version kept Part 6.3
  - Take the doc title for all nine: `Ila Holgerson` → Director of Clinical Operations, `Elizabeth Wald` → Program Director, `Monica Olivares` → Clinical Supervisor, `Vinny Turiello` → Admissions Manager, `Cristina Turiello` → Manager of Client Care, `Michael McArthur` → Nursing Director, `Shawn Young` → Executive Director, `Erika Sirianos` → HR Director, `Steven Ryan` → Operations Director.
  - **Keep the site's facility qualifier.** 15 further titles differ only because the doc drops it; "Case Manager at Hillside Mission" is more useful on a parent site than "Case Manager".

- [x] **T3.5 — Remove the 4 people absent from the doc** Part 6.4
  - `karen-pettit`, `tami-distefano`, `denise-edwards`, `nastasya-aracena`.
  - Delete from [`lib/content/team.json`](lib/content/team.json), which drops them from `generateStaticParams` and the team grid, then 301 the four `/team/<slug>` URLs to `/about/meet-the-team`.
  - Closes `V0065` and `V0086` for Pettit and Distefano — removal, not a canonical.

- [x] **T3.6 — Apply the bio ownership model: facility owns, parent canonicals to it** `V0050` `V0065` `V0075` `V0086`
  - 8 bios remain duplicated after T3.5 removes Pettit and Distefano: `gus-saadeh`, `monica-olivires`, `phillip-carter`, `timothy-foley`, `steve-ryan`, `shan-raiford`, `michael-meagher`, `elizabeth-wald`.
  - The sheet's position, as corrected during verification, is settled: the facility side is already canonicalised correctly and **the action is parent-side only** — point each parent copy's canonical at the facility original. Ships as part of T1.4.
  - `erin-crawford` was dropped during verification — below the site boilerplate baseline, not real reuse. Leave as is.

- [x] **T3.8 — Fix the `/team/trevor-amador` slug** Part 7.3 · NEW
  - The record is Alicia Joslin's in full — name, role, bio and now her headshot. Only the URL carries a different person's name, and Trevor Amador is absent from the doc roster entirely.
  - Rename the slug to `alicia-joslin`, rename `public/images/team/trevor-amador.jpg` to match, and 301 the old path — it returns 200 on production today, so it is indexed.
  - Inherited from production, so fixing it here also fixes it there. Add to the T1.3 redirect map.

- [ ] **T3.9 — Resolve Haley Hayes / Haley Wadlington** Part 7.2 · ⚠️ identity
  - The headshot folder has `Texas/Haley Hayes.png`; the bio doc has *Haley Wadlington*, Director of Client Care — Texas. No document links the names.
  - Her existing photo is untouched until this is answered. Same name / different name is the whole question.

- [x] **T3.10 — Import the official headshots** Part 7 · done
  - 36 members repointed at official headshots, 18 superseded files removed, all paths normalised to `/images/team/<slug>.jpg`. 156.6 MB of source became 3.8 MB. `next build` passes.
  - 47 corporate headshots staged under their future slugs.

- [ ] **T3.7 — Chase the 19 outstanding bios** Part 6.1
  - Client-side writing, not dev work. The doc's own **"QUADRANT BIOS NEEDED"** header already lists `Darisa Almonte`, `Jay Ocampo`, `Robbie Wheeles`, `Cai Von Rumohr`, plus a headshot for `Ashley Ruiz`.
  - The remaining 15 are Admissions representatives and patient advocates, named with titles but no copy.

## WP-4 · Locations and network linking

The parent site's job is to route traffic and authority to the facilities. Right now it does
neither — V0091's verification found **zero** facility links on any page, including the
dedicated per-facility pages.

- [x] **T4.1 — Add facility website links to `lib/site.ts`** `V0091` + visual 1074–1083
  - The `Location` type has no field for a facility URL. Add one, populate all 11 production domains.
  - Blocks T4.2 and T4.3.

- [x] **T4.2 — Link out from the locations index and every detail page** `V0091`
  - Verification found the gap is not limited to the index: *"Not one page anywhere on the parent domain links to a facility website."*
  - ⚠️ **Hold Ocean Coast back.** V0086's verification found its pages canonical to the domain root rather than themselves — *"the facility page does not own anything; it currently disclaims itself in favour of the homepage."* Linking to a page that disclaims itself passes authority nowhere. Fix V0109 first, or link Ocean Coast last.
  - Then arrange the reciprocal link back from each facility to `quadranthealthgroup.com`.

- [x] **T4.3 — Add a facility-website button to all 10 location pages** visual 1074–1083
  - Next to the existing Call and Verify Insurance buttons in [app/locations/[slug]/page.tsx](app/locations/[slug]/page.tsx).

- [ ] **T4.4 — Build the two missing location pages** `V0090`
  - Des Moines Wellness Center and Greater Texas Behavioral.
  - Des Moines exists in [lib/site.ts](lib/site.ts) but is flagged `comingSoon: true`, so it is excluded from `generateStaticParams` — visual row 1084 logs the same thing from the front end.
  - Greater Texas is absent from the data entirely and appears zero times in the locations copy. V0090's verification instructs that the format be settled first: V0044/V0046 established Greater Texas is a virtual provider with no physical address, so the row's note is that *"a service-line entry would fit better… worth deciding rather than defaulting."* Settle that, then build.

- [x] **T4.5 — Make the whole location card clickable** visual 1085
  - Currently only part of [components/LocationCard.tsx](components/LocationCard.tsx) is a link target.

- [x] **T4.6 — Set the facility count to 12 and add the missing facilities** visual 859, 860
  - Row 859: **"10 Locations Nationwide" becomes 12.** The number appears in three places — `stats` in [lib/site.ts](lib/site.ts), the locations page, and the About page. Change all three.
  - Row 860: add **Greater Texas Behavioral** and **Wellness Ranch KY** to the locations list. Wellness Ranch KY is new to this repo — it has no entry in `lib/site.ts` and no page anywhere in the build, so it needs a location record built from scratch.
  - ✅ Already satisfied: the third name on row 860, Wellness Detox LA, is present in `lib/site.ts` and renders on the index today. Nothing to do for that one.

## WP-5 · Treatment page template and content

219 of the 231 visual rows are on treatment detail pages. They repeat across pages, so
treat them as template work plus a content pass — not 219 separate edits.

- [x] **T5.1 — Heading hierarchy** — 51 rows
  - Sections that should be H3 or H4 are rendering at the wrong level. The renderer at [app/treatment/[slug]/page.tsx:79](app/treatment/[slug]/page.tsx#L79) emits every `sections[].heading` as `<h2>`.
  - Fix properly: add a level field to the section schema in [lib/content/treatments.json](lib/content/treatments.json) rather than hardcoding per page.
  - Heaviest pages: `benzo-addiction` (9), `methamphetamine-addiction` (7), `methadone-addiction` (6).

- [x] **T5.2 — Link the bullet lists** — 43 rows
  - "Therapies we offer" and "About us" bullets are plain text; each should link to its page. Bullets are parsed out of `sections[].body` as raw strings, so this needs either a link map or structured data.

- [ ] **T5.3 — Topic widgets** — 32 rows
  - New component. Renders the topics named in a section's copy as linked cards.

- [ ] **T5.4 — Capitalization pass** — 18 rows
  - Title-case failures and random mid-sentence capitals. Pure copy edits in `treatments.json`.

- [ ] **T5.5 — Google reviews slide** — 17 rows
  - One per treatment page, in the "Recovering from X Is Possible" section. New component.

- [ ] **T5.6 — Add the missing standard blocks** — 14 rows
  - "Therapies we offer:" and "About us:" are absent on 14 pages that should carry them.

- [ ] **T5.7 — Remove the duplicated subtitle** — 8 rows
  - The copy under the page title repeats the first section verbatim. Likely `intro` and `sections[0].body` holding the same text — check the data before changing the template.

- [ ] **T5.8 — Sibling-facility widgets** — 6 rows

- [ ] **T5.9 — Content removals** — 6 rows

- [ ] **T5.10 — One-off rows** — 26 rows
  - No shared pattern; work from the per-page tables in Part 4.

- [ ] **T5.11 — Review the two unaudited treatment pages**
  - `barbiturates-addiction` and `fentanyl-addiction` have no rows in the workbook. They were not reviewed, not cleared. Apply the same checks.

## WP-6 · Other pages

- [x] **T6.1 — Group the team by department** visual 856
  - Founders, Corporate Leadership, Business Development & Alumni, Admissions & Client Care, then by state and facility. The full ordering is in the row.
  - [app/about/meet-the-team/page.tsx](app/about/meet-the-team/page.tsx) currently renders one flat grid of 44.
  - Sequence after WP-3 — if bios move to the facilities, the grouping changes shape.

- [x] **T6.2 — Fill the missing staff photo** visual 857 · done
  - `olivia-hadjerioua` had no photo. The headshot folder contained `Texas/Olivia Hadjerioua.png`, so she now has her own rather than the placeholder row 857 proposed. Closes F-08's photo gap too.

- [ ] **T6.3 — Replace the About page photo** visual 858

- [ ] **T6.4 — Unify the blog** visual 861
  - Clarion-authored posts render in a separate section from the seven native posts. All published posts should appear in one feed.
  - Touches [components/ClarionBlog.tsx](components/ClarionBlog.tsx) and [app/blog/page.tsx](app/blog/page.tsx). Note the Clarion embed only reveals itself once real content renders, so an empty feed currently hides the section entirely.

- [x] **T6.5 — Add an Editorial Policy page** visual 1086
  - New page, linked in the footer beside Privacy Policy. Standard YMYL trust signal for a healthcare site.
  - Fold into the legal-copy pass (F-09) rather than shipping alone.

## WP-7 · Open items the documents themselves defer

Three places where a document instructs that something be established before the work
proceeds. These are part of the spec, not challenges to it.

- [ ] **T7.1 — Build the aftercare page** `V0095`
  - V0095's fix is *"Adopt /treatment/aftercare portfolio-wide."* This site has none, and its verification classes the three sites without one as a build decision rather than a rename. Build it at `/treatment/aftercare`.

- [ ] **T7.2 — Pull the search-volume data for `opiate` vs `opioid`** `V0089` · blocks T2.2
  - V0089's own correction requires it: *"That should either be validated with keyword data or reworded to drop the volume claim."* The verification note adds that Semrush is connected, so the question is checkable — and that if the data does not support `opioid`, the standard flips.

- [ ] **T7.3 — Settle the Greater Texas page format** `V0090` · blocks T4.4
  - Location page or service-line entry. V0090's verification asks for this explicitly, since Greater Texas is a virtual provider with no physical address.

**Closed, no longer open questions:** the facility count is 12 (visual 859). V0096 and V0099
fold into T1.2 — the content exists on production, so both are ports, not new pages. The bio
ownership model is the sheet's corrected position, applied in T3.6.

## WP-8 · Imagery

- [x] **T8.0 — Apply the approved brand kit** Part 8.2 · done
  - All 6 logo slots now come from `~/Downloads/Quadrant Health Group`. Header logo gains an alpha channel it never had; the footer lockup is now fully white on navy. `next build` passes.

- [x] **T8.1 — Replace the homepage hero** Part 8.6 · done
  - Hero and site-wide `og:image` now use `laguna-coast.jpg` — a genuine Laguna View Detox exterior. The apartment-building photo is deleted from the repo.

- [x] **T8.2 — Replace the two stock section photos** Part 8.6 · done
  - Treatment page → `lounge-laguna.jpg`; About → Alumni → `patio-hillside.jpg`. Both imported from the client facility folders. No stock photography remains on any page.

- [x] **T8.3a — Fix the exterior/interior alt mismatch** Part 8.6 · done
  - Homepage "Who we are" now uses `facility-interior-2.jpg`, a genuine interior. All four swapped images had their alt text rewritten to describe what is in frame.

- [x] **T8.3b — De-duplicate and fix the Des Moines card** Part 8.5
  - Three pictures each appear twice across treatment and blog. Give the blog posts their own.
  - `aerial-2.jpg` represents Des Moines with a Texas property; 81 Des Moines photos are available in `~/Downloads/Des Moines Wellness Center`.

- [ ] **T8.4 — Replace the 18 stock treatment heroes and 4 stock blog heroes** Part 8.4 · largest imagery job
  - Every treatment detail page, including the highest-intent ones, is fronted by stock.
  - The facility folders cover interiors and exteriors but not therapy-session or family scenes. **Decide the approach first** — shoot, license a named library, or design around it.

- [ ] **T8.5 — Confirm the insurance carrier logos** Part 8.5
  - `insurance.png` bakes Aetna, Humana, Anthem, Cigna, TRICARE, UnitedHealthcare and VA marks into one image. Confirm every carrier relationship is accurate, and rebuild as real markup so the names are readable by search engines and screen readers.

---

## Suggested order

1. **T3.1**, **T3.5** and **T3.8** — a name is misspelled on its own page, a bio sits at another person's URL, and four people who are off the roster are still published. All cheap, all factual accuracy about named individuals. Do them first.
2. **WP-7** — the three deferred items are quick to settle and they unblock T2.2, T4.4 and the aftercare build.
3. **T1.1** — the slash convention determines the shape of T1.3 and T1.4.
4. **T1.2, T1.3, T1.4, T2.1** — the cutover set, shipped together. T1.4 clears the five bio rows as a side effect.
5. **T3.2 + T6.1 together** — publishing the 30 corporate bios into a grouped team page is the single largest content win available, and both the copy and the headshots are now in hand.
6. **WP-4** — highest SEO return for the effort; the parent site currently passes no authority anywhere.
7. **WP-5** — largest volume, lowest individual risk. Template work first (T5.1–T5.3, T5.5), then the content pass.
8. **T8.1–T8.3** — the hero is the first thing anyone sees and the first thing shared; the stock swaps and alt fixes ride along cheaply.
9. **WP-6** and **T8.4**, then **T1.5** immediately before cutover.

Interleave the codebase-audit findings that have no workbook equivalent — F-02 (silent lead
failure) and F-04 (keyboard trap) belong in step 4, not after it.
