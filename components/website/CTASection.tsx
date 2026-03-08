import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";

export function CTASection({
  eyebrow = "Klar for neste steg?",
  heading,
  description,
  ctaLabel = "Ta kontakt",
  ctaHref = "/#apply",
  accent = "gold",
}: {
  eyebrow?: string;
  heading: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: "gold" | "academy" | "junior" | "software";
}) {
  return (
    <section className="bg-ink-100 w-section-lg relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[80px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse, rgba(196,151,59,0.07) 0%, transparent 70%)" }}
      />

      <div className="w-container relative">
        <RevealOnScroll>
          <div className="max-w-2xl">
            {/* Gold accent line */}
            <div className="w-10 h-0.5 bg-gold mb-10 opacity-60" />

            <p className="w-eyebrow-light mb-6">{eyebrow}</p>

            <h2 className="w-heading-lg text-white mb-6">{heading}</h2>

            <p className="text-ink-40 leading-relaxed mb-10 text-lg max-w-xl">{description}</p>

            <Link href={ctaHref} className="w-btn w-btn-gold inline-flex items-center gap-2.5">
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
