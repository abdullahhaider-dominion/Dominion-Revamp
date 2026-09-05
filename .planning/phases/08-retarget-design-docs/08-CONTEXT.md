# Phase 8: Retarget Design Docs - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

[auto] YOLO continue — discuss skipped; recommended defaults locked below.

<domain>
## Phase Boundary

Satisfy **MOCK-02**: docs and agent skills no longer treat **in-repo** `mockups/` as the working design SoT. Point design work at the Phase 7 archive; point production work at `web/`.

Out of scope: deleting `mockups/` (Phase 9), lean push check (Phase 10), rewriting historical `docs/superpowers/plans/*` narratives, changing `web/` runtime code.

</domain>

<decisions>
## Implementation Decisions

### What to retarget (must)
- **D-01:** Update `.cursor/skills/dominion-section-redesign/SKILL.md` so working hi-fi / implement paths cite the archive (`07-ARCHIVE.md` coordinates: branch `archive/mockups` + sibling repo path), not “must edit local `mockups/` in this production repo.” Production polish may cite `web/`.
- **D-02:** Update root `readme.md` and `web/README.md` so they no longer declare `../mockups/` or in-repo `mockups/` as current design SoT; link to `.planning/phases/07-archive-mockups/07-ARCHIVE.md` (and note archive branch / sibling).
- **D-03:** Update `.planning/PROJECT.md` Context line that still says “Design SoT today: `mockups/`” to reflect archive + `web/` production.

### What to leave alone
- **D-04:** Do **not** rewrite historical `docs/superpowers/specs/*` or `docs/superpowers/plans/*` as if they were wrong — they are dated delivery history. Optional one-line “Archive note” only if a doc still instructs *current* work to use in-repo `mockups/` as SoT (skip if purely historical).
- **D-05:** Do **not** delete `mockups/` (Phase 9). Do **not** `git push`. Do **not** change app behavior under `web/src`.

### Wording policy
- Prefer: “Hi-fi design archive: see `07-ARCHIVE.md` (`archive/mockups` / sibling repo). Production site: `web/`.”
- Allowed to mention that `mockups/` may still exist temporarily until Phase 9, but must not say it is required SoT.

### Claude's Discretion
- Exact skill section rewrites for clarity.
- Whether to add a tiny `RETARGET.md` inventory of files changed (optional; SUMMARY is enough if grep proof is solid).

</decisions>

<canonical_refs>
## Canonical References

- `.planning/ROADMAP.md` — Phase 8 / MOCK-02
- `.planning/REQUIREMENTS.md` — **MOCK-02**
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — archive coordinates (must link)
- `.cursor/skills/dominion-section-redesign/SKILL.md` — primary skill SoT
- `readme.md`, `web/README.md` — user-facing docs
- `.planning/PROJECT.md` — project context SoT line

</canonical_refs>

<code_context>
## Known SoT declarations (pre-retarget)

- `web/README.md`: “Source of truth for design still lives in `../mockups/`.”
- `readme.md`: “Vanilla hi-fi mockup lives in `mockups/`.”
- Skill: Working hi-fi = `mockups/`; implement in `mockups/index.html` etc.

</code_context>

<deferred>
## Deferred Ideas

- Remove `mockups/` tree — Phase 9
- Push `archive/mockups` to origin — only if user asks
- Lean production check — Phase 10

</deferred>

---

*Phase: 8-Retarget Design Docs*
*Context gathered: 2026-09-05 (auto)*
