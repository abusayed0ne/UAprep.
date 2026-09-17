"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
type University = {
  id: string;
  name: string;
  slug: string;
  isDemo: boolean;
  programs: { id: string; name: string; code: string | null }[];
};
export default function Universities() {
  const [data, setData] = useState<University[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiFetch<University[]>("/v1/academic/universities")
      .then(setData)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
  }, []);
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Academic catalogue</p>
          <h1 className="page-title">Universities</h1>
        </div>
        <a href="/dashboard">Dashboard</a>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="card-grid">
        {data.map((u) => (
          <article className="card" key={u.id}>
            <div className="row">
              <h2>{u.name}</h2>
              {u.isDemo && <span className="badge">Demo</span>}
            </div>
            {u.programs.length ? (
              <ul>
                {u.programs.map((p) => (
                  <li key={p.id}>
                    {p.name}
                    {p.code ? ` (${p.code})` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No programs configured yet.</p>
            )}
          </article>
        ))}
      </div>
      {!error && !data.length && (
        <div className="empty">No universities are available yet.</div>
      )}
    </main>
  );
}
