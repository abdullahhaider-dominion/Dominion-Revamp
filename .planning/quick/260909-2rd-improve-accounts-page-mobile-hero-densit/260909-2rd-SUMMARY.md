---
quick_task: 260909-2rd
plan: 01
subsystem: ui
tags: [css, responsive-design, mobile, accounts]

requires:
  - quick_task: 260909-26l
    provides: Production Accounts page and responsive stylesheet
provides:
  - Content-sized mobile Accounts hero with a measured 50px lower gap
  - Larger mobile hero typography, benefit icons, and benefit labels
affects: [accounts, mobile-layout]

tech-stack:
  added: []
  patterns: [mobile-only content sizing, fluid headline scale, measured responsive geometry]

key-files:
  created: []
  modified:
    - web/src/styles/accounts.css

key-decisions:
  - "Removed the mobile hero height floor and used 50px bottom padding to make the final breathing room content-driven."
  - "Kept the 390px headline on one line with a 52px fluid size and tighter mobile-only letter spacing."

requirements-completed: []

duration: 3min
completed: 2026-09-08
---

# Quick Task 260909-2rd: Mobile Accounts Hero Density Summary

**A content-sized mobile Accounts hero with stronger type and benefits, a measured 50px lower breathing space at 390px, and overflow-safe wrapping at 320px.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-09-08T21:02:46Z
- **Completed:** 2026-09-08T21:05:49Z
- **Tasks:** 1
- **Source files changed:** 1

## Accomplishments

- Replaced the 570px/590px mobile hero minimum-height constraints with `min-height: 0` and content-driven sizing.
- Increased the mobile eyebrow from 8px to 9px, headline from 50.7px to 52px at 390px, body from 11px to 12px, benefit icons from 30px to 34px, and benefit labels from 8px to 9px.
- Tightened breadcrumb-to-copy and copy-to-benefits rhythm while retaining the navigation-safe 94px top padding and two-column benefit grid.
- Reduced the measured 390px dead tail from 178.734px to exactly 50px without changing account-card or later-section rules.

## Exact 390px Geometry

All rectangles were measured in CSS pixels at a 390×844 viewport on `http://localhost:3000/accounts`.

| Element | Before top–bottom / height | After top–bottom / height |
| --- | --- | --- |
| Hero | 0–590 / 590 | 0–464.586 / 464.586 |
| Eyebrow | 145.945–158.344 / 12.398 | 137.945–151.891 / 13.945 |
| Headline | 166.344–215.016 / 48.672 | 159.891–209.805 / 49.914 |
| Body copy | 230.016–301.266 / 71.25 | 223.805–300.586 / 76.781 |
| Benefit grid | 334.266–411.266 / 77 | 328.586–414.586 / 86 |
| First card | starts at 618 | starts at 492.586 |

- **Benefit-grid-to-hero-bottom gap:** 178.734px before → **50px after**.
- **Hero-to-first-card gap:** 28px after, preserving the existing cards-section spacing.
- **Final mobile sizes:** eyebrow 9px/13.95px line-height; headline 52px/49.92px; body 12px/19.2px; benefit icons 34×34px; labels 9px/12.6px.
- The 390px headline remains one line; the first account card remains 358px wide and unchanged at 455px tall.

## Verification

- `npm run lint -- src/styles/accounts.css` - completed with zero errors; ESLint reported the expected warning that CSS has no matching lint configuration.
- `npx tsc --noEmit` - passed with no output.
- 390px browser geometry - hero 464.586px tall, benefit grid bottom 414.586px, hero bottom 464.586px, exact lower gap 50px, and document width 390/390.
- 320px browser check - document `scrollWidth` 320 equals `clientWidth` 320; no horizontal overflow and no hero/card descendant exceeded the viewport.
- 320px wrapping - headline wraps cleanly to two lines at 43px, body to five lines, and all four benefit labels to two lines; no clipping was detected. Hero height is content-driven at 516.414px with a 50px lower gap; the first card remains fully within the 16px side gutters.
- 1280px desktop spot-check - base hero values remained active: 390px minimum height, 118px/56px padding, 57.6px headline, 13px body, four-column 820×30px benefit row, and unchanged 458px account-card height.
- Temporary 390px and 320px hero-through-card screenshots were captured through browser tooling and were not added to the repository.
- `git diff --check` passed.
- Commit scope contains only `web/src/styles/accounts.css`; root `.DS_Store`, this plan, this summary, and screenshots were not staged or committed. Nothing was pushed.

## Task Commit

- `63908a8` - `fix(accounts): rebalance mobile hero density`

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None. This CSS-only change introduces no network, authentication, storage, file-access, or user-input boundary.

## Self-Check: PASSED

- `web/src/styles/accounts.css` exists and is the only file in commit `63908a8`.
- The 390px target gap is within the required 45–55px range.
- The 320px document and inspected hero/card descendants are overflow-free.
- The summary exists at the requested path and remains uncommitted.

