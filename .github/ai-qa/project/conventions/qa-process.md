# QA process conventions

Configure renders this source into `.github/ai-qa/project/conventions/qa-process.md` after discovery and L5 approval. These conventions cannot weaken `method/safety.md`.

## Readiness

| Threshold / decision owner | Value | Status | Evidence/source |
|---|---|---|---|
| Six scores, RAG, ownership and recommendation | No project-specific extension; framework rubric in `method/readiness.md` applies as-is | ∅ (no project extension found) | Bounded search — no project readiness rubric found |

## Definition of done and QA evidence

| Evidence / approval requirement | Value | Status | Evidence/source |
|---|---|---|---|
| Required FR/NFR, test, run, review and release evidence | No project DoD document; framework default applies (stable FR/NFR IDs, evidence-linked coverage, scenario decisions, 13-area regression assessment, automation rationale, actual run evidence, accurate QA summary) | ∅ (no project DoD found) | Bounded search for CONTRIBUTING/DoD — none found; framework default (`defaults/qa-process.md`) applies unmodified |

## Test plan destination and timing

| Destination / when plan is published | Value | Status | Evidence/source |
|---|---|---|---|
| Local: `qa-work/<work-id>/outputs/08_test_plan.md`; publish only on explicit request after exact destination/content approval | ★ framework default, 2026-10-13 | No project-specific destination found; project has no remote docs system (user-confirmed) |

## Comment templates

| Provider / template path | Value | Status | Evidence/source |
|---|---|---|---|
| None — no work-item/comment system configured | ∅ not configured | User-confirmed: no work-item system in use (manual/paste) |

## Extra regression areas

| Area | Why included | Status | Evidence/source |
|---|---|---|---|
| None beyond the framework's mandatory 13 areas | No project-specific regression areas discovered | ∅ | Bounded search — none found |

## Fix loop

| Max iterations / scope / owner | Value | Status | Evidence/source |
|---|---|---|---|
| Maximum 3 iterations; stop early on repeat failure; fix test defects only (never product code); append attempts to `09_execution.md` | ★ framework default (unmodified) | No project override found |

## Commands safe to run (L3 exemptions)

| Command and selector | Environment / duration / data effects / cleanup | Status | Evidence/source |
|---|---|---|---|
| None | No command has been explicitly confirmed safe for unattended/full/shared-environment runs | ∅ not configured | No project evidence or confirmation defining scope/duration/data effects/cleanup; L3 gate applies to all full/env-dependent/long runs |

## Work-id rule

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Explicit argument → ticket from current branch matching `Ticket syntax`/`Branch patterns` → `adhoc-<yyyymmdd>-<slug>` fallback | No ticket syntax exists (manual/pasted work items), so branch-match will not apply in practice — work IDs always resolve to the explicit argument or the `adhoc-<yyyymmdd>-<slug>` fallback | ✓ derived from `conventions/git.md` Ticket syntax (none) | `conventions/git.md` Ticket syntax section; `method/work-id-and-git.md` |

## qa-work policy

| Commit / ignore / retention policy | Value | Status | Evidence/source |
|---|---|---|---|
| Default: commit `index.md` and `outputs/`; ignore everything else | No project override | ★ framework default (unmodified) | `.gitignore:12-17` (`ai-qa:start`/`ai-qa:end` managed block already matches this default) |

## Scenario format

| Format | Value | Status | Evidence/source |
|---|---|---|---|
| `bdd` (Given / When / Then) | `bdd` | ★ default established, 2026-10-13 (matches the 1/1 ticket sample found — `jira.md` writes all 5 ACs as Given/When/Then) | `jira.md` AC1–AC5; user confirmation (Interview Q3), 2026-10-13 |

## Locale

| Locale | Value | Status | Evidence/source |
|---|---|---|---|
| `en-GB` | `en-GB` | ★ default established (no project evidence either way), 2026-10-13 | Framework candidate (`defaults/qa-process.md`); no conflicting evidence found |

## Team options

| Option | Enabled? | Status | Evidence/source |
|---|---|---|---|
| Keep the Confluence page empty until testing | No (not applicable — no Confluence configured) | ∅ not configured | User-confirmed: repo docs only |
| Use `.sql` test data | No | ∅ not configured | Project uses JSON test data (`test-data/*.json`); no `.sql` fixtures found |
| Branch description length 10–45 characters | No | ∅ not configured | No evidence or confirmation of this constraint |

Options are not defaults; enabled only with project evidence or user confirmation. Default fix loop is maximum 3 iterations, stopping early on repeat; fix test defects only and append attempts to `09_execution.md`.
