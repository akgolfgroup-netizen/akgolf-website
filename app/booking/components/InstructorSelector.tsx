"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Instructor } from "../types";

interface Props {
  instructors: Instructor[];
  onSelect: (instructor: Instructor) => void;
}

export function InstructorSelector({ instructors, onSelect }: Props) {
  // If only one instructor, auto-select
  if (instructors.length === 1) {
    onSelect(instructors[0]);
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy mb-2">Velg trener</h2>
      <p className="text-ink-50 mb-8">Hvem ønsker du å trene med?</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {instructors.map((instructor, i) => (
          <motion.button
            key={instructor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(instructor)}
            className="group flex items-center gap-4 rounded-2xl border border-ink-20 bg-white p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center overflow-hidden flex-shrink-0">
              {instructor.user.image ? (
                <Image
                  src={instructor.user.image}
                  alt={instructor.user.name ?? "Trener"}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-navy">
                  {(instructor.user.name ?? "T").charAt(0)}
                </span>
              )}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-navy group-hover:text-gold transition-colors">
                {instructor.user.name ?? "Trener"}
              </h3>
              {instructor.title && (
                <p className="text-sm text-ink-50">{instructor.title}</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
