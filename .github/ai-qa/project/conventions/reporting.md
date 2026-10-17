# Reporting conventions

Rendered by `qa-configure` after discovery and L5 approval, 2026-10-17.

## Audiences

| Audience | Needs / terminology | Status | Evidence/source |
|---|---|---|---|
| Requesting user (default) | Plain technical summary; no distinct stakeholder audiences identified | ∅ | No audience list discovered or requested |

## Formats

| Report / channel | Format | Status | Evidence/source |
|---|---|---|---|
| All QA artefacts (test plans, bug reports, scenarios) | Markdown (working format) | ★ 2026-10-17 | Framework default; no project-specific format found |

## Channel templates

| Channel/provider | Template path / format | Status | Evidence/source |
|---|---|---|---|
| None found | — | ∅ | No PR/issue/report templates exist in the repo |

## Tech-report defaults

| Mode / audience / inclusion rules | Value | Status | Evidence/source |
|---|---|---|---|
| Use the requested report mode (concise/standard/detailed/business/weekly); `git log` mandatory for commit-based reports | Framework default applies unmodified | ★ 2026-10-17 | Repository has only 1 commit; reports must note this |

## File naming

| Artefact | Name / destination | Status | Evidence/source |
|---|---|---|---|
| All generated QA artefacts | `qa-work/<work-id>/outputs/` (framework default) | ★ 2026-10-17 | .gitignore:14-19 managed block matches this policy exactly |

## Documentation

| Field | Value | Status | Evidence/source |
|---|---|---|---|
| Docs root | Repository root | ✓ | Only README.md exists |
| Index page | `README.md` | ✓ | README.md |
| Home page | `README.md` | ✓ | README.md |
| Glossary | None found | ∅ | Bounded search found no glossary file |

Default working locale candidate is `en-GB` (recorded in `conventions/qa-process.md`). Publish only on request and after exact-content/destination L4 approval.
