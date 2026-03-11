# Plan: Fikse Kode Review Prioriteringer

> Opprettet: 2026-03-11
> Basert på: Kode review av akgolf-website

---

## 📋 Oversikt

| Prioritet | Oppgave | Estimert tid | Avhengigheter |
|-----------|---------|--------------|---------------|
| 1 | Env-validering | 1-2 timer | Ingen |
| 2 | Caching | 2-3 timer | Env-validering |
| 3 | Security headers | 30 min | Ingen |
| 4 | Bonus fixes | 30 min | Ingen |

**Total estimert tid:** 4-6 timer

---

## 1️⃣ Env-validering (Høyest prioritet)

### Mål
Eliminer runtime-feil pga. manglende miljøvariabler. Sentraliser all env-håndtering.

### Implementeringssteg

#### Steg 1.1: Installer Zod
```bash
npm install zod
```

#### Steg 1.2: Opprett `lib/env.ts`
```typescript
import { z } from "zod";

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  
  // Anthropic AI
  ANTHROPIC_API_KEY: z.string().min(1),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  STRIPE_PRICE_BASIS: z.string().startsWith("price_"),
  STRIPE_PRICE_STANDARD: z.string().startsWith("price_"),
  STRIPE_PRICE_PREMIUM: z.string().startsWith("price_"),
  
  // Resend
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  
  // App config
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://akgolf.no"),
  PORTAL_URL: z.string().url().optional(),
  CONTACT_EMAIL: z.string().email().default("post@akgolf.no"),
});

// Valider ved byggetid
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Ugyldige miljøvariabler:");
  parsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
  throw new Error("Miljøvariabel-validering feilet");
}

export const env = parsed.data;
```

#### Steg 1.3: Opprett `types/env.d.ts` (fjern duplicates)
```typescript
// Fjern/reduser manuelle declare global
// Da vi bruker sentralisert env
```

#### Steg 1.4: Oppdater alle filer
Bytt ut `process.env.X!` med `env.X`:

| Fil | Endring |
|-----|---------|
| `lib/supabase/server.ts` | `env.NEXT_PUBLIC_SUPABASE_URL` |
| `lib/supabase/client.ts` | `env.NEXT_PUBLIC_SUPABASE_URL` |
| `lib/ai/generate-plan.ts` | `env.ANTHROPIC_API_KEY` |
| `app/api/treningsplan/webhook/route.ts` | `env.STRIPE_SECRET_KEY` |
| `app/api/treningsplan/checkout/route.ts` | `env.STRIPE_PRICE_*` |
| `app/api/contact/route.ts` | `env.RESEND_API_KEY` |
| `next.config.ts` | `env.PORTAL_URL` med fallback |

---

## 2️⃣ Caching (Medium prioritet)

### Mål
Reduser database-kall og forbedre responstid for dashboard og API-ruter.

### Implementeringssteg

#### Steg 2.1: Opprett `lib/cache.ts`
```typescript
import { unstable_cache } from "next/cache";
import { cache } from "react";

// Revalidate cache every 5 minutes
const CACHE_REVALIDATE = 300;

// Cache plan data (sjelden endret)
export const getCachedPlan = unstable_cache(
  async (planId: string, supabase: SupabaseClient) => {
    const { data } = await supabase
      .from("plans")
      .select("id, category, tier, status, full_plan")
      .eq("id", planId)
      .single();
    return data;
  },
  ["plan"],
  { revalidate: CACHE_REVALIDATE, tags: ["plan"] }
);

// Cache user plans
export const getCachedUserPlans = unstable_cache(
  async (userId: string, supabase: SupabaseClient) => {
    return supabase
      .from("plans")
      .select("id, category, tier, status, full_plan, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },
  ["user-plans"],
  { revalidate: CACHE_REVALIDATE, tags: ["user-plans"] }
);

// React cache for Server Components
export const getPlanForDashboard = cache(async (userId: string) => {
  // ... dashboard-spesifikk logikk
});
```

#### Steg 2.2: Oppdater `app/treningsplan/dashboard/layout.tsx`
```typescript
import { getCachedUserPlans } from "@/lib/cache";

// Bytt ut direkte supabase-kall med:
const { data: plans } = await getCachedUserPlans(user.id, supabase);
```

#### Steg 2.3: Cache revalidation strategy
```typescript
// I webhook/route.ts etter plan-oppdatering:
import { revalidateTag } from "next/cache";

// Etter vellykket betaling:
revalidateTag("user-plans");
revalidateTag(`plan-${planId}`);
```

#### Steg 2.4: Stripe products caching
```typescript
// lib/stripe/products.ts
import { unstable_cache } from "next/cache";

export const getStripeProducts = unstable_cache(
  async () => STRIPE_PRODUCTS,
  ["stripe-products"],
  { revalidate: 86400 } // 24 timer
);
```

---

## 3️⃣ Security Headers (Høy prioritet, rask fix)

### Mål
Harden applikasjonen mot vanlige web-angrep.

### Implementeringssteg

#### Steg 3.1: Oppdater `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... eksisterende config
  
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' blob: data:",
              "font-src 'self'",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co",
              "frame-src https://js.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

#### Steg 3.2: Verifiser med curl
```bash
curl -I https://akgolf.no | grep -E "(X-Frame|X-Content|Referrer|Strict-Transport)"
```

---

## 4️⃣ Bonus Fixes (Lav prioritet)

### 4.1 Fiks duplikat import i auth/callback
```typescript
// Før:
import { createServerSupabase } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

// Etter:
import { createServerSupabase, createServiceClient } from "@/lib/supabase/server";
```

### 4.2 Fjern `any` i PDF-generering
```typescript
// lib/pdf/generate-pdf.ts
import { Document, PDFProps } from "@react-pdf/renderer";

const doc = React.createElement(Document, { ... }) as ReactElement<PDFProps>;
```

### 4.3 Oppdater README.md
```markdown
# AK Golf Group Website

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Supabase (Auth + Database)
- Stripe (Payments)
- Anthropic Claude (AI)

## Development
```bash
npm install
npm run dev
```

## Environment Variables
Se `.env.example` for påkrevde variabler.

## Project Structure
- `/app` - Next.js App Router
- `/app/api` - API routes
- `/components/website` - Marketing components
- `/components/dashboard` - Dashboard components
- `/lib/ai` - AI training plan generation
- `/lib/supabase` - Database clients
```

---

## 🧪 Testing Checklist

Etter hver implementasjon:

- [ ] `npm run build` går gjennom uten feil
- [ ] `npm run lint` viser ingen nye warnings
- [ ] Dashboard laster som normalt
- [ ] AI-generering fungerer
- [ ] Stripe webhook mottas korrekt
- [ ] Security headers vises i Network tab
- [ ] Cache headers vises på API-responser

---

## 📅 Foreslått Rekkefølge

| Dag | Oppgave | Tid |
|-----|---------|-----|
| 1 | Security headers | 30 min |
| 1 | Env-validering (steg 1.1-1.2) | 1 time |
| 2 | Env-validering (steg 1.3-1.4) | 1 time |
| 2 | Caching (steg 2.1-2.2) | 1.5 time |
| 3 | Caching (steg 2.3-2.4) + testing | 1.5 time |
| 3 | Bonus fixes | 30 min |

---

## ⚠️ Risikoanalyse

| Endring | Risiko | Mitigering |
|---------|--------|------------|
| Env-validering | Bygg feiler hvis env mangler | Sjekk Vercel env-vars før deploy |
| Caching | Gamle data vises | Kort revalidate-tid (5min) |
| Security headers | CSP blokkerer ressurser | Test i staging først |

---

*Plan laget av Kimi Code basert på kode review*
