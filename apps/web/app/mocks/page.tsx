"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";
type Mock = {
  id: string;
  version: number;
  publishedAt: string;
  mock: { id: string; name: string };
  sections: {
    name: string;
    durationSeconds: number;
    totalMarks: string;
    _count: { items: number };
  }[];
};
export default function Mocks() {
  const [data, setData] = useState<Mock[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const router = useRouter();
  useEffect(() => {
    apiFetch<Mock[]>("/v1/exams/library")
      .then(setData)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
  }, []);
  async function start(id: string) {
    setBusy(id);
    setError("");
    try {
      const storageKey = `uaprep:mock-start:${id}`;
      const startKey = localStorage.getItem(storageKey) ?? crypto.randomUUID();
      localStorage.setItem(storageKey, startKey);
      const attempt = await apiFetch<{ id: string }>("/v1/exams/attempts", {
        method: "POST",
        body: JSON.stringify({
          mockVersionId: id,
          startKey,
        }),
      });
      router.push(`/exam/${attempt.id}` as never);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start");
      setBusy("");
    }
  }
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Exam practice</p>
          <h1 className="page-title">Mock library</h1>
        </div>
        <a href="/dashboard">Dashboard</a>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="stack">
        {data.map((m) => (
          <article className="card" key={m.id}>
            <div className="row">
              <div>
                <h2>{m.mock.name}</h2>
                <p className="muted">
                  Version {m.version} ·{" "}
                  {m.sections.reduce((n, s) => n + s._count.items, 0)} questions
                  ·{" "}
                  {Math.ceil(
                    m.sections.reduce((n, s) => n + s.durationSeconds, 0) / 60,
                  )}{" "}
                  minutes
                </p>
              </div>
              <button
                className="button"
                disabled={busy === m.id}
                onClick={() => start(m.id)}
              >
                {busy === m.id ? "Starting..." : "Start / resume"}
              </button>
            </div>
          </article>
        ))}
      </div>
      {!error && !data.length && (
        <div className="empty">No published mocks are available yet.</div>
      )}
    </main>
  );
}
