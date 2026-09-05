# Phase 6: Parity Checklist (PROD-01)

**Phase:** 06-parity-verification  
**Plan:** 06-01  
**Filled:** 2026-09-05  
**Baseline (D-03):** remaining live `web/` content — not `mockups/` archive  

**Automated evidence:**
- `node .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` → exit 0; unique refs **82**; Assert A 0 missing; Assert B 0 ∩ delete-list + **55** deletes absent; Assert C **82** keeps present
- `cd web && npm run build` → exit **0** (Next.js 16.3.4)

| Surface | Expectation | Method (auto/human) | Status | Notes |
|---------|-------------|---------------------|--------|-------|
| Ref integrity script (Assert A) | Every normalized `/assets/*` + `/mockups.css` ref under `web/src` + `mockups.css` exists on disk | auto | PASS | Unique refs=82; 0 missing |
| DELETE-LIST unreferenced + absent (Assert B) | refs ∩ `05-DELETE-LIST.txt` = ∅; all 55 paths absent from disk | auto | PASS | Path-aware match only (no basename) |
| Inventory keeps present (Assert C) | All `02-INVENTORY.json` `class=keep` paths exist | auto | PASS | 82/82 keeps on disk |
| `npm run build` (Assert D) | Production build exits 0 | auto | PASS | `cd web && npm run build` exit 0 |
| Hero BG `/assets/hero/Hero-background.png` | Keep asset loads; covered by ref-check | auto | PASS | Referenced in `CinematicHero.tsx`; Assert A |
| Logo `/assets/logo/logo-horizontal-reverse.svg` | Keep asset loads; covered by ref-check | auto | PASS | Referenced in `CinematicHero.tsx`; Assert A |
| Laurel `/assets/awards/laurel-wreath.svg` | Keep asset loads | auto | PASS | Referenced in `CinematicHero.tsx`; Assert A |
| Nav anchors to body sections | Config targets `#markets`, `#sessions`, `#accounts`, `#funding`, `#platforms`, `#dashboard`, `#copy-trading`, `#ecosystem`, `#why-dominion`, `#trust`, `#blogs`, `#final-cta`, `#top` | auto | PASS | Present in `CinematicHero` nav data / links; section ids exist in `home-html.ts` |
| Hero + nav visual layout | Matches pre-prune shipping look (desktop) | human | human_needed | Visual judgment; D-02 smoke not run |
| `#proof` section | DOM id present; keep images not broken | auto | PASS | `id=\"proof\"` in `home-html.ts` |
| `#proof` visual / marquee look | Layout intact after prune | human | human_needed | |
| `#awards` section | Present; may stay `hidden` (parity = stay hidden) | auto | PASS | `id=\"awards\"` present; hidden OK per UI-SPEC |
| `#awards` visual | N/A if hidden | human | human_needed | Confirm remains hidden / no layout break |
| `#sessions` section | DOM id present | auto | PASS | `id=\"sessions\"` in `home-html.ts` |
| `#sessions` visual | Layout intact | human | human_needed | |
| `#markets` section | DOM id present | auto | PASS | `id=\"markets\"` in `home-html.ts` |
| `#markets` visual | Layout intact | human | human_needed | |
| `#quotes` section | DOM id present | auto | PASS | `id=\"quotes\"` in `home-html.ts` |
| `#quotes` visual | Layout intact | human | human_needed | |
| `#funding` section | DOM id present | auto | PASS | `id=\"funding\"` in `home-html.ts` |
| `#funding` visual | Layout intact | human | human_needed | |
| `#trader-community` section | DOM id present | auto | PASS | `id=\"trader-community\"` in `home-html.ts` |
| `#trader-community` visual | Layout intact | human | human_needed | |
| `#mrkt` section | DOM id present | auto | PASS | `id=\"mrkt\"` in `home-html.ts` |
| `#mrkt` visual | Layout intact | human | human_needed | |
| `#mt5-simulator` section | DOM id present | auto | PASS | `id=\"mt5-simulator\"` in `home-html.ts` |
| `#mt5-simulator` visual | Layout intact | human | human_needed | |
| `#how-it-works` section | DOM id present | auto | PASS | `id=\"how-it-works\"` in `home-html.ts` |
| `#how-it-works` visual | Layout intact | human | human_needed | |
| `#accounts-focus` section | DOM id present | auto | PASS | `id=\"accounts-focus\"` in `home-html.ts` |
| `#accounts-focus` visual | Layout intact | human | human_needed | |
| `#accounts` section | DOM id present | auto | PASS | `id=\"accounts\"` in `home-html.ts` |
| `#accounts` visual | Layout intact | human | human_needed | |
| `#platforms` section | DOM id present | auto | PASS | `id=\"platforms\"` in `home-html.ts` |
| `#platforms` visual | Layout intact | human | human_needed | |
| `#why-dominion` section | DOM id present | auto | PASS | `id=\"why-dominion\"` in `home-html.ts` |
| `#why-dominion` visual | Layout intact | human | human_needed | |
| `#dashboard` section | DOM id present | auto | PASS | `id=\"dashboard\"` in `home-html.ts` |
| `#dashboard` visual | Layout intact | human | human_needed | |
| `#trade-better` section | DOM id present | auto | PASS | `id=\"trade-better\"` in `home-html.ts` |
| `#trade-better` visual | Layout intact | human | human_needed | |
| `#blogs` section | DOM id present | auto | PASS | `id=\"blogs\"` in `home-html.ts` |
| `#blogs` visual | Layout intact | human | human_needed | |
| `#ecosystem` section | DOM id present | auto | PASS | `id=\"ecosystem\"` in `home-html.ts` |
| `#ecosystem` visual | Layout intact | human | human_needed | |
| `#copy-trading` section | DOM id present | auto | PASS | `id=\"copy-trading\"` in `home-html.ts` |
| `#copy-trading` visual | Layout intact | human | human_needed | |
| `#trust` section | DOM id present | auto | PASS | `id=\"trust\"` in `home-html.ts` |
| `#trust` visual | Layout intact | human | human_needed | |
| `#final-cta` section | DOM id present | auto | PASS | `id=\"final-cta\"` in `home-html.ts` |
| `#final-cta` visual | Layout intact | human | human_needed | |
| `footer` | Footer markup present | auto | PASS | `id=\"footer\"` (+ footer link blocks) in `home-html.ts` |
| Footer visual / links | Keep assets / layout OK | human | human_needed | |
| `[data-marquee]` tracks | proof / markets / trader-community; no init throw | human | human_needed | 3 `data-marquee` in HTML; do not fail on missing `#site-nav` / `data-xhero` |
| `#markets` `[data-platform]` tabs | Tab switch works | human | human_needed | `data-platform` present in HTML |
| Quotes `[data-quotes-tab]` | Tab switch works | human | human_needed | `data-quotes-tab` present in HTML |
| `#dashboard` `[data-dash-feature]` tabs | Tab switch works | human | human_needed | `data-dash-feature` present in HTML |
| `#ecosystem` tabs | Tab switch if present | human | human_needed | eco-tab ids present in HTML |
| CSS backgrounds (`mockups.css`) | Static `url(/assets/...)` covered by Assert A | auto | PASS | `mockups.css` included in ref-check scan |
| CSS backgrounds visual | Atmosphere / images render | human | human_needed | Optional D-02 |

## D-04

None — Asserts A/B/C already green; no `web/` caller/path changes.

## D-02

Skipped at checklist write time (Task 2). Task 3 may attach smoke notes if browser tools run.
