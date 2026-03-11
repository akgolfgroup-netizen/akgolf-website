# AK Golf Website

Premium golf coaching website for AK Golf Group. Norwegian-language marketing site with four sub-pages: Academy, Junior, Utvikling (Development), and Personvern (Privacy Policy).

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **React 19** + Framer Motion 12
- **Tailwind CSS v4** (inline theme tokens)
- **Font:** Inter (self-hosted, per AK Golf Branding 2.0)
- **AI:** Anthropic Claude (training plan generation)
- **Payments:** Stripe (training plan purchases)
- **Auth:** Supabase
- **Linting:** ESLint 9 + eslint-config-next

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in Supabase, Stripe, Anthropic, and Formspree keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Project Structure

```
app/
  layout.tsx             — Root layout, fonts, metadata, JSON-LD
  page.tsx               — Home page (hero, method, team, testimonials, CTA)
  academy/               — Academy sub-page (accent: teal)
  junior/                — Junior sub-page (accent: blue)
  utvikling/             — Development sub-page (accent: violet + amber)
  personvern/            — Privacy policy
  treningsplan/          — AI training plan product (purchase + dashboard)
  auth/                  — Authentication (Supabase callback)
  api/                   — API routes (contact, newsletter, training plan, Stripe)
components/
  website/               — Marketing UI components (24+)
  dashboard/             — Training plan dashboard components
hooks/                   — useScrollPosition, useAnimatedCounter, useMediaQuery
lib/
  website-constants.ts   — All text content, contact info, pricing, FAQ
  ai/                    — Claude prompts + plan generation
  stripe/                — Stripe product config
  supabase/              — Supabase client/server
```

## Design System

### Colors (Branding 2.0 canonical)
- **Navy:** `#0F2950` (primary), `#0A1929` (dark/deep ink)
- **Gold:** `#B8975C` (accent), `#D4C4A8` (light), `#E8D4B0` (muted)
- **Sub-brands:** Junior = blue `#3B82F6`, Labs = purple `#8B5CF6`, Utvikling = green `#22C55E`
- **Surfaces:** Snow `#FAFBFC`, Cloud `#F0F2F5`

### Typography
- **Target:** Inter for all text (per AK Golf Branding 2.0)
- Headings: `font-display`, weight 400, tracking -0.02em
- Body: `font-sans`

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_FORMSPREE_ID`

## Status

See `STATUS.md` for launch checklist. Key remaining items:
1. Connect contact form (Formspree endpoint)
2. Replace image placeholders with real photos
3. Add real contact information

## License

Private — AK Golf Group.
