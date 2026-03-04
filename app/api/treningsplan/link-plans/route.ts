import { NextResponse } from "next/server";
import { createServerSupabase, createServiceClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use service client to bypass RLS — update plans that match user email
  const service = createServiceClient();
  const { data, error } = await service
    .from("plans")
    .update({ user_id: user.id })
    .eq("email", user.email)
    .is("user_id", null)
    .select("id");

  if (error) {
    console.error("Link plans error:", error);
    return NextResponse.json({ error: "Feil ved kobling" }, { status: 500 });
  }

  return NextResponse.json({ linked: data?.length || 0 });
}
