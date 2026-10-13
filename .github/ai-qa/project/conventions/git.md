# Git and PR conventions

Configure renders this source into `.github/ai-qa/project/conventions/git.md` after discovery and L5 approval. Statuses per `method/discovery.md`; defaults are not observed project facts.

## Remote host

| Value | Status | Evidence / source |
|---|---|---|
| `https://github.com/declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v`, 2026-10-13 |

## Base branch

| Value | Status | Evidence / source |
|---|---|---|
| `main` | ✓ | `git branch -a` (`remotes/origin/HEAD -> origin/main`), 2026-10-13 |

## Protected branches

| Value | Status | Evidence / source |
|---|---|---|
| Unknown | ? | No `gh` CLI or `repo.branch-protection` read tool available this session. Re-check with `@qa-configure refresh`. |

## Branch patterns

| Pattern / examples | Status | Evidence / source |
|---|---|---|
| `feature\|bugfix\|chore/<slug>` (no ticket segment — no ticket system in use) | ★ default established, adapted from the framework candidate `feature\|bugfix\|chore/<ticket>-<slug>` since the project has no ticket syntax; dated 2026-10-13. Observed examples: `feature/test-application-crud`, `feature/testing-ai-tool`, `feature/testing-ai-tool-existing-dev-work` (3/3 sampled, no ticket prefix in any) | `git branch -a`; user confirmation of "none/manual" ticket system, 2026-10-13 |

## Ticket syntax

| Pattern / confirmed project key | Status | Evidence / source |
|---|---|---|
| None — work items are manual/pasted (e.g. `jira.md`); no project key | ✓ user-confirmed | Interview Q1, 2026-10-13 |

## Commit style

| Value | Status | Evidence / source |
|---|---|---|
| Conventional Commits | ★ default established, 2026-10-13 (existing commits show no consistent style: "Adding skeleton to repo", "Changing skeleton repo to test against local test application", "Adding new jira and removing add user tests") | `git log --oneline` (3/3 commits sampled); user accepted framework defaults, 2026-10-13 |

## Commit types

| Types / scope rules | Status | Evidence / source |
|---|---|---|
| `feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`, `revert` | ★ default established, 2026-10-13 | Framework candidate (`defaults/git.md`); user accepted |

## PR title pattern

| Pattern | Status | Evidence / source |
|---|---|---|
| `<type>: <summary>` (ticket segment dropped — no ticket system) | ★ default established, adapted from framework candidate `<type>: <summary> (<ticket>)`; dated 2026-10-13 | No PR template or merged PR found to confirm an alternative; user accepted framework defaults |

## PR types

| Types | Status | Evidence / source |
|---|---|---|
| Same as commit types: `feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`, `revert` | ★ default established, 2026-10-13 | User accepted framework defaults |

## Prefix-to-type mapping

| Branch prefix | PR type | Status | Evidence / source |
|---|---|---|---|
| `feature/` | `feat` | ★ default established, 2026-10-13 | Framework candidate mapping, user accepted |
| `bugfix/` | `fix` | ★ default established, 2026-10-13 | Framework candidate mapping, user accepted |
| `chore/` | `chore` | ★ default established, 2026-10-13 | Framework candidate mapping, user accepted |

## PR templates

| Template path / platform | Status | Evidence / source |
|---|---|---|
| None found | ∅ | Bounded search of `.github/` for `PULL_REQUEST_TEMPLATE*` — none found, 2026-10-13 |

## Exemplar PR

| PR / why representative | Status | Evidence / source |
|---|---|---|
| None available | ∅ | `github-list_pull_requests` (state=all) → 0 results, 2026-10-13 |

## Draft and reviewer policy

| Policy | Status | Evidence / source |
|---|---|---|
| Open PRs as **draft**; no required reviewers | ✓ user-confirmed | Interview Q6, 2026-10-13 (no PRs merged yet, branch protection unverified) |

Push, PR creation and external writes remain separately gated by `method/safety.md`; a branch never implies a push and the agent never merges.
