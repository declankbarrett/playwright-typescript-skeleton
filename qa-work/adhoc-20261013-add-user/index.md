---
work-id: "adhoc-20261013-add-user"
skill: "qa-workflow"
framework-version: "1.1.0"
created: "2026-10-13T19:15:00Z"
inputs:
  - source: "jira.md (repo root, pasted ticket)"
    revision: "observed 2026-10-13, working tree matches HEAD df9a439"
  - source: ".github/ai-qa/project/project.md and conventions/*.md"
    revision: "provenance 2026-10-13"
---

# QA Work Index — Add User: create a new user from the UI

## TL;DR

- **Verdict:** Go with conditions — design is complete and reviewed (Needs Improvement → remediated); readiness is Amber, not Red, so design work proceeded without blocking. Execution of 2 of 11 scenarios (TS05, TS11) remains blocked pending one open question.
- **Top risks:** 1. **HIGH** — zero existing automated coverage for a Must-Test (risk 16) feature writing to the core Users data set (`01_requirement_analysis.md`, `03_coverage_assessment.md`). 2. **HIGH** — API Behaviour/Backend Logic/Database Layer/Data Integrity all rated HIGH in the regression matrix; the SQL-injection and duplicate-email-uniqueness checks are the most safety-critical (`05_regression_risk.md`). 3. **Amber-level ambiguity** — email-validation rule, case-insensitive duplicate-check layer, placeholder-position value and server-error trigger mechanism are all unresolved (`01_requirement_analysis.md`).
- **Next action:** Resolve the 4 open questions in refinement (owner: Product/Dev), in parallel with confirming the test environment's current implementation status, before scheduling execution.

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
| 9 | Extend `test-data/users.json` / fixtures if a reusable duplicate-email fixture is wanted (current scenarios are self-contained and do not strictly require it) | QA | FR4, TS04, TS09 | No | 01, 04 |

**Scope:** Single ticket, "Add User: create a new user from the UI" (`jira.md`), backlog refinement — test plan, scenarios and test cases ahead of sprint. No implementation exists yet in this repository or confirmed in any environment.
**Branch / revision:** `feature/testing-ai-tool-existing-dev-work` @ `df9a439aa0cd25ed58318e0f5db23acb7dc7265b` (working tree; no separate implementation branch supplied or applicable — Story in refinement)
**Workflow:** design
**Updated:** 2026-10-13T20:15:00Z

## Workflow step status and staleness

| Workflow | Step | Status | Artefact | Inputs checked / latest revision | Staleness / note |
|---|---|---|---|---|---|
| design | Analyse requirement | Complete | `01_requirement_analysis.md` | `jira.md` @ 2026-10-13 | Fresh |
| design | Code context / branch verification | Complete | `02_code_context.md` | working tree @ df9a439 | Fresh; no branch verification applicable (no implementation branch given) |
| design | Requirement coverage gaps | Complete | `03_coverage_assessment.md` | `01`, `02`, working tree @ df9a439 | Fresh; amended once (FR10 row note) after `07` |
| design | Design manual scenarios | Complete | `04_test_scenarios.md` | `01`, `03` | Fresh; revised after `07` (TS11 added, TS01–TS04/06/08/09 amended) |
| design | Regression risk | Complete | `05_regression_risk.md` | `01`, `02`, config/CI files @ df9a439 | Fresh; revised after `07` (Caching rating, API Behaviour scenario reference) |
| design | Automation plan | Complete | `06_automation_plan.md` | `04`, `05` | Fresh; revised after `07` (TS11 added) |
| design | Design review | Complete | `07_design_review.md` | `01`, `03`, `04`, `05` (as they stood before revision) | Fresh as a point-in-time review; remediation tracked in its own "Remediation record" section |
| design | Final test plan | Complete (Draft, pending approval) | `outputs/08_test_plan.md` | `01`–`07` | Fresh |
| full | Design checkpoint / approval | **Complete** | Gate log below | — | User approved 2026-10-13T20:11Z; test plan marked Final |

## Traceability matrix

| FR/NFR | Existing evidence (test/assertion or gap) | Scenarios | Automation decision (assessed / automated / deliberately not automated, with reason) | Test files | Last result (run / environment / time) |
|---|---|---|---|---|---|
| FR1 | Gap — no test ever asserted the full 9-option list | TS02 | Automate — E2E, `tests/functional/add-user.spec.ts` | Not yet created | Not run |
| FR2 | Gap — prior `add-user.spec.ts` covered this but was deleted (`df9a439`) | TS01, TS02 | Automate — E2E, same file | Not yet created | Not run |
| FR3 | Gap — only 1 of 3 triggers ever tested, no longer present | TS03 | Automate — E2E, same file | Not yet created | Not run |
| FR4 | Gap — never automated | TS04 | Automate — E2E, same file | Not yet created | Not run |
| FR5 | Gap — never automated | TS05 | Automate (blocked) — pending server-error trigger mechanism | Not yet created | Not run |
| FR6 | Gap — never automated | TS06 | Automate — E2E, same file | Not yet created | Not run |
| FR7 | Gap — no API tests exist in this repo | TS07 | Automate — Integration, new `tests/api/add-user.contract.spec.ts` | Not yet created | Not run |
| FR8 | Gap — no API tests exist | TS08 | Automate — Integration, same new file | Not yet created | Not run |
| FR9 | Gap — no API tests exist | TS09 | Automate — Integration, same new file | Not yet created | Not run |
| FR10 | Gap — no API tests exist; no trigger mechanism confirmed | TS11 | Automate (blocked) — pending server-error trigger mechanism | Not yet created | Not run |
| FR11 | Gap — DB is external/unreachable; only observable behaviourally | TS04, TS09 | Automate — via FR4/FR9's automation decisions | Not yet created | Not run |
| NFR1 | Gap — never exercised | TS10 | Automate — Integration, same new file | Not yet created | Not run |

## QA Summary

| Ticket | Readiness | Max risk | Coverage verdict | Scenarios written/not written | Automated/manual/not needed | Run result | Published |
|---|---|---|---|---|---|---|---|
| adhoc-20261013-add-user (Add User) | 🟡 Amber | HIGH | Insufficient (pre-design; 11/11 scenarios now designed) | 11 written / 0 not written | 9 automate, 2 automate (blocked — TS05, TS11), 0 manual-only, 0 not needed | Not run | Not published |

## Open questions

- Exact email-validation rule (client-side and server-side) beyond the single `abc@` example — owner Product/Dev (`01`).
- Whether duplicate-email case-insensitivity is enforced in application logic, DB collation, or both — owner Dev (`01`).
- Safe, repeatable mechanism to force a server error for FR5/FR10 — owner Dev/QA (`01`, `04`, `06`).
- Exact label/value of the placeholder Position option — owner Product/Dev (`01`).
- Whether the external Test Application currently implements this feature in any reachable environment — owner Dev (`02`).
- How the new `tests/api/` location and its CI scoping are adopted as a lasting project convention — owner QA/Dev (`06`); suggest `qa-configure refresh` once decided.

## Gate log

| Gate | Action / target | Exact payload or command / side effects | Approver and time | Outcome / ID or URL |
|---|---|---|---|---|
| Design approval (workflow `design`, step 9) | Finalise `outputs/08_test_plan.md` (currently Status: Draft) as the approved ticket test plan | No external side effects; local file only, on non-default branch `feature/testing-ai-tool-existing-dev-work` | User, 2026-10-13T20:11Z | Approved — `outputs/08_test_plan.md` Status set to Final |
| Independent design review (subagent) | `qa-review-tests` design mode on `01`, `03`, `04`, `05` | Read-only review; wrote `07_design_review.md` | Automatic per workflow step 8 (no user gate required for L1 artefact write) | Needs Improvement → remediated (see `07`'s Remediation record) |
