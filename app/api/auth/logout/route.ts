import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();

  return NextResponse.redirect(
    new URL("/treningsplan", env.NEXT_PUBLIC_SITE_URL)
  );
}
