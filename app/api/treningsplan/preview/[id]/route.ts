import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = createServiceClient();
  const { data: plan, error } = await supabase
    .from("plans")
    .select("id, preview_data, status, category, tier")
    .eq("id", id)
    .single();

  if (error || !plan) {
    return NextResponse.json({ error: "Plan ikke funnet" }, { status: 404 });
  }

  return NextResponse.json({
    planId: plan.id,
    status: plan.status,
    category: plan.category,
    tier: plan.tier,
    preview: plan.preview_data,
  });
}
