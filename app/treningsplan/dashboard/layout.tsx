import { redirect } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();
  if (!user) redirect("/auth/login");

  const supabase = await createServerSupabase();
  const { data: plans } = await supabase
    .from("plans")
    .select("id, category, tier, status, full_plan")
    .eq("user_id", user.id)
    .in("tier", ["standard", "premium"])
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1);

  const activePlan = plans?.[0];

  // No Standard/Premium plan — check for Basis
  if (!activePlan?.full_plan) {
    const { data: basisPlans } = await supabase
      .from("plans")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "paid")
      .limit(1);

    if (basisPlans?.length) {
      redirect("/treningsplan/dashboard/upgrade");
    }
    redirect("/treningsplan");
  }

  return (
    <DashboardShell
      plan={activePlan.full_plan}
      planId={activePlan.id}
      category={activePlan.category || activePlan.full_plan.summary.playerCategory}
      tier={activePlan.tier}
      userEmail={user.email || ""}
    >
      {children}
    </DashboardShell>
  );
}
