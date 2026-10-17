---
work-id: "adhoc-20261013-add-user"
skill: "qa-generate-tests"
framework-version: "1.1.0"
created: "2026-10-13T20:35:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/04_test_scenarios.md"
    revision: "2026-10-13T19:40:00Z (revised after 07)"
  - source: "qa-work/adhoc-20261013-add-user/06_automation_plan.md"
    revision: "2026-10-13T20:00:00Z (revised after 07)"
  - source: "qa-work/adhoc-20261013-add-user/outputs/08_test_plan.md"
    revision: "Final, approved 2026-10-13T20:11Z"
  - source: ".github/ai-qa/framework/packs/playwright-ts/generation.md"
    revision: "df9a439aa0cd25ed58318e0f5db23acb7dc7265b"
  - source: "Test Application source (/Users/declan.barrett/Documents/Personal Notes/AI Testing/test-application), local Docker deployment"
    revision: "inspected 2026-10-13 (frontend/add-user.html, frontend/js/users/add-user-scripts.js, backend/users/*.js)"
---

# Test Generation Record — Add User

**Result:** 9 of 11 approved scenarios (TS01-TS04, TS06-TS10) generated as runnable Playwright tests across one new E2E spec and one new API spec; TS05 and TS11 remain not generated, per the automation plan's explicit "do not generate until unblocked" instruction.
**Do next:** 1) Run the suite (`09_execution.md`). 2) Triage failures via `qa-analyse-failure` classification (recorded there, not here). 3) Decide with the team whether to adopt `tests/api/` as a lasting convention (`qa-configure refresh`).

## Generated artefacts

| File | Scenario(s) | Notes |
|---|---|---|
| `pages/AddUserPage.ts` | — (support) | New page object for `add-user.html`, following `pages/AddProjectPage.ts` / `pages/BasePage.ts` conventions. |
| `fixtures/testFixtures.ts` | — (support) | Added `addUserPage` fixture; extended `UserTestData` with `newUserTemplate` and `allowedPositions`. |
| `fixtures/apiFixtures.ts` | — (support, new) | New fixture file providing `apiContext` (Playwright `request` fixture bound to `API_BASE_URL`, the backend's own port — distinct from the frontend `BASE_URL`) and a `users` test-data fixture, kept separate from `testFixtures.ts` because API specs do not use a browser `page`. |
| `config/env.ts`, `.env.local`, `.env.int`, `.env.qa` | — (support) | Added `API_BASE_URL` (default `http://localhost:8080`, matching `add-user-scripts.js`'s hardcoded `API_URL`). |
| `test-data/users.json` | — (support) | Added `newUserTemplate` and the 9-value `allowedPositions` list (FR1), reused by both specs. |
| `playwright.config.ts` | — (support) | Added a dedicated `api` project (`testMatch: '**/tests/api/**'`) and `testIgnore` on `chromium`/`firefox`/`edge` for that path — resolves the automation plan's CI-impact "Option A" so the new API spec runs once, not 3x. |
| `tests/functional/add-user.spec.ts` | TS01, TS02 (+ 9 position sub-tests), TS03 (3 sub-tests), TS04 (2 sub-tests), TS06 (2 sub-tests) | One `test()` per independently-failable sub-case per `07_design_review.md`'s diagnostic-granularity finding. |
| `tests/api/add-user.contract.spec.ts` | TS07, TS08 (2 sub-tests), TS09, TS10 | Uses `apiContext` directly against `POST /users` / `GET /users/:id` / `GET /users`. |

## Not generated (by design)

- **TS05** (server error preserves form values, FR5) and **TS11** (API 500, FR10) — both remain **Automate (blocked)** per `06_automation_plan.md`; no safe, repeatable fault-injection mechanism is confirmed (Open Question 3). Generating a test that fakes this would not exercise a real failure path, so none was written. Revisit once the mechanism is agreed.

## Divergences discovered while generating (not acted on here)

Reading the actual Test Application source (`frontend/add-user.html`, `frontend/js/users/add-user-scripts.js`, `backend/users/*.js`) while generating these tests surfaced several places where the current implementation does not match `jira.md`'s stated behaviour. These were **not** used to weaken any assertion — the generated tests assert the ticket's acceptance criteria as written, per `method/safety.md`'s "never weaken assertions without requirement support" rule — and are instead recorded as defect candidates for `09_execution.md` / `qa-analyse-failure`:

- No client- or server-side email-format or position-allow-list validation exists (only a non-empty check); the placeholder `<option>` has no `value` attribute, so it submits the literal label text `"Select position"` rather than an empty string.
- The duplicate-email check (`users-queries.js getUserByEmail`) is a case-sensitive exact match only — no case-insensitive layer.
- `users-queries.js` builds SQL by raw string interpolation (not parameterised, contrary to the ticket's Technical notes), so a name containing an apostrophe (e.g. `O'Brien`) breaks the `INSERT` statement.
- `users-resource.js` catches every error (duplicate email, DB failure, anything else) and always returns **404** with `{ message }`, never the ticket's specified **400** / **409** / **500**.
- The frontend's `$.ajax` call in `add-user-scripts.js` has no `error:` callback, so a failed request shows no error message and leaves the user on the form with no feedback — not strictly contradicting AC4 (form values are in fact kept, since nothing resets them), but no error message appears.

## Drift

None against `project.md`/conventions. The new `tests/api/` location and `API_BASE_URL` variable are additive, not yet confirmed as a lasting convention — see automation plan's CI-impact note; suggest `qa-configure refresh` once the team agrees.
