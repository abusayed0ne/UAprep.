import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  async function signOut() {
    "use server";
    const serverClient = await createClient();
    await serverClient.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="auth-shell">
      <section className="card auth-card">
        <p className="eyebrow">Authenticated</p>
        <h1>Your account</h1>
        <p>
          Signed in as <strong>{user.email}</strong>.
        </p>
        <p>
          <a href="/dashboard">Open dashboard</a>
        </p>
        <form action={signOut}>
          <button className="button" type="submit">
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
