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
  const accentBorder = {
    gold: "border-gold/20",
    academy: "border-academy/20",
    junior: "border-junior/20",
    software: "border-software/20",
    utvikling: "border-utvikling/20",
  };

  return (
    <section className="bg-ink-100 w-section">
      <div className="w-container">
        <RevealOnScroll>
          <div className={`max-w-2xl mx-auto text-center border ${accentBorder[accent]} rounded-2xl p-10 md:p-16`}>
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
