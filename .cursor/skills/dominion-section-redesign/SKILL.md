---
name: dominion-section-redesign
description: Redesign Dominion Markets website sections in the Floating Sanctuary liquid-glass system. Use for old-site recreations, design options, mobile variants, archive hi-fi work (see 07-ARCHIVE.md), or production polish in web/.
---

# Dominion Markets — Floating Sanctuary Section Redesign

Use this skill whenever recreating or adding homepage (and later site) sections for Dominion Markets in the liquid-glass **Floating Sanctuary** system.

## When to use

- User pastes / screenshots an old Dominion Markets section and asks to redesign it
- User asks for design options before implementation
- User asks how a chosen concept looks on mobile
- Implementing or polishing sections in the hi-fi archive (sibling / `archive/mockups` checkout — see `07-ARCHIVE.md`) **or** production polish under `web/`

## Is a skill the right tool?

**Yes** for this project: many old-site sections follow the same flow (options → mobile → implement). Encoding brand + glass + process here avoids drift.

Do **not** invent a new visual system per section. Extend Floating Sanctuary.

## Source of truth

1. Brand: `docs/brand/Dominion_Markets_Brand_Guidelines.md`
2. Design spec: `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md`
3. Hi-fi design archive: see `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — branch `archive/mockups` + sibling repo (coordinates in that file). Do **not** treat in-repo `mockups/` as required SoT (tree may remain temporarily until Phase 9).
4. Production polish: `web/` (Next.js App Router)

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
- Use approved assets from the archive logo path (see `07-ARCHIVE.md`) or `web/public/assets/logo/` for production
- Reverse lockup on navy/dark; full-color on light
- Never redraw, recolor, stretch, or approximate the mark with CSS/text/icons
- Horizontal lockup ≥ 120px wide; isotype ≥ 24px; clear space ≈ chart-icon height

**Voice:** trustworthy, professional, empowering. Tagline: *Your Trading Sanctuary*. Never guaranteed-profit / risk-free / get-rich-quick claims.

**Avoid:** purple gradients, cream+terracotta “AI default,” broadsheet newspaper layouts, cluttered hero stats/chips, dark-mode body by default unless the section is intentionally navy.

## Mandatory workflow (do not skip)

### 1) Capture the old section

- Note structure, dynamic bits (API/live data), and required copy/legal
- For hi-fi: simulate dynamics with demo data; do not hard-wire production APIs unless asked

### 2) Offer 2–3 desktop concept images first

Generate labeled options (A / B / C) in Floating Sanctuary language before coding.

Typical option shapes:
- **A — Closest to old site** elevated into glass (safest continuity)
- **B — Mist-split / story layout** (copy + glass module)
- **C — Modular / more visual** (cards, floating modules)

Save under archive `concepts/` when useful. Present tradeoffs in a short table. **Stop and wait for the user’s pick.**

### 3) Mobile treatments for the chosen option

After desktop choice, show 2–3 mobile adaptations (e.g. stacked, 2-up grid, swipe carousel). Recommend one. **Wait for confirmation.**

### 4) Implement into hi-fi or production

Prefer implement/polish in the **archive working tree** (sibling / `archive/mockups` checkout — coordinates in `.planning/phases/07-archive-mockups/07-ARCHIVE.md`) **or** under `web/` when shipping to production.

For archive hi-fi:
- Add/update section HTML/CSS/JS in the archive checkout
- Bump stylesheet cache when applicable
- Keep one job per section; match surrounding Floating Sanctuary patterns

For production polish:
- Update the relevant paths under `web/` (App Router, styles, content modules)
- Prefer official payment/brand logos as assets when available; do not invent trademark-inaccurate marks
- Logo assets: archive assets path or `web/public/assets/` — not in-repo `mockups/assets/logo/` as mandatory SoT

### 5) Verify, commit, push, update PR

- Screenshot desktop + mobile of the new section
- Commit with a clear message; `git push -u origin <branch>` when shipping (do not push archive tip unless asked)
- Update the existing PR for the current feature branch
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
- [ ] Implemented in archive working tree and/or `web/` (not requiring in-repo `mockups/` as SoT)
- [ ] Dynamic demo behavior if the old section was live
- [ ] Screenshots + commit + push + PR update (as appropriate)
- [ ] Preview link shared

## Anti-patterns

- Jumping straight to code without concept options (unless user explicitly says “just build X”)
- Recreating logos with SVG approximations
- Purple/glow spam / emoji clutter
- Packing stats and promo chips into the hero
- Changing the global design language mid-project
- Treating in-repo `mockups/` as required design SoT after Phase 7 archive
