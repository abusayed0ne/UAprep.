# Testing strategy

Testing follows risk, with fast unit tests for domain rules and database-backed integration tests for authorization, tenancy, idempotency, and immutability. End-to-end tests cover the governed question flow and student exam flow.

Release gates include typecheck/lint, unit/integration suites, migrations/schema validation, secret/dependency/static scanning, production build, and an authorization review for new endpoints.

Critical named scenarios:

- `setter_cannot_approve_own_question`
- `reviewer_cannot_publish_draft_question`
- `student_cannot_fetch_answer_key_before_release`
- `student_cannot_fetch_another_students_attempt`
- `tenant_a_cannot_fetch_tenant_b_data`
- `expired_attempt_cannot_accept_late_answer`
- `submit_is_idempotent`
- `payment_callback_alone_does_not_grant_entitlement`
- `validated_payment_grants_entitlement_once`
- `published_mock_uses_immutable_question_versions`
- `question_key_revision_does_not_mutate_historical_snapshot`
- `score_revision_preserves_original_score`

Factories default to fictional tenants and newly authored demo content with `ORIGINAL_IN_HOUSE` and `official_question=false`.
