---
phase: 01-track-web-app
plan: 01
subsystem: infra
tags: [git, nextjs, web, tracking, prod-02]

requires: []
provides:
  - "Tracked web/ Next.js app source, full public tree, and app config in git"
  - "Verified web/.gitignore excludes node_modules, .next, .env*, generated TS"
affects:
  - 02-inventory
  - 03-delete-orphans
  - 05-prune-assets

tech-stack:
  added: []
  patterns:
    - "git add web/ only — rely on web/.gitignore for secrets/build artifacts"
    - "Full web/public snapshot before later prune phases (D-01)"

key-files:
  created:
    - web/.gitignore
    - web/package.json
    - web/src/app/page.tsx
    - web/public/mockups.css
    - web/public/assets/hero/Hero-background.png
    - web/public/assets/hero/hero.mp4
  modified: []

key-decisions:
  - "D-01: Tracked entire web/public including hero.mp4 prune candidate"
  - "D-02: Committed only paths under web/ — left root Hero-background.png and .DS_Store untracked"
  - "Single coherent chore(web) commit for PROD-02"

patterns-established:
  - "Scope commits with git add web/ never blanket root adds"
  - "Pre-commit gates: staged names ^web/, reject node_modules/.next/.env/next-env.d.ts/tsbuildinfo"

requirements-completed: [PROD-02]

duration: 1min
completed: 2026-09-05
---

# Phase 1 Plan 01: Track Web App Summary

**PROD-02 satisfied: Next.js app under `web/` (src, full public, config) is tracked in git via commit `49e6ced`, with node_modules/.next/env artifacts excluded by `web/.gitignore`.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-09-04T20:09:28Z
- **Completed:** 2026-09-04T20:10:15Z
- **Tasks:** 3/3
- **Files modified:** 157 paths added under `web/`

## Accomplishments

- Verified `web/.gitignore` ignores dependencies, build output, env secrets, OS junk, and generated TypeScript
- Committed full `web/` tree including all of `web/public` (D-01), including `hero.mp4`
- Confirmed root orphans (`Hero-background.png`, `.DS_Store`) and ignored artifacts stayed out of the index (D-02)

## Task Commits

Each task was committed atomically where applicable:

1. **Task 1: Verify web/.gitignore excludes secrets and build artifacts** - verification only (no code change; ignore rules already correct)
2. **Task 2: Stage and commit only web/ (full public tree)** - `49e6ced` (chore)
3. **Task 3: Prove fresh-checkout path and PROD-02 success criteria** - SUMMARY written (this file)

**Commit SHA (full):** `49e6cedf48164f025db21de1c48caa1d65ba2154`  
**Commit SHA (short):** `49e6ced`  
**Subject:** `chore(web): track Next.js app source and public assets`

## File counts (PROD-02 evidence)

| Path | `git ls-files` count |
|------|----------------------|
| `web/src` | 12 |
| `web/public` | 135 |
| `web/` total | 157 |

## `git check-ignore -v` (successful)

```
web/.gitignore:4:/node_modules	web/node_modules
web/.gitignore:17:/.next/	web/.next
web/.gitignore:34:.env*	web/.env.local
web/.gitignore:24:.DS_Store	web/.DS_Store
```

Also verified (Task 1): `web/next-env.d.ts` and `web/tsconfig.tsbuildinfo` ignored.

## Files Created/Modified

- `web/.gitignore` — ignore rules for node_modules, .next, .env*, .DS_Store, next-env.d.ts, *.tsbuildinfo
- `web/package.json` / `web/package-lock.json` — app identity and lockfile
- `web/next.config.ts`, `web/tsconfig.json`, `web/eslint.config.mjs`, `web/postcss.config.mjs` — app config
- `web/src/**` — App Router + components (12 tracked files)
- `web/public/**` — served CSS + assets including live hero and prune candidates (135 tracked files)
- `web/README.md`, `web/AGENTS.md`, `web/CLAUDE.md` — app docs

## Decisions Made

- Followed D-01/D-02 exactly: full `web/public` in, only `web/` paths in commit
- Did not create a root `.gitignore`; relied on existing `web/.gitignore`
- Did not force-add `next-env.d.ts` or `*.tsbuildinfo`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None — no external services or env configuration required for this plan.

## Known Stubs

None — this plan only tracks existing source; no UI stubs introduced.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes. Threat mitigations T-01-01 through T-01-04 verified via ignore checks and staged-path gates.

## Next Phase Readiness

Phase 1 PROD-02 complete. Downstream inventory/prune phases can operate on a git-tracked `web/` tree. Root `Hero-background.png` remains untracked for Phase 3.

---

## Self-Check: PASSED

- FOUND: `web/package.json`, `web/src/app/page.tsx`, `web/public/mockups.css`, `web/public/assets/hero/Hero-background.png`, `web/public/assets/hero/hero.mp4`
- FOUND: commit `49e6ced` with subject `chore(web): track Next.js app source and public assets`
- FOUND: `PROD-02` substring in this SUMMARY
- VERIFIED: `git ls-files 'web/node_modules/*' 'web/.next/*'` empty; root `Hero-background.png` not tracked
