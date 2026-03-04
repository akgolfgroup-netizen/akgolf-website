import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const { data: plan, error } = await supabase
    .from("plans")
    .select("id, full_plan, status, tier, category, created_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !plan) {
    return NextResponse.json({ error: "Plan ikke funnet" }, { status: 404 });
  }

  if (plan.status !== "paid") {
    return NextResponse.json({ error: "Plan er ikke betalt" }, { status: 403 });
  }

  return NextResponse.json(plan);
}
