---
quick_task: 260910-legal
phase: quick-260910-legal
plan: 01
type: execute
wave: 1
depends_on: []
autonomous: true
files_modified:
  - web/src/app/legal-documents/page.tsx
  - web/src/components/legal/LegalPage.tsx
  - web/src/content/legal-documents.ts
  - web/src/styles/legal.css
  - web/src/content/shared-footer-html.ts
  - web/public/legal/
must_haves:
  truths:
    - "A visitor can open /legal-documents and see all nine live policies grouped as Client relationship, Trading, Funding, and Compliance."
    - "Each row opens the hosted PDF copy of the live dominionmarkets.com file."
    - "Desktop is mist-split (story left, glass library right); mobile stacks story then the same list."
    - "SiteNav and SiteFooter stay shared; footer Legal Documents points at /legal-documents."
    - "Poppins/Montserrat, #1D3347, and #47BD68 are reused with no new dependencies."
  artifacts:
    - path: "web/src/app/legal-documents/page.tsx"
      provides: "Dedicated /legal-documents route and metadata"
    - path: "web/src/components/legal/LegalPage.tsx"
      provides: "Semantic page: light banner, split library, closer"
    - path: "web/src/content/legal-documents.ts"
      provides: "Grouped policy list and local PDF hrefs"
    - path: "web/src/styles/legal.css"
      provides: "Route-scoped Floating Sanctuary styles"
    - path: "web/public/legal/"
      provides: "Nine policy PDFs copied from the live site"
---

<objective>
Build a production Legal Documents page at `/legal-documents` using locked desktop B and mobile 1.
</objective>

<locked_decisions>
- D-01: Desktop B — left story + right milky-glass grouped library.
- D-02: Mobile 1 — stacked groups, all nine PDFs visible, no chips or accordions.
- D-03: Use the nine live PDF filenames; host copies under `web/public/legal/`.
- D-04: Footer `#legal` → `/legal-documents`. Do not add a top-nav item.
- D-05: Contact CTA goes to `/contact`. Reuse SiteNav / SiteFooter.
</locked_decisions>
