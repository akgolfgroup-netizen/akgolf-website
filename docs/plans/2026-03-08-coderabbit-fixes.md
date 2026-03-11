# CodeRabbit Review Fixes — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fikse alle 11 funn fra CodeRabbit-review av `feature/apple-standard-redesign`.

**Architecture:** Tre produksjonsfikser (copy, tilgjengelighet, kontrast) og åtte oppdateringer til planleggingsdokumentet `2026-03-08-booking-integration.md` som korrigerer pseudo-koden slik at fremtidig implementasjon ikke arver disse bugene.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Tailwind CSS v4

---

## Del A — Produksjonskode (fikses nå)

### Task 1: Fiks norsk kopitekst i `lib/website-constants.ts`

**Files:**
- Modify: `lib/website-constants.ts:324`

**Step 1: Åpne filen og finn linjen**

```bash
grep -n "every decision" lib/website-constants.ts
```

Forventet output: `324:    description: "...optimalisere every decision before you tee off."`

**Step 2: Erstatt den engelske frasen med norsk**

Gammel linje:
```ts
description: "Strategisk forberedelse og spillplan for turneringer. Vi analyserer banen og hjelper deg med å optimalisere every decision before you tee off.",
```

Ny linje:
```ts
description: "Strategisk forberedelse og spillplan for turneringer. Vi analyserer banen og hjelper deg med å optimalisere hver beslutning før du slår ut.",
```

**Step 3: Verifiser**

```bash
grep -n "every decision\|slår ut" lib/website-constants.ts
```

Forventet: kun treff på `slår ut`, ingen `every decision`.

**Step 4: Commit**

```bash
git add lib/website-constants.ts
git commit -m "fix: translate English fragment to Norwegian in Turneringscoaching description"
```

---

### Task 2: Fiks fontsstørrelse på seksjonsoverskrifter i footer

**Files:**
- Modify: `components/website/WebsiteFooter.tsx:69,88`

**Context:** `text-[10px]` (10px) er under anbefalt minimum. `text-xs` er 12px og er Tailwinds minste semantiske størrelse. Den tredje forekomsten på linje 114 er et copyright-notat med `font-mono` — denne er OK å beholde liten.

**Step 1: Finn alle forekomster**

```bash
grep -n "text-\[10px\]" components/website/WebsiteFooter.tsx
```

Forventet output: linje 69, 88, 114

**Step 2: Erstatt de to `h4`-overskriftene (linje 69 og 88)**

Endre begge `h4`-elementene fra:
```html
<h4 className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-6">
```

Til:
```html
<h4 className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 mb-6">
```

Linje 114 (`<p className="text-[10px] font-mono ...">`) er et copyright-notat — la den stå.

**Step 3: Verifiser at bare h4-ene er endret**

```bash
grep -n "text-\[10px\]\|text-xs" components/website/WebsiteFooter.tsx
```

Forventet: h4-linjene viser `text-xs`, linje 114 viser fortsatt `text-[10px]`.

**Step 4: Commit**

```bash
git add components/website/WebsiteFooter.tsx
git commit -m "a11y: increase footer section label font size from 10px to 12px (text-xs)"
```

---

### Task 3: Fiks kontrast for "Logg inn"-lenke i mobil-nav

**Files:**
- Modify: `components/website/WebsiteNav.tsx:165`

**Context:** `text-ink-40` på `bg-ink-100/97` (nesten svart) = lav kontrast. `text-white/70` gir god lesbarhet på mørk bakgrunn og er i tråd med footer-mønsteret.

**Step 1: Finn linjen**

```bash
grep -n "Logg inn\|text-ink-40" components/website/WebsiteNav.tsx
```

**Step 2: Oppdater klassene**

Gammel linje:
```tsx
className="text-sm text-ink-40 hover:text-ink-60 transition-colors"
```

Ny linje:
```tsx
className="text-sm text-white/70 hover:text-white transition-colors"
```

**Step 3: Sjekk visuelt i nettleseren**

```bash
npm run dev
```

Åpne på mobil-bredde (<768px), trykk hamburger-menyen, verifiser at "Logg inn" er leselig mot den mørke bakgrunnen.

**Step 4: Commit**

```bash
git add components/website/WebsiteNav.tsx
git commit -m "a11y: improve contrast for mobile nav login link (white/70 on dark overlay)"
```

---

## Del B — Planleggingsdokument (oppdater pseudo-koden)

> **Merk:** Funnene under er i `docs/plans/2026-03-08-booking-integration.md` — ikke i produksjonskode ennå.
> Målet er å oppdatere pseudo-koden i planen slik at fremtidig implementasjon gjøres riktig fra start.

---

### Task 4: Korriger TypeScript-type for Stripe webhook-event

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 707

**Step 1: Finn linjen**

```bash
grep -n "ReturnType.*Promise.*never" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Erstatt feil conditional type**

Gammel linje:
```ts
let event: ReturnType<typeof stripe.webhooks.constructEvent> extends Promise<infer T> ? T : never;
```

Ny linje:
```ts
let event: Stripe.Event;
```

Sørg for at `import type Stripe from "stripe";` er øverst i kodeblokken.

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: fix incorrect TypeScript type for Stripe.Event in booking plan"
```

---

### Task 5: Korriger race condition — opprett PaymentIntent før booking

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 399–431

**Step 1: Finn seksjonen**

```bash
grep -n "const booking = await prisma.booking.create" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Flytt PaymentIntent-opprettelse før booking**

Oppdater pseudo-koden til dette mønsteret:

```ts
// 1. Opprett PaymentIntent FØR booking (fail fast)
let stripePaymentId: string | undefined;
if (paymentMethod === "stripe") {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: serviceType.price,
    currency: "nok",
    automatic_payment_methods: { enabled: true },
  });
  stripePaymentId = paymentIntent.id;
}

// 2. Opprett booking med stripePaymentId inkludert
const booking = await prisma.booking.create({
  data: {
    studentId: session.user.id,
    instructorId,
    serviceTypeId,
    startTime: start,
    endTime: end,
    status: BookingStatus.PENDING,
    paymentMethod: paymentMethod === "stripe" ? PaymentMethod.STRIPE : PaymentMethod.VIPPS,
    paymentStatus: PaymentStatus.PENDING,
    amount: serviceType.price,
    vatAmount,
    ...(stripePaymentId && { stripePaymentId }),
  },
});

// 3. Oppdater metadata på PaymentIntent med bookingId
if (paymentMethod === "stripe" && stripePaymentId) {
  await stripe.paymentIntents.update(stripePaymentId, {
    metadata: { bookingId: booking.id },
  });
}
```

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: fix race condition — create Stripe PaymentIntent before booking record"
```

---

### Task 6: Legg til idempotens i Stripe webhook-handler

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 715

**Step 1: Finn seksjonen**

```bash
grep -n "payment_intent.succeeded" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Legg til idempotens-sjekk i pseudo-koden**

Oppdater kodeblokken:

```ts
if (event.type === "payment_intent.succeeded") {
  const intent = event.data.object as Stripe.PaymentIntent;
  const bookingId = intent.metadata.bookingId;

  // Idempotens: sjekk om allerede prosessert
  const existing = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { paymentStatus: true },
  });

  if (existing?.paymentStatus === PaymentStatus.PAID) {
    return NextResponse.json({ received: true, message: "Already processed" });
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      stripeWebhookEventId: event.id, // legg til dette feltet i Prisma-schema
    },
  });
}
```

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: add idempotency check to Stripe webhook handler in booking plan"
```

---

### Task 7: Legg til autentisering i Vipps webhook

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 874

**Step 1: Finn seksjonen**

```bash
grep -n "vipps/route.ts\|Vipps webhook" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Legg til signaturverifisering i pseudo-koden**

Legg til øverst i POST-handleren:

```ts
export async function POST(req: NextRequest) {
  // Vipps signaturverifisering (PÅKREVD — uten dette er endepunktet åpent for forfalskede kall)
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.VIPPS_WEBHOOK_SECRET;

  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ... resten av webhook-logikken
}
```

> **Notat for implementasjon:** Vipps eCommerce sender et statisk token i `Authorization`-headeren.
> Generer `VIPPS_WEBHOOK_SECRET` med `openssl rand -hex 32` og registrer det som webhook-URL-parameter
> i Vipps Merchant Portal, eller bruk HMAC-signatur hvis Vipps-versjonen støtter det.

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: add Vipps webhook authentication to booking plan (CRITICAL security fix)"
```

---

### Task 8: Legg til feilhåndtering i Vipps API-kall

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 774–831

**Step 1: Finn seksjonen**

```bash
grep -n "getAccessToken\|initiateVippsPayment" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Oppdater `getAccessToken` med feilhåndtering**

```ts
async function getAccessToken(): Promise<string> {
  const res = await fetch(`${BASE}/accesstoken/get`, {
    method: "POST",
    headers: {
      "client_id": process.env.VIPPS_CLIENT_ID!,
      "client_secret": process.env.VIPPS_CLIENT_SECRET!,
      "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
    },
  });

  if (!res.ok) {
    throw new Error(`Vipps auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Vipps access token missing in response");
  }

  return data.access_token;
}
```

Gjør tilsvarende for `initiateVippsPayment` — sjekk `res.ok` og at `data.url` eksisterer.

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: add error handling to Vipps API functions in booking plan"
```

---

### Task 9: Valider instruktør–tjenestetype-relasjonen ved booking

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 373–394

**Step 1: Finn seksjonen**

```bash
grep -n "serviceType.findUnique\|instructorId" docs/plans/2026-03-08-booking-integration.md | head -20
```

**Step 2: Legg til validering i pseudo-koden**

```ts
const serviceType = await prisma.serviceType.findUnique({
  where: { id: serviceTypeId },
  select: {
    duration: true,
    price: true,
    name: true,
    vatRate: true,
    instructors: { select: { id: true } }, // inkluder relasjon
  },
});

if (!serviceType) {
  return NextResponse.json({ error: "Tjeneste ikke funnet" }, { status: 404 });
}

// Valider at instruktøren faktisk tilbyr denne tjenesten
const instructorOffersService = serviceType.instructors.some(i => i.id === instructorId);
if (!instructorOffersService) {
  return NextResponse.json(
    { error: "Instruktør kan ikke tilby denne tjenesten" },
    { status: 400 }
  );
}
```

**Step 3: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: add instructor-service validation to booking flow in plan"
```

---

### Task 10: Legg til CORS OPTIONS-handler og fiks tidssone i slots-endepunkt

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 226–284

**Step 1: Finn seksjonen**

```bash
grep -n "dateStr\|T00:00:00\|OPTIONS" docs/plans/2026-03-08-booking-integration.md | head -20
```

**Step 2: Fiks tidssone-parsing**

```ts
// Feil — bruker lokal server-tidssone:
const date = new Date(dateStr + "T00:00:00");

// Riktig — eksplisitt UTC:
const date = new Date(dateStr + "T00:00:00.000Z");
```

**Step 3: Legg til OPTIONS-handler**

```ts
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```

**Step 4: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: fix UTC timezone handling and add CORS OPTIONS handler to slots endpoint in plan"
```

---

### Task 11: Filtrer inaktive instruktører og legg til OPTIONS i instruktørendepunkt

**Files:**
- Modify: `docs/plans/2026-03-08-booking-integration.md` rundt linje 107–130

**Step 1: Finn seksjonen**

```bash
grep -n "instructor.findMany\|isActive" docs/plans/2026-03-08-booking-integration.md
```

**Step 2: Oppdater `findMany`-kallet**

```ts
const instructors = await prisma.instructor.findMany({
  where: { isActive: true }, // filtrer ut inaktive instruktører
  select: {
    id: true,
    name: true,
    // ... andre felter
  },
});
```

**Step 3: Legg til OPTIONS-handler** (samme mønster som Task 10)

```ts
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```

**Step 4: Commit**

```bash
git add docs/plans/2026-03-08-booking-integration.md
git commit -m "docs: filter inactive instructors and add CORS OPTIONS to instructors endpoint in plan"
```

---

## Sammendrag

| # | Task | Fil | Type |
|---|------|-----|------|
| 1 | Norsk kopitekst | `lib/website-constants.ts` | Produksjon |
| 2 | Footer font-størrelse | `components/website/WebsiteFooter.tsx` | Produksjon |
| 3 | Logg inn-kontrast | `components/website/WebsiteNav.tsx` | Produksjon |
| 4 | TypeScript Stripe.Event-type | `docs/plans/booking-integration.md` | Plan |
| 5 | Race condition booking/payment | `docs/plans/booking-integration.md` | Plan |
| 6 | Stripe webhook idempotens | `docs/plans/booking-integration.md` | Plan |
| 7 | Vipps webhook-autentisering | `docs/plans/booking-integration.md` | Plan |
| 8 | Vipps API-feilhåndtering | `docs/plans/booking-integration.md` | Plan |
| 9 | Instruktør-tjeneste-validering | `docs/plans/booking-integration.md` | Plan |
| 10 | CORS + tidssone i slots | `docs/plans/booking-integration.md` | Plan |
| 11 | Inaktive instruktører + CORS | `docs/plans/booking-integration.md` | Plan |
