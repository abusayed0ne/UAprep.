# Question governance and state machine

```mermaid
stateDiagram-v2
  [*] --> RESEARCH_BRIEF
  RESEARCH_BRIEF --> DRAFT
  DRAFT --> SUBMITTED
  SUBMITTED --> AUTO_CHECK_FAILED: blocking lint
  AUTO_CHECK_FAILED --> DRAFT
  SUBMITTED --> IN_REVIEW: lint passes
  IN_REVIEW --> REVISION_REQUIRED
  REVISION_REQUIRED --> DRAFT
  IN_REVIEW --> ANSWER_VALIDATION
  ANSWER_VALIDATION --> REVISION_REQUIRED: disagreement
  ANSWER_VALIDATION --> FAIRNESS_REVIEW: match
  FAIRNESS_REVIEW --> REVISION_REQUIRED
  FAIRNESS_REVIEW --> RIGHTS_REVIEW
  RIGHTS_REVIEW --> REVISION_REQUIRED: not publishable
  RIGHTS_REVIEW --> APPROVAL_PENDING
  APPROVAL_PENDING --> APPROVED_FOR_PILOT
  APPROVED_FOR_PILOT --> PILOTING
  PILOTING --> APPROVED_PRODUCTION: quality threshold met
  PILOTING --> QUARANTINED
  APPROVED_PRODUCTION --> QUARANTINED: issue detected
  QUARANTINED --> RETIRED
  APPROVED_PRODUCTION --> RETIRED
  RETIRED --> ARCHIVED
```

Transitions are explicit commands with actor, tenant, reason, source version, target version, and audit event. Setters cannot approve their work. Quantitative validation is blind-first where practical. Only internal-original, licensed, verified-open-license, or verified-public-domain rights may reach production. Semantic similarity flags review; it does not automatically reject. Published versions are never edited in place.

Automated lint covers required metadata, valid/unique options, key cardinality, scores, solution/objective, media and math rendering, rights/provenance, duplicates, and unresolved comments. `QuestionLintResult` is extensible and separates blocking errors from warnings.
