---
work-id: "adhoc-20261013-add-user"
skill: "qa-run-tests"
framework-version: "1.1.0"
created: "2026-10-13T20:45:00Z"
inputs:
  - source: "tests/functional/add-user.spec.ts, tests/api/add-user.contract.spec.ts"
    revision: "generated 2026-10-13T20:35Z, reviewed 2026-10-13T20:40Z (11_code_review.md: Pass)"
  - source: "Locally deployed Test Application via Docker Compose (frontend :8081, backend :8080, Postgres :5432)"
    revision: "containers running, observed 2026-10-13 (docker ps: test-application-webapp-frontend-1, test-application-webapp-backend-1, test-application-db-1, test-application-adminer-1, all Up)"
---

# Execution Record — Add User

**Result:** 39/59 test runs passed, 20/59 failed. All 19 reproducible failures (confirmed stable on re-run) trace to real gaps in the Test Application's current implementation versus `jira.md`'s acceptance criteria, not to test-code defects (`11_code_review.md`: Pass). One further edge-project failure was transient load/environment flakiness, not reproduced on an isolated re-run.
**Do next:** 1) Triage the 19 reproducible failures as product defects with Dev/Product (see table below), not as test fixes — per `method/safety.md` the fix loop must never change product code or weaken assertions without requirement support, and none is available for these. 2) Decide whether to track these as formal bug reports (`qa-bug-report`) now or after refinement answers the related open questions. 3) Re-run once any fix lands.

## Command and environment

```
npx dotenv -e .env.local -- npx playwright test tests/functional/add-user.spec.ts tests/api/add-user.contract.spec.ts --reporter=list
```

- **Environment:** `local` (`BASE_URL=http://localhost:8081`, `API_BASE_URL=http://localhost:8080`), per `conventions/testing.md`.
- **Projects run:** `chromium`, `firefox`, `edge` (18 UI tests each) + `api` (5 API tests) = 59 total test executions.
- **Workers:** Playwright default parallel workers (local, non-CI).

## Summary

| Metric | Value |
|---|---|
| Total test executions | 59 |
| Passed | 39 |
| Failed (reproducible) | 19 |
| Failed (transient/flaky, not reproduced) | 1 — `[edge] a user can be created with position "Senior Test Engineer"` passed cleanly on an isolated re-run; attributed to parallel-load contention against the shared local Postgres instance, not a real cross-browser defect. |

## Reproducible failures (identical across chromium/firefox/edge; API runs once)

| Scenario | Test(s) | Status | Root cause (Test Application source) | Evidence |
|---|---|---|---|---|
| TS03 (FR3) | "leaving the Position dropdown on its placeholder is rejected..." | FAIL (×3 browsers) | `add-user.html`'s placeholder `<option>` has no `value` attribute, so it submits literal text `"Select position"`, which is non-empty and passes `add-user-scripts.js`'s only check (`!= ""`); the backend performs no position-allowlist check either. A user is created with position `"Select position"` instead of being rejected. | `test-results/.../leaving-the-position-dropdown.../test-failed-1.png` |
| TS03 (FR3) | "an invalid email is rejected..." | FAIL (×3 browsers) | Neither the frontend (no regex/format check beyond non-empty) nor the backend validates email format; `abc@` is accepted and a user is created. | `test-results/.../an-invalid-email-is-rejected.../test-failed-1.png` |
| TS04 (FR4) | "an exact-match duplicate email is rejected with the duplicate-email message" | FAIL (×3 browsers) | `add-user-scripts.js`'s `$.ajax` call has no `error:` callback, so a failed request (backend returns 404 on the thrown duplicate-email error) shows no message of any kind — not the ticket's `"A user with this email already exists"` text. | `test-results/.../an-exact-match-duplicate.../test-failed-1.png` |
| TS04 (FR4, FR11) | "a duplicate email with different capitalisation is rejected..." | FAIL (×3 browsers) | Same missing-error-message issue as above, compounded by `users-queries.js getUserByEmail` doing a case-sensitive exact match — a different-case duplicate is not even detected as a duplicate by the backend. | `test-results/.../different-capitalisation.../test-failed-1.png` |
| TS06 (FR6) | "a name with an apostrophe is saved and displayed exactly as entered" | FAIL (×3 browsers) | `users-queries.js createUser` builds the `INSERT` by raw string interpolation (`VALUES ('${user.name}', ...)`), not parameterised queries as the ticket's Technical notes require. An apostrophe in `O'Brien` breaks the SQL statement; the insert fails, the frontend shows no error (same AJAX gap as above), and no user is created. | `test-results/.../name-with-an-apostrophe.../test-failed-1.png` |
| TS08 (FR8) | "a payload missing a required field returns 400" | FAIL (`api` project) | Backend performs no request validation; a payload missing `email` is inserted as-is (status 201), not rejected with 400. | `test-results/api-.../required-field-returns-400-api/error-context.md` |
| TS08 (FR8) | "a payload with a position outside the allowed list returns 400" | FAIL (`api` project) | No allow-list check server-side; an arbitrary `position` value is accepted (status 201), not rejected with 400. | `test-results/api-.../allowed-list-returns-400-api/error-context.md` |
| TS09 (FR9, FR11) | "a duplicate email returns 409" | FAIL (`api` project) | `users-resource.js`'s `POST /users` catches every thrown error (including the service's duplicate-email `Error`) and always responds 404, never 409. | `test-results/api-.../duplicate-email-returns-409-api/error-context.md` |
| TS10 (NFR1) | "a SQL-injection string in the name is stored and returned as plain text" | FAIL (`api` project) | Same raw-string-interpolation issue as TS06: the injection payload `Robert'); DROP TABLE Users;--` contains an apostrophe that breaks the `INSERT` statement; the request fails with 404 instead of the expected 201 with the literal string stored. This is itself evidence the backend is **not** using parameterised queries — a real, security-relevant gap versus the ticket's explicit requirement, independent of whether any destructive statement would have executed. | `test-results/api-.../stored-and-returned-as-plain-text-api/error-context.md` |

## Passing scenarios (confirmed working as specified)

- TS01 — create a user successfully (happy path).
- TS02 — Position dropdown exactly lists the 9 allowed positions, and a user can be created for each of them (all 9, across all 3 browsers).
- TS03 — empty Name field is correctly rejected (the one TS03 sub-case the frontend's non-empty check does catch).
- TS06 — a name with a diacritic (`Zoë`) is saved and displayed correctly (no apostrophe, so the SQL-interpolation bug above doesn't trigger).
- TS07 — a valid payload returns 201 with an id.

## Classification (qa-analyse-failure)

All 19 reproducible failures are classified **Product defect**, not **Test defect**: each test's assertion is a direct, traceable restatement of a documented `jira.md` acceptance criterion (AC2, AC3, AC5) or API contract line, confirmed against the actual frontend/backend source rather than assumed. Per `method/safety.md`, the fix loop may only change test files created for this work item and must never weaken an assertion without requirement support — there is no requirement basis to weaken any of these, so none were changed. No test file was modified in response to these failures.

## Drift

None against `project.md`/conventions.
