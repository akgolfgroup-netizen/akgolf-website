"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/website/RevealOnScroll";
import { StepHeader } from "./StepHeader";
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
      <StepHeader
        eyebrow="Steg 2"
        heading="Velg trener"
        description="Hvem ønsker du å trene med?"
      />

      <StaggerContainer className="grid gap-4 md:grid-cols-2">
        {instructors.map((instructor) => (
          <StaggerItem key={instructor.id}>
            <button
              onClick={() => onSelect(instructor)}
              className="w-service-card w-full flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-ink-05 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                <h3 className="w-heading-sm group-hover:text-gold transition-colors">
                  {instructor.user.name ?? "Trener"}
                </h3>
                {instructor.title && (
                  <p className="text-sm text-ink-50">{instructor.title}</p>
                )}
              </div>
            </button>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
