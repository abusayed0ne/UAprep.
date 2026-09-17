"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "../../lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await createClient().auth.signInWithPassword(
      {
        email: String(form.get("email")),
        password: String(form.get("password")),
      },
    );
    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }
    const requestedPath = new URLSearchParams(window.location.search).get(
      "next",
    );
    const destination =
      requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
        ? requestedPath
        : "/dashboard";
    router.replace(destination as never);
    router.refresh();
  }

  return (
    <main className="auth-shell">
      <section className="card auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <form className="auth-form" method="post" onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="auth-links">
          New here? <Link href="/signup">Create an account</Link>
        </p>
        <Link href="/">Back home</Link>
      </section>
    </main>
  );
}
