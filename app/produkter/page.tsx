"use client";

import Link from "next/link";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { SubPageHero } from "@/components/website/SubPageHero";
import { SectionLabel } from "@/components/website/SectionLabel";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/website/RevealOnScroll";
import { BackToTop } from "@/components/website/BackToTop";
import { PageTransition } from "@/components/website/PageTransition";
import { PRODUKTER_CARDS } from "@/lib/website-constants";

const accentClasses = {
  gold: "border-gold/30 bg-gold/5",
  software: "border-software/30 bg-software/5",
  academy: "border-academy/30 bg-academy/5",
} as const;

const badgeClasses = {
  gold: "bg-gold/10 text-gold-text border-gold/20",
  software: "bg-software/10 text-software border-software/20",
  academy: "bg-academy/10 text-academy border-academy/20",
} as const;

export default function ProdukterPage() {
  return (
    <>
      <WebsiteNav />

      <main id="main-content">
        <PageTransition>
          {/* ─── Hero ─── */}
          <SubPageHero
            eyebrow="AK Golf Produkter"
            heading="Digitale verktøy for golf."
            description="Fra AI-genererte treningsplaner til QR-treningsskilt og merkevare-analyse. Teknologi som løfter golfen — for deg og for klubben din."
            accent="gold"
          />

          {/* ─── Product Cards ─── */}
          <section className="w-section-lg">
            <div className="w-container">
              <RevealOnScroll>
                <div className="text-center mb-12">
                  <SectionLabel>Våre produkter</SectionLabel>
                  <h2 className="w-heading-lg mt-4">Tre verktøy. Én ambisjon.</h2>
                </div>
              </RevealOnScroll>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRODUKTER_CARDS.map((product) => (
                  <StaggerItem key={product.id}>
                    <Link href={product.href} className="group block h-full">
                      <div className={`w-card h-full flex flex-col border ${accentClasses[product.accent]} hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1`}>
                        <div className="flex items-start justify-between mb-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeClasses[product.accent]}`}>
                            {product.badge}
                          </span>
                        </div>
                        <h3 className="w-heading-sm mb-3 group-hover:text-gold transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-sm text-ink-50 leading-relaxed flex-1 mb-6">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-ink-70 group-hover:text-ink-90 transition-colors duration-300 mt-auto">
                          Se mer
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ─── Philosophy Strip ─── */}
          <section className="w-section bg-ink-100 w-section-dark">
            <div className="w-container">
              <RevealOnScroll>
                <div className="max-w-2xl mx-auto text-center">
                  <SectionLabel>Vår tilnærming</SectionLabel>
                  <h2 className="w-heading-lg text-white mt-4 mb-6">
                    Teknologi i tjeneste for golf.
                  </h2>
                  <p className="text-ink-30 leading-relaxed">
                    Vi bygger verktøy som gjør det enklere å trene smartere, lære raskere og prestere bedre — enten du er en ambisiøs spiller, en golfklubb som vil løfte tilbudet sitt, eller en trener som vil effektivisere arbeidsflyten.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="w-section bg-surface-warm">
            <div className="w-container">
              <RevealOnScroll>
                <div className="text-center">
                  <SectionLabel>Trenger du hjelp?</SectionLabel>
                  <h2 className="w-heading-lg mt-4 mb-4">Ikke sikker på hva som passer deg?</h2>
                  <p className="text-ink-50 max-w-lg mx-auto mb-8">
                    Ta kontakt, så hjelper vi deg å finne riktig verktøy for dine behov.
                  </p>
                  <Link href="/coaching#apply" className="w-btn w-btn-primary">
                    Ta kontakt
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </section>
        </PageTransition>
      </main>

      <BackToTop />
      <WebsiteFooter />
    </>
  );
}
