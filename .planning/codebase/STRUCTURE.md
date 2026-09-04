# Codebase Structure

**Analysis Date:** 2026-09-05

## Directory Layout

```
Vanilla to nextjs/
├── web/                          # PRODUCTION Next.js app (App Router)
│   ├── public/                   # Static files served at /
│   │   ├── mockups.css           # Floating Sanctuary CSS (static link)
│   │   └── assets/               # Images/logos (copied from mockups/assets)
│   ├── src/
│   │   ├── app/                  # Routes + root layout + globals.css
│   │   ├── components/           # React UI (hero + page composer)
│   │   ├── content/              # HTML string modules (home-html)
│   │   ├── lib/                  # Ported vanilla JS init
│   │   ├── styles/               # Component CSS (+ mockups.css mirror)
│   │   └── types/                # Ambient TS (window flags)
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json             # `@/*` → `./src/*`
├── mockups/                      # LEGACY/DESIGN hi-fi vanilla source of truth
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   ├── assets/
│   └── concepts/                 # Optional A/B/C concept exports
├── wireframes/                   # LEGACY/DESIGN IA wireframes + check script
├── docs/                         # Brand guidelines + design specs/plans
│   ├── brand/
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── .cursor/skills/               # Agent skill: dominion-section-redesign
├── .planning/codebase/           # GSD codebase maps (this folder)
├── Hero-background.png           # Root-level hero asset (repo root)
└── readme.md                     # Points to mockups/ + web/
```

## Directory Purposes

**`web/` (production Next.js):**
- Purpose: Runnable Dominion Markets homepage port
- Contains: Next 16 app, React 19, TypeScript, Tailwind v4 config, `node_modules`, `.next` build output
- Key files: `web/package.json`, `web/next.config.ts`, `web/README.md`, `web/src/app/page.tsx`
- Subdirectories: `src/`, `public/`; do not treat sibling repo folders as part of the Next project root

**`web/src/app/`:**
- Purpose: App Router entrypoints
- Contains: `layout.tsx`, `page.tsx`, `globals.css`
- Key files: `web/src/app/layout.tsx` (fonts/metadata/CSS link), `web/src/app/page.tsx` (home route)
- Subdirectories: None (single `/` route; no nested routes or `api/`)

**`web/src/components/`:**
- Purpose: React components for the live site
- Contains: Client components and icon re-exports
- Key files: `DominionHome.tsx`, `CinematicHero.tsx`, `icons.ts`
- Subdirectories: None (flat)

**`web/src/content/`:**
- Purpose: Large static content payloads used by React
- Contains: Generated HTML string module(s)
- Key files: `home-html.ts` (`homeHtml` — post-hero sections: proof → final-cta)
- Subdirectories: None

**`web/src/lib/`:**
- Purpose: Non-React libraries / ported scripts
- Contains: ES module wrapping vanilla mockup behavior
- Key files: `mockups-main.js` (`initDominionMockups`)
- Subdirectories: None

**`web/src/styles/`:**
- Purpose: Stylesheets imported by components or kept as mirrors
- Contains: `cinematic-hero.css`, `mockups.css` (mirror of public stylesheet)
- Key files: `web/src/styles/cinematic-hero.css` (imported by hero)
- Subdirectories: None
- Note: Runtime mockup CSS for the page is served from `web/public/mockups.css`, not via PostCSS

**`web/src/types/`:**
- Purpose: Ambient TypeScript declarations
- Contains: `dominion.d.ts` (`Window.__dominionMockupsInit`)
- Key files: `web/src/types/dominion.d.ts`

**`web/public/`:**
- Purpose: Files served verbatim at site root
- Contains: `mockups.css`, `assets/**`
- Key files: `web/public/mockups.css`
- Subdirectories: `assets/` with section folders (`logo/`, `hero/`, `payments/`, `platforms/`, `sessions/`, `dashboard/`, `blogs/`, `footer/`, etc.)

**`mockups/` (legacy / design — not the Next app):**
- Purpose: Floating Sanctuary hi-fi HTML/CSS/JS source of truth for section redesign
- Contains: Standalone site previewable with `npx serve mockups`
- Key files: `mockups/index.html`, `mockups/styles.css`, `mockups/main.js`, `mockups/README.md`, `mockups/VERSION`
- Subdirectories: `assets/` (canonical media), `concepts/` (design option images)

**`wireframes/` (legacy / design):**
- Purpose: Homepage information architecture before glass/hi-fi
- Contains: `index.html`, `styles.css`, `wireframe-check.mjs`, `README.md`
- Key files: `wireframes/wireframe-check.mjs` (structure validation)
- Subdirectories: None

**`docs/` (design documentation):**
- Purpose: Brand and Floating Sanctuary written specs
- Contains: Markdown guidelines and dated plans/specs
- Key files: `docs/brand/Dominion_Markets_Brand_Guidelines.md`, `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md`, `docs/superpowers/plans/2026-08-07-dominion-markets-wireframes.md`
- Subdirectories: `brand/`, `superpowers/specs/`, `superpowers/plans/`

**`.cursor/skills/dominion-section-redesign/`:**
- Purpose: Agent workflow for redesigning sections into Floating Sanctuary (targets `mockups/`)
- Contains: `SKILL.md`
- Key files: `.cursor/skills/dominion-section-redesign/SKILL.md`

**`.planning/`:**
- Purpose: GSD planning artifacts
- Contains: `codebase/` maps (`ARCHITECTURE.md`, `STRUCTURE.md`, etc.)
- Key files: `.planning/codebase/*.md`

## Key File Locations

**Entry Points:**
- `web/src/app/page.tsx` — Next.js `/` route
- `web/src/app/layout.tsx` — Document shell
- `web/src/components/DominionHome.tsx` — Hybrid page composer
- `mockups/index.html` — Standalone hi-fi preview entry
- `wireframes/index.html` — Wireframe preview entry

**Configuration:**
- `web/package.json` — Scripts (`dev`, `build`, `start`, `lint`) and dependencies
- `web/next.config.ts` — Strict Mode off, image remotePatterns
- `web/tsconfig.json` — Path alias `@/*` → `./src/*`
- `web/postcss.config.mjs` — Tailwind PostCSS plugin
- `web/eslint.config.mjs` — ESLint flat config
- `web/.gitignore` — Ignores `.next/`, `node_modules/`, `.env*`

**Core Logic:**
- `web/src/components/CinematicHero.tsx` — React hero + nav
- `web/src/content/home-html.ts` — Injected body sections HTML
- `web/src/lib/mockups-main.js` — Section interactivity (marquees, quotes, sessions, dashboard, etc.)
- `web/src/styles/cinematic-hero.css` — Hero visual system
- `web/public/mockups.css` — Body section Floating Sanctuary CSS
- `mockups/main.js` / `mockups/styles.css` — Design-source counterparts

**Testing:**
- Not detected in `web/` (no `*.test.*` / `*.spec.*` or test runner config)
- `wireframes/wireframe-check.mjs` — Design-structure check only (not unit tests)

**Documentation:**
- `readme.md` — Repo overview (mockups vs web)
- `web/README.md` — Next stack and port notes
- `mockups/README.md` — Hi-fi preview instructions
- `wireframes/README.md` — Wireframe preview + check
- `docs/brand/Dominion_Markets_Brand_Guidelines.md` — Brand tokens/voice
- `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md` — Design contract

## Naming Conventions

**Files:**
- PascalCase `.tsx` for React components: `CinematicHero.tsx`, `DominionHome.tsx`
- kebab-case for CSS modules/stylesheets: `cinematic-hero.css`, `mockups.css`, `globals.css`
- kebab-case for content/lib modules: `home-html.ts`, `mockups-main.js`
- lowercase App Router specials: `layout.tsx`, `page.tsx`
- UPPERCASE / Title docs at repo level: `readme.md`, brand Markdown titles under `docs/`

**Directories:**
- kebab-case section asset folders: `web/public/assets/trade-better/`, `how-start/`, `mt5-sim/`
- Plural collection folders: `components/`, `assets/`, `concepts/`
- App Router reserved: `web/src/app/`

**Special Patterns:**
- Path alias imports: `@/components/...`, `@/content/...`, `@/lib/...`, `@/styles/...`
- BEM-like class names in mockup HTML/CSS: `proof__item`, `awards__layout`, `hero-card__badge--green`
- Section `id` anchors shared by nav and vanilla JS: `proof`, `sessions`, `markets`, `quotes`, `funding`, `accounts`, `platforms`, `dashboard`, `trust`, `final-cta`, etc.
- Init guard: `window.__dominionMockupsInit`

## Where to Add New Code

**New homepage section (production Next path):**
- Prefer React component under `web/src/components/` if building like the cinematic hero
- Or append markup into `web/src/content/home-html.ts` and behavior into `web/src/lib/mockups-main.js`, styles into `web/public/mockups.css` (and keep `mockups/` in sync)
- Assets: `web/public/assets/<section-name>/`
- Tests: Not established — add co-located `*.test.tsx` under `web/src/` only if a runner is introduced later

**New homepage section (design-first Floating Sanctuary workflow):**
- Primary code: `mockups/index.html`, `mockups/styles.css`, `mockups/main.js`
- Concepts: `mockups/concepts/`
- Then port into `web/` as above
- Follow `.cursor/skills/dominion-section-redesign/SKILL.md`

**New React component / module:**
- Implementation: `web/src/components/YourComponent.tsx`
- Dedicated CSS (if hero-scale): `web/src/styles/your-feature.css`
- Shared icons: extend `web/src/components/icons.ts`

**New route:**
- Definition: `web/src/app/<route>/page.tsx` (App Router convention)
- Shared chrome: reuse/export pieces from `components/` rather than duplicating hero markup

**Utilities:**
- Shared helpers: `web/src/lib/`
- Type definitions: `web/src/types/`

**Brand/spec updates:**
- Brand: `docs/brand/`
- Design specs/plans: `docs/superpowers/specs/`, `docs/superpowers/plans/`

## Special Directories

**`web/.next/`:**
- Purpose: Next.js build/dev output
- Source: Generated by `next dev` / `next build`
- Committed: No (listed in `web/.gitignore`)

**`web/node_modules/`:**
- Purpose: npm dependencies
- Source: `npm install` in `web/`
- Committed: No

**`web/public/assets/`:**
- Purpose: Runtime static media for the Next site
- Source: Copied/mirrored from `mockups/assets/`
- Committed: Yes

**`mockups/assets/`:**
- Purpose: Canonical design media for hi-fi mockup
- Source: Design work
- Committed: Yes

**`mockups/concepts/`:**
- Purpose: Optional concept image exports during redesign
- Source: Design option generation
- Committed: Yes (when present)

**`wireframes/`:**
- Purpose: Pre-hi-fi structure; not served by Next
- Source: Manual HTML wireframes
- Committed: Yes

**`.planning/codebase/`:**
- Purpose: Architecture/structure maps for GSD planning
- Source: `/gsd-map-codebase` mappers
- Committed: Yes (when tracked)

---

*Structure analysis: 2026-09-05*
*Update when directory structure changes*
