# Phase 6: Parity UI Contract

**Status:** locked (parity verification — not a redesign)  
**Phase:** 06-parity-verification  
**Requirement:** PROD-01

> This UI-SPEC is an **acceptance / parity contract** for existing shipped UI after asset prune. It does **not** introduce new visual design, tokens, or layouts.

## 1. Purpose

Confirm the live Next.js homepage still presents remaining content correctly: no missing keep assets, no layout collapse from deleted files, hero/nav + body sections + mockups widgets still operable.

## 2. Surfaces in scope

| Surface | Source | Must be true |
|---------|--------|--------------|
| Cinematic hero + nav | `CinematicHero.tsx` | Hero background / logo keep assets load; nav anchors reach body sections |
| Body sections | `home-html.ts` + `mockups.css` | Each shipped `<section>` renders without broken images for keep paths |
| Client widgets | `mockups-main.js` | Init runs without throwing; marquees/tabs that remain in HTML still function |

### Body sections (checklist order)

proof → awards → sessions → markets → quotes → funding → trader-community → mrkt → mt5-simulator → how-it-works → accounts-focus → accounts → platforms → why-dominion → dashboard → trade-better → blogs → ecosystem → copy-trading → trust → final-cta (+ footer in HTML)

## 3. Visual / layout rules (parity, not redesign)

- **No new components** unless required to fix a prune-caused break (D-04).
- **No token/palette changes** — Floating Sanctuary / existing CSS remain SoT for body.
- **Hidden sections** (e.g. `hidden` attribute on awards) may stay hidden — parity means “same as pre-prune shipping behavior,” not “unhide everything.”
- **Missing media** for a keep path = FAIL. Missing media for a Phase 5 deleted path = expected / N/A.

## 4. Interaction contract

| Interaction | Expectation |
|-------------|-------------|
| Nav / in-page anchors | Scroll or focus target section ids that still exist |
| Marquee (`data-marquee`) | Track present; no console-breaking init error |
| Dashboard / ecosystem tabs (if in DOM) | Tab switch updates visible panel without blanking whole page |
| Final CTA / footer links | Href present; no 404 for local keep assets |

## 5. Copy

Do not change marketing copy in this phase. Copy edits are out of scope unless a string literally references a deleted asset path.

## 6. Responsive

Spot-check at one desktop and one mobile width only if browser smoke runs (D-02). Automated layer does not require responsive matrix.

## 7. Anti-goals

- No redesign of hero or body
- No restoring Phase 5 deleted assets
- No treating `mockups/` as runtime SoT
- No full React rewrite of `home-html.ts`

## 8. Exit criteria (maps to PROD-01)

1. Automated ref integrity + `npm run build` green  
2. Parity checklist completed for hero + shipped sections + key widgets  
3. Any prune-caused breaks fixed minimally, or phase fails until fixed  

---

*UI contract for Phase 6 parity — 2026-09-05*
