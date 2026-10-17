# Integrations conventions

Rendered by `qa-configure` after discovery and L5 approval, 2026-10-17. Environment-variable names only; never secret values.

## Work items

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None | ★ 2026-10-17 | Confirmed Q3 Option A — no Jira/ADO/GitHub Issues work-item tracking in use |
| Deployment | n/a | ∅ | — |
| Base URL | n/a | ∅ | — |
| Identifiers | n/a | ∅ | — |
| Transports (preferred → fallback) | Manual only — `qa-analyse-requirement` works from pasted title/description/ACs | ★ 2026-10-17 | Confirmed Q3 Option A |
| Authentication method | n/a | ∅ | — |
| Environment variable names | None | ∅ | — |
| Verified | n/a (not configured) | ∅ | — |

## Docs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | None — repo docs only | ★ 2026-10-17 | Confirmed Q4 Option A; only README.md exists |
| Deployment | n/a | ∅ | — |
| Base URL | n/a | ∅ | — |
| Identifiers | README.md | ✓ | README.md present at repo root |
| Transports (preferred → fallback) | Manual (read README.md directly) | ★ 2026-10-17 | Confirmed Q4 Option A |
| Authentication method | n/a | ∅ | — |
| Environment variable names | None | ∅ | — |
| Verified | n/a (not configured) | ∅ | — |

## Repository and PRs

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub | ✓ | `git remote -v` → `github.com` |
| Deployment | github.com (cloud) | ✓ | Remote URL host |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton` | ✓ | `git remote -v` |
| Identifiers | `declankbarrett/playwright-typescript-skeleton` | ✓ | Same | 
| Transports (preferred → fallback) | `mcp (ambient, this session)` → Manual | ★ 2026-10-17 | GitHub MCP tool succeeded for file listing, issue listing and PR listing, 2026-10-17; not persisted to `.vscode/mcp.json` (confirmed Q6 Option A) |
| Authentication method | Ambient session credential — not project-configured; no local `gh`/`az` CLI installed | ✓ | `command -v gh` → not found, 2026-10-17 |
| Environment variable names | None recorded | ∅ | No project-level credential configuration exists |
| Verified | Yes, this session only (2026-10-17) — a new session/user must establish their own GitHub access; not guaranteed reproducible | ★ 2026-10-17 | Read-only `get_file_contents`/`list_issues`/`list_pull_requests` all returned successfully |

## CI

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Provider | GitHub Actions | ✓ | .github/workflows/playwright.yml |
| Deployment | github.com (cloud) | ✓ | Same |
| Base URL | `https://github.com/declankbarrett/playwright-typescript-skeleton/actions` | ◐ | Inferred from repository URL + standard GitHub Actions path |
| Identifiers | Workflow `playwright.yml` | ✓ | .github/workflows/playwright.yml:1 |
| Transports (preferred → fallback) | Manual (inspect workflow file as text) | ★ 2026-10-17 | No `gh`/CI-read MCP tool verified available this session for `ci.runs`/`ci.run.get` |
| Authentication method | n/a | ∅ | — |
| Environment variable names | None | ∅ | — |
| Verified | No | ∅ | No CI-read operation attempted/available this session |

If a preferred transport fails, disclose the failure and fall back. Every external write is L4; `.vscode/mcp.json` is L5.
