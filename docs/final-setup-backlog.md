# Final setup backlog

Per delivery decision, environment and external-service setup is deferred until the feature stages are complete. Code-level validation continues at every stage.

## Pending final setup

- Create production/staging PostgreSQL instances and apply the consolidated initial migration.
- Configure Redis and object storage.
- Select and wire the production identity provider/session middleware so it establishes verified `RequestContext`.
- Configure staff MFA and break-glass super-admin operations.
- Create secrets in a managed secret store and replace `.env.example` values.
- Configure CDN/WAF, DNS, TLS, CSP reporting, rate limits, email/SMS, error monitoring, metrics, and centralized logs.
- Add CI security scanners, migration checks, database-backed integration tests, backup/restore exercises, and deployment pipelines.
- Enter real university evidence through authorized staff; no production pattern may be created from demo assumptions.
- Create and publish scoring-policy versions through the Stage E scoring-policy workflow before composing live mocks.
- Conduct Bangladesh legal/privacy/IP review before commercial content publication.

Items will be checked off together during the final setup and hardening phase. This file is the source of truth for deferred setup—not a claim that those controls are already live.
