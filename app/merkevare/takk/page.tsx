"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { BackToTop } from "@/components/website/BackToTop";

export default function MerkevareTakkPage() {
  return (
    <>
      <WebsiteNav />

      <main id="main-content">
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 min-h-[70vh] flex items-center">
          {/* Gradient mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-24 right-[10%] w-[400px] h-[400px] rounded-full bg-gold opacity-[0.03] blur-[80px]" />
            <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] rounded-full bg-gold opacity-[0.02] blur-[60px]" />
          </div>

          <div className="w-container relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="w-heading-lg mb-4">Takk for din henvendelse!</h1>

              <p className="text-lg text-ink-50 leading-relaxed mb-3">
                Vi har mottatt logoen og informasjonen om klubben din.
              </p>

              <p className="text-ink-50 leading-relaxed mb-8">
                Du mottar din merkevare-analyse med farger, typografi og logo-regler
                innen <strong className="text-ink-80">24 timer</strong> — helt gratis.
              </p>

              <div className="w-card p-6 mb-8 text-left">
                <h3 className="font-display text-sm font-semibold text-ink-90 mb-3">Hva skjer nå?</h3>
                <ol className="space-y-2 text-sm text-ink-50">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-gold mt-0.5">01</span>
                    <span>Vi analyserer logoen og merkevaren din</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-gold mt-0.5">02</span>
                    <span>En komplett merkevare-analyse genereres</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-gold mt-0.5">03</span>
                    <span>Du mottar en forhåndsvisning på e-post</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/" className="w-btn w-btn-secondary">
                  Tilbake til forsiden &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <BackToTop />
      <WebsiteFooter />
    </>
  );
}
