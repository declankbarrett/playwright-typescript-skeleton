# QA process conventions

Rendered by `qa-configure` after discovery and L5 approval, 2026-10-17. Cannot weaken `method/safety.md`.

## Readiness

| Threshold / decision owner | Value | Status | Evidence/source |
|---|---|---|---|
| Six scores, RAG, ownership and recommendation | Framework rubric applies unmodified (`method/readiness.md`) | ★ 2026-10-17 | No project-specific override found |

## Definition of done and QA evidence

| Evidence / approval requirement | Value | Status | Evidence/source |
|---|---|---|---|
| Required FR/NFR, test, run, review and release evidence | Framework candidate applies unmodified (`defaults/qa-process.md`) | ★ 2026-10-17 | No CONTRIBUTING/DoD doc found |

## Test plan destination and timing

| Destination / when plan is published | Value | Status | Evidence/source |
|---|---|---|---|
| Local: `qa-work/<work-id>/outputs/08_test_plan.md`; publish only on request after exact destination/content approval | Framework default applies unmodified | ★ 2026-10-17 | No project override found; no remote docs system (Q4-A) |

## Comment templates

| Provider / template path | Value | Status | Evidence/source |
|---|---|---|---|
| None — no work-item provider configured | ∅ | — | Confirmed Q3 Option A (no ticket system) |

## Extra regression areas

| Area | Why included | Status | Evidence/source |
|---|---|---|---|
| None beyond the framework's mandatory 13 areas | — | ∅ | No project-specific regression areas identified |

## Fix loop

| Max iterations / scope / owner | Value | Status | Evidence/source |
|---|---|---|---|
| Framework default: max 3 iterations, stop early on repeat, test files only | ★ 2026-10-17 | — | No project override found |

## Commands safe to run (L3 exemptions)

| Command and selector | Environment / duration / data effects / cleanup | Status | Evidence/source |
|---|---|---|---|
| None | — | ∅ | No command confirmed safe for unattended L3 execution; apply L3 gate to all full/environment-dependent runs |

## Work-id rule

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Explicit argument → ticket from branch (not applicable, no ticket syntax) → `adhoc-<yyyymmdd>-<slug>` | `adhoc-<yyyymmdd>-<slug>` (always, since no ticket system exists) | ★ 2026-10-17 | Confirmed Q3 Option A; conventions/git.md "Ticket syntax" = none |

## qa-work policy

| Commit / ignore / retention policy | Value | Status | Evidence/source |
|---|---|---|---|
| Default: commit `index.md` and `outputs/`; ignore everything else | Framework default applies unmodified | ★ 2026-10-17 | .gitignore:14-19 (`ai-qa:start`/`ai-qa:end` managed block) matches framework default exactly |

## Scenario format

| Format | Value | Status | Evidence/source |
|---|---|---|---|
| `bdd` (Given / When / Then) or `steps` | `bdd` | ★ 2026-10-17 | No existing manual scenarios/tickets to sample (∅); confirmed Q2 Option A (framework default) |

## Locale

| Locale | Value | Status | Evidence/source |
|---|---|---|---|
| Framework candidate `en-GB` | `en-GB` | ★ 2026-10-17 | No project-specific locale found |

## Team options

| Option | Enabled? | Status | Evidence/source |
|---|---|---|---|
| Keep Confluence page empty until testing | No — not applicable, no Confluence configured | ∅ | Confirmed Q4 Option A (repo docs only) |
| Use `.sql` test data | No | ∅ | Test data is JSON only (test-data/*.json) |
| Branch description length 10–45 characters | No | ∅ | No such constraint found or requested |

Default fix loop is maximum 3 iterations, stopping early on repeat; fix test defects only and append attempts to `09_execution.md`.
