"use client";
import { use, useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
type Summary = {
  attemptId: string;
  total: number;
  submittedAt: string;
  sections: { sectionId: string; total: number }[];
};
type Review = {
  questions: {
    questionVersionId: string;
    stem: string;
    options: { position: number; content: string; isCorrect: boolean }[];
    selectedOptionPositions: number[];
    solution: string;
    explanation: string;
  }[];
};
export default function Result({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    apiFetch<Summary>(`/v1/results/${id}`)
      .then(setSummary)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load"),
      );
    apiFetch<Review>(`/v1/results/${id}/review`)
      .then(setReview)
      .catch(() =>
        setNotice("Answer review will appear after academic release."),
      );
  }, [id]);
  return (
    <main className="shell page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Attempt result</p>
          <h1 className="page-title">Score {summary?.total ?? "—"}</h1>
        </div>
        <a href="/results">All results</a>
      </div>
      {error && <p className="form-error">{error}</p>}
      {summary && (
        <div className="card-grid">
          {summary.sections.map((s) => (
            <div className="card" key={s.sectionId}>
              <p className="muted">Section</p>
              <h2>{s.total}</h2>
            </div>
          ))}
        </div>
      )}
      {notice && <div className="empty">{notice}</div>}
      {review?.questions.map((q) => (
        <article className="card question" key={q.questionVersionId}>
          <h3>{q.stem}</h3>
          {q.options.map((o) => (
            <p key={o.position} className={o.isCorrect ? "correct" : ""}>
              {o.content}
              {q.selectedOptionPositions.includes(o.position)
                ? " — your answer"
                : ""}
            </p>
          ))}
          <p>
            <strong>Explanation:</strong> {q.explanation}
          </p>
        </article>
      ))}
    </main>
  );
}
