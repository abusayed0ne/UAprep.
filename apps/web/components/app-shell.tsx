import type { ReactNode } from "react";

export function AppShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <a className="brand" href="/dashboard">
          UAprep
        </a>
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/universities">Universities</a>
          <a href="/mocks">Mock library</a>
          <a href="/results">Results</a>
          <a href="/subscription">Subscription</a>
          <a href="/staff">Staff console</a>
          <a href="/profile">Profile</a>
        </nav>
        <small>{email}</small>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
