# QA process conventions

## Readiness

| Threshold / decision owner | Value | Status | Evidence/source |
|---|---|---|---|
| Six scores, RAG, ownership and recommendation | Framework rubric (`method/readiness.md`) applies — no project extension found | ★ Default established (2026-10-08) | User-approved; no project override |

## Definition of done and QA evidence

| Evidence / approval requirement | Value | Status | Evidence/source |
|---|---|---|---|
| Required FR/NFR, test, run, review and release evidence | Framework candidate applies — no project DoD document found | ★ Default established (2026-10-08) | User-approved; no project override |

## Test plan destination and timing

| Destination / when plan is published | Value | Status | Evidence/source |
|---|---|---|---|
| Local destination | `qa-work/<work-id>/outputs/test-plan.md`; publish only on request after exact destination/content approval | ★ Default established (2026-10-08) | User-approved framework candidate |

## Comment templates

| Provider / template path | Value | Status | Evidence/source |
|---|---|---|---|
| None | No project comment template found; no provider configured | ∅ | No work-item provider configured (2026-10-08) |

## Extra regression areas

| Area | Why included | Status | Evidence/source |
|---|---|---|---|
| None | No project-specific areas beyond the framework's mandatory 13 (`method/regression-areas.md`) | ∅ | No evidence of additional areas |

## Fix loop

| Max iterations / scope / owner | Value | Status | Evidence/source |
|---|---|---|---|
| Max 3 iterations, test-defects only, stop early on repeat | ★ Default established (2026-10-08) | User-approved framework candidate |

## Commands safe to run (L3 exemptions)

| Command and selector | Environment / duration / data effects / cleanup | Status | Evidence/source |
|---|---|---|---|
| None | No command confirmed safe for unattended/full runs | ∅ | Not discussed/confirmed this session — L3 gate applies to all full/environment-dependent runs |

## Work-id rule

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Explicit argument → ticket from branch (no ticket syntax configured) → `adhoc-<yyyymmdd>-<slug>` | ★ Default established (2026-10-08) | Since no ticket syntax exists (confirmed), the adhoc fallback applies unless an explicit work-id is given |

## qa-work policy

| Commit / ignore / retention policy | Value | Status | Evidence/source |
|---|---|---|---|
| Commit `index.md` and `outputs/`; ignore everything else | ★ Default established (2026-10-08) | User-approved framework default; matches existing `.gitignore` `qa-work/**` block |

## Scenario format

| Format | Value | Status | Evidence/source |
|---|---|---|---|
| `bdd` (Given / When / Then) | ✓ Confirmed (2026-10-08) | Evidence: `jira.md` acceptance criteria are written as embedded Given/When/Then prose (e.g. AC1). **User constraint:** generated/automated test *code* must still follow this repo's existing Playwright conventions (POM + fixtures + `*.spec.ts`) — `bdd` governs manual scenario wording only, not generated test code style. |

## Locale

| Locale | Value | Status | Evidence/source |
|---|---|---|---|
| `en-GB` | ★ Default established (2026-10-08) | User-approved framework candidate |

## Team options

| Option | Enabled? | Status | Evidence/source |
|---|---|---|---|
| Keep Confluence page empty until testing | No (n/a — no Confluence configured) | ∅ | No docs provider configured |
| Use `.sql` test data | No | ✓ | Project uses JSON test data (`test-data/*.json`) |
| Branch description length 10–45 characters | No | ∅ | Not confirmed by project evidence or user |

Default fix loop is maximum 3 iterations, stopping early on repeat; fix test defects only and append attempts to `execution.md`.
