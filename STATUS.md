# AK Golf Website — Status & Arbeidsoppgaver

> Sist oppdatert: 2026-02-24

---

## Nettside-status

| Område | Status |
|---|---|
| Kodebase / teknisk fundament | Ferdig |
| Design / visuell profil | Ferdig — alignet med brand guidelines |
| Brand guidelines alignment | Ferdig |
| Innhold (tekst) | Ferdig (placeholder-data) |
| Bilder | Delvis ferdig — 44 academy-bilder koblet til 7 plassholdere + founder |
| Skjema-integrasjon | Funksjonelt — Next.js API routes med Resend (trenger API-nøkkel) |
| Kontaktinfo | Placeholder (telefon, adresse) |
| SEO | Metadata, sitemap, robots.txt, OG-tags, Twitter Card, JSON-LD (LocalBusiness, FAQPage) |
| Lansering | Ikke klar |

---

## Arbeidsoppgaver

### CRITICAL — Må fikses før lansering

#### 1. ~~Koble opp kontaktskjema~~ FERDIG
- [x] Erstattet Formspree med egne Next.js API routes (`/api/contact`, `/api/newsletter`)
- [x] Installert Resend for e-postsending
- [x] Server-side validering av e-post og påkrevde felt
- [x] Graceful fallback til console.log når Resend API-nøkkel mangler
- [ ] Sett inn ekte Resend API-nøkkel i `.env.local` (`RESEND_API_KEY`)
- [ ] Verifiser domene i Resend for sending fra `noreply@akgolf.no`

#### 2. ~~Erstatt alle bildeplassholdere med ekte foto~~ FERDIG
- [x] 44 academy-bilder lagt til i `public/images/academy/`
- [x] Bilder koblet til alle 7 ImagePlaceholder-steder + founder-monogram
- [x] Method-pilarer: AK-Formelen (#1), Utviklingsplan (#8), Mentalt spill (#25)
- [x] Founder-portrett (#5) + sirkulær avatar i Story-seksjonen
- [x] Academy, Junior, Utvikling — alle med ekte bilder
- Bildene er fra én fotoshoot og dekker coaching-situasjoner godt. Mangler fortsatt:
  - [ ] Dedikerte junior-bilder (bruker voksne coaching-bilder som midlertidig løsning)
  - [ ] Software/dashboard-mockup (bruker teknologi-coaching-bilde)

#### 3. Legg inn reell kontaktinformasjon
- **Filer:** `lib/website-constants.ts` linje 265-269
- **Problem:** Telefonnummer `+47 900 00 000` er placeholder, e-post `post@akgolf.no` og adresse `Oslo, Norge` må verifiseres
- [ ] Oppdater telefonnummer med ekte nummer
- [ ] Verifiser at e-postadressen er satt opp og mottar e-post
- [ ] Legg til faktisk adresse/lokasjon

---

### HIGH — Stor påvirkning på effektivitet

#### 4. ~~Legg til grunnlegger-/trenerprofil~~ FERDIG
- [x] Skriv kort bio (bakgrunn, sertifiseringer, erfaring, filosofi) — `FOUNDER`-konstant i `website-constants.ts`
- [x] Portrettbilde lagt til via ImagePlaceholder (`AK-Golf-Academy-5.jpg`)
- [x] Sirkulær avatar i Story-seksjonen (erstatter "AK"-monogram)
- [x] Vis sertifiseringer (PGA, TPI, Mental Coach, Trackman) som badges
- [x] Plasser på forsiden mellom metode- og testimonials-seksjonen
- [ ] Vurder om det bør være en dedikert `/om`-side

#### 5. Gjør testimonials troverdige — DELVIS FERDIG
- [x] `photo`-felt lagt til i TESTIMONIALS-datastrukturen
- [x] `TestimonialCard` og `FeaturedTestimonial` støtter avatar-bilder med initialer som fallback
- [ ] Innhent tillatelse til å bruke fullt navn
- [ ] Legg til portrettbilder av kunder (sett `photo`-felt i `website-constants.ts`)
- [ ] Legg til klubbtilhørighet eller annen identifikator
- [ ] Vurder video-testimonials for ekstra troverdighet

#### 6. ~~Konverteringsskjema på hver underside~~ FERDIG
- [x] Legg til `ApplicationForm`-komponent nederst på hver underside
- [x] Forhåndsvelg riktig program i dropdown basert på hvilken side brukeren er på
- [x] Oppdater CTA-seksjonenes href til `#apply` (lokal anchor) i stedet for `/#apply`

#### 7. ~~Lavterskel konverteringstilbud~~ DELVIS FERDIG
- [ ] Vurder lead magnet: gratis swing-analyse, treningsguide PDF
- [x] Implementer enkel e-post-innsamling — `NewsletterSignup`-komponent i footer med API route
- [ ] Vurder Calendly-integrasjon for "Book en uforpliktende samtale"

#### 8. Tydeliggjør B2C vs. B2B segmentering
- **Problem:** `/utvikling` blander software-produkter og klubbrådgivning for en helt annen målgruppe enn Academy/Junior
- [ ] Vurder om Utvikling bør splittes i to sider (`/software` + `/klubb`)
- [ ] Alternativt: tydeliggjør segmenteringen visuelt på eksisterende side
- [ ] Vurder om B2B-tjenester bør ha egen CTA (f.eks. "Book et møte" vs. "Søk om plass")

---

### MEDIUM — Merkbar forbedring

#### 9. ~~SEO: Strukturerte data~~ FERDIG
- [x] JSON-LD `LocalBusiness` + `SportsActivityLocation` i `app/layout.tsx` (oppgradert fra `Organization`)
- [x] JSON-LD `FAQPage` på `/academy` og `/junior` (fra `ACADEMY_FAQ`/`JUNIOR_FAQ`)
- [x] `priceRange`, `image` lagt til i JSON-LD. Gateadresse/postnummer/geo har TODO-plassholdere
- [x] Open Graph og Twitter Card meta tags på alle sider (root + 3 undersider)

#### 10. SEO: Innholdsstrategi / blogg
- **Problem:** 4 statiske sider gir minimal organisk synlighet
- [ ] Vurder å legge til `/blogg` eller `/ressurser`-seksjon
- [ ] Potensielle artikler: treningsguider, mental trening-tips, junior-utvikling, banetips
- [ ] Vurder CMS-integrasjon (MDX, Contentlayer, eller eksternt CMS)

#### 11. ~~Fjern/optimaliser loading-animasjon~~ FERDIG
- [x] Gjør animasjonen betinget (kun første besøk via sessionStorage)
- Animasjonen vises kun én gang per browser-sesjon (`sessionStorage`-flagg `akgolf_visited`)

#### 12. ~~Intern krysslinking mellom undersider~~ FERDIG
- [x] `RelatedPages`-komponent som viser andre divisjoner (filtrert via `exclude`-prop)
- [x] Lagt til nederst på `/academy`, `/junior` og `/utvikling` etter ApplicationForm
- [x] Kontekstuell lenking i innholdstekst: Academy→Junior, Junior→Academy

#### 13. ~~Sitemap og robots.txt~~ FERDIG
- [x] Opprett `app/sitemap.ts` (Next.js native sitemap-generering)
- [x] Opprett `app/robots.ts` (Next.js native robots-generering)
- [x] `/merkevare` lagt til i sitemap
- [x] `/merkevare/takk` disallowed i robots.txt
- Inkluderer alle 6 ruter, base URL `https://akgolf.no`

#### 14. ~~GDPR / personvern~~ DELVIS FERDIG
- [x] Opprett personvernerklæring-side (`/personvern`) — placeholder-innhold
- [ ] Legg til cookie-samtykke hvis analytics/tracking brukes
- [x] Legg til lenke til personvernerklæring i footer
- Personvernerklæringen bør gjennomgås av juridisk rådgiver før lansering

---

### LOW — Polish

#### 15. ~~Custom 404-side~~ FERDIG
- [x] Opprett `app/not-found.tsx` med design som matcher nettsiden
- [x] Inkluder navigasjon tilbake til forsiden

#### 16. ~~Favicon og app-ikoner~~ FERDIG
- [x] Statisk favicon `app/icon.png` (48x48) — erstatter dynamisk `icon.tsx`
- [x] Apple touch icon `app/apple-icon.png` (180x180)
- [x] Slettet gammel generisk `favicon.ico`

#### 17. Hero-heading språk
- **Problem:** "Elevate your game." er engelsk på en ellers norsk side
- [ ] Vurder om dette er et bevisst brand-valg eller bør oversettes
- [ ] Hvis beholdt: vurder å legge til norsk undertekst for klarhet

#### 18. Konsolider verdier/metode-seksjoner
- **Problem:** Verdier og metode på forsiden overlapper tematisk
- [ ] Vurder å slå sammen til én sterkere seksjon, eller tydeliggjør forskjellen

---

## Tekniske notater

| Teknologi | Versjon |
|---|---|
| Next.js | 16.1.6 (Turbopack) |
| Tailwind CSS | v4 |
| Framer Motion | (brukes for animasjoner) |
| Fonts | DM Serif Display (headings), DM Sans (body), JetBrains Mono (mono) |
| Form backend | Next.js API routes + Resend (trenger API-nøkkel) |
| Hosting | Ikke bestemt |
| Git remote | github.com/akgolfgroup-netizen/akgolf-website (privat) |

### Utførte forbedringer
- **Tailwind CSS navnekollisjon** (2026-02-13): Flyttet `--spacing-section` og `--spacing-section-lg` fra `@theme inline` til `@layer base` i `globals.css` for å unngå at Tailwind v4 auto-genererer `w-section`/`w-section-lg` width-utilities som overstyrer egendefinerte komponent-klasser.
- **Batch 2 — Tekniske forbedringer** (2026-02-13):
  1. Betinget loading-animasjon (kun første besøk per sesjon via `sessionStorage`)
  2. `defaultProgram`-prop på `ApplicationForm` for forhåndsvalgt program
  3. `ApplicationForm` lagt til på `/academy`, `/junior` og `/utvikling` med lokale `#apply`-ankere
  4. `sitemap.xml` og `robots.txt` via Next.js MetadataRoute
  5. Custom 404-side med AK-logo og lenke til forsiden
  6. Personvernside (`/personvern`) med placeholder-innhold + footer-lenke
- **Batch 3 — SEO, troverdighet og konvertering** (2026-02-13):
  1. Open Graph + Twitter Card meta tags på root layout og alle undersider
  2. JSON-LD `Organization` i root layout + `FAQPage` på `/academy` og `/junior`
  3. Grunnlegger-profil på forsiden med bio, sertifiseringer og ImagePlaceholder for portrett
  4. `RelatedPages`-komponent for intern krysslinking mellom undersider
  5. Dynamisk favicon (`app/icon.tsx`) med gull AK-logo
  6. Nyhetsbrev-signup (`NewsletterSignup`) i footer med Formspree-integrasjon
- **Brand Guidelines Alignment** (2026-02-14):
  1. Typografi: DM Serif Display for headings (erstatter Inter/DM Sans), weight 400, letter-spacing -0.02em
  2. Farger: Kald blågrå ink-skala, korrekt gull (#C4973B), navy (#0F2942), midnight (#0A1628)
  3. Sub-brand aksenter: Academy=teal (#0D9488), Junior=blå (#2563EB), Software=violet (#7C3AED), Utvikling=amber (#D97706)
  4. Logo: Kalligrafisk K-mark SVG (erstatter rounded-rect "AK")
  5. Favicon: K-mark på Midnight-bakgrunn, 48x48
  6. Overflater: Kalde toner Snow (#FAFBFC) og Cloud (#F0F2F5)
  7. Fjernet gamle fargetokens: forest, tech, jet, snow, khaki

---

## Filstruktur (nøkkelfiler)

```
app/
  globals.css          — Design tokens (brand-aligned), base styles, komponenter
  layout.tsx           — Root layout, fonts (DM Serif Display + DM Sans), metadata, JSON-LD
  page.tsx             — Forsiden (11 seksjoner inkl. grunnlegger, betinget loader)
  icon.tsx             — Dynamisk favicon (K-mark på midnight)
  not-found.tsx        — Custom 404-side
  sitemap.ts           — Auto-generert sitemap.xml
  robots.ts            — Auto-generert robots.txt
  academy/
    layout.tsx         — Metadata, OG-tags, JSON-LD FAQPage
    page.tsx           — Academy-underside (accent: academy/teal)
  junior/
    layout.tsx         — Metadata, OG-tags, JSON-LD FAQPage
    page.tsx           — Junior-underside (accent: junior/blue)
  utvikling/
    layout.tsx         — Metadata, OG-tags
    page.tsx           — Utvikling/teknologi-underside (accent: software/violet + utvikling/amber)
  personvern/
    layout.tsx         — Metadata for personvernside
    page.tsx           — Personvernerklæring
components/website/
  AKLogo.tsx           — Kalligrafisk K-mark SVG (brand guidelines)
  WebsiteNav.tsx       — Navigasjon (K-mark i Midnight)
  WebsiteFooter.tsx    — Footer (K-mark i gull, nyhetsbrev-signup)
  ApplicationForm.tsx  — Kontaktskjema (støtter defaultProgram-prop)
  NewsletterSignup.tsx — Nyhetsbrev e-postinnsamling i footer
  RelatedPages.tsx     — Intern krysslinking mellom undersider
  ServiceCard.tsx      — Divisjonskort med sub-brand aksenter
  SubPageHero.tsx      — Hero for undersider med aksent-dot
  CTASection.tsx       — CTA-seksjon med aksent-border
  PricingCard.tsx      — Priskort (academy-teal for checkmarks)
  BackToTop.tsx          — Scroll til toppen-knapp
  Marquee.tsx            — Rullende tekst-animasjon
  PageTransition.tsx     — Side-overgangsanimasjon
  + 11 andre komponenter
hooks/
  useScrollPosition.ts
  useAnimatedCounter.ts
  useMediaQuery.ts
lib/
  website-constants.ts — Alt tekstinnhold og data (inkl. FOUNDER, sub-brand aksenter)
```
