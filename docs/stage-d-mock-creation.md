# Stage D — Mock creation

Stage D implements constraint-driven mock composition. A blueprint describes requirements; it is not itself a student exam.

## Implemented

- Tenant-scoped `MockBlueprint` linked to one published admission-pattern version.
- Section rules for required count, total marks, duration, subject, topic minimums, difficulty distribution, allowed question types, exposure limit, randomization policy, and explanation requirement.
- Stable `Mock` roots and numbered `MockVersion` records. Published versions have no mutation endpoint; changes create another version.
- Sections and items pin exact `QuestionVersion` IDs.
- Machine-readable `MockValidationReport` with input hash, validator, timestamp, validity, and blocking issue list.
- Atomic publication guarded by a fresh validation and compare-and-set status update.
- Tenant ownership checks for patterns, subjects, scoring policies, and question versions.
- Audit events for blueprint creation, draft/version creation, and publication.

## Blocking validation

Publication is blocked for wrong question counts or marks, missing sections, duplicate question versions, non-production or quarantined questions, invalid rights, unsupported question types, missing explanations, exceeded exposure limits, missing topic coverage, incorrect difficulty distribution, or disagreement with the selected pattern's count/marks/duration.

The validator never silently fills gaps or swaps questions. It reports constraints for the mock composer to resolve.

## API

| Method/path | Purpose |
|---|---|
| `POST /mocks/blueprints` | Create blueprint |
| `POST /mocks` | Create mock root and version 1 |
| `POST /mocks/:id/versions` | Create another immutable version |
| `GET /mocks/:id` | Staff composition view |
| `POST /mocks/:id/validate` | Generate validation report |
| `POST /mocks/:id/publish` | Freshly validate and atomically publish |

Creating mocks currently requires an already-published `ScoringPolicyVersion`. The policy authoring/scoring implementation belongs to Stage E and remains recorded in the final setup/sequence backlog.
