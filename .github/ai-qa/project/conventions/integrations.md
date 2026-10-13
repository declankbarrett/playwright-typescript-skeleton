# Integrations conventions

Configure renders this source into `.github/ai-qa/project/conventions/integrations.md` after discovery and L5 approval. Skills request provider operations and remain deployment-neutral. Record environment-variable names only; never secret values.

## Work items

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None — manual/pasted work items (e.g. `jira.md`) | ∅ not configured | User confirmation (Interview Q1), 2026-10-13; no `.atlassian.net`/ADO/GitHub-Issues evidence found |
| Deployment | n/a | ∅ | — |
| Base URL | n/a | ∅ | — |
| Identifiers | n/a — no project key | ∅ | — |
| Transports (preferred → fallback) | Manual only — user pastes title/description/acceptance criteria when needed | ∅ not configured | User confirmation, 2026-10-13 |
| Authentication method | n/a | ∅ | — |
| Environment variable names | n/a | ∅ | — |
| Verified | n/a | ∅ not configured | — |

**Degraded behaviour:** `qa-analyse-requirement` asks for pasted work-item title, description and acceptance criteria; `qa-publish` writes paste-ready output under `qa-work/<work-id>/outputs/` without any external write.

## Docs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None — repo docs only (`README.md`) | ∅ not configured | User confirmation (Interview Q2), 2026-10-13 |
| Deployment | n/a | ∅ | — |
| Base URL | n/a | ∅ | — |
| Identifiers | n/a | ∅ | — |
| Transports (preferred → fallback) | Manual — read `README.md` directly | ∅ not configured | User confirmation, 2026-10-13 |
| Authentication method | n/a | ∅ | — |
| Environment variable names | n/a | ∅ | — |
| Verified | n/a | ∅ not configured | — |

## Repository and PRs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub (github.com) | ✓ | `git remote -v` |
| Deployment | `github.com` (public SaaS) | ✓ | Remote URL `github.com/declankbarrett/playwright-typescript-skeleton` |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v` |
| Identifiers | `declankbarrett/playwright-typescript-skeleton` | ✓ | — |
| Transports (preferred → fallback) | MCP (host-provided GitHub tool) → Manual. No local `gh` CLI found (`command -v gh` → not found) | ✓ verified this session — `list_commits`, `list_pull_requests` and `list_issues` read calls succeeded | This configuration session, 2026-10-13 |
| Authentication method | Host-managed GitHub MCP tool credentials (not project-configured; no `.vscode/mcp.json` needed) | ✓ | — |
| Environment variable names | None required — transport is the host's built-in GitHub tool, not a project-local server | ✓ | — |
| Verified | Yes | ✓ | Read-only probes succeeded, 2026-10-13 |

## CI

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub Actions | ✓ | `.github/workflows/playwright.yml` |
| Deployment | github.com-hosted (`ubuntu-latest` runner) | ✓ | `.github/workflows/playwright.yml:9-10` |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton/actions` | ✓ | Derived from repository URL |
| Identifiers | Workflow: `Playwright Tests` (`.github/workflows/playwright.yml`) | ✓ | `.github/workflows/playwright.yml:1` |
| Transports (preferred → fallback) | MCP (host-provided GitHub tool, read-only `ci.runs`/`ci.run.get`) → Manual | ◐ inferred available (same GitHub tool verified above); not separately probed for CI-run operations this session | This configuration session |
| Authentication method | Host-managed GitHub MCP tool credentials | ✓ | — |
| Environment variable names | None required | ✓ | — |
| Verified | Unverified for CI-specific operations (`ci.runs`); general GitHub read access verified | ◐ | — |

If a preferred transport fails, disclose the failure and fall back. No `.vscode/mcp.json` was written — repository/PR/CI access uses the host's built-in GitHub tool, not a project-local MCP server, and no Jira/Confluence transport was configured (both declined/not in use). Every external write remains L4; `.vscode/mcp.json` would be L5 if introduced later.
