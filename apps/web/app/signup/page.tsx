"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "../../lib/supabase/client";

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const { data, error: signUpError } = await createClient().auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });
    if (signUpError) {
      setError(signUpError.message);
      setPending(false);
      return;
    }
    setMessage(
      data.session
        ? "Account created. You are signed in."
        : "Check your email to confirm your account.",
    );
    setPending(false);
    event.currentTarget.reset();
  }

  return (
    <main className="auth-shell">
      <section className="card auth-card">
        <p className="eyebrow">Start preparing</p>
        <h1>Create account</h1>
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
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <label className="check">
            <input name="terms" type="checkbox" required /> I accept the privacy
            notice and terms.
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="form-success" role="status">
              {message}
            </p>
          )}
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="auth-links">
          Already registered? <Link href="/login">Sign in</Link>
        </p>
        <Link href="/">Back home</Link>
      </section>
    </main>
  );
}
