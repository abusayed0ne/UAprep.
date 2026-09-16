# UniAdmissionPrep — Mega Master Plan for a Secure Private-University Admission Preparation SaaS

**Working brand:** **UniAdmissionPrep**  
**Positioning descriptor:** *Private University Admission Preparation, Bangladesh*  
**Initial product:** University-focused online mock tests  
**Long-term product:** A complete admission-preparation operating system covering research, preparation, practice, testing, analytics, improvement, university tracking, and eventually AI-assisted tutoring.

The most important conclusion from the research is this:

> **UniAdmissionPrep should not be built around “a collection of questions.” It should be built around a governed assessment-content system.**

That distinction matters because actual private-university admission structures vary significantly. BRAC University currently divides its admission test into program-dependent English, composition, mathematics, science and architecture sections; NSU's official sample material uses separate grammar/vocabulary, quantitative aptitude, reading comprehension and composition components; UIU publishes its own admission-test procedure and syllabus; and UAP's current Pharmacy selection system combines a 100-mark written test with another 100 marks based on SSC/HSC academic results before viva. A single hard-coded “50-question, 100-mark mock exam” model therefore would be fundamentally wrong. citeturn20search12turn7search0turn8search0turn1search2turn17search24

I conducted this as **live web-based field/desk research using university primary sources, current official law/government sources, assessment-industry standards, application-security standards, and payment documentation**. I have not represented this as physical campus fieldwork or interviews. The plan below also specifies exactly how UniAdmissionPrep should conduct that offline validation before expanding university coverage.

## Strategic direction and primary-source field research

### What UniAdmissionPrep should actually become

The product should be organized around this journey:

**Discover → Choose Targets → Diagnose → Prepare → Practice → Mock → Review → Analyze → Improve → Revise → Track Admission**

The short-term commercial wedge is:

> **“Take realistic private-university admission mock tests and know what to improve next.”**

The long-term product promise is:

> **“Everything you need between deciding to prepare and walking into your admission test.”**

That preserves the original concept, but gives it a much stronger operating model.

The student should eventually see something like:

> **BRAC University — CSE**  
> Target test: 18 days away  
> Preparation readiness: 72%  
> Strong: English Reading, Algebra  
> Needs attention: Grammar, Physics  
> Recommended now: 15-minute Physics Focus Practice  
> Next full mock: Mock 04  
>   
> **Continue Preparation**

The word **readiness** must mean UniAdmissionPrep's internal preparation indicator, not probability of admission and not an official university score.

### What the university research tells us

A useful production database must represent a university's exam pattern as **versioned configuration**, not application code.

| Institution researched | What primary-source research shows | Product implication |
|---|---|---|
| **BRAC University** | Current admission information links applicants to an official sample-question set and assigns different test sections by program. For example, BBA/Economics use English composition, English MCQ and Mathematics MCQ, while CSE/CS/EEE and related programs add Higher Mathematics & Physics. BRAC also states that applicants for specified programs must pass relevant subsections separately. citeturn20search12turn20search0 | Pattern must be attached to **university + program group + effective version**, not merely university. |
| **BRAC University sample** | The currently linked sample organizes English MCQ as 20 questions/20 marks/25 minutes; composition as one written task/40 marks/35 minutes; Mathematics as 15 MCQs/15 marks/30 minutes; Higher Mathematics & Physics as 10 MCQs/10 marks/20 minutes; Biology & Chemistry as 10 MCQs/10 marks/20 minutes; and an Architecture section. The sample states that wrong answers do not deduct marks. citeturn3view0 | Section counts, marks, time and negative-marking policy need configurable fields. Never create a global scoring formula. |
| **North South University** | NSU's official sample material presents English Grammar & Vocabulary with 40 MCQs/20 minutes, Quantitative Aptitude with 50 MCQs/60 minutes and Reading Comprehension with 20 MCQs/20 minutes, followed by a composition component. NSU also directs applicants to its sample question paper through official admissions information. citeturn7search0turn8search0turn6search11 | UniAdmissionPrep needs both MCQ and constructed-response support from the beginning, even if automated essay scoring is not initially offered. |
| **United International University** | UIU's official admission material describes multiple admission-test sections, including English and mathematics components; its syllabus indicates MCQ plus writing-type content, while published procedure material specifies section-level configuration. citeturn1search2turn10search1turn11search0 | The research/admin system must record both **syllabus coverage** and **exam mechanics**. |
| **University of Asia Pacific** | UAP publishes program-specific sample-question resources. Its current Pharmacy page, updated September 16, 2026, describes a 100-mark written MCQ examination—Chemistry 40, Biology 40 and English 20—with 50 minutes, while academic results contribute another 100 marks before viva. citeturn17search0turn17search19turn17search24 | “Admission score” can include more than an exam result. UniAdmissionPrep must distinguish **mock score**, **practice benchmark**, and any separately modeled admission-selection component. |

This establishes a key product law:

> **A University is not a Test Pattern. A University can have several Pattern Versions, and different Programs may use different Pattern Sections inside the same intake.**

Therefore the hierarchy should look like:

```text
University
└── Admission Pattern
    ├── Pattern Version
    │   ├── Effective From
    │   ├── Effective Until
    │   ├── Intake
    │   ├── Evidence
    │   └── Program Groups
    │       └── Test Sections
    │           ├── Subject
    │           ├── Question Type
    │           ├── Question Count
    │           ├── Marks
    │           ├── Duration
    │           ├── Negative Marking
    │           ├── Calculator Rule
    │           └── Section-Pass Rule
```

### The university evidence registry

Do not allow an admin to casually type “NSU has 50 Math questions” into production.

Create a formal **University Evidence Registry**.

Every admission-pattern claim should have:

| Field | Example |
|---|---|
| University | BRAC University |
| Program/group | CSE / CS / EEE group |
| Intake | Fall 2026 |
| Claim type | Admission-test sections |
| Evidence type | Official university webpage |
| Source reference | Saved source record |
| Source snapshot/hash | Preserved internally |
| Observed date | 2026-09-16 |
| Effective date | If known |
| Researcher | Staff user ID |
| Verified by | Academic Director |
| Confidence | Verified / Probable / Unverified |
| Status | Draft / Approved / Stale / Superseded |
| Next review | Before next intake |
| Notes | Subsections must be passed separately |

Use the following evidence hierarchy:

**Tier A — Production-authoritative:** current official university webpage, current official PDF, official admission circular.

**Tier B — Supporting authoritative:** older official sample still linked from the university's current admissions page.

**Tier C — Verified direct communication:** written clarification from an admissions office that UniAdmissionPrep can retain.

**Tier D — Research lead only:** coaching websites, Facebook posts, student recollections, forums and third-party blogs.

**Tier D must never automatically alter a production exam configuration.**

This approach is essential because current official university information can change by intake. For example, BRAC's September 8, 2026 domestic-applicant page currently specifies program-level admission sections and links its sample paper directly. citeturn20search12

### What to launch first

Do **not** begin by promising every private university in Bangladesh.

A stronger initial scope is:

**BRAC University + North South University**, followed by **UIU/UAP or another university where current official pattern evidence is sufficiently strong and there is student demand**.

BRAC and NSU are particularly suitable starting points because official sample/pattern material is available and demonstrates several types of questions the engine will ultimately need. citeturn20search0turn20search12turn7search0turn8search0

Your first competitive advantage will not be:

> “We have 50,000 questions.”

It should be:

> **“Every mock follows a researched blueprint, every published question has passed academic review, and every score can be explained.”**

## Question supply, rights, validation, and scoring governance

This is the most critical part of the business.

### Where should UniAdmissionPrep get questions?

Do **not** build the business by downloading university PDFs, copying coaching PDFs, scraping Facebook groups, and uploading everything into your question bank.

Publicly available material is not automatically free to republish. WIPO explicitly notes that putting a protected work online does not place it in the public domain, and copyright protection generally arises automatically; Bangladesh's Copyright Office currently publishes the Copyright Act 2023 as the national copyright framework. citeturn26search1turn26search3turn26search7

The question supply model should instead be:

| Source | Can it become production content? | UniAdmissionPrep policy |
|---|---|---|
| **Original question-setter content** | Yes | **Primary source of the bank.** Setter creates new questions against a blueprint. |
| **Official university sample** | Pattern research: yes. Verbatim republication: only if rights permit. | Extract skills, structure, difficulty signals and format. Do not assume permission to republish the entire paper. |
| **Licensed publisher/teacher/question bank** | Yes | Store contract, owner, scope, duration and permitted usage. |
| **Openly licensed content** | Yes, subject to license | Store license type, attribution and modification obligations. |
| **Public-domain content** | Yes after verification | Record why it is considered public domain. |
| **AI-generated draft** | Draft only | Never publish directly. Human SME review and independent solution validation are mandatory. |
| **Student-submitted question** | Quarantine only | Treat as a lead. Determine provenance before using it. |
| **“Leaked”/current confidential exam question** | No | Reject. |
| **Random coaching PDF / Facebook image** | No by default | Use only as research lead unless rights and provenance can be established. |

This is not merely a copyright issue. It is a **product-quality issue**. UniAdmissionPrep needs to know why every question exists, what skill it assesses, who verified it, which pattern it belongs to and whether it is legally publishable.

WIPO's copyright guidance emphasizes the owner's reproduction rights and the need to consider licensing or applicable statutory exceptions rather than assuming online availability equals unrestricted reuse. citeturn26search3turn26search13

Before selling a large paid question bank, have Bangladesh IP counsel review the final question-source and licensing policy. The product database should support that policy from day one.

### The Question Studio must be an MVP feature

Do not treat the staff Question Studio as something to build after the student application.

It is part of the core product.

The pipeline should be:

```text
University Pattern Research
        ↓
Assessment Blueprint
        ↓
Question Assignment
        ↓
Setter Draft
        ↓
Automated Quality Checks
        ↓
Subject-Matter Review
        ↓
Independent Answer Validation
        ↓
Language / Fairness Review
        ↓
Rights & Provenance Check
        ↓
Academic Approval
        ↓
Pilot Question
        ↓
Item Statistics
        ↓
Production Question Bank
        ↓
Mock / Practice Usage
        ↓
Continuous Monitoring
        ↓
Revise / Quarantine / Retire
```

This mirrors mature assessment-development principles: ETS describes draft items as requiring review for accuracy, appropriateness and fairness, followed by calibration for difficulty and discrimination before use; the Standards for Educational and Psychological Testing treats validity, reliability and fairness as core testing considerations. citeturn25search5turn25search1

### Question lifecycle statuses

Implement actual workflow states:

```text
RESEARCH_BRIEF
DRAFT
SUBMITTED
AUTO_CHECK_FAILED
IN_REVIEW
REVISION_REQUIRED
ANSWER_VALIDATION
FAIRNESS_REVIEW
RIGHTS_REVIEW
APPROVAL_PENDING
APPROVED_FOR_PILOT
PILOTING
APPROVED_PRODUCTION
QUARANTINED
RETIRED
ARCHIVED
```

No setter should be able to jump directly from `DRAFT` to `APPROVED_PRODUCTION`.

### Question data structure

Every production question should have considerably more data than “question + four options + answer.”

At minimum:

```text
Question
├── id
├── tenant_id
├── canonical_question_id
├── current_version_id
├── status
├── source_type
├── provenance
├── rights_status
├── copyright_owner
├── license_reference
├── university_targets[]
├── program_targets[]
├── subject_id
├── topic_id
├── subtopic_id
├── learning_objective_id
├── question_type
├── language
├── stem
├── passage_id
├── media_assets[]
├── options[]
├── correct_answer
├── accepted_answers[]
├── full_solution
├── student_explanation
├── shortcut
├── common_mistake
├── intended_difficulty
├── empirical_difficulty
├── discrimination_metric
├── target_time_seconds
├── marks
├── wrong_answer_penalty
├── skip_score
├── calculator_policy
├── tags[]
├── writer_id
├── reviewer_id
├── validator_id
├── approver_id
├── approved_at
├── effective_from
├── effective_until
├── exposure_count
├── report_count
├── duplicate_fingerprint
└── version_history
```

Never overwrite a published question in place.

For example:

```text
Q-ENG-000381
    ├── Version 1 — retired
    ├── Version 2 — used in Mock A
    └── Version 3 — current
```

An old student's test must always remain reproducible against the exact version they saw.

### What a question setter should see

A setter should not simply receive:

> “Write 50 math questions.”

They should receive a **Question Assignment Brief**:

```text
University Pattern: BRAC-style Mathematics preparation
Subject: Mathematics
Topic: Algebra
Learning Objective:
Solve equations involving exponents and logarithms.

Required items: 10
Difficulty:
- Easy: 2
- Medium: 6
- Hard: 2

Format:
- Single-answer MCQ
- 4 options

Expected solution time:
60–120 seconds

Requirements:
- One defensibly correct option
- Three plausible distractors
- Full worked solution
- Common mistake note
- No copied university wording
- No unnecessary cultural assumptions
- No ambiguous notation
```

Assessment organizations use structured item-development and internal-review processes because item accuracy, relevance, fairness and intended measurement cannot be guaranteed simply by having a knowledgeable author write questions. citeturn25search3turn25search5turn25search6

### Automated pre-review validation

The system should automatically reject or flag items when:

```text
No correct answer exists
More than one correct option exists when single-answer is required
Two options are identical
Solution is missing
Marks are zero/invalid
Penalty exceeds permitted scoring policy
Topic/objective is missing
Math markup cannot render
Referenced image is missing
Question is near-duplicate of another bank item
Correct answer appears in explanation visible during exam
Option lengths reveal obvious patterns
Disallowed source/provenance is selected
Question contains unresolved reviewer comments
```

For numeric/math questions, create an optional **Answer Verification Test** where the academic validator can attach an independent calculation or script output.

### Human validation

For Math, Physics, Chemistry and quantitative reasoning, I recommend:

**Setter → Independent Solver → Reviewer → Approver**

The independent solver should initially see the item **without the proposed key** wherever practical. That reduces confirmation bias.

For English:

**Setter → English SME → Language Editor/Fairness Reviewer → Approver**

For essays:

**Prompt author → English SME → Rubric reviewer → Approver**

The setter **must never approve their own item**.

### Question-quality statistics after real attempts

Human review happens before publication. Statistical validation happens after enough students attempt an item.

Track:

**Facility / empirical difficulty**

\[
p = \frac{\text{number of correct responses}}{\text{number of valid responses}}
\]

If \(p=0.80\), 80% answered correctly. Higher values usually mean an easier item.

**Discrimination**

Measure whether students who perform strongly overall tend to answer the item correctly more often than weaker-performing students. Point-biserial correlation is a useful starting statistic for dichotomous items.

**Distractor performance**

For each wrong option:

```text
A: 12%
B: 4%
C: 72% ← correct
D: 12%
```

A distractor that almost nobody ever chooses may not be functioning well.

**Timing**

Track median response time and high-percentile response time.

**Omission**

Track skip/blank rate.

**Student challenge rate**

Track how often students report ambiguity, wrong answer, broken image or explanation disagreement.

**Exposure**

Track how frequently an item appears so that valuable questions do not become memorized simply through repeated exposure.

ETS research specifically uses item difficulty and discrimination to assess whether items function as intended, and ETS's broader development work treats calibration as a step following item drafting and review. citeturn25search2turn25search5

Do not claim that a single universal cut-off defines a “good” question. For UniAdmissionPrep's initial internal monitoring, you can use configurable flags such as:

```text
Potentially too easy:
p > 0.90

Potentially too hard:
p < 0.20

Review discrimination:
< 0.15

Investigate:
negative discrimination

Distractor review:
an option receives almost no selections

Timing anomaly:
median time far outside expected band

Content concern:
unusually high student-report rate
```

These should be explicitly treated as **UniAdmissionPrep operational heuristics**, not universal psychometric standards. The thresholds should be recalibrated after the platform acquires meaningful response data.

### Marks validation needs four separate gates

This directly answers your question about **“validation of marks.”**

**Pattern validation:** Does the mock's question count, section structure, timing, marks and penalty policy agree with the approved university-pattern version?

**Question validation:** Does every item have exactly the intended answer/rubric and allowed score?

**Scoring-engine validation:** Does the backend calculate correct, wrong, skipped, partial, negative and section scores exactly according to the versioned policy?

**Statistical validation:** After students take the test, does the assessment behave sensibly as a whole?

Never allow:

```javascript
if (university === "BRAC") {
  marks = 1;
}
```

Instead:

```text
ScoringPolicy
├── id
├── version
├── pattern_version_id
├── correct_rule
├── incorrect_rule
├── skipped_rule
├── partial_credit_rule
├── section_weights
├── section_pass_rules
├── total_formula
├── rounding_rule
├── effective_from
└── evidence_reference
```

### Mock blueprint validation

Before a Mock Manager can publish a test, the system should perform:

```text
✓ Required number of sections
✓ Correct number of items per section
✓ Total marks match blueprint
✓ Duration matches blueprint
✓ Required topic coverage satisfied
✓ Difficulty distribution satisfied
✓ Every item production-approved
✓ No retired/quarantined items
✓ No duplicate concepts beyond allowed threshold
✓ Exposure limits respected
✓ Correct-answer distribution checked
✓ All solutions present
✓ Rights cleared
✓ Review policy configured
```

Publish should remain disabled until all **blocking** conditions pass.

### Immutable test snapshots

When a student starts an exam, freeze:

```text
AttemptSnapshot
├── test_version
├── pattern_version
├── scoring_policy_version
├── question_version_ids[]
├── student's question order
├── student's option orders
├── server_started_at
├── server_deadline_at
└── review_policy
```

If a question is edited tomorrow, yesterday's exam must not silently change.

### Incorrect answer discovered after publication

This will eventually happen.

Build for it now.

```text
Student reports question
        ↓
Issue created
        ↓
Academic triage
        ↓
Question quarantined if necessary
        ↓
Independent investigation
        ↓
Finding:
  - no issue
  - explanation issue
  - ambiguous question
  - incorrect key
        ↓
New question version created
        ↓
Affected attempts identified
        ↓
Score recalculation job
        ↓
ScoreRevision event saved
        ↓
Student notified if score changed
```

Never silently replace the student's historic score.

Store:

```text
Original Score: 68
Revised Score: 70
Reason: Q-ENG-193 key correction
Revision timestamp
Approved by
```

That is how UniAdmissionPrep becomes trustworthy.

## SaaS ecosystem, roles, and student experience

### The product domains

The complete ecosystem should eventually contain:

| Domain | Responsibility |
|---|---|
| **Identity & Access** | Accounts, sessions, roles, permissions, MFA |
| **University Intelligence** | Universities, programs, admission patterns, evidence |
| **Curriculum** | Subjects, topics, subtopics, objectives |
| **Question Studio** | Authoring, reviewing, validating, approving |
| **Question Bank** | Production content and statistics |
| **Mock Engine** | Blueprints, tests, sections, publishing |
| **Exam Engine** | Attempts, timers, answers, autosaving |
| **Scoring** | Deterministic marks, revisions, written marking |
| **Preparation** | Lessons/concepts |
| **Practice** | Topic/custom/weakness practice |
| **Performance** | Scores, mastery, trends |
| **Recommendation** | Next-best preparation action |
| **Study Planner** | Plans and tasks |
| **University Hub** | Target-specific preparation |
| **Admission Tracker** | Application/exam/result journey |
| **Commerce** | Plans, subscriptions, purchases, entitlements |
| **Notification** | Email/SMS/push/in-app |
| **Support** | Tickets and student issues |
| **Compliance & Audit** | Logs, privacy requests, admin activity |
| **SaaS Tenant Layer** | Future institution/coaching/B2B customers |

### Role architecture

Use **RBAC plus resource attributes**, rather than only role names. Authorization may need to consider tenant, subject, university, workflow state and ownership; OWASP's authorization guidance emphasizes designing authorization around the application's actual business context, while its multi-tenant guidance requires verified tenant context and isolation rather than trusting tenant identifiers from clients. citeturn22search1turn24view0

| Role | Main responsibility | Important restriction |
|---|---|---|
| **Student** | Prepare, practise, take mocks, review results, manage targets | Cannot access keys before permitted review |
| **University Pattern Researcher** | Collect official admission evidence | Cannot independently publish patterns |
| **Question Setter** | Draft assigned questions and solutions | Cannot approve own questions |
| **Subject Reviewer** | Check content, ambiguity, distractors, syllabus alignment | Cannot publish unapproved revisions |
| **Independent Validator** | Re-solve and verify answer/key | Should not simply rubber-stamp setter |
| **Language/Fairness Reviewer** | Wording, accessibility, avoid irrelevant bias | Cannot change mathematical key without reopening validation |
| **Academic Approver** | Give production approval | Approval creates auditable event |
| **Mock/Test Manager** | Assemble approved items into mocks | Cannot edit approved question content inside test |
| **Academic Director** | Own blueprints, quality rules, pattern approval | No routine infrastructure privileges |
| **Support Agent** | Resolve student/account issues | No unrestricted answer-bank access |
| **Finance Admin** | Payments, refunds, subscription issues | No academic-content permissions |
| **Operations Admin** | Announcements, scheduling, catalog operation | Limited access to sensitive content |
| **Security/Compliance Admin** | Access reviews, security incidents, privacy requests | Cannot author/approve assessment content by default |
| **Tenant Admin** | Future B2B organization's users/configuration | Strictly limited to that tenant |
| **Auditor** | Read-only audit/compliance visibility | Cannot mutate production |
| **Platform Super Admin** | Emergency platform control | Break-glass use, strong MFA, intensive logging |

### Separation of duties

Hard-code these principles into permission tests:

```text
Setter cannot approve own question.
Setter cannot change an approved question without a new version.

Reviewer cannot publish a mock.

Mock Manager can only select approved items.

Support cannot query answer keys for active secure mocks.

Finance cannot access student answer history unless needed for a documented support case.

Tenant A can never access Tenant B records.

Routine application servers do not operate using super-admin database credentials.

Super-admin actions are audited.

Role changes are audited.

Scoring changes are audited.

Pattern changes are audited.

Question approvals are audited.
```

OWASP identifies cross-tenant data leakage, broken tenant isolation, privilege escalation, tenant-context injection, cache/queue leakage and insecure onboarding/offboarding as major SaaS multi-tenant risks. citeturn24view0

### Student product journey

The original vision should remain, but the phases should interlock.

```text
LANDING
   ↓
Create Account
   ↓
Choose Target Universities / Programs
   ↓
Optional Diagnostic
   ↓
Student Home
   ↓
┌──────────────────────────────────────────┐
│              TODAY'S ACTION              │
│                                          │
│  Prepare → Practice → Mock → Review      │
│       ↑                       ↓          │
│       └──── Recommendation ← Analytics   │
└──────────────────────────────────────────┘
   ↓
Final Revision
   ↓
Admission Tracker
```

### Dashboard

The student home should prioritize one action.

```text
Hello, Araf 👋

BRAC CSE Target
18 days remaining

Preparation Readiness
72%

↑ 8 points during the last 14 days

Needs Attention
Grammar • Physics • Probability

Recommended Next
Physics: Circular Motion Focus Practice
12 questions • ~18 min

[ Continue Preparation ]

Upcoming
Full Mock 04
Friday • 90 min

This Week
126 questions
76% accuracy
3/4 study goals
```

Do not show six analytics charts merely because the data exists.

### Preparation Hub

```text
Prepare
├── English
│   ├── Grammar
│   ├── Vocabulary
│   ├── Reading
│   └── Composition
├── Mathematics
│   ├── Arithmetic
│   ├── Algebra
│   ├── Geometry
│   └── ...
├── Higher Mathematics
├── Physics
├── Chemistry
├── Biology
└── Analytical / Quantitative
```

Each topic:

```text
Understand
    ↓
Guided Example
    ↓
Practice
    ↓
Mastery Check
    ↓
Recommendation
```

### Practice Engine

Support:

```text
Quick Practice
Focus Practice
Weak Topic Practice
Mistake Practice
Saved Question Practice
University-focused Practice
Custom Practice
```

Eventually the engine can produce:

> “Your last two mocks show strong algebra performance but repeated mistakes in sentence agreement. Do 8 Grammar Focus questions next.”

### Mock Test Centre

Filters:

```text
Target University
Program Group
Full / Mini / Subject
Difficulty
New / Attempted
Free / Premium
```

Card:

```text
BRAC CSE Full Mock 04

University-focused simulation
Sections: English • Math • Higher Math & Physics

Estimated duration: ...
Attempts: 1
Your best: —

[ Start Mock ]
```

Use **“University-focused simulation”**, not **“Official BRAC Exam”**, unless you actually obtain authorization or official partnership.

### Exam screen

```text
┌──────────────────────────────────────────────┐
│ Full Mock 04                 42:18 remaining│
├──────────────────────────────────────────────┤
│ Section: Mathematics                         │
│ Question 08 of 15                            │
│                                              │
│ [QUESTION]                                   │
│                                              │
│ ○ A                                          │
│ ○ B                                          │
│ ○ C                                          │
│ ○ D                                          │
│                                              │
│ [Mark for Review]             [Save & Next]  │
├──────────────────────────────────────────────┤
│ 1  2  3  4  5  6  7  8 ...                 │
└──────────────────────────────────────────────┘
```

Correct answers must not exist in the question payload delivered to the browser during a locked mock.

### Results

Not:

> 32/50.

Instead:

```text
Mock Complete

Score
68 / 100

Accuracy
74%

Time Used
82m / 90m

Strongest Areas
Vocabulary
Algebra

Needs Attention
Sentence Correction
Geometry

Recommended Next
Geometry Revision Set
~20 minutes

[ Start Recommended Practice ]
```

Then:

```text
Section Breakdown
Question Review
Time Analysis
Mistake Categories
Comparison With Previous Attempts
Revision List
```

Do not show percentile/rank until you have a sufficiently meaningful cohort, and always show the cohort definition/sample size.

### Complete future ecosystem

The original roadmap belongs inside this architecture:

```text
Home
Prepare
Practice
Mock Tests
My Plan
Performance
Universities
Admission Tracker
Saved Questions
My Mistakes
Final Prep
AI Tutor
Profile
```

On mobile:

```text
Home | Prepare | Practice | Mocks | Profile
```

Hide unbuilt modules behind feature flags rather than filling the navigation with “Coming Soon.”

### SaaS business structure

Design B2C first while remaining tenant-ready.

```text
Platform Tenant
└── UniAdmissionPrep

Future:
Institution Tenant
├── Coaching Organization A
├── School/College B
└── Education Partner C
```

Do not make the MVP operationally complicated with full enterprise tenancy screens.

But put `tenant_id` on tenant-owned records and design authorization so future B2B isolation is possible. OWASP's current multi-tenant guidance specifically recommends verified tenant context, tenant-aware database/cache/queue/file boundaries and negative-path isolation testing. citeturn24view0

Potential commercial model:

| Plan | Possible entitlement |
|---|---|
| Free | Diagnostic, selected practice, limited free mocks |
| Premium | Full mock library, practice bank, analytics, mistake revision |
| University Pack | Dedicated preparation for selected university |
| All Access | Multiple university packs + planning/advanced analysis |
| Future B2B | Institution seats, dashboards, custom assessments |

The student should experience useful free value before the paywall.

## Technical architecture, data model, and security

### Recommended architecture

For the first production version, I recommend a **modular monolith**, not microservices.

```text
                    CDN / WAF
                        │
                        ▼
                 Web Application
                    Next.js
                        │
                        ▼
                 Application API
          ┌─────────────┼──────────────┐
          │             │              │
     Auth Module   Assessment      Commerce
                   Modules          Module
          │             │              │
          └─────────────┼──────────────┘
                        ▼
                   PostgreSQL
                   /    |    \
                  /     |     \
             Redis    Queue   Object Storage
               │        │          │
          rate limit   jobs       media
          sessions     email      PDFs/images
          cache        analytics
```

A good reference stack for Codex/Claude is:

```text
Monorepo
├── apps/web        Next.js + TypeScript
├── apps/api        NestJS + TypeScript
├── apps/worker     Background jobs
├── packages/db     PostgreSQL schema / ORM
├── packages/auth   auth policy helpers
├── packages/ui     design system
├── packages/core   scoring/domain logic
└── packages/test   fixtures/testing helpers
```

The architectural recommendation is a product-engineering choice; the security baseline should be tested against a recognized verification framework such as OWASP ASVS, whose current project provides security requirements and a basis for testing web-application controls. citeturn22search2turn22search9

### Core database entities

| Domain | Core tables/entities |
|---|---|
| Identity | `users`, `profiles`, `sessions`, `authenticators` |
| Access | `roles`, `permissions`, `role_bindings`, `staff_scopes` |
| Tenancy | `tenants`, `tenant_memberships` |
| University | `universities`, `programs`, `intakes` |
| Research | `evidence_sources`, `admission_pattern_versions`, `pattern_sections` |
| Curriculum | `subjects`, `topics`, `subtopics`, `learning_objectives` |
| Questions | `questions`, `question_versions`, `options`, `solutions`, `question_media` |
| Rights | `content_sources`, `licenses`, `rights_reviews` |
| Workflow | `question_assignments`, `question_reviews`, `answer_validations`, `approvals` |
| Quality | `item_statistics`, `question_flags`, `question_reports` |
| Mock | `mock_templates`, `mock_versions`, `mock_sections`, `mock_items` |
| Scoring | `scoring_policies`, `rubrics` |
| Attempts | `attempts`, `attempt_questions`, `answers`, `attempt_events` |
| Scores | `scores`, `section_scores`, `score_events`, `score_revisions` |
| Practice | `practice_sessions`, `practice_answers` |
| Learning | `lessons`, `mastery_states` |
| Planning | `study_plans`, `study_tasks` |
| Analytics | `student_metrics`, `recommendations` |
| Admission | `student_targets`, `admission_tracker_items` |
| Commerce | `products`, `prices`, `subscriptions`, `orders`, `payments`, `entitlements` |
| Communication | `notifications`, `notification_preferences` |
| Support | `tickets`, `ticket_events` |
| Governance | `audit_logs`, `security_events`, `privacy_requests` |
| Product | `feature_flags` |

### Keep domain logic out of UI code

For example:

```text
ScoringService
  scoreObjectiveAnswer()
  scoreSection()
  scoreAttempt()
  rescoreAttempt()

BlueprintValidator
  validateQuestionCount()
  validateMarks()
  validateDuration()
  validateTopicCoverage()
  validateDifficultyMix()

AuthorizationService
  canReviewQuestion()
  canApproveQuestion()
  canReadAnswerKey()
  canPublishMock()

ReadinessService
  calculateComponents()
  explainReadiness()
```

This makes those rules testable.

### Answer-key security

This deserves special treatment.

During a mock:

```text
Browser receives:
question ID
stem
options
media
question navigation info

Browser DOES NOT receive:
correct answer
private validator notes
hidden solution
scoring secrets
```

Do not render the answer but hide it with CSS.

Do not ship it in JSON and assume students will not inspect developer tools.

The backend is authoritative.

After submission:

```text
if review_policy == IMMEDIATE:
    release explanation

if review_policy == AFTER_WINDOW:
    wait until release time

if review_policy == NEVER:
    do not expose protected content
```

### Authentication

Staff access should be materially stronger than student access.

Use an established authentication implementation/identity provider rather than inventing cryptographic authentication mechanisms.

Recommended baseline:

```text
Students
- verified email/phone depending product flow
- secure password or passwordless flow
- session management
- suspicious-login monitoring

Staff
- MFA mandatory
- session timeout
- re-authentication for sensitive actions
- role-scoped permissions

Super Admin
- phishing-resistant authentication where practical
- break-glass procedure
- very limited number of accounts
- security alerts
```

NIST's current Digital Identity Guidelines provide modern requirements and guidance for authentication and authenticator lifecycle management. citeturn21search1turn21search4

### Session/security controls

I recommend:

```text
HTTPS only
Secure cookies
HttpOnly cookies
SameSite policy
CSRF protection for cookie-authenticated state changes
server-derived user identity
server-derived tenant identity
rate limiting
login throttling
secure password reset
device/session revocation
content security policy
input validation
parameterized database access
signed object-storage URLs
central secret manager
secret rotation
```

OWASP specifically states that secure REST endpoints should use HTTPS, and its business-logic guidance warns applications not to trust editable request fields for identity, role or tenant context. citeturn22search16turn22search25

### Multi-tenant isolation

Even though B2C is the initial business, implement:

```text
verified tenant context
        ↓
authorization policy
        ↓
tenant-scoped repository/query
        ↓
database isolation defense
```

For PostgreSQL, row-level security can be used as additional defense in depth for classified tenant-owned tables. OWASP's current multi-tenant guidance explicitly discusses row-level isolation, avoiding RLS-bypassing request roles, re-establishing tenant context per transaction and testing cross-tenant denial paths. citeturn24view0

Every CI build should contain tests like:

```text
Tenant A student
GET Tenant B attempt
→ 404/403

Tenant A admin
GET Tenant B student
→ denied

Question Setter English scope
EDIT Physics item
→ denied

Reviewer
APPROVE own authored item
→ denied
```

### Exam reliability

An online exam cannot depend on the browser's clock.

Use:

```text
server_started_at
server_deadline_at
```

The browser displays a timer based on the server deadline.

Answers should:

```text
Select option
    ↓
Update local UI immediately
    ↓
Autosave to server
    ↓
Receive acknowledgement
    ↓
Show Saved status
```

Also maintain local recovery data for transient network failure where appropriate.

Important characteristics:

```text
Idempotent answer-saving
Idempotent final submission
Optimistic concurrency/version
Reconnect/resume
Server-authoritative deadline
Automatic submission after deadline
Immutable attempt snapshot
Background score processing with safe retry
```

### Anti-cheating philosophy

This is primarily an admission-preparation product, not a government high-stakes proctoring service.

Use proportionate controls:

```text
question pools
option randomization
question-order randomization where academically valid
exposure limits
rate limits
scheduled mock windows when useful
account sharing detection signals
test watermarking where appropriate
anomaly monitoring
```

Do not pretend browser-tab detection proves someone did not cheat.

Avoid invasive webcam/biometric proctoring unless there is a real business need, a strong legal basis, proper security and an explicit privacy review.

### Data protection and Bangladesh compliance

Bangladesh's legal environment has changed recently. The official Laws of Bangladesh page for the 2025 Personal Data Protection Ordinance now states that it was repealed by the **Personal Data Protection Act 2026, Act No. 63 of 2026**; Bangladesh also enacted the **Cyber Security Act 2026** on April 10, 2026. citeturn27search2turn26search2

Consequently, UniAdmissionPrep should not launch with a copied foreign privacy-policy template. Obtain Bangladesh legal review for the actual processing model, particularly because admission-prep users can include young students and because the application may process identity, academic, behavioral, payment and analytics data.

From a product perspective, implement:

```text
data minimization
purpose tagging
consent/notice records where applicable
privacy settings
data export workflow
correction workflow
account deletion workflow
retention schedules
administrative access logging
incident response
processor/vendor inventory
backup retention controls
production-data access approval
```

### Logging without leaking sensitive content

Audit:

```text
LOGIN_SUCCESS
LOGIN_FAILURE
ROLE_ASSIGNED
ROLE_REMOVED
QUESTION_SUBMITTED
QUESTION_APPROVED
QUESTION_KEY_CHANGED
PATTERN_APPROVED
MOCK_PUBLISHED
MOCK_UNPUBLISHED
SCORE_REVISED
PAYMENT_VALIDATED
REFUND_ISSUED
ADMIN_EXPORT
PRIVACY_REQUEST
SUPER_ADMIN_ACTION
```

Do **not** casually log:

```text
passwords
OTP values
access tokens
full card information
answer keys in general request logs
secret keys
sensitive personal data unnecessarily
```

Centralized secret lifecycle management and least-privilege access are consistent with OWASP's secrets-management guidance. citeturn24view2

### Payments

For a Bangladesh-first MVP, SSLCOMMERZ is one possible integration route. Its current developer documentation describes session creation, an IPN callback, and then server-side Order Validation; it specifically instructs merchants to validate the received transaction and requires TLS 1.2 or higher. citeturn21search3

The payment entitlement flow therefore must be:

```text
Student chooses plan
       ↓
Server creates pending order
       ↓
Gateway session created
       ↓
Student pays
       ↓
Gateway redirects browser
       ↓
DO NOT unlock premium solely from redirect
       ↓
IPN / server notification
       ↓
Server validates transaction with gateway
       ↓
Check:
transaction ID
merchant order
amount
currency
status
       ↓
Atomic transaction:
payment = PAID
entitlement = ACTIVE
       ↓
student gains access
```

Never let:

```text
/success?paid=true
```

grant a subscription.

Where card data is involved, design the integration to minimize UniAdmissionPrep's direct exposure to cardholder data. PCI SSC maintains PCI DSS for protecting payment data and currently identifies PCI DSS v4.0.1 as the limited revision of v4.0. citeturn21search2

### Backup and recovery

Define:

```text
automated database backups
point-in-time recovery
encrypted backups
restore tests
object-storage versioning where appropriate
disaster recovery runbook
recovery objectives
```

A backup you have never restored is not an adequately proven recovery mechanism.

### Secure-development gate

Before public paid launch:

```text
Threat model completed
OWASP ASVS checklist established
RBAC/ABAC authorization matrix tested
Cross-tenant tests passed
Answer-key leakage test passed
Dependency scan passed
Secret scan passed
SAST passed
Production headers reviewed
Payment reconciliation tested
Backup restore tested
Scoring unit tests passed
Rescore workflow tested
External penetration test completed
Incident-response runbook prepared
```

OWASP ASVS is specifically designed to provide a basis for testing technical application-security controls. citeturn22search9

## Operating model, roadmap, and quality metrics

### Your first team structure

You do not initially need fifteen full-time people. One qualified person can hold multiple compatible roles, but incompatible approvals should remain separate.

A practical early operation:

```text
Founder / Product Owner
        │
        ├── Academic Director
        │      ├── University Pattern Research
        │      ├── English Question Setter(s)
        │      ├── Math Question Setter(s)
        │      ├── Science Setter(s) as needed
        │      ├── Reviewer(s)
        │      └── Mock Manager
        │
        ├── Product / Engineering
        │      ├── Full-stack engineering
        │      ├── QA
        │      └── Security responsibility
        │
        └── Operations
               ├── Student Support
               ├── Content Operations
               └── Payment/Subscription Operations
```

For a small launch, the Academic Director can also be pattern approver, but the person who authors a particular question should still not be its final approver.

### Question setter hiring test

Before giving a setter production access, require them to complete a controlled assignment.

Example:

> Create 10 original admission-prep questions from this supplied blueprint.

Score them on:

| Dimension | Suggested evaluation |
|---|---:|
| Academic correctness | 30% |
| Quality of distractors | 15% |
| Alignment with objective | 15% |
| Explanation quality | 15% |
| Appropriate difficulty | 10% |
| Originality | 10% |
| Language/formatting | 5% |

Require a question-setter agreement covering originality, confidentiality, prohibited copying, content ownership/license arrangements, security obligations and use of AI. Exact contract language should be prepared with counsel because copyright ownership and assignment rules are legal matters, not merely product settings. WIPO notes that initial ownership and employer arrangements can vary by national law. citeturn26search3

### Content production target

Do not chase a giant number at launch.

I would rather launch:

**800 exceptionally reviewed questions across two target-university ecosystems**

than:

**10,000 weak, copied or unvalidated questions.**

A mature bank can grow through controlled batches.

Example internal production plan:

```text
Weekly question assignment
        ↓
Setter drafts
        ↓
48-hour review cycle
        ↓
Validator
        ↓
Approval
        ↓
Pilot release
        ↓
Monthly item-statistics review
```

### Blueprint before question writing

For each university/program, create a **Content Coverage Matrix**.

Example:

| Domain | Topic | Weight in prep bank | Easy | Medium | Hard | Minimum bank |
|---|---|---:|---:|---:|---:|---:|
| English | Grammar | 20% | 20% | 60% | 20% | 80 |
| English | Vocabulary | 20% | 25% | 55% | 20% | 80 |
| English | Reading | 25% | 20% | 60% | 20% | 100 |
| Math | Algebra | 20% | 20% | 60% | 20% | 100 |
| Math | Geometry | 15% | 20% | 60% | 20% | 80 |

Those percentages are your editorial strategy, **not claims about a university's real question distribution** unless the university publishes corresponding evidence.

### The product roadmap

**Foundation**

Before serious student marketing, build:

```text
University Evidence Registry
Pattern Versioning
Curriculum Taxonomy
Question Studio
Question Workflow
Role/Permission System
Rights Registry
Audit Logs
Scoring Engine
```

Without these, you are building a quiz website rather than a sustainable assessment SaaS.

**Mock MVP**

Launch:

```text
Landing
Authentication
Student Onboarding
Target University Selection
Dashboard
Mock Library
Exam Engine
MCQ Scoring
Essay response capture where needed
Result Page
Question Review
Basic Performance
Subscription / Entitlement
Admin
Question Studio
Mock Composer
Audit System
```

**Preparation**

Add:

```text
Prepare
Topic Lessons
Practice Engine
Saved Questions
My Mistakes
Weak Topics
Topic Mastery
University-specific Practice
```

**Personalization**

Add:

```text
Preparation Readiness
Study Plan
Next Best Action
Performance Trends
Adaptive Practice
Time-management insights
```

**Admission Operating System**

Add:

```text
University Hubs
Verified Admission Information
Admission Tracker
Deadline Reminders
University Comparison
Final Revision Mode
```

**AI Layer**

Only after the underlying content system is trusted:

```text
AI Explanation Assistant
AI Tutor
AI Question Draft Assistant
AI Study Planner
AI Mistake Classification
Adaptive Question Recommendations
AI Weekly Revision Summary
```

AI-generated question content must still go through the human assessment workflow. Modern assessment research likewise treats LLM generation as item **drafting**, not as a replacement for review, calibration and test assembly. citeturn25search5

### Preparation Readiness model

Do not initially claim machine-learning sophistication.

Start explainably.

For example:

```text
Preparation Readiness

Recent Mock Performance       40%
Topic Mastery                 25%
Practice Accuracy Trend       15%
Syllabus Coverage             10%
Consistency                   10%
```

This is a proposed UniAdmissionPrep model, not a validated university-admission prediction model.

Display components:

> **74% Preparation Ready**
>
> Mock performance: Strong  
> Topic coverage: Good  
> Grammar mastery: Needs attention  
> Study consistency: Improving

Do not display:

> “You have a 74% chance of getting into BRAC.”

Those are radically different claims.

### Content quality dashboard

Academic Director dashboard:

```text
Production questions
Questions waiting review
Average approval lead time
Post-publication correction rate
Student report rate
Questions with negative discrimination
Non-functioning distractors
High-exposure questions
Questions needing revalidation
Patterns nearing review date
```

### Core metrics

Student success:

```text
First mock completion
Mock completion rate
Weekly active preparers
Practice → mock conversion
Four-week retention
Weak-topic improvement
Repeat mock participation
```

Content integrity:

```text
First-pass approval rate
Correction rate after publication
Ambiguity-report rate
Question discrimination
Distractor functioning
Item exposure
Academic review turnaround
```

Business:

```text
Free → paid conversion
Revenue per paid student
Plan renewal
Refund rate
University pack demand
Payment failure/reconciliation rate
```

Security:

```text
Staff MFA coverage
Critical vulnerabilities open
Authorization regression failures
Suspicious admin activity
Cross-tenant test failures
Restore-test success
```

### The real-world fieldwork that should happen next

Web research can establish official documented patterns, but a high-quality product should separately validate student behavior and exam-preparation pain points.

For each initial university, conduct structured interviews with approximately:

```text
5–10 recent successful applicants
3–5 current applicants
2–3 experienced admission teachers/tutors
Admissions office contact where they will provide clarification
```

Ask recent applicants:

```text
How closely did official samples reflect the experience?
Which sections felt most time-pressured?
What resources did you actually use?
Where did you find practice questions?
Which information was hardest to verify?
What did coaching/mock platforms get wrong?
How did you decide you were ready?
What analysis would have changed your preparation?
```

Do **not** ask participants to reconstruct confidential/leaked current exam papers for publication.

Ask teachers:

```text
What topic taxonomy should we use?
What errors make a question academically invalid?
What makes a good distractor?
What difficulty mix is realistic for preparation?
How many independent checks should quantitative questions receive?
```

Then run a closed pilot:

```text
50–100 students
       ↓
Take 2–3 mocks
       ↓
Collect question flags
       ↓
Review difficulty
       ↓
Review discrimination
       ↓
Review timing
       ↓
Interview subset
       ↓
Revise content
       ↓
Public launch
```

That is the point where your question bank begins becoming a proprietary **validated dataset**, rather than simply a collection of authored MCQs.

### Founder-level non-negotiables

Before scaling, adopt these as company rules:

> **Never fabricate an official pattern.**

> **Never market an internally authored question as an official university question.**

> **Never publish AI-generated questions without human validation.**

> **Never allow a setter to self-approve.**

> **Never trust the browser for scoring.**

> **Never expose answer keys to active-test clients.**

> **Never overwrite historical test/question versions.**

> **Never silently alter a student's score.**

> **Never grant paid entitlement from a payment redirect alone.**

> **Never trust a client-provided role or tenant ID.**

> **Never make admission-probability claims from an internal readiness metric.**

Those rules are more valuable than dozens of additional features.

## Original seed question set

The following are **newly authored UniAdmissionPrep seed examples**. They are **not official BRAC, NSU, UIU, UAP or other university questions**, and they intentionally avoid reproducing the wording of university sample papers. The subject categories are informed by the types of content visible in official admission/sample materials. citeturn20search0turn20search12turn7search0turn8search0

| ID | Type | Original sample |
|---|---|---|
| UAP-ENG-001 | Grammar | Each of the applicants ___ required to bring a valid photo ID. **A)** are **B)** were **C)** is **D)** have |
| UAP-ENG-002 | Vocabulary | The committee considered the evidence too ___ to justify such a broad conclusion. **A)** abundant **B)** scant **C)** decisive **D)** rigid |
| UAP-MAT-001 | Algebra | If \(x+\frac1x=5\), where \(x\ne0\), find \(x^2+\frac1{x^2}\). **A)** 21 **B)** 23 **C)** 25 **D)** 27 |
| UAP-MAT-002 | Percentage | A product's price rises by 20% and is then reduced by 20% of the new price. Relative to the original price, the final price is: **A)** unchanged **B)** 4% lower **C)** 4% higher **D)** 8% lower |
| UAP-HM-001 | Calculus | Let \(f(x)=x^2e^x\). What is \(f'(0)\)? **A)** 0 **B)** 1 **C)** 2 **D)** \(e\) |
| UAP-PHY-001 | Physics | An object moves at constant speed along a circular path. Its instantaneous acceleration points: **A)** along its direction of motion **B)** away from the center **C)** toward the center **D)** vertically downward |
| UAP-CHEM-001 | Chemistry | Assuming complete dissociation, what is the approximate pH of a \(0.01\text{ M}\) HCl solution? **A)** 1 **B)** 2 **C)** 7 **D)** 12 |
| UAP-WRT-001 | Composition | **Write 180–200 words:** “Should universities value consistent academic performance more than a single exceptional result?” Present a clear position and support it with reasoning. |

**Validated answer key:**

```text
ENG-001 → C
Reason:
“Each” is singular; therefore “is required.”

ENG-002 → B
Reason:
“Scant” means insufficient or very limited, which matches
the relationship between weak evidence and an unsupported conclusion.

MAT-001 → B

(x + 1/x)² = x² + 2 + 1/x²

25 = x² + 2 + 1/x²

x² + 1/x² = 23


MAT-002 → B

Assume original = 100.
After +20% = 120.
20% reduction of 120 = 24.
Final = 96.
Therefore final price is 4% below original.


HM-001 → A

f'(x)
= 2xe^x + x²e^x
= e^x(2x + x²)

f'(0)
= 1 × 0
= 0


PHY-001 → C

Constant speed does not mean zero acceleration when
the velocity's direction is changing. Circular motion requires
centripetal acceleration toward the center.


CHEM-001 → B

For complete dissociation:
[H⁺] = 10⁻² M

pH = -log10(10⁻²) = 2
```

For the composition item, do not use an undefined “20 marks because it feels right.”

Create a rubric:

| Dimension | Example weight |
|---|---:|
| Position and task fulfillment | 25% |
| Reasoning and development | 25% |
| Organization/coherence | 20% |
| Grammar/sentence control | 20% |
| Vocabulary/word choice | 10% |

Store rubric versions separately. If a university's official structure provides a particular total, the mock can scale rubric results to that total; otherwise clearly describe it as a UniAdmissionPrep practice rubric.

The same question should also carry metadata:

```json
{
  "canonical_id": "UAP-MAT-001",
  "source_type": "ORIGINAL_IN_HOUSE",
  "rights_status": "OWNED_OR_CONTRACTUALLY_CLEARED",
  "subject": "Mathematics",
  "topic": "Algebra",
  "learning_objective": "Manipulate symmetric algebraic expressions",
  "question_type": "SINGLE_CHOICE",
  "intended_difficulty": "MEDIUM",
  "marks": 1,
  "target_time_seconds": 75,
  "correct_answer": "B",
  "review_status": "DRAFT",
  "university_targets": [],
  "official_question": false
}
```

Notice `university_targets` is empty initially. An academic reviewer—not the setter—should decide whether an item fits a particular university blueprint.

## Master build prompt for Codex / Claude

The prompt below is deliberately written so a coding agent understands both the **entire product vision** and what it should **actually build first**. This prevents the common mistake of trying to generate the entire future ecosystem in one giant uncontrolled code pass.

```text
MASTER BUILD PROMPT
PROJECT: UniAdmissionPrep
CATEGORY: Secure Multi-Tenant-Ready EdTech SaaS
MARKET: Bangladesh Private University Admission Preparation


ROLE

Act as the Principal Product Engineer, SaaS Architect, Security Engineer,
Assessment Platform Architect, Database Designer and Senior UX Engineer
for a production-grade product named UniAdmissionPrep.

You are not building a generic quiz website.

You are building the foundation of a complete private-university
admission preparation ecosystem for Bangladesh.

The long-term student journey is:

DISCOVER
→ CHOOSE TARGET UNIVERSITIES
→ DIAGNOSE
→ PREPARE
→ PRACTICE
→ TAKE MOCKS
→ REVIEW
→ ANALYZE
→ IMPROVE
→ FINAL REVISION
→ TRACK ADMISSION

The first commercial release will focus primarily on:

1. Secure authentication
2. University/program targeting
3. University admission-pattern management
4. Academic question authoring and governance
5. Question review and validation
6. Mock-test composition
7. Online examination
8. Deterministic scoring
9. Result analysis
10. Answer review
11. Student performance
12. Subscriptions/entitlements
13. Admin operations
14. Security and auditability

The architecture must make future preparation, practice, study plans,
adaptive recommendations, admission tracking and AI features possible
without requiring a full rewrite.


PRODUCT CONSTITUTION

UniAdmissionPrep is NOT affiliated with a university unless an actual
partnership explicitly says so.

Never label internally authored questions as:
- official questions
- leaked questions
- exact university questions

Use terms such as:
- University-focused Mock
- Pattern-based Practice
- UniAdmissionPrep Original
- Admission Preparation Simulation

A university's test pattern must NEVER be hardcoded globally.

Patterns can change:
- by university
- by program
- by intake
- by effective date
- over time

Every production pattern must therefore be versioned and linked to
evidence.

Every published question must have provenance.

Every published question must have a version.

Every scoring policy must have a version.

Every started attempt must create an immutable snapshot.

Historical attempts must remain reproducible even if questions,
patterns or scoring rules change later.


ARCHITECTURE STRATEGY

Start with a modular monolith.

Do not prematurely create a large microservice architecture.

Recommended reference structure:

apps/
  web/
  api/
  worker/

packages/
  db/
  core/
  auth/
  permissions/
  assessment/
  scoring/
  ui/
  validation/
  test-utils/

Suggested technology direction:

- TypeScript everywhere
- Next.js for web frontend
- NestJS or an equivalent structured TypeScript API
- PostgreSQL as primary relational database
- Redis for rate limiting, transient cache and appropriate job/session use
- S3-compatible object storage for question images/media
- background job queue for emails, analytics, score recalculations etc.
- production observability
- structured logging
- centralized secret management

If an existing repository already exists:
1. inspect it fully;
2. preserve working conventions where sensible;
3. document architectural conflicts;
4. migrate incrementally rather than blindly rewriting everything.

Do not invent custom cryptography.


TENANCY

The initial product is B2C under one platform tenant.

However, the design must support future B2B tenants such as:
- coaching organizations
- schools
- institutional partners

Create:

Tenant
TenantMembership

Use tenant_id on tenant-owned resources where appropriate.

All tenant-scoped requests must derive tenant context from an authenticated,
server-verified relationship.

Never trust tenant_id supplied by the client as authorization.

Design defense in depth so future PostgreSQL row-level security can protect
classified tenant-owned tables.

Create automated negative authorization tests proving Tenant A cannot
read or mutate Tenant B data.


ROLES

Implement explicit permissions rather than scattered role-name checks.

Initial roles:

STUDENT

UNIVERSITY_RESEARCHER
- creates evidence records
- proposes pattern versions
- cannot independently approve them

QUESTION_SETTER
- receives assignments
- creates question drafts
- edits own drafts
- submits questions
- cannot approve own content

SUBJECT_REVIEWER
- reviews academic correctness
- requests revision
- cannot silently edit approved history

ANSWER_VALIDATOR
- independently validates answer/key/solution
- especially important for Math, Physics, Chemistry and quantitative items

FAIRNESS_LANGUAGE_REVIEWER
- reviews wording
- checks clarity/accessibility
- reviews unnecessary bias

ACADEMIC_APPROVER
- approves items for pilot or production
- approval is auditable

MOCK_MANAGER
- creates mock blueprints/test forms
- can only select approved questions
- cannot modify an approved question inside a mock

ACADEMIC_DIRECTOR
- approves university patterns
- owns academic standards
- oversees question quality

SUPPORT_AGENT
- handles student support
- cannot freely inspect protected active-test answer keys

FINANCE_ADMIN
- handles payments/refunds/subscriptions
- receives no academic privileges by default

OPERATIONS_ADMIN
- manages catalog, communications and operations

SECURITY_COMPLIANCE_ADMIN
- manages security/compliance processes
- does not automatically receive academic authoring rights

AUDITOR
- read-only audit access

TENANT_ADMIN
- future B2B tenant administration
- strictly tenant-scoped

PLATFORM_SUPER_ADMIN
- break-glass administrative access
- extremely restricted
- MFA mandatory
- every sensitive action audited


SEPARATION OF DUTIES

Enforce these as domain rules and tests:

A setter cannot approve a question they authored.

A reviewer cannot bypass academic approval.

A Mock Manager cannot add DRAFT, QUARANTINED or RETIRED questions.

A mock cannot be published unless blueprint validation succeeds.

Finance Admin cannot access answer-bank secrets.

Support cannot access unreleased answer keys without a specially authorized
and audited escalation path.

Changing an approved question creates a new version.

Changing a scoring rule creates a new version.

Changing an approved university pattern creates a new version.

Never mutate historical test snapshots.


UNIVERSITY INTELLIGENCE DOMAIN

Create:

University
Program
ProgramGroup
AdmissionIntake
EvidenceSource
AdmissionPattern
AdmissionPatternVersion
PatternSection

AdmissionPatternVersion fields should include:

id
university_id
name
intake_id nullable
effective_from
effective_until nullable
status
evidence_confidence
researcher_id
approved_by
approved_at
last_verified_at
next_review_at
notes

EvidenceSource:

id
source_type
title
publisher
official_boolean
reference
observed_at
effective_date_if_known
snapshot_reference
hash_if_applicable
researcher_id
review_status
notes

PatternSection:

id
pattern_version_id
name
subject_id
order
question_type
question_count
marks_total
duration_seconds
wrong_answer_penalty
skip_score
calculator_policy
section_pass_rule
metadata

Do not assume all universities use:
- the same number of questions
- the same time
- the same subjects
- the same marks
- the same negative marking
- the same program structure


EVIDENCE POLICY

Evidence levels:

A:
current official university website/PDF/circular

B:
older official material still linked from current official information

C:
verified written communication from university

D:
third-party/unverified research lead

Only approved evidence may configure a production-facing pattern.

Tier D must never automatically become production truth.


CURRICULUM DOMAIN

Create:

Subject
Topic
Subtopic
LearningObjective

Relationships must allow:
Question
→ one primary learning objective
→ topic/subtopic
→ subject

Also allow questions to carry multiple tags where useful.

Do not encode university names directly into topics.


QUESTION SOURCE POLICY

source_type enum should support at least:

ORIGINAL_IN_HOUSE
LICENSED_PARTNER
OPEN_LICENSE
PUBLIC_DOMAIN
OFFICIAL_REFERENCE_ONLY
AI_ASSISTED_DRAFT
USER_SUBMISSION_QUARANTINED

Question source and rights information are mandatory.

An official university sample may be stored as research evidence,
but its questions must not automatically enter the publishable question bank.

AI_ASSISTED_DRAFT can NEVER be directly production-published.

It must pass the same human validation process as all other content.


QUESTION MODEL

Use canonical Question + immutable QuestionVersion architecture.

Question:
id
tenant_id
canonical_code
current_version_id
created_by
created_at
status

QuestionVersion should contain at least:

id
question_id
version_number
source_type
content_source_id
rights_status
copyright_owner
license_reference

subject_id
topic_id
subtopic_id
learning_objective_id

question_type
language

stem
passage_id
media metadata

options
correct_answer
accepted_answers

full_solution
student_explanation
shortcut
common_mistake

intended_difficulty
target_time_seconds

marks
wrong_answer_penalty
skip_score

calculator_policy

writer_id
review metadata
validation metadata
approval metadata

effective_from
effective_until

official_question_boolean = false by default

created_at

Never expose validator-only information through student APIs.


QUESTION TYPES

Design extensibly for:

SINGLE_CHOICE
MULTIPLE_CHOICE
NUMERIC
SHORT_TEXT
ESSAY
PASSAGE_SINGLE_CHOICE
IMAGE_BASED
DRAWING_UPLOAD future

MVP can prioritize SINGLE_CHOICE and ESSAY capture,
but schema must not assume MCQ forever.


QUESTION WORKFLOW

Implement state machine:

RESEARCH_BRIEF
DRAFT
SUBMITTED
AUTO_CHECK_FAILED
IN_REVIEW
REVISION_REQUIRED
ANSWER_VALIDATION
FAIRNESS_REVIEW
RIGHTS_REVIEW
APPROVAL_PENDING
APPROVED_FOR_PILOT
PILOTING
APPROVED_PRODUCTION
QUARANTINED
RETIRED
ARCHIVED

Every state transition must:
- authorize actor
- validate prerequisites
- append workflow event
- record timestamp
- record actor
- optionally record note

Do not implement workflow as arbitrary editable strings.


QUESTION ASSIGNMENT

Question Setter dashboard must support assignments.

QuestionAssignment fields:

setter
subject
topic
learning objective
target university pattern if applicable
number required
difficulty distribution
question type
target time
deadline
special instructions

A setter should write to an assessment blueprint,
not receive a vague instruction such as “create 50 questions.”


AUTOMATED QUESTION VALIDATION

Implement automated checks:

required metadata
at least required number of options
single-choice has one intended correct answer
no duplicate options
valid score values
solution required
learning objective required
media references resolve
math syntax renders
source/rights data complete
duplicate/near-duplicate fingerprints
workflow prerequisites

Create an extensible QuestionLintResult model.


DUPLICATE DETECTION

Implement:
- normalized text hash
- exact duplicate detection
- similarity/fingerprint abstraction

Do not automatically reject based solely on semantic similarity.

Similarity creates a review flag.


HUMAN VALIDATION

For quantitative items support independent-solver workflow.

The Answer Validator should be able to:
- see question
- independently enter answer
- enter reasoning
- compare after submission with setter key
- mark MATCH
- mark DISAGREEMENT
- request investigation

Do not optimize this process away.


QUESTION RIGHTS

Create ContentSource and RightsReview.

Rights statuses:

UNKNOWN
INTERNAL_ORIGINAL
LICENSED
OPEN_LICENSE_VERIFIED
PUBLIC_DOMAIN_VERIFIED
REFERENCE_ONLY
REJECTED

Only publishable rights statuses may reach production.

Keep enough metadata for legal/compliance audit.


MOCK BLUEPRINT

Create MockBlueprint.

It specifies constraints rather than directly being an exam.

Fields:

university
program group
pattern_version
name
sections

Per section:
required count
marks
duration
topic coverage
difficulty distribution
allowed question types
exposure limits
randomization policy

Before publishing a MockVersion, validate:

all items approved
all rights valid
correct count
correct total marks
correct section composition
no quarantined items
no invalid versions
required explanations available
difficulty/coverage constraints met
pattern rules met

Generate a machine-readable validation report.


MOCK MODEL

Mock
MockVersion
MockSection
MockItem

MockVersion must become immutable when published.

Editing a published mock creates a new version.


SCORING ENGINE

Scoring must be server-side and deterministic.

Create versioned ScoringPolicy.

Support:

correct points
wrong penalty
skip points
partial credit future
section weights
section pass rules
overall calculation
rounding rule
essay rubric
practice benchmark

Never hardcode a specific university formula in frontend components.

The scoring domain must have comprehensive unit tests.


ESSAY / CONSTRUCTED RESPONSE

Create:

Rubric
RubricVersion
RubricDimension
EssayMark
ModerationEvent

Do not use AI as final essay scorer in MVP.

Allow a human marker to score against rubric dimensions.

Future architecture may support AI assistance,
but human governance must remain possible.


ATTEMPT ENGINE

At exam start create immutable AttemptSnapshot containing:

student
mock_version
pattern_version
scoring_policy_version
question_version IDs
question order
option order
server start time
server deadline
review policy

Correct answers must NOT be returned to the browser during an active exam.

The browser receives only student-visible question content.


TIMER

Server time is authoritative.

Persist:

started_at
deadline_at
submitted_at

Client timer is display only.

Handle:
- reconnect
- refresh
- temporary offline state
- expired attempts
- automatic deadline submission


ANSWER SAVING

Implement reliable autosave.

Requirements:

idempotent writes
answer revision/version
saved_at
optimistic concurrency where appropriate
clear saving/saved/offline UI state

Client may use temporary local recovery state,
but server state remains authoritative.


FINAL SUBMISSION

Submission endpoint must be idempotent.

Calling submit twice must not create:
- duplicate scores
- duplicate payments
- duplicate attempt completion
- inconsistent answer states

Lock objective answers after valid final submission.


RESULTS

Create:

AttemptScore
SectionScore
ScoreEvent
ScoreRevision

Never overwrite original scoring history silently.

If a key is later corrected:
- quarantine/investigate item
- create new question version
- identify affected attempts
- run controlled rescore
- store old score
- store new score
- store reason
- store approver
- notify impacted student if policy requires


QUESTION REPORTING

Student review page should allow:

Wrong Answer Key
Ambiguous Question
Explanation Problem
Broken Image
Formatting Problem
Other

Create QuestionReport.

Academic staff dashboard should support triage.


ITEM STATISTICS

Collect:

attempt count
correct count
incorrect count
skip count
facility / proportion correct
median response time
response-time distribution
option/distractor selection distribution
report count
exposure count
discrimination metric when enough data exists

Do not calculate/display psychometric metrics irresponsibly from tiny samples.

Create sample-size fields and analysis status.


STUDENT EXPERIENCE

Desktop navigation:

Home
Prepare
Practice
Mock Tests
My Plan
Performance

Secondary:
Universities
Admission Tracker
Saved Questions
My Mistakes

Profile/Help at bottom.

For MVP, only expose completed modules.

Future features remain behind feature flags.


MOBILE NAVIGATION

Home
Prepare
Practice
Mocks
Profile

Do not merely shrink desktop layout.

Build exam navigation specifically for small screens.


ONBOARDING

Ask:

target universities
target programs where relevant
target intake
exam dates if known
academic background where genuinely useful
study time/preferences

Do not over-collect personal data.


DASHBOARD

The dashboard must answer:

“What should I do next?”

Future target state:

exam countdown
Preparation Readiness
today's recommended task
weak topics
next mock
performance trend

MVP may start simpler:

target universities
available mocks
latest score
recent performance
next recommended mock/practice action


PREPARE MODULE — FUTURE

Architecture must support:

Subject
→ Topic
→ Concept
→ Guided Example
→ Practice
→ Mastery

Do not need to fully build learning content in first release.


PRACTICE MODULE — FUTURE/NEXT PHASE

Support:

Quick Practice
Standard Practice
Focus Practice
Weak Topic Practice
Mistake Practice
Saved Question Practice
University Practice
Custom Practice


MY MISTAKES

Every incorrect practice/mock item may create
a revision relationship.

Allow student to:
- review
- retry
- save
- mark understood


PERFORMANCE

Eventually show:

overall preparation readiness
recent mock scores
subject performance
topic mastery
accuracy trend
time use
weak areas
improvement

Every insight should connect to a student action.


READINESS

Name:

Preparation Readiness

Never:
Admission Probability

Initial formula must be configurable.

Expose component explanations.

Never imply university endorsement or guaranteed admission.


STUDY PLAN — FUTURE

Student provides:

target exam date
study days
available daily time

Generate:

daily tasks
topic study
practice
mini mock
full mock
revision

Allow:
Complete
Skip
Move


UNIVERSITY HUB — FUTURE

Per university:

Overview
Verified Admission Information
Programs
Pattern
Prepare
Practice
Mock Tests
Student Progress

Every factual admission detail should display:
- verification status
- last verified date where appropriate


ADMISSION TRACKER — FUTURE

States:

INTERESTED
PREPARING
APPLICATION_OPEN
APPLIED
ADMIT_CARD
EXAM_SCHEDULED
RESULT
COMPLETED

Official dates must come from verified evidence/admin data.


FINAL REVISION — FUTURE

As exam date approaches:

weak topics
mistake bank
saved questions
quick revision
mini mock
full mock
exam strategy


AI — FUTURE

Possible future modules:

AI Tutor
AI Explanation Assistant
AI Study Planner
AI Question Draft Assistant
AI Mistake Analysis
Adaptive Practice
AI Weekly Summary

Critical rule:

AI may assist content creation but may not directly publish production
assessment questions.

AI-generated question drafts enter:
AI_ASSISTED_DRAFT
and must go through human workflow.


COMMERCE

Create:

Product
Price
Subscription
Order
Payment
Entitlement

Products may include:

FREE
PREMIUM
UNIVERSITY_PACK
ALL_ACCESS

Entitlement is the source of truth for feature access.

Do not scatter:
if user.isPremium
throughout UI.

Use entitlement checks.


PAYMENT SECURITY

If integrating SSLCOMMERZ or another gateway:

create order server-side
create gateway session server-side
receive IPN/webhook
validate transaction server-to-server
verify:
- transaction
- order
- amount
- currency
- successful status

Only after successful validation:
activate entitlement

Never grant premium solely because browser reaches success redirect.

Webhook/IPN handlers must be:
- authenticated/validated appropriately
- idempotent
- replay-safe at business level
- auditable


SECURITY BASELINE

Target OWASP ASVS-aligned engineering practices.

Mandatory principles:

HTTPS only

No secrets in repository

Central secret management

Least privilege

Staff MFA

Strong super-admin protection

No role or tenant trust from request body

Server-side object authorization on EVERY protected resource

Secure session management

Rate limiting

CSRF defense where relevant

Input validation

Parameterized database access

Output encoding

Secure file upload

Signed media access when private

Security headers

Audit logs

Dependency scanning

Secret scanning

Static analysis

Production error sanitization

Backups

Restore testing

Incident response

Authorization regression tests

Tenant isolation tests


ANSWER KEY PROTECTION

Treat answer keys as high-sensitivity application content.

During live exam:
- never send key to client
- never send hidden solution to client
- never embed answer in HTML
- never hide answer using CSS
- never expose answer through GraphQL overfetch/API debug endpoints

Create response DTOs specifically for student exam payloads.

Admin answer-key access must be authorized and auditable.


AUDIT

Use append-oriented AuditEvent.

Record:

actor
tenant
event type
resource type
resource id
timestamp
request correlation id
before/after summary where safe
reason where relevant

Critical events:

role changes
question approvals
answer-key revisions
pattern approvals
mock publishing
score revision
payment state changes
refund
admin export
privacy actions
super-admin operations


PRIVACY

Apply data minimization.

Create facilities for:

privacy notice version
consent/acknowledgment where needed
data export request
correction request
deletion request
retention policy
account closure

Do not unnecessarily collect sensitive information.


OBSERVABILITY

Implement:

structured application logs
security logs
metrics
error monitoring
job monitoring
payment reconciliation visibility
exam-save error visibility
database health
rate-limit visibility

Do not log:
passwords
OTP secrets
session tokens
full payment card data
private keys
answer keys in generic logs


ADMIN APPLICATION

Create staff navigation:

Overview

Academic
  Universities
  Evidence
  Admission Patterns
  Curriculum

Questions
  Assignments
  My Drafts
  Review Queue
  Validation Queue
  Approval Queue
  Production Bank
  Quarantined

Mocks
  Blueprints
  Draft Mocks
  Published Mocks

Students
  Support View

Commerce
  Orders
  Payments
  Subscriptions

Operations
  Notifications
  Feature Flags

Governance
  Audit Logs
  Security Events
  Privacy Requests

Settings
  Roles
  Permissions


QUESTION STUDIO UI

Question editor should include:

Source / provenance
Rights status

University relevance

Subject
Topic
Subtopic
Learning objective

Question type
Stem

Options

Correct answer

Worked solution

Student explanation

Common mistake

Shortcut

Intended difficulty

Target time

Marks / penalty

Media

Internal notes

Validation panel

Version history


REVIEW UI

Reviewer must see:

question
setter solution
metadata
pattern alignment
source/provenance
duplicate warnings
validation results
comments/history

Actions:

Approve Review
Request Revision
Reject
Escalate

Do not permit silent content modification without audit/version behavior.


ACADEMIC APPROVAL UI

Approver sees completion checklist:

SME Review          ✓
Answer Validation   ✓
Fairness Review     ✓
Rights Review       ✓
Automated Checks    ✓

Then:

Approve for Pilot
Approve Production when policy permits
Reject
Return for Revision


MOCK COMPOSER UI

Left:
Blueprint requirements

Center:
Selected questions

Right:
Validation status

Show:

Section completion
Topic distribution
Difficulty distribution
Answer-option distribution if useful
Exposure warnings
Missing requirements

Publish disabled while blocking violations exist.


STUDENT EXAM UI

Desktop:

top bar:
mock name
section
timer

main:
question
options

controls:
previous
mark for review
save & next

side/bottom:
question palette

states:
current
answered
unanswered
marked
answered + marked

Do not depend on color alone.


RESULT UI

Hero:
Score
Accuracy
Time Used

Sections:
Section Breakdown
Topic Analysis
Question Review
Time Analysis
Recommended Next Step

For MVP:
basic meaningful analysis is enough.

Do not fabricate cohort ranks.


EMPTY STATES

Example:

No Mock Attempts Yet

“Take your first mock to establish your starting point.”

CTA:
Take First Mock


DESIGN PERSONALITY

UniAdmissionPrep should feel:

Smart
Calm
Focused
Modern
Trustworthy
Premium
Youthful
Academically serious

Avoid:

childish gamification
excessive gradients
generic coaching-center design
unnecessary glass effects
dashboard clutter
fear-based messaging


VISUAL SYSTEM

Use:

light neutral background
white surfaces
strong typography
purple-family primary brand accent
high contrast body text
subtle border
restrained shadows
soft radius
clear progress states

Keep color tokens configurable.

Do not hardcode styling independently across screens.

Create reusable design tokens.


ACCESSIBILITY

Support:

keyboard navigation
visible focus states
semantic forms
screen-reader labels
sufficient contrast
touch-friendly controls
non-color-only exam states
responsive typography


RESPONSIVE DESIGN

First-class:

desktop
tablet
mobile

Especially test:

question answering
question palette
timer
essay input
result cards
mock library
admin question editor where feasible


QUALITY ASSURANCE

Create:

unit tests
integration tests
authorization tests
scoring tests
workflow tests
payment tests
exam deadline tests
rescore tests
tenant isolation tests
end-to-end student test flow
end-to-end question workflow

Critical automated examples:

setter_cannot_approve_own_question

reviewer_cannot_publish_draft_question

student_cannot_fetch_answer_key_before_release

student_cannot_fetch_another_students_attempt

tenant_a_cannot_fetch_tenant_b_data

expired_attempt_cannot_accept_late_answer

submit_is_idempotent

payment_callback_alone_does_not_grant_entitlement

validated_payment_grants_entitlement_once

published_mock_uses_immutable_question_versions

question_key_revision_does_not_mutate_historical_snapshot

score_revision_preserves_original_score


SEED DATA

Do NOT scrape or copy university questions into seeds.

Create newly authored demonstration questions only.

Every demo item must explicitly contain:

source_type = ORIGINAL_IN_HOUSE
official_question = false

Seed enough content to demonstrate:

English Grammar
Vocabulary
Reading
Mathematics
Higher Math
Physics
Chemistry
Essay

but do not imply official affiliation.


FEATURE FLAGS

Create feature flags for future modules:

PREPARE
PRACTICE
READINESS
STUDY_PLAN
ADMISSION_TRACKER
AI_TUTOR
AI_QUESTION_DRAFTING
B2B_TENANTS

Do not expose incomplete features publicly.


MVP PAGES

PUBLIC

/
 /universities
 /pricing
 /login
 /signup
 /legal/privacy
 /legal/terms

STUDENT

/app
/app/onboarding
/app/mocks
/app/mocks/:id
/app/exam/:attemptId
/app/results/:attemptId
/app/results/:attemptId/review
/app/performance
/app/profile
/app/subscription

STAFF

/admin
/admin/universities
/admin/evidence
/admin/patterns
/admin/curriculum

/admin/questions
/admin/questions/new
/admin/questions/:id
/admin/questions/review
/admin/questions/validation
/admin/questions/approval
/admin/questions/quarantined

/admin/mock-blueprints
/admin/mocks
/admin/mocks/:id

/admin/orders
/admin/subscriptions

/admin/audit
/admin/roles


DOMAIN DOCUMENTATION

Before large implementation, create:

docs/product-constitution.md
docs/architecture.md
docs/domain-model.md
docs/rbac-matrix.md
docs/question-governance.md
docs/university-evidence-policy.md
docs/scoring-engine.md
docs/exam-reliability.md
docs/security-model.md
docs/payment-flow.md
docs/privacy-data-map.md
docs/testing-strategy.md
docs/roadmap.md


IMPLEMENTATION ORDER

Do not attempt all long-term features simultaneously.

Build in this order:

STAGE A — FOUNDATION

Repository structure
Environment configuration
Database
Authentication
Tenant foundation
Role/permission engine
Audit infrastructure
Core design system

STAGE B — ACADEMIC CONFIGURATION

University
Program
Evidence Registry
Pattern Versioning
Curriculum taxonomy

STAGE C — QUESTION OPERATIONS

Question Studio
Question versions
Workflow
Assignment
Review
Validation
Approval
Rights metadata
Production bank

STAGE D — MOCK CREATION

Mock blueprints
Mock composer
Mock validation
Mock publishing/versioning

STAGE E — STUDENT EXAM

Onboarding
Mock library
Exam engine
Autosave
Timer
Submission
Objective scoring

STAGE F — RESULTS

Score
Section score
Question review
Basic analytics
Student question reports

STAGE G — COMMERCE

Products
Entitlements
Orders
Gateway
Server-side payment validation
Subscription UX

STAGE H — HARDENING

Authorization regression suite
Tenant isolation suite
Answer-key leakage tests
Threat modeling
Security headers
Rate limits
Backup/restore
Observability
Payment reconciliation
Performance testing

Only after this MVP is stable should implementation proceed toward:

Preparation
Practice
Mistake Bank
Topic Mastery
Readiness
Study Plan
Admission Tracker
AI


FIRST RESPONSE EXPECTED FROM YOU

Before generating hundreds of application files:

1. Inspect the repository if one exists.

2. Restate the product domain and architectural boundaries.

3. Produce the proposed directory structure.

4. Produce the core entity relationship model.

5. Produce the RBAC permission matrix.

6. Produce the question state machine.

7. Produce the university-pattern state machine.

8. Produce the attempt/scoring lifecycle.

9. Produce the security threat model.

10. Produce the MVP implementation sequence.

11. Identify assumptions that can safely be represented as configuration.

12. Do NOT invent university admission facts.

13. Mark external university data as seed/demo configuration until
    evidence records are entered by authorized staff.

14. Then implement STAGE A.

Do not build a disposable prototype.

Build a production-oriented foundation while keeping the codebase
simple enough for an early-stage SaaS team to operate.


FINAL PRODUCT PRINCIPLE

UniAdmissionPrep is not a question website.

It is an admission-preparation system whose most valuable assets become:

1. Verified university-pattern intelligence
2. Original governed question inventory
3. High-quality explanations
4. Student performance data
5. Item-performance data
6. Personalized preparation workflows
7. Trust

The core transformation is:

CONFUSED STUDENT
→ CLEAR TARGET
→ STRUCTURED PREPARATION
→ VALIDATED PRACTICE
→ REALISTIC MOCK
→ EXPLAINABLE RESULT
→ TARGETED IMPROVEMENT
→ ADMISSION READY

Every engineering, design, security and academic decision must support
that transformation.
```