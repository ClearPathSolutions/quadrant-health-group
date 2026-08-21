# Client change requests

Tasks pulled from client feedback, batch by batch. Companion to `issues.md`,
which holds the audit backlog — this file is only for requests that come in
directly from the client.

Counts here were verified against the codebase at the time the batch was
logged, not taken from the request text.

**Status key:** `open` · `needs answer` (blocked on a client decision) ·
`in progress` · `done`

---

## Batch 1 — email to Horacio Monteiro, re: quadrant-health-group.vercel.app

Received 2026-08-21. Four requests.

### CR-01 — Write out "Quadrant Health Group" in full · `needs answer`

> "I think we should be writing out the complete 'Quadrant Health Group' when
> referencing our company name."

Root cause is `lib/site.ts:6` — `shortName: "Quadrant Health"`. That field
exists to hold the short form, so it either becomes the full name or is retired.

| Surface | Occurrences |
|---|---|
| Code — hero h1, eyebrows, title template, alt text, meta descriptions | 17 lines |
| Content JSON — treatment copy, blog posts, bios | 96 occurrences |

Screenshot called out the About page eyebrow, "— ABOUT QUADRANT HEALTH".

**Open question.** Does the full name apply inside body copy — treatment pages,
blog posts, staff bios — or only in headings, navigation and metadata?

**Consequence to weigh.** The title template is `"… | Quadrant Health"` across
all 162 pages. Adding "Group" is +6 characters on every title, and all 21
treatment titles already exceed 60 characters (logged as F-07 in `issues.md`).

---

### CR-02 — Hero wording and the "behavioral health" swap · `needs answer`

> "And instead of 'addiction treatment centers' can we say 'behavioral health'
> centers?"

Two edits, one of which has reach:

- `app/page.tsx` h1 — `We are Quadrant Health` → `We are Quadrant Health Group`
- `lib/site.ts:7` tagline — `Your trusted network of addiction treatment centers`
  → `Your trusted network of behavioral health centers`

**Open question — scope.** The phrase also appears as the homepage h2 ("Luxury
addiction treatment centers that put you first") and in the paragraph beneath
it. Tagline only, or everywhere?

**Recommendation, flagged once.** Changing the tagline is low-risk. Changing the
phrase sitewide trades search ranking for positioning: "addiction treatment" is
the primary term the whole site targets — it sits in the title template, the
keyword list, and 21 treatment page titles — while "behavioral health" is
industry-facing language people search far less. Worth being a deliberate
choice rather than a side effect. Client's call either way.

---

### CR-03 — Give HR and Alumni their own sections on the staff page · `open`

> "can we build out HR and ALUMNI to have their own sections on the staff page?"

Current state of `/about/meet-the-team/`:

- `Business Development & Alumni Services` is one combined group of 9
- **There is no HR section at all** — HR staff sit inside `Corporate Leadership
  Team` (17)

Split into `Human Resources` and `Alumni` as standalone sections. The bio doc
already separates them as "Quad HR" and "Quad BD/Alumni" — that is the source
for who belongs where.

---

### CR-04 — Remove all facility-level staff from the parent site · `open`

> "and we're getting rid of all staff at a facility levels from the Quadrant
> site\*\*\*\*\*\*\*\* (all headshots should be in the folder as well)"

The largest item in this batch. Team page goes **99 → 33 people.**

| Group | People | |
|---|---:|---|
| Founders | 2 | stays |
| Corporate Leadership Team | 17 | stays |
| Business Development & Alumni Services | 9 | stays |
| Admissions & Client Care | 5 | stays |
| California Leadership | 6 | **removed** |
| Clinical & Operations | 5 | **removed** |
| Marina Harbor Detox | 3 | **removed** |
| Hillside Mission Recovery | 3 | **removed** |
| Laguna View Detox | 2 | **removed** |
| Ocean Coast Recovery Center | 3 | **removed** |
| Texas Facilities | 10 | **removed** |
| New Jersey — Wellness Recovery NJ | 19 | **removed** |
| Florida — Seaside Wellness of Palm Beach | 9 | **removed** |
| Iowa — Des Moines Wellness Center | 5 | **removed** |
| Kentucky — Wellness Ranch | 1 | **removed** |
| | **33 stay / 66 removed** | |

**Redirects required.** 66 `/team/<slug>` pages get deleted. They are in the
sitemap today and some are indexed on production, so each needs a 301 — either
to `/about/meet-the-team/` or to the corresponding facility site.

**Reverses recent work.** 29 facility staff were published from the bio doc on
2026-08-20. They come back out. Expected, not a conflict.

**Closes five workbook rows outright.** V0050, V0054, V0065, V0075 and V0086 all
describe the same defect — a bio duplicated between the parent and a facility
site. With no facility staff on the parent, the duplication cannot exist. This
is a cleaner resolution than the canonical-tag fix planned in T1.4.

**Open question.** Do the 66 removed pages 301 to `/about/meet-the-team/`, or to
each person's page on their facility's own site where one exists?

---

## Batch 2 — footer logo

Received 2026-08-21.

### CR-05 — Use the horizontal logo in the footer · `open`

> "Can we use Horizontal logo for footer?"

The footer brand column currently renders the **stacked** white lockup
(`/images/logo-white.png`, 580x440, ratio 1.32) at 88px tall. Swap it for the
horizontal lockup.

**Asset.** The approved brand kit holds three horizontal files. Two are white:

| File | Size | Artwork |
|---|---|---|
| `New Quadrant Logo-2025-white.png` | 1539x423 | White wordmark, **blue accent in the Q** |
| `Quadrant logo color - horz white.png` | 7065x1889 | All white, no accent |
| `New Quadrant Logo-horizontal.png` | 1539x423 | Dark — already in use as the header logo |

Recommend the first. It keeps the blue Q accent, which matches the header
treatment, and 423px of height is ample for a footer logo. The second is the
mono alternative if a flat white mark is preferred.

**This is not a straight file swap.** `.logo` in `Footer.module.css` is
`height: 88px; width: auto`. Going from ratio 1.32 to 3.64 takes the rendered
width from ~116px to ~320px, and the brand column is `1.2fr` of a
`1.2fr 2.4fr` grid — roughly 378px at container width. It would fit but fill
almost the entire column, and a horizontal lockup reads much heavier than a
stacked one at the same height. The height needs to come down to roughly
44–56px, giving ~160–204px wide, before this looks right.

**Worth noting.** The horizontal lockup spells out "HEALTH GROUP" beside the
wordmark, so this change reinforces CR-01 rather than conflicting with it.

---

## Batch 3 — spacing above the footer CTA band

Received 2026-08-21.

### CR-06 — Phone number is crowded by the CTA band · `open`

> "^ this looks really tight where the phone number is placed"
> — on `/admissions/`, the `(888) 970-6234` block against "Let healing begin today"

**This is a global layout bug, not an admissions one.** Every page ends with the
same overlap; admissions just shows it worst.

Mechanism, measured:

| Piece | Value |
|---|---|
| `.ctaBand` | `transform: translateY(-50%)` — pulled up by half its own height |
| `.ctaBand` height | inner `padding-block: clamp(2rem, 4vw, 2.75rem)` + content ≈ 200–230px desktop |
| So it overlaps upward by | ≈ 100–115px |
| `.footer` `padding-top` | **none** — nothing reserves space for the overlap |
| Last section's bottom padding | `var(--section-y)` = `clamp(4rem, 8vw, 7rem)` → up to 112px |

The band's overhang consumes essentially the entire bottom padding of whatever
section precedes it. On `/admissions/` the last thing in the left column is
`.bigPhone` — large, bold, `margin-top: 2rem`, nothing beneath it — so it ends
up almost touching the CTA card.

**Recommended fix.** Add `padding-top` to `.footer` roughly equal to half the
band's height. The translate then eats footer space instead of page content.
One rule in `Footer.module.css`, fixes every page at once.

Alternatives considered: padding the admissions section alone is brittle and
leaves the other pages wrong; reducing the `-50%` translate changes the
intended overlap design.

---

## Batch 4 — broaden addiction-only language to include mental health

Received 2026-08-21.

### CR-07 — Every mention of addiction should include mental health · `open`

> "^ everything needs to include mental health as well, not just addiction."
> — on `/about/our-story/`, flagging "We Empower Lasting Substance Abuse
> Addiction Recovery" and the Our milestones paragraph

**Scope, measured.** 430 strings in content data mention addiction, substance
abuse, rehab or sobriety with **no** mention of mental health, behavioral
health, dual diagnosis or co-occurring conditions — plus ~19 more in page code.

| Source | Addiction-only | Total strings |
|---|---:|---:|
| `treatments.json` — treatment pages | 272 | 778 |
| `pages.json` — the 7 ported pages | 85 | 260 |
| `posts.json` — blog posts | 54 | 145 |
| `team.json` — staff bios | 10 | 690 |
| `locationDetails.json` | 9 | 175 |
| Page code + `lib/site.ts` | ~19 | — |
| **Total** | **~449** | |

Worst-affected ported pages: `/about/faq` (65), `/admissions/help-for-loved-one`
(20), `/admissions/help-for-yourself` (11).

**Not a find-and-replace.** "Addiction" cannot be blanket-swapped for "addiction
and mental health" — many strings are page titles, H1s, FAQ questions or
sentences where the substitution reads wrong or doubles up ("substance abuse
addiction and mental health care" is already awkward in the milestones
paragraph the client flagged). This needs a copy pass with judgement, page by
page, prioritised by traffic.

**Also flagged in the screenshot,** worth fixing in the same pass:
- "We Empower Lasting Substance Abuse Addiction Recovery" — title-cased mid-
  sentence and says the same thing twice ("Substance Abuse Addiction")
- The Our milestones paragraph reads "substance abuse addiction and mental
  health care" — same redundancy

**This answers the open question on CR-02.** The client wants mental health
represented everywhere, not addiction alone — which is exactly what "behavioral
health" as an umbrella term achieves. Treat CR-02 and CR-07 as one piece of
work: pick the umbrella phrasing, then apply it in the copy pass. It also
softens the SEO concern raised against CR-02, since the goal is adding mental
health coverage rather than dropping addiction terms.

---

## Batch 5 — Levels of Care omits mental health

Received 2026-08-21.

### CR-08 — No mention of mental health on /treatment#levels · `open`

> "^ there's no mention of mental health on here" — on
> `https://quadrant-health-group.vercel.app/treatment/#levels`

Confirmed. **5 of the 6 level cards never mention mental health**, and two of
the card titles are framed as substance-only:

| Card title | Mental health? |
|---|---|
| Alcohol and Substance Abuse Detox | no |
| Alcohol and Drug Abuse Residential Inpatient | no |
| Partial Hospitalization Program | no |
| Intensive Outpatient Program | no |
| Virtual Intensive Outpatient Program | no |
| Dual Diagnosis Treatment | yes — the only one |

The section intro is also silent on it: "Our integrated approach ensures you
receive the right level of support at every stage of recovery."

Every level Quadrant offers treats mental health as well as substance use, so
the copy understates the service. Fix the two substance-only titles, the five
card descriptions and the section intro.

### CR-08b — Two level cards render an empty description · `open` · **not in the client's list**

Found while checking the above. `intro` is an empty string for two of the six
levels, so those cards render a blank paragraph on `/treatment#levels`:

| Slug | Intro length |
|---|---:|
| `residential-inpatient` | **0 characters** |
| `intensive-outpatient` | **0 characters** |
| `detox` | 386 |
| `virtual-intensive-outpatient` | 313 |
| `dual-diagnosis` | 290 |
| `partial-hospitalization` | 245 |

Two of the six most important programme cards on the site are visibly empty.
Worth writing the missing copy in the same pass as CR-08, since both need new
text for these cards anyway.

**Relationship to CR-07.** CR-08 is the same theme, but it is a specific,
scoped location rather than the 449-string sitewide sweep — the six level cards
plus one section intro. Good candidate to ship first as a visible win while the
full CR-07 copy pass is scheduled.

---

## Batch 6 — /locations/ tiles and care levels

Received 2026-08-21. Six items, all on `/locations/`.

### CR-09 — Remove Virtual IOP from Dallas Detox Center · `open`

> "get rid of virtual IOP from DDC"

`lib/site.ts` — `dallas-detox-center` care is currently
`["Detox", "Residential", "Virtual IOP", "Dual Diagnosis"]`. Drop `Virtual IOP`.

Check the detail page copy and `locationDetails.json` for the same claim, not
just the tile chip.

### CR-10 — Add Greater Texas Behavioral as its own tile · `open`

> "add Greater Texas Behavioral as it's own tile
> ( https://greatertexasbehavioral.com/ ) virtual outpatient - dual diagnosis -
> mental health"

Currently absent from `lib/site.ts` entirely — zero mentions. New entry needed:
name, region (Texas), care `["Virtual Outpatient", "Dual Diagnosis",
"Mental Health"]`, website `https://greatertexasbehavioral.com`.

**Two things this settles.** It closes workbook row **V0090** (Greater Texas has
no location page) and answers the open **T7.3** question in `issues.md` — whether
Greater Texas should be a location page or a service-line entry. The client says
its own tile.

**No photography exists** for Greater Texas in any client asset folder, and
V0044/V0046 established it is a virtual provider with no physical address. Needs
a branded face-card in the house style, same approach as Ohio.

### CR-11 — Add mental health care levels to three locations · `open`

> "add MH inpatient to Seaside / add MH outpatient to NJ / add MH inpatient to
> Des Moines"

| Location | Current care | Add |
|---|---|---|
| `seaside-wellness` | Detox, Residential, Dual Diagnosis, Aftercare | Mental Health Inpatient |
| `wellness-recovery-nj` | PHP, IOP, Virtual IOP, Dual Diagnosis | Mental Health Outpatient |
| `des-moines-wellness` | (see CR-12 note) | Mental Health Inpatient |

`Mental Health Inpatient` already exists as a care label on
`fort-worth-wellness`, so the wording is consistent with what is live.

**Note.** `careToSlug` in `app/locations/[slug]/page.tsx` maps care labels to
treatment pages so the chips become links. It has no entry for the mental health
labels, `Aftercare`, or the new `Virtual Outpatient` — those render as plain
text. Fine for now, but if these should link somewhere, the map needs extending.

### CR-12 — Fix the Ohio tile: wrong name and description · `open`

> "Ohio needs fixed: Incorrect Ohio name and description"
> "PHP - IOP - OP - Virtual"

The Ohio entry added on 2026-08-21 is wrong on three counts. It was sourced from
third-party directory listings because theohiorc.com sits behind a Cloudflare
challenge that blocked server-side fetching — flagged as needing verification at
the time, now confirmed wrong.

| Field | Currently | Correct |
|---|---|---|
| `name` | Ohio Recovery Center | **client to supply** |
| `blurb` | "private 55-acre campus… medical detox, residential treatment…" | **client to supply** |
| `care` | Detox, Residential, IOP, Dual Diagnosis | **PHP, IOP, OP, Virtual** |

The care correction is the substantive one: the directories described a
residential facility with detox, but it is outpatient-only. The current blurb
describes a level of care the facility does not provide.

**Needs from client:** the correct facility name and a description. The care
levels are already given.

---

## Batch 7 — "Our Most Recent" milestone is stale

Received 2026-08-21.

### CR-13 — "Our Most Recent" should read Iowa, Kentucky, Ohio · `open`

> "^ this should probably be: Iowa, Kentucky, Ohio"

On `/about/our-story/`. The page runs a two-stage timeline out of
`pages.json` → `about/our-story`:

| Section | Heading | Facilities listed |
|---|---|---|
| `sections[3]` | How It Started | Laguna View Detox, **Dallas View Detox**, Hillside Mission |
| `sections[4]` | Our Most Recent | Wellness Recovery NJ, Ocean Coast Recovery, Wellness Detox LA, Marina Harbor, Seaside Wellness |

`sections[4]` becomes Iowa, Kentucky, Ohio.

**Open question — what happens to the middle era?** A straight replacement drops
five facilities out of the story entirely: NJ, Ocean Coast, Wellness Detox LA,
Marina Harbor and Seaside stop being mentioned anywhere on the page. Two ways
to go:

- **Replace** `sections[4]` and accept the gap
- **Add a third stage** — How It Started / an expansion era / Our Most Recent —
  which keeps all eleven facilities in the narrative and tells a stronger growth
  story

Recommend the second, but it is the client's story to tell.

### CR-13b — "Dallas View Detox" is not a real facility · `open` · **not in the client's list**

Found while reading the timeline. `sections[3]` names **"Dallas View Detox"**.
No such facility exists — the network has `Dallas Detox Center` and
`Laguna View Detox`, and this reads as the two names merged. It is live on a
public page in the founding-story section.

### CR-13c — Kentucky has no location tile · `open` · **dependency, not a request**

If the timeline is going to claim Kentucky as a recent expansion, note that
**Kentucky does not exist in `lib/site.ts` at all** — zero mentions — and
`order` in `app/locations/page.tsx` is
`["California", "Texas", "Florida", "New Jersey", "Iowa", "Ohio"]`, which
silently drops any region not listed.

So Wellness Ranch KY appears only as a staff group heading today. This is the
same facility named in visual row 860 in `issues.md`. Adding it to the timeline
without a location tile means the About page references a state the Locations
page does not show.

Needs the same treatment as CR-10 and CR-12: name, city, care levels,
description, website — and there is no Kentucky photography in any asset folder.

---

## Batch 8 — testimonials section is empty

Received 2026-08-21.

### CR-14 — Reviews missing on /about/our-story/ · `open`

> "^ reviews are missing here" — the "What our patients say about us" section

The section renders scraper commentary as live body copy:

```
pages.json -> about/our-story -> sections[7]
  heading: "What our patients say about us"
  body:    "Section present on the page; no individual testimonial text
            displayed in source."
```

The original testimonials were almost certainly in a JavaScript carousel or a
third-party review widget, so the porting pass could not read them and wrote a
note describing the problem instead. That note shipped. **Internal tooling
commentary is currently published as customer-facing copy on the About page.**

**Scope checked — this is the only one.** Swept all five content files for the
same class of artifact ("displayed in source", "present on the page", "not
captured", "placeholder"): 1 hit in `pages.json`, 0 in `treatments.json`,
`posts.json`, `team.json` and `locationDetails.json`. No empty section bodies
anywhere either. So this is an isolated defect, not a systemic porting failure.

**Two parts to the fix:**

1. **Immediate** — remove the placeholder sentence. It should not be live
   regardless of what replaces it.
2. **Then** — populate real testimonials. Needs a source: the Google reviews
   feed, the original widget's provider, or client-supplied approved quotes.

**Connects to `issues.md` T5.5.** 17 visual rows ask for a "Google reviews
slide" across the treatment pages. If a reviews component is being built for
those, this section is the same component in a different place — build once, use
in both. Worth confirming whether the client wants Google reviews specifically
here, or hand-picked testimonials.

**Compliance note.** Patient testimonials on a healthcare site carry
constraints — HIPAA-adjacent consent for anyone identifiable, and the review
platform's own terms on republishing. Worth confirming the source is cleared
before it goes live rather than after.

---

## Batch 9 — ported admissions pages lost their formatting

Received 2026-08-21.

### CR-15 — "Why Choose Quadrant?" was tiles, now flat paragraphs · `open`

> "i think the bottom of this insurance veriication page, got pulled over and
> formatted wrong 'see more' isn't clickable, and these look like they may have
> been tiles"

Correct on both counts. In `pages.json` the section body is one string with
`\n\n` between items, and `PortedPage` renders every paragraph through the same
`<Prose>` component — there is no structure to render tiles or links from, so
everything flattens.

The five items are unmistakably card content:

```
From Detox to Aftercare: Comprehensive care at every stage…
Experienced Medical Staff: Our licensed addiction treatment professionals…
Dual Diagnosis programs: Treat both substance use disorders and co-occurring…
Family support along the way: Addiction affects the whole family…
Luxury Healing Environment: Our accredited facilities offer a safe…
See more about us          <- should be a link
```

### CR-15b — Same defect on 4 more sections · **client flagged one; this is the full set**

Swept all 7 ported pages for the pattern. **11 tile-shaped lines and 4 dead CTA
strings**, across two pages:

| Page | Section | Problem |
|---|---|---|
| `/admissions/admissions-process` | How Does the Admission Process Work | **Step 1–5 flattened into paragraphs** — a numbered process rendered as prose |
| `/admissions/admissions-process` | We Accept Most Insurance Plans | dead CTA: "See more about your insurance benefits verification" |
| `/admissions/insurance-verification` | Treatment Might Cost Less Than You Think | dead CTA: "Call Today for a free verification" |
| `/admissions/insurance-verification` | We accept most Insurance plans | dead CTA: **"CALL (888) 970-6234 NOW"** |
| `/admissions/insurance-verification` | Why Choose Quadrant? | 5 tiles + dead CTA "See more about us" |

**The worst of these is the phone number.** "CALL (888) 970-6234 NOW" renders as
plain text on the insurance verification page — not a `tel:` link. On mobile it
is not tappable, on the primary enquiry path, on a page whose entire purpose is
to generate a call. Same for "Call Today for a free verification".

**The admissions-process one is arguably as bad.** A five-step numbered process
is the page's core content and it currently reads as five unstyled paragraphs.

**Fix shape.** Two options:

- **Structure the data** — give sections an optional `items[]` (label + text) and
  `cta` (label + href), then teach `PortedPage` to render tiles and buttons.
  Correct, reusable, handles all 5 sections.
- **Convert these pages to hand-built components** like the non-ported pages.
  More control, more work, and they stop benefiting from the shared renderer.

Recommend the first. `PortedPage` is 85 lines and currently only knows headings,
prose and a flat bullet list.

**Also note:** the heading reads "Why Choose Quadrant?" — folds into CR-01
(write out "Quadrant Health Group").

---

## Batch 10 — duplicated bullet lists on ported pages

Received 2026-08-21.

### CR-16 — Repeated bullets at the bottom of /about/alumni · `open`

> "^ the highlighted bullet points are repeated from a section above. they need
> removed"

Confirmed. All 5 highlighted bullets are byte-for-byte duplicates of content in
`sections[2]` of the same page.

**Root cause is the renderer, not the page.** `PortedPage` renders section
bodies, then unconditionally renders a page-level `bullets[]` array underneath:

```
{page.sections.map(...)}                      <- bullets already appear here
{page.bullets.length > 0 && <ul>…</ul>}       <- and again here
```

The porting pass collected every `<li>` on the source page into `bullets[]`
*and* left them inside the section bodies, so they render twice.

### CR-16b — Same duplication on 2 more pages · **client flagged one; this is the full set**

Checked all 7 ported pages. Every page that has a `bullets[]` array has it
**100% duplicated** — nothing unique lives in any of them:

| Page | Bullets | Duplicated |
|---|---:|---|
| `/admissions/help-for-loved-one` | **27** | all 27 |
| `/admissions/admissions-process` | 6 | all 6 |
| `/about/alumni` | 5 | all 5 |
| `/about/our-story` | 0 | — |
| `/about/faq` | 0 | — |
| `/admissions/help-for-yourself` | 0 | — |
| `/admissions/insurance-verification` | 0 | — |

`/admissions/help-for-loved-one` is the worst: **27 duplicate bullets** stacked
at the bottom of a page on the primary enquiry path.

**Fix — one line, zero content loss.** Remove the `page.bullets` block from
`components/PortedPage.tsx`. Because the duplication is total on all three
pages, nothing unique is lost. Verified before recommending it.

Leaving the field in the data is fine — it just stops rendering. Alternatively
clear the three arrays in `pages.json` and keep the renderer generic; the
renderer change is preferable since it cannot regress if the porting script is
re-run.

---

## Decisions needed before any of this ships

| | Question | Blocks |
|---|---|---|
| 1 | Full company name in body copy too, or headings/nav/metadata only? | CR-01 |
| 2 | "Behavioral health" everywhere, or tagline only? — see CR-07, which likely answers this | CR-02, CR-07 |
| 3 | Removed staff pages 301 to the team index, or to facility sites? | CR-04 |
| 4 | Correct Ohio facility name and description | CR-12 |
| 5 | Replace the "Most Recent" list, or add a third timeline stage? | CR-13 |
| 6 | Should Wellness Ranch KY get a location tile? If so: name, city, care, description | CR-13c |
| 7 | Testimonials source — Google reviews feed, or client-supplied quotes? | CR-14, T5.5 |

## Batches still to come

Client is sending further screenshots one at a time. Each gets its own batch
section, with IDs continuing from CR-04.
