---
work-id: "adhoc-20261013-add-user"
skill: "qa-coverage-gaps"
framework-version: "1.1.0"
created: "2026-10-13T19:30:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
  - source: "qa-work/adhoc-20261013-add-user/02_code_context.md"
    revision: "2026-10-13T19:25:00Z"
  - source: "tests/, pages/, fixtures/ (working tree)"
    revision: "df9a439aa0cd25ed58318e0f5db23acb7dc7265b"
---

# Coverage Assessment — Add User (requirement scope)

**Scope:** FR1–FR11, NFR1 for the Add User story. Developer-owned unit tests are out of scope of this repository (this is a UI/API test-automation-only repo per `project.md`); assessment covers integration/E2E evidence only.
**Status:** complete
**Result:** **Insufficient** — zero current automated evidence exists for any requirement in this ticket; the one prior test (`add-user.spec.ts`) that covered part of FR2/FR3 was deleted in the last commit, and no API-level tests have ever existed.
**Do next:** 1) Design manual scenarios for all FR/NFR (no dedup available — no passing evidence exists). 2) Plan both E2E (UI) and new integration/API automation per `06_automation_plan.md`. 3) Rebuild `tests/functional/add-user.spec.ts` with full FR coverage, plus a new API spec, once design is approved.

## Requirement-level evidence

| Requirement | Unit evidence | Integration evidence | E2E evidence | Gap / recommendation |
|---|---|---|---|---|
| FR1 — Position dropdown offers all 9 values | None (no unit tests in this repo) | None | None found | No test selects/asserts each of the 9 position values. **Gap: no tests.** Recommend a data-driven E2E scenario or parameterised check. |
| FR2 — Happy path create → redirect → listed | None | None | **Deleted**: `add-user.spec.ts@3ae2568` asserted URL → `add-user.html`, then `addUser()`, then URL → `index.html` and `isUserListed(fullName)` — no longer present on this branch | No current test. **Gap: no tests** (historical coverage existed but was removed). |
| FR3 — Empty field / placeholder position / invalid email validation | None | None | **Deleted** spec covered only "missing fields" (one of three triggers); placeholder-position and invalid-email triggers were **never** tested, even historically | **Gap: happy-path-only / untested boundary** — two of three validation triggers have no evidence at all; the third has no current evidence. |
| FR4 — Duplicate email (incl. case variants) rejected | None | None | None found | **Gap: no tests.** Never automated in this repo. |
| FR5 — Server error shows message and retains form values | None | None | None found | **Gap: no tests**, and no POM support exists to read back retained field values (`02_code_context.md`). |
| FR6 — Special-character names saved/displayed exactly | None | None | None found | **Gap: no tests.** `isUserListed` substring match could support this but is unused for it. |
| FR7 — `POST /users` → 201 + `{id}` | None | None found (no API test infra) | N/A | **Gap: no tests, no test level.** No `request` fixture/API spec exists in this repo at all. |
| FR8 — `POST /users` → 400 (invalid/missing fields, disallowed position) | None | None found | N/A | **Gap: no tests.** |
| FR9 — `POST /users` → 409 (duplicate email) | None | None found | N/A | **Gap: no tests.** |
| FR10 — `POST /users` → 500 (other errors) | None | None found | N/A | **Gap: no tests**, and no documented mechanism to trigger a 500 in the test environment. A scenario now exists (TS11 in `04_test_scenarios.md`, added after `07_design_review.md`) but is design-blocked for execution on the same mechanism. |
| FR11 — `Users.email` UNIQUE constraint | None (DB is external/unreachable) | None found (would surface as FR9's 409 behaviourally) | N/A | **Gap: untestable directly**; only observable indirectly through FR9/AC3. |
| NFR1 — Parameterised queries / SQL-injection string stored as plain text | None | None found | N/A | **Gap: no tests.** No security-style input ever exercised against this endpoint. |

## Checklist answers

- **Are unit tests present for the changed code?** N/A — this repository contains no product code; it is test-automation only (`project.md`). Developer-owned unit tests, if any, live in the external Test Application's own repository and are not accessible here.
- **Do they cover all functional requirements from the ACs?** No — at the only level this repo can evidence (E2E/integration), zero requirements currently have passing automated coverage.
- **Do they include negative scenarios?** No current tests exist; historically, one of three FR3 negative triggers was tested, and it is gone.
- **Do they include edge cases?** No — special characters (FR6), duplicate-email case variants (FR4) and SQL-injection input (NFR1) have never been exercised.
- **Do they test failure modes?** No — server-error (FR5/FR10) and duplicate-email (FR4/FR9) failure paths have no evidence.
- **Are mocks used appropriately?** N/A — no API-level tests exist to assess mocking; existing UI tests run against the real external application via `BASE_URL`, consistent with `project.md`'s Environments.
- **Is there over-mocking?** No evidence of any mocking in this repo's test suite.
- **Is the happy path the only path tested?** Currently nothing is tested at all; when the prior spec existed, it was happy-path-plus-one-generic-negative only — i.e. even historically it leaned happy-path-first.

## Verdict

**Insufficient** — every requirement in this ticket currently has zero passing automated evidence in this repository. This is not a claim that the underlying feature is broken; it reflects that automated assurance has not yet been (re)built, consistent with this being a pre-development Story in refinement and the prior spec having just been removed.

## Role boundary note

As this repository is automation-only, there is no separate "developer unit test" layer to verify; QA's integration/E2E test suite in `tests/` is the primary automated evidence available for this product. This does not change the Insufficient verdict.

## Drift

None against `project.md`/conventions. `project.md` → Test landscape already states "no coverage report configured" and this assessment is consistent with that.
