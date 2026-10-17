---
work-id: "adhoc-20261013-add-user"
skill: "qa-map-code"
framework-version: "1.1.0"
created: "2026-10-13T19:25:00Z"
inputs:
  - source: "working tree, branch feature/testing-ai-tool-existing-dev-work"
    revision: "df9a439aa0cd25ed58318e0f5db23acb7dc7265b"
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
---

# Code Context — Add User

**Scope:** Map the implementation/automation surface for FR1–FR11/NFR1 (Add User). No branch was supplied for verification; this ticket is a Story in refinement, so this is a **repository evidence map**, not an implementation-verification report.
**Status:** complete
**Result:** The product (frontend `add-user.html`/`add-user-scripts.js`, backend `POST /users`, DB schema) lives in an **external Test Application** reached via `BASE_URL` and is not present in this repository at all — it cannot be inspected read-only from here. This repository already carries a ready-to-use Page Object (`pages/AddUserPage.ts`) and fixtures for the UI flow, but its only automated test (`tests/functional/add-user.spec.ts`) was deleted in the immediately preceding commit, and no API-level tests for `POST /users` have ever existed in this repo.
**Do next:** 1) Confirm with the team whether the external Test Application currently implements `add-user.html`/`POST /users` in the target test environment before scenarios are executed (Testing Prerequisite from `01_requirement_analysis.md`). 2) Treat `pages/AddUserPage.ts` as the existing automation surface to extend, not rebuild. 3) Add API-level coverage — none exists — per `03_coverage_assessment.md`.

## Component map (from `project.md`)

| Component | Path | Relevance to this ticket |
|---|---|---|
| Page objects | `pages/` | `AddUserPage.ts` (form interactions), `UsersListPage.ts` (post-creation listing, FR2), `ViewUserPage.ts` (not directly exercised by this ticket; out-of-scope viewing/editing) |
| Fixtures | `fixtures/testFixtures.ts` | Wires `addUserPage`, `usersListPage`, and the `users` JSON fixture (`newUser`, `seededUsers`) |
| Test data | `test-data/users.json` | Source of `newUser` and `seededUsers.*` fixtures used by UI tests |
| Functional tests | `tests/functional/*.spec.ts` | Home for the (deleted) `add-user.spec.ts`; `add-project.spec.ts` is the nearest sibling pattern |
| Config loader | `config/env.ts` | `BASE_URL`/`BROWSER`/`HEADLESS`/`TIMEOUT` resolution per environment |

The actual product under test (Users table, `add-user.html`, `add-user-scripts.js`, `POST /users` handler, DB schema) is **external** to this repository — `project.md` → Data stores and external dependencies: "No application data stores or services exist in this repository … The system under test is an external application reached via `BASE_URL`". It cannot be read or diffed from here; only the repo's own POM/fixture/test surface is inspectable.

## Existing automation surface (control/data flow as coded)

1. **Entry point:** `UsersListPage.open()` → `GET /index.html`, then `UsersListPage.goToAddUser()` clicks the "Add new user" link (`pages/UsersListPage.ts:20`), expected to land on `add-user.html`.
2. **Form interaction:** `AddUserPage` (`pages/AddUserPage.ts`) exposes locators `#name`, `#surname`, `#email`, `#position` (select by label) and a "Create user" button, plus a `#validationError` locator and `isValidationErrorVisible()` helper (`pages/AddUserPage.ts:14-19,36-45`) — this directly supports FR3's "validation message appears" check.
3. **Submission outcome:** `addUser()` composes `fillForm()` + `submit()` (`pages/AddUserPage.ts:40-43`); no current method asserts the post-submit URL, the created user's row, or an **error-message-on-server-failure** path (FR5) — that assertion existed only in the deleted spec (see below) and even there only checked the happy path and one generic validation case, not FR4/FR5/FR6 or any API check.
4. **Listing outcome:** `UsersListPage.isUserListed(fullName)` filters `#users-table-body tr` by text (`pages/UsersListPage.ts:30-35`), supporting FR2 and FR6 (special-character display).

## Dependencies, side effects and gaps relevant to requirements

| Requirement | Dependency / side effect | Finding |
|---|---|---|
| FR1 (position options) | `positionSelect.selectOption({ label })` | Page object selects by label text only; no helper currently lists/asserts the full set of 9 allowed options — would need to be exercised per-value in scenarios/tests. |
| FR2 (happy path) | Navigation `add-user.html` → `index.html`; `isUserListed` | Supported by existing POM methods; no current test exercises it (see Related tests below). |
| FR3 (validation) | `#validationError` locator, `isValidationErrorVisible()` | POM supports detecting *that* a validation message appeared, but not reading its *text*, nor distinguishing which field triggered it — only one of the three FR3 triggers (empty fields) was ever tested. |
| FR4 (duplicate email) | None — no locator/helper exists for the duplicate-email message text ("A user with this email already exists") | **Gap.** No POM support for reading this specific message; would need either a new locator or reuse of `#validationError` if the app renders the duplicate message through the same element (unconfirmed — external app). |
| FR5 (server error + retained values) | None — no POM support for simulating/asserting a server error or reading field values back after a failed submit | **Gap.** No helper reads field values back from the form after a failed submission. |
| FR6 (special characters) | `isUserListed(fullName)` text filter | Should work as-is for display verification, but filter is a substring text match (`hasText`) — diacritics/apostrophes should render literally if the app doesn't escape them; unverified since the app is external. |
| FR7–FR11, NFR1 (API: `POST /users` status codes, DB UNIQUE, SQL-injection handling) | None in this repository — `fixtures/testFixtures.ts` has no `request`/API fixture | **Gap.** This repo has zero API-test infrastructure; the `playwright-ts` pack supports API tests via the `request` fixture (`.github/ai-qa/framework/packs/playwright-ts/pack.md`), but no `tests/api/` directory or equivalent exists yet. |
| FR11 / Database UNIQUE constraint | N/A — database is external, inside the Test Application | Cannot be inspected; can only be behaviourally verified via the API (duplicate-email 409) or UI (AC3), not via direct DB access from this repo. |

## Related tests and docs

- **Deleted:** `tests/functional/add-user.spec.ts` existed at commit `3ae2568` and was removed in the immediately preceding commit `df9a439` ("Adding new jira and removing add user tests"). Its two tests covered only: (a) the AC1 happy path (create → redirect → listed), and (b) a single generic "missing fields" validation check (not the invalid-email or placeholder-position triggers). Neither test asserted API responses, duplicate email, server error, or special characters. This is historical evidence of intent, not current coverage — it no longer exists on this branch.
- **No API tests** exist anywhere in `tests/` (`tests/smoke/`, `tests/functional/`) — confirmed by directory listing (`app-loads.spec.ts`, `users-list.spec.ts`, `add-project.spec.ts`, `navigation.spec.ts`).
- **Docs:** `README.md` does not document the Add User flow specifically; `project.md` → Test landscape confirms Playwright-only, POM + fixtures + JSON test data conventions that any new tests must follow.

## Unknowns and confidence

- **Implementation status of the actual product** (whether `add-user.html`/`add-user-scripts.js`/`POST /users`/DB constraint are live in any configured environment) is **unknown** and unverifiable from this repository — flagged as a testing prerequisite in `01_requirement_analysis.md`. Treat this as a hypothesis-only map for the product side; the repo-side POM/fixture surface is directly inspected evidence (`Confidence: High`).
- No branch was supplied for implementation verification, and none was requested by the user for this ticket (it is explicitly a pre-development Story); `verify` mode was therefore not applicable.
- Uninspected: the external application's HTML/JS/API source — out of reach of this repository.

## Drift

None against `project.md`/conventions. Confirms the existing flagged unknown in `project.md` → Unknowns and conflicts (README's stale Saucedemo description vs the authoritative Users/Projects app) is consistent with this ticket's scope — no new drift introduced.
