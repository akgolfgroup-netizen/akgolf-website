"use client";

import Link from "next/link";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { SubPageHero } from "@/components/website/SubPageHero";
import { SectionLabel } from "@/components/website/SectionLabel";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/website/RevealOnScroll";
import { FeatureGrid } from "@/components/website/FeatureGrid";
import { FeaturedTestimonial } from "@/components/website/FeaturedTestimonial";
import { FAQAccordion } from "@/components/website/FAQAccordion";
import { CTASection } from "@/components/website/CTASection";
import { ApplicationForm } from "@/components/website/ApplicationForm";
import { ImagePlaceholder } from "@/components/website/ImagePlaceholder";
import { RelatedPages } from "@/components/website/RelatedPages";
import { BackToTop } from "@/components/website/BackToTop";
import { PageTransition } from "@/components/website/PageTransition";
import {
  ACADEMY_FEATURES,
  ACADEMY_FAQ,
  TESTIMONIALS,
  COACHING_GROUP_OFFERINGS,
  COACHING_BUSINESS_OFFERINGS,
} from "@/lib/website-constants";

export default function CoachingPage() {
  return (
    <>
      <WebsiteNav />

      <main id="main-content">
        <PageTransition>
        {/* ─── Hero ─── */}
        <SubPageHero
          eyebrow="AK Golf Coaching"
          heading="Din sving. Din plan. Dine resultater."
          description="Individuell coaching, gruppetimer og bedriftsgolf for voksne spillere som vil ta spillet til neste nivå. Evidensbasert, personlig og med dokumenterte resultater."
          accent="academy"
        />

        {/* ─── Philosophy ─── */}
        <section className="w-section bg-surface-warm">
          <div className="w-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <RevealOnScroll>
                <div>
                  <SectionLabel>Vår tilnærming</SectionLabel>
                  <h2 className="w-heading-lg mt-4 mb-6">
                    Ingen to spillere er like.<br />
                    <span className="text-ink-40">Hvorfor skal treningen være det?</span>
                  </h2>
                  <p className="text-ink-50 leading-relaxed mb-4">
                    I AK Golf Coaching starter alt med deg. Vi analyserer spillet ditt fra alle vinkler — teknikk, strategi, mentalt spill og fysikk — for å bygge en plan som er 100% tilpasset dine mål og ditt utgangspunkt.
                  </p>
                  <p className="text-ink-50 leading-relaxed">
                    Vår evidensbaserte metode kombinerer det beste fra moderne golftreningsforskning med praktisk erfaring fra coaching på alle nivåer, fra nybegynner til tour-spiller. For unge spillere, se vårt <Link href="/junior" className="text-academy underline underline-offset-2 hover:text-academy/80 transition-colors">Junior Academy</Link>.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <ImagePlaceholder aspect="4/3" src="/images/academy/AK-Golf-Academy-2.jpg" label="Academy coaching" />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ─── Section 1: Akademi 1:1 ─── */}
        <section className="w-section-lg">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <SectionLabel>Akademi 1:1</SectionLabel>
                <h2 className="w-heading-lg mt-4">Alt du trenger for å nå dine mål.</h2>
              </div>
            </RevealOnScroll>

            <FeatureGrid features={ACADEMY_FEATURES} columns={3} />
          </div>
        </section>

        {/* ─── AK Method for Adults ─── */}
        <section className="w-section-lg bg-surface-cream">
          <div className="w-container">
            <RevealOnScroll>
              <SectionLabel>AK-metoden for voksne</SectionLabel>
              <h2 className="w-heading-lg mt-4 mb-6">Systematisk forbedring. Målbare resultater.</h2>
              <p className="text-ink-50 max-w-2xl leading-relaxed mb-12">
                Vår metode er bygget på tre pilarer som sammen skaper varig forbedring. Uansett om du er nybegynner eller erfaren, tilpasser vi intensiteten og fokuset etter ditt nivå.
              </p>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Teknisk analyse",
                  description: "Grundig analyse av sving, kontakt og bevegelsesmønster med avansert videoteknologi. Klare, konkrete tilbakemeldinger du kan handle på.",
                },
                {
                  number: "02",
                  title: "Strategisk spill",
                  description: "Kursmanagement, slagvalg og situasjonsanalyse. Lær deg å ta smartere beslutninger på banen — ikke bare slå hardere.",
                },
                {
                  number: "03",
                  title: "Mental styrke",
                  description: "Rutiner, fokus og prestasjon under press. Det mentale spillet er det som skiller gode spillere fra de som virkelig leverer.",
                },
              ].map((item) => (
                <StaggerItem key={item.number}>
                  <div className="w-card h-full">
                    <span className="font-mono text-2xl text-gold font-medium">{item.number}</span>
                    <h3 className="font-display text-lg font-semibold text-ink-90 mt-3 mb-3">{item.title}</h3>
                    <p className="text-sm text-ink-50 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Section 2: Gruppetimer & Kurs ─── */}
        <section id="gruppetimer" className="w-section-lg bg-surface-warm">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <SectionLabel>Gruppetimer & kurs</SectionLabel>
                <h2 className="w-heading-lg mt-4 mb-4">Lær mer. Kos deg mer.</h2>
                <p className="text-ink-50 max-w-lg mx-auto">
                  Lær i fellesskap med andre ambisiøse spillere. Temabaserte klinics, intensive weekend-kurs og online coaching — tilpasset deg som vil ha struktur uten å binde seg til 1:1.
                </p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COACHING_GROUP_OFFERINGS.map((offering, i) => (
                <StaggerItem key={offering.title}>
                  <div className="w-card h-full">
                    <span className="font-mono text-2xl text-gold font-medium">0{i + 1}</span>
                    <h3 className="font-display text-lg font-semibold text-ink-90 mt-3 mb-3">{offering.title}</h3>
                    <p className="text-sm text-ink-50 leading-relaxed mb-4">{offering.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {offering.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-ink-05 text-ink-50 px-2 py-1 rounded-full border border-ink-10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <RevealOnScroll>
              <div className="mt-10 text-center">
                <Link href="#apply" className="w-btn w-btn-ghost">
                  Spør om neste kurs
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── Section 3: Bedriftsgolf & Events ─── */}
        <section id="bedrift" className="w-section-lg">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <SectionLabel>Bedriftsgolf & events</SectionLabel>
                <h2 className="w-heading-lg mt-4 mb-4">Golf som teambuilding.</h2>
                <p className="text-ink-50 max-w-lg mx-auto">
                  Fra bedriftslunsj på banen til turneringscoaching og strategiske lag-events. Vi skreddersyr opplevelsen for din bedrift og ditt lag.
                </p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COACHING_BUSINESS_OFFERINGS.map((offering, i) => (
                <StaggerItem key={offering.title}>
                  <div className="w-card h-full">
                    <span className="font-mono text-2xl text-gold font-medium">0{i + 1}</span>
                    <h3 className="font-display text-lg font-semibold text-ink-90 mt-3 mb-3">{offering.title}</h3>
                    <p className="text-sm text-ink-50 leading-relaxed mb-4">{offering.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {offering.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-ink-05 text-ink-50 px-2 py-1 rounded-full border border-ink-10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <RevealOnScroll>
              <div className="mt-10 text-center">
                <Link href="#apply" className="w-btn w-btn-ghost">
                  Ta kontakt om bedriftspakke
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── How We Work Together ─── */}
        <section className="w-section-lg bg-surface-cream">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <SectionLabel>Din reise</SectionLabel>
                <h2 className="w-heading-lg mt-4 mb-4">Coaching tilpasset deg.</h2>
                <p className="text-ink-50 max-w-lg mx-auto">
                  Hvert samarbeid starter med en samtale. Sammen definerer vi mål, omfang og frekvens — skreddersydd for akkurat deg.
                </p>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Innledende samtale",
                  description: "En uforpliktende prat der vi blir kjent, kartlegger ditt nivå og forstår dine ambisjoner.",
                },
                {
                  number: "02",
                  title: "Analyse & plan",
                  description: "Grundig analyse av spillet ditt — teknikk, strategi og mentalt. Du får en personlig utviklingsplan med klare mål.",
                },
                {
                  number: "03",
                  title: "Coaching & oppfølging",
                  description: "Regelmessige økter med din trener, kontinuerlig justering av planen, og støtte mellom øktene.",
                },
              ].map((item) => (
                <StaggerItem key={item.number}>
                  <div className="w-card h-full">
                    <span className="font-mono text-2xl text-gold font-medium">{item.number}</span>
                    <h3 className="font-display text-lg font-semibold text-ink-90 mt-3 mb-3">{item.title}</h3>
                    <p className="text-sm text-ink-50 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <RevealOnScroll>
              <div className="mt-12 text-center flex flex-wrap gap-4 justify-center">
                <Link href="#apply" className="w-btn w-btn-primary">
                  Book en samtale
                </Link>
                <Link href="/portal/bookinger" className="w-btn w-btn-ghost">
                  Se dine bookinger
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="bg-ink-100 w-section w-section-dark">
          <div className="w-container">
            <RevealOnScroll>
              <SectionLabel>Fra våre elever</SectionLabel>
              <h2 className="w-heading-lg text-white mt-4 mb-12">De som har opplevd det.</h2>
            </RevealOnScroll>

            <FeaturedTestimonial
              quote={TESTIMONIALS[0].quote}
              name={TESTIMONIALS[0].name}
              role={TESTIMONIALS[0].role}
            />
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="w-section-lg">
          <div className="w-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <RevealOnScroll>
                <div className="lg:sticky lg:top-24">
                  <SectionLabel>Spørsmål & svar</SectionLabel>
                  <h2 className="w-heading-lg mt-4">
                    Ofte stilte<br />spørsmål.
                  </h2>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <FAQAccordion items={ACADEMY_FAQ} />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <CTASection
          eyebrow="Klar for å starte?"
          heading="Klar for å starte?"
          description="Ta første steg mot ditt beste spill. Vi tar kontakt innen 48 timer."
          accent="academy"
          ctaHref="#apply"
        />

        {/* ─── Application Form ─── */}
        <section id="apply" className="w-section-lg bg-surface-cream">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <SectionLabel>Ta kontakt</SectionLabel>
                <h2 className="w-heading-lg mt-4 mb-4">La oss snakkes.</h2>
                <p className="text-ink-50 max-w-lg mx-auto">
                  Fyll ut skjemaet under, så tar vi kontakt innen 48 timer for en uforpliktende samtale.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <ApplicationForm defaultProgram="coaching" />
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── Related Pages ─── */}
        <RelatedPages exclude="coaching" />
        </PageTransition>
      </main>

      <BackToTop />
      <WebsiteFooter />
    </>
  );
}
