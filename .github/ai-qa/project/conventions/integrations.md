# Integrations conventions

## Work items

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None configured | ✓ | User confirmed 2026-10-08 — `jira.md` is a one-off sample ticket, not a live integration |
| Deployment | n/a | ✓ | — |
| Base URL | n/a | ✓ | — |
| Identifiers | n/a | ✓ | — |
| Transports (preferred → fallback) | Manual (paste ticket title/description/ACs when needed) | ✓ | No provider configured |
| Authentication method | n/a | ✓ | — |
| Environment variable names | n/a | ✓ | — |
| Verified | n/a (no provider) | ✓ | — |

## Docs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None found | ∅ | No Confluence/Azure Wiki config, space, or root page named |
| Deployment | n/a | ∅ | — |
| Base URL | n/a | ∅ | — |
| Identifiers | n/a | ∅ | — |
| Transports (preferred → fallback) | Manual | ∅ | No provider configured |
| Authentication method | n/a | ∅ | — |
| Environment variable names | n/a | ∅ | — |
| Verified | n/a | ∅ | — |

## Repository and PRs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub | ✓ | `git remote -v` |
| Deployment | `github.com` (cloud) | ✓ | Public remote URL |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v` |
| Identifiers | `declankbarrett/playwright-typescript-skeleton` | ✓ | — |
| Transports (preferred → fallback) | MCP → Manual | ✓ | GitHub MCP tools verified this session (read-only `list_commits`, `list_pull_requests` succeeded 2026-10-08); `gh` CLI not installed (`command not found`), so CLI is unavailable as a fallback |
| Authentication method | GitHub MCP server session auth (method only) | ✓ | No token values observed or requested |
| Environment variable names | None required (MCP-managed) | ✓ | — |
| Verified | Yes — read-only probe 2026-10-08 | ✓ | `list_commits`/`list_pull_requests` returned real data |

## CI

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub Actions | ✓ | `.github/workflows/playwright.yml` |
| Deployment | `github.com` (cloud) | ✓ | Same repository |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton/actions` | ◐ | Inferred from repo URL; not independently probed |
| Identifiers | Workflow `Playwright Tests` (`playwright.yml`) | ✓ | .github/workflows/playwright.yml L1 |
| Transports (preferred → fallback) | Not probed this session | ? | No `ci.runs`/`ci.run.get` read-only probe performed |
| Authentication method | n/a | ? | Not probed |
| Environment variable names | None observed | ✓ | No CI-specific secrets referenced beyond standard `GITHUB_TOKEN` (implicit, not configured by this repo) |
| Verified | Unverified | ? | No probe performed this session |

If a preferred transport fails, disclose the failure and fall back. Manual operations must work: the user supplies input and generated output is written under `qa-work/<work-id>/outputs/`. Every external write is L4; `.vscode/mcp.json` is L5.
