"use client";

const LEVELS = ["FYS", "TEK", "SLAG", "SPILL", "TURN"] as const;

const LEVEL_COLORS: Record<string, string> = {
  FYS: "bg-emerald-500",
  TEK: "bg-sky-500",
  SLAG: "bg-amber-500",
  SPILL: "bg-violet-500",
  TURN: "bg-rose-500",
};

const LEVEL_LABELS: Record<string, string> = {
  FYS: "Fysisk",
  TEK: "Teknikk",
  SLAG: "Slagtrening",
  SPILL: "Spill",
  TURN: "Turnering",
};

export function PyramidChart({
  distribution,
  compact = false,
}: {
  distribution: Record<string, number>;
  compact?: boolean;
}) {
  const max = Math.max(...Object.values(distribution));

  return (
    <div className={compact ? "space-y-1.5" : "space-y-3"}>
      {LEVELS.map((level) => {
        const pct = distribution[level] || 0;
        const width = max > 0 ? (pct / max) * 100 : 0;
        return (
          <div key={level} className="flex items-center gap-3">
            <span
              className={`${compact ? "w-10 text-[10px]" : "w-12 text-xs"} font-semibold text-ink-50 text-right`}
            >
              {level}
            </span>
            <div className="flex-1 h-2 bg-ink-10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${LEVEL_COLORS[level]}`}
                style={{ width: `${width}%` }}
              />
            </div>
            <span
              className={`${compact ? "w-8 text-[10px]" : "w-10 text-xs"} font-mono font-semibold text-ink-70`}
            >
              {pct}%
            </span>
          </div>
        );
      })}
      {!compact && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {LEVELS.map((level) => (
            <span key={level} className="flex items-center gap-1.5 text-[10px] text-ink-40">
              <span className={`w-2 h-2 rounded-full ${LEVEL_COLORS[level]}`} />
              {LEVEL_LABELS[level]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
