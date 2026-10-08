# Git and PR conventions

## Remote host

| Value | Status | Evidence / source |
|---|---|---|
| `github.com/declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v`, 2026-10-08 |

## Base branch

| Value | Status | Evidence / source |
|---|---|---|
| `main` | ✓ | `remotes/origin/HEAD -> origin/main` |

## Protected branches

| Value | Status | Evidence / source |
|---|---|---|
| None found | ∅ | Bounded search — no branch-protection documentation in repo |

## Branch patterns

| Pattern / examples | Status | Evidence / source |
|---|---|---|
| `feature\|bugfix\|chore/<slug>` (no ticket prefix — none configured) | ◐ evidence + ★ default (2026-10-08) | Observed: `feature/test-application-crud`, `feature/testing-ai-tool` (2/2 branches); structure extended to `bugfix`/`chore` by user-approved default |

## Ticket syntax

| Pattern / confirmed project key | Status | Evidence / source |
|---|---|---|
| None configured | ✓ | User confirmed 2026-10-08 — no Jira/ADO integration; `jira.md` is a sample artifact only |

## Commit style

| Value | Status | Evidence / source |
|---|---|---|
| Conventional Commits | ★ Default established (2026-10-08) | No prior convention to observe — single commit "Adding skeleton to repo" predates this default and does not follow it |

## Commit types

| Types / scope rules | Status | Evidence / source |
|---|---|---|
| `feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`, `revert` | ★ Default established (2026-10-08) | Framework candidate, user-approved |

## PR title pattern

| Pattern | Status | Evidence / source |
|---|---|---|
| `<type>: <summary>` (no ticket — none configured) | ★ Default established (2026-10-08) | Framework candidate, user-approved |

## PR types

| Types | Status | Evidence / source |
|---|---|---|
| Same as commit types | ★ Default established (2026-10-08) | User-approved |

## Prefix-to-type mapping

| Branch prefix | PR type | Status | Evidence / source |
|---|---|---|---|
| `feature/` | `feat` | ★ Default established (2026-10-08) | User-approved |
| `bugfix/` | `fix` | ★ Default established (2026-10-08) | User-approved |
| `chore/` | `chore` | ★ Default established (2026-10-08) | User-approved |

## PR templates

| Template path / platform | Status | Evidence / source |
|---|---|---|
| None found | ∅ | Bounded search for `PULL_REQUEST_TEMPLATE*` — no match |

## Exemplar PR

| PR / why representative | Status | Evidence / source |
|---|---|---|
| None available | ∅ | GitHub `list_pull_requests` returned `[]` on 2026-10-08 |

## Draft and reviewer policy

| Policy | Status | Evidence / source |
|---|---|---|
| No reviewer/draft default | ∅ | No PRs exist yet to observe a policy; PR creation remains L4-gated regardless |

Push, PR creation and external writes remain separately gated by `method/safety.md`; a branch never implies a push and the agent never merges.
