# Project Discovery

This report is written to `.github/ai-qa/project/discovery.md` by `qa-configure` only, after approval. Statuses per `method/discovery.md`: ✓ Observed · ◐ Inferred · ⚠ Conflict · ∅ Not found · ? Could not check · ✗ No consistent convention · ★ Default established (Configure only).

**Repository / scope:** `declankbarrett/playwright-typescript-skeleton`, full repository
**Branch / revision:** `feature/testing-ai-tool-existing-dev-work` @ `df9a439aa0cd25ed58318e0f5db23acb7dc7265b`
**Observed at:** 2026-10-13
**Sampling approach:** Small repository — read all source/config/test files. 4/4 spec files sampled for test conventions; all 3 commits on the current branch sampled for Git conventions; all 8 page objects listed for Component evidence.

<!-- ai-qa:managed:repo-shape -->
## Repo shape

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Single-module Node/TypeScript repo, no monorepo/workspaces | `package.json:1-25`, `tsconfig.json:1-21`, root directory listing | No `.sln`, no workspace manifests |
<!-- /ai-qa:managed:repo-shape -->

<!-- ai-qa:managed:languages-and-build -->
## Languages and build

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | TypeScript 5.5, Node ≥18, npm; strict `tsconfig.json` with path aliases | `package.json:21`, `tsconfig.json:1-21`, README Prerequisites | — |
<!-- /ai-qa:managed:languages-and-build -->

<!-- ai-qa:managed:app-frameworks-and-data -->
## App frameworks and data

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No application code, DB, compose or IaC in this repo; SUT is external, reached via `BASE_URL` | Bounded search of repo root/subdirectories — no manifests/compose/IaC found | Repo is test automation only |
<!-- /ai-qa:managed:app-frameworks-and-data -->

<!-- ai-qa:managed:test-stack-and-pack-match -->
## Test stack and pack match

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `@playwright/test` ^1.48.0 + `playwright.config.ts`; matches `playwright-ts` framework pack | `package.json:18`, `playwright.config.ts:1-41` | Pack selected: `playwright-ts` |
<!-- /ai-qa:managed:test-stack-and-pack-match -->

<!-- ai-qa:managed:test-structure-and-conventions -->
## Test structure and conventions

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Two scopes: `tests/smoke/*.spec.ts`, `tests/functional/*.spec.ts`. POM in `pages/` (`BasePage` + 7 page classes). Shared setup via `fixtures/testFixtures.ts` (`test.extend`). JSON data in `test-data/*.json` via `utils/testDataLoader.ts`. Naming: `test.describe('Smoke: ...')` / `test.describe('Functional: ...')` | `tests/smoke/app-loads.spec.ts`, `tests/smoke/users-list.spec.ts`, `tests/functional/add-project.spec.ts`, `tests/functional/navigation.spec.ts`, `fixtures/testFixtures.ts:1-98`, `pages/` listing | Sample: 4/4 spec files, 100% consistent |
<!-- /ai-qa:managed:test-structure-and-conventions -->

<!-- ai-qa:managed:execution -->
## Execution

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Configured scripts: `test`, `test:local`, `test:int`, `test:qa`, `test:smoke`, `test:functional`, `test:headed`, `report`, `typecheck` | `package.json:6-15` | Documented/configured, not executed during discovery |
<!-- /ai-qa:managed:execution -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | GitHub Actions workflow on push/PR to `main` + manual dispatch; installs deps/browsers, runs `test:int`, uploads HTML report + test-results artifacts (14-day retention) | `.github/workflows/playwright.yml:1-36` | No deployment stage |
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:managed:git -->
## Git

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Remote `https://github.com/declankbarrett/playwright-typescript-skeleton.git`; default branch `main` (`origin/HEAD -> main`) | `git remote -v`, `git branch -a` | — |
| ✗ | No consistent commit-message convention; 3 freeform messages on current branch, none follow Conventional Commits | `git log --oneline`: "Adding skeleton to repo", "Changing skeleton repo to test against local test application", "Adding new jira and removing add user tests" | Sample: 3/3 commits (all available) |
| ✗ | Branches are plain `feature/<slug>`, no ticket prefix (no ticket system in use) | `git branch -a`: `feature/test-application-crud`, `feature/testing-ai-tool`, `feature/testing-ai-tool-existing-dev-work` | Sample: 3/3 branches |
<!-- /ai-qa:managed:git -->

<!-- ai-qa:managed:prs -->
## PRs

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No pull requests opened or merged yet; no PR template found | `github-list_pull_requests` (state=all) → empty; bounded search of `.github/` for `PULL_REQUEST_TEMPLATE*` — none found | — |
<!-- /ai-qa:managed:prs -->

<!-- ai-qa:managed:branch-protection -->
## Branch protection

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ? | Could not check branch protection/rulesets on `main` | No `gh` CLI available (`command -v gh` → not found); no `repo.branch-protection` read tool available in this session's toolset | Re-check via `@qa-configure refresh` when a provider transport for this operation is available |
<!-- /ai-qa:managed:branch-protection -->

<!-- ai-qa:managed:codeowners -->
## CODEOWNERS

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No `CODEOWNERS` file found | Bounded search of repo root and `.github/` | — |
<!-- /ai-qa:managed:codeowners -->

<!-- ai-qa:managed:definition-of-done-and-qa-evidence -->
## Definition of done and QA evidence

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No CONTRIBUTING, DoD document or test-evidence policy found | Bounded search of repo root — none found | CI green + HTML report are the only observed evidence source |
<!-- /ai-qa:managed:definition-of-done-and-qa-evidence -->

<!-- ai-qa:managed:documentation -->
## Documentation

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `README.md` is the only documentation; no `docs/` directory, no ADRs, no wiki links | Root directory listing; `README.md:1-120` | User confirmed repo docs only (no remote docs system) |
<!-- /ai-qa:managed:documentation -->

<!-- ai-qa:managed:integrations -->
## Integrations

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No Jira/ADO/GitHub-Issues work-item integration; `jira.md` is a single pasted example ticket, not a live connection | `jira.md` (no `.atlassian.net` URL, no API config); `github-list_issues` (state=OPEN) → 0 results | User confirmed: work items are manual/pasted |
| ✓ | GitHub repository transport available and verified this session (read-only `list_commits`/`list_pull_requests`/`list_issues` calls succeeded) | This session's tool calls | No `.vscode/mcp.json` needed — uses the host's built-in GitHub tool, not a project-local MCP server |
<!-- /ai-qa:managed:integrations -->

<!-- ai-qa:managed:project-context -->
## Project context

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Playwright + TypeScript UI automation skeleton for onboarding; tests an external "Test Application" (Users/Projects manager) via `BASE_URL` | `README.md`, `fixtures/testFixtures.ts`, `config/env.ts`, `pages/` | See `.github/ai-qa/project/project.md` for full detail |
<!-- /ai-qa:managed:project-context -->

## Needs your input

| Question | Evidence / conflict sides | Option A (recommended) | Alternative | Decision unlocked |
|---|---|---|---|---|
| None — all behaviour-relevant items were resolved in the Configure interview on 2026-10-13 (work-item system, docs system, scenario format, git conventions, constraints, PR policy, default test environment). Remaining `?`/`⚠` items (branch protection, README/app drift) are non-blocking and recorded above for future reference. | — | — | — | — |
