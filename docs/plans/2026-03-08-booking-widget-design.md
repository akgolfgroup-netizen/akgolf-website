# Design: Booking-integrasjon — akgolf.no × akgolf-portal

**Dato:** 2026-03-08
**Status:** Godkjent

---

## Mål

Gi besøkende på akgolf.no mulighet til å se ledige treningstimer og starte bookingprosessen direkte fra nettsiden. Forhåndsbetaling kreves. Betaling og brukerinnlogging fullføres i portalen.

---

## Brukerflyt

```
akgolf.no/coaching
  BookingWidget (3 steg)
  ① Velg timetype  — dynamisk fra ServiceType (isPublic + isActive)
  ② Velg dato → velg ledig klokkeslett
  ③ Sammendrag (tjeneste, instruktør, tid, pris) + "Fortsett til betaling"
        ↓ redirect
akgolf.no/portal/booking/new?serviceTypeId=X&instructorId=Y&startTime=Z
  → Ikke innlogget: login/registrering → tilbake med params
  → Innlogget:
      ④ Betalingsvalg: Stripe eller Vipps
      ⑤a STRIPE → PaymentIntent → Payment Element (kort/Apple Pay/Google Pay)
      ⑤b VIPPS  → Vipps eCommerce initiate → redirect → webhook
      ⑥ Bekreftelsesside: /portal/booking/[id]/confirmation
```

---

## Arkitektur

### Portal — nye public API-ruter (ingen auth)

| Rute | Beskrivelse |
|------|-------------|
| `GET /api/public/service-types` | Returnerer `ServiceType[]` der `isPublic=true` og `isActive=true` |
| `GET /api/public/instructors` | Returnerer aktive instruktører med navn og bilde |
| `GET /api/public/slots?serviceTypeId=X&instructorId=Y&date=Z` | Beregner ledige slots fra `InstructorAvailability` minus eksisterende bookinger |

Slots-beregning:
1. Hent `InstructorAvailability` for valgt `dayOfWeek`
2. Generer alle mulige slots (duration fra ServiceType, bufferAfter inkludert)
3. Fjern slots som overlapper med eksisterende `Booking` (PENDING/CONFIRMED)
4. Fjern slots innenfor `minNoticeHours` fra nå

### Portal — ny booking-flyt (auth required)

| Side / rute | Beskrivelse |
|-------------|-------------|
| `GET /portal/booking/new` | Tar imot query-params, krever innlogging, viser sammendrag + betalingsvalg |
| `POST /api/booking/create` | Oppretter booking (PENDING) + returnerer PaymentIntent client secret |
| `GET /portal/booking/[id]/pay` | Stripe Payment Element-side |
| `POST /api/webhooks/stripe` | `payment_intent.succeeded` → booking CONFIRMED |
| `POST /api/webhooks/vipps` | Vipps callback → booking CONFIRMED |
| `GET /portal/booking/[id]/confirmation` | Bekreftelsesside |

### Portal — nye pakker

```
stripe
@stripe/stripe-js
@stripe/react-stripe-js
```

Vipps: native REST API (ingen npm-pakke), mot `https://apitest.vipps.no` / `https://api.vipps.no`.

### Nettside — ny BookingWidget

Erstatter `ApplicationForm` på `/coaching`-siden.

**3-stegs komponent:**

```
Step 1: Velg tjeneste
  - Fetch /portal/api/public/service-types
  - Vis som grid med navn, varighet, pris

Step 2: Velg tid
  - Kalender (enkel månedsvisning)
  - Ved valgt dato: fetch /portal/api/public/slots?...
  - Vis ledige klokkeslett som klikk-bare chips

Step 3: Sammendrag
  - Tjeneste, instruktør, dato, tid, pris
  - "Fortsett til betaling" → redirect til portal med params
```

**Tilstand:**
```typescript
type BookingState = {
  step: 1 | 2 | 3;
  serviceType: ServiceType | null;
  instructor: Instructor | null;
  date: Date | null;
  slot: string | null; // ISO-streng
}
```

---

## Ikke i scope (denne iterasjon)

- Admin-panel for å administrere availability (gjøres i portal)
- SMS-påminnelser
- Refund-flyt
- Gruppebooking

---

## Implementasjonsrekkefølge

1. Portal: public API-ruter (service-types, instructors, slots)
2. Portal: Stripe-installasjon + `/portal/booking/new` + PaymentIntent-flyt
3. Portal: Stripe webhook
4. Portal: Vipps-integrasjon + webhook
5. Nettside: `BookingWidget` (3 steg)
6. Nettside: Erstatt `ApplicationForm` med `BookingWidget` på coaching-siden
