---
name: dominion-section-redesign
description: Redesign Dominion Markets website sections into Floating Sanctuary liquid-glass hi-fi mockups. Use when recreating old dominionmarkets.com sections, generating design options, mobile variants, or implementing glass UI in mockups/.
---

# Dominion Markets — Floating Sanctuary Section Redesign

Use this skill whenever recreating or adding homepage (and later site) sections for Dominion Markets in the liquid-glass **Floating Sanctuary** system.

## When to use

- User pastes / screenshots an old Dominion Markets section and asks to redesign it
- User asks for design options before implementation
- User asks how a chosen concept looks on mobile
- Implementing or polishing sections inside `mockups/`

## Is a skill the right tool?

**Yes** for this project: many old-site sections follow the same flow (options → mobile → implement). Encoding brand + glass + process here avoids drift.

Do **not** invent a new visual system per section. Extend Floating Sanctuary.

## Source of truth

1. Brand: `docs/brand/Dominion_Markets_Brand_Guidelines.md`
2. Design spec: `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md`
3. Working hi-fi: `mockups/` (`index.html`, `styles.css`, `main.js`, `assets/`)
4. Concept exports (optional): `mockups/concepts/`

## Locked design system

| Token | Value | Role |
| --- | --- | --- |
| Dominion Navy | `#1D3347` | Primary surfaces, headlines on light, footer |
| Market Green | `#47BD68` | CTAs, open/live states, accents, data |
| White | `#FFFFFF` | Light glass, reverse logo |
| Black | `#000000` | High-contrast support only |

**Type:** Poppins for titles/headlines; Montserrat as Mont fallback for body/taglines.

**Glass hybrid:**
- Hero / dark: navy atmosphere + thick reverse liquid glass
- Body: light milky glass, readable navy type, soft mist backgrounds

**Logo:**
- Use approved assets in `mockups/assets/logo/` only
- Reverse lockup on navy/dark; full-color on light
- Never redraw, recolor, stretch, or approximate the mark with CSS/text/icons
- Horizontal lockup ≥ 120px wide; isotype ≥ 24px; clear space ≈ chart-icon height

**Voice:** trustworthy, professional, empowering. Tagline: *Your Trading Sanctuary*. Never guaranteed-profit / risk-free / get-rich-quick claims.

**Avoid:** purple gradients, cream+terracotta “AI default,” broadsheet newspaper layouts, cluttered hero stats/chips, dark-mode body by default unless the section is intentionally navy.

## Mandatory workflow (do not skip)

### 1) Capture the old section

- Note structure, dynamic bits (API/live data), and required copy/legal
- For mockups: simulate dynamics with demo data; do not hard-wire production APIs unless asked

### 2) Offer 2–3 desktop concept images first

Generate labeled options (A / B / C) in Floating Sanctuary language before coding.

Typical option shapes:
- **A — Closest to old site** elevated into glass (safest continuity)
- **B — Mist-split / story layout** (copy + glass module)
- **C — Modular / more visual** (cards, floating modules)

Save under `mockups/concepts/` when useful. Present tradeoffs in a short table. **Stop and wait for the user’s pick.**

### 3) Mobile treatments for the chosen option

After desktop choice, show 2–3 mobile adaptations (e.g. stacked, 2-up grid, swipe carousel). Recommend one. **Wait for confirmation.**

### 4) Implement into hi-fi mockup

- Add/update section in `mockups/index.html`
- Style in `mockups/styles.css` (gloss: blur, specular edges, soft green open-state glow where appropriate)
- Behavior in `mockups/main.js` (tabs, timers, mock ticks, carousels)
- Bump stylesheet cache (`styles.css?v=N`)
- Keep one job per section; match surrounding Floating Sanctuary patterns
- Prefer official payment/brand logos as assets when available; do not invent trademark-inaccurate marks

### 5) Verify, commit, push, update PR

- Screenshot desktop + mobile of the new section
- Commit with a clear message; `git push -u origin <branch>`
- Update the existing PR for `cursor/floating-sanctuary-design-fdb2` (or current feature branch)
- Share preview URL + hard-refresh note

## Dynamics policy

| Phase | Behavior |
| --- | --- |
| Hi-fi mockup | Demo data OK (intervals, tab switches, countdown). Label as indicative if needed |
| Production later | Wire real APIs only when requested; keep UI contracts stable |

## Frontend design constraints (section UI)

- First viewport / hero rules from the design spec still apply site-wide
- Body sections: milky glass, navy type, Market Green accents
- Cards only when they hold interaction or dense data (quotes, sessions, payments)
- Motion: intentional (reveal, soft hover, live tick) — not noisy
- Responsive: desktop composition + confirmed mobile treatment

## Output checklist

- [ ] 2–3 desktop concepts shown and user picked
- [ ] Mobile treatment confirmed
- [ ] Brand/logo rules respected
- [ ] Implemented in `mockups/` with cache bump
- [ ] Dynamic demo behavior if the old section was live
- [ ] Screenshots + commit + push + PR update
- [ ] Preview link shared

## Anti-patterns

- Jumping straight to code without concept options (unless user explicitly says “just build X”)
- Recreating logos with SVG approximations
- Purple/glow spam / emoji clutter
- Packing stats and promo chips into the hero
- Changing the global design language mid-project
