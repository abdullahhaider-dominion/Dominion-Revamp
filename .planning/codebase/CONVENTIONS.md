# Coding Conventions

**Analysis Date:** 2026-09-05

## Naming Patterns

**Files:**
- React components: PascalCase `.tsx` — `CinematicHero.tsx`, `DominionHome.tsx`
- App Router routes: lowercase Next.js names — `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
- Content / data modules: kebab-case `.ts` — `content/home-html.ts`
- Styles: kebab-case `.css` — `styles/cinematic-hero.css`, `styles/mockups.css`
- Legacy/vanilla behavior ports: kebab-case `.js` — `lib/mockups-main.js`
- Ambient types: kebab-case `.d.ts` — `types/dominion.d.ts`
- Icon re-exports: lowercase `.ts` — `components/icons.ts`
- No test files present (`*.test.*` / `*.spec.*` not used yet)

**Functions:**
- camelCase for all functions (`closeMenus`, `initDominionMockups`, `drawLineChart`)
- No `async` naming prefix
- Event helpers: short verbs (`closeMenus`, `onScroll`, `onKey`) or inline `onClick={() => ...}` — prefer named helpers when reused
- React components: PascalCase function components (`export function CinematicHero`)

**Variables:**
- camelCase for locals and React state (`open`, `scrolled`, `navShown`, `openMenu`)
- UPPER_SNAKE for module-level constant arrays/objects (`NAV`, `AWARDS`)
- Refs: camelCase (`lastY`, `ticking`)
- CSS custom properties: `--dm-*` / `--font-*` / `--color-*` (see `styles/cinematic-hero.css`, `app/globals.css`)

**Types:**
- Inline prop object types on function parameters (no separate `Props` interface files yet) — see `InsightCard` in `components/CinematicHero.tsx`
- `import type` for type-only imports (`import type { Metadata } from "next"`)
- Ambient globals via `declare global` in `types/dominion.d.ts` (e.g. `Window.__dominionMockupsInit`)
- No `I`-prefix interfaces; no enums in current source

## Code Style

**Formatting:**
- No Prettier config in `web/` — match existing files by hand
- Double quotes for strings
- Semicolons required
- 2-space indentation
- Trailing commas in multi-line arrays/objects/imports
- `as const` on static config arrays (`NAV`, `AWARDS`)

**Linting:**
- ESLint flat config: `web/eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Run from `web/`: `npm run lint`
- TypeScript: `strict: true` in `web/tsconfig.json`

**Client vs server:**
- Interactive UI: mark with `"use client"` at file top (`DominionHome.tsx`, `CinematicHero.tsx`)
- Route shells stay Server Components by default (`app/page.tsx`, `app/layout.tsx`)
- `reactStrictMode: false` in `next.config.ts` — required for one-shot vanilla mockup init; do not re-enable without fixing `lib/mockups-main.js` re-entrancy

## Import Organization

**Order (observed):**
1. `"use client"` directive (client files only)
2. Type-only imports (`import type { ... }`)
3. External packages (`next`, `next/font/google`, `next/image`, `react`, `lucide-react`)
4. Internal modules via `@/` (`@/components/...`, `@/content/...`, `@/lib/...`, `@/styles/...`)
5. Relative same-area assets (`./globals.css` in layout)

**Grouping:**
- Blank line between directive / groups
- Multi-line named imports for lucide icons
- Prefer `@/` over deep relative paths for anything under `src/`

**Path Aliases:**
- `@/*` → `./src/*` (`web/tsconfig.json`)
- Use `@/components/DominionHome`, `@/content/home-html`, `@/lib/mockups-main.js`, `@/styles/cinematic-hero.css`

## Error Handling

**Patterns:**
- Guard clauses / early returns — primary pattern in `lib/mockups-main.js` (`if (!nav) return`, `if (!canvas) return`)
- Async client load: cancellation flag, not try/catch — `DominionHome.tsx` sets `cancelled` and bails after dynamic `import()`
- Idempotent init: `window.__dominionMockupsInit` prevents double-binding listeners
- No custom Error subclasses in current codebase
- No Result/Either types

**Error Types:**
- Prefer silent no-op when DOM nodes are missing (vanilla parity behavior)
- Do not throw from mockup section initializers for missing optional elements
- When adding API/server code later: catch at route/action boundaries; keep UI components free of raw fetch error sprawl

## Logging

**Framework:**
- Not used in React/TS app code — no shared logger package
- Avoid new `console.log` in committed `web/src` components

**Patterns:**
- Prefer comments that explain non-obvious constraints (e.g. Strict Mode / CSS overflow notes) over runtime logs
- Debug temporarily in local only; strip before commit

## Comments

**When to Comment:**
- Explain *why* (constraints, framework quirks, design parity) — e.g. Strict Mode note in `next.config.ts`, Tailwind/PostCSS note in `layout.tsx`, hydration note on `dangerouslySetInnerHTML` in `DominionHome.tsx`
- Section banners in CSS (`/* —— Atmosphere —— */`) and vanilla JS (`/* Sticky nav state */`)
- Avoid narrating obvious JSX

**JSDoc/TSDoc:**
- Light file-level notes where useful (`components/icons.ts`)
- Not required on every export; keep signatures self-explanatory

**TODO Comments:**
- None established in `web/src` — if adding, use `// TODO: description` and link an issue when one exists

## CSS & Markup Conventions

**Class naming:**
- BEM-style blocks: `block__element--modifier` (`dm-nav__link`, `hero-card__badge--green`)
- State classes: `is-scrolled`, `is-open`, `is-hidden`, `is-visible`
- Brand prefixes: `dm-` for Dominion chrome; `hero-` for cinematic hero; section classes from mockup (`proof`, `marquee`, etc.)

**Design tokens:**
- Prefer CSS variables on `.hero-root` / `@theme` (`--dm-navy`, `--dm-green`, `--color-navy`)
- Brand greens/navy hex must match Floating Sanctuary (`#1D3347`, `#47BD68`) — see `.cursor/skills/dominion-section-redesign/SKILL.md`
- Icons: Lucide React with explicit `size` / `strokeWidth` / `aria-hidden="true"` for decorative icons

**Accessibility:**
- Provide `aria-label` on landmark navs and icon-only buttons
- Use `aria-expanded` / `aria-controls` / `role="menu"` where menus exist
- Decorative SVGs: `aria-hidden="true"`

**HTML content port:**
- Remaining homepage sections live as a string export in `content/home-html.ts` (`homeHtml`)
- Inject via `dangerouslySetInnerHTML` with `suppressHydrationWarning` on the wrapper
- Behavior attaches via dynamic import of `initDominionMockups` from `lib/mockups-main.js`

## Function Design

**Size:**
- Keep route entry points thin (`page.tsx` only composes)
- Extract presentational subcomponents in the same file when local (`Spark`, `InsightCard`, `AwardsRow` inside `CinematicHero.tsx`)
- Prefer extracting a new file when a subcomponent is reused across routes/sections

**Parameters:**
- Destructure props in the signature
- Optional props with `?` (`compact?: boolean`)
- Avoid long prop lists without grouping when adding new cards — consider a typed config object

**Return Values:**
- Explicit JSX returns
- Early return cleanup functions from `useEffect`
- Dynamic import: `void import(...).then(...)` when fire-and-forget with cancel guard

## Module Design

**Exports:**
- Named exports for reusable components and helpers (`export function DominionHome`, `export function CinematicHero`, `export function initDominionMockups`)
- Default exports only for Next.js App Router files (`export default function Home`, `export default function RootLayout`) and the dual default on mockup init
- Re-export lucide icons from `components/icons.ts` when centralizing icon usage

**Barrel Files:**
- Not used — import from concrete files (`@/components/DominionHome`)
- Do not add barrels that re-export huge HTML strings or CSS side effects

**Content vs UI:**
- Static HTML blobs → `src/content/`
- Interactive React → `src/components/`
- Ported vanilla scripts → `src/lib/`
- Global/app chrome → `src/app/`
- Ambient types → `src/types/`

---

*Convention analysis: 2026-09-05*
*Update when patterns change*
