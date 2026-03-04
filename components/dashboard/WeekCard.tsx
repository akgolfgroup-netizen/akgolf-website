"use client";

import type { WeekSchedule } from "@/lib/ai/plan-schema";
import { DayCard } from "./DayCard";

export function WeekCard({ week }: { week: WeekSchedule }) {
  const activeDays = week.days.filter((d) => !d.isRestDay);
  const restDays = week.days.filter((d) => d.isRestDay);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-mono font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded">
          Uke {week.weekNumber}
        </span>
        <h3 className="text-sm font-semibold text-ink-80">{week.theme}</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {activeDays.map((day) => (
          <DayCard key={day.dayNumber} day={day} />
        ))}
      </div>

      {restDays.length > 0 && (
        <p className="text-[10px] text-ink-30 mt-3">
          Hviledager: {restDays.map((d) => d.dayName).join(", ")}
        </p>
      )}
    </div>
  );
}
