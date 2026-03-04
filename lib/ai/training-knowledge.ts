// Compressed AK Golf training methodology knowledge for AI system prompt
// Source: AK Golf CANON (proprietary IP) — destilled for plan generation
// This file provides the domain knowledge the AI needs to generate valid plans
//
// CROSS-REFERENCE NOTES (verified against CANON 2026-03-02):
// - PYRAMID_TABLE in category-engine.ts: interpolated from 4-level CANON (D/C/B/A)
//   and age-group source (02_STRUKTUR). Not exact 1:1 match but reasonable.
// - CS_TABLE: CANON indexes by age + 4 levels, code maps to 11 categories. Proxy.
// - PR_TABLE: CANON indexes by age (PR2=10+, PR3=12+, PR4=13+, PR5=14+),
//   code maps to HCP-based categories. Loses age dimension.
// - WEEK_THEMES: Code uses Langt/Kort/Banespill/Testing. CANON 10_AARSPLAN has
//   Driver/Iron/Kort spill/Putting. Both valid rotation models.

export const AK_METHODOLOGY = `
## AK-FORMELEN (Treningspyramiden)
Fem nivåer — ALLTID bygg nedenfra og opp:
FYSISK → TEKNIKK → GOLFSLAG → SPILL+LIFE → TURNERING

Nybegynnere (K-H): mest FYS+TEK, null TURN.
Avanserte (D-A): mer SPILL+TURN, mindre FYS.

## L-FASER (Motorisk Læring)
L-KROPP: Kroppskontroll uten utstyr (K-J)
L-ARM: Arm/hånd med kølle — grep, tempo (I-H)
L-KØLLE: Hel sving — P-posisjoner, kontakt (G-F)
L-BALL: Ballkontakt/flukt — treffkvalitet (E-D)
L-AUTO: Automatisert — ubevisst kompetanse (C-A)

### L-FASE TRENINGSPROTOKOLL
L-KROPP (K-J): Uke 1-2 vekttransfer og rotasjon uten kølle. Fokus: balanse, koordinasjon, kroppsstillinger.
L-ARM (I-H): Legge til armbevegelse. Grep, svingebue, tempo uten ball. Gradvis øke kompleksitet.
L-KØLLE (G-F): Introdusere kølle, fokus på P-posisjoner (P1.0-P10.0). Kontaktpunkt, svingebane, tempo med ball.
L-BALL (E-D): Ballkontakt og flukt. Treffkvalitet, retning, avstandskontroll. CS60-CS80.
L-AUTO (C-A): Vedlikehold og finpuss. Ubevisst kompetanse under press. CS80-CS100.

## MORAD (5 Tekniske Prinsipper)
1. Vekt på hæler gjennom hele svingen
2. Setup/tyngdepunkt-kontroll i to dimensjoner
3. Hofterotasjon: aldri høyre i baksving, venstre i nedsving
4. Sekvens: hofter → overkropp → armer → køllehode
5. P-system: P1.0 (adress) → P5.0 (topp) → P7.0 (impact) → P10.0 (finish)

### P-POSISJONER (Svingsekvens)
P1.0=Address, P2.0=Takeaway (kølle parallell bakover), P3.0=Tidlig baksving (lead-arm parallell),
P4.0=Topp (full skulderrotasjon), P5.0=Tidlig nedsving, P6.0=Delivery (kølle parallell ned),
P7.0=Impact (ballkontakt), P8.0=Tidlig gjennomsvíng, P9.0=Sen gjennomsvíng, P10.0=Finish.
Nybegynnere: Forenklet P1.0 "Start", P4.0 "Topp", P7.0 "Treff", P10.0 "Slutt".
Avanserte (13+): Alle 10 posisjoner med desimaler og videoanalyse.

## 90-MINUTTERS ØKTSTRUKTUR
Oppvarming: 15 min (fysisk + teknisk prep)
Hoveddel A: 25 min (primærfokus)
Hoveddel B: 25 min (sekundærfokus)
Anvendelse: 15 min (spill/kamp)
Avslutning: 10 min (refleksjon, LIFE-moment)

Treningsformat:
- Blokktrening: enkel øvelserepetisjon (nybegynnere 70%, elite 30%)
- Variabel trening: bytt øvelser/mål (nybegynnere 30%, elite 70%)

Blokktrening-ratio etter alder: 5-10=80/20, 11-13=60/40, 14-16=40/60, 17+=30/70.

## PR-NIVÅER (Pressure Rating)
PR1: Alene, ingen konsekvenser
PR2: Med partner, sosial setting (introduseres 10+ år)
PR3: Liten konkurranse, lav innsats (introduseres 12+ år)
PR4: Turnerings-simulering (introduseres 13+ år)
PR5: Reell turnering (introduseres 14+ år)

### PR-til-LIFE kobling
PR1: trygt rom for nye ferdigheter
PR2 → LIFE-SELV: målsetting, selvrefleksjon
PR3 → LIFE-SOS: kommunikasjon, støtte andre
PR4 → LIFE-EMO + LIFE-KAR: sportsånd, emosjonell kontroll
PR5 → LIFE-RES: full resiliens under press

## M-MILJØER (Treningsmiljø)
M0: Gym/treningsrom
M1: Driving range/putting green
M2: Bane uten score
M3: Simulator/launch monitor
M4: Runde med score
M5: Turnering

## LIFE-RAMMEVERK (Mental/Helhetlig)
LIFE-SELV: Selvledelse — mål, ansvar, refleksjon
LIFE-SOS: Sosialt — kommunikasjon, samarbeid
LIFE-EMO: Følelser — frustrasjonsmestring, fokus, tålmodighet
LIFE-KAR: Karakter — sportsånd, ærlighet
LIFE-RES: Resiliens — motgang, utholdenhet, lære av feil

### LIFE-fokus per nivå
Nybegynnere (D/K-J): LIFE-SOS + LIFE-KAR (sosialt, fair play)
Mellom (C/I-H): LIFE-SELV + LIFE-EMO (egne mål, frustrasjonsmestring)
Videregående (B/G-F): LIFE-RES + LIFE-SELV (resiliens, langsiktig planlegging)
Avansert (A/E-D): LIFE-EMO + LIFE-RES (presshåndtering, mental robusthet)

### LIFE-faser etter alder
6-9 GRUNNLAG: Lek, glede, fair play, regler
10-14 BEVISSTGJØRING: Egne mål, håndtere skuffelse, gi tilbakemeldinger
15-19 ANSVAR: Langsiktig planlegging, presshåndtering, mentorrolle
20+ MESTRING: Full selvledelse, mental robusthet, rollemodell

### LIFE-øvelser per aldersgruppe
6-9: Putting-partner (hei), regellek (lær "Fore!", reparer nedslagsmerker), tålmodighetschip (pust før slag)
10-14: Målsetting (2 mål før økt), tilbakemeldingsrunde (1 positiv til partner), reset-rutine (3 åndedrag), ærlighetstrening, frustrasjonsmestring
15-19: Treningsdagbok (ukentlig), press-simulering (turneringssituasjoner med konsekvenser), mentorrolle (hjelp yngre), comeback-challenge (simulert -4 etter 3 hull), langsiktig planlegging (lag egen 4-ukersplan)

## MENTALE FERDIGHETER (8 kjerneferdigheter)
1. Målsetting: SMART-mål, prosess > resultat
2. Pre-shot rutine: tilpasset nivå (se under)
3. Fokus: Nåtidsfokus, refokuser etter feil (Nideffer-modellen)
4. Selvsnakk: Konstruktiv indre dialog, vekstmentalitet
5. Emosjonell regulering: 4-7-8 pusting, aksept, aktiveringsregulering
6. Visualisering: PETTLEP-modellen (Physical, Environment, Task, Timing, Learning, Emotion, Perspective)
7. Presshåndtering: gradvis eksponering via PR-nivåer (presstrapp 6 nivåer)
8. Resiliens: "neste slag"-mentalitet, 4 C-er (Control, Commitment, Challenge, Confidence)

### MENTAL TRENING PER KATEGORIGRUPPE
K-J (6-12 år, nybegynnere):
  Metode: Lekbasert, innbakt i aktiviteter (0-10 min/økt). IKKE kall det "mental trening".
  Ferdigheter: Glede, basiske rutiner, positivt selvsnakk, enkel målsetting.
  Øvelser: Kraftpositur (superheltstilling), magisk ord før sving, lekfull visualisering,
  trafikklys-pusting (rød=stopp/pust, gul=strategi, grønn=slå), superhelt pre-shot rutine,
  "Feildetektiven" (finn hva som gikk bra).
  Pre-shot (3 steg, 15-20s): SE mål (pek med kølle) → FØL sving (1 øvingssving) → SLÅ (setup, pust, slå).

I-H (10-16 år, mellomliggende):
  Metode: Strukturert, 10-15 min/uke dedikert. Mental ferdighetsjournal (ukentlig refleksjon).
  Ferdigheter: Strukturert målsetting (lang/kort/prosess), 5-stegs tidsbestemt pre-shot rutine,
  fokussoner (når fokusere vs slappe av), selvsnakkmestring, basal emosjonell regulering, intro til visualisering.
  Øvelser: Mental runde (spill full runde i hodet), press-putting, selvsnakk-sporing,
  hjertefrekvens-bevissthet, målsettingsark, reset-ritual (3 åndedrag), dagbokskriving.
  Pre-shot (5 steg, 20-40s): VURDER (bak ball, 5-10s) → VISUALISER (se ballflukt, 3-5s) →
  FØL (1-2 øvingssving, 5-10s) → SETUP (over ball, siktelinje, 5-10s) → UTFØR (triggerord/pust, ingen svingtanker, 2-5s).

G-F (14-20 år, avanserte):
  Metode: Avansert, 60+ min/uke. Samarbeid med idrettspsykolog (kvartalsvis minimum).
  Ferdigheter: Omfattende årlig mental treningsplan, systematisk resiliensprogram,
  psykologisk testing/profilering, multisensorisk visualisering, daglig mindfulness/meditasjon,
  biofeedback (HRV), konkurransementalitet, identitet utover golf.
  Øvelser: Komplette mentale rutiner (før/under/etter runde), mental toughness-indeks,
  identitetsarbeid, meditasjonsøvelser, filmstudie av mentalt spill,
  simulert turneringsrunde, comeback-challenge, mentor-rolle.
  Pre-shot (5 steg, 35-50s): STRATEGISK VURDERING (full situasjonsanalyse, risiko/belønning, 10-15s) →
  MULTISENSORISK VISUALISERING (se, hør, føl, sans, 5-8s) →
  FYSISK REPETISJON (målrettede øvingssving, 8-12s) →
  PRESIS SIKTING (mikrojusteringer, smalt fokus, 8-12s) →
  TRIGGER OG UTFØR (personlig trigger, flow-state, 3-5s).

### 12-UKERS MENTAL TRENINGSPLAN
Uke 1-3 (Fundament): Målsetting, pre-shot rutine, grunnleggende fokus — 15-20 min/uke
Uke 4-6 (Mentalitet): Selvsnakk, emosjonell regulering — 15-20 min/uke
Uke 7-9 (Prestasjon): Visualisering, presshåndtering — 20-30 min/uke
Uke 10-12 (Mestring): Resiliens, integrasjon, testing — 20-30 min/uke

### FOKUSMODELL (Nideffer)
Mellom slag: Bredt eksternt (scan banen) → Bredt internt (hullstrategi)
Pre-shot: Bredt eksternt → Smalt eksternt (mål) → Smalt internt ("feel" av sving)
Utførelse: Smalt internt/eksternt
Etter slag: Kort bredt internt → Slipp (bredt eksternt)

### EMOSJONELL REGULERING — Aktiveringstilstander
Overaktivert (nervøs): Magepusting, 4-7-8 pusting, progressiv muskelavspenning, grounding, langsommere tempo
Underaktivert (flat): Energiserende pusting, fysisk aktivering (hopp, klapp), "Go!"-selvsnakk, oppladende visualisering

## 4-UKERS TEMAROTASJON
Uke 1: Langt spill (driver, fairwaywood, lange jern)
Uke 2: Kort spill (putting, chipping, pitching)
Uke 3: Banespill (strategi, kursnavigering, scoring)
Uke 4: Testing og evaluering

## 3-MÅNEDERS SESONGPROGRESJON
Måned 1: Bygg — introduksjon, ferdighetstilegnelse
Måned 2: Utvikle — forbedring, integrasjon
Måned 3: Topp — anvendelse, testing, prestasjon

## PERIODISERING (Belastningsstyring)
Makrosyklus: Full sesong (51 uker). 7 perioder med ulik intensitet og fokus.
Mesosyklus: 3-6 ukers treningsblokk. Progresjon innenfor hvert fokusområde.
Mikrosyklus: Ukentlig plan. Følg 4-ukers temarotasjon.

### ÅRSPERIODISERING (7 perioder)
1. Forberedelse (uke 1-13, jan-mar): Teknikk + FYS + indoor. P-posisjoner: jan=P1-P4 (baksving), feb=P4-P7 (nedsving), mar=P7-P10 (gjennomsvíng).
2. Vårovergáng (uke 14-16, apr): Tilpasning outdoor, overgang fra simulator til bane.
3. Konkurranse 1 (uke 17-26, apr-jun): Turneringer + prestasjon. -2 gruppetreninger turneringsuker, +1 analyseøkt etter.
4. Sommerintensiv (uke 27-32, jul-aug): Camp/høyt volum.
5. Konkurranse 2 (uke 33-39, aug-sep): Turneringer + prestasjon.
6. Høstovergang (uke 40-43, okt): Evaluering: uke 40=testing (PEI), uke 41=IUP-samtaler, uke 42=foreldremøte, uke 43=planlegging neste sesong.
7. Indoor (uke 44-52, nov-des): Teknikk + analyse + planlegging.

### VOLUMPROGRESJON PER PERIODE
Forberedelse: 91 timer (13 uker × 7t/uke). Høy FYS.
Vår: 21 timer (3 uker). Overgang.
Konkurranse 1: 70 timer (10 uker). Turneringsfokus.
Sommer: 48 timer (6 uker). Intensivt.
Konkurranse 2: 49 timer (7 uker). Turneringsfokus.
Høst: 28 timer (4 uker). Evaluering.
Indoor: 52 timer (8 uker). Teknikk.
Totalt: ~359 strukturerte timer + ~200 selvtrening/turneringer.

## SESONGSPESIFIKKE JUSTERINGER
Vinter (jan-mar): FYS-forbedring, teknikk-korreksjoner, mental, indoor-sim
Vår (apr-jun): Overgang outdoor, SLAG-utvikling, strategi, putting
Sommer (jul-sep): Turneringsforberedelse, scoring, mental styrke
Høst (okt-des): Evaluering, IUP-oppdatering, planlegging neste sesong

## GOLFTERMINOLOGI (Norsk standard)
P-system: Svingens 10 posisjoner (P1.0–P10.0)
CS: Klubbhastighet (Club Speed) i mph
PEI: Precision Efficiency Index — presisjonsmål
GIR: Green in Regulation — green nådd på regulering
FIR: Fairway in Regulation — fairway truffet
Smash Factor: Ballhastighet / Klubbhastighet (maks ~1.50 for driver)
Carry: Flyavstand (meter/yards)
Scrambling: Reddet par etter bommet green
Up-and-down: Chip/pitch + 1 putt = par
Birdie/Bogey/Par: 1 under/over/på regulering
Fade: Høyrekurve (venstrehent: venstrekurve)
Draw: Venstrekurve (venstrehent: høyrekurve)
Pitch: Høyt kort slag (30-80 yard)
Chip: Lavt kort slag (nærmere green)
Bunker: Sandhindring
IUP: Individuell Utviklingsplan
`;

export const DECADE_DRILLS_COMPACT = `
## DECADE-ØVELSER — 74 drills fra DECADE-systemet
Format: Navn | Type | Tid | Nivå | Prosedyre

### PUTTING

#### Kort putt (3-6 fot)
3 footers | Score | 20min | Alle | 50 putter fra 3ft. Tell antall innputter. Mål: 45+.
3-6 foot drill | Score | 5min | Alle | 10 putter: 3 fra 3ft, 3 fra 4ft, 3 fra 5ft, 1 fra 6ft. Tell innputter.
3 4 5 Drill | Fullføring | 20min | I-F | 6 baller fra 3ft, 4 fra 4ft, 2 fra 5ft. Bom = start på nytt.
80 Putts | Score | 30min | G-D | 30×3ft + 25×4ft + 10×5ft + 10×6ft + 5×10ft. Mål: 74 innputter.
Minus 5 | Score | 25min | I-F | Bare 5ft-putter. Birdie ved innputt. Fortsett til 5 under.
Short putt confidence | Score | 5min | Alle | 10 innputter på rad fra 3ft rett før runde. Selvtillitsbygging.
Gate Drill | Score | 45min | I-F | 2 tees ved tå/hæl av putter. 10 putter høyre hånd, 10 begge. Mål: 100 fra 3ft.
Coin Drill | Pass/Fail | 15min | G-D | Mynt foran hull. 5 innputter fra 3/4/5ft over mynt. Bom mynt = start på nytt.

#### Sirkel/Klokke
Circle Drill | Fullføring | 45min | G-D | 6 baller i sirkel rundt hull. Alle 6 fra 2/4/6ft. 18 på rad. Bom = start på nytt.
Clock Drill | Fullføring | 25min | I-F | Tees kl 2/6/9/12 på 4 og 5ft. Alle 8 på rad, 2 runder. Bom = start på nytt.
Tornado Drill | Fullføring | 30min | G-D | Tees 2-8ft i spiral. 1 putt fra hver på rad. Bom = start på nytt.
Row | Fullføring | 25min | I-F | 2×2ft + 3×3ft + 3×4ft + 3×5ft + 1×6ft = 12 på rad. Bom = start på nytt.

#### Mellomavstand og lag
10ft Putts | Repetisjon | 5min | Alle | 12 putter fra 10ft. Tell innputter.
8ft Putts | Repetisjon | 5min | Alle | 12 putter fra 8ft. Tell innputter.
15ft Putts | Fullføring | 15min | I-F | 3 ulike 15ft-putter. 3 baller på rad i hull eller forbi (innen grip-lengde). Aldri samme putt to ganger.
Makes | Score | 15min | G-D | 18 putter fra 10-25ft. Fokus på å putte inn. Hvert hull par 2.
Angles | Score | 30min | G-D | 3 baller fra 10/15/20ft fra 6 vinkler = 18 putter. Mål: score 30.
18 2-Putts in a Row | Fullføring | 15min | G-D | 1 ball fra 20/30/40ft. Må 2-putte 18 hull på rad. Full rutine.
Lag Putting drill | Score | 10min | I-F | 3 baller 20ft+ fra hull. 3 hull, gjenta 3x. Tell 2-putter av 9.
Two-Putt Drill | Fullføring | 30min | E-C | 6 to-putter på rad fra 40ft+. 3-putt = start på nytt.
Putt Until You Make | Fullføring | 45min | G-D | Putt til innputt fra 15/20/25/30/35/40ft. Full rutine hver putt.

#### Press og teknikk
Drawbacks | Score | 20min | G-D | 18 hull putting. Dra tilbake 1 putterlengde ved bom. Unngå 3-putter.
Putting with Jumping Jacks | Teknikk | 10min | I-F | 30s jumping jacks, så 5 innputter på rad fra 5ft. Simulerer nerver.
Speed Control | Fullføring | 20min | I-F | 4 baller midt på green. Putt til fringe i 4 retninger. Stopp innen putterlengde.
Speed putting drill | Score | 10min | Alle | Fra 3ft: øv bak/midt/forkant av hull. 10 putter, tell perfekt fart.
Chalk Line | Teknikk | 10min | Alle | Krittlinje for rett putt. Rull ball langs linja. Sjekk siktelinje.
Faceoff | Teknikk | 10min | I-F | 2 baller ved siden av hverandre. Putt begge samtidig. Leder en = tå/hæl-treff.
Pro-Side | Teknikk | 5min | I-F | Tee foran hull. Breaking 4-5ft putt. Hold ballen over teen.
Green reading | Teknikk | 5min | Alle | Memorer rett 5ft-putt på øvingsgreen. Visualiser daglig.
Yard Stick | Teknikk | 10min | Alle | Putt langs en yardstick. Ballen må holde seg på. Trener startlinje.
Putting with SW | Fullføring | 15min | G-D | 10 innputter på rad fra 3ft med leading edge av SW som putter.
Putt to a tee | Score | 15min | Alle | Tee i bakken, putt fra 3ft. Tell treff.
Green reading 2 | Score | 5min | I-F | 4 baller fra motsatte sider av hull. Les breaking putt. Tell korrekte lesninger.

### KORT SPILL

+1 Drill | Pass/Fail | 20min | I-F | 10 chipper 15-20ft. Chip inn=-1, 1 putt=0, 2 putter=+1. Gjenta til +1 eller bedre.
6s | Score | 20min | I-F | 18 hull up-and-down: 6 lette, 6 middels, 6 vanskelige. Totalskår.
9 Easy Chips | Pass/Fail | 20min | Alle | 9 lette chipper 1-3 skritt fra green. 5 baller per spot, 3 av 5 up-and-down.
9 Hole Up and Downs | Pass/Fail | 30min | I-F | 1 ball up-and-down fra 9 steder rundt chipping green. Mål: 7/9.
Drops | Score | 15min | Alle | 20 baller droppet rundt chipping green. Tell antall innen flaggstanglengde.
Flagstick Drill | Score | 25min | Alle | 20 baller rundt øvingsgreen. Tell innen flaggstanglengde fra hull.
Landing spots | Score | 5min | Alle | 3 baller fra utsiden av green. Tee ved landingspunkt. Tell kølle-lengde landinger. 9 steder.
High/Low (Chipping) | Teknikk | 10min | I-F | Velg posisjon, spill høyt og lavt til samme pin. 20 ganger.
High/Low (Short Game) | Teknikk | 10min | I-F | Velg posisjon, spill høyt og lavt til pin. 20 ganger.
Shafts | Fullføring | 20min | G-D | 4 skaft 2-3ft fra hverandre. Lett/middels/vanskelig. 1 ball i hvert gap, bom = start på nytt.
Up & Down Club Challenge | Fullføring | 30min | G-D | 12 baller fra 1 posisjon. Up-and-down med SW, PW, 9i, 8i, 7i, hybrid.

### BUNKER

Bunker Pin Length | Teknikk | 5min | I-F | Kort bunkerslag, tell innen pinnelengde (7ft) av 10.
Buried Lies | Pass/Fail | 15min | G-D | 10 baller i begravde leier. Få minst 5 ut på green.
Closer | Score | 20min | G-D | Bunkerslag til pinnen, aldri forbi. Tell baller nærmere enn forrige. Forbi = game over.
High/Low bunker | Score | 10min | G-D | 10 lave + 10 høye bunkerslag. Tell vellykkede.
Houston We Have a Problem | Score | 30min | E-C | 10 baller i bunker i alle ulike leier. Up-and-down av 10.

### APPROACH

100 yard shot | Landingsmål | 5min | I-F | 20 slag til mål på 100 yard, 20ft radius.
110 YARD DRILL | Score | 25min | G-D | 5 baller fra 40-110 yard (10yd steg). Greens truffet av 40. Mål: 24+.
Grip Downs | Score | 25min | G-D | Mål på 120 og 150 yard. 1 kølle ekstra, grip ned. 10 slag til hvert mål.
On the 5s | Score | 25min | I-F | 5 baller fra 45 yard, deretter 55, 65, 75+ til målgreen. Score av 40.
Pin Seeker (90-120) | Pass/Fail | 25min | G-D | Approach til flagg med ulike ballflukter. Mål: land på green.
88 Shot Challenge | Teknikk | 60min | E-C | Full rutine på hvert slag. Slagformer med 7i-4i. Avslutt med 10 vanlige 6i.
Wedge Challenge | Pass/Fail | 25min | G-D | 3 baller hver 10 yard fra 40-110. Tilfeldig rekkefølge. Greens av 40.
Wedge Pyramid | Score | 45min | G-D | Start 50 yard, opp til 100. Gå videre bare ved landing innen 3 yard. Beste: 6.
Wedges: 30 Ball Scatter | Score | 45min | E-C | 30 baller 30-120 yard. Full rutine. Mål: 25 greens.

### UTSLAGSPILL

Add-on Driver Drill | Pass/Fail | 20min | I-F | 14 baller. Driver mellom markører. Bom = legg til 1 ball. Slå til tom.
Driver Accuracy Drill | Repetisjon | 15min | Alle | 2 markører som fairway. 15 drivere. Tell fairways.
Flight control | Score | 25min | G-D | 10 driver høyre-til-venstre, 10 venstre-til-høyre. Tell vellykkede.
Low/High | Score | 30min | G-D | 30 baller. Veksle høye og lave tee-slag. Tell vellykkede av 30.
Target practice | Score | 15min | Alle | 10 tee-slag mot spesifikt mål. Tell korrekte startretninger.

### BANESPILL (Krever bane)

Best Ball | Score | 140min | G-D | 9/18 hull. 2 baller per slag, ta den beste. Se hvor lavt du kan gå.
Worst Ball | Pass/Fail | 120min | E-C | 9/18 hull. 2 baller, ta den verste. Score relativt til par.
9 Hole Par 3 Course | Fullføring | 120min | G-D | Spill par 3-bane (60-150 yard). Fortsett til under par.
Forward Tees | Pass/Fail | 140min | E-C | Spill fra røde tees. Unngå bogeys. Mål: minst 6 birdies.
Misses | Score | 300min | E-C | 18 hull, bom alle greens med vilje. Spor up-and-downs.
Position Z | Teknikk | 180min | E-C | 18 hull, plasser ball i dårlig posisjon. Prøv å redde par. Vær kreativ.
Pick-up & Drop | Score | 240min | G-D | 18 hull, plukk opp på green, dropp 3 skritt utenfor. Up-and-down. Hold deg nær par.
Drives and 5s | Pass/Fail | 240min | E-C | 2 drivere per hull. 0pt fairway, +1 bom, +2 trær. Velg wedge-slag for å fullføre. Mål: total 5.
On Course Driving | Teknikk | 360min | G-D | 2 baller fra hvert utslagssted: 1 driver, 1 3-wood. Tell i spill.
`;

export const TEST_PROTOCOLS_COMPACT = `
## TESTPROTOKOLLER (20 standardiserte tester)
Frekvens: Knøtt=årlig, Jr Basis=halvårlig, Jr Utvikling=kvartalsvis, Jr Elite=månedlig.

### Hastighet (krever launch monitor)
1. Driver CS: 5 sving, høyeste hastighet (mph)
2. 7-jern CS: 5 sving, høyeste hastighet (mph)
3. Driver carry: 5 slag, gjennomsnitt av beste 3 (meter)

### Presisjon
4-8. PEI 25m/50m/75m/100m: 10 slag til flagg, PEI = gj.sn. avstand / forventet avstand
9. Fairway precision: 10 drivere mot 30m-bredt fairway-mål, treffprosent
10. GIR simulation: Approach til 9 avstander (80-180m), green-treffprosent

### Kort spill
11. 8-balls up-and-down: chip+putt fra 10 posisjoner, up-and-down-prosent
15. 3m putt: 20 putter fra 3m, innputt-prosent
16. 6m putt: 20 putter fra 6m, innputt-prosent

### Fysisk
12. Medisinball kast: 3kg, 3 rotasjonskast, beste avstand (m)
13. Vertikalt hopp: 3 stående hopp, beste høyde (cm)
14. Hofterotasjon: goniometer, intern rotasjon liggende, grader (V+H)

### Mentalt
18. Fokustest: putting-serie med økende press, skala 1-10
19. Pre-shot rutine-konsistens: 10 slag, mål standardavvik i tid (sek)
20. Konkurransesimulering: 3 hull under simulert turnerings-press, score + mental vurdering (1-10)
17. 9-hulls scoring: 9 hull under testforhold, score relativt til par

### KATEGORI-MÅL (Benchmarks per kategorigruppe)
| Test | K | J | I | H | G | F | E | D | C | B | A |
|------|---|---|---|---|---|---|---|---|---|---|---|
| Driver CS (mph) | — | — | 60 | 65 | 75 | 80 | 85 | 95 | 100 | 105 | 115+ |
| 7-jern CS (mph) | — | — | 50 | 52 | 60 | 65 | 70 | 78 | 82 | 85 | 90+ |
| Driver carry (m) | — | — | 120 | 140 | 160 | 180 | 200 | 220 | 240 | 255 | 270+ |
| PEI 100m (avstand) | — | — | — | — | 25m | 20m | 15m | 12m | 10m | 8m | <5m |
| 3m putt (%) | 20 | 30 | 40 | 50 | 55 | 60 | 65 | 75 | 80 | 85 | 90+ |
| 6m putt (%) | — | 10 | 20 | 25 | 30 | 35 | 40 | 50 | 55 | 65 | 75+ |
| Up-and-down (%) | — | — | 20 | 30 | 35 | 40 | 45 | 55 | 60 | 65 | 70+ |
| Medisinball (m) | 2 | 3 | 4 | 5 | 5.5 | 6 | 7 | 8 | 9 | 10 | 11+ |
`;
