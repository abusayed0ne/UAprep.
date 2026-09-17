"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
type Performance = {
  attemptCount: number;
  history: {
    attemptId: string;
    mock: string;
    total: number;
    submittedAt: string | null;
  }[];
};
export default function Results() {
  const [data, setData] = useState<Performance | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiFetch<Performance>("/v1/results/performance")
      .then(setData)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
  }, []);
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Progress</p>
          <h1 className="page-title">Results</h1>
        </div>
        <a href="/dashboard">Dashboard</a>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="stack">
        {data?.history.map((item) => (
          <a
            className="card action-card"
            href={`/results/${item.attemptId}`}
            key={item.attemptId}
          >
            <div className="row">
              <div>
                <h2>{item.mock}</h2>
                <p className="muted">
                  {item.submittedAt
                    ? new Date(item.submittedAt).toLocaleString()
                    : "Submitted"}
                </p>
              </div>
              <strong className="score">{item.total}</strong>
            </div>
          </a>
        ))}
      </div>
      {data && !data.history.length && (
        <div className="empty">Complete a mock to see results.</div>
      )}
    </main>
  );
}
