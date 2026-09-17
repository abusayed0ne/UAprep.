import { AppShell } from "../../components/app-shell";
import { requireUser } from "../../lib/require-user";

export default async function Profile() {
  const user = await requireUser();
  return (
    <AppShell email={user.email ?? "Student"}>
      <p className="eyebrow">Account</p>
      <h1 className="page-title">Profile</h1>
      <div className="card">
        <p className="muted">Signed-in email</p>
        <h2>{user.email}</h2>
        <p>
          Your password, sessions, and verified identity are managed through
          Supabase Authentication.
        </p>
        <a className="button" href="/account">
          Account controls
        </a>
      </div>
    </AppShell>
  );
}
