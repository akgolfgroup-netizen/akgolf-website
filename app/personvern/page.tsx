"use client";

import Link from "next/link";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";

export default function PersonvernPage() {
  return (
    <>
      <WebsiteNav />

      <main className="pt-[52px]">
        <section className="w-section-lg">
          <div className="w-container max-w-3xl">
            <h1 className="w-heading-lg mb-8">Personvernerklæring</h1>

            <div className="prose prose-ink space-y-8 text-ink-60 text-sm leading-relaxed">
              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">1. Behandlingsansvarlig</h2>
                <p>
                  AK Golf Group er behandlingsansvarlig for personopplysninger som samles inn via dette nettstedet.
                  Kontakt oss på <a href="mailto:post@akgolf.no" className="text-gold-text hover:underline">post@akgolf.no</a> ved spørsmål om personvern.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">2. Hvilke opplysninger vi samler inn</h2>
                <p>
                  Når du sender en søknad via kontaktskjemaet vårt, samler vi inn navn, e-postadresse,
                  telefonnummer, handicap og eventuell melding du inkluderer. Vi samler ikke inn
                  opplysninger utover det du selv oppgir.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">3. Formål med behandlingen</h2>
                <p>
                  Opplysningene brukes utelukkende for å behandle din henvendelse, kontakte deg
                  angående våre tjenester, og gi deg relevant informasjon om programmer du har vist
                  interesse for.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">4. Lagring og sikkerhet</h2>
                <p>
                  Personopplysninger lagres sikkert og slettes når de ikke lenger er nødvendige for
                  formålet de ble samlet inn for. Vi deler ikke dine opplysninger med tredjeparter
                  uten ditt samtykke.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">5. Dine rettigheter</h2>
                <p>
                  Du har rett til innsyn, retting og sletting av dine personopplysninger. Du kan også
                  kreve begrensning av behandlingen eller protestere mot den. Kontakt oss
                  på <a href="mailto:post@akgolf.no" className="text-gold-text hover:underline">post@akgolf.no</a> for å utøve dine rettigheter.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">6. Informasjonskapsler</h2>
                <p>
                  Dette nettstedet bruker nødvendige informasjonskapsler for grunnleggende
                  funksjonalitet. Dersom du godtar alle informasjonskapsler, kan vi også bruke
                  analyseverktøy for å forbedre nettstedet. Du kan når som helst endre dine
                  preferanser ved å slette informasjonskapsler i nettleseren.
                </p>
              </div>

              <div>
                <h2 className="w-heading-sm text-ink-90 mb-3">7. Endringer</h2>
                <p>
                  Denne personvernerklæringen kan oppdateres. Vesentlige endringer vil bli kommunisert
                  via nettstedet.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-ink-10">
              <Link href="/" className="text-sm text-gold hover:underline">
                &larr; Tilbake til forsiden
              </Link>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </>
  );
}
