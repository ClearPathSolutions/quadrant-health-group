# Handoff — Quadrant Health Group site

Read this first, then `issues.md` in this repo. `issues.md` is the full backlog: 2,366 lines,
49 tasks, every source row reproduced with its evidence.

## The project in three sentences

This repo is a Next.js 14 rebuild of `quadranthealthgroup.com`, a nationwide addiction and
mental-health treatment network. **The rebuild is not live** — the real domain still serves
WordPress on WP Engine, and this build sits at `quadrant-health-group.vercel.app` awaiting a
DNS cutover. Everything in the backlog is pre-launch work.

## Ground rules

1. **The client's documents are the law.** Two were supplied — an audit workbook (Google
   Sheet, 5 tabs) and a bio doc (Google Doc, 131 people). Where a document disagrees with the
   build, the document is the spec and the build changes. Do not re-litigate rows.
2. **Where a document corrects itself, the correction is the operative version.** The
   workbook's verification pass rewrote 26 rows and corrected 49 more. Those corrections are
   reproduced under each row in `issues.md` — they are the instruction, not commentary.
3. **Never guess a person's identity.** Two defects in this codebase were wrong-person and
   wrong-name errors on named staff. If a name is ambiguous, stop and ask.
4. Run dev on **PORT=3200** (3000 is taken on this machine).
5. Nothing is committed. 120 files are modified in the working tree from the imagery and
   headshot work. Verify with `git status` before starting.

## Already done — do not redo

| | |
|---|---|
| T3.10 | 36 official headshots imported and wired; 47 more staged under future slugs |
| T6.2 | `olivia-hadjerioua`'s missing photo filled |
| T8.0 | Brand kit applied to all 6 logo slots from the approved folder |
| T8.1 | Homepage hero + site-wide `og:image` replaced (was another company's apartment building) |
| T8.2 | Both stock section photos replaced with client facility photography |
| T8.3a | Exterior/interior alt mismatch fixed |

`next build` passes: 96 routes, 91 static pages, 0 type errors, 0 broken image paths.

## Start here — in this order

**1. Factual errors about real people. Cheapest, highest stakes.**
- **T3.1** — `lib/content/team.json` has `name: "Monica Olivires"` / slug `monica-olivires`,
  but her own bio text and the client's bio doc both spell it **Olivares**. Fix the name,
  correct the slug, 301 the old URL.
- **T3.8** — `/team/trevor-amador` publishes **Alicia Joslin's** page in full. Trevor Amador
  is absent from the entire bio doc. Production has the same defect, so fixing it here fixes
  it there. Rename the slug to `alicia-joslin`, rename the matching image, 301 the old path.
- **T3.5** — Four published people are absent from the bio doc: `karen-pettit`,
  `tami-distefano`, `denise-edwards`, `nastasya-aracena`. The doc is the roster — remove them
  and 301 their URLs.

**2. WP-7 — three items the documents themselves defer.** Quick to settle, they unblock
other work: the `opiate` vs `opioid` keyword check, the Greater Texas page format, and the
aftercare page.

**3. T1.1 — the trailing-slash convention.** Every preview is slashless; every production
site is slash-canonical. This decision determines the shape of T1.3 and T1.4, so settle it
before either.

**4. The cutover set, shipped together:** T1.2 (port 7 dropped production pages, including
the whole admissions funnel), T1.3 (16-pair 301 redirect map), T1.4 (canonicals — currently
0 of 92 pages have one), T2.1 (`og:url` wrong or absent on all 92).

**5. T3.2 + T6.1 — publish the 30 corporate bios into a grouped team page.** The largest
content win available and fully unblocked: bio copy is in the doc, headshots are already
staged in `public/images/team/`. Both founders, the CEO, COO, CFO, CRO and the medical
oversight lead currently have no page at all.

Then WP-4 (locations and outbound linking), WP-5 (231 content rows, mostly treatment
templates), WP-6, WP-8, and **T1.5 immediately before cutover**.

## Traps

- **Do not link the parent site to Ocean Coast's bio pages yet** (part of T4.2). Their pages
  canonical to their own domain root, so they disclaim themselves — linking there passes
  authority nowhere. The workbook flags the fix as unsafe until that is corrected.
- **T3.9 is blocked on an identity question.** The headshot folder has `Haley Hayes.png`; the
  bio doc has *Haley Wadlington*. No document links the names. Her existing photo is
  untouched. Ask before touching it.
- **Do not copy Laguna as a canonical model.** 43 of its 46 canonicals point at redirects.
  Use Marina Harbor.
- **The 231 visual rows were never verified.** The workbook's own Legend warns that roughly
  two thirds of the rows that *were* verified needed a correction. Work them as written, but
  if a row describes something already present in the build, close it and note that.
- **The build is a content snapshot from ~15–16 July 2026** and production has kept
  publishing. Re-run the content diff immediately before cutover (T1.5), not now.

## Known gaps with no owner yet

- **18 treatment heroes and 4 blog heroes are still stock photography** (T8.4). The client's
  facility folders in `~/Downloads` cover properties and interiors but not therapy sessions
  or family scenes. Needs a shoot, a named licensed library, or a design direction that does
  not depend on photography. This is a decision, not a missing file.
- **`insurance.png`** bakes Aetna, Humana, Cigna, TRICARE, UnitedHealthcare and VA marks into
  one image. Confirm every carrier relationship is accurate and rebuild as real markup.
- **`aerial-2.jpg`** represents Des Moines, Iowa with a Texas ranch property. 81 Des Moines
  photos are available in `~/Downloads/Des Moines Wellness Center`.

## Findings from a separate codebase audit — not in the workbook

The workbook is an SEO and content audit; it never examined the code. These are real and
unlogged there. Interleave F-02 and F-04 with step 4 above.

- **F-02** `/api/lead` returns `ok: true` and shows the success state even when Clarion
  rejects the lead. Clarion authorises by origin allowlist, so **at cutover every lead may
  silently drop.** Allowlist the production origin and test a real submission before DNS moves.
- **F-04** 23 focusable elements sit inside `aria-hidden="true"` — the mobile drawer closes
  with `transform` alone at every viewport width. Two-line CSS fix in
  `components/Header.module.css`: add `visibility: hidden` to `.drawer`, `visible` to
  `.drawerOpen`.
- **F-05** `/api/lead` writes name, phone, email and the free-text message to `console.warn`
  on failure — health information into Vercel runtime logs.
- **F-07** 7 pages ship a doubled brand name in `<title>`; all 21 treatment titles exceed 60
  characters.
- **F-09 – F-12** Legal copy is thin (509 / 438 words, README says replace before launch);
  the footer year and sitemap `lastModified` are hardcoded to 2026; `/api/lead` has no rate
  limiting.

## Source files

| | |
|---|---|
| Backlog | `issues.md` — start with the Summary, then the Tasks section at the end |
| Audit workbook | Google Sheet, 5 tabs; every relevant row is reproduced in `issues.md` |
| Bio doc | Google Doc, 131 people; the reconciliation is Part 6 |
| Headshots | `~/Downloads/Staff Headshots` — 124 files, already imported |
| Brand kit | `~/Downloads/Quadrant Health Group` — 8 logo assets, already applied |
| Facility photos | `~/Downloads/<facility name>` — 340 images across 5 folders |
