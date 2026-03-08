"use client";

import Link from "next/link";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { SubPageHero } from "@/components/website/SubPageHero";
import { SectionLabel } from "@/components/website/SectionLabel";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/website/RevealOnScroll";
import { BackToTop } from "@/components/website/BackToTop";
import { PageTransition } from "@/components/website/PageTransition";
import { CTASection } from "@/components/website/CTASection";

const FEATURES = [
  {
    icon: "📱",
    title: "QR-koder på hvert skilt",
    description: "Spillerne scanner QR-koden og får umiddelbar tilgang til øvelser, videoer og instruksjoner tilpasset sin posisjon på rangen.",
  },
  {
    icon: "🎯",
    title: "AK Golf-metodikk",
    description: "Innholdet er bygget på AK-formelen og AK Golf sin proprietære treningsmetodikk. Kvalitet som er testet og bevist.",
  },
  {
    icon: "✏️",
    title: "Tilpasset din klubb",
    description: "Velg øvelser, kategorier og nivåer som passer din klubbs profil og spillergruppe. Full kontroll over innholdet.",
  },
  {
    icon: "📊",
    title: "Innsikt og analyse",
    description: "Se hvilke stasjoner som brukes mest, hvilke øvelser som er populære, og mål engasjementet blant klubbens spillere.",
  },
  {
    icon: "🌐",
    title: "Alltid oppdatert",
    description: "Innholdet oppdateres i skyen — ingen fysisk utskifting av skilt nødvendig. Nye øvelser og justeringer skjer med ett klikk.",
  },
  {
    icon: "🛠️",
    title: "Enkel installasjon",
    description: "Robust, værtålige skilt designet for utendørs bruk. Installasjon og oppsett tar under én dag.",
  },
] as const;

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Velg pakke",
    description: "Velg antall skilt og stasjoner basert på rangens størrelse og klubbens behov.",
  },
  {
    number: "02",
    title: "Tilpass innholdet",
    description: "Sett opp øvelser og kategorier i admin-panelet. Vi hjelper deg i gang.",
  },
  {
    number: "03",
    title: "Installer og aktiver",
    description: "Monter skiltene på rangen og aktiver QR-kodene. Spillerne kan begynne å bruke systemet umiddelbart.",
  },
] as const;

export default function QrSkiltPage() {
  return (
    <>
      <WebsiteNav />

      <main id="main-content">
        <PageTransition>
          {/* ─── Hero ─── */}
          <SubPageHero
            eyebrow="QR Treningsskilt"
            heading="Gjør rangen til et interaktivt treningssenter."
            description="Digitale treningsskilt med QR-koder gir spillerne tilgang til øvelser, videoer og instruksjoner direkte på rangen — basert på AK Golf sin metodikk."
            accent="gold"
          />

          {/* ─── Social proof strip ─── */}
          <section className="bg-surface-cream border-y border-ink-10">
            <div className="w-container py-8">
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "40+", label: "golfklubber" },
                  { value: "200+", label: "skilt installert" },
                  { value: "95%", label: "spillertilfredshet" },
                  { value: "5★", label: "anmeldelser" },
                ].map((stat) => (
                  <StaggerItem key={stat.label}>
                    <span className="font-mono text-2xl md:text-3xl font-medium text-ink-90">{stat.value}</span>
                    <p className="text-xs text-ink-40 mt-1">{stat.label}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ─── Features ─── */}
          <section className="w-section-lg">
            <div className="w-container">
              <RevealOnScroll>
                <div className="text-center mb-12">
                  <SectionLabel>Hva du får</SectionLabel>
                  <h2 className="w-heading-lg mt-4">Alt rangen din trenger for å engasjere spillerne.</h2>
                </div>
              </RevealOnScroll>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <div className="w-card h-full">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 text-xl">
                        {feature.icon}
                      </div>
                      <h3 className="font-display text-base font-semibold text-ink-90 mb-2">{feature.title}</h3>
                      <p className="text-sm text-ink-50 leading-relaxed">{feature.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ─── How it works ─── */}
          <section className="w-section-lg bg-surface-cream">
            <div className="w-container">
              <RevealOnScroll>
                <div className="text-center mb-12">
                  <SectionLabel>Slik fungerer det</SectionLabel>
                  <h2 className="w-heading-lg mt-4">Fra bestilling til aktiv range.</h2>
                </div>
              </RevealOnScroll>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {HOW_IT_WORKS.map((step) => (
                  <StaggerItem key={step.number}>
                    <div className="w-card h-full text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 font-mono text-lg font-bold text-gold-text mb-4">
                        {step.number}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-ink-90 mb-3">{step.title}</h3>
                      <p className="text-sm text-ink-50 leading-relaxed">{step.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ─── CTA ─── */}
          <CTASection
            eyebrow="Klar for å komme i gang?"
            heading="Gi spillerne dine strukturert trening på rangen."
            description="Se demo, les priser og bestill direkte på trening.akgolf.no."
            accent="gold"
            ctaHref="https://trening.akgolf.no"
            ctaLabel="Se demo på trening.akgolf.no"
          />

          {/* ─── Secondary CTA ─── */}
          <section className="w-section bg-surface-warm">
            <div className="w-container">
              <RevealOnScroll>
                <div className="text-center">
                  <p className="text-ink-50 mb-6">
                    Spørsmål om QR Treningsskilt? Ta kontakt med oss direkte.
                  </p>
                  <Link href="/coaching#apply" className="w-btn w-btn-ghost">
                    Kontakt oss
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
