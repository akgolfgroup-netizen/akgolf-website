# AK Golf Website

Premium golfcoaching-nettside for AK Golf Group. Norskspraklig markedsside med fire undersider: Academy, Junior, Utvikling og Personvern.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4 (inline theme tokens i `globals.css`)
- **Animasjoner:** Framer Motion 12.x
- **Fonts:** Inter (variabel, via `next/font/local` — InterVariable.woff2)
- **TypeScript:** strict
- **Linting:** ESLint 9 + eslint-config-next

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

### App Router Structure

```
app/
├── globals.css            # Design tokens, base styles, CSS-komponenter
├── layout.tsx             # Root layout, fonts, metadata, JSON-LD (Organization)
├── page.tsx               # Forsiden (hero, stats, metode, grunnlegger, testimonials, CTA)
├── icon.tsx               # Dynamisk favicon (K-mark SVG)
├── not-found.tsx          # Custom 404
├── sitemap.ts / robots.ts # SEO (MetadataRoute)
├── academy/               # Academy-underside (accent: navy #0F2950)
├── junior/                # Junior-underside (accent: blue #3B82F6)
├── utvikling/             # Utvikling-underside (accent: green #22C55E + purple #8B5CF6)
└── personvern/            # Personvernerklaering
```

### Source Structure

```
components/website/        # Alle UI-komponenter (24 stk)
hooks/                     # useScrollPosition, useAnimatedCounter, useMediaQuery
lib/
  website-constants.ts     # Alt tekstinnhold, data, kontaktinfo, priser, FAQ
```

## Styling & Design System

### Colors (Branding 2.0 canonical)

- **Ink-skala:** Kald blaagra fra `#FAFBFC` (05) til `#0A1929` (100/deep ink)
- **Navy:** `#0F2950` (primaer), `#0A1929` (dark/deep ink)
- **Gull:** `#B8975C` (primaer accent), `#D4C4A8` (light), `#E8D4B0` (muted)
- **Sub-brand:** Junior=blue `#3B82F6`, Software=purple `#8B5CF6`, Utvikling=green `#22C55E`
- **Overflater:** Snow `#FAFBFC`, Cloud `#F0F2F5`

### Typography

- **Font:** Inter (variabel, 300-700) via `next/font/local` i `layout.tsx`
- Headings: `font-display` (= Inter), weight 700, tracking -0.02em
- Body: `font-sans` (= Inter)
- Alle font-variabler peker til Inter via CSS custom properties i `globals.css`

### Logo

- Kalligrafisk K-mark SVG i `components/website/AKLogo.tsx`
- Nav: midnight, Footer: gull

## Environment Variables

No environment variables required. The site is fully static.

## Conventions

- **Language:** All bruker-synlig tekst er paa norsk (med noen engelske brand-uttrykk)
- **Content:** Alt tekstinnhold ligger i `lib/website-constants.ts`, ikke hardkodet i komponenter
- **CSS custom properties:** Definert i `@theme inline` i `globals.css`. Spacing-variabler (`--spacing-section`, `--spacing-section-lg`) er i `@layer base` for aa unngaa Tailwind v4-navnekollisjon
- **Sub-brand aksenter:** Undersider bruker sin egen accentfarge via CSS-klasser og prop-verdier
- **Skjema:** `ApplicationForm` stoetter `defaultProgram`-prop for forhåndsvalg basert paa underside
- **Animasjoner:** `RevealOnScroll` (Framer Motion) + betinget loading-animasjon (kun foerste besoek via `sessionStorage`)
