# Dominion Markets Homepage Redesign — Floating Sanctuary

**Date:** 2026-08-07  
**Status:** Approved for wireframes (pending user review of this written spec)  
**Scope:** Homepage only (full site later)  
**Current site:** https://www.dominionmarkets.com/  
**Brand:** Dominion Markets Brand Board 2026 + Company Profile 2026

---

## 1. Goal

Completely redesign the Dominion Markets homepage into a modern **liquid glass** experience with expressive motion, while keeping institutional trust for a regulated brokerage. Delivery path: design examples → **HTML wireframes (no Figma)** → hi-fi UI mockups → production website.

---

## 2. Locked design decisions

| Decision | Choice |
| --- | --- |
| Concept | **Floating Sanctuary** |
| Glass system | **Hybrid** — navy liquid-glass hero; light milky-glass body |
| Motion | **Expressive liquid** — morphing edges, staggered scroll reveals, fluid CTA hover (premium, not gimmicky) |
| Wireframes | **HTML** in-browser (avoid Figma free-tier quota) |
| Scope (phase 1) | Homepage only |
| Media | Videos + charts required on the page (specific slots below) |

### Rejected alternatives

- Deep Glass Sanctuary (all-navy) — too heavy for long-form content readability  
- Light Crystal Terminal (all-light) — weaker “sanctuary” / brand presence in hero  
- Liquid Terminal Ribbon / Orbital Glass Stack — higher risk of clutter or abstraction for a regulated broker  

---

## 3. Brand system (non-negotiable)

### Color

| Token | Hex | Role |
| --- | --- | --- |
| Dominion Navy | `#1D3347` | Primary base, hero field, wordmark on light, footer |
| Market Green | `#47BD68` | CTAs, accents, data highlights, icon bars |
| Pure Black | `#000000` | High-contrast text where needed |
| Pure White | `#FFFFFF` | Reverse logo, light surfaces, space |

Usage ratio guidance from brand board: ~55% navy / 25% green accents in dark zones / white space as relief on light sections. No purple gradients. No cream/terracotta “AI default” palette.

### Typography

- **Headlines / titles:** Poppins (Medium → ExtraBold by hierarchy)  
- **Body / taglines:** Mont (production); Montserrat acceptable as web stand-in if Mont licensing is pending  
- Taglines: Mont SemiBold, uppercase, generous letter-spacing when used as institutional line  

### Voice

- Tagline (brand): **Your Trading Sanctuary**  
- Profile line (support): **Trade smarter. Trade with confidence.**  
- Tone: trustworthy, professional, empowering, accessible  
- Never: “get rich quick,” “guaranteed profits,” “risk-free trading”  

### Logo

- Horizontal lockup preferred in nav; reverse (white) on navy hero  
- Respect clear space = height of chart icon; do not recolor, stretch, or add glow/shadows to the mark  

---

## 4. Visual language — Floating Sanctuary

### Hero (navy glass)

- Full-bleed Dominion Navy atmosphere with soft Market Green light blooms and subtle market-chart glow (not a dashboard)  
- **Brand is a hero-level signal**, not nav-only  
- First viewport contains only: brand, one headline, one short supporting sentence, one CTA group, one dominant glass panel / atmospheric plane  
- **No** stats chips, promo badges, floating stickers, or account cards in the first viewport  
- One large floating frosted liquid-glass panel holds CTAs (and optionally the short support line)  

### Light body (milky glass)

- Soft cool mist backgrounds (`#E8EEF2` → white / pale navy tint) — not harsh pure-white glare  
- Glass modules are **milky / high-opacity frosted** so navy copy stays readable  
- Glass may glow at edges; **text never sits on washed-out transparency**  
- Layout mix:  
  - **Mist split (B)** — story / video / dashboard / copy-trading sections  
  - **Module row (A)** — account chooser  
  - **Large glass panel** — platforms  

### Reference inspiration (patterns only — not visual clones)

| Site | Borrow as pattern |
| --- | --- |
| Alchemy Markets | Markets coverage, account tiers, platforms, copy trading, 3-step start |
| FXIFY Futures | Dashboard showcase energy, metrics below fold, Discord CTA, dual CTAs |
| FundingPips | Clear how-it-works path, toolkit/dashboard focus, chooser clarity |

All sections use Dominion copy, brand, and Floating Sanctuary glass — not their layouts or styling.

---

## 5. Homepage information architecture

| # | Section | Layout | Content (from Company Profile 2026) | Media |
| --- | --- | --- | --- | --- |
| 1 | Nav | Frosted bar over navy | Logo; Trade / Accounts / Platforms / Tools / About; Log in; Open Account | — |
| 2 | Hero | Navy glass | Brand; *Your Trading Sanctuary*; support *Trade smarter. Trade with confidence.*; CTAs Open Account + Try Demo | Atmosphere only — **no video in first viewport** |
| 3 | Proof strip | Below fold | 50,000+ clients; 200+ instruments; ~30 ms execution; up to 500:1 leverage; FSC Mauritius | — |
| 4 | Markets | Mist split (B) | Forex, Indices, Commodities, Stocks, Crypto (+ funding access line) | **Interactive / illustrative chart** in glass |
| 5 | How it works | 3 steps | Register → Fund → Trade (Dominion copy) | Micro-motion / icons |
| 6 | Accounts | Module row (A) | Standard STP; ECN; ECN Institutional; Islamic | — |
| 7 | Platforms | Large glass panel | MetaTrader 5 + cTrader; charting, multi-device, algo, risk tools | **Video** — platform walkthrough |
| 8 | Dashboard / Toolkit | Mist split (B) | CRM: journal, sessions, statistics, account control, risk, projections, news/calendar | **Video or UI demo** + chart/stats |
| 9 | Ecosystem | Module / bento | Magic Keys; MT5 Simulator; Market Fluidity Education; deposit bonus; Discord | Optional short product clips |
| 10 | Copy trading | Mist split | Choose → Set → Copy → Monitor; benefits; example masters only with disclaimer | **Performance chart** + past-performance disclaimer |
| 11 | Trust / regulation | Calm strip | FSC Mauritius Investment Dealer **T2023340**; CMA UAE affiliate Dominion Financial Services L.L.C. **20200000425**; transparency pillars | — |
| 12 | Final CTA | Soft navy→light glass | Open Account / Contact | — |
| 13 | Footer | Navy | Links, Dubai contact, social, full risk disclaimer | — |

### Account module facts (for wireframe labels)

- **Standard STP** — beginner–intermediate; competitive spreads; no commissions  
- **ECN** — active/experienced; raw spreads + commission; DMA-style positioning  
- **ECN Institutional** — from $3.0 commission one way; min deposit $20,000; MT5 only  
- **Islamic** — 100% swap-free; all instruments  

### Compliance notes for content

- Copy-trading performance examples from the profile are **illustrative only**; always pair with “past performance is not indicative of future results.”  
- Leverage, execution speed, client counts, and licence numbers must match the profile (or later legal-approved updates) before production launch.  
- Footer must include CFD / leveraged instruments risk disclaimer from the profile.

---

## 6. Motion language

| Moment | Behavior |
| --- | --- |
| Hero load | Soft glass float + subtle refraction; brand and type fade/rise calmly |
| Scroll | Section staggered fade/slide with slight glass shear |
| CTA hover | Liquid morph / soft green edge response |
| Account modules | Gentle lift + green edge glow |
| Charts | Smooth draw-on or live-feeling update — not noisy tick spam |
| Video | Plays in glass frame; muted autoplay only where UX allows; visible controls |
| Reduced motion | Respect `prefers-reduced-motion`: replace morph/parallax with simple fades |

No endless decorative loops, confetti, or hype animations.

---

## 7. Responsive behavior

- **Desktop:** full hybrid composition; mist splits side-by-side  
- **Tablet:** splits stack; modules 2-up  
- **Mobile:** single column; hero matches approved mobile glass panel; sticky or compact frosted nav; charts/video full-width inside milky glass  

Touch targets ≥ 44px; CTAs remain primary green on navy and green on light.

---

## 8. Delivery phases

1. **Design examples** — done (hero desktop/mobile approved; light body contrast revised; mix C locked)  
2. **HTML wireframes** — structural homepage with real section order and profile-based copy placeholders; gray/glass blocks for video & chart slots; clickable nav anchors  
3. **Hi-fi UI mockups** — HTML/CSS visual fidelity of Floating Sanctuary (still pre-production)  
4. **Production website** — framework, CMS/hosting, real embeds (TradingView or equivalent charts, hosted video), analytics, SEO, legal review  

This document covers phase 1 design lock. Implementation plans start after user approval of this spec file.

---

## 9. Out of scope (phase 1)

- Inner pages (accounts detail, education hub, legal pages, partner pages)  
- Live trading account APIs  
- Full multilingual rollout  
- Exact production video assets (slots only until assets provided)  
- Figma source files  

---

## 10. Success criteria

- First viewport reads as one composition with **Dominion Markets** as the hero brand signal  
- Light sections keep **readable navy copy** on milky glass  
- Homepage includes clear slots for **charts and videos** without crowding the hero  
- Motion feels expressive and premium under 3 intentional patterns (load, scroll, hover)  
- Content maps to Company Profile 2026 without hype language  
- Wireframes ship as HTML (no Figma dependency)  

---

## 11. Open items for later (not blockers for wireframes)

- Final Mont webfont licensing vs Montserrat fallback  
- Real hero atmosphere art / video source files  
- Chart provider choice (e.g. TradingView widget vs custom)  
- Exact nav IA labels for full site when expanding beyond homepage  
)
