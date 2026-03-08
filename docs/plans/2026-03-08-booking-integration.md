# Booking Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Gi besøkende på akgolf.no en 3-stegs BookingWidget som viser ledige tider fra portalen og videresender til portalen for innlogging og forhåndsbetaling (Stripe + Vipps).

**Architecture:** Portal eksponerer tre public (ingen auth) API-ruter for tjenester, instruktører og ledige slots. Nettsiden henter disse og viser en widget. Bruker redirectes til `/portal/booking/new` for innlogging + betaling. Portalen håndterer PaymentIntent (Stripe) og Vipps-initieringen, med webhooks som bekrefter booking.

**Tech Stack:** Next.js 16 App Router, Prisma 7 + pg adapter, NextAuth, Stripe (`stripe` + `@stripe/react-stripe-js`), Vipps eCommerce REST API, Tailwind v4, Framer Motion

---

## Kontekst

- Portal: `~/Developer/akgolf/akgolf-portal` — kjører på port 3002, `basePath="/portal"`, tilgjengelig via `akgolf.no/portal`
- Nettside: `~/Developer/akgolf/akgolf-website` — kjører på port 3003
- Shared DB: `akgolf_booking` (PostgreSQL, port 5432)
- Prisma-klient: `src/lib/prisma.ts` (PrismaPg adapter)
- Auth: `src/lib/auth.ts` (NextAuth, `authOptions`)

---

## Task 1: Portal — Public API: service-types

**Files:**
- Create: `akgolf-portal/src/app/api/public/service-types/route.ts`

**Step 1: Opprett fil**

```typescript
// src/app/api/public/service-types/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const types = await prisma.serviceType.findMany({
    where: { isPublic: true, isActive: true },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      duration: true,
      price: true,
      color: true,
      minNoticeHours: true,
      maxAdvanceDays: true,
      instructors: {
        select: {
          id: true,
          title: true,
          user: { select: { name: true, image: true } },
        },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(types, {
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Cache-Control": "public, s-maxage=60",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
```

**Step 2: Legg til WEBSITE_URL i portal .env.local**

```
WEBSITE_URL=http://localhost:3003
```

**Step 3: Test manuelt**

```bash
curl http://localhost:3002/portal/api/public/service-types
```
Forventet: JSON-array med service types (tom array er OK hvis ingen er registrert).

**Step 4: Commit**

```bash
cd ~/Developer/akgolf/akgolf-portal
git add src/app/api/public/service-types/route.ts .env.local
git commit -m "feat: public API endpoint for service types"
```

---

## Task 2: Portal — Public API: instructors

**Files:**
- Create: `akgolf-portal/src/app/api/public/instructors/route.ts`

**Step 1: Opprett fil**

```typescript
// src/app/api/public/instructors/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const instructors = await prisma.instructor.findMany({
    select: {
      id: true,
      title: true,
      bio: true,
      specialization: true,
      user: { select: { name: true, image: true } },
    },
  });

  return NextResponse.json(instructors, {
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Cache-Control": "public, s-maxage=60",
    },
  });
}
```

**Step 2: Test manuelt**

```bash
curl http://localhost:3002/portal/api/public/instructors
```

**Step 3: Commit**

```bash
git add src/app/api/public/instructors/route.ts
git commit -m "feat: public API endpoint for instructors"
```

---

## Task 3: Portal — Public API: slots

Dette er den mest komplekse ruten. Den beregner ledige slots for en gitt dato ved å ta utgangspunkt i `InstructorAvailability` og trekke fra eksisterende bookinger.

**Files:**
- Create: `akgolf-portal/src/app/api/public/slots/route.ts`
- Create: `akgolf-portal/src/lib/slots.ts`

**Step 1: Opprett slots-hjelper**

```typescript
// src/lib/slots.ts
import { addMinutes, format, parse, isAfter, isBefore, addHours } from "date-fns";

export function generateSlots({
  availStart,    // "09:00"
  availEnd,      // "17:00"
  duration,      // minutter
  bufferAfter,   // minutter
  date,          // Date (midnatt lokal tid)
  existingBookings, // Array av { startTime: Date; endTime: Date }
  minNoticeHours,
}: {
  availStart: string;
  availEnd: string;
  duration: number;
  bufferAfter: number;
  date: Date;
  existingBookings: { startTime: Date; endTime: Date }[];
  minNoticeHours: number;
}): string[] {
  const slots: string[] = [];
  const step = duration + bufferAfter;
  const earliest = addHours(new Date(), minNoticeHours);

  const [startH, startM] = availStart.split(":").map(Number);
  const [endH, endM] = availEnd.split(":").map(Number);

  let current = new Date(date);
  current.setHours(startH, startM, 0, 0);
  const windowEnd = new Date(date);
  windowEnd.setHours(endH, endM, 0, 0);

  while (isBefore(current, windowEnd)) {
    const slotEnd = addMinutes(current, duration);

    // Slot slutter innenfor tilgjengelig vindu
    if (isAfter(slotEnd, windowEnd)) break;

    // Slot er ikke i fortiden (minNoticeHours)
    if (isAfter(current, earliest)) {
      // Sjekk mot eksisterende bookinger
      const hasConflict = existingBookings.some(
        (b) => isBefore(current, b.endTime) && isAfter(slotEnd, b.startTime)
      );

      if (!hasConflict) {
        slots.push(current.toISOString());
      }
    }

    current = addMinutes(current, step);
  }

  return slots;
}
```

**Step 2: Installer date-fns (sjekk om den finnes allerede)**

```bash
cd ~/Developer/akgolf/akgolf-portal
cat package.json | grep date-fns
```
Hvis ikke installert: `npm install date-fns`

**Step 3: Opprett slots API-rute**

```typescript
// src/app/api/public/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlots } from "@/lib/slots";
import { BookingStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serviceTypeId = searchParams.get("serviceTypeId");
  const instructorId = searchParams.get("instructorId");
  const dateStr = searchParams.get("date"); // YYYY-MM-DD

  if (!serviceTypeId || !instructorId || !dateStr) {
    return NextResponse.json({ error: "Mangler parametere" }, { status: 400 });
  }

  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = date.getDay(); // 0=søndag

  const [serviceType, availability, existingBookings] = await Promise.all([
    prisma.serviceType.findUnique({
      where: { id: serviceTypeId },
      select: { duration: true, bufferAfter: true, minNoticeHours: true },
    }),
    prisma.instructorAvailability.findFirst({
      where: { instructorId, dayOfWeek },
    }),
    prisma.booking.findMany({
      where: {
        instructorId,
        startTime: { gte: date, lt: new Date(date.getTime() + 86400000) },
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
      select: { startTime: true, endTime: true },
    }),
  ]);

  if (!serviceType || !availability) {
    return NextResponse.json([]);
  }

  const slots = generateSlots({
    availStart: availability.startTime,
    availEnd: availability.endTime,
    duration: serviceType.duration,
    bufferAfter: serviceType.bufferAfter,
    date,
    existingBookings,
    minNoticeHours: serviceType.minNoticeHours,
  });

  return NextResponse.json(slots, {
    headers: {
      "Access-Control-Allow-Origin": process.env.WEBSITE_URL ?? "http://localhost:3003",
      "Cache-Control": "public, s-maxage=30",
    },
  });
}
```

**Step 4: Test manuelt**

```bash
curl "http://localhost:3002/portal/api/public/slots?serviceTypeId=<id>&instructorId=<id>&date=2026-03-10"
```
Forventet: Array med ISO-strenger, eller tom array.

**Step 5: Commit**

```bash
git add src/app/api/public/slots/route.ts src/lib/slots.ts
git commit -m "feat: public API endpoint for available slots"
```

---

## Task 4: Portal — Stripe-oppsett

**Step 1: Installer pakker**

```bash
cd ~/Developer/akgolf/akgolf-portal
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

**Step 2: Legg til env-variabler i .env.local**

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Hent disse fra Stripe Dashboard → Developers → API keys.
Webhook secret: `stripe listen --forward-to localhost:3002/portal/api/webhooks/stripe` i dev.

**Step 3: Opprett Stripe-klient-hjelper**

```typescript
// src/lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});
```

**Step 4: Commit**

```bash
git add src/lib/stripe.ts package.json package-lock.json
git commit -m "feat: install Stripe and configure client"
```

---

## Task 5: Portal — POST /api/booking/create

Oppretter en PENDING-booking og returnerer en Stripe PaymentIntent.

**Files:**
- Create: `akgolf-portal/src/app/api/booking/create/route.ts`

**Step 1: Opprett ruten**

```typescript
// src/app/api/booking/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { addMinutes } from "date-fns";
import { BookingStatus, PaymentMethod, PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { serviceTypeId, instructorId, startTime, paymentMethod } = await req.json();

  if (!serviceTypeId || !instructorId || !startTime || !paymentMethod) {
    return NextResponse.json({ error: "Mangler felt" }, { status: 400 });
  }

  const serviceType = await prisma.serviceType.findUnique({
    where: { id: serviceTypeId },
    select: { duration: true, price: true, name: true, vatRate: true },
  });
  if (!serviceType) {
    return NextResponse.json({ error: "Tjeneste ikke funnet" }, { status: 404 });
  }

  const start = new Date(startTime);
  const end = addMinutes(start, serviceType.duration);

  // Sjekk at slot fortsatt er ledig
  const conflict = await prisma.booking.findFirst({
    where: {
      instructorId,
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
    },
  });
  if (conflict) {
    return NextResponse.json({ error: "Tidspunktet er ikke lenger ledig" }, { status: 409 });
  }

  const vatAmount = Math.round((serviceType.price * serviceType.vatRate) / 100);

  // Opprett PENDING booking
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
    },
  });

  if (paymentMethod === "stripe") {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: serviceType.price, // øre/cents
      currency: "nok",
      metadata: { bookingId: booking.id },
      automatic_payment_methods: { enabled: true },
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripePaymentId: paymentIntent.id },
    });

    return NextResponse.json({
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret,
    });
  }

  // Vipps — returner bookingId, Vipps-initiering skjer i neste steg
  return NextResponse.json({ bookingId: booking.id });
}
```

**Step 2: Test manuelt (krever innlogget sesjon)**

Verifiser at `POST /portal/api/booking/create` returnerer 401 uten sesjon:
```bash
curl -X POST http://localhost:3002/portal/api/booking/create \
  -H "Content-Type: application/json" \
  -d '{"serviceTypeId":"x"}'
# Forventet: {"error":"Ikke innlogget"}
```

**Step 3: Commit**

```bash
git add src/app/api/booking/create/route.ts
git commit -m "feat: booking create API with Stripe PaymentIntent"
```

---

## Task 6: Portal — /portal/booking/new side

Mottakssiden etter redirect fra nettsiden. Krever innlogging.

**Files:**
- Create: `akgolf-portal/src/app/(dashboard)/booking/new/page.tsx`

**Step 1: Opprett siden**

```tsx
// src/app/(dashboard)/booking/new/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookingNewClient } from "./client";

export default async function BookingNewPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceTypeId?: string; instructorId?: string; startTime?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;

  if (!session?.user?.id) {
    const returnUrl = `/portal/booking/new?serviceTypeId=${params.serviceTypeId}&instructorId=${params.instructorId}&startTime=${params.startTime}`;
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(returnUrl)}`);
  }

  const { serviceTypeId, instructorId, startTime } = params;

  if (!serviceTypeId || !instructorId || !startTime) {
    redirect("/portal");
  }

  const [serviceType, instructor] = await Promise.all([
    prisma.serviceType.findUnique({
      where: { id: serviceTypeId },
      select: { id: true, name: true, duration: true, price: true, vatRate: true, allowStripe: true, allowVipps: true },
    }),
    prisma.instructor.findUnique({
      where: { id: instructorId },
      select: { id: true, title: true, user: { select: { name: true } } },
    }),
  ]);

  if (!serviceType || !instructor) redirect("/portal");

  return (
    <BookingNewClient
      serviceType={serviceType}
      instructor={instructor}
      startTime={startTime}
      stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    />
  );
}
```

**Step 2: Opprett klient-komponent**

```tsx
// src/app/(dashboard)/booking/new/client.tsx
"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

type ServiceType = { id: string; name: string; duration: number; price: number; vatRate: number; allowStripe: boolean; allowVipps: boolean };
type Instructor = { id: string; title: string | null; user: { name: string | null } };

function CheckoutForm({ bookingId, onSuccess }: { bookingId: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/portal/booking/${bookingId}/confirmation`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Betalingsfeil");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 px-6 bg-[var(--color-gold)] text-[var(--color-ink-100)] rounded-full font-medium disabled:opacity-50"
      >
        {loading ? "Behandler..." : "Betal og bekreft booking"}
      </button>
    </form>
  );
}

export function BookingNewClient({
  serviceType,
  instructor,
  startTime,
  stripePublishableKey,
}: {
  serviceType: ServiceType;
  instructor: Instructor;
  startTime: string;
  stripePublishableKey: string;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "vipps" | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripePromise = loadStripe(stripePublishableKey);
  const startDate = parseISO(startTime);
  const priceKr = (serviceType.price / 100).toFixed(0);

  async function handleSelectPayment(method: "stripe" | "vipps") {
    setPaymentMethod(method);
    setLoading(true);
    setError(null);

    const res = await fetch("/portal/api/booking/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceTypeId: serviceType.id,
        instructorId: instructor.id,
        startTime,
        paymentMethod: method,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Noe gikk galt");
      setLoading(false);
      return;
    }

    setBookingId(data.bookingId);
    if (method === "stripe") setClientSecret(data.clientSecret);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[var(--color-ink-90)] border border-white/10 rounded-2xl p-8 space-y-6">
        <h1 className="text-xl font-bold text-white">Bekreft booking</h1>

        {/* Sammendrag */}
        <div className="space-y-2 text-sm text-white/70">
          <p><span className="text-white/40">Tjeneste:</span> {serviceType.name}</p>
          <p><span className="text-white/40">Instruktør:</span> {instructor.user.name} {instructor.title ? `— ${instructor.title}` : ""}</p>
          <p><span className="text-white/40">Dato:</span> {format(startDate, "EEEE d. MMMM yyyy", { locale: nb })}</p>
          <p><span className="text-white/40">Tid:</span> {format(startDate, "HH:mm")}</p>
          <p><span className="text-white/40">Varighet:</span> {serviceType.duration} min</p>
          <p className="text-white font-semibold text-base">Kr {priceKr},-</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Betalingsvalg */}
        {!paymentMethod && (
          <div className="space-y-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Velg betalingsmetode</p>
            {serviceType.allowStripe && (
              <button
                onClick={() => handleSelectPayment("stripe")}
                className="w-full py-3 px-4 border border-white/15 rounded-xl text-white text-sm hover:border-white/30 transition-colors text-left"
              >
                💳 Kortbetaling, Apple Pay, Google Pay
              </button>
            )}
            {serviceType.allowVipps && (
              <button
                onClick={() => handleSelectPayment("vipps")}
                className="w-full py-3 px-4 bg-[#FF5B24] rounded-xl text-white text-sm font-semibold hover:bg-[#e04f1e] transition-colors"
              >
                Betal med Vipps
              </button>
            )}
          </div>
        )}

        {/* Stripe Payment Element */}
        {paymentMethod === "stripe" && clientSecret && bookingId && (
          <Elements stripe={stripePromise} options={{ clientSecret, locale: "nb" }}>
            <CheckoutForm bookingId={bookingId} onSuccess={() => {}} />
          </Elements>
        )}

        {loading && <p className="text-white/50 text-sm">Klargjør betaling...</p>}
      </div>
    </div>
  );
}
```

**Step 3: Test manuelt**

Naviger til `http://localhost:3002/portal/booking/new?serviceTypeId=X&instructorId=Y&startTime=Z`
Forventet: Innloggingsredirect hvis ikke innlogget, ellers booking-sammendrag.

**Step 4: Commit**

```bash
git add src/app/\(dashboard\)/booking/
git commit -m "feat: booking/new page with Stripe payment selection"
```

---

## Task 7: Portal — Stripe webhook

**Files:**
- Create: `akgolf-portal/src/app/api/webhooks/stripe/route.ts`

**Step 1: Opprett webhook-rute**

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: ReturnType<typeof stripe.webhooks.constructEvent> extends Promise<infer T> ? T : never;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const bookingId = intent.metadata.bookingId;

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
      },
    });
  }

  return NextResponse.json({ received: true });
}
```

**Step 2: Deaktiver body-parsing (Next.js 16 gjør dette automatisk for streaming — OK)**

Ingen ekstra konfigurasjon nødvendig i App Router.

**Step 3: Test webhook lokalt**

```bash
stripe listen --forward-to localhost:3002/portal/api/webhooks/stripe
```

**Step 4: Commit**

```bash
git add src/app/api/webhooks/stripe/route.ts
git commit -m "feat: Stripe webhook confirms booking on payment_intent.succeeded"
```

---

## Task 8: Portal — Vipps-integrasjon

**Files:**
- Create: `akgolf-portal/src/lib/vipps.ts`
- Create: `akgolf-portal/src/app/api/webhooks/vipps/route.ts`
- Create: `akgolf-portal/src/app/api/booking/vipps-initiate/route.ts`

**Step 1: Legg til Vipps env-variabler i .env.local**

```
VIPPS_CLIENT_ID=...
VIPPS_CLIENT_SECRET=...
VIPPS_SUBSCRIPTION_KEY=...
VIPPS_MERCHANT_SERIAL_NUMBER=...
VIPPS_SYSTEM_NAME=akgolf
VIPPS_API_BASE=https://apitest.vipps.no  # bytt til prod ved lansering
```

**Step 2: Opprett Vipps-hjelper**

```typescript
// src/lib/vipps.ts
const BASE = process.env.VIPPS_API_BASE!;

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${BASE}/accesstoken/get`, {
    method: "POST",
    headers: {
      "client_id": process.env.VIPPS_CLIENT_ID!,
      "client_secret": process.env.VIPPS_CLIENT_SECRET!,
      "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
    },
  });
  const data = await res.json();
  return data.access_token;
}

export async function initiateVippsPayment({
  orderId,
  amount,       // øre
  description,
  fallbackUrl,
  callbackUrl,
}: {
  orderId: string;
  amount: number;
  description: string;
  fallbackUrl: string;
  callbackUrl: string;
}): Promise<{ url: string }> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}/ecomm/v2/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
      "X-Request-Id": orderId,
      "X-TimeStamp": new Date().toISOString(),
      "X-MSN": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
    },
    body: JSON.stringify({
      merchantInfo: {
        merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
        callbackPrefix: callbackUrl,
        fallBack: fallbackUrl,
        isApp: false,
      },
      customerInfo: {},
      transaction: {
        orderId,
        amount,
        transactionText: description,
      },
    }),
  });

  const data = await res.json();
  return { url: data.url };
}
```

**Step 3: Opprett Vipps-initiate API-rute (kallet fra klient etter bruker trykker Vipps)**

```typescript
// src/app/api/booking/vipps-initiate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initiateVippsPayment } from "@/lib/vipps";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });

  const { bookingId } = await req.json();
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { serviceType: { select: { name: true, price: true } } },
  });

  if (!booking || booking.studentId !== session.user.id) {
    return NextResponse.json({ error: "Booking ikke funnet" }, { status: 404 });
  }

  const baseUrl = process.env.NEXTAUTH_URL!.replace("/portal", "");

  const { url } = await initiateVippsPayment({
    orderId: bookingId,
    amount: booking.amount,
    description: booking.serviceType.name,
    fallbackUrl: `${baseUrl}/portal/booking/${bookingId}/confirmation`,
    callbackUrl: `${baseUrl}/portal/api/webhooks/vipps`,
  });

  return NextResponse.json({ redirectUrl: url });
}
```

**Step 4: Opprett Vipps webhook**

```typescript
// src/app/api/webhooks/vipps/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Vipps sender orderId som booking-ID
  const orderId = body.orderId ?? body.reference;
  const transactionStatus = body.transactionInfo?.status ?? body.status;

  if (transactionStatus === "SALE" || transactionStatus === "RESERVE") {
    await prisma.booking.update({
      where: { id: orderId },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
        vippsOrderId: orderId,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
```

**Step 5: Oppdater `client.tsx` — legg til Vipps-redirect**

I `BookingNewClient`, i `handleSelectPayment("vipps")` etter `setBookingId(data.bookingId)`:

```typescript
// Etter bookingId er satt for Vipps:
if (method === "vipps") {
  const vippsRes = await fetch("/portal/api/booking/vipps-initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId: data.bookingId }),
  });
  const vippsData = await vippsRes.json();
  if (vippsData.redirectUrl) {
    window.location.href = vippsData.redirectUrl;
    return;
  }
}
```

**Step 6: Commit**

```bash
git add src/lib/vipps.ts src/app/api/webhooks/vipps/route.ts src/app/api/booking/vipps-initiate/route.ts src/app/\(dashboard\)/booking/new/client.tsx
git commit -m "feat: Vipps payment integration for booking"
```

---

## Task 9: Portal — Bekreftelsesside

**Files:**
- Create: `akgolf-portal/src/app/(dashboard)/booking/[id]/confirmation/page.tsx`

**Step 1: Opprett siden**

```tsx
// src/app/(dashboard)/booking/[id]/confirmation/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      serviceType: { select: { name: true, duration: true } },
      instructor: { select: { title: true, user: { select: { name: true } } } },
    },
  });

  if (!booking || booking.studentId !== session.user.id) redirect("/portal");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Booking bekreftet!</h1>
        <div className="text-white/60 space-y-1 text-sm">
          <p>{booking.serviceType.name} med {booking.instructor.user.name}</p>
          <p>{format(booking.startTime, "EEEE d. MMMM yyyy 'kl.' HH:mm", { locale: nb })}</p>
          <p>{booking.serviceType.duration} minutter</p>
        </div>
        <Link href="/portal/bookinger" className="inline-block py-3 px-6 bg-white/10 rounded-full text-white text-sm hover:bg-white/15 transition-colors">
          Se alle bookinger
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/\(dashboard\)/booking/
git commit -m "feat: booking confirmation page"
```

---

## Task 10: Nettside — BookingWidget komponent

**Files:**
- Create: `akgolf-website/components/website/BookingWidget.tsx`
- Create: `akgolf-website/lib/booking-api.ts`

**Step 1: Opprett API-hjelper**

```typescript
// lib/booking-api.ts
const PORTAL_BASE = process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3002/portal";

export type ServiceType = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  duration: number;
  price: number;
  color: string | null;
  instructors: Instructor[];
};

export type Instructor = {
  id: string;
  title: string | null;
  user: { name: string | null; image: string | null };
};

export async function fetchServiceTypes(): Promise<ServiceType[]> {
  const res = await fetch(`${PORTAL_BASE}/api/public/service-types`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchSlots(
  serviceTypeId: string,
  instructorId: string,
  date: string // YYYY-MM-DD
): Promise<string[]> {
  const res = await fetch(
    `${PORTAL_BASE}/api/public/slots?serviceTypeId=${serviceTypeId}&instructorId=${instructorId}&date=${date}`
  );
  if (!res.ok) return [];
  return res.json();
}

export function buildBookingUrl(
  serviceTypeId: string,
  instructorId: string,
  startTime: string
): string {
  const portalPublic = process.env.NEXT_PUBLIC_PORTAL_PUBLIC_URL ?? "http://localhost:3002/portal";
  return `${portalPublic}/booking/new?serviceTypeId=${serviceTypeId}&instructorId=${instructorId}&startTime=${encodeURIComponent(startTime)}`;
}
```

**Step 2: Legg til env-variabler i website .env.local**

```
NEXT_PUBLIC_PORTAL_URL=http://localhost:3002/portal
NEXT_PUBLIC_PORTAL_PUBLIC_URL=http://localhost:3002/portal
```

I produksjon:
```
NEXT_PUBLIC_PORTAL_URL=https://akgolf.no/portal
NEXT_PUBLIC_PORTAL_PUBLIC_URL=https://akgolf.no/portal
```

**Step 3: Opprett BookingWidget**

```tsx
// components/website/BookingWidget.tsx
"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfToday, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { fetchServiceTypes, fetchSlots, buildBookingUrl, type ServiceType, type Instructor } from "@/lib/booking-api";

const categoryLabels: Record<string, string> = {
  INDIVIDUAL: "Individuell",
  GROUP: "Gruppe",
  VTG_COURSE: "VTG-kurs",
  SIMULATOR: "Simulator",
  PLAYING_LESSON: "Spilleøkt",
};

export function BookingWidget() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kalender: vis 14 dager frem
  const today = startOfToday();
  const dates = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1));

  useEffect(() => {
    fetchServiceTypes().then((data) => {
      setServiceTypes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedService || !selectedInstructor || !selectedDate) return;
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    fetchSlots(
      selectedService.id,
      selectedInstructor.id,
      format(selectedDate, "yyyy-MM-dd")
    ).then((data) => {
      setSlots(data);
      setLoadingSlots(false);
    });
  }, [selectedService, selectedInstructor, selectedDate]);

  function handleSelectService(service: ServiceType) {
    setSelectedService(service);
    setSelectedInstructor(service.instructors[0] ?? null);
    setStep(2);
  }

  function handleConfirm() {
    if (!selectedService || !selectedInstructor || !selectedSlot) return;
    const url = buildBookingUrl(selectedService.id, selectedInstructor.id, selectedSlot);
    window.location.href = url;
  }

  const priceKr = selectedService ? (selectedService.price / 100).toFixed(0) : "";

  return (
    <div className="w-card max-w-2xl mx-auto">
      {/* Steg-indikator */}
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3] as const).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${step >= s ? "bg-gold text-ink-100" : "bg-ink-10 text-ink-40"}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-8 h-px transition-colors ${step > s ? "bg-gold" : "bg-ink-20"}`} />}
          </div>
        ))}
        <span className="ml-2 text-xs text-ink-50">
          {step === 1 ? "Velg tjeneste" : step === 2 ? "Velg tid" : "Bekreft"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* Steg 1: Velg tjeneste */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-ink-20 border-t-gold rounded-full animate-spin" />
              </div>
            ) : serviceTypes.length === 0 ? (
              <p className="text-ink-50 text-sm text-center py-8">Ingen tjenester tilgjengelig for øyeblikket.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceTypes.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleSelectService(st)}
                    className="text-left p-5 rounded-xl border border-ink-10 hover:border-gold/30 hover:shadow-md transition-all group"
                  >
                    <p className="text-xs text-ink-40 mb-1">{categoryLabels[st.category] ?? st.category}</p>
                    <h3 className="font-semibold text-ink-80 group-hover:text-gold transition-colors mb-2" style={{ letterSpacing: "-0.01em" }}>{st.name}</h3>
                    <p className="text-xs text-ink-50 leading-relaxed mb-3 line-clamp-2">{st.description}</p>
                    <p className="text-sm font-medium text-ink-70">{st.duration} min · Kr {(st.price / 100).toFixed(0)},-</p>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Steg 2: Velg dato og tid */}
        {step === 2 && selectedService && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink-80" style={{ letterSpacing: "-0.01em" }}>{selectedService.name}</h3>
              <button onClick={() => setStep(1)} className="text-xs text-ink-40 hover:text-ink-60 transition-colors">Endre</button>
            </div>

            {/* Instruktørvalg (hvis flere) */}
            {selectedService.instructors.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs text-ink-50">Instruktør</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedService.instructors.map((instr) => (
                    <button
                      key={instr.id}
                      onClick={() => setSelectedInstructor(instr)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedInstructor?.id === instr.id ? "border-gold bg-gold/10 text-gold-text" : "border-ink-20 text-ink-50 hover:border-ink-40"}`}
                    >
                      {instr.user.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Datovelger */}
            <div className="space-y-2">
              <p className="text-xs text-ink-50">Velg dato</p>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border text-xs transition-colors ${selectedDate?.toDateString() === date.toDateString() ? "border-gold bg-gold/10 text-gold-text" : "border-ink-10 text-ink-50 hover:border-ink-30"}`}
                  >
                    <span className="uppercase tracking-wide">{format(date, "EEE", { locale: nb })}</span>
                    <span className="font-semibold text-base">{format(date, "d")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slots */}
            {selectedDate && (
              <div className="space-y-2">
                <p className="text-xs text-ink-50">Ledige tider</p>
                {loadingSlots ? (
                  <div className="flex justify-center py-4">
                    <div className="w-5 h-5 border-2 border-ink-20 border-t-gold rounded-full animate-spin" />
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-xs text-ink-40 py-2">Ingen ledige tider denne dagen.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => { setSelectedSlot(slot); setStep(3); }}
                        className={`text-sm px-4 py-2 rounded-full border transition-colors ${selectedSlot === slot ? "border-gold bg-gold/10 text-gold-text" : "border-ink-20 text-ink-60 hover:border-gold/30"}`}
                      >
                        {format(parseISO(slot), "HH:mm")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Steg 3: Sammendrag */}
        {step === 3 && selectedService && selectedInstructor && selectedDate && selectedSlot && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink-80">Bekreft valg</h3>
              <button onClick={() => setStep(2)} className="text-xs text-ink-40 hover:text-ink-60 transition-colors">Endre</button>
            </div>

            <div className="bg-ink-05 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-50">Tjeneste</span>
                <span className="text-ink-80 font-medium">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-50">Instruktør</span>
                <span className="text-ink-80">{selectedInstructor.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-50">Dato</span>
                <span className="text-ink-80">{format(selectedDate, "EEEE d. MMMM", { locale: nb })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-50">Tid</span>
                <span className="text-ink-80">{format(parseISO(selectedSlot), "HH:mm")} ({selectedService.duration} min)</span>
              </div>
              <div className="h-px bg-ink-10" />
              <div className="flex justify-between font-semibold">
                <span className="text-ink-70">Totalt</span>
                <span className="text-ink-90">Kr {priceKr},-</span>
              </div>
            </div>

            <p className="text-xs text-ink-40 leading-relaxed">
              Du vil bli videresendt til vår portal for innlogging og betaling. Forhåndsbetaling kreves for å bekrefte bookingen.
            </p>

            <button
              onClick={handleConfirm}
              className="w-btn w-btn-gold w-full justify-center"
            >
              Fortsett til betaling
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 4: Sjekk at date-fns er installert i website**

```bash
cd ~/Developer/akgolf/akgolf-website && cat package.json | grep date-fns
```
Hvis ikke: `npm install date-fns`

**Step 5: Commit**

```bash
git add components/website/BookingWidget.tsx lib/booking-api.ts .env.local package.json
git commit -m "feat: BookingWidget 3-step component with portal API integration"
```

---

## Task 11: Nettside — Erstatt ApplicationForm på coaching-siden

**Files:**
- Modify: `akgolf-website/app/coaching/page.tsx`

**Step 1: Les coaching-siden**

```bash
cat ~/Developer/akgolf/akgolf-website/app/coaching/page.tsx | grep -n "ApplicationForm\|ProcessSteps\|apply\|section"
```

**Step 2: Erstatt ApplicationForm med BookingWidget**

Finn seksjonen med `ApplicationForm` og erstatt:

```tsx
// Gammel:
import { ApplicationForm } from "@/components/website/ApplicationForm";
// ...
<ApplicationForm />

// Ny:
import { BookingWidget } from "@/components/website/BookingWidget";
// ...
<BookingWidget />
```

**Step 3: Gjør det samme på homepage (app/page.tsx)**

Finn `<ApplicationForm />` i `app/page.tsx` og erstatt med `<BookingWidget />`. Oppdater import tilsvarende.

**Step 4: Build-sjekk**

```bash
cd ~/Developer/akgolf/akgolf-website && npm run build
```
Forventet: ingen TypeScript-feil.

**Step 5: Manuell test**

- Åpne `http://localhost:3003/coaching`
- Verifiser at BookingWidget vises og at tjenester lastes fra portalen
- Velg tjeneste → velg dato → velg tid → klikk "Fortsett til betaling"
- Verifiser redirect til `localhost:3002/portal/booking/new?...`

**Step 6: Commit**

```bash
cd ~/Developer/akgolf/akgolf-website
git add app/coaching/page.tsx app/page.tsx
git commit -m "feat: replace ApplicationForm with BookingWidget on coaching and homepage"
```

---

## Verifikasjon (hele flyten)

1. Start portal: `cd ~/Developer/akgolf/akgolf-portal && npm run dev` (port 3002)
2. Start nettside: `cd ~/Developer/akgolf/akgolf-website && npm run dev` (port 3003)
3. Start Stripe webhook: `stripe listen --forward-to localhost:3002/portal/api/webhooks/stripe`
4. Gå til `http://localhost:3003/coaching`
5. Velg tjeneste → dato → tid → klikk "Fortsett til betaling"
6. Verifiser redirect til portal med korrekte query-params
7. Logg inn i portalen
8. Verifiser at booking-sammendrag vises med korrekte detaljer
9. Test Stripe-betaling med testkort `4242 4242 4242 4242`
10. Verifiser at booking er CONFIRMED i databasen:
    ```bash
    psql akgolf_booking -c "SELECT id, status, payment_status FROM bookings ORDER BY created_at DESC LIMIT 5;"
    ```
