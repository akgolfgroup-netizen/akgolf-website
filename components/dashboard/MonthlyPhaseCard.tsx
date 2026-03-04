"use client";

import type { MonthlyPhase } from "@/lib/ai/plan-schema";

const PHASE_COLORS: Record<string, string> = {
  "1": "border-l-emerald-500",
  "2": "border-l-sky-500",
  "3": "border-l-violet-500",
};

export function MonthlyPhaseCard({ phase }: { phase: MonthlyPhase }) {
  return (
    <div
      className={`w-card p-5 border-l-4 ${PHASE_COLORS[String(phase.month)] || "border-l-gold"}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono font-semibold text-ink-30">
          M{phase.month}
        </span>
        <h3 className="text-sm font-semibold text-ink-90">{phase.name}</h3>
        <span className="ml-auto text-[10px] text-ink-40 bg-ink-05 px-2 py-0.5 rounded-full">
          {phase.phase}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
            Fokus
          </p>
          <ul className="space-y-0.5">
            {phase.focus.map((f, i) => (
              <li key={i} className="text-xs text-ink-60 flex items-start gap-1.5">
                <span className="text-gold mt-0.5">&#8226;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
            Mal
          </p>
          <ul className="space-y-0.5">
            {phase.goals.map((g, i) => (
              <li key={i} className="text-xs text-ink-60 flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5">&#10003;</span>
                {g}
              </li>
            ))}
          </ul>
        </div>

        {phase.keyExercises.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
              Nokkelovelser
            </p>
            <div className="flex flex-wrap gap-1">
              {phase.keyExercises.map((ex, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-ink-05 text-ink-60 px-2 py-0.5 rounded"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
