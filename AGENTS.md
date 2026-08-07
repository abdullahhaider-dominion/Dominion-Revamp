# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **static, buildless** design deliverable for the "Dominion Markets — Floating Sanctuary" homepage. There is no backend, no bundler, no package manager, and no `package.json`. Node 22 is preinstalled. Do not look for a build step or install step — there isn't one.

Two independent static sites (serve each as a plain directory):

| Site | Command (see `wireframes/README.md`, `mockups/README.md`) | URL |
|------|-----------------------------------------------------------|-----|
| Wireframes (low-fi IA) | `npx --yes serve wireframes -p 4173` | http://localhost:4173 |
| Mockups (hi-fi liquid-glass UI) | `npx --yes serve mockups -p 4174` | http://localhost:4174 |

Notes for running/testing:
- The only "test"/lint is the wireframe structure check: `node wireframes/wireframe-check.mjs` (must exit 0). It regex-checks `wireframes/index.html` for required section ids and compliance copy; it does NOT check the mockups.
- These are `.mjs`/browser scripts — nothing to compile. Editing `mockups/*.{html,css,js}` or `wireframes/*` is picked up on a plain browser refresh (no HMR; `serve` does not live-reload).
- `serve` is fetched via `npx` and cached; the update script pre-warms this cache. If offline and the cache is cold, any static server works, e.g. `python3 -m http.server 4174 --directory mockups`.
- The mockups are self-contained: charts are canvas drawings, videos are mock play shells (clicking the ▶ button toggles ▶/❚❚), and market-session cards run live JS countdown timers. No network/API calls are made.
