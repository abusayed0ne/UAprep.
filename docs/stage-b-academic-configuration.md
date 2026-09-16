# Stage B — Academic configuration

Implemented as a tenant-scoped API module under `/v1/academic`. Every protected route requires a server-established `RequestContext`; controllers do not accept a tenant ID from request bodies.

## Capabilities

- University catalog with demo/verified-data distinction and university-owned programs.
- Evidence sources with A–D tiers, provenance references, snapshot hashes, dates, confidence/status, researcher/verifier, review date, and atomic claims.
- Claims may be scoped to a program and intake and have their own effective range and approval state.
- Admission pattern roots and immutable numbered versions linked to evidence, applicable programs, and configurable sections.
- Curriculum taxonomy: Subject → Topic → Subtopic → Learning Objective.
- Permission-gated create/approve/publish operations and append-oriented audit events for critical changes.

## Publication gates

A pattern cannot publish unless it has a valid effective start, at least one program and section, and approved Tier A/B/C evidence. Tier D never authorizes production. Evidence due for review, invalid section mechanics, invalid effective ranges, and overlapping published ranges for the same university/program block publication.

No university admission facts or section values are seeded or hardcoded.

## Routes

| Method/path | Permission |
|---|---|
| `GET /academic/universities` | `university:read` |
| `POST /academic/universities` | `university:manage` |
| `POST /academic/universities/:id/programs` | `university:manage` |
| `POST /academic/universities/:id/evidence` | `evidence:create` |
| `PATCH /academic/evidence/:id/approve` | `evidence:approve` |
| `POST /academic/subjects` | `curriculum:manage` |
| `POST /academic/subjects/:id/topics` | `curriculum:manage` |
| `POST /academic/topics/:id/subtopics` | `curriculum:manage` |
| `POST /academic/topics/:id/objectives` | `curriculum:manage` |
| `POST /academic/universities/:id/patterns` | `pattern:create` |
| `POST /academic/patterns/:id/versions` | `pattern:create` |
| `PATCH /academic/pattern-versions/:id/transition` | `pattern:approve` |

Pattern publication is restricted by the current role grants to Academic Director. A future split endpoint can apply `pattern:publish` independently when workflow staffing requires it.

## Deployment

The initial PostgreSQL migration is under `packages/db/prisma/migrations`. Apply it only after configuring a real `DATABASE_URL` and backup/rollback procedure. Authentication/session middleware must populate the verified request context before these routes are exposed; absent context fails closed with HTTP 401.
