"use client";

import { Fragment } from "react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
type Stat = { value: number; suffix: string; label: string; prefix: string };

const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "Års erfaring", prefix: "" },
  { value: 3, suffix: "", label: "Tour-spillere utviklet", prefix: "" },
  { value: 4.2, suffix: "", label: "Gjennomsnittlig hcp-forbedring", prefix: "" },
  { value: 97, suffix: "%", label: "Fornøydhetsgrad", prefix: "" },
];

function StatItem({ value, suffix, label, prefix }: Stat) {
  const { count, ref } = useAnimatedCounter(value, 2000);

  return (
    <div ref={ref} className="text-center px-4 md:px-8">
      <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-2 tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-40">{label}</div>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="hidden md:flex items-center justify-center shrink-0">
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="relative bg-gradient-to-b from-ink-100 via-ink-100 to-[#0d1f35] py-14 md:py-20 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-container relative">
        <div className="flex flex-wrap justify-center items-center gap-y-8">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              <StatItem {...stat} />
              {i < STATS.length - 1 && <GoldDivider />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
