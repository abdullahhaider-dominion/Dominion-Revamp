# Phase 2 Asset Inventory (`web/public`)

**Requirement:** ASSET-01  
**Generated:** 2026-09-05  
**Scan sources:** `web/src/**` (incl. `home-html.ts`, `mockups-main.js`) + `web/public/mockups.css`  
**Ambiguity rules:** comment-only → keep; unresolved dynamic → keep with note  
**Deletes this phase:** none — inventory artifacts only (Phase 5 consumes delete list)

## Summary

| Metric | Count |
|--------|------:|
| Total files | 137 |
| Keep | 82 |
| Delete candidates | 55 |
| Delete bytes | 34,209,521 (32.62 MB) |

### Known live keep anchors (verified present + keep)

- `web/public/assets/hero/Hero-background.png` — **keep** (2.06 MB) — web/src/components/CinematicHero.tsx:/assets/hero/Hero-background.png
- `web/public/assets/logo/logo-horizontal-reverse.svg` — **keep** (11.8 KB) — web/src/components/CinematicHero.tsx:/assets/logo/logo-horizontal-reverse.svg
- `web/public/assets/logo/logo-isotype-app.png` — **keep** (1.2 KB) — web/src/app/layout.tsx:/assets/logo/logo-isotype-app.png
- `web/public/mockups.css` — **keep** (287.7 KB) — web/src/app/layout.tsx:/mockups.css

Body `/assets/...` refs from `home-html.ts` and `url(.../assets/...)` in `mockups.css` are included in the Keep table below. Platform badges (`mt5-official.png`, `ctrader-official.png`) classified from `mockups-main.js` when present.

## Keep

| Path | Size | Bytes | Evidence |
|------|------|------:|----------|
| `web/public/assets/accounts-clarity-bg.png` | 1.78 MB | 1,867,516 | web/public/mockups.css:/assets/accounts-clarity-bg.png |
| `web/public/assets/accounts-focus-bg.png` | 1.48 MB | 1,556,031 | web/public/mockups.css:/assets/accounts-focus-bg.png |
| `web/public/assets/awards/laurel-wreath.svg` | 8.4 KB | 8,592 | web/src/components/CinematicHero.tsx:/assets/awards/laurel-wreath.svg |
| `web/public/assets/blogs/featured-xau.png` | 1.32 MB | 1,386,827 | web/src/content/home-html.ts:/assets/blogs/featured-xau.png |
| `web/public/assets/blogs/mist-bg.jpg` | 233.6 KB | 239,192 | web/src/content/home-html.ts:/assets/blogs/mist-bg.jpg |
| `web/public/assets/blogs/thumb-global.png` | 1.58 MB | 1,656,675 | web/src/content/home-html.ts:/assets/blogs/thumb-global.png |
| `web/public/assets/blogs/thumb-inflation.png` | 2.00 MB | 2,098,558 | web/src/content/home-html.ts:/assets/blogs/thumb-inflation.png |
| `web/public/assets/blogs/thumb-risk.png` | 1.22 MB | 1,274,961 | web/src/content/home-html.ts:/assets/blogs/thumb-risk.png |
| `web/public/assets/dashboard/dashboard-preview.jpg` | 65.6 KB | 67,136 | web/src/content/home-html.ts:/assets/dashboard/dashboard-preview.jpg |
| `web/public/assets/dashboard/dashboard-preview.webp` | 36.4 KB | 37,270 | web/src/content/home-html.ts:/assets/dashboard/dashboard-preview.webp |
| `web/public/assets/features/features-bento-bg.jpg` | 1.87 MB | 1,962,195 | web/src/content/home-html.ts:/assets/features/features-bento-bg.jpg |
| `web/public/assets/features/features-devices-platforms.png` | 1.62 MB | 1,702,560 | web/src/content/home-html.ts:/assets/features/features-devices-platforms.png |
| `web/public/assets/features/features-phones-spreads.png` | 1.08 MB | 1,136,754 | web/src/content/home-html.ts:/assets/features/features-phones-spreads.png |
| `web/public/assets/features/features-tile-commission.jpg` | 1.32 MB | 1,385,459 | web/src/content/home-html.ts:/assets/features/features-tile-commission.jpg |
| `web/public/assets/features/features-tile-discord.jpg` | 1.23 MB | 1,289,943 | web/src/content/home-html.ts:/assets/features/features-tile-discord.jpg |
| `web/public/assets/features/features-tile-execution.jpg` | 1.07 MB | 1,126,704 | web/src/content/home-html.ts:/assets/features/features-tile-execution.jpg |
| `web/public/assets/features/features-tile-platforms-bg.jpg` | 1.74 MB | 1,822,770 | web/src/content/home-html.ts:/assets/features/features-tile-platforms-bg.jpg |
| `web/public/assets/features/features-tile-withdrawals.jpg` | 1.18 MB | 1,235,319 | web/src/content/home-html.ts:/assets/features/features-tile-withdrawals.jpg |
| `web/public/assets/features/icons/bolt.svg` | 135 B | 135 | web/src/content/home-html.ts:/assets/features/icons/bolt.svg |
| `web/public/assets/features/icons/devices.svg` | 334 B | 334 | web/src/content/home-html.ts:/assets/features/icons/devices.svg |
| `web/public/assets/features/icons/discord.svg` | 575 B | 575 | web/src/content/home-html.ts:/assets/features/icons/discord.svg |
| `web/public/assets/features/icons/percent.svg` | 303 B | 303 | web/src/content/home-html.ts:/assets/features/icons/percent.svg |
| `web/public/assets/features/icons/sliders.svg` | 215 B | 215 | web/src/content/home-html.ts:/assets/features/icons/sliders.svg |
| `web/public/assets/features/icons/wallet.svg` | 273 B | 273 | web/src/content/home-html.ts:/assets/features/icons/wallet.svg |
| `web/public/assets/footer/footer-desktop.jpg` | 152.5 KB | 156,124 | web/public/mockups.css:/assets/footer/footer-desktop.jpg |
| `web/public/assets/footer/footer-desktop.webp` | 104.6 KB | 107,142 | web/public/mockups.css:/assets/footer/footer-desktop.webp |
| `web/public/assets/footer/footer-mobile.jpg` | 114.9 KB | 117,686 | web/public/mockups.css:/assets/footer/footer-mobile.jpg |
| `web/public/assets/footer/footer-mobile.webp` | 69.9 KB | 71,560 | web/public/mockups.css:/assets/footer/footer-mobile.webp |
| `web/public/assets/funding/mist-bg.jpg` | 2.17 MB | 2,275,204 | web/src/content/home-html.ts:/assets/funding/mist-bg.jpg |
| `web/public/assets/hero/Hero-background.png` | 2.06 MB | 2,164,492 | web/src/components/CinematicHero.tsx:/assets/hero/Hero-background.png |
| `web/public/assets/how-start/funding.png` | 17.6 KB | 18,032 | web/src/content/home-html.ts:/assets/how-start/funding.png |
| `web/public/assets/how-start/mist-bg.jpg` | 2.17 MB | 2,275,204 | web/src/content/home-html.ts:/assets/how-start/mist-bg.jpg |
| `web/public/assets/how-start/register.png` | 12.4 KB | 12,690 | web/src/content/home-html.ts:/assets/how-start/register.png |
| `web/public/assets/how-start/trade.png` | 19.1 KB | 19,581 | web/src/content/home-html.ts:/assets/how-start/trade.png |
| `web/public/assets/logo/logo-horizontal-color-transparent.png` | 111.7 KB | 114,408 | web/src/content/home-html.ts:/assets/logo/logo-horizontal-color-transparent.png |
| `web/public/assets/logo/logo-horizontal-reverse.svg` | 11.8 KB | 12,066 | web/src/components/CinematicHero.tsx:/assets/logo/logo-horizontal-reverse.svg |
| `web/public/assets/logo/logo-isotype-app.png` | 1.2 KB | 1,210 | web/src/app/layout.tsx:/assets/logo/logo-isotype-app.png |
| `web/public/assets/logo/logo-isotype.png` | 22.3 KB | 22,879 | web/src/content/home-html.ts:/assets/logo/logo-isotype.png |
| `web/public/assets/mrkt/mrktedge-mark.svg` | 354 B | 354 | web/src/content/home-html.ts:/assets/mrkt/mrktedge-mark.svg |
| `web/public/assets/payments/icons/applepay.svg` | 935 B | 935 | web/src/content/home-html.ts:/assets/payments/icons/applepay.svg |
| `web/public/assets/payments/icons/bitcoin.png` | 5.7 KB | 5,846 | web/src/content/home-html.ts:/assets/payments/icons/bitcoin.png |
| `web/public/assets/payments/icons/crypto-badge.png` | 1.1 KB | 1,169 | web/src/content/home-html.ts:/assets/payments/icons/crypto-badge.png |
| `web/public/assets/payments/icons/ethereum.png` | 8.5 KB | 8,712 | web/src/content/home-html.ts:/assets/payments/icons/ethereum.png |
| `web/public/assets/payments/icons/googlepay.svg` | 1.0 KB | 1,043 | web/src/content/home-html.ts:/assets/payments/icons/googlepay.svg |
| `web/public/assets/payments/icons/mastercard.png` | 9.1 KB | 9,315 | web/src/content/home-html.ts:/assets/payments/icons/mastercard.png |
| `web/public/assets/payments/icons/neteller.png` | 13.1 KB | 13,385 | web/src/content/home-html.ts:/assets/payments/icons/neteller.png |
| `web/public/assets/payments/icons/skrill.png` | 12.8 KB | 13,099 | web/src/content/home-html.ts:/assets/payments/icons/skrill.png |
| `web/public/assets/payments/icons/tether.png` | 909 B | 909 | web/src/content/home-html.ts:/assets/payments/icons/tether.png |
| `web/public/assets/payments/icons/visa.png` | 12.2 KB | 12,491 | web/src/content/home-html.ts:/assets/payments/icons/visa.png |
| `web/public/assets/platforms/ctrader-official.png` | 12.4 KB | 12,693 | web/src/content/home-html.ts:/assets/platforms/ctrader-official.png |
| `web/public/assets/platforms/mt5-official.png` | 35.3 KB | 36,126 | web/src/content/home-html.ts:/assets/platforms/mt5-official.png |
| `web/public/assets/platforms/platforms-mist-water-hero.jpg` | 2.02 MB | 2,113,720 | web/src/content/home-html.ts:/assets/platforms/platforms-mist-water-hero.jpg |
| `web/public/assets/regulatory/world-map.svg` | 125.9 KB | 128,967 | web/src/content/home-html.ts:/assets/regulatory/world-map.svg |
| `web/public/assets/sanctuary-close/sanctuary-close-desktop.jpg` | 142.5 KB | 145,964 | web/public/mockups.css:/assets/sanctuary-close/sanctuary-close-desktop.jpg |
| `web/public/assets/sanctuary-close/sanctuary-close-desktop.webp` | 78.3 KB | 80,190 | web/public/mockups.css:/assets/sanctuary-close/sanctuary-close-desktop.webp |
| `web/public/assets/sanctuary-close/sanctuary-close-mobile.jpg` | 147.6 KB | 151,146 | web/public/mockups.css:/assets/sanctuary-close/sanctuary-close-mobile.jpg |
| `web/public/assets/sanctuary-close/sanctuary-close-mobile.webp` | 88.1 KB | 90,224 | web/public/mockups.css:/assets/sanctuary-close/sanctuary-close-mobile.webp |
| `web/public/assets/sessions/icon-asia.png` | 8.5 KB | 8,717 | web/src/content/home-html.ts:/assets/sessions/icon-asia.png |
| `web/public/assets/sessions/icon-london.png` | 10.5 KB | 10,718 | web/src/content/home-html.ts:/assets/sessions/icon-london.png |
| `web/public/assets/sessions/icon-newyork.png` | 8.6 KB | 8,827 | web/src/content/home-html.ts:/assets/sessions/icon-newyork.png |
| `web/public/assets/sessions/world-map-bg.jpg` | 91.2 KB | 93,418 | web/src/content/home-html.ts:/assets/sessions/world-map-bg.jpg |
| `web/public/assets/skylines/skyline-asia.jpg` | 82.1 KB | 84,055 | web/src/content/home-html.ts:/assets/skylines/skyline-asia.jpg |
| `web/public/assets/skylines/skyline-london.jpg` | 43.4 KB | 44,449 | web/src/content/home-html.ts:/assets/skylines/skyline-london.jpg |
| `web/public/assets/skylines/skyline-newyork.jpg` | 154.7 KB | 158,398 | web/src/content/home-html.ts:/assets/skylines/skyline-newyork.jpg |
| `web/public/assets/trade-better/icons/bull-hologram.png` | 1.00 MB | 1,052,277 | web/src/content/home-html.ts:/assets/trade-better/icons/bull-hologram.png |
| `web/public/assets/trade-better/icons/discord-badge.svg` | 993 B | 993 | web/src/content/home-html.ts:/assets/trade-better/icons/discord-badge.svg |
| `web/public/assets/trade-better/icons/mk-badge-rail.svg` | 793 B | 793 | web/src/content/home-html.ts:/assets/trade-better/icons/mk-badge-rail.svg |
| `web/public/assets/trade-better/icons/mk-badge.svg` | 834 B | 834 | web/src/content/home-html.ts:/assets/trade-better/icons/mk-badge.svg |
| `web/public/assets/trade-better/pedestal.svg` | 2.8 KB | 2,899 | web/src/content/home-html.ts:/assets/trade-better/pedestal.svg |
| `web/public/assets/trade-better/spotlight-bg.jpg` | 49.7 KB | 50,872 | web/src/content/home-html.ts:/assets/trade-better/spotlight-bg.jpg |
| `web/public/assets/trader-community/avatars/avatar-1.jpg` | 6.7 KB | 6,899 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-1.jpg |
| `web/public/assets/trader-community/avatars/avatar-2.jpg` | 7.7 KB | 7,890 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-2.jpg |
| `web/public/assets/trader-community/avatars/avatar-3.jpg` | 8.5 KB | 8,687 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-3.jpg |
| `web/public/assets/trader-community/avatars/avatar-4.jpg` | 6.2 KB | 6,329 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-4.jpg |
| `web/public/assets/trader-community/avatars/avatar-5.jpg` | 6.9 KB | 7,102 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-5.jpg |
| `web/public/assets/trader-community/avatars/avatar-6.jpg` | 7.8 KB | 7,938 | web/src/content/home-html.ts:/assets/trader-community/avatars/avatar-6.jpg |
| `web/public/assets/trader-community/icons/commodities.svg` | 269 B | 269 | web/src/content/home-html.ts:/assets/trader-community/icons/commodities.svg |
| `web/public/assets/trader-community/icons/crypto.svg` | 394 B | 394 | web/src/content/home-html.ts:/assets/trader-community/icons/crypto.svg |
| `web/public/assets/trader-community/icons/forex.svg` | 328 B | 328 | web/src/content/home-html.ts:/assets/trader-community/icons/forex.svg |
| `web/public/assets/trader-community/icons/indices.svg` | 194 B | 194 | web/src/content/home-html.ts:/assets/trader-community/icons/indices.svg |
| `web/public/assets/trader-community/icons/stocks.svg` | 319 B | 319 | web/src/content/home-html.ts:/assets/trader-community/icons/stocks.svg |
| `web/public/mockups.css` | 287.7 KB | 294,589 | web/src/app/layout.tsx:/mockups.css |

## Delete candidates

Do **not** delete in this phase. Phase 5 consumes this list.

| Path | Size | Bytes | Evidence |
|------|------|------:|----------|
| `web/public/assets/hero/hero.mp4` | 15.73 MB | 16,489,618 | no match in web/src or web/public/mockups.css |
| `web/public/assets/blogs/mist-bg.png` | 2.23 MB | 2,342,812 | no match in web/src or web/public/mockups.css |
| `web/public/assets/awards/mist-bg.jpg` | 2.17 MB | 2,275,204 | no match in web/src or web/public/mockups.css |
| `web/public/assets/markets-reach/mist-bg.jpg` | 2.17 MB | 2,275,204 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mrkt/mist-bg.jpg` | 2.17 MB | 2,275,204 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mt5-sim/mist-bg.jpg` | 2.17 MB | 2,275,204 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mrkt/product-collage.png` | 1.81 MB | 1,900,666 | no match in web/src or web/public/mockups.css |
| `web/public/assets/hero/hero-media.png` | 1.74 MB | 1,826,816 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mt5-sim/mt5_section.png` | 448.1 KB | 458,895 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/platforms-mist-water.jpg` | 337.0 KB | 345,109 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mt5-sim/mt5_trading.png` | 271.0 KB | 277,520 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/same-day-withdrawls-03.png` | 177.5 KB | 181,778 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/ctrader-logo2.png` | 129.6 KB | 132,716 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/download-ctrader-logo.png` | 129.6 KB | 132,716 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons-new-01.png` | 121.8 KB | 124,735 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mrkt/product-collage.webp` | 101.5 KB | 103,942 | no match in web/src or web/public/mockups.css |
| `web/public/assets/logo/logo-horizontal-color.png` | 97.0 KB | 99,301 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons-01.png` | 85.7 KB | 87,714 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons-darkmode-01.png` | 85.1 KB | 87,141 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/dm-payment-options.png` | 70.9 KB | 72,577 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/dm-payment-options-darkmode.png` | 70.1 KB | 71,822 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mt5-sim/mt5Logo.png` | 35.5 KB | 36,349 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons-darkmode.png` | 34.6 KB | 35,428 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/mt5-lockup.png` | 27.0 KB | 27,619 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons-new-01-00.png` | 26.5 KB | 27,136 | no match in web/src or web/public/mockups.css |
| `web/public/assets/mt5-sim/mt5Logo-transparent.png` | 24.9 KB | 25,459 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/pay-icons.png` | 23.5 KB | 24,082 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/icons/crypto-pair.png` | 22.5 KB | 23,082 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/mt5-icon.png` | 21.7 KB | 22,222 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/icons/googlepay.png` | 15.4 KB | 15,725 | no match in web/src or web/public/mockups.css |
| `web/public/assets/platforms/ctrader-lockup.png` | 14.7 KB | 15,079 | no match in web/src or web/public/mockups.css |
| `web/public/assets/.DS_Store` | 14.0 KB | 14,340 | OS junk; not a runtime asset |
| `web/public/assets/platforms/ctrader-icon.png` | 10.3 KB | 10,529 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/ethereum_icon.png` | 8.9 KB | 9,103 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/icons/upi.png` | 8.4 KB | 8,613 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/icons/mastercard-circles.png` | 7.7 KB | 7,930 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/mastercard-logo.png` | 6.9 KB | 7,098 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/visa-logo.png` | 6.3 KB | 6,483 | no match in web/src or web/public/mockups.css |
| `web/public/.DS_Store` | 6.0 KB | 6,148 | OS junk; not a runtime asset |
| `web/public/assets/payments/mastercard_icon.png` | 5.9 KB | 6,091 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-3.webp` | 5.3 KB | 5,476 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-6.webp` | 4.8 KB | 4,898 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/bitcoin_icon.png` | 4.7 KB | 4,802 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-2.webp` | 4.6 KB | 4,754 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-5.webp` | 3.9 KB | 3,998 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-1.webp` | 3.9 KB | 3,966 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/mastercard.svg` | 3.4 KB | 3,431 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trader-community/avatars/avatar-4.webp` | 3.3 KB | 3,380 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/funding.png` | 2.8 KB | 2,878 | no match in web/src or web/public/mockups.css |
| `web/public/assets/trade-better/icons/bull-wire.svg` | 2.1 KB | 2,153 | no match in web/src or web/public/mockups.css |
| `web/public/assets/markets-reach/commodities.svg` | 1.0 KB | 1,024 | no match in web/src or web/public/mockups.css |
| `web/public/assets/payments/visa.svg` | 1004 B | 1,004 | no match in web/src or web/public/mockups.css |
| `web/public/assets/awards/laurel.svg` | 888 B | 888 | no match in web/src or web/public/mockups.css |
| `web/public/assets/markets-reach/currencies.svg` | 865 B | 865 | no match in web/src or web/public/mockups.css |
| `web/public/assets/markets-reach/discord.svg` | 794 B | 794 | no match in web/src or web/public/mockups.css |

---

*Evidence cites only `web/src` and/or `web/public/mockups.css` — never `mockups/` or `docs/` as keep proof.*
