# Technology Stack

**Analysis Date:** 2026-09-05

## Languages

**Primary:**
- TypeScript 5.9.x (`typescript` ^5 in `web/package.json`; resolved 5.9.3) — App Router pages, React components, content modules under `web/src/`
- TSX / React — UI in `web/src/app/`, `web/src/components/`

**Secondary:**
- JavaScript (plain ES modules) — Ported mockup interactions in `web/src/lib/mockups-main.js` (from `mockups/main.js`); vanilla hi-fi source in `mockups/main.js`
- CSS — Design system and section styles in `web/src/styles/mockups.css`, `web/public/mockups.css`, `web/src/styles/cinematic-hero.css`, `web/src/app/globals.css`; source of truth also in `mockups/styles.css`
- HTML — Vanilla mockup markup in `mockups/index.html`; production body sections embedded as an HTML string in `web/src/content/home-html.ts`
- Markdown — Brand and design docs under `docs/` (not runtime)

## Runtime

**Environment:**
- Node.js ≥ 20.9.0 (required by `next@16.3.4` `engines`)
- Observed local: Node v24.13.1, npm 11.12.1
- Browser runtime for client components (`"use client"` in `web/src/components/DominionHome.tsx`, `web/src/components/CinematicHero.tsx`) and dynamic import of `web/src/lib/mockups-main.js`

**Package Manager:**
- npm (scripts and lockfile under `web/`)
- Lockfile: `web/package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 16.3.4 — App Router production app in `web/` (`web/src/app/layout.tsx`, `web/src/app/page.tsx`)
- React 19.2.8 / react-dom 19.2.8 — UI rendering
- Tailwind CSS v4.3.x (`tailwindcss` ^4; resolved 4.3.3) via `@tailwindcss/postcss` — theme tokens and utilities in `web/src/app/globals.css` (Preflight not imported; mockup CSS preserved)

**Testing:**
- Not detected — no Jest/Vitest/Playwright configs or `*.test.*` / `*.spec.*` suites in `web/`

**Build/Dev:**
- Next.js CLI — `npm run dev` / `build` / `start` in `web/package.json`
- TypeScript (strict) — `web/tsconfig.json` (`strict: true`, path alias `@/*` → `./src/*`)
- ESLint 9.x + `eslint-config-next` 16.3.4 — `web/eslint.config.mjs` (core-web-vitals + TypeScript presets)
- PostCSS — `web/postcss.config.mjs` loads `@tailwindcss/postcss`

## Key Dependencies

**Critical:**
- `next` 16.3.4 — SSR/App Router, `next/image`, `next/font/google`
- `react` / `react-dom` 19.2.8 — component model
- `lucide-react` ^1.39.0 (resolved 1.39.0) — icons in `web/src/components/CinematicHero.tsx`, re-exports in `web/src/components/icons.ts`

**Infrastructure:**
- `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19 — TypeScript typings
- No database, ORM, auth, or HTTP client packages in `web/package.json`

## Configuration

**Environment:**
- No `.env` / `.env.*` files present at repo root or under `web/` (`.env*` ignored via `web/.gitignore`)
- No required runtime env vars for current static/marketing homepage
- App behavior is config-file driven, not secret-driven

**Build:**
- `web/next.config.ts` — `reactStrictMode: false` (mockup DOM init compatibility); `images.remotePatterns` for `i.pravatar.cc` and `images.unsplash.com`
- `web/tsconfig.json` — ES2017 target, bundler module resolution, Next plugin
- `web/eslint.config.mjs` — lint entry via `npm run lint`
- `web/postcss.config.mjs` — Tailwind v4 PostCSS plugin
- `web/next-env.d.ts` — Next-generated types
- `web/src/types/dominion.d.ts` — `Window.__dominionMockupsInit` global for mockup init guard

## Platform Requirements

**Development:**
- macOS / Linux / Windows with Node ≥ 20.9.0
- Work from `web/`: `npm install` then `npm run dev` (see `readme.md`, `web/README.md`)
- Design source of truth remains `mockups/` (vanilla HTML/CSS/JS); brand docs in `docs/brand/`, design specs in `docs/superpowers/`
- Supporting assets: repo-root `Hero-background.png`, `wireframes/`, `docs/`, `mockups/` (not the Next runtime)

**Production:**
- Standard Next.js Node server (`next start`) or any Next-compatible host
- `.vercel` listed in `web/.gitignore` — Vercel-compatible layout implied; no committed `vercel.json` or CI workflows detected
- Static assets served from `web/public/` (especially `web/public/assets/`, `web/public/mockups.css`)
- No Docker / compose deployment configs detected

---

*Stack analysis: 2026-09-05*
