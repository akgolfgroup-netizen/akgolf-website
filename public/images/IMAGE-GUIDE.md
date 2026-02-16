# AK Golf — Bildeguide

## Mappestruktur

```
public/images/
├── hero/
│   └── hero-main.jpg          # Hovedhero — fullbredde bak heading
├── founder/
│   └── anders-kristiansen.jpg # Portrett, stående format
├── academy/
│   └── coaching.jpg           # Coaching-situasjon (voksen + trener)
├── junior/
│   ├── trening.jpg            # Junior-trening på range/bane
│   └── foreldresamarbeid.jpg  # Foreldre + junior + trener
├── utvikling/
│   ├── software-dashboard.jpg # Screenshot eller mockup av software
│   └── klubbtrening.jpg       # Klubbmiljø / gruppetrening
├── method/
│   ├── 01-formelen.jpg        # Teknisk analyse / sving
│   ├── 02-utviklingsplan.jpg  # Planlegging / data / tablet
│   └── 03-mentalt.jpg         # Mental trening / fokus
└── og/
    └── og-default.jpg         # OpenGraph delebilde
```

## Spesifikasjoner per bilde

| Fil | Bredde | Høyde | Sideforhold | Maks KB |
|---|---|---|---|---|
| `hero/hero-main.jpg` | 1920px | 1080px | 16:9 | 250 |
| `founder/anders-kristiansen.jpg` | 1200px | 1600px | 3:4 | 200 |
| `academy/coaching.jpg` | 1600px | 1200px | 4:3 | 150 |
| `junior/trening.jpg` | 1600px | 1200px | 4:3 | 150 |
| `junior/foreldresamarbeid.jpg` | 1600px | 1200px | 4:3 | 150 |
| `utvikling/software-dashboard.jpg` | 1920px | 1200px | 16:10 | 200 |
| `utvikling/klubbtrening.jpg` | 1920px | 1200px | 16:10 | 150 |
| `method/01-formelen.jpg` | 1200px | 900px | 4:3 | 120 |
| `method/02-utviklingsplan.jpg` | 1200px | 900px | 4:3 | 120 |
| `method/03-mentalt.jpg` | 1200px | 900px | 4:3 | 120 |
| `og/og-default.jpg` | 1200px | 630px | ~1.9:1 | 100 |

## Generelle regler

- **Format:** Lagre som JPG med 85-90% kvalitet
- **Retina:** Oppløsningene over er allerede 2x (Next.js skalerer ned automatisk)
- **Fargetone:** Kalde, dempede toner matcher merkevaren (unngå oversaturerte bilder)
- **Stil:** Profesjonell, naturlig lys, ingen tunge filtre. Tenk Titleist/PGA Tour-kvalitet
- **Next.js:** `<Image>` med `fill` + `sizes` genererer WebP/AVIF automatisk

## Bildestil-anbefalinger

- **Grunnregel:** Vis mennesker i aksjon — trening, konsentrasjon, mestring
- **Lys:** Naturlig dagslys, tidlig morgen eller sen ettermiddag (golden hour)
- **Bakgrunn:** Grønne baner, rene treningsfasiliteter, skandinavisk natur
- **Farger i bilde:** Bør harmonere med merkevaren — kjølige grønntoner, dempet gull
- **Unngå:** Stockfoto-følelse, unaturlige poser, overprodusert look
