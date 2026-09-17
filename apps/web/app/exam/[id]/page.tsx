"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../../lib/api";
type Question = {
  id: string;
  type: string;
  stem: string;
  marks: number;
  options: { position: number; content: string }[];
};
type Attempt = {
  id: string;
  status: string;
  deadlineAt: string;
  serverNow: string;
  sections: { id: string; name: string; questions: Question[] }[];
  answers: {
    questionVersionId: string;
    revision: number;
    response: { selectedOptionPositions: number[] };
  }[];
};
export default function Exam({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [revisions, setRevisions] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now());
  const router = useRouter();
  useEffect(() => {
    apiFetch<Attempt>(`/v1/exams/attempts/${id}`)
      .then((a) => {
        setData(a);
        setAnswers(
          Object.fromEntries(
            a.answers.map((x) => [
              x.questionVersionId,
              x.response.selectedOptionPositions,
            ]),
          ),
        );
        setRevisions(
          Object.fromEntries(
            a.answers.map((x) => [x.questionVersionId, x.revision]),
          ),
        );
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
  }, [id]);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = data
    ? Math.max(
        0,
        Math.floor((new Date(data.deadlineAt).getTime() - now) / 1000),
      )
    : 0;
  async function choose(q: Question, pos: number) {
    const current = answers[q.id] ?? [];
    const multiple = q.type.toUpperCase().includes("MULTI");
    const next = multiple
      ? current.includes(pos)
        ? current.filter((value) => value !== pos)
        : [...current, pos].sort((a, b) => a - b)
      : [pos];
    setAnswers((v) => ({ ...v, [q.id]: next }));
    const revision = (revisions[q.id] ?? 0) + 1;
    try {
      await apiFetch(`/v1/exams/attempts/${id}/answers`, {
        method: "PUT",
        body: JSON.stringify({
          operationId: crypto.randomUUID(),
          questionVersionId: q.id,
          revision,
          selectedOptionPositions: next,
        }),
      });
      setRevisions((v) => ({ ...v, [q.id]: revision }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  }
  async function submit() {
    if (!confirm("Submit this attempt? Answers cannot be changed afterwards."))
      return;
    setBusy(true);
    try {
      await apiFetch(`/v1/exams/attempts/${id}/submit`, { method: "POST" });
      router.push(`/results/${id}` as never);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit failed");
      setBusy(false);
    }
  }
  if (error && !data)
    return (
      <main className="shell page">
        <p className="form-error">{error}</p>
      </main>
    );
  if (!data)
    return (
      <main className="shell page">
        <p>Loading exam…</p>
      </main>
    );
  return (
    <main className="shell page exam">
      <div className="page-head sticky">
        <div>
          <p className="eyebrow">Secure attempt</p>
          <h1 className="page-title">Mock exam</h1>
        </div>
        <div>
          <strong>
            {Math.floor(remaining / 60)}:
            {String(remaining % 60).padStart(2, "0")}
          </strong>{" "}
          <button className="button" disabled={busy} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}
      {data.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.name}</h2>
          {section.questions.map((q, i) => (
            <article className="card question" key={q.id}>
              <p>
                <strong>{i + 1}.</strong> {q.stem}{" "}
                <span className="muted">({q.marks} marks)</span>
              </p>
              {q.options.map((o) => (
                <label className="option" key={o.position}>
                  <input
                    type={
                      q.type.toUpperCase().includes("MULTI")
                        ? "checkbox"
                        : "radio"
                    }
                    name={q.id}
                    checked={answers[q.id]?.includes(o.position) ?? false}
                    onChange={() => choose(q, o.position)}
                  />
                  <span>{o.content}</span>
                </label>
              ))}
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}
