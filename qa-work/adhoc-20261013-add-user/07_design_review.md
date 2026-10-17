---
work-id: "adhoc-20261013-add-user"
skill: "qa-review-tests"
framework-version: "1.1.0"
created: "2026-10-13T20:10:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
  - source: "qa-work/adhoc-20261013-add-user/03_coverage_assessment.md"
    revision: "2026-10-13T19:30:00Z"
  - source: "qa-work/adhoc-20261013-add-user/04_test_scenarios.md"
    revision: "2026-10-13T19:40:00Z"
  - source: "qa-work/adhoc-20261013-add-user/05_regression_risk.md"
    revision: "2026-10-13T19:50:00Z"
mode: "design"
---

# Review Tests — Design Mode — Add User

**Result:** Needs Improvement — traceability and the 13-area regression comparison are substantially sound, but one HIGH-risk requirement (FR10, 500 contract) has no executable scenario, its only related scenario is design-blocked, and the regression matrix contradicts its own evidence-handling rule on one row.
**Do next:** 1) Resolve Open Question 3 (server-error trigger mechanism) and add a dedicated API-level scenario for FR10 (500), independent of the blocked UI scenario. 2) Correct the Caching row in `05_regression_risk.md` (Risk Level cannot be LOW while evidence is stated as unconfirmed). 3) Decide whether TS01 is retained as a distinct scenario or folded into TS02, and add an explicit "dropdown shows no other options" assertion to TS02 for FR1.

> This review was run as an independent subagent (per `workflows.md` design step 8 / `qa-review-tests` reviewer stance) with no involvement in producing the design under review.

## Scope

Design-only review of four artefacts for ticket "Add User: create a new user from the UI" (`jira.md`, repo root): `01_requirement_analysis.md` (FR1–FR11, NFR1), `03_coverage_assessment.md` (verdict Insufficient), `04_test_scenarios.md` (TS01–TS10 + Scenarios Not Written), `05_regression_risk.md` (13-area matrix, highest HIGH). No test code, diff or ticket branch was supplied or reviewed; this is independent of production of the design.

## Branch/revision

No implementation branch exists for this ticket (per `01_requirement_analysis.md`: "not-yet-built"). All four artefacts cite working-tree provenance commit `df9a439aa0cd25ed58318e0f5db23acb7dc7265b`. No separate code/diff was reviewed.

## Execution provenance

**None.** This is a design-mode review only. `03_coverage_assessment.md` itself reports zero current automated evidence for every FR/NFR (prior `add-user.spec.ts` deleted, no API tests ever existed). No run/report artefact was provided or claimed, and this review does not execute anything or infer pass status from any source.

## Requirement-to-scenario traceability

| Requirement | Scenario(s) | Status |
|---|---|---|
| FR1 (dropdown offers exactly 9 positions) | TS02 | Partial — selection/creation covered; "offers *exactly* these 9, no more" is not asserted (see Finding) |
| FR2 (happy path create → redirect → listed) | TS01, TS02 | Covered (see redundancy finding) |
| FR3 (empty field / placeholder / invalid email rejected) | TS03 | Covered |
| FR4 (duplicate email, incl. case variants) | TS04 | Covered |
| FR5 (server error preserves form values) | TS05 | Covered in design only — explicitly marked "blocked for execution" (Open Question 3) |
| FR6 (special-character names preserved) | TS06 | Covered |
| FR7 (POST /users → 201 + id) | TS07 | Covered |
| FR8 (POST /users → 400) | TS08 | Covered |
| FR9 (POST /users → 409) | TS09 | Covered |
| FR10 (POST /users → 500) | **None** | Not Written — justified as an uncertainty gap, not a deliberate dedup decision; no existing passing evidence (consistent with `03_coverage_assessment.md`) |
| FR11 (Users.email UNIQUE constraint) | TS04, TS09 | Covered indirectly via behavioural 409 checks, consistent with DB being external/unreachable |
| NFR1 (parameterised queries / SQLi stored as plain text) | TS10 | Covered |

Every FR/NFR is either covered or named under **Scenarios Not Written** — the traceability bookkeeping itself is complete and honest about the one gap.

## Findings

| Severity | Finding | Evidence | Recommendation |
|---|---|---|---|
| Critical | FR10 (500 contract) has zero scenario, and its only related substitute, TS05, is explicitly design-blocked pending an unresolved mechanism. `05_regression_risk.md` lists "TS07–TS10" as the targeted scenarios reinforcing the HIGH-risk API Behaviour area, but TS10 actually covers NFR1 (SQL injection), not FR10/500 — the regression doc's own claim of coverage for this HIGH area is inaccurate. | `04_test_scenarios.md` "Scenarios Not Written" row (FR10); TS05 Notes ("treat as blocked for execution... until [Open Question 3] is resolved"); `05_regression_risk.md` "API Behaviour (HIGH)" → "Targeted scenario: TS07–TS10" | Resolve Open Question 3 (safe server-error/fault-injection trigger) before sign-off, then add a dedicated API-level scenario (e.g. TS11) asserting the 500 status and that no partial/corrupt data is written. Correct the regression doc's targeted-scenario reference for API Behaviour so it does not overstate coverage. Owner: test designer + backend dev (for the trigger mechanism). |
| High | `05_regression_risk.md` rates **Caching** Risk Level = LOW while its own "Why?" column states the behaviour is unconfirmed ("unknown... not confirmed absent") and its "Regression Needed"/"Automation Update Needed" columns are both "Unknown." This directly contradicts the mandatory rule in `regression-areas.md`: "never treat missing evidence as LOW." | `05_regression_risk.md` Regression Risk Matrix, Caching row; `.github/ai-qa/framework/method/regression-areas.md` "Mandatory analysis rules" | Re-rate Caching as MEDIUM (or explicitly "Unknown") to match the stated evidence gap, or obtain positive evidence that no caching layer exists before keeping it LOW. Owner: risk assessor, before the artefact is reused downstream. |
| Medium | TS01 ("Create a user successfully", covers FR2) is largely subsumed by TS02 ("…every allowed position", covers FR1, FR2), whose first iteration already exercises the identical create→redirect→listed flow. As written, TS01 adds no incremental assurance distinct from TS02's position-1 case, which sits in tension with the dedup-rule's instruction to merge ACs exercised by the same business flow rather than duplicate. | `04_test_scenarios.md` TS01 vs TS02 bodies; `.github/ai-qa/framework/method/dedup-rule.md` "What to avoid" | Either fold TS01 into TS02 (treat position 1 as the baseline happy-path case) or state explicitly why TS01 is kept separate (e.g. as a minimal smoke case independent of the data-driven set). Owner: test designer. |
| Medium | FR1 requires the dropdown to offer "exactly" the 9 listed positions (implying no extra/unexpected options), but TS02 only asserts that each of the 9 values can be selected and is saved/listed — it never asserts the dropdown's full option list contains exactly these 9 and nothing else. | `01_requirement_analysis.md` FR1 wording ("offering exactly: …"); `04_test_scenarios.md` TS02 body (no option-list assertion) | Add an explicit assertion to TS02 (or a new scenario) that the rendered dropdown option list equals the 9 named values, no more/fewer. Owner: test designer. |
| Medium | TS03, TS04, TS06 and TS08 each merge 2–3 independently-failable checks (e.g. empty field / placeholder / invalid email in TS03) into one scenario with a single `Status: PASS/FAIL/BLOCKED` field. If only one sub-check fails, there is no field to record which one, reducing diagnostic value during triage and re-test. | `04_test_scenarios.md` TS03/TS04/TS06/TS08 bodies — each has exactly one Result/Status/Notes block covering multiple AND-chained checks | Add a sub-result note per merged AND-block (e.g. a short table or bullet per assertion) so partial failures are traceable, or split into separate scenarios where triage clarity outweighs the scenario-count saving. Owner: test designer. |
| Low | The bdd merge technique in TS03/TS04/TS06/TS08 uses "AND WHEN ... THEN ..." to restate a new action under an AND label. `scenario-format.md`'s bdd form defines `AND` as an additional assertion line, not a mechanism for introducing a new WHEN action; the dedup-rule's "multiple AND assertions" guidance is being stretched to also smuggle in new actions. | `.github/ai-qa/framework/method/scenario-format.md` "bdd" section; `04_test_scenarios.md` TS03/TS04/TS06/TS08 | Normalise merged sub-cases to pure AND-assertion chains where possible, or confirm with the project that "AND WHEN" is an accepted house-style extension to bdd. Owner: test designer (stylistic, non-blocking). |
| Low | TS04 and TS09's GIVEN clause ("a user has already been created with a known email") states a precondition but not an explicit setup step (who creates it, via UI or API, and when relative to the scenario's own WHEN), leaving part of the reproducibility implicit rather than spelled out as the quality criteria require. | `04_test_scenarios.md` TS04, TS09 GIVEN lines; `.github/ai-qa/framework/method/dedup-rule.md` "Quality criteria" ("Reproducible — can be run by anyone with access to the environment") | Add an explicit setup line (e.g. "Setup: create this user via POST /users before running the scenario") to remove ambiguity for an unfamiliar tester. Owner: test designer. |

## Overall verdict: **Needs Improvement**

Reasoning: Traceability is complete on paper (every FR/NFR is covered or explicitly named as not-written with an honest uncertainty rationale, not a false dedup claim), the scenario set correctly declines to apply the dedup filter given zero existing passing evidence (`03_coverage_assessment.md` verdict Insufficient), and the design is compared against all four HIGH-risk regression areas with concrete targeted scenarios for three of them. However, this is not **Pass**: FR10 sits inside the two most severe regression areas (API Behaviour, Backend Logic, both HIGH) and currently has no reproducible test path at all — its only candidate substitute is itself blocked — while the regression document inaccurately claims this area is covered by "TS07–TS10." A second, independent defect (Caching rated LOW against its own stated "unknown" evidence) contradicts a mandatory framework rule. This is not **Insufficient** either: the artefacts are not missing or too thin to assess — the gaps are specific, named, and fixable without re-doing the whole design. Scenario-format compliance (bdd, no mixing) holds throughout, and the project's configured `bdd` format convention is consistently followed.

## Not reviewed

- `02_code_context.md` and `06_automation_plan.md` were referenced by the four reviewed artefacts but were not supplied for this review and are out of its scope; any findings specific to automation structuring or code-context accuracy are not assessed here.
- No test code, diff, or CI run exists yet for this ticket, so code-mode checks (conventions, pack anti-patterns, assertion quality in actual spec files) do not apply and were not performed.

## Drift

None observed against `.github/ai-qa/project/project.md` or `.github/ai-qa/project/conventions/*`. The Caching-row inconsistency identified above is a contradiction with the framework method file `regression-areas.md`, not with project-specific conventions, so it is reported as a High-severity finding above rather than under Drift; no `qa-configure refresh` is suggested since no project-layer content is implicated.

## Remediation record

Following this review, the Critical and High findings were actioned directly in the design artefacts before test-plan finalisation (see `qa-work/adhoc-20261013-add-user/index.md` gate log and `outputs/08_test_plan.md`):

- Added **TS11** (API: forced server error → 500, FR10) to `04_test_scenarios.md`, marked **Automate (blocked)** in `06_automation_plan.md` for the same reason as TS05 (Open Question 3), and corrected `05_regression_risk.md`'s API Behaviour targeted-scenario reference to `TS07–TS09, TS11`.
- Re-rated `05_regression_risk.md` Caching row from LOW to **MEDIUM**, consistent with its own stated evidence gap and `regression-areas.md`'s "never LOW without justification" rule.
- Added an explicit rationale note to TS01 distinguishing it from TS02 (kept as a minimal, non-data-driven smoke case) and an exact-option-list assertion to TS02 for FR1.
- Added explicit per-sub-check "Sub-results" placeholders to TS03/TS04/TS06/TS08 and explicit setup lines to TS04/TS09.
- The two Low findings (AND WHEN style, implicit setup) are accepted as a documented house-style extension / addressed alongside the setup-line fix above; no further action required before approval.

These changes do not alter the Needs Improvement verdict recorded above (the verdict reflects the design as reviewed); they are tracked here so the final test plan reflects verified-current content rather than the as-reviewed snapshot.
