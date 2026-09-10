---
quick_task: 260910-legal
status: complete
completed: 2026-09-10
---

# Legal Documents — Summary

Built a production `/legal-documents` route as Floating Sanctuary desktop B
(mist-split story + glass library) and mobile 1 (stacked groups). All nine
live policy PDFs are hosted locally and open in a new tab.

## Delivered

- Light mountain banner with breadcrumb only.
- Sticky left story: Policies eyebrow, Legal Documents H1, live lead, Contact us.
- Right milky-glass library grouped as Client relationship, Trading, Funding, Compliance.
- Stacked mobile list with every PDF visible — no chips or accordions.
- Footer `Legal Documents` now points at `/legal-documents`.
- Nine PDF copies under `web/public/legal/`.

## Verification

- Desktop 1440: split layout, no horizontal overflow.
- Mobile 390 and 320: stacked, no overflow.
- Privacy Policy row opens `/legal/privacy-policy.pdf` (`application/pdf`).
- Story Contact us goes to `/contact`.
- Footer Legal Documents href is `/legal-documents`.
