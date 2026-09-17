"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Product = {
  id: string;
  name: string;
  description: string | null;
  prices: {
    id: string;
    amount: string;
    currency: string;
    interval: string | null;
  }[];
};
type Entitlement = {
  id: string;
  endsAt: string | null;
  product: { name: string };
};
export default function Subscription() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [access, setAccess] = useState<Entitlement[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      apiFetch<Product[]>("/v1/commerce/catalog"),
      apiFetch<Entitlement[]>("/v1/commerce/entitlements"),
    ])
      .then(([products, entitlements]) => {
        setCatalog(products);
        setAccess(entitlements);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
  }, []);
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Access</p>
          <h1 className="page-title">Subscription</h1>
        </div>
        <a href="/dashboard">Dashboard</a>
      </div>
      {error && <p className="form-error">{error}</p>}
      <h2>Active access</h2>
      {access.length ? (
        <div className="stack">
          {access.map((item) => (
            <article className="card" key={item.id}>
              <strong>{item.product.name}</strong>
              <p className="muted">
                {item.endsAt
                  ? `Until ${new Date(item.endsAt).toLocaleDateString()}`
                  : "No expiry"}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          No paid entitlement is active. Free content remains available.
        </div>
      )}
      <h2>Available products</h2>
      <div className="card-grid">
        {catalog.map((product) => (
          <article className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.prices.map((price) => (
              <p key={price.id}>
                <strong>
                  {price.currency} {price.amount}
                </strong>
                {price.interval ? ` / ${price.interval}` : ""}
              </p>
            ))}
            <span className="badge">
              Checkout activates after verified gateway setup
            </span>
          </article>
        ))}
      </div>
      {!catalog.length && !error && (
        <div className="empty">No paid products have been published.</div>
      )}
    </main>
  );
}
