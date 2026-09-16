# Architecture

## Decision

Use a TypeScript modular monolith. A Next.js web app, NestJS API, and worker deploy separately but share framework-independent domain packages and one PostgreSQL system of record. Redis is transient infrastructure; object storage owns media. This keeps transactions and operations simple while preserving module boundaries.

```text
Browser -> Web -> API -> application modules -> PostgreSQL
                  |             |
                  |             +-> outbox -> Worker -> email/analytics
                  +-> Redis (rate limits, short-lived coordination)
                  +-> object storage (signed media access)
```

## Dependency rule

Apps may depend on packages. Core packages must not depend on apps or UI. Controllers validate transport input then invoke application services. Domain rules—including scoring, workflow transitions, blueprint validation, and authorization policy—do not live in React components or controllers.

## Modules

Identity & access; tenancy; university intelligence; curriculum; question studio/bank; mocks; attempts; scoring; commerce/entitlements; governance/audit. Future preparation, practice, performance, planning, tracker, and AI modules integrate through IDs/events rather than reaching into another module's tables ad hoc.

## Reliability boundaries

Database transactions protect local invariants. An outbox will protect asynchronous delivery. Published/version records and attempt snapshots are immutable. Time comes from the server. API responses use purpose-specific DTOs so active exam payloads never serialize keys or solutions.
