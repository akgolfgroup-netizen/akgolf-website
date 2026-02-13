"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { STATS } from "@/lib/website-constants";

function StatItem({ value, suffix, label, prefix }: typeof STATS[number]) {
  const { count, ref } = useAnimatedCounter(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl md:text-4xl font-medium text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-ink-40 tracking-wide">{label}</div>
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-ink-100 py-12 md:py-16">
      <div className="w-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
