"use client";

import { usePlan } from "@/components/dashboard/DashboardShell";
import { ProgressionTracker } from "@/components/dashboard/ProgressionTracker";

export default function ProgresjonPage() {
  const { plan } = usePlan();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="w-heading-md mb-1">Progresjon</h1>
        <p className="text-sm text-ink-50">
          Din vei fra kategori {plan.progressionCriteria.currentCategory} til{" "}
          {plan.progressionCriteria.nextCategory}.
        </p>
      </div>

      <ProgressionTracker
        progression={plan.progressionCriteria}
        mentalTraining={plan.mentalTraining}
      />
    </div>
  );
}
