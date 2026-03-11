import { redirect } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCachedActivePlan, getCachedAnyPaidPlan } from "@/lib/cache";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();
  if (!user) redirect("/auth/login");

  const supabase = await createServerSupabase();
  
  // Use cached data fetching for better performance
  const activePlan = await getCachedActivePlan(user.id, supabase);

  // No Standard/Premium plan — check for Basis
  if (!activePlan?.full_plan) {
    const anyPaidPlan = await getCachedAnyPaidPlan(user.id, supabase);

    if (anyPaidPlan) {
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
