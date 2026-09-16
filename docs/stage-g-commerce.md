# Stage G — Commerce

Implemented: product/price catalog, server-created orders using trusted prices, payment records, entitlements, subscriptions, and an idempotent validated-payment transaction. Browser success redirects cannot grant access. Amount, currency, order, success, transaction uniqueness, and cross-order replay are checked before entitlement creation.

The default gateway verifier deliberately fails closed. A real SSLCOMMERZ or alternative adapter and credentials are part of final manual setup.
