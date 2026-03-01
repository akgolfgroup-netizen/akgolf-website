"use client";

import type { TestScheduleEntry, TestProtocol, TestTarget } from "@/lib/ai/plan-schema";

export function TestScheduleCard({
  entry,
  protocols,
  targets,
}: {
  entry: TestScheduleEntry;
  protocols?: TestProtocol[];
  targets?: TestTarget[];
}) {
  return (
    <div className="w-card p-5 border-l-4 border-l-gold">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-mono font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">
          Uke {entry.weekNumber}
        </span>
        <h4 className="text-sm font-semibold text-ink-90">{entry.label}</h4>
      </div>
      <p className="text-xs text-ink-50 mb-3">{entry.purpose}</p>

      {protocols && protocols.length > 0 && (
        <div className="space-y-2">
          {protocols.map((protocol, i) => (
            <div key={i} className="p-3 bg-ink-05 rounded-lg">
              <p className="text-xs font-semibold text-ink-80 mb-1">
                {protocol.name}
              </p>
              <p className="text-[10px] text-ink-50 mb-1">
                <span className="font-semibold">Utstyr:</span>{" "}
                {protocol.equipment}
              </p>
              <p className="text-[10px] text-ink-50 mb-1">
                <span className="font-semibold">Prosedyre:</span>{" "}
                {protocol.procedure}
              </p>
              <p className="text-[10px] text-ink-50">
                <span className="font-semibold">Scoring:</span>{" "}
                {protocol.scoring}
              </p>
            </div>
          ))}
        </div>
      )}

      {targets && targets.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-30 mb-1.5">
            Malverdier
          </p>
          <div className="grid grid-cols-2 gap-2">
            {targets.map((target, i) => (
              <div key={i} className="text-[10px]">
                <span className="text-ink-50">{target.testName}: </span>
                <span className="font-semibold text-ink-70">
                  {target.currentCategoryTarget}
                </span>
                <span className="text-ink-30"> → </span>
                <span className="font-semibold text-emerald-600">
                  {target.nextCategoryTarget}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
