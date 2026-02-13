"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FORMSPREE_ENDPOINT } from "@/lib/website-constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ApplicationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-card max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forest">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="w-heading-sm mb-2">Søknad mottatt!</h3>
            <p className="text-sm text-ink-50">Vi tar kontakt innen 48 timer for å avtale en samtale.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="w-label">Navn *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-input"
                  placeholder="Ditt fulle navn"
                />
              </div>
              <div>
                <label htmlFor="email" className="w-label">E-post *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-input"
                  placeholder="din@epost.no"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="w-label">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-input"
                  placeholder="+47"
                />
              </div>
              <div>
                <label htmlFor="handicap" className="w-label">Nåværende handicap</label>
                <input
                  type="text"
                  id="handicap"
                  name="handicap"
                  className="w-input"
                  placeholder="F.eks. 18"
                />
              </div>
            </div>

            <div>
              <label htmlFor="program" className="w-label">Program</label>
              <select id="program" name="program" className="w-select">
                <option value="">Velg program</option>
                <optgroup label="Academy">
                  <option value="academy-grunn">Grunnpakke</option>
                  <option value="academy-utvikling">Utviklingspakke</option>
                  <option value="academy-elite">Elite</option>
                </optgroup>
                <optgroup label="Junior Academy">
                  <option value="junior-13-15">Junior 13–15 år</option>
                  <option value="junior-16-17">Junior 16–17 år</option>
                  <option value="junior-18-19">Junior 18–19 år</option>
                </optgroup>
                <optgroup label="Utvikling">
                  <option value="klubb">Klubbtrening & Rådgiving</option>
                  <option value="software">Software & Verktøy</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="w-label">Melding</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-input resize-none"
                placeholder="Fortell oss om dine mål og ambisjoner..."
              />
            </div>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600"
              >
                Noe gikk galt. Prøv igjen eller send e-post til post@akgolf.no.
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-btn w-btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sender..." : "Send søknad"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
