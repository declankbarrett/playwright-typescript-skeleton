# Reporting conventions

Configure renders this source into `.github/ai-qa/project/conventions/reporting.md` after discovery and L5 approval. Preserve evidence, intended audience and source freshness; never include secrets.

## Audiences

| Audience | Needs / terminology | Status | Evidence/source |
|---|---|---|---|
| None identified | No audience-specific reporting conventions found; identify intended readers per-request | ∅ | Bounded search of README/docs — no audience guidance found |

## Formats

| Report / channel | Format | Status | Evidence/source |
|---|---|---|---|
| Working format (QA artefacts, tech reports) | Markdown | ★ framework default, 2026-10-13 | No project-specific format found; converted to provider format only when publishing (none configured here) |
| Test execution report | HTML (built-in Playwright reporter) | ✓ | `playwright.config.ts:17-20` |

## Channel templates

| Channel/provider | Template path / format | Status | Evidence/source |
|---|---|---|---|
| None | No channel-specific template found (no Jira/Confluence/ADO configured) | ∅ | User confirmation: no remote providers in use |

## Tech-report defaults

| Mode / audience / inclusion rules | Value | Status | Evidence/source |
|---|---|---|---|
| Mode | No project-specific default; use the requested mode (concise/standard/detailed/business/weekly) per `qa-tech-report` | ∅ | No project preference found |

## File naming

| Artefact | Name / destination | Status | Evidence/source |
|---|---|---|---|
| QA artefacts (plans, scenarios, reports) | `qa-work/<work-id>/outputs/` | ★ framework default, 2026-10-13 | `.gitignore` already carries the `ai-qa:start`/`ai-qa:end` managed block for `qa-work/**` |

## Documentation

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Docs root | `README.md` (repository root) | ✓ | README.md present; no `docs/` directory found |
| Index page | n/a — single README | ∅ | Bounded search — no index/home page structure found |
| Home page | n/a | ∅ | — |
| Glossary | None found | ∅ | — |

Default working locale is `en-GB` (recorded in `conventions/qa-process.md` as `★`, 2026-10-13). Publish only on request and after exact-content/destination L4 approval; no publishing providers are configured for this project.
