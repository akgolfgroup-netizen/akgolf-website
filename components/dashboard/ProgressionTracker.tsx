"use client";

import type { ProgressionCriteria, MentalTraining } from "@/lib/ai/plan-schema";

export function ProgressionTracker({
  progression,
  mentalTraining,
}: {
  progression: ProgressionCriteria;
  mentalTraining: MentalTraining;
}) {
  return (
    <div className="space-y-6">
      {/* Category transition */}
      <div className="w-card p-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-4">
          Progresjonsbane
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-ink-100 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold text-gold">
              {progression.currentCategory}
            </span>
            <span className="text-[8px] text-ink-30 uppercase">Na</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              width="32"
              height="16"
              viewBox="0 0 32 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold"
            >
              <line x1="0" y1="8" x2="28" y2="8" />
              <polyline points="22 2 28 8 22 14" />
            </svg>
            <span className="text-[9px] text-ink-40 mt-1">
              {progression.estimatedTimeline}
            </span>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gold/10 border-2 border-gold/30 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold text-gold-text">
              {progression.nextCategory}
            </span>
            <span className="text-[8px] text-ink-40 uppercase">Mal</span>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="w-card p-5">
        <h3 className="text-sm font-semibold text-ink-90 mb-3">
          Krav for opprykk
        </h3>
        <ul className="space-y-2">
          {progression.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-ink-60">
              <span className="w-5 h-5 rounded-full bg-ink-05 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-mono text-ink-40">
                  {i + 1}
                </span>
              </span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Milestones */}
      {progression.keyMilestones.length > 0 && (
        <div className="w-card p-5">
          <h3 className="text-sm font-semibold text-ink-90 mb-3">
            Milepaler
          </h3>
          <div className="relative pl-6">
            <div className="absolute left-2 top-1 bottom-1 w-px bg-ink-10" />
            {progression.keyMilestones.map((ms, i) => (
              <div key={i} className="relative mb-3 last:mb-0">
                <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold border-2 border-white" />
                <p className="text-xs text-ink-60">{ms}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mental training */}
      <div className="w-card p-5 bg-gold/3 border border-gold/10">
        <h3 className="text-sm font-semibold text-gold-text mb-3">
          Mental trening
        </h3>

        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
              Fokusferdigheter
            </p>
            <div className="flex flex-wrap gap-1.5">
              {mentalTraining.focusSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-gold/10 text-gold-text px-2 py-0.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
              Pre-shot rutine
            </p>
            <p className="text-xs text-ink-60">
              {mentalTraining.preShotRoutine}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
              Ukentlig praksis
            </p>
            <p className="text-xs text-ink-60">
              {mentalTraining.weeklyPractice}
            </p>
          </div>

          {mentalTraining.lifeFramework.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1">
                LIFE-rammeverk
              </p>
              <div className="space-y-2">
                {mentalTraining.lifeFramework.map((item, i) => (
                  <div key={i} className="p-2 bg-white rounded">
                    <p className="text-[10px] font-semibold text-ink-70">
                      {item.dimension}
                    </p>
                    <p className="text-[10px] text-ink-50">
                      {item.focus} — {item.weeklyExercise}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
