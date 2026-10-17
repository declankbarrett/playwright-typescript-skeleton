---
work-id: "adhoc-20261013-add-user"
skill: "qa-automation-plan"
framework-version: "1.1.0"
created: "2026-10-13T20:00:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/04_test_scenarios.md"
    revision: "2026-10-13T19:40:00Z"
  - source: "qa-work/adhoc-20261013-add-user/05_regression_risk.md"
    revision: "2026-10-13T19:50:00Z"
  - source: ".github/ai-qa/project/conventions/testing.md, playwright.config.ts, .github/ai-qa/framework/packs/playwright-ts/pack.md"
    revision: "df9a439aa0cd25ed58318e0f5db23acb7dc7265b"
---

# Automation Plan — Add User

**Scope:** Automation decision for TS01–TS11 (`04_test_scenarios.md`), using the `playwright-ts` pack (TypeScript, confirmed by `@playwright/test`, `playwright.config.ts` and existing specs) and the project's observed `tests/smoke/` / `tests/functional/` scopes (`conventions/testing.md`).
**Status:** complete (revised after `07_design_review.md`)
**Result:** 9 of 11 scenarios recommended **Automate** (6 E2E in `tests/functional/add-user.spec.ts`, 3 API-integration in a **new** `tests/api/` location not yet in project conventions, with TS09 also in that file); 2 scenarios (TS05, TS11 — server error at UI and API level) are **Automate (blocked)** pending a confirmed fault-injection mechanism. Overall automation impact: **Medium**.
**Do next:** 1) Confirm with the team how to safely trigger a server error in the test environment to unblock TS05 and TS11. 2) Decide how the new `tests/api/` location and its CI execution scope are confirmed as a project convention (see CI impact note) — recommend `qa-configure refresh` once decided. 3) Rebuild `tests/functional/add-user.spec.ts` and add the new API spec once design is approved.

## Evaluation factors

| Factor | Answer | Reason |
|---|---|---|
| Cross-service impact | No | Single external Test Application (UI + its own API); no evidence of multi-service chaining in `project.md`. |
| API changes | **Yes** | `POST /users` is a brand-new route/contract. |
| Backend logic | **Yes** | New validation branches (required fields, email format, position allow-list, duplicate check, parameterisation). |
| Database side effects | **Yes** | New write path and new `UNIQUE` constraint on `Users.email`. |
| Feature flags | No | None mentioned anywhere in the ticket or repository. |
| Caching behaviour | Unknown | Not documented; flagged as an evidence-limited risk in `05_regression_risk.md`, not assumed safe. |
| Authentication / authorisation | No | No login/permission flow exists in `fixtures/testFixtures.ts` or the ticket. |
| Logging validation | Unknown | No logging/metrics/audit requirement specified (Observability: Missing in `01_requirement_analysis.md`); nothing to validate yet. |
| Environment-based configuration | No | Behaviour is expected to be identical across `local`/`int`/`qa`. |

Given API changes, backend logic and database side effects are all **Yes**, and this is a Must-Test (risk 16) item with zero existing coverage, automation is clearly justified for the API-contract and core-logic scenarios; existing E2E conventions already support the UI journey.

## Test level decisions

Applying the pack's decision tree (`automation-criteria.md`): UI journeys through the browser → **E2E** (project's only existing UI level, named "Functional" in `conventions/testing.md` → Scopes); direct `POST /users` request/response checks → **Integration** (the `playwright-ts` pack's "API integration" level, via the `request` fixture — not yet an existing project scope, see CI impact below). No level was explicitly requested by the user for any scenario, so **Not specified** is recorded and the recommendation is used without a mismatch question.

## Automation decisions

| Scenario / requirement | Decision | Requested level | Recommended level | Final level / status | Location | Mocking | Environment / data | CI impact | Justification / evidence |
|---|---|---|---|---|---|---|---|---|---|
| TS01 — Create a user successfully (FR2) | Automate | Not specified | E2E | E2E | `tests/functional/add-user.spec.ts` (rebuild; existing pattern from deleted `add-user.spec.ts@3ae2568`) | None — real external app via `BASE_URL`, matching existing repo convention | `local` default; unique timestamped email per `conventions/testing.md` data rule | `npm run test:functional` / CI `test:int`; low runtime, 3 browser projects (existing pattern, no new risk) | Core happy-path journey, Must-Test tier, zero current coverage; `AddUserPage`/`UsersListPage` POM already exist. |
| TS02 — Each of the 9 positions (FR1, FR2) | Automate | Not specified | E2E | E2E | Same file; one `test()` per position or a single data-driven loop over the 9 values | None | Same; 9 unique emails per run | Same spec file, adds ~9x the single-scenario runtime across 3 browsers — acceptable for a Must-Test enumerated list, but note in CI impact below | Enumerating all 9 values is explicit in the ticket's Test notes and is the only way to catch an incomplete/incorrect allow-list. |
| TS03 — Invalid submissions rejected (FR3) | Automate | Not specified | E2E | E2E | Same file | None | Same environment; no persistence (nothing should be created) | Same | Validation crosses the real UI→API boundary (backend re-validates); not a pure internal-logic check QA should skip. |
| TS04 — Duplicate email incl. case variant (FR4, FR11) | Automate | Not specified | E2E | E2E | Same file | None | Create a user, then attempt the duplicate in the same test for determinism | Same | Directly tests the HIGH-risk Data Integrity/Database Layer rows in `05_regression_risk.md`. |
| TS05 — Server error preserves values (FR5) | **Automate (blocked)** | Not specified | E2E | **Confirmation pending** | `tests/functional/add-user.spec.ts` (once unblocked) | Would need a way to force a real 5xx from the external app — no mock boundary exists in this repo's architecture (all tests run against the real app) | Blocked — no documented fault-injection mechanism in any configured environment | N/A until unblocked | Automation is desirable (HIGH-risk failure-mode scenario) but blocked on the same unresolved dependency flagged in `01_requirement_analysis.md` Testing Prerequisites; do not generate this test until the mechanism is confirmed. |
| TS06 — Special-character names (FR6) | Automate | Not specified | E2E | E2E | Same file | None | Same; literal `O'Brien` / `Zoë` strings, no escaping in test data file | Same | Directly tests the HIGH-risk Data Integrity row; also guards against encoding regressions in existing list rendering. |
| TS07 — API 201 + id (FR7) | Automate | Not specified | Integration | Integration | **New** `tests/api/add-user.contract.spec.ts` using Playwright's `request` fixture | None — real endpoint | `local` default `BASE_URL`; unique email | See CI impact note below (new location, scoping decision needed) | API Behaviour is HIGH risk with zero existing coverage; this is the minimum happy-path contract check. |
| TS08 — API 400 (FR8) | Automate | Not specified | Integration | Integration | Same new file | None | Same | Same | Confirms server re-validates independently of the UI (Backend Logic HIGH row). |
| TS09 — API 409 (FR9, FR11) | Automate | Not specified | Integration | Integration | Same new file | None | Create-then-duplicate in the same test | Same | API-level counterpart to TS04; required because Database Layer/Data Integrity are HIGH risk. |
| TS10 — API SQL-injection stored as plain text (NFR1) | Automate | Not specified | Integration | Integration | Same new file | None | Unique email; injection string in `name` only | Same | Security-relevant boundary check; HIGH-risk Backend Logic/Data Integrity rows explicitly call for it. |
| TS11 — API: unexpected error returns 500 (FR10) | **Automate (blocked)** | Not specified | Integration | **Confirmation pending** | Same new file (once unblocked) | Would need a way to force a real 5xx from the external app — no mock boundary exists in this repo's architecture | Blocked — same unresolved dependency as TS05 (Open Question 3) | N/A until unblocked | Added following `07_design_review.md` (FR10 previously had no scenario at all). Automation is desirable (API Behaviour/Backend Logic are HIGH risk) but blocked on the same unresolved mechanism as TS05; do not generate this test until confirmed. |

## CI impact — new `tests/api/` location

`conventions/testing.md` → Scopes currently lists only `tests/smoke/` and `tests/functional/`; there is no existing API scope. `playwright.config.ts` has `testDir: './tests'` with no `testMatch` restriction and three browser projects (chromium, firefox, edge) with no `testIgnore`, so a new `tests/api/*.spec.ts` file would be **auto-discovered and run three times** (once per browser project) even though API tests via the `request` fixture do not use a browser — this triples runtime and CI minutes for no added assurance. Generating the API spec without addressing this would itself be a quality gap. Two options for the generation step to resolve explicitly (not decided here):

- **Option A:** scope the new spec out of the two non-primary browser projects (e.g. `testIgnore` on `firefox`/`edge` projects for the `tests/api/` path, or a dedicated `api` project with no `devices` entry).
- **Option B:** keep it simple and accept 3x runs for now, given the suite is small, and revisit if CI duration becomes a concern.

This decision and its outcome should be recorded when `qa-generate-tests` runs, and `conventions/testing.md` → Scopes should be refreshed via `qa-configure` once the team confirms the new location as a lasting convention (QA will not edit project conventions directly).

## Automation impact

**Medium** — new test scenarios are required (rebuilding one existing spec file plus one new file/location), but no new fixture *types*, page objects or test frameworks are needed: `AddUserPage.ts`, `UsersListPage.ts` and the `users` JSON fixture already exist, and the `playwright-ts` pack natively supports API tests via the `request` fixture already bundled with `@playwright/test`. The one open item (CI scoping for the new `tests/api/` location) is a small, one-off configuration decision rather than new framework work.

## Residual risk and manual alternative

If TS05 or TS11 remain blocked at automate time, recommend both stay as **manual** checks performed once a fault-injection approach is agreed, rather than being dropped — together they cover a HIGH-adjacent failure mode (FR5, FR10) that must not silently lose coverage.

## Drift

None against `project.md`/conventions. Flagging, not editing: `conventions/testing.md` → Scopes does not yet define an API test level/location — this plan proposes one; `qa-configure refresh` should formalise it once the team agrees.
