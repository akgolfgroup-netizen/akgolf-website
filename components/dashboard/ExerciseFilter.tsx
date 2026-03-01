"use client";

const PYRAMID_LEVELS = ["Alle", "FYS", "TEK", "SLAG", "SPILL", "TURN"];
const DIFFICULTIES = ["Alle", "Nybegynner", "Middels", "Avansert"];

export function ExerciseFilter({
  level,
  difficulty,
  onLevelChange,
  onDifficultyChange,
}: {
  level: string;
  difficulty: string;
  onLevelChange: (level: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1.5">
          Pyramideniva
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PYRAMID_LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => onLevelChange(l)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                level === l
                  ? "bg-gold text-white"
                  : "bg-ink-05 text-ink-50 hover:bg-ink-10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1.5">
          Vanskelighetsgrad
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                difficulty === d
                  ? "bg-navy text-white"
                  : "bg-ink-05 text-ink-50 hover:bg-ink-10"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
