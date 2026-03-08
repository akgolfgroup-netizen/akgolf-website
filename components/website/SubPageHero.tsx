"use client";

import { motion } from "framer-motion";

const accentDotColors = {
  academy: "bg-academy",
  junior: "bg-junior",
  software: "bg-software",
  gold: "bg-gold",
};

export function SubPageHero({
  eyebrow,
  heading,
  description,
  accent = "academy",
}: {
  eyebrow: string;
  heading: string;
  description: string;
  accent?: "academy" | "junior" | "software" | "gold";
}) {
  return (
    <section className="relative min-h-[65vh] flex items-end pt-[56px] pb-20 md:pb-28 overflow-hidden bg-surface-warm">
      {/* Radial gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(196,151,59,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className={`absolute top-24 right-[8%] w-[500px] h-[500px] rounded-full ${accentDotColors[accent]} opacity-[0.025] blur-[100px]`}
        />
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,151,59,0.25) 40%, rgba(196,151,59,0.25) 60%, transparent)",
        }}
      />

      <div className="w-container relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2.5 mb-8">
            <span className={`w-1.5 h-1.5 rounded-full ${accentDotColors[accent]}`} />
            <span className="w-eyebrow">{eyebrow}</span>
          </div>
        </motion.div>

        <motion.h1
          className="w-heading-xl max-w-4xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.h1>

        <motion.p
          className="text-lg text-ink-50 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>

        {/* Horizontal accent line */}
        <motion.div
          className="mt-14 w-12 h-px"
          style={{
            background: "linear-gradient(90deg, rgba(196,151,59,0.5), transparent)",
            transformOrigin: "left",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
}
