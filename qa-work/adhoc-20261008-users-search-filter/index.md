---
work-id: adhoc-20261008-users-search-filter
framework-version: ai-qa (as configured in .github/ai-qa, 2026-10-08)
created: 2026-10-08T19:56:13Z
updated: 2026-10-08T20:26:00Z
---

# Work index — Search and filter users on the Users list

## Summary
Full `design → checkpoint → automate` workflow run against `jira.md` (pasted ticket, no provider configured). **Critical scope note:** this repository owns no application/backend code and targets only `saucedemo.com`; the ticket's feature does not exist here. User explicitly approved (2026-10-08) proceeding as a design exercise with non-runnable scaffold automation.

## Branch
Stayed on `feature/testing-ai-tool` (user declined the proposed `feature/users-search-filter-scaffold`, 2026-10-08). Base `main` @ `2af3ecb`. No branch created, no push.

## Steps and artefacts

| Step | Skill | Artefact | Status |
|---|---|---|---|
| 1 | qa-analyse-requirement | `requirement.md` | Done — FR1–FR12, NFR1–NFR4; Readiness 🟡 Amber; Risk: Should Test (11, adjusted), injection case escalated to Must Test |
| 2 | qa-map-code | `context.md` | Done — feature confirmed Missing in this repo (Drift recorded) |
| 3 | qa-coverage-gaps (requirement) | `coverage.md` | Done — Verdict: **Insufficient** (zero existing tests, as expected) |
| 4 | qa-design-scenarios | `design.md` | Done — 12 scenarios (S1–S12, bdd format); 5 "Scenarios Not Written" justified |
| 5 | qa-regression-risk | `regression.md` | Done — 13-area matrix; highest risk **CRITICAL** (Backend Logic / SQL injection) |
| 6 | qa-automation-plan | `automation.md` | Done — 10 Automate / 2 Manual decisions; overall impact High |
| 7 | qa-review-tests (design) | `review.md` | Done — independent subagent review; initial Needs Improvement (format gaps) → **Pass** after fixes applied to `design.md` |
| 8 | qa-test-plan | `outputs/test-plan.md` | Done — full ticket-scope plan, all sections, QA Summary |
| **Checkpoint** | — | — | **Design approved by user (2026-10-08)** → proceed to automate |
| 9 | qa-create-branch | — | Proposed `feature/users-search-filter-scaffold`; user declined, stayed on `feature/testing-ai-tool` |
| 10 | qa-generate-tests | `automation.md` (generation record appended) | Done — 19 test cases across 4 new spec files + 1 POM + 1 fixture file + 1 test-data file; typecheck exit 0; `--list` verified; run → 19/19 skipped (expected, no env) |

## Requirement traceability
See `outputs/test-plan.md` → Traceability Matrix for the full FR1–FR12/NFR1–NFR4 → scenario → automation decision → test file mapping.

## Generated files (new, untracked)
- `pages/UsersListPage.ts`
- `fixtures/usersFixtures.ts`
- `test-data/users-search-filter.json`
- `tests/functional/users-search.spec.ts`
- `tests/functional/api/users-query.spec.ts`
- `tests/functional/api/users-positions.spec.ts`
- `tests/functional/api/users-query-security.spec.ts`

No product code, existing tests, or project conventions were modified.

## Open questions (unresolved, carried to any future refinement)
- Position filter match semantics (exact vs partial/case-insensitive).
- Debounce assertion tolerance (±100ms assumed).
- Whether `/users/positions` excludes zero-user positions.
- Whether auth/authz exists in front of `/users`/`/users/positions`.

## Gate log
- L1 (local artefact/test-file writes): applied throughout, non-default branch (`feature/testing-ai-tool`), summarised in chat at each stage.
- L2 (branch creation): proposed, user declined — no branch created, no gate exercised.
- Design approval gate: **obtained** (user, 2026-10-08, via explicit choice in chat).
- L3/L4/L5: not reached — no test execution against a real environment, no publish/push/PR, no dependency installation this session.

## Next steps (not performed without further request)
- `qa-run-tests` against a real environment once one exists (would need `USERS_APP_BASE_URL`, e.g. `.env.local` or a dedicated `.env.usersapp`).
- `qa-publish` / `qa-create-pr` — offered, not performed (separate L4 gates).
- Correct placeholder selectors in `UsersListPage.ts` against the real application's DOM once available.
