import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { generatePlanPDF } from "@/lib/pdf/generate-pdf";

export const maxDuration = 30;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = createServiceClient();
  const { data: plan, error } = await supabase
    .from("plans")
    .select("id, full_plan, status, tier, category")
    .eq("id", id)
    .single();

  if (error || !plan) {
    return NextResponse.json({ error: "Plan ikke funnet" }, { status: 404 });
  }

  if (plan.status !== "paid") {
    return NextResponse.json({ error: "Plan er ikke betalt" }, { status: 403 });
  }

  if (!plan.full_plan) {
    return NextResponse.json({ error: "Plandata mangler" }, { status: 500 });
  }

  const pdfBuffer = await generatePlanPDF(plan.full_plan);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="AK-Golf-Treningsplan-Kategori-${plan.category}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
