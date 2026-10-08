---
work-id: adhoc-20261008-users-search-filter
skill: qa-test-plan
framework-version: ai-qa (as configured in .github/ai-qa, 2026-10-08)
created: 2026-10-08T20:15:00Z
inputs:
  - source: jira.md (pasted ticket, "Search and filter users on the Users list")
    revision: working tree, 2026-10-08
  - requirement.md, context.md, coverage.md, design.md, regression.md, automation.md, review.md (this work item, all 2026-10-08)
---

# Test Plan — Search and filter users on the Users list

**Author:** QA agent (AI-QA framework)
**Date:** 2026-10-08
**Project:** playwright-typescript-skeleton (per `project.md` — see Drift below for scope mismatch)
**Scope:** Ticket (single item, no provider — pasted `jira.md`)
**Status:** Draft — pending explicit design approval

## ⚠ Drift / scope notice
This repository is a Playwright skeleton that exercises only the public `saucedemo.com` demo (`project.md`); it owns no application/backend code. The ticket describes an unrelated Users-app feature (UI + Node/SQL backend) that does not exist anywhere in this repository (`context.md`). **By explicit user decision (2026-10-08)**, this plan proceeds as a design exercise: full analysis, scenarios, regression, automation and generated test skeletons are produced, but automation cannot be executed in this repository. Real execution requires the actual Users-app repository/environment.

## Summary
The ticket adds free-text search (name/surname/email, case-insensitive, partial) and a Position filter to an existing Users list, backed by new optional `search`/`position` query parameters on `GET /users` and a new `GET /users/positions` endpoint. Technical notes explicitly flag an existing SQL-injection vulnerability pattern that the new code must not repeat (parameterised queries required). 12 acceptance criteria map to FR1–FR12; 4 non-functional requirements (NFR1–NFR4) cover security, escaping, the new endpoint contract and documentation. Exclusions: pagination, sorting, saved searches, Projects-page search (explicitly out of scope per ticket).

## QA Summary

| Ticket | Readiness | Max risk | Coverage verdict | Scenarios written/not written | Automated/manual/not needed | Run result | Published |
|---|---|---|---|---|---|---|---|
| adhoc-20261008-users-search-filter | 🟡 Amber | 🔴 CRITICAL (Backend Logic — SQL injection) | Insufficient (pre-automation); design review Pass (post-fix) | 12 written / 5 not written (justified) | 10 automate / 2 manual / 0 not needed | Not run — no environment exists in this repository | No |

## Risk Assessment
Highest risk: **CRITICAL** — Backend Logic. The ticket's own technical notes acknowledge the pre-existing query pattern "allows SQL injection" and mandates parameterised queries (`$1`, `$2`) plus `%`/`_` escaping for the new feature. Three further areas score **HIGH**: API Behaviour, Existing Endpoints and Backward Compatibility, because `GET /users` is modified in place and must reproduce its current no-param behaviour exactly, and Database Layer, because new `ILIKE` logic touches every row on every search. See full matrix below. Change Impact × Failure Criticality = 3×3=9 raw, adjusted to 11 ("Should Test") on the ticket as a whole, but the injection check (S12) is independently escalated to **Must Test** regardless of aggregate score, per evidence-based security escalation (`regression.md`).

Key assumption/mitigation: all risk scoring here is against the ticket's **stated** design (no real implementation to inspect); re-score with `verify` mode once real code/branch evidence exists.

## Requirements Breakdown

| ID | Requirement | Source |
|---|---|---|
| FR1 | Free-text search across name, surname, email; case-insensitive; partial match | AC1 |
| FR2 | Search matches concatenated full name (`name \|\| ' ' \|\| surname`) | AC2 |
| FR3 | Position filter narrows to exact position match | AC3 |
| FR4 | Position dropdown: distinct positions, alphabetical, "All positions" default | AC4 |
| FR5 | Search + filter combine with AND semantics | AC5 |
| FR6 | No-results message "No users match your search" | AC6 |
| FR7 | Clear resets search/filter and reloads full list | AC7 |
| FR8 | ~300ms debounce, no Enter required | AC8 |
| FR9 | Row actions work on filtered rows; Remove preserves filter state | AC9 |
| FR10 | `GET /users` optional `search`/`position` params; neither → unchanged legacy behaviour | AC10 |
| FR11 | No-match query → 200 with `[]`, never 404 | AC11 |
| FR12 | SQL-injection-safe, literal-text treatment of `'`, `%`, `_`, injection strings | AC12 |
| NFR1 | Parameterised queries (`$1`/`$2`); must not reuse vulnerable string-concatenation pattern | Technical notes |
| NFR2 | Escape `%` and `_` before use in `ILIKE` | Technical notes |
| NFR3 | New `GET /users/positions` returns distinct positions | Technical notes |
| NFR4 | `readme.md` Endpoints section updated | Technical notes |

Ambiguities (see Open Questions): Position filter match semantics (exact vs partial); debounce assertion tolerance; `/users/positions` inclusion of zero-user positions; auth/authz presence.

## Traceability Matrix

| FR/NFR | Existing evidence (test/assertion or gap) | Scenarios | Automation decision | Test files | Last result |
|---|---|---|---|---|---|
| FR1 | None found (`coverage.md`) | S1, S3 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR2 | None found | S2 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR3 | None found | S4 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR4 | None found | S5 | Automate — E2E (UI) + Integration (API) | `tests/functional/users-search.spec.ts`; `tests/functional/api/users-positions.spec.ts` | Not run |
| FR5 | None found | S6 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR6 | None found | S7 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR7 | None found | S8 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR8 | None found | S3 | Automate — E2E (tolerant timing wait) | `tests/functional/users-search.spec.ts` | Not run |
| FR9 | None found | S9 | Automate — E2E | `tests/functional/users-search.spec.ts` | Not run |
| FR10 | None found | S10 | Automate — Integration (API) | `tests/functional/api/users-query.spec.ts` | Not run |
| FR11 | None found | S11 | Automate — Integration (API) | `tests/functional/api/users-query.spec.ts` | Not run |
| FR12 | None found | S12 | **Automate — Integration (API), highest priority** | `tests/functional/api/users-query-security.spec.ts` | Not run |
| NFR1 | None found (code-level) | — (manual code review) | Manual — PR review checklist | — | Not run |
| NFR2 | None found | Folded into S12 | Automate (with S12) | `tests/functional/api/users-query-security.spec.ts` | Not run |
| NFR3 | None found | S5 (API half) | Automate — Integration | `tests/functional/api/users-positions.spec.ts` | Not run |
| NFR4 | N/A — documentation | — | Manual — release checklist | — | Not run |

All rows: **deliberately not automated** only for NFR1 (code review) and NFR4 (docs); every other FR/NFR is automated-by-design but **blocked from execution** in this repository (no implementation/environment).

## Test Scenarios
Full scenario bodies (BDD, with Environment/Cleanup/Evidence/Result/Status/Notes per scenario) are in `qa-work/adhoc-20261008-users-search-filter/design.md` — not duplicated here to avoid drift between copies. Summary:

- **S1–S9 (UI, E2E):** text search match/case/partial, full-name match, debounce timing, position filter, dropdown contents/order, combined filter (dual "Jan Kowalski" fixture), no-results message, Clear, Remove-while-filtered state persistence.
- **S10–S12 (API, Integration):** query-param optionality (4 combinations, back-compat), empty-match `200 []`, SQL-injection/special-character safety (highest priority).

**Scenarios Not Written** (from `design.md`):
- Per-combination duplicate of S10 — folded into one multi-step scenario (dedup rule).
- Unit-level `ILIKE` SQL construction test — developer/unit-test territory, not manual/E2E.
- Load/performance testing — explicitly out of scope on the ticket; no NFR stated.
- Authentication/authorisation scenarios — no such requirement in evidence; not invented.
- Documentation review (NFR4) — tracked as a checklist item below, not a test scenario.

## Automation
See `automation.md` for full per-scenario factors/level/location/mocking/environment/CI detail. Overall impact: **High** (no existing test file, fixture, page object, API client or test-pack convention exists for this feature). 10 of 12 scenarios Automate (9 as new Playwright E2E specs, 3 folded as Integration API specs using Playwright's `request` fixture — S5's API half and S10/S11 share `users-query.spec.ts`, S12 kept in its own file for security-suite visibility); NFR1 and NFR4 are Manual (code review / documentation checklist).

## Regression Impact
`GET /users` is modified in place (not a new endpoint) — any deviation in its no-param response is a breaking regression for every existing consumer (AC10). The acknowledged SQL-injection remediation (NFR1) is the single highest-risk change in this ticket. See full 13-area matrix below for all areas and their individual justification.

## Environment Impact
**Blocked.** No `BASE_URL`, deployed instance, or backend for this feature exists anywhere accessible to this repository. `playwright.yml` CI only runs against `saucedemo.com`. Unblocking requires either the real Users-app repository/environment or an explicitly requested local mock/stub — neither was available or requested this session.

## Open Questions
- Is the Position filter match exact-only, or should it support partial/case-insensitive matching like text search? (owner: ticket author/PM)
- What debounce tolerance is acceptable for an automated timing assertion (proposed ±100ms)? (owner: QA/dev agreement)
- Should `GET /users/positions` exclude positions with zero active users? (owner: backend dev)
- Is there an authentication/authorisation layer in front of `/users` and `/users/positions` that the ACs omitted? (owner: ticket author)
- When/if the real Users-app repository becomes available, re-run `qa-map-code` in `verify` mode against its branch to convert this design-stage plan into a verified one.

## Regression Matrix (full 13 areas)

| Area | Risk Level | Why? | Regression Needed? | Automation Update Needed? |
|---|---|---|---|---|
| API Behaviour | HIGH | New optional params on `GET /users` must preserve legacy no-param response | Yes | Yes |
| Existing Endpoints | HIGH | `GET /users` modified in place, not a new endpoint | Yes | Yes |
| Feature Flags | LOW | None mentioned | Unknown | No |
| Caching | LOW | Not mentioned either way | Unknown | No |
| Authentication / Authorisation | LOW | Not stated; flagged as open question, not assumed safe | Unknown | No |
| API Gateway | LOW | No gateway/proxy layer described | Unknown | No |
| Backend Logic | **CRITICAL** | Ticket acknowledges existing SQL-injection-prone pattern; new code must use parameterised queries | Yes | Yes |
| Database Layer | HIGH | New `ILIKE` across 4 fields plus escaping — non-trivial SQL touching every row on every call | Yes | Yes |
| Data Integrity | MEDIUM | Read-only search; Remove-while-filtered (FR9) is the integrity-relevant interaction | Yes | Yes |
| Logging / Monitoring | MEDIUM | Missing from ticket entirely — new public search param with no stated logging is a blind spot | Unknown | Unknown |
| Environment Configuration | LOW | No environment-specific behaviour described | Unknown | No |
| CI/CD Pipeline | LOW | This repo's CI only targets saucedemo.com; real app's CI/CD unknown | Unknown | Unknown |
| Backward Compatibility | HIGH | AC10 requires exact unchanged behaviour with no params | Yes | Yes |

Full detail (targeted scenarios, production impact, rollout validation per HIGH/CRITICAL area) is in `regression.md`.

## Design approval
Presented below for explicit approval before proceeding to the `automate` stage (branch creation + test generation).
