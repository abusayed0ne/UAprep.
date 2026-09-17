import Link from "next/link";

export default function Pricing() {
  return (
    <main className="shell page">
      <div className="page-head">
        <a className="brand" href="/">
          UAprep
        </a>
        <Link href="/login">Sign in</Link>
      </div>
      <p className="eyebrow">Simple access</p>
      <h1 className="page-title">Start free. Upgrade when packs launch.</h1>
      <p className="lead">
        The payment gateway remains deliberately disabled until its server-side
        verification credentials are configured. No browser redirect can grant
        access.
      </p>
      <div className="card-grid">
        <article className="card">
          <h2>Free</h2>
          <p>Published free mocks, results, and released reviews.</p>
          <Link className="button" href="/signup">
            Create account
          </Link>
        </article>
        <article className="card">
          <h2>Premium packs</h2>
          <p>
            University-specific products are shown only when an authorized staff
            member publishes a price.
          </p>
          <span className="badge">Coming after gateway setup</span>
        </article>
      </div>
    </main>
  );
}
