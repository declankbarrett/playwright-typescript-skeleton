---
work-id: "adhoc-20261013-add-user"
skill: "qa-regression-risk"
framework-version: "1.1.0"
created: "2026-10-13T19:50:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
  - source: "qa-work/adhoc-20261013-add-user/02_code_context.md"
    revision: "2026-10-13T19:25:00Z"
  - source: "playwright.config.ts, .github/workflows/playwright.yml, package.json scripts"
    revision: "df9a439aa0cd25ed58318e0f5db23acb7dc7265b"
---

# Regression Risk — Add User

**Scope:** 13-area regression matrix for the Add User story (new `POST /users` endpoint, new `add-user.html` page, new `Users.email` UNIQUE constraint). No project-configured extra regression areas were found (`conventions/qa-process.md` → Extra regression areas: ∅).
**Status:** complete (revised after `07_design_review.md`)
**Result:** **Highest supported risk: HIGH** (API Behaviour, Backend Logic, Database Layer and Data Integrity) — this is a brand-new write path into a core, shared data set (Users) with security-relevant validation (SQL-injection handling) and a new schema constraint; no area is CRITICAL because nothing here is an existing, already-live path being changed (it is new, additive functionality) and failure is recoverable (no auth/payment/outage path).
**Do next:** 1) Ensure Logging/Monitoring observability for new error paths is explicitly decided in refinement (currently unspecified — flagged Unknown, not LOW). 2) Add the new `tests/api/` spec to CI awareness and confirm per-browser-project API-test duplication is acceptable (see CI/CD Pipeline row). 3) Confirm no existing Users-list rendering test is broken by new edge-case data (special characters, SQL-injection string).

> **Revision note:** The Caching row was re-rated LOW → MEDIUM, and the API Behaviour targeted-scenario reference was corrected, following `07_design_review.md` (High and Critical findings respectively). See that review's "Remediation record."

## Regression Risk Matrix

| Area | Risk Level | Why? | Regression Needed? | Automation Update Needed? |
|---|---|---|---|---|
| API Behaviour | **HIGH** | Brand-new `POST /users` contract (201/400/409/500) is introduced; no existing API tests exist in this repo to regress against, so the entire contract is new, untested surface (`02_code_context.md`). | Yes | Yes — new API test file required (none exists). |
| Existing Endpoints | MEDIUM | The existing Users listing (`index.html` / `UsersListPage`) and `ViewUserPage` consume data created by this new endpoint; malformed data (special characters, SQL-injection string, long/empty fields) could break existing list/view rendering even though those endpoints themselves are unchanged. | Yes | Possibly — extend `tests/smoke/users-list.spec.ts` assertions if it doesn't already tolerate edge-case names. |
| Feature Flags | LOW | No feature flag is mentioned in the ticket, `project.md`, or the repository's test/config evidence. | No | No |
| Caching | MEDIUM (revised after `07_design_review.md`) | No caching layer is documented in `project.md` → Data stores and external dependencies or anywhere in this repo. If the external Test Application caches the Users list server-side, a newly created user might not appear immediately on redirect (would fail AC1/FR2) — this is **unknown, not confirmed absent**; per `regression-areas.md` ("never treat missing evidence as LOW"), an unconfirmed area is rated MEDIUM rather than LOW until positive evidence of no caching layer is obtained. | Unknown | Unknown |
| Authentication / Authorisation | LOW | No authentication/authorisation requirement is stated for this ticket or found in `project.md`/fixtures (no login flow in `fixtures/testFixtures.ts`). | No | No |
| API Gateway | LOW | No API gateway is evidenced; the app is reached directly via `BASE_URL` per `project.md` → Environments. | No | No |
| Backend Logic | **HIGH** | New validation logic is introduced end-to-end: required-field checks, email-format check, position allow-list check, duplicate-email check and SQL-injection-safe parameterisation — all new branches with no existing automated coverage (escalation rule: new/changed backend logic). | Yes | Yes |
| Database Layer | **HIGH** | A new `UNIQUE` constraint is added to `Users.email`, and a new write path (`INSERT`) into the Users table is introduced (escalation rule: database schema or persistence logic is modified). | Yes | Yes (behavioural, via the API 409 check — the schema itself is external and cannot be tested directly from this repo). |
| Data Integrity | **HIGH** | Duplicate-email prevention, special-character preservation and SQL-injection-safe storage all directly protect the integrity of the shared Users data set that the (out-of-scope) project-assignment feature will later depend on. | Yes | Yes |
| Logging / Monitoring | MEDIUM (evidence-limited) | No logging/metrics/audit requirement is specified for this new write endpoint or its error paths (`01_requirement_analysis.md` → Observability: Missing). Absence of an observability decision on a data-creating endpoint is itself a gap worth escalating rather than defaulting to LOW. | Unknown | Unknown |
| Environment Configuration | LOW | No environment-specific behaviour is described; the same flow is expected across `local`/`int`/`qa` (`conventions/testing.md` → Environments). | No | No |
| CI/CD Pipeline | MEDIUM | `playwright.config.ts` has `testDir: './tests'` with no `testMatch` restriction, so a new `tests/api/*.spec.ts` file will be auto-discovered and run by `npm run test:int` in CI across all three configured browser projects (chromium/firefox/edge) — API-only tests would needlessly triple-execute unless scoped to a single project, adding CI runtime without added assurance. | Yes (pipeline-scope decision) | Yes — automation plan must specify how the new API spec is scoped to avoid tripling. |
| Backward Compatibility | LOW | This is purely additive (new endpoint, new page, new constraint); nothing existing is being changed or removed, and the ticket's Out-of-scope section confirms edit/delete/assignment are untouched. | No | No |

## Escalation rules applied

- **Database schema/persistence changes** → escalated Database Layer and Data Integrity to HIGH.
- **New/changed backend logic** (multi-branch validation, security-relevant input handling) → escalated Backend Logic to HIGH.
- No feature flags, caching confirmation, auth changes or endpoint gating were found, so those rules were not triggered — but Caching and Logging/Monitoring are left at a *non-LOW, evidence-limited* rating rather than defaulted to LOW, per the "never mark LOW without justification" rule, because their absence of evidence is itself a refinement gap.

## HIGH-area handling

### API Behaviour (HIGH)
- **Targeted scenario:** TS07–TS09, TS11 (`04_test_scenarios.md`) — 201/400/409/500 contract checks; TS10 (SQL-injection-stored-as-plain-text) separately reinforces NFR1 under Backend Logic/Data Integrity below. *(Corrected after `07_design_review.md`: the previous "TS07–TS10" reference miscounted TS10 as the 500 check, when TS10 is actually the NFR1 SQL-injection scenario; TS11 is the 500 check, added post-review.)*
- **Automation reinforcement:** new `tests/api/add-user.contract.spec.ts` (see `06_automation_plan.md`).
- **Production impact if missed:** silent contract drift (e.g. wrong status code or missing `id`) would break any future consumer of this endpoint, including the out-of-scope project-assignment feature.
- **Rollout validation:** smoke-check the 201/400/409 triad against the target environment immediately after first deployment, before relying on the UI flow alone.

### Backend Logic (HIGH)
- **Targeted scenario:** TS03, TS04, TS08, TS10.
- **Automation reinforcement:** API-level boundary tests for each validation branch (missing field, invalid email, disallowed position, duplicate email, SQL-injection string) — see `06_automation_plan.md`.
- **Production impact if missed:** invalid or malicious data entering the Users table; a bypassable duplicate check would defeat FR4/FR11 entirely.
- **Rollout validation:** run TS03/TS04/TS08/TS10 against the first deployed environment before treating the endpoint as production-ready.

### Database Layer (HIGH)
- **Targeted scenario:** TS04, TS09 (only behavioural evidence is available; the schema itself is external and unreachable from this repo per `02_code_context.md`).
- **Automation reinforcement:** none beyond the API 409 check is possible from this repository; recommend the team owning the Test Application confirm the `UNIQUE` constraint directly if they have DB access.
- **Production impact if missed:** duplicate users could be silently created, corrupting any later join to the Projects feature.
- **Rollout validation:** attempt a duplicate-email create immediately post-deployment and confirm 409, not just a UI message.

### Data Integrity (HIGH)
- **Targeted scenario:** TS04, TS06, TS10.
- **Automation reinforcement:** same API spec as above; also extend `tests/smoke/users-list.spec.ts` if it asserts on row count/content, to tolerate special-character and injection-string names without breaking.
- **Production impact if missed:** corrupted or duplicated records in the shared Users table; worst case, a successful SQL-injection attempt against a core table.
- **Rollout validation:** re-run TS06/TS10 after deployment and manually inspect the stored value (not just the UI) if DB access is available to the team.

## Optional ranked priority (supplements the matrix; does not replace it)

- **Change Impact:** 4/5 — important, frequently used feature and prerequisite for the (out-of-scope) project-assignment flow.
- **Failure Criticality:** 4/5 — core feature with real data-integrity consequences, not an outage/regulatory-breach path.
- **Raw Risk Score:** 16.
- **Modifier:** no existing test coverage (+1 tier bump, confirming rather than changing the tier) — see `01_requirement_analysis.md`.
- **Priority tier: Must Test** (≥16) — full coverage (API + E2E) required before release, consistent with the QA Ownership/Recommendation already set in requirement analysis.

## Assumptions and open questions

- Assumed no authentication/authorisation layer exists for this flow, based on the absence of any login step in `fixtures/testFixtures.ts` and no mention in the ticket or `project.md`.
- Caching and Logging/Monitoring ratings are evidence-limited, not confirmed-safe; flagged above rather than silently defaulted to LOW.
- See `01_requirement_analysis.md` → Risk areas for the four substantive open questions (email regex, duplicate case-insensitivity layer, server-error trigger, placeholder value) that also affect regression confidence.

## Drift

None against `project.md`/conventions.
