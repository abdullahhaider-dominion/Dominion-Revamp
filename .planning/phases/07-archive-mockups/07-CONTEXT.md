# Phase 7: Archive Mockups - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

[auto] YOLO continue — discuss skipped; recommended defaults locked below.

<domain>
## Phase Boundary

Satisfy **MOCK-01**: preserve full `mockups/` history outside the production deploy path, record where it lives, and **do not delete** `mockups/` from this repo yet (Phases 8–9 handle docs + removal).

Out of scope: retargeting skills/READMEs (Phase 8), deleting `mockups/` (Phase 9), lean push check (Phase 10), any `web/` runtime changes.

</domain>

<decisions>
## Implementation Decisions

### Archive shape
- **D-01 (recommended):** Create a **dedicated long-lived git branch** `archive/mockups` in this repo using `git subtree split -P mockups` (or equivalent history-preserving split) so commit history for `mockups/` is intact on that branch.
- **D-02:** Also materialize a **sibling local git repo** at `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` by cloning/pushing the split branch into it — satisfies “separate git repo” without requiring a new GitHub remote or `git push` to `origin` (user has not approved remote push).
- **D-03:** Do **not** push `archive/mockups` to `origin` in this phase unless the user explicitly asks. Record exact local branch tip SHA + sibling repo path in `07-ARCHIVE.md`, plus one-liner commands to push later.
- **D-04:** Prefer the new `archive/mockups` SoT over reusing `origin/hifi-ui-mockup` (that branch still exists historically and may be noted as prior art, but MOCK-01 deliverable is the new archive branch + sibling repo + record file).

### Hard stops
- **Never delete** `mockups/` from `main` / working tree in Phase 7.
- Do not modify `web/` app code for archive.
- Do not retarget `.cursor/skills` / READMEs here (Phase 8).

### Claude's Discretion
- Exact split tool (`git subtree split` vs `git filter-repo`) if one fails on this tree.
- Whether sibling repo is bare or working-tree clone (working tree preferred for human browsing).
- README inside sibling archive briefly explaining provenance.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/ROADMAP.md` — Phase 7 / MOCK-01 success criteria
- `.planning/REQUIREMENTS.md` — **MOCK-01**
- `.planning/PROJECT.md` — Archive before remove constraint
- `mockups/` — tree to archive (~64MB, ~139 tracked files, 64+ commits touching path)
- `origin/hifi-ui-mockup` — prior design branch (note only; not the Phase 7 SoT)

</canonical_refs>

<code_context>
## Existing Code Insights

- `mockups/` is tracked in this repo (not gitignored); production Next app under `web/` does not import it at runtime.
- Remote: `https://github.com/abdullahhaider-dominion/Dominion-Revamp.git`
- User rule: do not `git push` unless explicitly requested — archive must be complete locally + recorded.

</code_context>

<specifics>
## Specific Ideas

- Deliverable proof artifact: `.planning/phases/07-archive-mockups/07-ARCHIVE.md` with branch name, tip SHA, sibling path, restore/push commands.
- Phase 8 will point docs at this record.

</specifics>

<deferred>
## Deferred Ideas

- Doc/skill retarget — Phase 8
- Remove `mockups/` from production repo — Phase 9
- Push archive branch to GitHub — only when user asks
- Lean production check — Phase 10

</deferred>

---

*Phase: 7-Archive Mockups*
*Context gathered: 2026-09-05 (auto)*
