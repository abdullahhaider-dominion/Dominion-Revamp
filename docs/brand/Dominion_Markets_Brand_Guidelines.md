---
title: Dominion Markets Brand Guidelines
brand: Dominion Markets
document_type: brand-guidelines
source_file: Brand_Board_Dominion_Markets.pdf
source_year: 2026
website: https://dominionmarkets.com
language: en
status: approved-reference
---

# Dominion Markets Brand Guidelines

This file is a coding-agent-friendly transcription of the 2026 Dominion Markets brand board. Use it as the source of truth when designing or implementing Dominion Markets websites, landing pages, user interfaces, social assets, and marketing materials.

## Quick implementation rules

1. Use Dominion Navy as the main brand surface and Market Green as the accent.
2. Use Poppins for titles and headlines.
3. Use licensed Mont by Fontfabric for taglines and body copy. Montserrat may be used only as a specimen/fallback when Mont is unavailable; it is not the designated production typeface.
4. Keep the tone trustworthy, professional, empowering, accessible, and free from hype.
5. Never make guaranteed-profit, risk-free, or get-rich-quick claims.
6. Preserve the supplied logo artwork. Do not redraw, recolor, distort, or separate its elements.
7. Include the regulatory and risk wording in contexts where legal disclosure is required.

## Brand essence

### Tagline

> YOUR TRADING SANCTUARY

### Positioning statement

A safe, transparent and professional environment where traders operate with confidence - authority without hype.

## Logo system

The identity contains a chart-and-arrow isotype, a `DOMINION MARKETS` wordmark, and the tagline `YOUR TRADING SANCTUARY`.

### Approved variants

| Variant | Intended use |
| --- | --- |
| Primary horizontal lockup | Default logo on white or light backgrounds |
| Reverse logo | Dominion Navy, black, or sufficiently high-contrast photography |
| Secondary stacked lockup | Compact layouts that require a stacked composition |
| Isotype only | App icons, favicons, social avatars, and watermarks where the brand is already established |

### Clear space

- Keep a protection area around the logo equal to the height of the chart icon, identified as `X` in the source brand board.
- No text or graphic element may enter this clear-space zone.

### Minimum size

| Asset | Digital minimum | Print minimum |
| --- | ---: | ---: |
| Horizontal lockup | 120 px wide | 32 mm wide |
| Isotype | 24 px | 8 mm |

Do not use the logo below these sizes because legibility is compromised.

### Background rules

- Use the full-color logo on white or light backgrounds.
- Use the reverse white logo on Dominion Navy, black, or photography with sufficient contrast.
- Do not place the full-color logo on a low-contrast background.

### Prohibited logo treatments

- Do not stretch, condense, or rotate the logo.
- Do not change the brand colors or recolor the icon.
- Do not add drop shadows, glows, or outlines.
- Do not place the full-color logo on low-contrast backgrounds.
- Do not separate the arrow from the chart bars.
- Do not recreate the wordmark with another typeface.

> Implementation note: use an approved original SVG or raster asset. Do not approximate the logo with HTML, CSS, text, an icon library, or newly drawn vector paths.

## Color palette

| Token | Name | HEX | RGB | CMYK | Intended role | Usage ratio |
| --- | --- | --- | --- | --- | --- | ---: |
| `--dm-navy` | Dominion Navy | `#1D3347` | `29, 51, 71` | `59, 28, 0, 72` | Primary base; backgrounds, wordmark, and corporate surfaces | 55% |
| `--dm-white` | Pure White | `#FFFFFF` | `255, 255, 255` | `0, 0, 0, 0` | Space; light backgrounds, reverse logo, and clean layouts | 25% |
| `--dm-green` | Market Green | `#47BD68` | `71, 189, 104` | `62, 0, 45, 26` | Accent; growth, CTAs, highlights, data, and icon bars | 15% |
| `--dm-black` | Pure Black | `#000000` | `0, 0, 0` | `0, 0, 0, 100` | Support; text, contrast, and premium print applications | 5% |

The usage ratio describes the intended overall balance in a composition, not a mandatory per-component formula.

### CSS design tokens

```css
:root {
  --dm-navy: #1d3347;
  --dm-green: #47bd68;
  --dm-black: #000000;
  --dm-white: #ffffff;
}
```

### JSON design tokens

```json
{
  "color": {
    "dominionNavy": { "value": "#1D3347", "usageRatio": 0.55 },
    "pureWhite": { "value": "#FFFFFF", "usageRatio": 0.25 },
    "marketGreen": { "value": "#47BD68", "usageRatio": 0.15 },
    "pureBlack": { "value": "#000000", "usageRatio": 0.05 }
  }
}
```

## Typography

### Primary typeface: Poppins

Use Poppins for titles and headlines.

| Weight | Use |
| --- | --- |
| Poppins Medium | Subheads and labels |
| Poppins SemiBold | Section titles |
| Poppins Bold | Page headlines |
| Poppins ExtraBold | Hero statements |

### Secondary typeface: Mont

Use licensed Mont by Fontfabric for taglines and body copy.

- `Mont Regular`: body copy, captions, and long-form text.
- `Mont SemiBold`: taglines.
- Set taglines in uppercase with generous letter spacing to create an institutional, premium tone.

The brand board's type specimen is rendered in Montserrat, but licensed Mont by Fontfabric is the production typeface.

### Suggested web stack

```css
:root {
  --dm-font-heading: "Poppins", sans-serif;
  --dm-font-body: "Mont", "Montserrat", sans-serif;
}

h1,
h2,
h3,
.section-title,
.hero-title {
  font-family: var(--dm-font-heading);
}

body,
p,
.caption {
  font-family: var(--dm-font-body);
}

.tagline {
  font-family: var(--dm-font-body);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

> Licensing note: confirm that the project includes a valid Mont font license and approved font files before shipping. Do not fetch or redistribute Mont without authorization.

## Brand voice

### Voice pillars

| Pillar | Guidance |
| --- | --- |
| Trustworthy | Communicate regulated, transparent conditions. Say what the company does, and do what it says. |
| Professional | Use an institutional tone and precise data. Avoid hype and exaggerated claims. |
| Empowering | Present tools, incentives, and education that put the trader in control. |
| Accessible | Use clear language and communicate low barriers, from first deposit to expert level. |

### Approved messaging examples

- "Trade with institutional-grade conditions."
- "Transparent pricing, no fine print."

### Prohibited messaging examples

- "Get rich quick."
- "Guaranteed profits."
- "Risk-free trading."

### Copy checklist

- Prefer clear, direct sentences.
- Support statements with precise facts or data.
- Use authority without aggression or sensationalism.
- Avoid absolute promises, urgency-driven hype, and exaggerated performance claims.
- Make risk and regulatory information visible and legible where required.

## Official channels

| Channel | Value |
| --- | --- |
| Website | [dominionmarkets.com](https://dominionmarkets.com) |
| Instagram | `@dominionmarkets` |
| X / Twitter | `@DominionMktsLLC` |
| YouTube | `@DominionMarkets` |
| Email | `info@dominionmarkets.com` |
| Platforms | MetaTrader 5 and cTrader |

## Regulatory and risk wording

Use the following approved wording exactly unless the legal or compliance team provides a newer version:

> Dominion Markets Ltd is licensed and regulated by the Financial Services Commission of Mauritius as an Investment Dealer, Licence No. GB24203525.

> Trading leveraged instruments carries a high level of risk and may not be suitable for all investors.

## Coding-agent acceptance checklist

Before marking a Dominion Markets implementation complete, verify that:

- [ ] The primary surface color is Dominion Navy (`#1D3347`).
- [ ] Market Green (`#47BD68`) is used as an accent rather than the dominant surface.
- [ ] Pure White and Pure Black follow the intended supporting roles.
- [ ] Poppins is used for titles and headlines.
- [ ] Licensed Mont is used for body copy and taglines, or a clearly documented fallback is in place.
- [ ] Approved original logo assets are used without distortion or recoloring.
- [ ] Logo clear space and minimum sizes are respected.
- [ ] Full-color and reverse logos are chosen according to background contrast.
- [ ] Copy follows the four voice pillars.
- [ ] No guaranteed-profit, risk-free, or get-rich-quick claim appears.
- [ ] Regulatory and risk copy is included wherever required.
- [ ] Official contact handles and platform names match this document.

## Source fidelity

This Markdown file transcribes the content of `Brand_Board_Dominion_Markets.pdf`, titled **Dominion Markets - Brand Board**, created for 2026. The source PDF remains authoritative for the exact appearance and geometry of logo artwork. This transcription is authoritative for the written rules and values listed above unless a newer approved brand document supersedes it.
