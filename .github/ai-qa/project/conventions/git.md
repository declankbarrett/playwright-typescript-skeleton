# Git and PR conventions

Rendered by `qa-configure` after discovery and L5 approval, 2026-10-17. Status per `method/discovery.md`.

## Remote host

| Value | Status | Evidence / source |
|---|---|---|
| GitHub — `declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v` |

## Base branch

| Value | Status | Evidence / source |
|---|---|---|
| `main` | ✓ | `origin/HEAD -> origin/main`; CI triggers on `main` (.github/workflows/playwright.yml:4-6) |

## Protected branches

| Value | Status | Evidence / source |
|---|---|---|
| Unknown | ? | No branch-protection read tool available this session; see `discovery.md` "Needs your input" |

## Branch patterns

| Pattern / examples | Status | Evidence / source |
|---|---|---|
| `feature\|bugfix\|chore/<slug>` (no ticket). Observed: `feature/configure-ai-tool`, `feature/test-application-crud`, `feature/testing-ai-tool`, `feature/testing-ai-tool-existing-dev-work` | ★ 2026-10-17 | `git branch -a` (4/4 non-default branches sampled); confirmed Q1 Option A (match observed practice over framework ticket-based default) |

## Ticket syntax

| Pattern / confirmed project key | Status | Evidence / source |
|---|---|---|
| None — no ticket/work-item system in use | ★ 2026-10-17 | Confirmed Q3 Option A |

## Commit style

| Value | Status | Evidence / source |
|---|---|---|
| Free-form (not Conventional Commits) | ★ 2026-10-17 | `git log --oneline` → 1 commit "Adding skeleton to repo" (no type prefix); confirmed Q1 Option A |

## Commit types

| Types / scope rules | Status | Evidence / source |
|---|---|---|
| None established | ✗ | Sample size 1 commit — insufficient to define types |

## PR title pattern

| Pattern | Status | Evidence / source |
|---|---|---|
| `<summary>` (plain, no type/ticket prefix) | ★ 2026-10-17 | No PRs exist to sample (0/0); confirmed Q1 Option A |

## PR types

| Types | Status | Evidence / source |
|---|---|---|
| None | ∅ | 0 PRs exist |

## Prefix-to-type mapping

| Branch prefix | PR type | Status | Evidence / source |
|---|---|---|---|
| n/a | n/a | ∅ | No PRs/mapping exists |

## PR templates

| Template path / platform | Status | Evidence / source |
|---|---|---|
| None found | ∅ | Bounded search: `.github/PULL_REQUEST_TEMPLATE.md` and variants → not found |

## Exemplar PR

| PR / why representative | Status | Evidence / source |
|---|---|---|
| None available | ∅ | GitHub `list_pull_requests` (state=all) → 0 results, 2026-10-17 |

## Draft and reviewer policy

| Policy | Status | Evidence / source |
|---|---|---|
| No reviewer or draft policy defined | ∅ | No CONTRIBUTING/PR template found |

Push, PR creation and external writes remain separately gated by `method/safety.md`; a branch never implies a push and the agent never merges.
