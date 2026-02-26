# AK Golf Website

Premium golfcoaching-nettside for AK Golf Group. Norskspråklig markedsside med fire undersider: Academy, Junior, Utvikling og Personvern.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4 (inline theme tokens i `globals.css`)
- **Animasjoner:** Framer Motion 12.x
- **Fonts:** DM Serif Display (headings), DM Sans (body), JetBrains Mono (mono)
- **TypeScript:** strict
- **Linting:** ESLint 9 + eslint-config-next

## Project Structure

```
app/
  globals.css            — Design tokens, base styles, CSS-komponenter
  layout.tsx             — Root layout, fonts, metadata, JSON-LD (Organization)
  page.tsx               — Forsiden (hero, stats, metode, grunnlegger, testimonials, CTA)
  icon.tsx               — Dynamisk favicon (K-mark SVG)
  not-found.tsx          — Custom 404
  sitemap.ts / robots.ts — SEO (MetadataRoute)
  academy/               — Academy-underside (accent: teal #0D9488)
  junior/                — Junior-underside (accent: blue #2563EB)
  utvikling/             — Utvikling-underside (accent: violet #7C3AED + amber #D97706)
  personvern/            — Personvernerklæring
components/website/      — Alle UI-komponenter (24 stk)
hooks/                   — useScrollPosition, useAnimatedCounter, useMediaQuery
lib/
  website-constants.ts   — Alt tekstinnhold, data, kontaktinfo, priser, FAQ
```

## Design System

### Farger
- **Ink-skala:** Kald blågrå fra `#FAFBFC` (05) til `#0A1628` (100/midnight)
- **Navy:** `#0F2942` (primær), `#0A1628` (dark/midnight)
- **Gull:** `#C4973B` (primær accent), `#D4AA52` (light), `#F5ECD7` (muted)
- **Sub-brand:** Academy=teal, Junior=blue, Software=violet, Utvikling=amber
- **Overflater:** Snow `#FAFBFC`, Cloud `#F0F2F5`

### Typografi
- Headings: `font-display` (DM Serif Display), weight 400, tracking -0.02em
- Body: `font-sans` (DM Sans)
- Mono: `font-mono` (JetBrains Mono)

### Logo
- Kalligrafisk K-mark SVG i `components/website/AKLogo.tsx`
- Nav: midnight, Footer: gull

## Key Conventions

- **Språk:** All bruker-synlig tekst er på norsk (med noen engelske brand-uttrykk)
- **Innhold:** Alt tekstinnhold ligger i `lib/website-constants.ts`, ikke hardkodet i komponenter
- **CSS custom properties:** Definert i `@theme inline` i `globals.css`. Spacing-variabler (`--spacing-section`, `--spacing-section-lg`) er i `@layer base` for å unngå Tailwind v4-navnekollisjon
- **Sub-brand aksenter:** Undersider bruker sin egen accentfarge via CSS-klasser og prop-verdier
- **Skjema:** `ApplicationForm` støtter `defaultProgram`-prop for forhåndsvalg basert på underside
- **Animasjoner:** `RevealOnScroll` (Framer Motion) + betinget loading-animasjon (kun første besøk via `sessionStorage`)

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Status

Se `STATUS.md` for fullstendig oversikt over hva som gjenstår før lansering. De tre kritiske punktene er:
1. Koble opp kontaktskjema (Formspree-endepunkt er placeholder)
2. Erstatte bildeplassholdere med ekte foto
3. Legge inn reell kontaktinformasjon

## Migreringsnote: Fonter

Fontene i dette prosjektet skal migreres til **Inter** i henhold til AK Golf Branding 2.0.
Eksisterende fontkonfigurasjon i `layout.tsx` og `globals.css` er utdatert — se
`~/Developer/_kunnskapsbase/designsystem-referanse.md` for korrekt oppsett.
