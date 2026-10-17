---
work-id: "adhoc-20261013-add-user"
skill: "qa-design-scenarios"
framework-version: "1.1.0"
created: "2026-10-13T19:40:00Z"
inputs:
  - source: "qa-work/adhoc-20261013-add-user/01_requirement_analysis.md"
    revision: "2026-10-13T19:20:00Z"
  - source: "qa-work/adhoc-20261013-add-user/03_coverage_assessment.md"
    revision: "2026-10-13T19:30:00Z"
  - source: ".github/ai-qa/project/conventions/qa-process.md (Scenario format: bdd), conventions/testing.md (Test data rules, Environments)"
    revision: "2026-10-13"
---

# Test Scenarios — Add User

**Scenario format used: `bdd` (Given/When/Then)** — `★` project default per `conventions/qa-process.md` → Scenario format, matching `jira.md` AC1–AC5.

**Scope:** FR1–FR11, NFR1. No passing automated evidence exists for any requirement (`03_coverage_assessment.md` verdict: Insufficient), so the deduplication filter does not remove any FR/NFR from manual coverage here — every requirement gets at least one scenario, and related triggers under the same AC are merged into one scenario with multiple `AND` assertions where they form one business check.
**Status:** complete (revised after `07_design_review.md`)
**Result:** 11 scenarios written covering all 11 FR and the 1 NFR (UI journeys TS01–TS06, API checks TS07–TS11); no requirement remains unwritten. TS11 is written but design-blocked for execution pending Open Question 3 (same dependency as TS05).
**Do next:** 1) Resolve Open Questions (email regex, placeholder value, duplicate-case-insensitivity layer, server-error trigger) before execution. 2) Pass to `qa-regression-risk` and `qa-automation-plan`. 3) Confirm/seed required test data before any execution.

> **Revision note:** TS11 was added, and TS01/TS02/TS03/TS04/TS06/TS08/TS09 were amended, in response to `07_design_review.md` Critical/High/Medium findings (missing FR10 scenario, TS01/TS02 redundancy rationale, missing FR1 exact-option-list assertion, missing per-sub-check diagnostic granularity, implicit setup in GIVEN clauses). See that review's "Remediation record" for the full list.

## Environment, setup and test data (common to all scenarios)

- **Environment:** `local` (project default for AI-QA/manual runs per `conventions/testing.md`), base URL via `BASE_URL`. Same behaviour expected on `int`/`qa` — no environment-specific logic is stated in the ticket.
- **Test data naming:** unique, realistic names per run, following the existing pattern in `tests/functional/add-project.spec.ts` (`${name} ${Date.now()}`) to avoid colliding with data left by prior runs in a shared environment, e.g. email `alex.morgan.<timestamp>@test.com`. Avoid ticket-number prefixes and excessive `TEST` labels per `conventions/testing.md`.
- **Cleanup:** no delete/edit capability is in scope for this ticket (explicitly out of scope); created users persist. Testers should note created emails/timestamps in the evidence placeholder so they can be recognised later; no automated cleanup is proposed here.
- **Evidence:** screenshot of the Users page row (UI scenarios) or the raw HTTP response (API scenarios), attached at the placeholder in each scenario.

## Scenarios

### Test Scenario 01 — Create a user successfully

**Covers:** FR2

```gherkin
GIVEN I am on the "Add new user" page
WHEN I fill in Name, Surname, Email and Position with valid, unique data
AND I click "Create user"
THEN I am taken to the Users page
AND the new user is listed with the exact name, surname and position I entered

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Kept as a separate, minimal smoke-style scenario (not folded into TS02) so a quick single-user happy-path check exists independent of the 9-position data-driven set — useful as a fast first check after deployment, before running the fuller TS02 pass.

---

### Test Scenario 02 — A user can be created for every allowed position

**Covers:** FR1, FR2

```gherkin
GIVEN I am on the "Add new user" page
WHEN I open the Position dropdown
THEN it offers exactly these 9 options, in any order, with no others: Lead Test Engineer, Senior Test Engineer, Test Engineer, Junior Engineer, Lead Developer, Senior Developer, Test Developer, Junior Developer, Business Analyst
AND WHEN I create a new user selecting each of the 9 allowed positions in turn, one user per position, with a unique email per attempt
THEN each new user is saved and appears on the Users page showing exactly the position I selected for them

Evidence:
```

**Test data (one row per sub-case):**

| # | Position |
|---|---|
| 1 | Lead Test Engineer |
| 2 | Senior Test Engineer |
| 3 | Test Engineer |
| 4 | Junior Engineer |
| 5 | Lead Developer |
| 6 | Senior Developer |
| 7 | Test Developer |
| 8 | Junior Developer |
| 9 | Business Analyst |

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:**

**Sub-results (one row per position, for partial-failure diagnosis):**

| Position | Status | Notes |
|---|---|---|
| Lead Test Engineer | | |
| Senior Test Engineer | | |
| Test Engineer | | |
| Junior Engineer | | |
| Lead Developer | | |
| Senior Developer | | |
| Test Developer | | |
| Junior Developer | | |
| Business Analyst | | |

---

### Test Scenario 03 — The form rejects invalid submissions and creates no user

**Covers:** FR3

```gherkin
GIVEN I am on the "Add new user" page
WHEN I leave the Name field empty, fill the rest with otherwise-valid data, and click "Create user"
THEN a validation message appears and no user is created
AND WHEN I instead fill in all fields but keep the Position dropdown on its placeholder value, and click "Create user"
THEN a validation message appears and no user is created
AND WHEN I instead fill in all fields but enter an invalid email such as "abc@", and click "Create user"
THEN a validation message appears and no user is created

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Exact email-validation rule and the placeholder's label are open questions (see below) — tester should record the literal value used.

**Sub-results (one row per trigger, for partial-failure diagnosis):**

| Trigger | Status | Notes |
|---|---|---|
| Empty Name field | | |
| Placeholder Position selected | | |
| Invalid email (`abc@`) | | |

---

### Test Scenario 04 — A duplicate email is rejected, including case variants

**Covers:** FR4, FR11

```gherkin
GIVEN I have created a user via the "Add new user" page using a known email, e.g. "duplicate.check.<timestamp>@test.com" (setup step, not part of the assertions under test)
WHEN I try to create a new user using that exact same email
THEN the user is not created and the message "A user with this email already exists" appears
AND WHEN I instead try to create a new user using the same email with different capitalisation, e.g. "DUPLICATE.CHECK.<timestamp>@TEST.COM"
THEN the user is not created and the same duplicate-email message appears

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Confirms both the exact-match and case-insensitive layer referenced in the ticket's Test notes; whether this is enforced by the application or the database collation is an open question and does not change the expected observable outcome.

**Sub-results (one row per trigger, for partial-failure diagnosis):**

| Trigger | Status | Notes |
|---|---|---|
| Exact-match duplicate email | | |
| Different-capitalisation duplicate email | | |

---

### Test Scenario 05 — A server error preserves the entered form values

**Covers:** FR5

```gherkin
GIVEN I am on the "Add new user" page and have filled in valid, unique details
WHEN I submit the form and the server returns an error
THEN an error message appears
AND the form still shows the Name, Surname, Email and Position I entered, unchanged

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Execution of this scenario depends on an environment-safe way to force a server error (Open Question 3); until that is resolved, treat as **blocked for execution**, not blocked for design.

---

### Test Scenario 06 — Special-character names are saved and displayed exactly as entered

**Covers:** FR6

```gherkin
GIVEN I am on the "Add new user" page
WHEN I create a user with the name "O'Brien" and valid other fields
THEN the user is saved and the Users page displays the name exactly as "O'Brien"
AND WHEN I instead create a user with the name "Zoë" and valid other fields
THEN the user is saved and the Users page displays the name exactly as "Zoë"

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Checks for mangled encoding (e.g. `O&#39;Brien`, `Zo?`) in the rendered page, not just the raw HTTP response.

**Sub-results (one row per name, for partial-failure diagnosis):**

| Name | Status | Notes |
|---|---|---|
| O'Brien | | |
| Zoë | | |

---

### Test Scenario 07 — API: a valid payload returns 201 with the new user's id

**Covers:** FR7

```gherkin
GIVEN the POST /users endpoint is reachable
WHEN I send a valid { name, surname, email, position } payload
THEN the response status is 201
AND the response body contains an "id" for the new user

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** API-level check, independent of the UI; crosses the real API contract boundary so it is not redundant with TS01.

---

### Test Scenario 08 — API: a missing or invalid field returns 400

**Covers:** FR8

```gherkin
GIVEN the POST /users endpoint is reachable
WHEN I send a payload missing a required field (e.g. no "email")
THEN the response status is 400
AND WHEN I instead send a payload with a "position" value outside the 9 allowed values
THEN the response status is 400

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Confirms the backend repeats and enforces validation independently of the frontend, per the Technical notes.

**Sub-results (one row per trigger, for partial-failure diagnosis):**

| Trigger | Status | Notes |
|---|---|---|
| Missing required field | | |
| Disallowed position value | | |

---

### Test Scenario 09 — API: a duplicate email returns 409

**Covers:** FR9, FR11

```gherkin
GIVEN I have created a user via POST /users using a known email (setup step, not part of the assertion under test)
WHEN I send a POST /users payload reusing that exact email
THEN the response status is 409

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** API-level counterpart to TS04; confirms the 409 contract directly rather than only observing the UI message.

---

### Test Scenario 10 — API: a SQL-injection string in the name is stored as plain text

**Covers:** NFR1

```gherkin
GIVEN the POST /users endpoint is reachable
WHEN I send a valid payload where "name" contains a SQL-injection string, e.g. "Robert'); DROP TABLE Users;--"
THEN the response status is 201 and the user is created normally
AND retrieving the created user returns the "name" field unchanged, as literal text, with no SQL executed and no other data affected

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** This is a security-relevant boundary check (parameterised queries) and must not be skipped even though it resembles FR6/FR2 in shape — it specifically targets injection handling, which those scenarios do not exercise.

---

### Test Scenario 11 — API: an unexpected server error returns 500

**Covers:** FR10

```gherkin
GIVEN the POST /users endpoint is reachable and a safe, repeatable mechanism exists to force an unexpected server-side error
WHEN I send a request that triggers that error path
THEN the response status is 500
AND no partial or corrupt Users record is created as a result

Evidence:
```

**Result:**
**Status:** PASS / FAIL / BLOCKED
**Notes:** Added following `07_design_review.md` (Critical finding — FR10 previously had no scenario at all). **Design-blocked for execution**, same dependency as TS05: no safe, repeatable server-error trigger mechanism is confirmed for any configured environment (Open Question 3). Do not execute until that mechanism is agreed; keep this scenario rather than deleting it, since FR10 sits in the HIGH-risk API Behaviour/Backend Logic regression areas.

## Scenarios Not Written

No FR/NFR is left without a scenario. Coverage is Insufficient (`03_coverage_assessment.md`), so the dedup filter did not remove any requirement from scope; FR10, previously listed here, now has a written (though execution-blocked) scenario — TS11 — per the `07_design_review.md` remediation.

## Open questions carried from requirement analysis

1. Exact email-validation rule (client-side and server-side) beyond the single `abc@` example.
2. Whether duplicate-email case-insensitivity (FR4/FR11) is enforced in application logic, DB collation, or both.
3. Safe, repeatable mechanism to force a server error (FR5/FR10) in the configured test environment.
4. Exact label/value of the placeholder Position option.

## Drift

None observed against `project.md` or conventions.
