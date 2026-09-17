import { AppShell } from "../../components/app-shell";
import { requireUser } from "../../lib/require-user";
export default async function Dashboard() {
  const user = await requireUser();
  return (
    <AppShell email={user.email ?? "Student"}>
      <p className="eyebrow">Student workspace</p>
      <h1 className="page-title">Ready for your next mock?</h1>
      <p className="lead">
        Choose a university target, take a governed mock exam, and review
        released results.
      </p>
      <div className="card-grid">
        <a className="card action-card" href="/universities">
          <h2>Explore universities</h2>
          <p>View the configured university and program catalogue.</p>
        </a>
        <a className="card action-card" href="/mocks">
          <h2>Take a mock</h2>
          <p>Start or resume an available admission mock.</p>
        </a>
        <a className="card action-card" href="/results">
          <h2>Track results</h2>
          <p>See score history and released answer reviews.</p>
        </a>
      </div>
    </AppShell>
  );
}
