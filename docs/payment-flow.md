# Payment flow

1. Authenticated user requests purchase; server resolves trusted product/price and creates an order.
2. Server creates the gateway session and records the gateway reference.
3. Browser redirects are UX signals only and never grant access.
4. Validated IPN/webhook is authenticated as the gateway supports, then verified server-to-server.
5. In one idempotent transaction, verify order, transaction, exact amount/currency and successful status; append payment event; activate entitlement once.
6. Duplicate, delayed, or conflicting callbacks are retained for reconciliation and cannot duplicate entitlement.

Refunds and reversals are explicit states with audit events. Logs exclude card data and secrets. Gateway adapters isolate provider-specific payloads from commerce domain rules.
