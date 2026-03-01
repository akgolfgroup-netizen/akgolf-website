"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { AKLogo } from "@/components/website/AKLogo";
import { SectionLabel } from "@/components/website/SectionLabel";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/website/RevealOnScroll";
import { CredentialsStrip } from "@/components/website/CredentialsStrip";
import { ServiceCard } from "@/components/website/ServiceCard";
import { MethodRow } from "@/components/website/MethodRow";
import { FeaturedTestimonial } from "@/components/website/FeaturedTestimonial";
import { TestimonialCard } from "@/components/website/TestimonialCard";
import { CTASection } from "@/components/website/CTASection";
import { ProcessSteps } from "@/components/website/ProcessSteps";
import { ApplicationForm } from "@/components/website/ApplicationForm";
import { ImagePlaceholder } from "@/components/website/ImagePlaceholder";
import { BackToTop } from "@/components/website/BackToTop";
import { Marquee } from "@/components/website/Marquee";
import {
  HERO,
  DIVISIONS,
  METHOD_PILLARS,
  FOUNDER,
  TESTIMONIALS,
  VALUES,
} from "@/lib/website-constants";

// ─── Loader ───
function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink-100 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AKLogo variant="gold" size={48} />
      <div className="mt-8 w-48 h-[2px] bg-ink-80 rounded-full overflow-hidden">
        <div className="h-full bg-gold w-animate-loader rounded-full" />
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("akgolf_visited")) {
      return false;
    }
    return true;
  });

  function handleLoaderComplete() {
    sessionStorage.setItem("akgolf_visited", "1");
    setLoading(false);
  }

  return (
    <>
      <AnimatePresence>{loading && <Loader onComplete={handleLoaderComplete} />}</AnimatePresence>

      <WebsiteNav />

      <main id="main-content">
        {/* ─── 1. Hero ─── */}
        <section className="relative min-h-screen flex items-center pt-[52px]">
          {/* Hero background image */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/images/hero/hero-main.jpg"
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink-100/85 via-ink-100/60 to-ink-100/30" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-warm to-transparent" />
          </div>

          <div className="w-container relative w-full">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <SectionLabel>{HERO.eyebrow}</SectionLabel>
              </motion.div>

              <motion.h1
                className="w-heading-xl mt-6 mb-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 40 : 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {HERO.heading}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-ink-20 max-w-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {HERO.subheading}
              </motion.p>

              {/* Location badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-xs text-gold-text font-medium">{HERO.locationBadge}</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Link href="/#apply" className="w-btn w-btn-primary">{HERO.ctaPrimary}</Link>
                <Link href="/#method" className="w-btn w-btn-ghost">{HERO.ctaSecondary}</Link>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                className="flex flex-wrap gap-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {HERO.trustItems.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs text-ink-30">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 2. Credentials Strip ─── */}
        <CredentialsStrip />

        {/* ─── 2b. Marquee ─── */}
        <Marquee />

        {/* ─── 3. Story / Philosophy ─── */}
        <section id="story" className="w-section-lg bg-surface-warm">
          <div className="w-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <RevealOnScroll>
                <div className="lg:sticky lg:top-24">
                  <SectionLabel>Vår historie</SectionLabel>
                  <h2 className="w-heading-lg mt-4 mb-6">
                    Golf er ikke bare en sport.<br />
                    <span className="text-ink-40">Det er en livslang reise.</span>
                  </h2>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div>
                  <blockquote className="text-lg text-ink-60 leading-relaxed mb-8 border-l-2 border-gold pl-6">
                    &ldquo;Jeg grunnla AK Golf Group med en enkel overbevisning: at hver spiller fortjener en tilnærming som er like unik som deres sving. Standardløsninger gir standardresultater. Vi lever etter en annen standard.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-ink-10 overflow-hidden relative">
                      <Image
                        src="/images/academy/AK-Golf-Academy-5.jpg"
                        alt="Anders Kristiansen"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink-80">Anders Kristiansen</p>
                      <p className="text-xs text-ink-40">Grunnlegger & Head Pro</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ─── 4. Services Grid ─── */}
        <section className="w-section-lg">
          <div className="w-container">
            <RevealOnScroll>
              <SectionLabel>Våre divisjoner</SectionLabel>
              <h2 className="w-heading-lg mt-4 mb-12">Alt du trenger. Under ett tak.</h2>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DIVISIONS.map((div) => (
                <StaggerItem key={div.id}>
                  <ServiceCard
                    title={div.title}
                    description={div.description}
                    features={div.features}
                    href={div.href}
                    accent={div.accent}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── 6. Method ─── */}
        <section id="method" className="w-section-lg bg-surface-warm">
          <div className="w-container">
            <RevealOnScroll>
              <SectionLabel>Vår metode</SectionLabel>
              <h2 className="w-heading-lg mt-4 mb-16">
                Tre pilarer.<br />
                <span className="text-ink-40">Ett system.</span>
              </h2>
            </RevealOnScroll>

            <div className="space-y-16">
              {METHOD_PILLARS.map((pillar, i) => (
                <MethodRow
                  key={pillar.number}
                  number={pillar.number}
                  title={pillar.title}
                  subtitle={pillar.subtitle}
                  description={pillar.description}
                  image={pillar.image}
                  reversed={i % 2 === 1}
                />
              ))}
            </div>

            {/* Values — integrated into method section */}
            <RevealOnScroll>
              <div className="mt-24 pt-16 border-t border-ink-10">
                <p className="font-mono text-xs tracking-widest uppercase text-gold-text mb-8">Våre verdier</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {VALUES.map((value) => (
                    <div key={value.number}>
                      <span className="font-mono text-sm text-gold-text">{value.number}</span>
                      <h4 className="font-display text-base font-semibold text-ink-80 mt-1 mb-2">{value.title}</h4>
                      <p className="text-xs text-ink-50 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── 6b. Founder ─── */}
        <section className="w-section-lg">
          <div className="w-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <RevealOnScroll>
                <div>
                  <SectionLabel>Din trener</SectionLabel>
                  <h2 className="w-heading-lg mt-4 mb-6">
                    {FOUNDER.name}
                  </h2>
                  <p className="text-xs font-mono text-gold-text uppercase tracking-wider mb-6">
                    {FOUNDER.title} · {FOUNDER.experience} års erfaring
                  </p>
                  {FOUNDER.bio.map((paragraph, i) => (
                    <p key={i} className="text-ink-50 leading-relaxed mb-4 last:mb-6">
                      {paragraph}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-2">
                    {FOUNDER.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs font-medium text-gold-text transition-all duration-200 hover:scale-105 hover:bg-gold/15"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <ImagePlaceholder aspect="3/4" src="/images/academy/AK-Golf-Academy-5.jpg" label="Anders Kristiansen" />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ─── 7. Testimonials ─── */}
        <section className="bg-ink-100 w-section-lg w-section-dark">
          <div className="w-container">
            <RevealOnScroll>
              <SectionLabel>Hva elevene sier</SectionLabel>
              <h2 className="w-heading-lg text-white mt-4 mb-16">Resultater du kan høre.</h2>
            </RevealOnScroll>

            {/* Featured */}
            {TESTIMONIALS.filter(t => t.featured).map(t => (
              <FeaturedTestimonial key={t.name} quote={t.quote} name={t.name} role={t.role} photo={t.photo || undefined} />
            ))}

            {/* Grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.filter(t => !t.featured).map(t => (
                <StaggerItem key={t.name}>
                  <TestimonialCard quote={t.quote} name={t.name} role={t.role} photo={t.photo || undefined} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── 8. CTA ─── */}
        <CTASection
          eyebrow="Neste steg"
          heading="Klar for å ta spillet videre?"
          description="Vi starter alltid med en uforpliktende samtale for å forstå dine mål og finne ut om vi er riktig match."
        />

        {/* ─── 9. Final CTA — Application Process ─── */}
        <section id="apply" className="w-section-lg bg-surface-cream">
          <div className="w-container">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <SectionLabel>Slik kommer du i gang</SectionLabel>
                <h2 className="w-heading-lg mt-4 mb-4">Start med en samtale.</h2>
                <p className="text-ink-50 max-w-lg mx-auto">
                  Prosessen er enkel, men grundig. Vi vil forsikre oss om at vi er riktig match for hverandre.
                </p>
              </div>
            </RevealOnScroll>

            <ProcessSteps />

            <RevealOnScroll delay={0.4}>
              <div className="mt-12">
                <ApplicationForm />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <BackToTop />
      <WebsiteFooter />
    </>
  );
}
