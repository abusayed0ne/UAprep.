# Stage C — Question operations

Stage C implements the governed question supply chain rather than a generic question CRUD API.

## Implemented

- Structured setter assignments with curriculum/pattern target, requested count, difficulty mix, type, target time, deadline, and instructions.
- Auditable content sources and rights metadata.
- Stable `Question` roots with immutable numbered `QuestionVersion` records and a current-version pointer.
- Options, solutions, student explanations, common mistakes, shortcuts, provenance, rights, timing, marks, and normalized SHA-256 duplicate fingerprints.
- Automated lint results with blocking errors and review warnings.
- Exact duplicate blocking; similarity remains a future review flag and never auto-rejects.
- SME review, blind-first independent answer validation, fairness review, rights review, academic approval checklists, workflow events, quarantine, retirement, and production-bank query.
- Self-review, self-validation, and self-approval protection.
- Tenant/resource ownership validation and permission-gated API routes under `/v1/questions`.

## Workflow gates

`DRAFT → SUBMITTED → IN_REVIEW → ANSWER_VALIDATION → FAIRNESS_REVIEW → RIGHTS_REVIEW → APPROVAL_PENDING → APPROVED_FOR_PILOT → PILOTING → APPROVED_PRODUCTION`

Blocking lint prevents review entry. An approved SME review is required before answer validation can complete. A matching independent answer is required before fairness review. Approved fairness and publishable rights reviews are required before approval. Pilot and production states require their respective checklist approvals. Published content is revised only by creating a new version.

## Automated lint

Implemented checks include missing stem/objective/solution/explanation/provenance, invalid marks or penalty, non-publishable rights, missing or duplicate options, invalid answer-key cardinality, unresolved media, and suspicious answer-length cues.

No copied or university-official questions were added.
