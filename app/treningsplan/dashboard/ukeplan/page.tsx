"use client";

import { useState } from "react";
import { usePlan } from "@/components/dashboard/DashboardShell";
import { WeekCard } from "@/components/dashboard/WeekCard";

export default function UkeplanPage() {
  const { plan } = usePlan();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const week = plan.weeklySchedule.find((w) => w.weekNumber === selectedWeek);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="w-heading-md mb-1">Ukeplan</h1>
        <p className="text-sm text-ink-50">
          {plan.summary.totalWeeks} uker med {plan.summary.sessionsPerWeek}{" "}
          okter per uke.
        </p>
      </div>

      {/* Week selector */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1.5 min-w-max">
          {plan.weeklySchedule.map((w) => (
            <button
              key={w.weekNumber}
              onClick={() => setSelectedWeek(w.weekNumber)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedWeek === w.weekNumber
                  ? "bg-gold text-white"
                  : "bg-ink-05 text-ink-50 hover:bg-ink-10"
              }`}
            >
              Uke {w.weekNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Selected week */}
      {week && <WeekCard week={week} />}
    </div>
  );
}
