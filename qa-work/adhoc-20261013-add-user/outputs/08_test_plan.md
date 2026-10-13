---
work-id: "adhoc-20261013-add-user"
skill: "qa-test-plan"
framework-version: "1.1.0"
created: "2026-10-13T20:20:00Z"
inputs:
  - source: "jira.md (repo root, pasted ticket)"
    revision: "observed 2026-10-13"
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
  - source: "qa-work/adhoc-20261013-add-user/02_code_context.md"
    revision: "2026-10-13T19:25:00Z"
  - source: "qa-work/adhoc-20261013-add-user/03_coverage_assessment.md"
    revision: "2026-10-13T19:20:00Z (revised 20:20 — FR10 row)"
  - source: "qa-work/adhoc-20261013-add-user/04_test_scenarios.md"
    revision: "2026-10-13T19:40:00Z (revised after 07_design_review.md)"
  - source: "qa-work/adhoc-20261013-add-user/05_regression_risk.md"
    revision: "2026-10-13T19:50:00Z (revised after 07_design_review.md)"
  - source: "qa-work/adhoc-20261013-add-user/06_automation_plan.md"
    revision: "2026-10-13T20:00:00Z (revised after 07_design_review.md)"
  - source: "qa-work/adhoc-20261013-add-user/07_design_review.md"
    revision: "2026-10-13T20:10:00Z"
---

# Test Plan — Add User: create a new user from the UI

## TL;DR

- **Verdict:** Go with conditions — design is complete, independently reviewed and remediated; proceed to sprint with the 5 open questions tracked, and treat TS05/TS11 execution as blocked until the server-error trigger mechanism is confirmed.
- **Top risks:** 1. **HIGH** — zero existing automated coverage for a Must-Test (risk 16) write path into the core Users data set. 2. **HIGH** — API Behaviour, Backend Logic, Database Layer and Data Integrity regression areas all rated HIGH (new endpoint, new validation, new schema constraint, security-relevant SQL-injection handling). 3. Four unresolved requirement ambiguities (email-validation rule, duplicate case-insensitivity layer, placeholder value, server-error trigger) reduce execution confidence from Green to Amber.
- **Next action:** Resolve the open questions with Product/Dev in refinement, in parallel with confirming the target test environment's current implementation status, before scheduling execution of this plan.

## Next Steps

| # | Action | Owner | Evidence (FR/NFR/scenario ID) | Blocker | Source |
|---|---|---|---|---|---|
| 1 | Confirm a safe, repeatable mechanism to force a server-side error in the test environment | Dev + QA | FR5, FR10, TS05, TS11 | Yes | 04 |
| 2 | Confirm whether `add-user.html` / `add-user-scripts.js` / `POST /users` are implemented in any reachable test environment | Dev | FR2–FR11 | Yes | 02 |
| 3 | Confirm the exact client/server email-validation rule beyond the `abc@` example | Product/Dev | FR3, FR8, TS03 | Yes | 01 |
| 4 | Confirm whether duplicate-email case-insensitivity is enforced in application logic, DB collation, or both | Dev | FR4, FR11, TS04, TS09 | Yes | 01 |
| 5 | Confirm the placeholder Position option's exact label/value | Product/Dev | FR3, TS03 | Yes | 01 |
| 6 | Decide observability (logging/metrics/audit) requirements for the new write endpoint and its error paths | Product/Dev | NFR — none currently specified | No | 01, 05 |
| 7 | Decide how the new `tests/api/` location and its CI scoping (avoid 3x browser-project duplication) are adopted as a project convention; refresh `conventions/testing.md` via `qa-configure` once agreed | QA/Dev | — | No | 06 |
| 8 | Rebuild `tests/functional/add-user.spec.ts` (TS01–TS04, TS06) and add `tests/api/add-user.contract.spec.ts` (TS07–TS10) once design is approved | QA | TS01–TS04, TS06, TS07–TS10 | No | 06 |
| 9 | Extend `test-data/users.json`/fixtures only if a reusable duplicate-email fixture is wanted later — current scenarios are self-contained | QA | FR4, TS04, TS09 | No | 01, 04 |

**Author:** QA (AI-QA `qa` workflow)
**Date:** 2026-10-13
**Project:** playwright-typescript-skeleton — Playwright/TypeScript UI test-automation skeleton; system under test is an external "Test Application" (Users/Projects manager) reached via `BASE_URL`.
**Scope:** Ticket — "Add User: create a new user from the UI" (`jira.md`, Type: Story)
**Status:** **Final** — approved by user 2026-10-13T20:11Z (see Gate log in `index.md`).

## Summary

This Story introduces the ability to create a new user from a new "Add new user" page (`add-user.html`), backed by a new `POST /users` endpoint and a new `UNIQUE` constraint on `Users.email`. No implementation exists in this repository (test-automation only); the actual product lives in an external Test Application. One prior automated test (`tests/functional/add-user.spec.ts`) existed for part of this flow but was deleted in the immediately preceding commit (`df9a439`), and no API-level tests have ever existed for this endpoint. Out of scope: editing/deleting users, assigning users to projects. Source revision: `jira.md` as observed 2026-10-13; repository working tree at commit `df9a439aa0cd25ed58318e0f5db23acb7dc7265b`.

## QA Summary

| Ticket | Readiness | Max risk | Coverage verdict | Scenarios written/not written | Automated/manual/not needed | Run result | Published |
|---|---|---|---|---|---|---|---|
| adhoc-20261013-add-user (Add User) | 🟡 Amber | HIGH | Insufficient (pre-design; 11/11 scenarios now designed) | 11 / 0 | 9 automate, 2 automate (blocked) | Not run | Not published |

## Risk Assessment

- **Highest supported risk: HIGH** (not CRITICAL — this is new, additive functionality with no existing live path being altered, and failure is recoverable rather than an outage/security-breach-in-production scenario).
- **Change Impact 4/5 × Failure Criticality 4/5 = Risk Score 16 → Must Test tier**, bumped-confirmed by the "no existing coverage" modifier (`01_requirement_analysis.md`).
- **Key risks:** (1) a bypassable or incomplete duplicate-email check would corrupt the core Users data set and the future (out-of-scope) project-assignment feature; (2) unhandled SQL-injection input could compromise data integrity if parameterised queries are not implemented correctly; (3) an unconfirmed caching layer could make AC1's "new user is listed" assertion flaky in a shared environment; (4) the new `tests/api/` location would triple-execute across 3 browser projects in CI unless explicitly scoped.
- **Mitigations:** full HIGH-area targeted scenarios (TS04, TS06, TS07–TS11 — see Regression Risk Matrix below); explicit CI-scoping decision required before test generation (Next Step 7).

## Requirements

### Functional requirements

| ID | Requirement | Source |
|---|---|---|
| FR1 | The "Add new user" page presents Name, Surname, Email fields and a Position dropdown offering exactly the 9 named roles. | Scope; Technical notes |
| FR2 | Submitting valid data creates the user, navigates to the Users page, and the new user is listed. | AC1 |
| FR3 | Empty field / placeholder position / invalid email blocks submission with a validation message and creates no user. | AC2; Technical notes |
| FR4 | A duplicate email (including different capitalisation) is rejected with "A user with this email already exists" and no user is created. | AC3; Test notes |
| FR5 | A server error on valid submission shows an error message and retains the entered form values. | AC4; Technical notes |
| FR6 | Special-character names (e.g. `O'Brien`, `Zoë`) are saved and displayed exactly as entered. | AC5; Test notes |
| FR7 | `POST /users` returns `201` with `{ id }` on success. | Scope; Technical notes; API checks |
| FR8 | `POST /users` returns `400` for invalid/missing fields or a disallowed position. | Scope; Technical notes; API checks |
| FR9 | `POST /users` returns `409` for a duplicate email. | Scope; Technical notes; API checks |
| FR10 | `POST /users` returns `500` for any other server error. | Technical notes |
| FR11 | `Users.email` has a `UNIQUE` database constraint. | Technical notes (Database) |

### Non-functional requirements

| ID | Requirement | Source |
|---|---|---|
| NFR1 | Backend uses parameterised queries; a SQL-injection string in `name` is stored/returned as plain text, never executed. | Technical notes; API checks |

No other non-functional requirements (performance, logging, audit) are specified — none specified beyond NFR1; see Observability gap under Open Questions.

### Edge cases, flags and ambiguities

See `01_requirement_analysis.md` → Edge cases/Risk areas: unnamed placeholder-position value, unstated email-validation rule, unclear duplicate-check layer (app vs DB collation), no stated server-error trigger mechanism, no feature flags, explicit out-of-scope (edit/delete/assign).

## Traceability Matrix

| FR/NFR | Existing evidence (test/assertion or gap) | Scenarios | Automation decision (assessed / automated / deliberately not automated, with reason) | Test files | Last result (run / environment / time) |
|---|---|---|---|---|---|
| FR1 | Gap — no test ever asserted the full 9-option list | TS02 | Automate — E2E | Not yet created | Not run |
| FR2 | Gap — prior test deleted in `df9a439` | TS01, TS02 | Automate — E2E | Not yet created | Not run |
| FR3 | Gap — only 1 of 3 triggers ever tested, no longer present | TS03 | Automate — E2E | Not yet created | Not run |
| FR4 | Gap — never automated | TS04 | Automate — E2E | Not yet created | Not run |
| FR5 | Gap — never automated | TS05 | Automate (blocked) — pending server-error trigger | Not yet created | Not run |
| FR6 | Gap — never automated | TS06 | Automate — E2E | Not yet created | Not run |
| FR7 | Gap — no API tests exist | TS07 | Automate — Integration | Not yet created | Not run |
| FR8 | Gap — no API tests exist | TS08 | Automate — Integration | Not yet created | Not run |
| FR9 | Gap — no API tests exist | TS09 | Automate — Integration | Not yet created | Not run |
| FR10 | Gap — no API tests exist; no trigger mechanism confirmed | TS11 | Automate (blocked) — pending server-error trigger | Not yet created | Not run |
| FR11 | Gap — DB external/unreachable; observable only via FR4/FR9 | TS04, TS09 | Automate — via FR4/FR9 | Not yet created | Not run |
| NFR1 | Gap — never exercised | TS10 | Automate — Integration | Not yet created | Not run |

## Scenarios

**Format: `bdd` (Given/When/Then)**, per `conventions/qa-process.md` → Scenario format. Full scenario bodies, test data and sub-result tracking are maintained in `04_test_scenarios.md` (the source of truth); summarised here for plan completeness.

| # | Title | Covers | Status |
|---|---|---|---|
| TS01 | Create a user successfully | FR2 | Designed |
| TS02 | A user can be created for every allowed position (incl. exact-option-list check) | FR1, FR2 | Designed |
| TS03 | The form rejects invalid submissions and creates no user | FR3 | Designed |
| TS04 | A duplicate email is rejected, including case variants | FR4, FR11 | Designed |
| TS05 | A server error preserves the entered form values | FR5 | Designed — **blocked for execution** |
| TS06 | Special-character names are saved and displayed exactly as entered | FR6 | Designed |
| TS07 | API: a valid payload returns 201 with the new user's id | FR7 | Designed |
| TS08 | API: a missing or invalid field returns 400 | FR8 | Designed |
| TS09 | API: a duplicate email returns 409 | FR9, FR11 | Designed |
| TS10 | API: a SQL-injection string in the name is stored as plain text | NFR1 | Designed |
| TS11 | API: an unexpected server error returns 500 | FR10 | Designed — **blocked for execution** |

### Scenarios Not Written

None. All 11 FR/NFR have a written scenario (see `04_test_scenarios.md` for the remediation history — FR10/TS11 was added after design review).

## Automation Recommendation

Summarised from `06_automation_plan.md` (source of truth for full mocking/environment/CI-impact detail):

| Scenario | Decision | Level | Location | Notes |
|---|---|---|---|---|
| TS01, TS02, TS03, TS04, TS06 | Automate | E2E | `tests/functional/add-user.spec.ts` (rebuild) | Uses existing `AddUserPage`/`UsersListPage` POM |
| TS05 | Automate (blocked) | E2E | Same file, once unblocked | Pending server-error trigger mechanism |
| TS07, TS08, TS09, TS10 | Automate | Integration (API) | New `tests/api/add-user.contract.spec.ts` | New location — CI scoping decision required (Next Step 7) |
| TS11 | Automate (blocked) | Integration (API) | Same new file, once unblocked | Pending server-error trigger mechanism |

**Overall automation impact: Medium** — existing POM/fixtures are reused; the only new framework element is an API spec location (natively supported by the `playwright-ts` pack's `request` fixture), plus a CI-scoping decision to avoid tripling API-test runs across the 3 configured browser projects.

## Regression Impact

Highest supported risk: **HIGH** across API Behaviour, Backend Logic, Database Layer and Data Integrity (new write path, new schema constraint, security-relevant validation, zero existing coverage). See the full Regression Risk Matrix below for all 13 areas, including the Caching and Logging/Monitoring rows which are rated above LOW despite being evidence-limited, per the "never LOW without justification" rule.

## Environment Impact

- **Environment:** `local` (project default for AI-QA/manual runs), same expected behaviour on `int`/`qa` — no environment-specific logic stated. Base URL via `BASE_URL`; no other environment variables required beyond `BROWSER`/`HEADLESS`/`TIMEOUT` already defined.
- **Dependencies:** the feature must be deployed/reachable in the chosen environment before execution; this is currently unconfirmed (Next Step 2).
- **Test data:** unique, timestamped emails/names per the project's existing convention (`add-project.spec.ts` pattern); no seeded fixture is strictly required since TS04/TS09 create their own duplicate-check user.
- **Cleanup/blockers:** no delete/edit capability exists (out of scope), so created users persist; no automated cleanup proposed. No credential/secret values are required.

## Open Questions

1. Exact email-validation rule (client-side and server-side) beyond the `abc@` example — owner Product/Dev.
2. Whether duplicate-email case-insensitivity is enforced in application logic, DB collation, or both — owner Dev.
3. Safe, repeatable mechanism to force a server error for FR5/FR10 — owner Dev/QA. **Blocks execution of TS05 and TS11.**
4. Exact label/value of the placeholder Position option — owner Product/Dev.
5. Whether the external Test Application currently implements this feature in any reachable environment — owner Dev.
6. How the new `tests/api/` location and its CI scoping are adopted as a lasting project convention — owner QA/Dev; suggest `qa-configure refresh` once decided.

## Regression Risk Matrix

| Area | Risk Level | Why? / evidence | Regression Needed? | Automation Update Needed? |
|---|---|---|---|---|
| API Behaviour | HIGH | Brand-new `POST /users` contract (201/400/409/500); no existing API tests in this repo. | Yes | Yes |
| Existing Endpoints | MEDIUM | Existing Users list/view rendering consumes data from this new endpoint; edge-case data (special characters, injection string) could break it. | Yes | Possibly |
| Feature Flags | LOW | No flag evidenced anywhere. | No | No |
| Caching | MEDIUM | No caching layer documented but not confirmed absent; an undisclosed cache could delay list visibility and fail AC1. | Unknown | Unknown |
| Authentication / Authorisation | LOW | No auth/permission flow found in ticket, `project.md` or fixtures. | No | No |
| API Gateway | LOW | App reached directly via `BASE_URL`; no gateway evidenced. | No | No |
| Backend Logic | HIGH | New multi-branch validation logic (required fields, email format, position allow-list, duplicate check, parameterisation) with zero existing coverage. | Yes | Yes |
| Database Layer | HIGH | New `UNIQUE` constraint and new write path into Users; schema change escalation rule applies. | Yes | Yes (behavioural only; schema itself is external/unreachable) |
| Data Integrity | HIGH | Duplicate-email prevention, special-character preservation and SQL-injection-safe storage all protect the shared Users data set. | Yes | Yes |
| Logging / Monitoring | MEDIUM | No logging/metrics/audit requirement specified for a new write endpoint or its error paths — an unresolved gap, not a confirmed "not required". | Unknown | Unknown |
| Environment Configuration | LOW | No environment-specific behaviour described; same across `local`/`int`/`qa`. | No | No |
| CI/CD Pipeline | MEDIUM | New `tests/api/*.spec.ts` would be auto-discovered and run 3x (once per browser project) without an explicit scoping decision. | Yes (scope decision) | Yes |
| Backward Compatibility | LOW | Purely additive; nothing existing is changed or removed; edit/delete/assignment explicitly out of scope. | No | No |

No project-configured extra regression areas were found (`conventions/qa-process.md` → Extra regression areas: ∅).

## Drift

None observed against `.github/ai-qa/project/project.md` or its conventions during this workflow. One pre-existing, already-recorded unknown remains relevant: `project.md` → Unknowns and conflicts flags that `README.md`'s Saucedemo description is stale and the Users/Projects "Test Application" is authoritative — consistent with this ticket's scope and not a new drift. A proposed (not yet adopted) convention gap was identified: `conventions/testing.md` → Scopes has no API test level/location yet; this plan proposes `tests/api/` and recommends `qa-configure refresh` once the team confirms it.
