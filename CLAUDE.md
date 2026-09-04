<!-- GSD:project-start source:PROJECT.md -->
## Project

**Dominion Markets — Production Cleanup**

Dominion Markets’ marketing website, recently ported from vanilla HTML/CSS/JS into a Next.js App Router app under `web/`. The live experience is a hybrid: a React cinematic hero plus a large vanilla body still shipped as an HTML string, shared CSS, and ported scripts. This milestone makes that repo production-ready by removing unused weight safely and retiring the legacy mockup tree from the app repo after archive.

**Core Value:** Ship a clean production Next.js site that keeps every asset and behavior the live site actually uses — never delete something still referenced.

### Constraints

- **Safety**: Delete only what static analysis proves unused against `web/src` + served CSS — no guess deletes
- **Parity**: Live site look/behavior must not regress for remaining sections
- **Stack**: Stay on Next.js App Router in `web/` (React 19, Tailwind v4, TypeScript) — no framework migration
- **Mockups retirement**: Archive out-of-repo (or dedicated branch) *before* deleting `mockups/` from this repo
- **React scope**: Minimal — only as needed to unlock deletions, not a full componentization program
- **Git**: Prefer committing planning docs; production tree should include the real `web/` app
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.9.x (`typescript` ^5 in `web/package.json`; resolved 5.9.3) — App Router pages, React components, content modules under `web/src/`
- TSX / React — UI in `web/src/app/`, `web/src/components/`
- JavaScript (plain ES modules) — Ported mockup interactions in `web/src/lib/mockups-main.js` (from `mockups/main.js`); vanilla hi-fi source in `mockups/main.js`
- CSS — Design system and section styles in `web/src/styles/mockups.css`, `web/public/mockups.css`, `web/src/styles/cinematic-hero.css`, `web/src/app/globals.css`; source of truth also in `mockups/styles.css`
- HTML — Vanilla mockup markup in `mockups/index.html`; production body sections embedded as an HTML string in `web/src/content/home-html.ts`
- Markdown — Brand and design docs under `docs/` (not runtime)
## Runtime
- Node.js ≥ 20.9.0 (required by `next@16.3.4` `engines`)
- Observed local: Node v24.13.1, npm 11.12.1
- Browser runtime for client components (`"use client"` in `web/src/components/DominionHome.tsx`, `web/src/components/CinematicHero.tsx`) and dynamic import of `web/src/lib/mockups-main.js`
- npm (scripts and lockfile under `web/`)
- Lockfile: `web/package-lock.json` present (lockfileVersion 3)
## Frameworks
- Next.js 16.3.4 — App Router production app in `web/` (`web/src/app/layout.tsx`, `web/src/app/page.tsx`)
- React 19.2.8 / react-dom 19.2.8 — UI rendering
- Tailwind CSS v4.3.x (`tailwindcss` ^4; resolved 4.3.3) via `@tailwindcss/postcss` — theme tokens and utilities in `web/src/app/globals.css` (Preflight not imported; mockup CSS preserved)
- Not detected — no Jest/Vitest/Playwright configs or `*.test.*` / `*.spec.*` suites in `web/`
- Next.js CLI — `npm run dev` / `build` / `start` in `web/package.json`
- TypeScript (strict) — `web/tsconfig.json` (`strict: true`, path alias `@/*` → `./src/*`)
- ESLint 9.x + `eslint-config-next` 16.3.4 — `web/eslint.config.mjs` (core-web-vitals + TypeScript presets)
- PostCSS — `web/postcss.config.mjs` loads `@tailwindcss/postcss`
## Key Dependencies
- `next` 16.3.4 — SSR/App Router, `next/image`, `next/font/google`
- `react` / `react-dom` 19.2.8 — component model
- `lucide-react` ^1.39.0 (resolved 1.39.0) — icons in `web/src/components/CinematicHero.tsx`, re-exports in `web/src/components/icons.ts`
- `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19 — TypeScript typings
- No database, ORM, auth, or HTTP client packages in `web/package.json`
## Configuration
- No `.env` / `.env.*` files present at repo root or under `web/` (`.env*` ignored via `web/.gitignore`)
- No required runtime env vars for current static/marketing homepage
- App behavior is config-file driven, not secret-driven
- `web/next.config.ts` — `reactStrictMode: false` (mockup DOM init compatibility); `images.remotePatterns` for `i.pravatar.cc` and `images.unsplash.com`
- `web/tsconfig.json` — ES2017 target, bundler module resolution, Next plugin
- `web/eslint.config.mjs` — lint entry via `npm run lint`
- `web/postcss.config.mjs` — Tailwind v4 PostCSS plugin
- `web/next-env.d.ts` — Next-generated types
- `web/src/types/dominion.d.ts` — `Window.__dominionMockupsInit` global for mockup init guard
## Platform Requirements
- macOS / Linux / Windows with Node ≥ 20.9.0
- Work from `web/`: `npm install` then `npm run dev` (see `readme.md`, `web/README.md`)
- Design source of truth remains `mockups/` (vanilla HTML/CSS/JS); brand docs in `docs/brand/`, design specs in `docs/superpowers/`
- Supporting assets: repo-root `Hero-background.png`, `wireframes/`, `docs/`, `mockups/` (not the Next runtime)
- Standard Next.js Node server (`next start`) or any Next-compatible host
- `.vercel` listed in `web/.gitignore` — Vercel-compatible layout implied; no committed `vercel.json` or CI workflows detected
- Static assets served from `web/public/` (especially `web/public/assets/`, `web/public/mockups.css`)
- No Docker / compose deployment configs detected
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase `.tsx` — `CinematicHero.tsx`, `DominionHome.tsx`
- App Router routes: lowercase Next.js names — `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
- Content / data modules: kebab-case `.ts` — `content/home-html.ts`
- Styles: kebab-case `.css` — `styles/cinematic-hero.css`, `styles/mockups.css`
- Legacy/vanilla behavior ports: kebab-case `.js` — `lib/mockups-main.js`
- Ambient types: kebab-case `.d.ts` — `types/dominion.d.ts`
- Icon re-exports: lowercase `.ts` — `components/icons.ts`
- No test files present (`*.test.*` / `*.spec.*` not used yet)
- camelCase for all functions (`closeMenus`, `initDominionMockups`, `drawLineChart`)
- No `async` naming prefix
- Event helpers: short verbs (`closeMenus`, `onScroll`, `onKey`) or inline `onClick={() => ...}` — prefer named helpers when reused
- React components: PascalCase function components (`export function CinematicHero`)
- camelCase for locals and React state (`open`, `scrolled`, `navShown`, `openMenu`)
- UPPER_SNAKE for module-level constant arrays/objects (`NAV`, `AWARDS`)
- Refs: camelCase (`lastY`, `ticking`)
- CSS custom properties: `--dm-*` / `--font-*` / `--color-*` (see `styles/cinematic-hero.css`, `app/globals.css`)
- Inline prop object types on function parameters (no separate `Props` interface files yet) — see `InsightCard` in `components/CinematicHero.tsx`
- `import type` for type-only imports (`import type { Metadata } from "next"`)
- Ambient globals via `declare global` in `types/dominion.d.ts` (e.g. `Window.__dominionMockupsInit`)
- No `I`-prefix interfaces; no enums in current source
## Code Style
- No Prettier config in `web/` — match existing files by hand
- Double quotes for strings
- Semicolons required
- 2-space indentation
- Trailing commas in multi-line arrays/objects/imports
- `as const` on static config arrays (`NAV`, `AWARDS`)
- ESLint flat config: `web/eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Run from `web/`: `npm run lint`
- TypeScript: `strict: true` in `web/tsconfig.json`
- Interactive UI: mark with `"use client"` at file top (`DominionHome.tsx`, `CinematicHero.tsx`)
- Route shells stay Server Components by default (`app/page.tsx`, `app/layout.tsx`)
- `reactStrictMode: false` in `next.config.ts` — required for one-shot vanilla mockup init; do not re-enable without fixing `lib/mockups-main.js` re-entrancy
## Import Organization
- Blank line between directive / groups
- Multi-line named imports for lucide icons
- Prefer `@/` over deep relative paths for anything under `src/`
- `@/*` → `./src/*` (`web/tsconfig.json`)
- Use `@/components/DominionHome`, `@/content/home-html`, `@/lib/mockups-main.js`, `@/styles/cinematic-hero.css`
## Error Handling
- Guard clauses / early returns — primary pattern in `lib/mockups-main.js` (`if (!nav) return`, `if (!canvas) return`)
- Async client load: cancellation flag, not try/catch — `DominionHome.tsx` sets `cancelled` and bails after dynamic `import()`
- Idempotent init: `window.__dominionMockupsInit` prevents double-binding listeners
- No custom Error subclasses in current codebase
- No Result/Either types
- Prefer silent no-op when DOM nodes are missing (vanilla parity behavior)
- Do not throw from mockup section initializers for missing optional elements
- When adding API/server code later: catch at route/action boundaries; keep UI components free of raw fetch error sprawl
## Logging
- Not used in React/TS app code — no shared logger package
- Avoid new `console.log` in committed `web/src` components
- Prefer comments that explain non-obvious constraints (e.g. Strict Mode / CSS overflow notes) over runtime logs
- Debug temporarily in local only; strip before commit
## Comments
- Explain *why* (constraints, framework quirks, design parity) — e.g. Strict Mode note in `next.config.ts`, Tailwind/PostCSS note in `layout.tsx`, hydration note on `dangerouslySetInnerHTML` in `DominionHome.tsx`
- Section banners in CSS (`/* —— Atmosphere —— */`) and vanilla JS (`/* Sticky nav state */`)
- Avoid narrating obvious JSX
- Light file-level notes where useful (`components/icons.ts`)
- Not required on every export; keep signatures self-explanatory
- None established in `web/src` — if adding, use `// TODO: description` and link an issue when one exists
## CSS & Markup Conventions
- BEM-style blocks: `block__element--modifier` (`dm-nav__link`, `hero-card__badge--green`)
- State classes: `is-scrolled`, `is-open`, `is-hidden`, `is-visible`
- Brand prefixes: `dm-` for Dominion chrome; `hero-` for cinematic hero; section classes from mockup (`proof`, `marquee`, etc.)
- Prefer CSS variables on `.hero-root` / `@theme` (`--dm-navy`, `--dm-green`, `--color-navy`)
- Brand greens/navy hex must match Floating Sanctuary (`#1D3347`, `#47BD68`) — see `.cursor/skills/dominion-section-redesign/SKILL.md`
- Icons: Lucide React with explicit `size` / `strokeWidth` / `aria-hidden="true"` for decorative icons
- Provide `aria-label` on landmark navs and icon-only buttons
- Use `aria-expanded` / `aria-controls` / `role="menu"` where menus exist
- Decorative SVGs: `aria-hidden="true"`
- Remaining homepage sections live as a string export in `content/home-html.ts` (`homeHtml`)
- Inject via `dangerouslySetInnerHTML` with `suppressHydrationWarning` on the wrapper
- Behavior attaches via dynamic import of `initDominionMockups` from `lib/mockups-main.js`
## Function Design
- Keep route entry points thin (`page.tsx` only composes)
- Extract presentational subcomponents in the same file when local (`Spark`, `InsightCard`, `AwardsRow` inside `CinematicHero.tsx`)
- Prefer extracting a new file when a subcomponent is reused across routes/sections
- Destructure props in the signature
- Optional props with `?` (`compact?: boolean`)
- Avoid long prop lists without grouping when adding new cards — consider a typed config object
- Explicit JSX returns
- Early return cleanup functions from `useEffect`
- Dynamic import: `void import(...).then(...)` when fire-and-forget with cancel guard
## Module Design
- Named exports for reusable components and helpers (`export function DominionHome`, `export function CinematicHero`, `export function initDominionMockups`)
- Default exports only for Next.js App Router files (`export default function Home`, `export default function RootLayout`) and the dual default on mockup init
- Re-export lucide icons from `components/icons.ts` when centralizing icon usage
- Not used — import from concrete files (`@/components/DominionHome`)
- Do not add barrels that re-export huge HTML strings or CSS side effects
- Static HTML blobs → `src/content/`
- Interactive React → `src/components/`
- Ported vanilla scripts → `src/lib/`
- Global/app chrome → `src/app/`
- Ambient types → `src/types/`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
```
## Component Responsibilities
| Component | Responsibility | File |
|-----------|----------------|------|
| Root layout | Fonts (Inter/Montserrat/Poppins), metadata, Tailwind theme + link to mockup CSS | `web/src/app/layout.tsx` |
| Home route | Thin App Router page; renders composer | `web/src/app/page.tsx` |
| DominionHome | Composes React hero + injected HTML; dynamically loads vanilla JS once | `web/src/components/DominionHome.tsx` |
| CinematicHero | Production-path React hero + sticky chrome/nav (client state) | `web/src/components/CinematicHero.tsx` |
| homeHtml | Auto-generated HTML string of post-hero sections (proof → footer) | `web/src/content/home-html.ts` |
| mockups-main | Ported vanilla interactions (marquees, sessions, quotes, charts, carousels) | `web/src/lib/mockups-main.js` |
| icons barrel | Re-exports Lucide icons for future componentization | `web/src/components/icons.ts` |
| Window typing | Guard flag `__dominionMockupsInit` for one-shot JS init | `web/src/types/dominion.d.ts` |
| Vanilla mockup | Design-source HTML/CSS/JS (Floating Sanctuary hi-fi) | `mockups/index.html`, `mockups/styles.css`, `mockups/main.js` |
| Wireframes | IA / structure checkpoint before hi-fi | `wireframes/index.html` |
| Brand/spec docs | Brand tokens + Floating Sanctuary design contract | `docs/brand/`, `docs/superpowers/specs/` |
## Pattern Overview
- Single-route homepage (`/`) with no API routes, auth, or database layer
- Dual UI stacks on one page: React (`CinematicHero`) above; BEM-style mockup HTML below via `dangerouslySetInnerHTML`
- Design source of truth remains `mockups/`; `web/` is the Next.js port with assets copied into `web/public/`
- Client-only interactivity for body sections via dynamic `import("@/lib/mockups-main.js")`
- `reactStrictMode: false` in `web/next.config.ts` so vanilla one-shot listeners are not broken by remounts
- Demo/mock data only (canvas charts, quote ticks); no live market APIs wired
## Layers
- Purpose: Document shell, fonts, global CSS variables, page entry
- Location: `web/src/app/`
- Contains: `layout.tsx`, `page.tsx`, `globals.css`
- Depends on: Next.js fonts, Tailwind v4 theme/utilities (Preflight not imported)
- Used by: Browser HTTP requests to `/`
- Purpose: Interactive React UI that owns the first viewport
- Location: `web/src/components/`
- Contains: `DominionHome.tsx`, `CinematicHero.tsx`, `icons.ts`
- Depends on: `content/home-html`, `lib/mockups-main.js`, `styles/cinematic-hero.css`, `lucide-react`, `next/image`
- Used by: `web/src/app/page.tsx`
- Purpose: Hold mockup body markup as a string for 1:1 visual parity
- Location: `web/src/content/home-html.ts`
- Contains: Exported `homeHtml` (generated from `mockups/index.html` with hero/nav stripped)
- Depends on: None at runtime
- Used by: `DominionHome` via `dangerouslySetInnerHTML`
- Purpose: Attach DOM listeners and demo animations to injected markup
- Location: `web/src/lib/mockups-main.js`
- Contains: `initDominionMockups()` wrapping ported `mockups/main.js` logic
- Depends on: Browser DOM, `window.__dominionMockupsInit` guard
- Used by: `DominionHome` `useEffect` (dynamic import)
- Purpose: Brand theme + section CSS without Tailwind Preflight rewriting mockup rules
- Location: `web/src/app/globals.css`, `web/src/styles/cinematic-hero.css`, `web/public/mockups.css` (and mirror `web/src/styles/mockups.css`)
- Contains: CSS variables (`--color-navy`, `--dm-*`), cinematic hero rules, full Floating Sanctuary stylesheet served as a static link
- Depends on: Font CSS variables from layout
- Used by: Layout (`globals.css` + `<link href="/mockups.css">`) and `CinematicHero` (CSS import)
- Purpose: Images, logos, payment marks, section backgrounds
- Location: `web/public/assets/` (runtime); source originals in `mockups/assets/`
- Contains: Section-scoped folders (`hero/`, `logo/`, `payments/`, etc.)
- Depends on: None
- Used by: Injected HTML `src="/assets/..."`, `next/image` in hero
- Purpose: Wireframes → hi-fi mockups → brand/spec documentation
- Location: `wireframes/`, `mockups/`, `docs/`
- Contains: Standalone HTML/CSS/JS and Markdown specs
- Depends on: Local static servers (`npx serve`) for preview
- Used by: Design workflow (`.cursor/skills/dominion-section-redesign/`); feeds content into `web/`
## Data Flow
### Primary request path (homepage)
### Hero interaction flow
### Design-to-Next port flow (offline / authoring)
- React local state only in `CinematicHero` (nav/menu/scroll); no global store, Context, or server state
- Body sections: DOM class toggles and closures inside `mockups-main.js`; guarded by `window.__dominionMockupsInit`
- No persistence, cookies, or backend session
## Key Abstractions
- Purpose: Single client component that owns the hybrid render strategy
- Examples: `web/src/components/DominionHome.tsx`
- Pattern: Composition root — React child + HTML string + deferred script init
- Purpose: Treat large mockup markup as data, not JSX
- Examples: `web/src/content/home-html.ts` (`export const homeHtml`)
- Pattern: Generated string module (comment: auto-generated from `mockups/index.html`)
- Purpose: One-shot browser bootstrap for vanilla behaviors
- Examples: `initDominionMockups` in `web/src/lib/mockups-main.js`
- Pattern: Module export + `window.__dominionMockupsInit` singleton guard
- Purpose: Modern React replacement for mockup hero/nav while keeping body parity
- Examples: `web/src/components/CinematicHero.tsx`, `web/src/styles/cinematic-hero.css`
- Pattern: Client component + dedicated CSS (not Tailwind-only)
- Purpose: Dominion Navy / Market Green / mist shared across Tailwind theme and hero CSS
- Examples: `web/src/app/globals.css` `@theme`, `.hero-root` CSS variables in `cinematic-hero.css`, brand docs in `docs/brand/Dominion_Markets_Brand_Guidelines.md`
- Pattern: Parallel token definitions (CSS vars + Markdown guidelines)
## Entry Points
- Location: `web/src/app/page.tsx`
- Triggers: HTTP GET `/` via `npm run dev` / `npm run start` in `web/`
- Responsibilities: Render `DominionHome`
- Location: `web/src/app/layout.tsx`
- Triggers: Every App Router request
- Responsibilities: Metadata, fonts, global CSS, static link to mockup stylesheet
- Location: `mockups/index.html`
- Triggers: `npx serve mockups -p 4174` (per `mockups/README.md`)
- Responsibilities: Standalone Floating Sanctuary hi-fi (full page including original hero)
- Location: `wireframes/index.html`
- Triggers: `npx serve wireframes -p 4173`; structure check via `wireframes/wireframe-check.mjs`
- Responsibilities: IA / section skeleton before hi-fi styling
## Architectural Constraints
- **Threading:** Single-threaded browser event loop; timers/IO in `mockups-main.js` and React effects only
- **Global state:** `window.__dominionMockupsInit` in `web/src/types/dominion.d.ts` / `mockups-main.js`; React Strict Mode disabled (`web/next.config.ts`) to protect one-shot DOM wiring
- **Circular imports:** Not present; shallow tree `app` → `DominionHome` → `CinematicHero` | `home-html` | `mockups-main`
- **No backend:** No `app/api/`, no ORM, no env-driven services in the Next app
- **CSS isolation:** Mockup stylesheet loaded as a static `<link>` so Tailwind PostCSS does not rewrite it (`layout.tsx` comment)
- **Dual nav chrome:** React hero provides primary nav; injected HTML may still contain legacy nav-related ids that vanilla JS looks for — keep id contracts stable when editing HTML
## Anti-Patterns
### Treating injected HTML as React
### Re-initializing vanilla JS without the guard
### Editing Next styles as the design source of truth
### Enabling Tailwind Preflight
## Error Handling
- Guard early returns when DOM nodes missing (`if (!nav) return`, etc. in `mockups-main.js`)
- Video `play().catch(...)` swallow for autoplay policies
- Dynamic import cancellation flag in `DominionHome` (`cancelled`) to avoid setState-after-unmount style races
- No React error boundaries or route-level `error.tsx` detected
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| dominion-section-redesign | Redesign Dominion Markets website sections into Floating Sanctuary liquid-glass hi-fi mockups. Use when recreating old dominionmarkets.com sections, generating design options, mobile variants, or implementing glass UI in mockups/. | `.cursor/skills/dominion-section-redesign/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
