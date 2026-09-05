# Phase 6: Parity Verification - Research

**Researched:** 2026-09-05
**Domain:** Post-prune homepage parity (static asset integrity + structured UAT + build)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01 (recommended):** Two-layer proof:
  1. **Automated:** `npm run build` in `web/` exit 0; extract asset URL refs from `web/src` (esp. `home-html.ts`, `CinematicHero`, styles) + `web/public/mockups.css`; assert every referenced `web/public` path exists; assert none of the Phase 5 deleted paths are still referenced.
  2. **Structured UAT checklist:** Write `06-PARITY-CHECKLIST.md` covering hero/nav, each shipped body section (proof → final-cta), and key `mockups-main.js` interactions (marquees, tabs, anchors). Executor marks automated items; human items go to VERIFICATION `human_needed` / UAT if visual judgment required.
- **D-02:** Optional browser smoke (dev server or `next start`) is **Claude's discretion** if browser tools are available — screenshots help but are not a hard blocker if automated layer + checklist exist.
- **D-03:** Baseline = **remaining live content** must render without missing keep media or broken layout caused by deletes. Do **not** expect deleted Phase 5 assets to appear. `mockups/` is design history only — not a runtime SoT for this phase.
- **D-04:** If automated checks find a **prune-caused** missing ref → minimal caller/path fix in the same phase (smallest change). If issue is pre-existing / out of inventory scope → record in checklist notes; do not redesign.

### Claude's Discretion
- Exact script shape for ref extraction (Python/Node one-shot in plan is fine).
- Whether to run `next start` + browser snapshot.
- Checklist section list derived from `home-html.ts` `<section id=...>` plus React hero/nav.

### Deferred Ideas (OUT OF SCOPE)
- Mockups archive / doc retarget / remove — Phases 7–9
- Lean production push readiness — Phase 10
- Full React section rewrite — out of milestone scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROD-01 | After cleanup, live homepage sections still match pre-cleanup look/behavior for remaining content | Hybrid D-01: path-aware ref integrity vs keep/delete SoTs + `npm run build` + `06-PARITY-CHECKLIST.md`; optional D-02 browser smoke; D-04 minimal fix only for prune-caused breaks |
</phase_requirements>

## Summary

Phase 6 is a **verification + documentation** phase, not a redesign. After Phase 5 pruned 55 unused `web/public` assets (~32.6 MB), PROD-01 requires proof that every **still-referenced** keep asset resolves on disk, deleted paths stay unreferenced/absent, the production build stays green, and a structured checklist covers hero/nav + all shipped body sections + remaining `mockups-main.js` widgets.

A live path-aware rescan in this research session found **82 unique normalized public refs** from `web/src` + `web/public/mockups.css`, **0 missing on disk**, **0 intersection with `05-DELETE-LIST.txt`**, and inventory keep set (82) fully present — matching CONTEXT’s spot-check of 69 `home-html.ts` `/assets/...` paths. `npm run build` in `web/` already succeeds (Next.js **16.3.4**). The plan should therefore emphasize **reproducible automated asserts + checklist artifact**, with optional browser smoke as a non-blocking bonus, and a conditional minimal-fix branch only if asserts fail.

**Primary recommendation:** Ship one fine-grained `06-01-PLAN.md` that (1) adds a committed one-shot path-aware ref-check script under the phase dir, (2) runs build, (3) writes `06-PARITY-CHECKLIST.md` with automated rows pre-filled, (4) optionally smoke-tests via `next start` + browser MCP, (5) applies D-04 fixes only on prune-caused failures.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Asset ref extraction / integrity asserts | API / Backend (local scripts + filesystem) | — | Static scan of source + CSS vs `web/public`; no browser required |
| Keep vs delete SoT cross-check | Database / Storage (planning artifacts + disk) | — | `02-INVENTORY.json` keep set + `05-DELETE-LIST.txt` + on-disk `web/public` |
| Production build proof | Frontend Server (Next build) | CDN / Static | `next build` typechecks and packs static `public/` assets |
| Hero / nav rendering | Browser / Client + Frontend Server | CDN / Static | `CinematicHero` (`next/image` → `/assets/...`) |
| Body section markup / media | Browser / Client | CDN / Static | `home-html.ts` via `dangerouslySetInnerHTML`; images as plain `<img src="/assets/...">` |
| Served body styles / CSS `url()` media | CDN / Static | Browser / Client | `layout.tsx` → `/mockups.css` from `web/public/mockups.css` |
| Widget init (marquees, tabs, sessions) | Browser / Client | — | Dynamic `import` of `mockups-main.js` → `initDominionMockups()` |
| Structured UAT checklist | — (process artifact) | Browser / Client | Human judgment for layout/visual; automated rows for refs/build |
| Optional visual smoke | Browser / Client | Frontend Server (`next start`) | D-02 discretionary; catches CSS/runtime gaps static scan misses |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/*.mdc` directory present in this project. Actionable constraints from project skill + phase anti-goals:

| Source | Directive for Phase 6 |
|--------|------------------------|
| `.cursor/skills/dominion-section-redesign/SKILL.md` | Treats `mockups/` as design SoT — **do not follow redesign workflow** in this phase (D-03 / UI-SPEC anti-goals; skill retarget is Phase 8) |
| `06-UI-SPEC.md` | Parity contract only — no new tokens, components, or copy changes |
| `.planning/codebase/CONVENTIONS.md` | Prefer silent no-op when DOM nodes missing in vanilla port; do not “fix” missing `#site-nav` into React hero |
| `.planning/codebase/TESTING.md` | No Jest/Vitest/Playwright today — do **not** introduce a full e2e framework solely for Phase 6; use script + build + checklist |

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Next.js | 16.3.4 `[VERIFIED: npm registry + web/package.json]` | App framework; `build` / `start` | Already shipping; local `/public` files map to URL paths starting with `/` `[CITED: nextjs.org Image / public folder docs via Context7]` |
| React / react-dom | (pinned with Next in `web/package.json`) | Client hero + home shell | Existing |
| Node.js | v24.13.1 `[VERIFIED: local env]` | Run one-shot ref-check + npm scripts | Available on research machine |
| Python 3 | 3.14.3 `[VERIFIED: local env]` | Acceptable alternate for one-shot extractor (D-01 discretion) | Available; Phase 2/5 used Python asserts successfully |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| `web/public/mockups.css` | served asset | Body Floating Sanctuary styles + `url(/assets/...)` | Always include in scan sources |
| `05-DELETE-LIST.txt` | 55 paths | Must remain absent & unreferenced | Every integrity run |
| `02-INVENTORY.json` | keep=82, delete=55 | Keep-set presence asserts | Every integrity run |
| Cursor browser MCP / IDE browser | — | Optional D-02 smoke | Only if tools available; not exit-blocking |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| One-shot script in phase dir | Ad-hoc `rg` in chat only | Script is reproducible for verifier; chat-only is not |
| Playwright e2e suite | Browser MCP one-shot screenshots | Playwright is Wave-0 heavy with no existing harness; violates “minimal phase” — defer unless user asks |
| `next dev` for smoke | `next start` after `build` | `start` closer to production static serving `[ASSUMED]` slightly better signal for public asset 404s |
| Treating `mockups/` as visual baseline | Remaining live `web/` content (D-03) | Locked — mockups archive is Phases 7–9 |

**Installation:** None required beyond existing `web/node_modules`. No new npm packages for the automated layer.

**Version verification:**
```bash
npm view next version   # → 16.3.4 (matches web/package.json)
cd web && npm run build # → exit 0 (re-verified 2026-09-05)
```

## Architecture Patterns

### System Architecture Diagram

```text
┌──────────────────┐     extract /assets/* + /mockups.css      ┌─────────────────────────┐
│ web/src/**       │ ─────────────────────────────────────────►│ Normalized ref set      │
│ (TS/JS/CSS)      │     (strip ?query, \#hash, TS \")         │ web/public/... paths    │
└──────────────────┘                                           └───────────┬─────────────┘
┌──────────────────┐                                                       │
│ web/public/      │ ──────────────────────────────────────────────────────┤
│ mockups.css      │   url("/assets/...")                                  │
└──────────────────┘                                                       ▼
                                                              ┌─────────────────────────┐
┌──────────────────┐   must exist                             │ Assert A: every ref     │
│ web/public/**    │ ◄────────────────────────────────────────│ exists on disk          │
│ (82 keep files)  │                                          └─────────────────────────┘
└──────────────────┘                                                       │
┌──────────────────┐   must NOT be referenced / must NOT exist             ▼
│ 05-DELETE-LIST   │ ◄────────────────────────────────────────┌─────────────────────────┐
│ (55 paths)       │                                          │ Assert B: refs ∩ delete │
└──────────────────┘                                          │ = ∅ ; delete absent     │
┌──────────────────┐                                          └─────────────────────────┘
│ 02-INVENTORY     │   keep paths must exist                               │
│ class=keep       │ ◄────────────────────────────────────────Assert C─────┘
└──────────────────┘                                                       │
                                                                           ▼
                                                              ┌─────────────────────────┐
                                                              │ cd web && npm run build │
                                                              │ exit 0 (Assert D)       │
                                                              └───────────┬─────────────┘
                                                                          │
                     ┌────────────────────────────────────────────────────┤
                     ▼                                                    ▼
        ┌────────────────────────┐                         ┌──────────────────────────┐
        │ 06-PARITY-CHECKLIST.md │                         │ Optional: next start +   │
        │ hero + 21 sections +   │                         │ browser snapshot (D-02)  │
        │ widgets; auto + human  │                         └──────────────────────────┘
        └────────────────────────┘
                     │
                     ▼ (only if Assert A fails with prune cause)
        ┌────────────────────────┐
        │ D-04 minimal path/HTML │
        │ caller fix — no redesign│
        └────────────────────────┘
```

### Recommended Project Structure

```text
.planning/phases/06-parity-verification/
├── 06-CONTEXT.md
├── 06-UI-SPEC.md
├── 06-RESEARCH.md                 # this file
├── 06-01-PLAN.md                  # single fine-grained plan (planner)
├── scripts/
│   └── parity-ref-check.mjs       # or .py — committed one-shot (executor)
├── 06-PARITY-CHECKLIST.md         # UAT artifact (executor)
├── 06-01-SUMMARY.md
└── 06-VERIFICATION.md             # verifier later

web/
├── src/components/CinematicHero.tsx
├── src/components/DominionHome.tsx
├── src/content/home-html.ts
├── src/lib/mockups-main.js
├── src/app/layout.tsx             # /mockups.css + favicon paths
└── public/
    ├── mockups.css
    └── assets/...                 # keep set only after Phase 5
```

### Pattern 1: Path-aware static ref extraction

**What:** Regex-extract `/assets/...` and `/mockups.css` from all text under `web/src` and from `url(...)` in `web/public/mockups.css`; normalize to `web/public/...`; strip `?v=` / hashes; strip trailing `\` from TS string escapes (`src=\"/assets/...\"`).

**When to use:** Every PROD-01 automated run; reuse Phase 2 scan sources only (never `mockups/` or `docs/` as keep proof).

**Example:**
```javascript
// Source: Phase 2 plan + live research validation 2026-09-05
const ASSET_RE = /\/(?:assets\/[A-Za-z0-9_./\-]+|mockups\.css)/g;

function normalize(raw) {
  let t = raw.split("?")[0].split("#")[0];
  while (t.endsWith("\\")) t = t.slice(0, -1); // home-html.ts \" escapes
  if (!(t.startsWith("/assets/") || t === "/mockups.css")) return null;
  return "web/public" + t;
}
```

**Research baseline (2026-09-05):** 82 unique refs; 0 missing; 0 ∩ delete list; 69 unique from `home-html.ts` alone. `[VERIFIED: local codebase scan]`

### Pattern 2: Checklist as hybrid evidence

**What:** Markdown table with columns: Surface | Expectation | Method (auto/human) | Status | Notes.

**When to use:** Always (D-01 layer 2). Pre-mark auto rows from script/build; leave visual/layout and interaction rows for human or optional browser.

### Pattern 3: Silent no-op widget init

**What:** `initDominionMockups()` early-returns when roots missing (`if (!root) return`). Old `#site-nav` / `data-xhero` hooks no-op under React `CinematicHero` — **pre-existing**, not a prune regression. `[VERIFIED: mockups-main.js + CinematicHero.tsx]`

**When to use:** Checklist must test **remaining** hooks (marquees, `#markets` platform tabs, quotes tabs, `#dashboard` tabs, sessions), not vanished vanilla hero chrome.

### Anti-Patterns to Avoid

- **Basename-only greps for delete detection:** Basenames `mist-bg.jpg`, `funding.png`, `commodities.svg`, `discord.svg` exist in **both** delete and keep trees — basename hits are false positives. Always match full `web/public/...` or URL `/assets/<dir>/...`. `[VERIFIED: delete∩keep basename collision set]`
- **Failing awards because `hidden`:** `#awards` ships with `hidden` — parity = stay hidden (UI-SPEC §3).
- **Restoring Phase 5 files to “fix” visuals.**
- **Using `mockups/` screenshots as pass/fail baseline** (D-03).
- **Naïve regex on `home-html.ts` without stripping `\`:** produces fake missing paths like `laurel-wreath.svg\`. `[VERIFIED: research false-positive run]`
- **Installing Playwright/Vitest as Wave 0 for this phase** — no harness exists; script+build is sufficient automated layer.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Full visual regression AI | Custom pixel diff / Percy | Structured checklist + optional screenshots | Overkill; D-01 explicitly hybrid checklist |
| Asset graph database | Custom dependency DB | One-shot extract + set diffs vs inventory/DELETE-LIST | Phase 2/5 already proved this model |
| Re-init React hero via vanilla `#site-nav` | Bridge DOM IDs into CinematicHero | Leave no-op; test React nav anchors | Pre-existing architecture; not prune-caused |
| CSS url parser from scratch | Simple `url(...)` regex + strip query | Same as Phase 2 | Only ~10 `url(/assets/...)` hits in served CSS |

**Key insight:** Parity risk after prune is almost entirely **broken static paths** and **init throwing**; both are cheaper to catch with path-aware sets + build than with a new test framework.

## Common Pitfalls

### Pitfall 1: Escape-backslash false missings
**What goes wrong:** Extractor reports dozens of “missing” assets that actually exist.
**Why it happens:** `home-html.ts` stores HTML in a double-quoted TS string with `\"`, so naive capture groups keep a trailing `\`.
**How to avoid:** Strip trailing backslashes after match; charset-limit paths to `[A-Za-z0-9_./\-]`.
**Warning signs:** Missing paths ending in `\` or counts ≫ 82.

### Pitfall 2: Basename collisions
**What goes wrong:** Script flags “deleted asset still referenced” incorrectly.
**Why it happens:** Same filename under different folders (e.g. deleted `markets-reach/commodities.svg` vs keep `trader-community/icons/commodities.svg`).
**How to avoid:** Path-aware equality only; for DELETE-LIST checks use full relative path.
**Warning signs:** Collisions listed in research: `commodities.svg`, `discord.svg`, `funding.png`, `mist-bg.jpg`.

### Pitfall 3: CSS `url()` with cache-bust query
**What goes wrong:** Disk check looks for `sanctuary-close-mobile.webp?v=110` literally.
**Why it happens:** Served CSS includes `?v=110` / `?v=117` on footer/sanctuary images.
**How to avoid:** Split on `?` / `#` before mapping to `web/public/...`.
**Warning signs:** Missing only on CSS-referenced sanctuary/footer assets.

### Pitfall 4: Hidden sections treated as layout failures
**What goes wrong:** UAT fails awards for “not visible.”
**Why it happens:** `#awards` has `hidden` attribute by design.
**How to avoid:** Checklist row: “present in DOM, may remain hidden — N/A visual.”
**Warning signs:** Human notes “awards blank.”

### Pitfall 5: Next Image vs plain `<img>` / public paths
**What goes wrong:** Confusion that body images need `next/image` or `remotePatterns`.
**Why it happens:** Hero uses `next/image` with local `/assets/...`; body uses raw HTML `<img>`; remotePatterns only for pravatar/unsplash hosts (unused in current src grep).
**How to avoid:** Local public files use root-relative `/...` paths; no import path under `public/`. `[CITED: Context7 Next.js public folder / Image docs]`
**Warning signs:** Trying to `import` from `../public/assets`.

### Pitfall 6: `public/` vs `/assets/` mental model
**What goes wrong:** Checker looks for `web/src/assets/...` or `web/public/public/assets`.
**Why it happens:** URL `/assets/foo` ↔ file `web/public/assets/foo`.
**How to avoid:** Always normalize URL → `web/public` + URL path.

### Pitfall 7: Pre-existing vanilla init dead code
**What goes wrong:** Checklist fails because `#site-nav` / `data-xhero` absent.
**Why it happens:** React hero replaced vanilla chrome; init still contains those IIFEs with early return.
**How to avoid:** Scope interactions to UI-SPEC table (nav anchors in React, marquees, markets platform tabs, quotes/dashboard/ecosystem tabs).
**Warning signs:** Console empty but “site-nav missing” noted as regression.

### Pitfall 8: Fixing non-prune issues
**What goes wrong:** Phase expands into redesign/copy edits.
**Why it happens:** Visual quirks noticed during UAT.
**How to avoid:** D-04 — prune-caused missing refs only; else notes-only.

## Code Examples

### Extract + assert (Node sketch)
```javascript
// Source: research validation pattern aligned with Phase 2 scan sources
import fs from "node:fs";
import path from "node:path";

const roots = ["web/src"];
const cssFile = "web/public/mockups.css";
const deleteList = fs.readFileSync(
  ".planning/phases/05-prune-public-assets/05-DELETE-LIST.txt",
  "utf8"
).trim().split("\n").filter(Boolean);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const ASSET_RE = /\/(?:assets\/[A-Za-z0-9_./\-]+|mockups\.css)/g;
function normalize(raw) {
  let t = raw.split("?")[0].split("#")[0];
  while (t.endsWith("\\")) t = t.slice(0, -1);
  if (!(t.startsWith("/assets/") || t === "/mockups.css")) return null;
  return "web/public" + t;
}

const refs = new Set();
for (const file of [...walk("web/src"), cssFile]) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(ASSET_RE)) {
    const n = normalize(m[0]);
    if (n) refs.add(n);
  }
}

const missing = [...refs].filter((r) => !fs.existsSync(r));
const stillReferencedDeletes = [...refs].filter((r) => deleteList.includes(r));
if (missing.length || stillReferencedDeletes.length) {
  console.error({ missing, stillReferencedDeletes });
  process.exit(1);
}
console.log(`OK ${refs.size} refs; 0 missing; 0 delete refs`);
```

### Build proof
```bash
cd web && npm run build
```

### Optional production smoke
```bash
cd web && npm run build && npm run start -- -p 3000
# then browser: open http://localhost:3000/ — hero logo, #proof marquee, #markets tabs
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Guess-delete unused public assets | Inventory → RESCAN → DELETE-LIST → prune | Phases 2–5 (2026-09) | Phase 6 only verifies remaining live set |
| Vanilla hero + `data-xhero` video | React `CinematicHero` + PNG | Earlier migration / Phase 4 unlocks | Init hooks for video hero are dead; PNG keep path is SoT |
| Triple CSS copies | Served `web/public/mockups.css` only | Phase 3 deleted dead `web/src/styles/mockups.css` | Scan must use **served** CSS path |

**Deprecated/outdated:**
- Using `mockups/` or CONCERNS candidate tables as sole keep authority for runtime files.
- Expecting deleted assets (`hero.mp4`, `markets-reach/*`, etc.) to appear in UI.

## Recommended `06-01-PLAN.md` Task Breakdown (fine granularity)

Single plan file, autonomous-friendly, ordered:

| Task | Name | Output / verify |
|------|------|-----------------|
| T1 | Author `parity-ref-check` script (mjs or py) with normalize rules | Script committed under phase `scripts/` |
| T2 | Run Assert A — all refs exist on disk | exit 0; print ref count (≥ 80 expected) |
| T3 | Run Assert B — refs ∩ `05-DELETE-LIST` = ∅; each delete path `!exists` | exit 0 |
| T4 | Run Assert C — every `02-INVENTORY.json` `class=keep` path exists (optional: equals disk public file set) | exit 0 |
| T5 | `cd web && npm run build` | exit 0 |
| T6 | Write `06-PARITY-CHECKLIST.md` skeleton (hero + 21 sections + footer + widgets) | file exists; section ids match `home-html.ts` |
| T7 | Fill automated checklist rows from T2–T5 | Status=PASS for auto rows |
| T8 | Conditional: if Assert A fails on keep path → D-04 minimal caller fix → re-run T2–T5 | only if needed |
| T9 | Discretionary D-02: `next start` + browser snapshot (desktop; optional mobile width) | notes in checklist; skip if no browser tools |
| T10 | SUMMARY + note PROD-01 evidence pointers; list any `human_needed` visual rows | `06-01-SUMMARY.md` |

**Do not** split into multiple PLAN files unless planner finds hard dependency waves beyond this.

## Practical Checklist Structure

Recommended sections / rows (order from UI-SPEC / CONTEXT):

1. **Meta / automated**
   - Ref integrity script PASS
   - DELETE-LIST unreferenced + absent
   - Inventory keeps present
   - `npm run build` PASS
2. **Cinematic hero + nav** (`CinematicHero.tsx`)
   - Hero background `/assets/hero/Hero-background.png` loads
   - Logo `/assets/logo/logo-horizontal-reverse.svg` loads
   - Anchors: `#markets`, `#sessions`, `#accounts`, `#funding`, `#platforms`, `#dashboard`, `#copy-trading`, `#ecosystem`, `#why-dominion`, `#trust`, `#blogs`, `#final-cta`, `#top`
3. **Body sections** (each row: DOM present; keep images not broken; notes)
   - proof → awards*(hidden OK)* → sessions → markets → quotes → funding → trader-community → mrkt → mt5-simulator → how-it-works → accounts-focus → accounts → platforms → why-dominion → dashboard → trade-better → blogs → ecosystem → copy-trading → trust → final-cta → footer
4. **Widgets** (UI-SPEC interactions)
   - `[data-marquee]` tracks (proof / markets / trader-community) — no init throw
   - `#markets` `[data-platform]` tabs switch panel
   - Quotes `[data-quotes-tab]`
   - `#dashboard` `[data-dash-feature]` tabs
   - Ecosystem tabs (`role=tab` under `#ecosystem`) if present
5. **CSS backgrounds** (static scan covers paths; visual optional)
   - accounts-focus / accounts clarity BGs; sanctuary-close; footer images via `mockups.css`

## Browser Smoke Recommendation (D-02)

| Question | Recommendation |
|----------|----------------|
| Worth it? | **Yes, if browser MCP available** — ~10 minutes; catches CSS background 404s and client init errors static analysis can miss |
| Hard blocker? | **No** — D-02 discretionary; automated layer + checklist satisfy exit if smoke skipped |
| `next dev` vs `next start`? | Prefer **`build` then `next start`** for production-like static file serving |
| Scope | One desktop viewport: hero logo/BG, scroll to `#proof` marquee, click one `#markets` platform tab, one `#dashboard` tab; optional one mobile width |
| Do not | Stand up Playwright, full responsive matrix, or pixel diffs |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `next start` is slightly better than `next dev` for catching public asset 404s in smoke | Browser Smoke | Low — either still optional under D-02 |
| A2 | No new npm test runner should be introduced in Phase 6 | Standard Stack / Pitfalls | Low — if org later wants Playwright, Phase 10+ |

## Open Questions

1. **Who signs human visual rows?**
   - What we know: CONTEXT routes visual judgment to VERIFICATION `human_needed` / UAT.
   - What's unclear: Whether executor alone may mark visual PASS via browser screenshots.
   - Recommendation: Executor may mark PASS when D-02 screenshots attach; otherwise leave `human_needed` for verifier/user.

2. **Should ref-check script live under `.planning/.../scripts/` or `web/scripts/`?**
   - Recommendation: **phase dir** — keeps production app free of one-off cleanup tooling; Phase 10 lean push won't ship it inside `web/`.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | ref-check / npm | ✓ | v24.13.1 | — |
| npm | build | ✓ | 11.12.1 | — |
| Next.js (local) | build/start | ✓ | 16.3.4 | — |
| Python 3 | alternate extractor | ✓ | 3.14.3 | Use Node script instead |
| Browser MCP / IDE browser | D-02 smoke | ? session-dependent | — | Skip smoke; checklist + auto asserts only |
| Playwright / Vitest | — | ✗ not installed | — | Do not require |

**Missing dependencies with no fallback:** None for locked D-01 path.

**Missing dependencies with fallback:** Browser automation — skip D-02.

## Validation Architecture

> `workflow.nyquist_validation` is **true** in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None in repo — use **phase one-shot script + `npm run build`** as automated gate |
| Config file | none — Wave 0 = add `scripts/parity-ref-check.mjs` (or `.py`) |
| Quick run command | `node .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` |
| Full suite command | Same script + `cd web && npm run build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROD-01 | Referenced public assets exist | smoke/script | `node .../parity-ref-check.mjs` | ❌ Wave 0 |
| PROD-01 | Deleted assets unreferenced & absent | smoke/script | same (Assert B) | ❌ Wave 0 |
| PROD-01 | Keep inventory still on disk | smoke/script | same (Assert C) | ❌ Wave 0 |
| PROD-01 | Production build succeeds | build | `cd web && npm run build` | ✅ scripts in package.json |
| PROD-01 | Sections/widgets parity | manual / checklist | `06-PARITY-CHECKLIST.md` | ❌ Wave 0 |
| PROD-01 | Optional visual smoke | manual-optional | `next start` + browser | N/A |

### Sampling Rate

- **Per task commit:** Run ref-check after T1–T4; build after T5 or any D-04 fix
- **Per wave merge:** Full script + build
- **Phase gate:** Script green + build green + checklist file complete before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `.planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` (or `.py`) — covers PROD-01 automated asserts
- [ ] `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md` — covers section/widget UAT rows
- [ ] Framework install: **none** — do not add Vitest/Playwright for this phase

## Security Domain

> `security_enforcement` enabled (ASVS level 1).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Phase is static marketing verification |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (scripts) | Ref-check reads only fixed roots (`web/src`, `web/public/mockups.css`); no untrusted CLI path concat |
| V6 Cryptography | no | — |

### Known Threat Patterns for this phase

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal in one-shot script | Tampering | Resolve paths under repo root; reject `..` |
| Accidentally restoring deleted binaries from `mockups/` | Elevation of privilege / integrity | D-03/D-04 — never copy from `mockups/` to “fix” parity |
| Committing secrets while adding scripts | Information disclosure | No env secrets needed; script is filesystem-only |

## Sources

### Primary (HIGH confidence)

- Local codebase: `web/src/**`, `web/public/mockups.css`, `CinematicHero.tsx`, `DominionHome.tsx`, `mockups-main.js` — live extraction 2026-09-05
- `.planning/phases/02-asset-inventory/02-01-PLAN.md` — scan source + normalize rules
- `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` + `05-VERIFICATION.md` — delete SoT (55 paths)
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — keep=82 / delete=55
- `.planning/phases/06-parity-verification/06-CONTEXT.md` + `06-UI-SPEC.md` — locked decisions / contract
- Context7 `/vercel/next.js` — public folder + `next/image` local `/` paths
- `npm view next version` + `web/package.json` — 16.3.4
- `cd web && npm run build` — exit 0 re-verified this session

### Secondary (MEDIUM confidence)

- `.planning/codebase/TESTING.md` — no test runner; build/lint as verification
- `.planning/codebase/CONCERNS.md` — historical unreferenced candidates (superseded by Phase 5 completion)

### Tertiary (LOW confidence)

- Preference for `next start` over `next dev` for smoke fidelity `[ASSUMED]`

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions and build verified locally
- Architecture: HIGH — composition and scan sources verified in code + prior phases
- Pitfalls: HIGH — escape/basename/CSS query pitfalls reproduced in research scans

**Research date:** 2026-09-05
**Valid until:** 2026-10-05 (30 days; stack stable; re-run extract if `web/src` or public tree changes)

---

### Planner must_haves (suggested)

**truths:**
1. Path-aware ref-check reports 0 missing referenced `web/public` paths and 0 references to `05-DELETE-LIST.txt` paths
2. All 55 delete-list paths remain absent from disk; inventory keep paths remain present
3. `cd web && npm run build` exits 0
4. `06-PARITY-CHECKLIST.md` exists covering hero/nav, proof→final-cta (+ footer), and key widgets; automated rows marked from script/build
5. Any code change is D-04 minimal fix for prune-caused breaks only (or no code change if asserts already green)

**artifacts:**
- `.planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` (or `.py`)
- `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md`
- `.planning/phases/06-parity-verification/06-01-SUMMARY.md`

**key_links:**
- refs ← `web/src` + `web/public/mockups.css`
- delete gate ← `05-DELETE-LIST.txt`
- keep gate ← `02-INVENTORY.json`
- runtime composition ← `DominionHome.tsx` → `CinematicHero` + `homeHtml` + `initDominionMockups`
