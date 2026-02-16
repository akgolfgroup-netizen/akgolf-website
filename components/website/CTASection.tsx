import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionLabel } from "./SectionLabel";

export function CTASection({
  eyebrow = "Klar for neste steg?",
  heading,
  description,
  ctaLabel = "Søk om plass",
  ctaHref = "/#apply",
  accent = "gold",
}: {
  eyebrow?: string;
  heading: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: "gold" | "academy" | "junior" | "software" | "utvikling";
}) {
  const glowColor = {
    gold: "rgba(196, 151, 59, 0.08)",
    academy: "rgba(13, 148, 136, 0.08)",
    junior: "rgba(37, 99, 235, 0.08)",
    software: "rgba(124, 58, 237, 0.08)",
    utvikling: "rgba(217, 119, 6, 0.08)",
  };

  return (
    <section className="bg-ink-100 w-section relative overflow-hidden">
      {/* Radial glow behind card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none w-animate-glow-pulse"
        style={{ background: `radial-gradient(circle, ${glowColor[accent]} 0%, transparent 70%)` }}
      />

      <div className="w-container relative">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center rounded-2xl p-10 md:p-16 bg-ink-90/50 backdrop-blur-sm border border-white/[0.06]">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="w-heading-lg text-white mt-4 mb-4">{heading}</h2>
            <p className="text-ink-40 leading-relaxed mb-8">{description}</p>
            <Link href={ctaHref} className="w-btn w-btn-gold">
              {ctaLabel}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
