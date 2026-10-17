# Project Discovery

This report was written to `.github/ai-qa/project/discovery.md` by `qa-configure`, after approval. Statuses per `method/discovery.md`: ✓ Observed · ◐ Inferred · ⚠ Conflict · ∅ Not found · ? Could not check · ✗ No consistent convention · ★ Default established (Configure only).

**Repository / scope:** `declankbarrett/playwright-typescript-skeleton` (GitHub, public)
**Branch / revision:** `feature/configure-ai-tool` @ `2af3ecb`
**Observed at:** 2026-10-17
**Sampling approach:** Small repository — read all tracked source/test files (5 specs, 3 page objects, 1 fixture file, 1 config loader), all package manifests, all CI workflow files, and all git branches/commits (full history is 1 commit; 5 branches).

<!-- ai-qa:managed:repo-shape -->
## Repo shape

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Single-module repository, no workspaces. Root dirs: `config/`, `fixtures/`, `pages/`, `tests/`, `test-data/`, `utils/`. | `ls` root; README.md "Framework Structure" | — |
<!-- /ai-qa:managed:repo-shape -->

<!-- ai-qa:managed:languages-and-build -->
## Languages and build

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | TypeScript `^5.5.0`, Node `>=18`, npm scripts as build/test entry points, no bundler/lockfile beyond `package-lock.json`. | package.json:1-20; tsconfig.json:1-20 | — |
<!-- /ai-qa:managed:languages-and-build -->

<!-- ai-qa:managed:app-frameworks-and-data -->
## App frameworks and data

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | No application framework or database in this repo; it only tests an external public demo app. | config/env.ts:21; no DB/compose/IaC files found | Not applicable — confirmed by bounded search |
<!-- /ai-qa:managed:app-frameworks-and-data -->

<!-- ai-qa:managed:test-stack-and-pack-match -->
## Test stack and pack match

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `@playwright/test` + `playwright.config.ts` + TypeScript specs → matched pack `playwright-ts`. No other test runner/framework present. | package.json:17; playwright.config.ts:1; tests/**/*.spec.ts (TypeScript imports) | 5/5 spec files read |
<!-- /ai-qa:managed:test-stack-and-pack-match -->

<!-- ai-qa:managed:test-structure-and-conventions -->
## Test structure and conventions

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Specs under `tests/smoke/` and `tests/functional/`, named `<feature>.spec.ts`; import `test`/`expect` from `fixtures/testFixtures.ts`; use `test.describe`, web-first `expect(...)` assertions; no tags; POM via `pages/BasePage.ts` subclasses. | tests/smoke/login.spec.ts:1-20; tests/smoke/logout.spec.ts; tests/functional/*.spec.ts; fixtures/testFixtures.ts | Sample: 5/5 existing specs read |
<!-- /ai-qa:managed:test-structure-and-conventions -->

<!-- ai-qa:managed:execution -->
## Execution

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Documented/configured commands: `npm test`, `npm run test:local/int/qa/smoke/functional/headed`, `npm run report`, `npm run typecheck`. CI runs `npm run test:int`. Suite was not executed during discovery. | package.json:6-15; .github/workflows/playwright.yml:26 | Documented commands only; none run |
<!-- /ai-qa:managed:execution -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | One workflow, `playwright.yml`: triggers push/PR to `main` + manual dispatch; installs deps/browsers, runs `int` suite, uploads HTML report + test-results artefacts always. | .github/workflows/playwright.yml:1-41 | — |
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:managed:git -->
## Git

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | 1 commit total ("Adding skeleton to repo"), no conventional-commit prefix. 5 branches, 4 non-default all named `feature/<slug>` with no ticket ID. | `git log --oneline` (1 result); `git branch -a` (5 results) | Sample 1/1 commit, 4/4 non-default branches; thin evidence flagged |
<!-- /ai-qa:managed:git -->

<!-- ai-qa:managed:prs -->
## PRs

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No pull requests exist (open or closed); no PR template file found. | GitHub `list_pull_requests` (state=all) → 0 results, 2026-10-17; bounded search for `.github/PULL_REQUEST_TEMPLATE.md` → none | Transport: GitHub MCP, read-only, succeeded |
<!-- /ai-qa:managed:prs -->

<!-- ai-qa:managed:branch-protection -->
## Branch protection

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ? | Could not check branch protection/rulesets on `main`. | No branch-protection read tool (`gh api`, `az repos policy` equivalent) was available in this session | Revisit once `gh` CLI or an equivalent read is available |
<!-- /ai-qa:managed:branch-protection -->

<!-- ai-qa:managed:codeowners -->
## CODEOWNERS

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No `CODEOWNERS` file found. | Bounded search: `find . -iname CODEOWNERS` (excluding node_modules) → no results | — |
<!-- /ai-qa:managed:codeowners -->

<!-- ai-qa:managed:definition-of-done-and-qa-evidence -->
## Definition of done and QA evidence

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No CONTRIBUTING.md, DoD doc or QA sign-off template found; only the CI pass/fail + uploaded HTML report serve as evidence today. | Bounded search for CONTRIBUTING/DoD docs → none; .github/workflows/playwright.yml:28-41 (artefact upload) | Framework DoD candidate applied as default |
<!-- /ai-qa:managed:definition-of-done-and-qa-evidence -->

<!-- ai-qa:managed:documentation -->
## Documentation

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Only `README.md` exists as documentation; no Confluence/Azure Wiki configuration found. User confirmed repo-docs-only. | README.md; bounded search for wiki/docs config → none | Remote docs pass not applicable |
<!-- /ai-qa:managed:documentation -->

<!-- ai-qa:managed:integrations -->
## Integrations

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Remote host: GitHub, `declankbarrett/playwright-typescript-skeleton`. No Jira/Azure DevOps/Confluence/Azure Wiki references found anywhere in the repo. GitHub reachable via ambient MCP tool this session (file listing, 0 issues, 0 PRs all returned successfully); no project `.vscode/mcp.json` exists. No `gh`/`az` CLI installed locally. | `git remote -v`; GitHub `get_file_contents`/`list_issues`/`list_pull_requests` calls, 2026-10-17; `command -v gh` → not found | Env var names: none found/needed (no credentials used) |
<!-- /ai-qa:managed:integrations -->

<!-- ai-qa:managed:project-context -->
## Project context

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | See `.github/ai-qa/project/project.md` for the full write-up: purpose, components, stack, environments, dependencies, CI, tests, constraints, docs, unknowns, provenance. | project.md (this configure run) | Confidence High except flagged thin-evidence items |
<!-- /ai-qa:managed:project-context -->

## Needs your input

| Question | Evidence / conflict sides | Option A (recommended) | Alternative | Decision unlocked |
|---|---|---|---|---|
| None remaining — all behaviour-relevant items were resolved in the configuration interview on 2026-10-17 (git/PR conventions, scenario format, work-item system, documentation system, project constraints, GitHub transport). | Branch protection remains `?` (no tool available) but is not currently behaviour-relevant since no PR/merge workflow is gated on it yet. | Re-run `@qa-configure refresh` once `gh` CLI or an admin-scoped GitHub read becomes available, to resolve branch protection. | Leave as `?` until it matters for a specific workflow. | Confirms `repo.branch-protection` for `qa-create-pr`/`qa-create-branch`. |
