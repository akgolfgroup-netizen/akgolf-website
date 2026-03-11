import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — must be called before getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Dashboard routes require authentication
  if (request.nextUrl.pathname.startsWith("/treningsplan/dashboard")) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Already logged-in users on login page → redirect to dashboard
  if (request.nextUrl.pathname === "/auth/login" && user) {
    return NextResponse.redirect(
      new URL("/treningsplan/dashboard", request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/treningsplan/dashboard/:path*", "/auth/:path*"],
};
