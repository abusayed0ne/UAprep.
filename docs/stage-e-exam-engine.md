# Stage E — Student exam engine

Implemented: student targets, published mock library, versioned scoring-policy authoring, idempotent attempt start, immutable randomized snapshots, server deadline, key-free exam DTO, idempotent revisioned autosave, ownership checks, idempotent submit, and deterministic server-side objective scoring with section scores.

The client receives stems and option content only during an attempt. Keys, solutions, provenance, and hidden explanations remain server-side. Server time controls expiry; client timers are presentation only.
