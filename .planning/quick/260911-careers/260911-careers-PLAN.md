---
quick_task: 260911-careers
phase: quick-260911-careers
plan: 01
type: execute
wave: 1
depends_on: []
autonomous: true
files_modified:
  - web/src/app/careers/page.tsx
  - web/src/components/careers/CareersPage.tsx
  - web/src/components/careers/CareersApply.tsx
  - web/src/content/careers.ts
  - web/src/styles/careers.css
  - web/src/content/shared-footer-html.ts
must_haves:
  truths:
    - "A visitor can open /careers and choose one application path, then send name, email, and a CV."
    - "Paths are Markets, Platform, Partnerships, and Operations — not a fake job board."
    - "Desktop is a four-tile pathway row plus an apply dock; mobile is a 2x2 grid then the same form."
    - "Footer Careers points at /careers. SiteNav and SiteFooter stay shared."
    - "Poppins/Montserrat, #1D3347, and #47BD68 are reused with no new dependencies."
---

<objective>
Build a production Careers page at `/careers` using locked desktop C and mobile 1.
</objective>

<locked_decisions>
- D-01: Desktop C — four path tiles, then an apply dock bound to the selected path.
- D-02: Mobile 1 — 2x2 tiles, form always visible underneath.
- D-03: Live fields only: full name, email, CV. Submit via formsubmit.co/careers@dominionmarkets.com.
- D-04: Footer `#careers` → `/careers`. Do not add a top-nav item.
- D-05: Reuse SiteNav / SiteFooter and the light Accounts mountain banner.
</locked_decisions>
