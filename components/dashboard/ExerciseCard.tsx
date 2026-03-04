"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/ai/plan-schema";

const LEVEL_COLORS: Record<string, string> = {
  FYS: "bg-emerald-500/10 text-emerald-700",
  TEK: "bg-sky-500/10 text-sky-700",
  SLAG: "bg-amber-500/10 text-amber-700",
  SPILL: "bg-violet-500/10 text-violet-700",
  TURN: "bg-rose-500/10 text-rose-700",
};

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [expanded, setExpanded] = useState(false);
  const levelColor = LEVEL_COLORS[exercise.pyramidLevel] || "bg-ink-05 text-ink-50";

  return (
    <div className="w-card p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-semibold text-ink-90">
            {exercise.name}
          </h4>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-ink-30 flex-shrink-0 mt-0.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelColor}`}>
            {exercise.pyramidLevel}
          </span>
          <span className="text-[10px] bg-ink-05 text-ink-50 px-2 py-0.5 rounded-full">
            {exercise.difficulty}
          </span>
          <span className="text-[10px] bg-ink-05 text-ink-50 px-2 py-0.5 rounded-full">
            {exercise.duration} min
          </span>
          {exercise.decadeDrill && (
            <span className="text-[10px] bg-gold/10 text-gold-text px-2 py-0.5 rounded-full font-semibold">
              DECADE
            </span>
          )}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-ink-10 space-y-3 text-xs">
          {exercise.equipment.length > 0 && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-1">
                Utstyr
              </p>
              <p className="text-ink-60">{exercise.equipment.join(", ")}</p>
            </div>
          )}

          <div>
            <p className="font-semibold text-ink-40 uppercase text-[10px] mb-1">
              Steg
            </p>
            <ol className="space-y-1">
              {exercise.steps.map((step, i) => (
                <li key={i} className="text-ink-60 pl-2">
                  {i + 1}. {step}
                </li>
              ))}
            </ol>
          </div>

          {exercise.tips.length > 0 && (
            <div className="p-2 rounded bg-gold/5 border border-gold/10">
              <p className="font-semibold text-gold-text uppercase text-[10px] mb-0.5">
                Tips
              </p>
              {exercise.tips.map((tip, i) => (
                <p key={i} className="text-ink-60">
                  {tip}
                </p>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {exercise.prLevel && (
              <span className="text-[10px] bg-ink-05 text-ink-40 px-2 py-0.5 rounded font-mono">
                {exercise.prLevel}
              </span>
            )}
            {exercise.mEnvironment && (
              <span className="text-[10px] bg-ink-05 text-ink-40 px-2 py-0.5 rounded font-mono">
                {exercise.mEnvironment}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
