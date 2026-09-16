# UniAdmissionPrep

Production-oriented modular-monolith foundation for a governed Bangladesh private-university admission preparation platform.

## Boundaries

- `apps/web`: student, public, and staff web shells
- `apps/api`: HTTP boundary; authentication, authorization, and module orchestration
- `apps/worker`: background jobs; never a second source of domain rules
- `packages/core`: framework-independent domain types and state machines
- `packages/auth`: identity/session contracts
- `packages/permissions`: deny-by-default RBAC + resource attributes
- `packages/db`: PostgreSQL schema and database client
- `packages/ui`: shared design tokens/components
- `packages/test-utils`: safe test builders

University admission facts are not embedded in code or authoritative seeds. Authorized staff must enter evidence, approve it, and then publish a versioned pattern.

## Start locally

1. Copy `.env.example` to `.env` and replace all secrets.
2. Start PostgreSQL and Redis: `docker compose up -d`.
3. Install: `pnpm install`.
4. Validate schema: `pnpm db:validate`.
5. Run checks: `pnpm typecheck && pnpm test && pnpm build`.
6. Develop: `pnpm dev`.

See `docs/` for domain, security, governance, and delivery decisions.
