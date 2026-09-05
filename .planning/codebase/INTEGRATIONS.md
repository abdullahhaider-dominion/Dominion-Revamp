# External Integrations

**Analysis Date:** 2026-09-05

## APIs & External Services

**Payment Processing:**
- Not applicable as code integrations — funding/payment brand marks are static assets under `web/public/assets/payments/` (and `mockups/assets/payments/`). No Stripe/PayPal/etc. SDKs or server-side payment APIs.

**Email/SMS:**
- Not detected

**External APIs (runtime data):**
- Not detected — no `fetch`, axios, GraphQL, or WebSocket clients in `web/src/` or `web/src/lib/mockups-main.js`
- Live-looking UI (quotes, sessions, MT5 simulator) uses client-side demo/mock timers in `web/src/lib/mockups-main.js` (ported from `mockups/main.js`)

**Outbound product / marketing links (HTML CTAs, not APIs):**
- Dominion trading app — `https://app.dominionmarkets.com/register`, `https://app.dominionmarkets.com/login` (embedded in `web/src/content/home-html.ts` / `mockups/index.html`)
- Corporate site — `https://www.dominionmarkets.com/`, blog, legal docs, MT5 simulator video (`https://www.dominionmarkets.com/videos/mt5-simulator.mp4`)
- Partner — `https://www.mrktedge.ai/`
- Community — Discord invite placeholder `https://discord.gg/REPLACE_WITH_INVITE`
- Social placeholders — Instagram, X, YouTube homepage URLs in footer markup

**Fonts (build-time / CDN):**
- Google Fonts via `next/font/google` — Inter, Montserrat, Poppins in `web/src/app/layout.tsx` (self-hosted by Next at build/runtime; no manual `<link>` in the Next app)
- Vanilla mockup still links Google Fonts CSS directly in `mockups/index.html`

**Remote image hosts (configured, unused in current markup):**
- `i.pravatar.cc` and `images.unsplash.com` allowed in `web/next.config.ts` `images.remotePatterns` for `next/image`
- No current references to those hosts in `web/src/` content (local assets under `/assets/` used instead)

## Data Storage

**Databases:**
- Not detected — no Prisma/Drizzle/SQL/NoSQL clients or connection strings

**File Storage:**
- Local filesystem only — static files in `web/public/` (copied/mirrored from `mockups/assets/`)
- Notable paths: `web/public/assets/hero/Hero-background.png`, `web/public/assets/logo/`, section image folders under `web/public/assets/`
- Repo-root `Hero-background.png` is a design asset; production hero uses `web/public/assets/hero/`

**Caching:**
- None (application-level). Next.js / `.next` build cache only

## Authentication & Identity

**Auth Provider:**
- Not implemented in this codebase
- Login/register CTAs deep-link to external `app.dominionmarkets.com` (see `web/src/content/home-html.ts`)
- No session cookies, JWT handling, or OAuth flows in `web/`

**OAuth Integrations:**
- Not detected

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None (no gtag, Segment, Mixpanel, etc.)

**Logs:**
- Browser `console` only if used ad hoc in mockup JS; no structured logging stack

## CI/CD & Deployment

**Hosting:**
- Not configured in-repo — Next.js app suitable for Vercel/Node hosts (`.vercel` ignored in `web/.gitignore`)
- No `Dockerfile`, `docker-compose`, or platform manifests detected

**CI Pipeline:**
- None — no `.github/workflows` or other CI configs at repo root

## Environment Configuration

**Required env vars:**
- None for current homepage behavior
- `web/.gitignore` ignores `.env*` for future secrets; no committed env templates (e.g. `.env.example`) detected

**Secrets location:**
- Not applicable today — no API keys or service credentials consumed by the app

## Webhooks & Callbacks

**Incoming:**
- None — no Route Handlers under `web/src/app/api/`, no webhook endpoints

**Outgoing:**
- None — no server-side webhook dispatch

## Third-Party Content References

**Video:**
- External MT5 simulator MP4 on `www.dominionmarkets.com` (linked from homepage HTML)

**Icons:**
- Lucide React package (npm), not a network CDN at runtime

**Design / docs (non-runtime):**
- Brand guidelines: `docs/brand/Dominion_Markets_Brand_Guidelines.md`
- Floating Sanctuary design spec: `docs/superpowers/specs/`
- Hi-fi design source: `mockups/`
- Wireframes: `wireframes/`

---

*Integration audit: 2026-09-05*
