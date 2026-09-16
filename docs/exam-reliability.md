# Exam reliability

- Start is idempotent and atomically creates one immutable snapshot.
- Store `started_at`, `deadline_at`, and `submitted_at` in server time; the browser timer is display only.
- Answer saves use a client operation ID plus monotonically increasing revision, allowing safe retries and optimistic concurrency.
- Client recovery state may queue temporary offline changes, but clearly shows offline/saving/saved and reconciles with authoritative server revisions.
- Deadline jobs are a backstop; every read/write/submit request also enforces the deadline.
- Submit is idempotent and locks objective answers exactly once. Score creation has a database uniqueness guard.
- Reconnect returns the current authoritative answer revisions and deadline, never keys.
- Published mock/question/pattern/scoring versions referenced by snapshots cannot be mutated or deleted.

Operational metrics cover save latency/failure, deadline drift, stuck submissions, scoring failure, and worker backlog. Restore exercises must prove historical snapshots remain reproducible.
