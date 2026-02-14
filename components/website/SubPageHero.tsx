"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const accentColors = {
  academy: "bg-academy",
  junior: "bg-junior",
  software: "bg-software",
  utvikling: "bg-utvikling",
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
  accent?: "academy" | "junior" | "software" | "utvikling" | "gold";
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Accent dot */}
      <div className={`absolute top-24 right-[10%] w-64 h-64 rounded-full ${accentColors[accent]} opacity-[0.03] blur-3xl`} />

      <div className="w-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-2 rounded-full ${accentColors[accent]}`} />
            <SectionLabel>{eyebrow}</SectionLabel>
          </div>
        </motion.div>

        <motion.h1
          className="w-heading-xl max-w-3xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heading}
        </motion.h1>

        <motion.p
          className="text-lg text-ink-50 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
