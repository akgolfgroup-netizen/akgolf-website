"use client";

import { usePlan } from "@/components/dashboard/DashboardShell";
import { PlanSummaryCard } from "@/components/dashboard/PlanSummaryCard";
import { MonthlyPhaseCard } from "@/components/dashboard/MonthlyPhaseCard";

export default function OversiktPage() {
  const { plan } = usePlan();
  const { summary, monthlyPhases } = plan;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="w-heading-md mb-1">Oversikt</h1>
        <p className="text-sm text-ink-50">
          Din personlige treningsplan basert pa AK-formelen.
        </p>
      </div>

      <PlanSummaryCard summary={summary} />

      <div>
        <h2 className="text-sm font-semibold text-ink-80 mb-4">
          3-maneders faseplan
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {monthlyPhases.map((phase) => (
            <MonthlyPhaseCard key={phase.month} phase={phase} />
          ))}
        </div>
      </div>
    </div>
  );
}
