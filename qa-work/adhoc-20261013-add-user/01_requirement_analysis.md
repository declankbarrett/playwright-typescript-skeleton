---
work-id: "adhoc-20261013-add-user"
skill: "qa-analyse-requirement"
framework-version: "1.1.0"
created: "2026-10-13T19:20:00Z"
inputs:
  - source: "jira.md (repo root, pasted/example ticket — not a live provider)"
    revision: "observed 2026-10-13, working tree (untracked, matches HEAD df9a439)"
  - source: ".github/ai-qa/project/project.md"
    revision: "provenance commit df9a439, observed 2026-10-13"
  - source: ".github/ai-qa/project/conventions/{qa-process,git,integrations}.md"
    revision: "2026-10-13"
---

# Requirement Analysis — Add User: create a new user from the UI

**Scope:** Single-item analysis of `jira.md` ("Add User: create a new user from the UI", Type: Story) for backlog refinement ahead of the sprint. No implementation branch supplied; treated as not-yet-built per user context.
**Status:** complete
**Result:** Amber readiness — requirements are detailed and measurable, but automated test evidence is currently zero (prior UI spec deleted, no backend/API tests ever existed) and several validation/observability details are unconfirmed; this does not block design, but should be tracked.
**Do next:** 1) Confirm email-validation strictness and case-insensitive duplicate-check layer (app vs DB collation) before scenario execution. 2) Confirm/seed the seeded duplicate-email fixture (`tester@test.com`) and a server-error trigger mechanism in the test environment. 3) Proceed to `qa-map-code` to establish current implementation status.

## Source

No work-item provider is configured for this project (`conventions/integrations.md` → Work items: provider `None — manual/pasted`). `jira.md` at the repository root is used as the pasted ticket text per that convention. Title: "Add User: create a new user from the UI"; Type: Story.

## Functional requirements (FR)

| ID | Requirement | Source |
|---|---|---|
| FR1 | The "Add new user" page presents Name, Surname, Email fields and a Position dropdown offering exactly: Lead Test Engineer, Senior Test Engineer, Test Engineer, Junior Engineer, Lead Developer, Senior Developer, Test Developer, Junior Developer, Business Analyst. | Scope; Technical notes (Frontend) |
| FR2 | Submitting the form with all valid fields creates the user, navigates to the Users page, and the new user is listed there. | AC1 |
| FR3 | Submitting with any field empty, the placeholder position still selected, or an invalid email (e.g. `abc@`) shows a validation message and creates no user. Frontend performs this check before submit; backend repeats it. | AC2; Technical notes (Frontend + Backend) |
| FR4 | Attempting to create a user with an email that already exists (including different capitalisation) is rejected; the message "A user with this email already exists" is shown and no user is created. | AC3; Test notes |
| FR5 | If the server returns an error on submission of otherwise-valid details, an error message appears and the form retains the values the user entered (no data loss, no silent redirect). | AC4; Technical notes (Frontend: "if it fails, show the API's error message and keep the form values") |
| FR6 | Names containing special characters (e.g. `O'Brien`, `Zoë`) are saved and displayed exactly as entered, with no corruption/escaping artefacts. | AC5; Test notes |
| FR7 | `POST /users` accepts `{ name, surname, email, position }` and returns `201` with `{ id }` on success. | Scope; Technical notes (Backend); API checks |
| FR8 | `POST /users` returns `400` for invalid/missing required fields and for a position value outside the allowed list (server re-validates independently of the UI). | Scope; Technical notes (Backend); API checks |
| FR9 | `POST /users` returns `409` when the email already exists (duplicate check enforced server-side, not just client-side). | Scope; Technical notes (Backend); API checks |
| FR10 | `POST /users` returns `500` for any other/unexpected server error. | Technical notes (Backend) |
| FR11 | `Users.email` has a `UNIQUE` database constraint; duplicate-email rejection is backed by schema-level enforcement, not application logic alone. | Technical notes (Database) |

## Non-functional requirements (NFR)

| ID | Requirement | Source |
|---|---|---|
| NFR1 | Backend uses parameterised queries; a SQL-injection string supplied in the `name` field must be stored and returned as plain/literal text, never executed as SQL or used to alter data. | Technical notes (Backend: "Use parameterised queries"); API checks ("A SQL injection string in the name is stored as plain text") |

No other non-functional requirements (performance, logging, audit) are specified in the ticket — none specified beyond NFR1. This absence is flagged under Observability below rather than invented.

## Edge cases, flags and environment notes

- No feature flags are mentioned; this is a straightforward Story-level CRUD addition (create only).
- Out of scope (explicit): editing/deleting users, assigning users to projects — do not design scenarios for these.
- Position dropdown has an implied unnamed "placeholder" option (AC2 says "leave the placeholder position selected") whose exact value/label is not given in the ticket — flagged as an open question.
- Duplicate-email check must be case-insensitive per Test notes ("also with different capitals"); the ticket does not state whether this is enforced by application logic, a case-insensitive DB collation, or both — flagged as an open question against FR4/FR11.
- No environment-specific behaviour is described; the feature is expected to behave the same in `local`/`int`/`qa` (per `conventions/testing.md` environments).

## Readiness assessment

| Dimension | Score | Evidence |
|---|---|---|
| Requirements Clarity | 4/5 | AC1–AC5 are written as Given/When/Then with Technical and Test notes expanding each; objective and success/failure paths are clear. Deducted for an unstated email-validation rule (only one invalid example `abc@` given) and an unnamed placeholder-position value. |
| Acceptance Criteria Quality | 5/5 | All 5 ACs are measurable and verifiable; both success and failure paths are covered (AC1 vs AC2/AC3/AC4), and Test notes add concrete API status-code checks. |
| Testability | 3/5 | Behaviour is observable (UI + API), but no implementation is confirmed live yet (Story in refinement; see `02_code_context.md`), and AC4's "server returns an error" has no stated trigger mechanism for a test environment. |
| Automation Readiness | 3/5 | Inputs/outputs are clear and a Page Object (`AddUserPage.ts`) already exists in this repo, but a prior `tests/functional/add-user.spec.ts` was deleted in the last commit (`df9a439`, "removing add user tests") and no API-level tests exist at all — automation starts from zero current coverage. |
| Observability | N/A — not specified | Ticket states no logging/metrics/audit requirement; this is a gap, not a deliberate "not required" (see below). |
| QA Confidence | 4/5 | Confident to design and plan now; execution confidence is capped until environment/build status and the two open questions below are resolved. |

**QA Readiness: 🟡 Amber.** Design can proceed; the items below are tracked caveats, not blockers.

## QA Ownership and recommendation

- **QA Ownership:** E2E Coverage Required (customer-facing journey: add a user and see it listed; also gates data integrity for the out-of-scope "assign to project" feature).
- **QA Recommendation:** ✅ E2E Test Required (UI journey), with ✅ Integration Test Required also warranted for the `POST /users` contract (201/400/409/500 and the SQL-injection/plain-text check) — see `06_automation_plan.md` for the split between E2E and API-level automation.

## Observability review

| Item | Status |
|---|---|
| Logging required | Unknown — not specified in the ticket |
| Metrics required | Unknown — not specified in the ticket |
| Audit events required | Unknown — not specified in the ticket |
| Coverage status | **Missing** — the ticket states no observability requirement for a data-creating endpoint; worth raising in refinement since it is expensive to retrofit once the Users table is live. |

## Testing prerequisites

- [ ] Confirmed, running instance of the Test Application (frontend `add-user.html`/`add-user-scripts.js` and backend `POST /users`) reachable via the project's `BASE_URL` for the environment used (`local` default per `conventions/testing.md`) — **status unknown**; see `02_code_context.md`.
- [ ] Seed/fixture data for the duplicate-email scenario: the ticket's Test notes use `tester@test.com` as the existing-user example; the repository's `test-data/users.json` currently seeds `developer@test.com` and `business@test.com` only — **not yet aligned**.
- [ ] A safe, repeatable way to force a server error for AC4/500 in the configured test environment — **mechanism not described in the ticket or repository**.
- [ ] Confirmation of the exact client-side and server-side email-validation rule (only `abc@`-style "no domain" is exemplified).
- [ ] Confirmation of the placeholder Position option's exact value/label.
- No credentials or secret values are required beyond the existing `BASE_URL`/`BROWSER`/`HEADLESS`/`TIMEOUT` environment-variable names already defined in `conventions/testing.md`.

## Automation impact

**Medium** — new test scenarios are required (new spec file(s) for UI E2E and, if the pack supports it, new API-level tests); no new fixture *types* are anticipated since `AddUserPage.ts`, `UsersListPage.ts` and the `users` JSON fixture already exist, but the previously-removed `add-user.spec.ts` must be rebuilt and extended, and `test-data/users.json` needs a duplicate-email-ready fixture.

## Risk ranking

- **Change Impact: 4/5** — Add User is a primary, frequently-used journey (per `project.md` Summary: "adding users" is a principal journey) and a prerequisite for the (out-of-scope) project-assignment feature.
- **Failure Criticality: 4/5** — a broken duplicate-email check, SQL-injection mishandling, or silent data loss on server error would corrupt a core data set (Users) used across the app; not quite a regulatory/outage-level breach (score 5), so set at 4.
- **Risk Score:** 4 × 4 = **16**.
- **Modifier applied:** no existing passing automated coverage for this flow (prior spec deleted, API never tested) → per `readiness.md`, items with no existing test coverage are bumped one tier regardless of score; the raw score of 16 already sits in **Must Test** (≥16), so the bump is confirming rather than changing the tier.
- **Priority tier: Must Test** — full test coverage (UI E2E + API) required before release.

## Risk areas, ambiguities and missing information

1. **Email validation rule (FR3/FR8):** only `abc@` is given as an invalid example; the exact accepted/rejected pattern (e.g. is `test@domain` without a TLD valid? are leading/trailing spaces trimmed?) is not stated.
2. **Case-insensitive duplicate enforcement layer (FR4/FR11):** Test notes require rejecting `TESTER@TEST.COM`-style variants, but a plain SQL `UNIQUE` constraint on `email` is case-sensitive by default in most engines — it is unclear whether case-insensitivity is enforced in application logic, a DB collation/normalisation (e.g. storing/comparing lower-cased email), or both.
3. **Placeholder position value:** AC2 refers to "the placeholder position" without naming its value/label (e.g. `"-- Select a position --"`).
4. **Server-error trigger (FR5/FR10):** AC4 and the Test notes say "force a server error" with no stated mechanism (fault injection, stub, specific invalid payload that triggers `500`, etc.).
5. **Observability:** no logging/metrics/audit requirement stated for a data-creating endpoint (see Observability review above).

None of these block design (readiness is Amber, not Red); they are carried into Open Questions in the index and test plan.

## Drift

None observed against `.github/ai-qa/project/project.md` or its conventions. One related note: `project.md` → Unknowns and conflicts already flags that `README.md`'s SaucedemoDemo description is stale and the Users/Projects "Test Application" is authoritative — consistent with this ticket's scope.
