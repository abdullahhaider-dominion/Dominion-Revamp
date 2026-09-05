# Phase 10 Lean Production Check (PROD-03)

**Purpose:** Prove the production repo is **lean** and **push-ready** for deploying `web/` — orphans gone, keep set intact, ignores exclude install/build junk, status coherent — without pushing and without deleting `docs/` or `wireframes/`.

**Automated gate:** `node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs`  
**Quick (no build):** `node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs --skip-build`

**Observed (2026-09-05):** keep=**82**, delete-list absent=**55**, `web/public` files=**82** (ignore `.DS_Store`), branch ahead of `origin/main`.

---

## 1. Absent

| Check | Command / method | Result |
|-------|------------------|--------|
| Repo-root `mockups/` | `test ! -e mockups`; `git ls-files mockups` empty | **PASS** — absent on disk; 0 tracked paths |
| Root `Hero-background.png` | `test ! -e Hero-background.png` | **PASS** — absent (hero lives under `web/public/assets/hero/`) |
| Phase 5 delete-list (55) | Every non-empty line of `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` must not exist | **PASS** — 55/55 absent (`still_present=0`) |

**Verdict: PASS**

---

## 2. Present

| Check | Command / method | Result |
|-------|------------------|--------|
| Deployable `web/` | `web/src/`, `web/package.json`, `web/next.config.ts` | **PASS** |
| Keep set (inventory) | Parse `02-INVENTORY.json` `class=keep`; every path exists | **PASS** — **82/82** |
| `web/public` file count | Recursive files excluding `.DS_Store` === keep count | **PASS** — **82** |
| KEEP ports | `web/public/mockups.css`, `web/src/lib/mockups-main.js`, `web/public/assets/hero/Hero-background.png` | **PASS** |

**Verdict: PASS**

---

## 3. Ignores

| Check | Command / method | Result |
|-------|------------------|--------|
| `check-ignore` under `web/` | `(cd web && git check-ignore -v node_modules .next .env .env.local)` | **PASS** — all four matched by `web/.gitignore` |
| Not tracked | `git ls-files 'web/node_modules' 'web/.next' 'web/.env*'` empty | **PASS** — 0 paths |

**Verdict: PASS**

---

## 4. Status

| Check | Observation |
|-------|-------------|
| Branch | `main...origin/main` |
| Ahead/behind | `git rev-list --left-right --count origin/main...HEAD` → `0` behind, **ahead > 0** (local milestone commits) |
| Meaning | **push-ready ≠ pushed** — being ahead of origin is **OK** (D-01.5). Lean check does **not** fail solely because the branch is ahead. |

**Verdict: PASS** (coherent; push deferred to explicit user request)

---

## 5. Hard stops (D-03)

| Rule | Attestation |
|------|-------------|
| Keep `docs/` | **Present** — not deleted this phase |
| Keep `wireframes/` | **Present** — not deleted this phase |
| No `git push` | **Attested** — Phase 10 tasks do not push |
| No `mockups/` restore | **Attested** — tree remains absent; no restore |
| No further `web/public` prune | **Attested** — no deletions beyond Phase 5 list |

**Verdict: PASS**

---

## Re-run

```bash
node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs --skip-build
node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs   # asserts + npm run build
```

Checklist rows mirror `lean-verify.mjs` asserts so either layer can prove PROD-03.
