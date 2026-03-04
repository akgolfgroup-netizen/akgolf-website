import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();

  return NextResponse.redirect(
    new URL("/treningsplan", process.env.NEXT_PUBLIC_SITE_URL || "https://akgolf.no")
  );
}
