import Link from "next/link";

const messages: Record<string, string> = {
  invalid_credentials: "Email or password is incorrect.",
  unavailable: "Authentication service is temporarily unavailable.",
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const query = await searchParams;
  const next =
    query.next?.startsWith("/") && !query.next.startsWith("//")
      ? query.next
      : "/dashboard";
  const error = query.error ? messages[query.error] : undefined;
  return (
    <main className="auth-shell">
      <section className="card auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <form className="auth-form" method="post" action="/auth/login">
          <input type="hidden" name="next" value={next} />
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
          <button className="button" type="submit">
            Sign in
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
