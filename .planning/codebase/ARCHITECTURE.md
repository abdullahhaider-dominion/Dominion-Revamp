<!-- refreshed: 2026-09-05 -->
# Architecture

**Analysis Date:** 2026-09-05

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                     Next.js App Router (`web/`)                          │
│  `web/src/app/layout.tsx`  → fonts, metadata, globals + /mockups.css    │
│  `web/src/app/page.tsx`    → mounts DominionHome                        │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Page Composer — `web/src/components/DominionHome.tsx`        │
├──────────────────────────────┬──────────────────────────────────────────┤
│  React cinematic hero        │  Legacy HTML body (SSR string)           │
│  `CinematicHero.tsx`         │  `content/home-html.ts` → innerHTML      │
│  `styles/cinematic-hero.css` │  classes from `public/mockups.css`       │
└──────────────┬───────────────┴──────────────────┬───────────────────────┘
               │                                  │
               │ client state (nav/menu)          │ client mount
               ▼                                  ▼
┌──────────────────────────┐    ┌─────────────────────────────────────────┐
│  Lucide icons / Image    │    │  Imperative init — `lib/mockups-main.js` │
│  next/image, lucide-react│    │  DOM querySelector + demo timers/charts │
└──────────────────────────┘    └──────────────────┬──────────────────────┘
                                                   │
                                                   ▼
                                    ┌──────────────────────────────┐
                                    │  Static assets               │
                                    │  `web/public/assets/`        │
                                    │  (mirrored from mockups/)    │
                                    └──────────────────────────────┘

Repo-level design pipeline (NOT runtime of `web/`):
  wireframes/ → mockups/ → docs/ (brand + Floating Sanctuary specs)
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

**Overall:** Hybrid Next.js App Router marketing site — React island for the hero, SSR HTML injection for remaining homepage sections, and a ported imperative vanilla script for section interactivity.

**Key Characteristics:**
- Single-route homepage (`/`) with no API routes, auth, or database layer
- Dual UI stacks on one page: React (`CinematicHero`) above; BEM-style mockup HTML below via `dangerouslySetInnerHTML`
- Design source of truth remains `mockups/`; `web/` is the Next.js port with assets copied into `web/public/`
- Client-only interactivity for body sections via dynamic `import("@/lib/mockups-main.js")`
- `reactStrictMode: false` in `web/next.config.ts` so vanilla one-shot listeners are not broken by remounts
- Demo/mock data only (canvas charts, quote ticks); no live market APIs wired

## Layers

**App Router shell:**
- Purpose: Document shell, fonts, global CSS variables, page entry
- Location: `web/src/app/`
- Contains: `layout.tsx`, `page.tsx`, `globals.css`
- Depends on: Next.js fonts, Tailwind v4 theme/utilities (Preflight not imported)
- Used by: Browser HTTP requests to `/`

**Presentation / React components:**
- Purpose: Interactive React UI that owns the first viewport
- Location: `web/src/components/`
- Contains: `DominionHome.tsx`, `CinematicHero.tsx`, `icons.ts`
- Depends on: `content/home-html`, `lib/mockups-main.js`, `styles/cinematic-hero.css`, `lucide-react`, `next/image`
- Used by: `web/src/app/page.tsx`

**Content (static HTML payload):**
- Purpose: Hold mockup body markup as a string for 1:1 visual parity
- Location: `web/src/content/home-html.ts`
- Contains: Exported `homeHtml` (generated from `mockups/index.html` with hero/nav stripped)
- Depends on: None at runtime
- Used by: `DominionHome` via `dangerouslySetInnerHTML`

**Imperative behavior layer:**
- Purpose: Attach DOM listeners and demo animations to injected markup
- Location: `web/src/lib/mockups-main.js`
- Contains: `initDominionMockups()` wrapping ported `mockups/main.js` logic
- Depends on: Browser DOM, `window.__dominionMockupsInit` guard
- Used by: `DominionHome` `useEffect` (dynamic import)

**Styles:**
- Purpose: Brand theme + section CSS without Tailwind Preflight rewriting mockup rules
- Location: `web/src/app/globals.css`, `web/src/styles/cinematic-hero.css`, `web/public/mockups.css` (and mirror `web/src/styles/mockups.css`)
- Contains: CSS variables (`--color-navy`, `--dm-*`), cinematic hero rules, full Floating Sanctuary stylesheet served as a static link
- Depends on: Font CSS variables from layout
- Used by: Layout (`globals.css` + `<link href="/mockups.css">`) and `CinematicHero` (CSS import)

**Static assets:**
- Purpose: Images, logos, payment marks, section backgrounds
- Location: `web/public/assets/` (runtime); source originals in `mockups/assets/`
- Contains: Section-scoped folders (`hero/`, `logo/`, `payments/`, etc.)
- Depends on: None
- Used by: Injected HTML `src="/assets/..."`, `next/image` in hero

**Design / legacy (repo root, not Next runtime):**
- Purpose: Wireframes → hi-fi mockups → brand/spec documentation
- Location: `wireframes/`, `mockups/`, `docs/`
- Contains: Standalone HTML/CSS/JS and Markdown specs
- Depends on: Local static servers (`npx serve`) for preview
- Used by: Design workflow (`.cursor/skills/dominion-section-redesign/`); feeds content into `web/`

## Data Flow

### Primary request path (homepage)

1. Browser requests `/` → Next.js App Router serves `web/src/app/layout.tsx` + `web/src/app/page.tsx`
2. Layout injects font CSS variables and loads `/mockups.css` from `web/public/mockups.css`
3. `page.tsx` renders `DominionHome` (`web/src/components/DominionHome.tsx`)
4. Server/client render: `CinematicHero` (React tree) + `.page-root` with `homeHtml` as HTML
5. On client mount, `DominionHome` dynamically imports `web/src/lib/mockups-main.js` and calls `initDominionMockups()`
6. Imperative script finds sections by id/class (`#proof`, sessions, markets, dashboard, etc.) and starts demo ticks, carousels, canvas charts, scroll reveals
7. Static files under `web/public/assets/` are requested as `/assets/...`

### Hero interaction flow

1. User scrolls or opens mobile menu in `CinematicHero`
2. React state (`scrolled`, `navShown`, `open`, `openMenu`) updates chrome visibility and drawer
3. Anchor `href`s (`#markets`, `#sessions`, `#accounts`, …) target ids in the injected HTML below

### Design-to-Next port flow (offline / authoring)

1. Structure validated in `wireframes/`
2. Hi-fi built in `mockups/` (`index.html` + `styles.css` + `main.js` + `assets/`)
3. Port into `web/`: HTML → `home-html.ts`, CSS → `public/mockups.css`, JS → `lib/mockups-main.js`, assets → `public/assets/`
4. Hero replaced by React `CinematicHero` + `cinematic-hero.css`

**State Management:**
- React local state only in `CinematicHero` (nav/menu/scroll); no global store, Context, or server state
- Body sections: DOM class toggles and closures inside `mockups-main.js`; guarded by `window.__dominionMockupsInit`
- No persistence, cookies, or backend session

## Key Abstractions

**Page composer (DominionHome):**
- Purpose: Single client component that owns the hybrid render strategy
- Examples: `web/src/components/DominionHome.tsx`
- Pattern: Composition root — React child + HTML string + deferred script init

**HTML content module:**
- Purpose: Treat large mockup markup as data, not JSX
- Examples: `web/src/content/home-html.ts` (`export const homeHtml`)
- Pattern: Generated string module (comment: auto-generated from `mockups/index.html`)

**Imperative init function:**
- Purpose: One-shot browser bootstrap for vanilla behaviors
- Examples: `initDominionMockups` in `web/src/lib/mockups-main.js`
- Pattern: Module export + `window.__dominionMockupsInit` singleton guard

**Cinematic hero island:**
- Purpose: Modern React replacement for mockup hero/nav while keeping body parity
- Examples: `web/src/components/CinematicHero.tsx`, `web/src/styles/cinematic-hero.css`
- Pattern: Client component + dedicated CSS (not Tailwind-only)

**Design system tokens:**
- Purpose: Dominion Navy / Market Green / mist shared across Tailwind theme and hero CSS
- Examples: `web/src/app/globals.css` `@theme`, `.hero-root` CSS variables in `cinematic-hero.css`, brand docs in `docs/brand/Dominion_Markets_Brand_Guidelines.md`
- Pattern: Parallel token definitions (CSS vars + Markdown guidelines)

## Entry Points

**Next.js homepage:**
- Location: `web/src/app/page.tsx`
- Triggers: HTTP GET `/` via `npm run dev` / `npm run start` in `web/`
- Responsibilities: Render `DominionHome`

**Root layout:**
- Location: `web/src/app/layout.tsx`
- Triggers: Every App Router request
- Responsibilities: Metadata, fonts, global CSS, static link to mockup stylesheet

**Vanilla mockup preview:**
- Location: `mockups/index.html`
- Triggers: `npx serve mockups -p 4174` (per `mockups/README.md`)
- Responsibilities: Standalone Floating Sanctuary hi-fi (full page including original hero)

**Wireframe preview:**
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

**What happens:** Editing section markup only as JSX without updating `homeHtml`, or nesting interactive React inside the `dangerouslySetInnerHTML` tree.
**Why it's wrong:** Body sections are a string blob; React does not manage that subtree. Event handlers and hydration diverge.
**Do this instead:** Change markup in the content string (or regenerate from `mockups/index.html`), and keep behavior in `mockups-main.js` or extract a real React component beside the hero (like `CinematicHero`).

### Re-initializing vanilla JS without the guard

**What happens:** Calling `initDominionMockups()` repeatedly or enabling Strict Mode remounts without resetting listeners.
**Why it's wrong:** Duplicate scroll/tick listeners and “dead” DOM references; config already sets `reactStrictMode: false` for this reason.
**Do this instead:** Keep the `__dominionMockupsInit` guard; if remount support is needed, add explicit teardown before re-init.

### Editing Next styles as the design source of truth

**What happens:** Changing only `web/public/mockups.css` or hero CSS without updating `mockups/`.
**Why it's wrong:** Project skill and `web/README.md` treat `mockups/` as design source; Next drifts from Floating Sanctuary.
**Do this instead:** Implement/polish in `mockups/` first (per `.cursor/skills/dominion-section-redesign/`), then port into `web/`.

### Enabling Tailwind Preflight

**What happens:** Importing `tailwindcss/preflight` into `globals.css`.
**Why it's wrong:** Resets fight BEM mockup CSS and break 1:1 parity.
**Do this instead:** Keep only `theme` + `utilities` imports as in `web/src/app/globals.css`.

## Error Handling

**Strategy:** Minimal — marketing mockup with no API error surface; fail soft in imperative UI code.

**Patterns:**
- Guard early returns when DOM nodes missing (`if (!nav) return`, etc. in `mockups-main.js`)
- Video `play().catch(...)` swallow for autoplay policies
- Dynamic import cancellation flag in `DominionHome` (`cancelled`) to avoid setState-after-unmount style races
- No React error boundaries or route-level `error.tsx` detected

## Cross-Cutting Concerns

**Logging:** Not applicable — no structured logger; browser console only if added manually

**Validation:** Not applicable — no form schemas or request validation; wireframe completeness checked by `wireframes/wireframe-check.mjs` in the design folder

**Authentication:** None — public marketing page only

**Motion / a11y:** `prefers-reduced-motion` short-circuits reveals in `mockups-main.js`; Escape closes menus in both React hero and vanilla nav init

**Images:** Local `/assets/...` plus allowlisted remotes (`i.pravatar.cc`, `images.unsplash.com`) in `web/next.config.ts`

---

*Architecture analysis: 2026-09-05*
*Update when major patterns change*
