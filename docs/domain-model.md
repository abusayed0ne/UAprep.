# Core entity relationship model

```mermaid
erDiagram
  TENANT ||--o{ TENANT_MEMBERSHIP : has
  USER ||--o{ TENANT_MEMBERSHIP : joins
  USER ||--o{ ROLE_BINDING : receives
  ROLE ||--o{ ROLE_BINDING : grants
  UNIVERSITY ||--o{ PROGRAM : offers
  UNIVERSITY ||--o{ EVIDENCE_SOURCE : supported_by
  UNIVERSITY ||--o{ ADMISSION_PATTERN : defines
  ADMISSION_PATTERN ||--o{ ADMISSION_PATTERN_VERSION : versions
  ADMISSION_PATTERN_VERSION ||--o{ PATTERN_SECTION : contains
  ADMISSION_PATTERN_VERSION }o--o{ PROGRAM : applies_to
  SUBJECT ||--o{ TOPIC : contains
  TOPIC ||--o{ LEARNING_OBJECTIVE : contains
  QUESTION ||--o{ QUESTION_VERSION : versions
  QUESTION_VERSION }o--|| LEARNING_OBJECTIVE : assesses
  QUESTION_VERSION ||--o{ QUESTION_OPTION : offers
  QUESTION ||--o{ QUESTION_REVIEW : reviewed
  QUESTION ||--o{ ANSWER_VALIDATION : validated
  QUESTION ||--o{ RIGHTS_REVIEW : rights_checked
  MOCK ||--o{ MOCK_VERSION : versions
  MOCK_VERSION ||--o{ MOCK_SECTION : contains
  MOCK_SECTION ||--o{ MOCK_ITEM : fixes
  MOCK_ITEM }o--|| QUESTION_VERSION : references
  USER ||--o{ ATTEMPT : starts
  ATTEMPT ||--|| ATTEMPT_SNAPSHOT : freezes
  ATTEMPT ||--o{ ATTEMPT_ANSWER : saves
  ATTEMPT ||--o| ATTEMPT_SCORE : produces
  ATTEMPT_SCORE ||--o{ SCORE_REVISION : revised_by
  TENANT ||--o{ AUDIT_EVENT : records
```

All tenant-owned aggregates carry `tenant_id`. Tenant context is derived from authenticated membership, not client input. Stable roots (`Question`, `Mock`, `AdmissionPattern`) identify concepts; immutable versions reproduce what was published or presented.
