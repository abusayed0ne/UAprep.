import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

function loginUrl(request: NextRequest, error: string, next: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  url.searchParams.set("next", next);
  return url;
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const requestedPath = String(form.get("next") ?? "/dashboard");
  const next =
    requestedPath.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/dashboard";
  const response = NextResponse.redirect(new URL(next, request.url), 303);
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return NextResponse.redirect(
        loginUrl(request, "invalid_credentials", next),
        303,
      );
    }
    return response;
  } catch {
    return NextResponse.redirect(loginUrl(request, "unavailable", next), 303);
  }
}
