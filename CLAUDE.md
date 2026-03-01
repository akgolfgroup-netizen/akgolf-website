# AK Golf Website

Premium golfcoaching-nettside for AK Golf Group. Norskspraklig markedsside med fire undersider: Academy, Junior, Utvikling og Personvern.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4 (inline theme tokens i `globals.css`)
- **Animasjoner:** Framer Motion 12.x
- **Fonts:** Inter (target per Branding 2.0). LEGACY: utdaterte fonter fremdeles i koden — migrering ventende. Se Migreringsnote nederst.
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
  personvern/            — Personvernerklaering
components/website/      — Alle UI-komponenter (24 stk)
hooks/                   — useScrollPosition, useAnimatedCounter, useMediaQuery
lib/
  website-constants.ts   — Alt tekstinnhold, data, kontaktinfo, priser, FAQ
```

## Design System

### Farger
- **Ink-skala:** Kald blaagra fra `#FAFBFC` (05) til `#0A1628` (100/midnight)
- **Navy:** `#0F2942` (primaer), `#0A1628` (dark/midnight)
- **Gull:** `#C4973B` (primaer accent), `#D4AA52` (light), `#F5ECD7` (muted)
- **Sub-brand:** Academy=teal, Junior=blue, Software=violet, Utvikling=amber
- **Overflater:** Snow `#FAFBFC`, Cloud `#F0F2F5`

### Typografi (MIGRERING VENTENDE)
- **Target:** Inter for all tekst (per AK Golf Branding 2.0)
- **Naaværende (legacy):** Utdaterte fonter i `layout.tsx` og `globals.css` — skal byttes til Inter
- Headings: `font-display`, weight 400, tracking -0.02em
- Body: `font-sans`
- Mono: `font-mono` (JetBrains Mono)
- **Migreringsfiler:** `layout.tsx` (font imports), `globals.css` (font-family)

### Logo
- Kalligrafisk K-mark SVG i `components/website/AKLogo.tsx`
- Nav: midnight, Footer: gull

## Key Conventions

- **Spraak:** All bruker-synlig tekst er paa norsk (med noen engelske brand-uttrykk)
- **Innhold:** Alt tekstinnhold ligger i `lib/website-constants.ts`, ikke hardkodet i komponenter
- **CSS custom properties:** Definert i `@theme inline` i `globals.css`. Spacing-variabler (`--spacing-section`, `--spacing-section-lg`) er i `@layer base` for aa unngaa Tailwind v4-navnekollisjon
- **Sub-brand aksenter:** Undersider bruker sin egen accentfarge via CSS-klasser og prop-verdier
- **Skjema:** `ApplicationForm` stoetter `defaultProgram`-prop for forhåndsvalg basert paa underside
- **Animasjoner:** `RevealOnScroll` (Framer Motion) + betinget loading-animasjon (kun foerste besoek via `sessionStorage`)

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Status

Se `STATUS.md` for fullstendig oversikt over hva som gjenstaar foer lansering. De tre kritiske punktene er:
1. Koble opp kontaktskjema (Formspree-endepunkt er placeholder)
2. Erstatte bildeplassholdere med ekte foto
3. Legge inn reell kontaktinformasjon

## Migreringsnote: Fonter

Fontene i dette prosjektet skal migreres til **Inter** i henhold til AK Golf Branding 2.0.
Eksisterende fontkonfigurasjon i `layout.tsx` og `globals.css` er utdatert — se
`~/Developer/_kunnskapsbase/designsystem-referanse.md` for korrekt oppsett.
