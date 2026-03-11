# AK Golf Website — Redesign & Innholdsplan

> Dato: 2026-03-01

---

## Del A: Innhold & forretningsstrategi

### A1. Fjern fiktive tall og statistikk
- **Fjern** `StatsStrip`-komponenten fra forsiden
- **Fjern** Results-seksjonen ("Tall som taler for seg") — bruker hardkodede, uverifiserte tall
- **Fjern** `Marquee`-komponenten (visuelt støy, ikke innholdsstyrt)
- **Begrunnelse**: Ingen dokumenterte tall å vise til. Fiktive tall undergraver troverdighet.

### A2. Trenerteam — Anders + Markus
Erstatt "Din trener" (kun Anders) med en **Team-seksjon** som viser begge:

| Person | Rolle | Divisjon |
|---|---|---|
| **Anders Kristiansen** | Head Coach | Academy (voksne), overordnet ansvar |
| **Markus [etternavn]** | Junior Coach | Junior Academy |

- Vis begge med bilde, kort bio, sertifiseringer og kontaktmulighet
- Gjør kontaktinfo (e-post/telefon) lett tilgjengelig for hver trener
- Knytt hver trener til sine respektive undersider

### A3. Oppdater lokasjon og tilknytning
- **Endre** kontaktinfo fra "Oslo, Norge" til korrekt lokasjon (Vinger/Indahl-området)
- **Synliggjør GFGK** (Grønmo Frilufts- og Golfklubb eller relevant klubb) som treningsbase
- Legg inn kart eller adresse til GFGK i kontakt-/footer-seksjonen

### A4. Junior Academy — Konverteringsflyt
- **Endre CTA** fra "Søk om plass" → **"Avtal et uforpliktende møte"**
- **Legg til retningslinjer for uttak/opptak** på Junior-undersiden:
  - Aldersgrenser (13-19 år)
  - Hva som vurderes (motivasjon, treningsvilje, nivå)
  - Prosessen: møte → vurdering → eventuelt opptak
  - Tydelig at første møte er uforpliktende
- **Forenkle søknadsprosessen** — mer fokus på å senke terskelen enn å virke eksklusiv

### A5. Restrukturere divisjonene
Tydeliggjør de fire pilarene som likestilte:

```
1. AK Golf Academy    — 1:1 coaching for voksne (Anders, Head Coach)
2. Junior Academy     — Talentutvikling 13-19 år (Markus, Junior Coach)
3. AK Golf Software   — Digitale verktøy for klubber/trenere
4. Utvikling          — Sportsplaner, trenerutvikling, organisasjonsrådgiving
```

- Forsiden: Vis alle fire med like stor vekt (2×2 grid, Apple-stil)
- Hver divisjon: Én tydelig overskrift + kort beskrivelse + to CTA-er

### A6. CTA-strategi per divisjon

| Divisjon | Primær CTA | Sekundær CTA |
|---|---|---|
| Academy | "Avtal en samtale" | "Les mer →" |
| Junior Academy | "Avtal et møte" | "Les mer →" |
| Software | "Se demo" / "Kontakt oss" | "Les mer →" |
| Utvikling | "Ta kontakt" | "Les mer →" |

---

## Del B: Apple-inspirert design

### B1. Forside — ny seksjonsstruktur

```
1. HERO          — Full-bredde bilde, minimal tekst, to CTA-er
                   Mørk bakgrunn
2. DIVISJONER    — 2×2 grid med de fire pilarene
                   Lys bakgrunn (#FAFBFC)
3. METODE        — AK-Formelen, IUP, Mentalt spill (tre pilarer)
                   Mørk bakgrunn (ink-100)
4. TEAM          — Anders + Markus side om side
                   Lys bakgrunn
5. TESTIMONIALS  — Kundesitater (kun ekte, verifiserte)
                   Mørk bakgrunn
6. CTA           — "Avtal en samtale" + kontaktinfo + GFGK-lokasjon
                   Lys bakgrunn (surface-cream)
```

**Mønster**: Lys → Mørk → Lys → Mørk → Lys (Apple-alternering)

### B2. Seksjonsspacing og layout
- **Seksjonsspacing**: 8rem (128px) mellom seksjoner på desktop
- **Maks én overskrift + én undertekst per seksjon** (Apple-regel)
- **Maks to CTA-er per seksjon** (primær fylt + sekundær tekstlenke)
- **Sentrert innhold** med `max-width: 1120px`

### B3. Typografi — renere hierarki
- Hero-heading: `clamp(3rem, 6vw, 5rem)` — større, mer impact
- Seksjons-heading: `clamp(2rem, 4vw, 3rem)` — ren, sentrert
- Body: 18px (1.125rem) — bedre lesbarhet
- Reduser antall fontvekter i bruk (400 + 600 kun)

### B4. Farger — sterkere kontrast
- **Lyse seksjoner**: `#FAFBFC` (snow) eller `#FFFFFF` (hvit)
- **Mørke seksjoner**: `#0A1929` (deep ink) — ren kontrast
- **Gull-aksent**: Kun for CTA-knapper og små detaljer — ikke overprodusert
- Fjern alle "surface-cream" mellomtoner — gå rett fra hvit til mørk

### B5. Knapper — Apple-mønster
Allerede implementert, men refiner:
- **Primær**: Gull pill-knapp, ren tekst, opacity-hover
- **Sekundær**: Ren tekst + pil (→), ingen bakgrunn/border
- **Avstand**: Minst 16px mellom primær og sekundær CTA
- **Kun to knapper** per seksjon — aldri mer

### B6. Bilder — dominerende visuals
- **Hero**: Full-bredde bakgrunnsbilde med subtilt mørkt overlay
- **Team-seksjonen**: Store portrettbilder (3:4 aspekt) av Anders og Markus
- **Divisjonskort**: Vurder ikon/illustrasjon i stedet for foto (renere)
- **Metode-seksjonen**: Ikoner eller enkle illustrasjoner (ikke foto)

---

## Del C: Tekniske endringer (filer)

### Filer som endres:

| Fil | Endring |
|---|---|
| `lib/website-constants.ts` | Fjern `STATS`, `RESULTS`. Oppdater `HERO`, `FOUNDER`. Legg til `TEAM`-konstant med Anders + Markus. Oppdater kontaktinfo/lokasjon. Oppdater CTA-tekster. |
| `app/page.tsx` | Fjern StatsStrip, Marquee, Results-seksjon. Endre seksjon 6b (Founder) til Team-seksjon. Oppdater bakgrunnsfarger for lys/mørk-alternering. Forenkle CTA-tekster. |
| `app/globals.css` | Oppdater spacing-variabler. Fjern `surface-cream`. Legg til mørk seksjonsstil. |
| `components/website/StatsStrip.tsx` | Kan beholdes for eventuell fremtidig bruk, men fjernes fra forside |
| `app/junior/page.tsx` | Legg til opptakskriterier/retningslinjer-seksjon. Endre CTA til "Avtal et møte". |
| `components/website/CTASection.tsx` | Oppdater tekst fra "eksklusivitet" til mer inkluderende tone |

### Nye komponenter (vurder):

| Komponent | Formål |
|---|---|
| `TeamSection.tsx` | Vis Anders + Markus med bilde, bio, kontakt |

---

## Del D: Prioritering

### Fase 1 — Innhold (først)
1. Fjern fiktive tall (StatsStrip, Results, Marquee)
2. Oppdater CTA-tekster til "Avtal en samtale/møte"
3. Oppdater kontaktinfo (lokasjon, GFGK)
4. Legg til Markus i TEAM-konstant

### Fase 2 — Design
5. Implementer lys/mørk seksjonsalternering
6. Bygg TeamSection-komponent (Anders + Markus)
7. Øk typografi-størrelser (hero, body)
8. Forenkle forsiden til 6 seksjoner

### Fase 3 — Junior Academy
9. Legg til opptakskriterier på Junior-side
10. Tilpass søknadsskjema for "uforpliktende møte"

---

## Spørsmål som må avklares

- [ ] Markus sitt etternavn og tittel/sertifiseringer
- [ ] Korrekt adresse/lokasjon (Vinger? Indahl? Hvilken golfklubb?)
- [ ] Er GFGK = Grønmo Frilufts- og Golfklubb, eller annen klubb?
- [ ] Ekte telefonnummer og e-post for Anders og Markus
- [ ] Hvilke testimonials er ekte og kan brukes?
- [ ] Bilder: Når kan fotografering gjennomføres?
