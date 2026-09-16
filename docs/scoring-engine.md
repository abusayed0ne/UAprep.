# Attempt and scoring lifecycle

```mermaid
stateDiagram-v2
  [*] --> CREATED
  CREATED --> IN_PROGRESS: server creates immutable snapshot
  IN_PROGRESS --> IN_PROGRESS: idempotent answer save
  IN_PROGRESS --> SUBMISSION_PENDING: submit or deadline
  SUBMISSION_PENDING --> SUBMITTED: answers locked once
  SUBMITTED --> SCORING
  SCORING --> AWAITING_MANUAL_MARKING: constructed response
  SCORING --> SCORED: objective only
  AWAITING_MANUAL_MARKING --> SCORED: rubric marks complete
  SCORED --> RELEASED: release policy allows
  RELEASED --> RESCORE_PENDING: approved correction
  RESCORE_PENDING --> RELEASED: score revision appended
  CREATED --> EXPIRED
  IN_PROGRESS --> EXPIRED: terminal policy failure
```

The snapshot fixes mock, pattern and scoring-policy versions; question version IDs; question and option order; server start/deadline; and review policy. Server time is authoritative. Correct answers and hidden explanations are excluded from active-exam DTOs.

Scoring is deterministic and decimal-safe. Policy configuration supports correct/wrong/skip values, section weights and pass rules, rounding, future partial credit, essay rubric, and practice benchmark. Original `AttemptScore` is immutable; a controlled rescore appends `ScoreRevision` and `ScoreEvent` with old/new values, reason, approver, and affected item versions.
