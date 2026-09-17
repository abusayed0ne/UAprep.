import { AppShell } from "../../components/app-shell";
import { requireUser } from "../../lib/require-user";

export default async function Onboarding() {
  const user = await requireUser();
  return (
    <AppShell email={user.email ?? "Student"}>
      <p className="eyebrow">Getting started</p>
      <h1 className="page-title">Build your first baseline</h1>
      <ol className="steps">
        <li>
          <strong>Explore universities</strong>
          <span>
            Use only configured demo or staff-verified academic information.
          </span>
        </li>
        <li>
          <strong>Take a published mock</strong>
          <span>
            Your answers autosave and the server enforces the deadline.
          </span>
        </li>
        <li>
          <strong>Review your result</strong>
          <span>
            Answer keys appear only after controlled academic release.
          </span>
        </li>
      </ol>
      <a className="button" href="/universities">
        Start with universities
      </a>
    </AppShell>
  );
}
