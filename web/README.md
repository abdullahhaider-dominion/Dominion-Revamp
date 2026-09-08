# Dominion Markets — Next.js

Next.js (App Router) port of the vanilla `mockups/` Floating Sanctuary homepage.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (utilities + theme; Preflight disabled to preserve mockup CSS)
- Lucide React (`src/components/icons.ts`)
- Inter, Montserrat, and Poppins via `next/font/google`

Montserrat (body) and Poppins (headings/CTAs) are the site-wide design fonts, loaded in the root layout and applied in `globals.css` so every page inherits them.

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- Markup is the original mockup HTML (SSR via `dangerouslySetInnerHTML`) for visual parity.
- Interactions come from the ported `mockups/main.js` (`src/lib/mockups-main.js`).
- Static assets live in `public/assets/` (copied from `mockups/assets/`).
- Hi-fi design archive: see [`.planning/phases/07-archive-mockups/07-ARCHIVE.md`](../.planning/phases/07-archive-mockups/07-ARCHIVE.md) (`archive/mockups` / sibling repo). Production site: this `web/` app.
