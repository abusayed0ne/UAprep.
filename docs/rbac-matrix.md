# RBAC and resource-attribute matrix

`✓` is a candidate grant; ownership, tenant, subject/university scope, workflow state, and separation-of-duty checks still apply. Unlisted operations are denied.

| Role | Evidence | Pattern publish | Draft question | Review | Validate key | Approve question | Compose/publish mock | Take exam | Keys | Finance | Audit |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Student | view verified | — | — | — | — | — | — | ✓ | released own | own | own events |
| Pattern Researcher | create/edit | — | — | — | — | — | — | — | — | — | — |
| Question Setter | view | — | own | — | — | never own | — | — | own draft | — | — |
| Subject Reviewer | view | — | — | scoped | — | — | — | — | scoped | — | — |
| Independent Validator | view | — | — | — | scoped blind-first | — | — | — | after submit | — | — |
| Fairness Reviewer | view | — | — | scoped language | — | — | — | — | limited | — | — |
| Academic Approver | view | — | — | view | view | scoped, never own | — | — | scoped | — | — |
| Mock Manager | verified | — | — | — | — | — | approved only | — | selected approved | — | — |
| Academic Director | manage | ✓ | view | view | view | ✓ | ✓ | — | scoped | — | academic |
| Support Agent | verified | — | — | — | — | — | view catalog | — | never active | documented own scope | support |
| Finance Admin | — | — | — | — | — | — | — | — | — | ✓ | commerce |
| Security/Compliance | metadata | — | — | — | — | — | — | — | break-glass only | privacy | ✓ |
| Auditor | read | read | read | read | read | read | read | metadata | governed read | read | read-only |
| Platform Super Admin | break-glass | break-glass | break-glass | break-glass | break-glass | break-glass | break-glass | — | break-glass | break-glass | ✓ |

Mandatory policy tests include cross-tenant denial, setter self-approval denial, support active-key denial, mock-manager unapproved-item denial, and audited role/scoring/pattern changes.
