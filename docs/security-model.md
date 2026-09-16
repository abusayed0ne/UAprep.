# Security threat model

| Asset / threat | Primary controls | Verification |
|---|---|---|
| Answer keys: API/GraphQL overfetch, logs, cache | purpose-built DTOs; field allowlists; no generic serialization; redaction; staff scope + audit | pre-release leakage tests |
| Tenant data: IDOR/context injection | server-derived tenant context; membership check; tenant predicates; database constraints | cross-tenant integration suite |
| Roles: privilege escalation/self-approval | deny-by-default permissions plus resource attributes and separation of duties | authorization regression suite |
| Sessions: theft/fixation/CSRF | opaque rotated secure HttpOnly SameSite cookies; CSRF defenses; revocation; staff MFA | session/security tests |
| Exam integrity: client timer/key manipulation | server deadline/scoring; immutable snapshot; never ship keys | deadline and payload tests |
| Autosave/submission: replay/race | idempotency keys; revisions; transactions; unique constraints | concurrency tests |
| Payments: forged redirect/webhook replay | server-created order; gateway verification; amount/currency/order checks; idempotent state machine | payment tests/reconciliation |
| Media: malicious/private file access | type/size validation; malware scanning; random keys; signed URLs | upload/access tests |
| Supply chain/secrets | lockfile; scanning; least privilege; secret manager; no secrets in repo | CI gates |
| Audit tampering/sensitive logging | append-oriented events; restricted access; correlation IDs; key/token redaction | audit tests/reviews |

Baseline: OWASP ASVS-aligned controls, HTTPS/HSTS, CSP and security headers, rate limits, input/schema validation, parameterized ORM access, output encoding, sanitized production errors, backups/restore tests, monitoring and incident response. Super-admin is break-glass with strong MFA and intensive audit.
