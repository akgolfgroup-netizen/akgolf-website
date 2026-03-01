import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionLabel } from "./SectionLabel";

export function CTASection({
  eyebrow = "Klar for neste steg?",
  heading,
  description,
  ctaLabel = "Avtal en samtale",
  ctaHref = "/#apply",
}: {
  eyebrow?: string;
  heading: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-ink-100 w-section">
      <div className="w-container">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center rounded-2xl p-10 md:p-16 bg-ink-90">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="w-heading-lg text-white mt-4 mb-4">{heading}</h2>
            <p className="text-ink-40 leading-relaxed mb-8">{description}</p>
            <Link href={ctaHref} className="w-btn w-btn-primary">
              {ctaLabel}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
