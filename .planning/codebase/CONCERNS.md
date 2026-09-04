# Codebase Concerns

**Analysis Date:** 2026-09-05

## Tech Debt

**Vanilla HTML/CSS/JS port still drives the Next.js page body:**
- Issue: Homepage below the cinematic hero is still the vanilla mockup shipped as a giant string plus a ported script, not React components.
- Files: `web/src/content/home-html.ts`, `web/src/lib/mockups-main.js`, `web/src/components/DominionHome.tsx`, `web/public/mockups.css`
- Why: Preserve 1:1 Floating Sanctuary visual/interaction parity during migration (`web/README.md`).
- Impact: Hard to type-check sections, tree-shake unused UI, use Next Image for body media, or unit-test behavior. Edits require regenerating/porting from `mockups/` and risk stale copies.
- Fix approach: Section-by-section replace `homeHtml` islands with React components under `web/src/components/`, migrate interactions out of `mockups-main.js`, then drop the HTML string and eventually the monolithic CSS.

**Triple CSS / dual JS copies of the vanilla site:**
- Issue: The same mockup stylesheet exists in three places with diverging checksums; JS is duplicated once.
- Files:
  - `mockups/styles.css` (~284KB, 13106 lines) — vanilla source of truth
  - `web/public/mockups.css` (~288KB) — **served** via `<link href="/mockups.css">` in `web/src/app/layout.tsx`
  - `web/src/styles/mockups.css` (~288KB) — **not imported** by any `web/src` module (dead copy in the Next tree)
  - `mockups/main.js` → `web/src/lib/mockups-main.js` (auto-wrapped export)
- Why: Port copied assets/CSS into `web/` while keeping `mockups/` as design SoT (`.cursor/skills/dominion-section-redesign/SKILL.md`, `web/README.md`).
- Impact: Style fixes applied in the wrong file do not appear in Next; ~288KB of unused CSS sits in `web/src/styles/`. Drift between the three CSS trees is already present (different MD5 hashes).
- Fix approach: Single pipeline (e.g. copy/sync script from `mockups/styles.css` → `web/public/mockups.css` only). Delete or stop maintaining `web/src/styles/mockups.css` once confirmed unused. Keep `mockups/` until React sections replace it.

**`mockups/` (~64MB) — legacy vanilla tree (not a Next runtime import):**
- Issue: Full hi-fi vanilla site remains at repo root alongside the Next app.
- Files: `mockups/index.html`, `mockups/styles.css`, `mockups/main.js`, `mockups/assets/` (~63MB), `mockups/concepts/` (~872KB), `mockups/README.md`, `mockups/VERSION`
- Referenced from `web/` runtime?: **No** — no `import`/`require` of `../mockups` from `web/src`. Only comments/docs mention it (`web/src/content/home-html.ts` header, `web/src/lib/mockups-main.js` header, `web/README.md`).
- Still referenced outside runtime?: **Yes** — design SoT for `.cursor/skills/dominion-section-redesign/SKILL.md`, root `readme.md`, and the port workflow. Git tracks ~139 mockup paths including large binaries (e.g. `mockups/assets/hero/hero.mp4` ~16MB).
- Impact: Inflates clone size (~64MB + history). Easy to edit `mockups/` and forget to re-port into `web/`.
- Fix approach: Do **not** delete while skill/README still treat it as SoT. Options: (1) keep as design package but stop duplicating assets into git twice, (2) move to a separate design repo/LFS, (3) after full React cutover, archive and remove from the production app repo. Before any delete, re-scan `web/` and the skill.

**Root `Hero-background.png` (~2.1MB) — orphan duplicate:**
- Issue: Identical file (same MD5 `b7a462f3…`) exists at repo root and under the Next public tree.
- Files: `Hero-background.png` (root), `web/public/assets/hero/Hero-background.png`
- Referenced from `web/`?: Root file — **No**. Public path — **Yes** (`web/src/components/CinematicHero.tsx` uses `/assets/hero/Hero-background.png` twice via `next/image`).
- Impact: Extra 2.1MB untracked at root; confuses which path is canonical.
- Fix approach: Safe to remove root `Hero-background.png` after confirming no external docs link it; keep `web/public/assets/hero/Hero-background.png`.

**`web/public/assets/` ~50% unreferenced by Next source:**
- Issue: ~134 asset files (~64.7MB) under `web/public/assets/`; static analysis of `web/src` + `web/public/mockups.css` finds **81 referenced** (~32.1MB) and **53 unreferenced** (~32.6MB). Unreferenced files still ship with any `next build` that includes `public/`.
- Evidence method: Extract `/assets/...` paths from `web/src/**/*.{ts,tsx,js,css}` and `web/public/mockups.css`; diff against `find web/public/assets`.
- Why: Bulk copy from `mockups/assets/` (`web/README.md`); hero video/media and older payment/platform art left behind after React hero / HTML trim.
- Impact: ~33MB unnecessary production static weight; slower deploys and CDN cold caches.
- Fix approach: Prune only after confirming not referenced (list below). Prefer deleting from **both** `web/public/assets/` and `mockups/assets/` together if retiring design variants, or from `web/public/` only if `mockups/` remains SoT.

**Candidate unreferenced paths under `web/public/` (not found in `web/src` or `web/public/mockups.css`):**

| Path | Size | Notes |
|------|------|--------|
| `web/public/assets/hero/hero.mp4` | ~15.7MB | Vanilla hero video; React hero uses PNG only |
| `web/public/assets/hero/hero-media.png` | ~1.7MB | Vanilla poster; not in `CinematicHero.tsx` |
| `web/public/assets/blogs/mist-bg.png` | ~2.2MB | HTML/CSS use `mist-bg.jpg` instead |
| `web/public/assets/awards/mist-bg.jpg` | ~2.2MB | Awards section uses wreath SVG only; section often `hidden` |
| `web/public/assets/markets-reach/*` | ~2.2MB+ | Folder not referenced in ported HTML |
| `web/public/assets/mrkt/mist-bg.jpg` | ~2.2MB | `#mrkt` uses `mrktedge-mark.svg` only |
| `web/public/assets/mrkt/product-collage.png` | ~1.8MB | Not in `home-html.ts` |
| `web/public/assets/mrkt/product-collage.webp` | ~0.1MB | Not in `home-html.ts` |
| `web/public/assets/mt5-sim/*` | ~2.9MB | `#mt5-simulator` UI is chart/copy; no `/assets/mt5-sim/` img srcs |
| `web/public/assets/payments/` orphans (icons, pay-icons*, visa/mastercard logos, etc.) | ~0.8MB+ | Live UI uses `payments/icons/*` subset only |
| `web/public/assets/platforms/` orphans (`*-icon`, `*-lockup`, `platforms-mist-water.jpg`, etc.) | ~0.7MB+ | Live UI uses `mt5-official.png`, `ctrader-official.png`, `platforms-mist-water-hero.jpg` |
| `web/public/assets/trade-better/icons/bull-wire.svg` | small | HTML uses hologram/badges, not wire |
| `web/public/assets/awards/laurel.svg` | small | HTML uses `laurel-wreath.svg` |
| `web/public/assets/logo/logo-horizontal-color.png` | ~0.1MB | Live uses reverse SVG / transparent color PNG / isotype |
| `web/public/assets/trader-community/avatars/avatar-*.webp` | ~30KB | HTML references `.jpg` only |

**Still referenced — do not delete without updating callers:**
- `web/public/assets/hero/Hero-background.png` — `CinematicHero.tsx`
- `web/public/assets/logo/logo-isotype-app.png` — `web/src/app/layout.tsx` metadata icons
- `web/public/assets/logo/logo-horizontal-reverse.svg` — cinematic nav
- Body images listed in `web/src/content/home-html.ts` (features, blogs `.jpg`, sessions, skylines, sanctuary/footer via CSS, accounts `*-bg.png`, payment icons subset, platforms official marks, etc.)
- `web/public/mockups.css` — linked from `layout.tsx` (distinct from unused `web/src/styles/mockups.css`)

**`wireframes/` and `docs/` — non-runtime design artifacts:**
- Files: `wireframes/index.html`, `wireframes/styles.css`, `wireframes/wireframe-check.mjs`; `docs/brand/Dominion_Markets_Brand_Guidelines.md`, `docs/superpowers/specs/…`, `docs/superpowers/plans/…`
- Referenced from `web/` runtime?: **No**
- Impact: Small on disk (~88KB combined) but part of design process; skill depends on `docs/` + `mockups/`.
- Fix approach: Keep for design/governance; exclude from production deploy bundles (they are outside `web/` already).

**Entire `web/` app currently untracked in git:**
- Issue: `git status` shows `?? web/` while `mockups/` assets are tracked. Next app, `public/assets`, and config are not committed.
- Files: `web/` (includes `web/node_modules` locally ~502MB — ignored by `web/.gitignore`; source + `public` must still be added intentionally)
- Impact: Production readiness blocked; collaborators only get vanilla `mockups/` from the remote; risk of losing the Next port.
- Fix approach: Add root `.gitignore` (none today) covering `node_modules`, `.next`, `.DS_Store`, then commit `web/src`, `web/public`, and config without `node_modules`/`.next`.

**React Strict Mode disabled:**
- Issue: `reactStrictMode: false` in `web/next.config.ts` to avoid double-mount breaking vanilla init.
- Files: `web/next.config.ts`, `web/src/lib/mockups-main.js` (`window.__dominionMockupsInit` guard)
- Impact: Misses React double-invoke warnings; masks effect bugs until vanilla JS is removed.
- Fix approach: After interactions are idempotent React effects, re-enable Strict Mode.

## Known Bugs

**Duplicate `id="top"` after hero split:**
- Symptoms: In-page `#top` / “back to top” targets are ambiguous; `document.getElementById("top")` returns the first match only.
- Trigger: Load homepage; inspect DOM for multiple `#top`.
- Files: `web/src/components/CinematicHero.tsx` (`<section id="top">`), `web/src/content/home-html.ts` (`<main id="top">`)
- Workaround: Browser usually scrolls to the first `#top` (hero).
- Root cause: Hero extracted to React; remaining HTML still uses the original main landmark id.
- Fix: Keep `id="top"` on the hero only; change the HTML root to e.g. `id="main-content"` or omit the duplicate.

**Vanilla nav JS no-ops against React nav:**
- Symptoms: Sticky-scroll / burger logic in `mockups-main.js` never binds; React nav uses different IDs/classes.
- Trigger: `initDominionMockups()` runs; `getElementById("site-nav")`, `nav-menu-btn`, `site-chrome` are null.
- Files: `web/src/lib/mockups-main.js` (lines ~10–50), `web/src/components/CinematicHero.tsx` (`dm-nav`, `dm-nav-drawer` — no `site-nav`)
- Workaround: Cinematic hero implements its own nav/drawer in React.
- Root cause: Hero/nav rewritten in React; body script still expects vanilla chrome IDs stripped from `home-html.ts`.
- Fix: Remove dead nav init from `mockups-main.js`, or stop loading those IIFEs.

**Hidden awards section still in DOM/CSS payload:**
- Symptoms: `#awards` marked `hidden` in HTML but markup, CSS, and assets remain.
- Files: `web/src/content/home-html.ts` (`aria-labelledby="awards-title" hidden`), related rules in `web/public/mockups.css`
- Workaround: Not visible to users.
- Root cause: Section parked rather than removed during redesign.
- Fix: Delete section from HTML/CSS or re-enable deliberately; drop unused `awards/mist-bg.jpg` / duplicate laurels if unused.

## Security Considerations

**`dangerouslySetInnerHTML` for homepage body:**
- Risk: XSS if `homeHtml` ever concatenates untrusted input; large HTML blob bypasses React escaping.
- Files: `web/src/components/DominionHome.tsx`, `web/src/content/home-html.ts`
- Current mitigation: String is a static checked-in constant (not user-generated).
- Recommendations: Keep static-only; prefer React components for new sections; never interpolate CMS/query data into `homeHtml` without a sanitizer.

**Vanilla script DOM writes (`innerHTML`):**
- Risk: `mockups-main.js` assigns `innerHTML` in multiple widgets (instruments grid, marquee, dashboard, copy controls). Safe today with hardcoded demo data; unsafe if wired to APIs later.
- Files: `web/src/lib/mockups-main.js` (e.g. instrument grid ~553, dashboard ~953, copy UI ~1759+)
- Current mitigation: Demo/static strings only.
- Recommendations: Use `textContent`/DOM APIs or React state when connecting live market data.

**Remote image host allowlist without in-app usage:**
- Risk: `next.config.ts` allows `i.pravatar.cc` and `images.unsplash.com` even though current components use local `/assets/...`.
- Files: `web/next.config.ts`
- Current mitigation: Unused allowlist does not fetch by itself.
- Recommendations: Remove unused `remotePatterns` until needed to shrink supply-chain/SSRF surface for `next/image`.

**No env/secrets pattern yet:**
- Risk: Low today (no API keys in app). No root `.gitignore`; only `web/.gitignore` covers `.env*`.
- Files: `web/.gitignore`; no root `.gitignore`; no `.env` files detected (existence check only).
- Recommendations: Add root `.gitignore` before committing `web/`; never commit `.env*`.

## Performance Bottlenecks

**Large static asset surface in `public/`:**
- Problem: `web/public` ~65MB; ~32.6MB of files have no reference from Next source/CSS.
- Measurement: `du` ~65MB `web/public`; unreferenced sum ~32.6MB (largest single: `hero.mp4` 15.7MB).
- Cause: Full `mockups/assets` mirror + unused video/PNG variants.
- Improvement path: Delete confirmed-unreferenced public files; compress remaining JPG/PNG; serve modern formats where HTML already has webp pairs (footer/sanctuary already use `image-set`).

**Monolithic CSS always loaded:**
- Problem: Full ~288KB `mockups.css` linked globally for one route.
- Files: `web/src/app/layout.tsx`, `web/public/mockups.css`
- Measurement: ~288KB stylesheet (+ unused rules for removed/hidden sections).
- Cause: Port of entire vanilla stylesheet.
- Improvement path: Split per-section CSS as React components land; purge dead selectors (`#mt5-simulator` order rules, legacy hero `.xhero`, etc.).

**Hero PNG ~2.1MB with `priority`:**
- Problem: `Hero-background.png` loaded eagerly for desktop and mobile art.
- Files: `web/src/components/CinematicHero.tsx`, `web/public/assets/hero/Hero-background.png`
- Measurement: 2.1MB PNG (same bytes as root orphan).
- Cause: Unoptimized photographic art.
- Improvement path: Export WebP/AVIF; consider separate mobile crop; keep `priority` on LCP candidate only.

**Client-only body hydration + full mockup JS:**
- Problem: `DominionHome` is a client component that injects HTML then dynamically imports ~1800-line `mockups-main.js`.
- Files: `web/src/components/DominionHome.tsx`, `web/src/lib/mockups-main.js`
- Cause: Parity with vanilla interactions (marquees, charts, tabs, sim UI).
- Improvement path: Code-split per section; convert above-the-fold to Server Components where possible.

## Fragile Areas

**`home-html.ts` single-string content module:**
- Why fragile: Entire page body is one escaped string; diffs are unreadable; easy to break attributes/escaping.
- Common failures: Broken `src` paths, mismatched section ids vs nav hrefs, accidental drop of closing tags.
- Safe modification: Edit `mockups/index.html` then re-generate the string, or extract one section at a time into a `.tsx` file.
- Test coverage: None.

**`mockups-main.js` global init:**
- Why fragile: One-shot `window.__dominionMockupsInit`; assumes specific DOM ids/data attributes from the HTML string; Strict Mode disabled because of this.
- Common failures: Missing `data-*` hooks after HTML edits; listeners never attached; dead code paths for removed chrome.
- Safe modification: Change HTML and JS together; search for `getElementById` / `querySelector` before renaming ids.
- Test coverage: None.

**Cinematic hero + legacy CSS coexistence:**
- Why fragile: `globals.css` overrides mockup `body { overflow-x: hidden }` for backdrop-filter; hero uses separate `cinematic-hero.css`.
- Files: `web/src/app/globals.css`, `web/src/styles/cinematic-hero.css`, `web/public/mockups.css`
- Common failures: Scroll/overflow regressions, z-index fights between `dm-nav` and page sections.
- Safe modification: Change overflow/stacking with visual QA on mobile and desktop.
- Test coverage: None.

**Design skill still points at `mockups/` while product runs from `web/`:**
- Why fragile: Agents following `.cursor/skills/dominion-section-redesign/SKILL.md` implement in `mockups/` first; Next can lag.
- Safe modification: When changing SoT, update skill + README + port checklist in the same change.

## Scaling Limits

**Repo / clone weight:**
- Current capacity: Working tree dominated by `web/node_modules` (~502MB local), tracked `mockups/assets` binaries, duplicated `web/public/assets`.
- Limit: Painful clones and CI caches once `web/public` is committed alongside `mockups/assets` (~64MB × 2).
- Symptoms at limit: Slow CI checkout, LFS pressure, accidental commit of `node_modules` if root ignore missing.
- Scaling path: Root `.gitignore`; Git LFS or CDN for media; stop dual-tracking identical asset trees; commit only `web/public` for the app.

**Static hosting / CDN:**
- Current capacity: Single marketing homepage.
- Limit: Shipping ~65MB of public assets (half unused) wastes bandwidth per region miss.
- Symptoms at limit: Slow first contentful paint on poor networks; high egress cost.
- Scaling path: Prune unreferenced public files; image optimization pipeline.

**No backend yet:**
- Current capacity: Static demo interactions only.
- Limit: Cannot scale to live quotes/accounts without replacing `mockups-main.js` data stubs.
- Scaling path: Introduce API routes/clients deliberately; do not extend `innerHTML` demo builders.

## Dependencies at Risk

**Next.js 16.3.4 / React 19.2.8 (early stack pairing):**
- Risk: Fast-moving majors; community patterns and eslint-config must stay aligned (`eslint-config-next` pinned to 16.3.4).
- Files: `web/package.json`
- Impact: Upgrade friction while vanilla JS relies on `reactStrictMode: false`.
- Migration plan: Upgrade only with full visual regression of hero + major sections; re-enable Strict Mode after JS port.

**Lucide React present but mostly unused abstraction:**
- Risk: Low — `web/src/components/icons.ts` re-exports a subset; `CinematicHero.tsx` imports lucide directly.
- Impact: Dead barrel file drift.
- Migration plan: Either use `icons.ts` consistently or remove the barrel.

**No test runner dependency:**
- Risk: `web/package.json` has `dev`/`build`/`start`/`lint` only — no vitest/jest/playwright.
- Impact: Regressions in HTML/JS port go unnoticed.
- Migration plan: Add Playwright smoke for homepage + critical anchors before large refactors.

## Missing Critical Features

**Production deploy configuration:**
- Problem: No Vercel/Docker/CI config in repo; `web/` untracked; metadata still says “UI Mockup”.
- Files: `web/src/app/layout.tsx` (title/description), absence of CI workflows at repo root
- Current workaround: Local `npm run dev` / `npm run build`
- Blocks: Production launch checklist, preview URLs, asset CDN strategy
- Implementation complexity: Low–medium once gitignore and asset prune are done

**Content/component architecture for multi-page site:**
- Problem: Only `web/src/app/page.tsx` → `DominionHome`; no shared layout sections as components, no routing beyond `/`.
- Current workaround: One long scrolling mockup page
- Blocks: Marketing pages, legal pages, localized routes without copying the HTML string pattern
- Implementation complexity: High (incremental section extraction)

**Automated sync from `mockups/` → `web/`:**
- Problem: Manual/tribal port (`Auto-generated` / `Auto-wrapped` comments) with no script in-repo.
- Current workaround: Hand copy
- Blocks: Reliable design→prod updates without drift
- Implementation complexity: Medium (codegen script + CI check)

## Test Coverage Gaps

**Homepage / port integration:**
- What's not tested: Hero render, nav anchors, `initDominionMockups` widgets, asset 200s for critical images
- Files: `web/src/components/DominionHome.tsx`, `web/src/components/CinematicHero.tsx`, `web/src/lib/mockups-main.js`
- Risk: Broken section ids or missing public assets ship unnoticed
- Priority: High
- Difficulty to test: Medium — Playwright smoke against `next start` is enough initially

**Asset reference integrity:**
- What's not tested: No CI check that every `/assets/...` in `home-html.ts` / CSS exists on disk, or that orphan files are flagged
- Files: `web/public/assets/`, `web/src/content/home-html.ts`, `web/public/mockups.css`
- Risk: 404 images in production; or forever shipping 30MB+ orphans
- Priority: High
- Difficulty to test: Low — small Node script in CI

**Lint-only quality gate:**
- What's not tested: `npm run lint` exists; no format check, no unit tests, no visual regression
- Files: `web/eslint.config.mjs`, `web/package.json`
- Risk: Style/behavior regressions in 13k-line CSS and 1.8k-line JS
- Priority: Medium
- Difficulty to test: Medium

---

## Unused / Legacy Inventory Summary (2026-09-05)

| Location | Size | Referenced from `web/` runtime? | Recommendation posture |
|----------|------|----------------------------------|------------------------|
| `mockups/` | ~64MB | No (design SoT / docs/skill only) | Do not delete until React cutover + skill update |
| `mockups/assets/` | ~63MB | No (mirrored into `web/public/assets`) | Dedupe strategy before delete |
| `web/public/assets/` unreferenced set | ~32.6MB / 53 files | No | Strong prune candidates (see table above) |
| `web/public/assets/` referenced set | ~32.1MB / 81 files | Yes | Keep |
| `web/src/styles/mockups.css` | ~288KB | No import | Dead duplicate; safe to remove after confirming |
| `web/public/mockups.css` | ~288KB | Yes (`layout.tsx` link) | Keep until CSS split |
| `Hero-background.png` (repo root) | ~2.1MB | No | Orphan duplicate of public hero PNG |
| `wireframes/` | ~24KB | No | Keep for design history; not production |
| `docs/` | ~64KB | No | Keep; skill depends on brand/spec |
| `web/node_modules/` | ~502MB | N/A (local install) | Must stay gitignored |

---

*Concerns audit: 2026-09-05*
*Update as issues are fixed or new ones discovered*
