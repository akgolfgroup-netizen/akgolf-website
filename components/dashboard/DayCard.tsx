"use client";

import { useState } from "react";
import type { DayPlan } from "@/lib/ai/plan-schema";

export function DayCard({ day }: { day: DayPlan }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-card p-4 hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ink-90">
            {day.dayName}
          </span>
          <div className="flex items-center gap-2">
            {day.duration && (
              <span className="text-[10px] text-ink-40">
                {day.duration} min
              </span>
            )}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-ink-30 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {day.sessionType && (
          <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">
            {day.sessionType}
          </span>
        )}

        <div className="mt-2 space-y-1">
          {day.mainA && (
            <p className="text-xs text-ink-60">
              <span className="font-semibold text-navy">A:</span>{" "}
              {day.mainA.area} — {day.mainA.focus}
            </p>
          )}
          {day.mainB && (
            <p className="text-xs text-ink-60">
              <span className="font-semibold text-navy">B:</span>{" "}
              {day.mainB.area} — {day.mainB.focus}
            </p>
          )}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-ink-10 space-y-3 text-xs">
          {day.warmup && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-0.5">
                Oppvarming
              </p>
              <p className="text-ink-60">{day.warmup}</p>
            </div>
          )}

          {day.mainA && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-0.5">
                Blokk A: {day.mainA.area} ({day.mainA.duration} min)
              </p>
              <p className="text-ink-60 mb-1">{day.mainA.focus}</p>
              {day.mainA.exercises.map((ex, i) => (
                <p key={i} className="text-ink-50 pl-2">
                  {i + 1}. {ex}
                </p>
              ))}
              {day.mainA.tips && (
                <p className="text-ink-40 italic mt-1">{day.mainA.tips}</p>
              )}
            </div>
          )}

          {day.mainB && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-0.5">
                Blokk B: {day.mainB.area} ({day.mainB.duration} min)
              </p>
              <p className="text-ink-60 mb-1">{day.mainB.focus}</p>
              {day.mainB.exercises.map((ex, i) => (
                <p key={i} className="text-ink-50 pl-2">
                  {i + 1}. {ex}
                </p>
              ))}
              {day.mainB.tips && (
                <p className="text-ink-40 italic mt-1">{day.mainB.tips}</p>
              )}
            </div>
          )}

          {day.application && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-0.5">
                Anvendelse
              </p>
              <p className="text-ink-60">{day.application}</p>
            </div>
          )}

          {day.cooldown && (
            <div>
              <p className="font-semibold text-ink-40 uppercase text-[10px] mb-0.5">
                Nedkjoling
              </p>
              <p className="text-ink-60">{day.cooldown}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            {day.prLevel && (
              <span className="text-[10px] bg-ink-05 text-ink-40 px-2 py-0.5 rounded font-mono">
                {day.prLevel}
              </span>
            )}
            {day.mEnvironment && (
              <span className="text-[10px] bg-ink-05 text-ink-40 px-2 py-0.5 rounded font-mono">
                {day.mEnvironment}
              </span>
            )}
          </div>

          {day.lifeReflection && (
            <div className="p-2 rounded bg-gold/5 border border-gold/10">
              <p className="text-[10px] font-semibold text-gold-text mb-0.5">
                LIFE-refleksjon
              </p>
              <p className="text-ink-60">{day.lifeReflection}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
