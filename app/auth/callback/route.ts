import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabase, createServiceClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirect =
    requestUrl.searchParams.get("redirect") || "/treningsplan/dashboard";

  if (code) {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] Error exchanging code for session:", error);
      return NextResponse.redirect(new URL("/auth/login?error=auth", requestUrl.origin));
    }

    // Link existing plans to this user by matching email
    if (data.user?.email) {
      const service = createServiceClient();
      const { error: updateError } = await service
        .from("plans")
        .update({ user_id: data.user.id })
        .eq("email", data.user.email)
        .is("user_id", null);

      if (updateError) {
        console.error("[auth/callback] Error linking plans to user:", updateError);
      } else {
        // Revalidate dashboard since plans are now linked
        revalidatePath("/treningsplan/dashboard", "layout");
      }
    }
  }

  return NextResponse.redirect(new URL(redirect, requestUrl.origin));
}
