"use client";

import type { PlanSummary } from "@/lib/ai/plan-schema";
import { PyramidChart } from "./PyramidChart";

export function PlanSummaryCard({ summary }: { summary: PlanSummary }) {
  return (
    <div className="w-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        {/* Category badge */}
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-ink-100 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-bold text-gold">
            {summary.playerCategory}
          </span>
          <span className="text-[9px] text-ink-30 uppercase tracking-wider mt-0.5">
            Kategori
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="w-heading-sm mb-1">{summary.categoryName}</h2>
          <p className="text-sm text-ink-50 mb-4">{summary.mainFocus}</p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-0.5">
                Varighet
              </p>
              <p className="text-sm font-semibold text-ink-80">
                {summary.totalWeeks} uker
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-0.5">
                Okter/uke
              </p>
              <p className="text-sm font-semibold text-ink-80">
                {summary.sessionsPerWeek}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-0.5">
                Min/okt
              </p>
              <p className="text-sm font-semibold text-ink-80">
                {summary.minutesPerSession}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pyramid */}
      <div className="mt-6 pt-6 border-t border-ink-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-30 mb-4">
          Pyramidefordeling
        </h3>
        <PyramidChart distribution={summary.pyramidDistribution} />
      </div>

      {/* Estimated improvement */}
      <div className="mt-6 p-3 rounded-lg bg-gold/5 border border-gold/15">
        <p className="text-xs text-ink-50">
          <span className="font-semibold text-gold-text">
            Estimert forbedring:
          </span>{" "}
          {summary.estimatedImprovement}
        </p>
      </div>
    </div>
  );
}
