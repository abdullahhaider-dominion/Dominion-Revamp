---
quick_task: 260909-partnership
phase: quick-260909-partnership
plan: 01
type: execute
wave: 1
depends_on: []
autonomous: true
files_modified:
  - web/src/app/partnership/page.tsx
  - web/src/components/partnership/PartnershipPage.tsx
  - web/src/components/partnership/IncomeCalculator.tsx
  - web/src/styles/partnership.css
  - web/public/assets/Partnership-page/partnership-hero-partner.png
  - web/public/assets/Partnership-page/partnership-dashboard-devices.png
  - web/public/assets/Partnership-page/partnership-affiliate-figure.jpg
must_haves:
  truths:
    - "A visitor can open /partnership and see every visible reference section in the same order, followed by the existing shared footer."
    - "The income control updates total referred-client lots and estimated monthly income using the reference relationship of $10 per lot."
    - "The page closely matches the supplied desktop reference and deliberately recomposes for tablet, 390px, and 320px without horizontal overflow."
    - "The existing SiteNav, SiteFooter, Poppins/Montserrat fonts, #1D3347, and #47BD68 are reused without duplicated chrome or new dependencies."
    - "Missing pack imagery is replaced only by the available generated visuals and lucide-react icons."
  artifacts:
    - path: "web/src/app/partnership/page.tsx"
      provides: "Dedicated /partnership route and metadata"
    - path: "web/src/components/partnership/PartnershipPage.tsx"
      provides: "Typed semantic page content and all reference sections"
    - path: "web/src/components/partnership/IncomeCalculator.tsx"
      provides: "Accessible client-side income calculator"
    - path: "web/src/styles/partnership.css"
      provides: "Route-scoped reference-matched responsive design"
    - path: "web/public/assets/Partnership-page/"
      provides: "Three available generated page-specific visual assets"
  key_links:
    - from: "web/src/app/partnership/page.tsx"
      to: "web/src/components/partnership/PartnershipPage.tsx"
      via: "PartnershipPage import and render"
      pattern: "import.*PartnershipPage"
    - from: "web/src/components/partnership/PartnershipPage.tsx"
      to: "web/src/components/partnership/IncomeCalculator.tsx"
      via: "interactive calculator composition"
      pattern: "<IncomeCalculator"
    - from: "web/src/components/partnership/PartnershipPage.tsx"
      to: "web/public/assets/Partnership-page/"
      via: "local next/image sources"
      pattern: "/assets/Partnership-page/"
---

<objective>
Build a responsive Dominion Markets Partnership page at `/partnership` that closely recreates the supplied reference while fitting the existing Next.js site.

Purpose: Deliver the complete partner-acquisition journey without duplicating shared chrome or depending on the missing source pack.
Output: One route, one semantic page component, one interactive calculator, one route-scoped stylesheet, and three reviewed production visuals.
</objective>

<execution_context>
@$HOME/.cursor/get-shit-done/workflows/execute-plan.md
@$HOME/.cursor/get-shit-done/templates/summary.md
</execution_context>

<context>
@CLAUDE.md
@web/AGENTS.md
@.cursor/skills/dominion-section-redesign/SKILL.md
@docs/brand/Dominion_Markets_Brand_Guidelines.md
@web/src/app/layout.tsx
@web/src/app/globals.css
@web/src/components/SiteNav.tsx
@web/src/components/SiteFooter.tsx
@web/src/app/about/page.tsx
@web/src/components/about/AboutPage.tsx
@web/src/styles/about.css
@/Users/usama/.cursor/projects/Users-usama-Desktop-Dominion-Markets-Fresh-Pull/assets/image-9933e0d8-1555-4e43-9385-667290ded960.jpg
@/Users/usama/Downloads/Partnership/dominion_partnership_everything_pack 2/README.txt

<locked_decisions>
- D-01: The supplied screenshot is the approved design reference; recreate it closely without concept exploration.
- D-02: Include the exact visible flow: hero and benefits strip, income calculator, broker benefits/dashboard, four-stat band, affiliate cards, three-step process, FAQ, and destination links.
- D-03: Reuse the root SiteNav and SiteFooter exactly once; do not create page-local replacements.
- D-04: Reuse global Poppins/Montserrat and exact brand colors #1D3347/#47BD68.
- D-05: The claimed source pack contains only README.txt; do not invent missing source files or copy the README into public assets.
- D-06: Use generated/available project visuals and lucide-react icons; add no dependency.
- D-07: Deliver deliberate desktop, tablet, 390px, and 320px layouts with accessible interactions and no horizontal overflow.
- D-08: Planning is the only action now; production edits and commits occur only during a separately authorized execution.
</locked_decisions>

<interfaces>
From `web/src/app/layout.tsx`:
```typescript
<body className={montserrat.className}>
  <SiteNav />
  {children}
  <SiteFooter />
</body>
```

From `web/src/app/globals.css`:
```css
:root {
  --dm-font-body: var(--font-montserrat), "Montserrat", system-ui, sans-serif;
  --dm-font-heading: var(--font-poppins), "Poppins", system-ui, sans-serif;
}
```

The route renders only `<main className="partnership-page">`; shared chrome comes from the root layout. Keep only the calculator client-side. Use native `<details>/<summary>` for the FAQ.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Audit and prepare the available partnership visuals</name>
  <files>web/public/assets/Partnership-page/partnership-hero-partner.png, web/public/assets/Partnership-page/partnership-dashboard-devices.png, web/public/assets/Partnership-page/partnership-affiliate-figure.jpg</files>
  <action>
Per D-01, D-05, and D-06, use the three available generated files for their intended reference roles: `partnership-hero-partner.png` on the right side of the dark hero, `partnership-dashboard-devices.png` in the broker-benefits section, and `partnership-affiliate-figure.jpg` in the central affiliate-program composition. Inspect each at full size for malformed anatomy/devices, accidental text, watermarks, edge artifacts, and responsive crop safety. If an asset fails review, regenerate only that asset while preserving its current production filename and role. Do not copy README.txt, invent source-pack files, redraw the Dominion logo, or add third-party marks.
  </action>
  <verify>
    <automated>test -s web/public/assets/Partnership-page/partnership-hero-partner.png &amp;&amp; test -s web/public/assets/Partnership-page/partnership-dashboard-devices.png &amp;&amp; test -s web/public/assets/Partnership-page/partnership-affiliate-figure.jpg &amp;&amp; test "$(find web/public/assets/Partnership-page -maxdepth 1 -type f \( -name '*.png' -o -name '*.jpg' \) | wc -l | tr -d ' ')" = "3"</automated>
    <manual>Open all three images and confirm clean edges/crops, no watermark, and close visual compatibility with the supplied reference.</manual>
  </verify>
  <done>Exactly three reviewed page-specific visuals are retained under their existing filenames; no nonexistent pack asset is referenced or copied.</done>
</task>

<task type="auto">
  <name>Task 2: Build the route, complete section flow, and calculator</name>
  <files>web/src/app/partnership/page.tsx, web/src/components/partnership/PartnershipPage.tsx, web/src/components/partnership/IncomeCalculator.tsx</files>
  <action>
Read the relevant Next.js 16 App Router and Image documentation under `web/node_modules/next/dist/docs/` before implementation. Retain and verify the available thin `/partnership` server route with factual title, description, canonical metadata, and named `PartnershipPage` render; modify it only if those contracts are incomplete. Do not import SiteNav or SiteFooter because root layout already supplies them per D-03.

Build typed readonly data and semantic markup for the complete D-02 flow:
1. Dark navy hero with “Partner with Dominion Markets,” “Chart Your Own Path with Dominion Markets,” supporting copy, “Become an IB” linking to `#how-it-works`, “Partner Login” linking to `/#client-area`, the generated partner image, and a three-item strip for trusted global broker, competitive payouts, and shared growth/support.
2. Income calculator headed “The More Clients You Sign Up, the Greater Your Income,” with total client lots, a 0–20,000 range, visible reference tick labels, and the estimated monthly result.
3. “Be Your Own Broker with Dominion Markets!” split section with the four visible benefit bullets and generated laptop/phone dashboard.
4. Dark four-stat band: IBs &amp; Affiliates 1,000+, Dominion Markets Clients 90,000+, Trading Instruments 200+, Offices &amp; Branches 3+.
5. “Dominion Markets Affiliate Program Includes” composition with four cards: tight spreads, cutting-edge trading platforms, leverage/swap-free option, and instant withdrawals, surrounding the generated affiliate-advisor image.
6. `id="how-it-works"` three-step ordered process: Register, Introduce, Earn.
7. Five-question native FAQ accordion matching the visible reference questions, with concise factual answers that do not introduce guarantees.
8. “Choose Where To Go Next” destination cards: About Us → `/about`, Blogs → `/#insights`, Leaderboard → `/incentives/leaderboard-challenge`, Contact → `/#final-cta`.

Use `next/image` for generated visuals and lucide-react for supporting icons, all with suitable alt behavior and `aria-hidden` on decorative icons. Preserve only legible reference claims; do not add profit guarantees, licence numbers, external registration URLs, or unsupported partner terms.

Implement `IncomeCalculator` as the only `"use client"` module. Use a labelled range input with default 10 lots, min 0, max 20,000, step 10, `aria-describedby`, keyboard support, localized number/currency formatting, and the reference calculation `estimatedMonthlyIncome = lots * 10` so 10 lots displays $100. Mark the result as an estimate and keep the formula in one named helper.
  </action>
  <verify>
    <automated>cd web &amp;&amp; npm run lint -- src/app/partnership/page.tsx src/components/partnership/PartnershipPage.tsx src/components/partnership/IncomeCalculator.tsx &amp;&amp; npx tsc --noEmit</automated>
  </verify>
  <done>`/partnership` compiles with route metadata, every required reference section appears in order, shared chrome is not duplicated, repeated content is data-driven, all links are explicit, and the calculator returns $100 for 10 lots.</done>
</task>

<task type="auto">
  <name>Task 3: Match the reference responsively and run release gates</name>
  <files>web/src/styles/partnership.css</files>
  <action>
Import and implement a fully route-scoped `.partnership-page` stylesheet per D-01, D-04, and D-07. Recreate the reference’s dark cinematic hero, white/mint body, sweeping green atmosphere, compact dense section rhythm, glass cards, navy stat band, pill CTAs, and dashboard/advisor compositions using #1D3347, #47BD68, and the global font variables. Style the existing shared nav over this dark hero through `body:has(.partnership-page) .dm-nav` without changing SiteNav source or behavior.

Create deliberate responsive compositions: wide desktop mirrors the reference’s split hero, horizontal benefit/stat bands, centered affiliate visual, and compact process row; tablet collapses dense four-column regions to 2×2; 390px and 320px stack the hero copy/art, turn strips and cards into readable grids, keep generated figures uncropped, make the calculator/tick labels usable, stack the process and destination links, and preserve at least 44px controls. Add visible `:focus-visible`, native FAQ open-state styling, slider focus/value visibility, contrast-safe overlays, and `prefers-reduced-motion`. Prevent clipping and horizontal overflow.

Run lint, TypeScript, and production build. Serve `/partnership` and compare it with the supplied reference at 1440px, tablet, 390px, and 320px. Verify exact section order, one shared nav/footer, three successful image requests, keyboard-operable slider/FAQ/links, valid destinations, no console errors, and `scrollWidth <= clientWidth`. Capture temporary desktop/mobile screenshots for comparison but do not commit them.
  </action>
  <verify>
    <automated>cd web &amp;&amp; npm run lint &amp;&amp; npx tsc --noEmit &amp;&amp; npm run build</automated>
    <manual>Inspect `/partnership` at 1440px, tablet, 390px, and 320px against the supplied reference; confirm visual hierarchy, calculator behavior, FAQ keyboard behavior, valid links, successful assets, one shared footer, and no overflow or console errors.</manual>
  </verify>
  <done>The page closely matches the approved desktop reference, has intentional tablet/mobile layouts, preserves shared brand chrome, and passes lint, typecheck, build, accessibility, asset, console, and overflow checks.</done>
</task>

</tasks>

<threat_model>
- Tampering: Render stats, benefits, steps, and FAQ from typed readonly data to reduce claim drift.
- Spoofing: Use only explicit existing internal destinations; no empty links or invented partner-login endpoint.
- Information disclosure / elevation: Accept as not applicable because the page has no form, API, auth, personal data, or secrets.
- Denial of service: Mitigate image weight with `next/image`, accurate `sizes`, hero-only preload, and lazy loading below the fold.
</threat_model>

<verification>
1. Run `cd web && npm run lint && npx tsc --noEmit && npm run build`.
2. Browser-check `/partnership` at 1440px, tablet, 390px, and 320px.
3. Confirm all required sections, three generated assets, interactive calculator, keyboard FAQ, valid destination links, one shared SiteNav/SiteFooter, no console errors, and no horizontal overflow.
</verification>

<success_criteria>
- `/partnership` contains every visible reference section in the approved order.
- The three available generated visuals fill the missing pack roles without fake logos, watermarks, or third-party marks.
- The calculator is accessible and computes $10 estimated monthly income per referred-client lot.
- Desktop and mobile layouts closely preserve the reference hierarchy and brand.
- No new dependency, duplicated chrome, unsupported claim, production error, or committed screenshot is introduced.
</success_criteria>

<output>
After a separately authorized execution, create `.planning/quick/260909-partnership/260909-partnership-SUMMARY.md`.
</output>
