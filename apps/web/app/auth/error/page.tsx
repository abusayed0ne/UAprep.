import Link from 'next/link';

export default function AuthError() {
  return <main className="auth-shell"><section className="card auth-card">
    <h1>Confirmation failed</h1>
    <p>The link is invalid or expired. Try signing up again or request a new confirmation email.</p>
    <Link className="button" href="/signup">Return to signup</Link>
  </section></main>;
}
