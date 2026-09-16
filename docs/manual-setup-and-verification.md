# Manual setup and beginning-to-end verification

Run this only after all implementation stages are merged and reviewed. Record operator, timestamp, environment, evidence link, and pass/fail for every item. Never use real university facts or payment credentials in local/demo environments.

## 1. Repository and supply chain

1. Create the Git repository and protect `main` with required CI review.
2. Install Node 22 and pnpm 10.15.1.
3. Run `pnpm install --frozen-lockfile`, `pnpm audit --audit-level high`, secret scanning, and dependency review.
4. Review every migration before applying it. Confirm no production database already contains an incompatible baseline.

## 2. Infrastructure

1. Provision isolated development, staging, and production PostgreSQL databases.
2. Provision Redis with authentication/TLS for distributed rate limits, session coordination, and jobs.
3. Provision private S3-compatible storage, signed URL policy, file-size/type limits, and malware scanning.
4. Configure DNS, CDN/WAF, TLS/HSTS, network allowlists, and separate least-privilege service identities.
5. Configure managed secrets; never copy production secrets into `.env` or CI logs.

## 3. Database

1. Back up the target and prove restore to a separate instance.
2. Set `DATABASE_URL`, run `pnpm db:validate`, inspect the SQL, then apply with the approved deployment migration command.
3. Verify unique/idempotency/foreign-key constraints and tenant indexes.
4. Create the platform tenant and first break-glass administrator through a one-time audited bootstrap procedure.

## 4. Authentication and authorization

1. Connect the selected identity provider/session middleware and populate `RequestContext` only from a verified session and tenant membership.
2. Enable secure, HttpOnly, SameSite cookies, rotation/revocation, CSRF defense, email verification, and staff MFA.
3. Exercise every role in the RBAC matrix. Verify self-approval and cross-tenant attempts fail.
4. Test break-glass expiry, reason capture, alerts, and audit logs.

## 5. Academic data

1. Enter curriculum subjects/topics/objectives without copying protected questions.
2. Enter university evidence with snapshot/hash, tier, observed/effective dates, researcher, verifier, and review date.
3. Independently approve evidence, pattern versions, and applicability. Confirm Tier D cannot authorize publication.
4. Display verification status and date wherever factual admission information is shown.

## 6. Question operations

1. Create an original assignment brief and content source with `INTERNAL_ORIGINAL` rights.
2. Complete setter → lint → SME → blind validation → fairness → rights → academic approval → pilot → production.
3. Verify the setter cannot review, validate, or approve their item.
4. Correct a demo draft by creating a new version; confirm old versions remain unchanged.
5. Quarantine an item and verify mock validation blocks it.

## 7. Mock and scoring

1. Create and review a scoring policy with correct/wrong/skip, rounding, section, and review-release rules.
2. Create a blueprint linked to an approved pattern.
3. Compose a mock only from production question versions.
4. Deliberately violate each constraint and retain the generated reports.
5. Publish a valid version and prove it cannot be edited; create version 2 for changes.

## 8. Student exam

1. Create a student target, list mocks, and start an attempt with a unique start key.
2. Inspect browser/network/cache: no key, solution, hidden explanation, or provenance may appear.
3. Test refresh, reconnect, duplicate start, duplicate save, revision conflict, offline recovery UI, and server deadline.
4. Submit twice and verify one score. Attempt a late save and another student's attempt ID; both must fail.
5. Recalculate the score independently from the pinned policy and versions.

## 9. Results and academic operations

1. Verify total, section scores, selected answers, released keys/explanations, and performance history.
2. Submit every question-report category and triage it with academic staff.
3. Run controlled key-correction/rescore procedure: preserve old score, append revision/reason/approver, and identify affected students.
4. Configure minimum sample sizes before displaying facility/discrimination statistics.

## 10. Commerce

1. Implement the selected gateway adapter's server-to-server verification and signature/IPN rules.
2. Test wrong amount, currency, order, failure status, replay, duplicate callback, delayed callback, refund, and reconciliation.
3. Confirm browser redirect alone never grants entitlement and a validated transaction grants it exactly once.
4. Verify logs contain no card data, gateway secret, or full sensitive payload.

## 11. Operations and resilience

1. Connect structured logs, security events, metrics, traces, error monitoring, job monitoring, payment reconciliation, and save-failure dashboards.
2. Apply Redis-backed rate limits by route/risk and test WAF rules without blocking legitimate exams.
3. Run load tests for exam start/save/submit and failure tests for database, Redis, worker, and network interruptions.
4. Run backup/restore and regional/provider recovery exercises. Record RPO/RTO evidence.
5. Complete incident-response tabletop, privacy export/correction/deletion, retention, and account-closure exercises.

## 12. Release decision

Release only when all critical scenarios in `docs/testing-strategy.md` pass in staging, high/critical security findings are closed, legal/privacy/IP review is recorded, operational owners are assigned, and rollback has been rehearsed. Any exception requires owner, risk, expiry, and written approval.
