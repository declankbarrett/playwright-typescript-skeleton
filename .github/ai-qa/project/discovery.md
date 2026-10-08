# Project Discovery

**Repository / scope:** declankbarrett/playwright-typescript-skeleton (full repo)
**Branch / revision:** feature/testing-ai-tool @ 2af3ecb7be6bacd2ea9dfbbdcb1f58b600a88704
**Observed at:** 2026-10-08
**Sampling approach:** Small repository — read all 5 spec files (100%), all config/fixture/page files, README.md in full, `.github/workflows/playwright.yml` in full, `git log`/`git branch -a` output, and GitHub API (`list_commits`, `list_pull_requests`) for the origin repository.

<!-- ai-qa:managed:repo-shape -->
## Repo shape

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Single-package repo, no workspaces/monorepo. Root dirs: `config/`, `fixtures/`, `pages/`, `tests/{smoke,functional}`, `test-data/`, `utils/`. | `ls -la` repo root; README.md "Framework Structure" | — |
<!-- /ai-qa:managed:repo-shape -->

<!-- ai-qa:managed:languages-and-build -->
## Languages and build

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | TypeScript ^5.5.0, Node.js (>=18 README, 20.x in CI), npm, `tsconfig.json` strict ES2021 with path aliases. | package.json L1–22; tsconfig.json L1–22; .github/workflows/playwright.yml L13–15 | — |
<!-- /ai-qa:managed:languages-and-build -->

<!-- ai-qa:managed:app-frameworks-and-data -->
## App frameworks and data

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No app framework, database, or IaC owned by this repo; sole target is the external public demo app saucedemo.com. | Bounded search of repo root — no manifests/compose/IaC found | Configuration only; no running service inferred |
<!-- /ai-qa:managed:app-frameworks-and-data -->

<!-- ai-qa:managed:test-stack-and-pack-match -->
## Test stack and pack match

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `@playwright/test` ^1.48.0 + `playwright.config.ts`; matches pack `playwright-ts` (TypeScript variant, JS section not applicable). | package.json L11; playwright.config.ts L1–40 | 5/5 spec files are `.ts` |
<!-- /ai-qa:managed:test-stack-and-pack-match -->

<!-- ai-qa:managed:test-structure-and-conventions -->
## Test structure and conventions

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `tests/smoke/*.spec.ts` (3 files), `tests/functional/*.spec.ts` (2 files); `describe('Smoke: <Feature>')` / `describe('Functional: <Feature>')`; POM in `pages/`; fixtures `loginPage`/`homePage`/`users`/`config` in `fixtures/testFixtures.ts`; JSON test data via `utils/testDataLoader.ts`. | tests/smoke/login.spec.ts; tests/functional/login-validation.spec.ts; fixtures/testFixtures.ts L1–45 | Sample: 5/5 spec files (100%) |
<!-- /ai-qa:managed:test-structure-and-conventions -->

<!-- ai-qa:managed:execution -->
## Execution

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | `npm test`, `npm run test:local\|int\|qa`, `npm run test:smoke\|test:functional`, `npm run test:headed`, `npm run typecheck`, `npm run report`. | package.json L7–16 | Documented and configured; not executed during discovery |
<!-- /ai-qa:managed:execution -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | GitHub Actions `playwright.yml`: push/PR to `main` + `workflow_dispatch`; `npm ci` → install browsers → `npm run test:int` → upload `playwright-report/` + `test-results/` (14-day retention). | .github/workflows/playwright.yml L1–40 | — |
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:managed:git -->
## Git

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | Base branch `main` (origin/HEAD). Single commit "Adding skeleton to repo" (not Conventional Commits). Branches: `feature/test-application-crud`, `feature/testing-ai-tool`, `main` — pattern `feature/<slug>`, no ticket prefix. | `git branch -a`; `git log --oneline`; GitHub `list_commits` | Sample: 1 commit, 2 non-main branches — insufficient for a strong convention; user approved Conventional Commits as a forward-looking default |
<!-- /ai-qa:managed:git -->

<!-- ai-qa:managed:prs -->
## PRs

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No PRs exist yet (open or closed); no PR template found. | GitHub `list_pull_requests` → `[]`; bounded search for `PULL_REQUEST_TEMPLATE*` | — |
<!-- /ai-qa:managed:prs -->

<!-- ai-qa:managed:codeowners -->
## CODEOWNERS

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No `CODEOWNERS` file found. | Bounded repo-wide search | — |
<!-- /ai-qa:managed:codeowners -->

<!-- ai-qa:managed:definition-of-done-and-qa-evidence -->
## Definition of done and QA evidence

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ∅ | No DoD/QA evidence policy document found beyond README usage instructions. | README.md full read | Framework readiness rubric applied by default (user-approved) |
<!-- /ai-qa:managed:definition-of-done-and-qa-evidence -->

<!-- ai-qa:managed:documentation -->
## Documentation

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | README.md is the sole documentation root; no `docs/`, ADRs, or wiki. `jira.md` at repo root is a single sample Jira-style ticket, not a documentation index. | Repo root listing; jira.md full read | — |
<!-- /ai-qa:managed:documentation -->

<!-- ai-qa:managed:integrations -->
## Integrations

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | GitHub remote `github.com/declankbarrett/playwright-typescript-skeleton`; GitHub MCP tools verified this session (read-only `list_commits`/`list_pull_requests` succeeded). No `gh` CLI installed. No Jira/ADO/Confluence config, MCP, or CLI auth found; `jira.md` confirmed by user to be a sample artifact only, not a live integration. | `git remote -v`; `gh auth status` → command not found; GitHub MCP calls 2026-10-08 | No secret values observed or requested |
<!-- /ai-qa:managed:integrations -->

<!-- ai-qa:managed:project-context -->
## Project context

| Status | Conclusion | Evidence (paths with lines / commands) | Note |
|---|---|---|---|
| ✓ | See `.github/ai-qa/project/project.md` for full Project Context, written and approved in this same session. | project.md | High confidence, fresh as of 2026-10-08 |
<!-- /ai-qa:managed:project-context -->

## Needs your input

None — all four unresolved items (work-item provider, scenario format, git/PR convention defaults, remaining framework defaults) were resolved via Option-A interview on 2026-10-08.

| Question | Evidence / conflict sides | Option A (recommended) | Alternative | Decision unlocked |
|---|---|---|---|---|
| None | — | — | — | — |
