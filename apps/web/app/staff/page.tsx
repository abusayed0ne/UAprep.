"use client";
import { FormEvent, useState } from "react";
import { apiFetch } from "../../lib/api";
const operations = [
  [
    "Create university",
    "POST",
    "/v1/academic/universities",
    '{"name":"Demo University","slug":"demo-university","isDemo":true}',
  ],
  [
    "Create subject",
    "POST",
    "/v1/academic/subjects",
    '{"name":"Mathematics","slug":"mathematics"}',
  ],
  [
    "Create content source",
    "POST",
    "/v1/questions/content-sources",
    '{"name":"Original internal content","sourceType":"INTERNAL","rightsStatus":"INTERNAL_ORIGINAL"}',
  ],
  ["List production questions", "GET", "/v1/questions/production", ""],
  [
    "Create scoring policy",
    "POST",
    "/v1/exams/scoring-policies",
    '{"policyKey":"standard","rules":{"useQuestionMarks":true,"correctPoints":1,"useQuestionPenalty":true,"wrongPenalty":0.25,"skipPoints":0,"scale":2,"roundingMode":"HALF_UP","reviewPolicy":{}}}',
  ],
  [
    "Release attempt result",
    "POST",
    "/v1/results/REPLACE_WITH_ATTEMPT_ID/release",
    "",
  ],
] as const;
export default function Staff() {
  const [selected, setSelected] = useState(0);
  const [path, setPath] = useState<string>(operations[0][2]);
  const [method, setMethod] = useState<string>(operations[0][1]);
  const [body, setBody] = useState<string>(operations[0][3]);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  function choose(index: number) {
    setSelected(index);
    const op = operations[index]!;
    setMethod(op[1]);
    setPath(op[2]);
    setBody(op[3]);
    setResult("");
    setError("");
  }
  async function run(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult("");
    try {
      const parsed = body.trim() ? JSON.parse(body) : undefined;
      const init: RequestInit = { method };
      if (parsed !== undefined) init.body = JSON.stringify(parsed);
      const data = await apiFetch<unknown>(path, init);
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Governed operations</p>
          <h1 className="page-title">Staff console</h1>
        </div>
        <a href="/dashboard">Dashboard</a>
      </div>
      <p className="lead">
        Only permissions stored in the database can authorize these operations.
        Student accounts will receive a safe 403 response.
      </p>
      <div className="console-grid">
        <aside className="card operation-list">
          {operations.map((op, i) => (
            <button
              className={selected === i ? "selected" : ""}
              key={op[0]}
              onClick={() => choose(i)}
            >
              {op[0]}
            </button>
          ))}
        </aside>
        <form className="card auth-form" onSubmit={run}>
          <label>
            Method
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PATCH</option>
              <option>PUT</option>
            </select>
          </label>
          <label>
            API path
            <input value={path} onChange={(e) => setPath(e.target.value)} />
          </label>
          <label>
            JSON body
            <textarea
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Running…" : "Run authorized operation"}
          </button>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {result && <pre className="result">{result}</pre>}
        </form>
      </div>
    </main>
  );
}
