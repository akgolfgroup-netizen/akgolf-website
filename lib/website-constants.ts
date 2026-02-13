// ─── Navigation ───
export const NAV_LINKS = [
  { label: "Hjem", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Junior", href: "/junior" },
  { label: "Utvikling", href: "/utvikling" },
] as const;

// ─── Hero ───
export const HERO = {
  eyebrow: "Premium golfutvikling",
  heading: "Elevate your game.",
  subheading: "Individuell coaching på høyeste nivå for ambisiøse golfere som krever resultater.",
  urgencyBadge: "Kun 12 plasser tilgjengelig for 2026-sesongen",
  ctaPrimary: "Søk om plass",
  ctaSecondary: "Se vår metode",
  trustItems: ["PGA-sertifiserte trenere", "Dokumenterte resultater", "Skreddersydd for deg"],
} as const;

// ─── Stats ───
export const STATS = [
  { value: 10, suffix: "+", label: "Års erfaring", prefix: "" },
  { value: 3, suffix: "", label: "Tour-spillere utviklet", prefix: "" },
  { value: 4.2, suffix: "", label: "Gjennomsnittlig hcp-forbedring", prefix: "" },
  { value: 97, suffix: "%", label: "Fornøydhetsgrad", prefix: "" },
] as const;

// ─── Divisions / Services ───
export const DIVISIONS = [
  {
    id: "academy",
    title: "AK Golf Academy",
    description: "1:1 coaching og skreddersydde utviklingsplaner for voksne spillere som vil ta spillet til neste nivå.",
    features: ["Individuell coaching", "Videoanalyse", "IUP-plan", "Mental trening"],
    href: "/academy",
    accent: "navy" as const,
  },
  {
    id: "junior",
    title: "Junior Academy",
    description: "Strukturert talentutvikling for unge spillere med ambisjon om å konkurrere på høyeste nivå.",
    features: ["Aldersinndelt trening", "Konkurranseprogram", "Periodisering", "Foreldresamarbeid"],
    href: "/junior",
    accent: "forest" as const,
  },
  {
    id: "software",
    title: "AK Golf Software",
    description: "Digitale verktøy og plattformer som revolusjonerer treningshverdagen for klubber og trenere.",
    features: ["QR-treningsskilt", "IUP-plattform", "Analyseverktøy", "Rapportering"],
    href: "/utvikling",
    accent: "tech" as const,
  },
  {
    id: "klubbtrening",
    title: "Klubbtrening & Rådgiving",
    description: "Sportsplaner, trenernettverk og organisasjonsutvikling for golfklubber som vil lede.",
    features: ["Sportsplaner", "Trenerutvikling", "Programdesign", "Organisasjonsrådgiving"],
    href: "/utvikling",
    accent: "gold" as const,
  },
] as const;

// ─── Method Pillars ───
export const METHOD_PILLARS = [
  {
    number: "01",
    title: "AK-Formelen",
    subtitle: "Teknikk + Strategi + Mental styrke",
    description: "Vår unike treningsmetodikk kombinerer fysisk teknikk, strategisk kursmanagement og mental robusthet i ett integrert system. Hver elev får en skreddersydd plan basert på grundig analyse.",
  },
  {
    number: "02",
    title: "Individuell utviklingsplan (IUP)",
    subtitle: "Din personlige vei til resultater",
    description: "Hver spiller får en detaljert, målstyrt utviklingsplan med klare milepæler, ukentlige fokusområder og kontinuerlig justering basert på fremgang og data.",
  },
  {
    number: "03",
    title: "Mentalt spill",
    subtitle: "Prestasjon under press",
    description: "Vi integrerer mental trening i hver økt. Visualisering, rutiner, fokusteknikker og stressmestring — fordi de beste slagene skjer når hodet er klart.",
  },
] as const;

// ─── Testimonials ───
export const TESTIMONIALS = [
  {
    quote: "Anders har fullstendig transformert spillet mitt. Fra 18 til 11 i handicap på ett år — med en metode som føles naturlig og bærekraftig.",
    name: "Thomas R.",
    role: "Medlem siden 2022",
    featured: true,
  },
  {
    quote: "Den individuelle tilnærmingen er det som skiller seg ut. Her er du ikke et nummer — du er et prosjekt de bryr seg om.",
    name: "Maria L.",
    role: "Academy-elev",
    featured: false,
  },
  {
    quote: "Junior-programmet ga datteren vår struktur, motivasjon og en ekte følelse av mestring. Anbefales på det sterkeste.",
    name: "Erik og Lise S.",
    role: "Juniorforeldre",
    featured: false,
  },
  {
    quote: "Vi implementerte AK Golf sin sportsplan i klubben. Resultatet var en 40% økning i juniorrekruttering første år.",
    name: "Knut A.",
    role: "Daglig leder, Bogstad GK",
    featured: false,
  },
] as const;

// ─── Values ───
export const VALUES = [
  {
    number: "01",
    title: "Eksklusivitet",
    description: "Vi tar kun imot et begrenset antall elever for å sikre at hver eneste spiller får den oppmerksomheten de fortjener.",
  },
  {
    number: "02",
    title: "Evidensbasert",
    description: "Vår metode er forankret i forskning, data og dokumenterte resultater — ikke synsing og generelle tips.",
  },
  {
    number: "03",
    title: "Helhetlig utvikling",
    description: "Vi ser hele spilleren. Teknikk, strategi, mental styrke og fysisk form — alt henger sammen i vår tilnærming.",
  },
  {
    number: "04",
    title: "Langsiktig partnerskap",
    description: "Vi bygger varige relasjoner med våre elever. Utvikling tar tid, og vi er her for hele reisen.",
  },
] as const;

// ─── Results Data ───
export const RESULTS = [
  { value: "4.2", label: "Gjennomsnittlig hcp-forbedring", detail: "slag lavere på 12 måneder" },
  { value: "89%", label: "Når sine mål", detail: "av elevene når sine årsmål" },
  { value: "3x", label: "Raskere utvikling", detail: "sammenlignet med tradisjonell trening" },
] as const;

// ─── Application Steps ───
export const APPLICATION_STEPS = [
  { step: "01", title: "Send søknad", description: "Fyll ut vår korte søknad med dine mål og nåværende nivå." },
  { step: "02", title: "Innledende samtale", description: "Vi tar en uforpliktende prat for å bli kjent og forstå dine ambisjoner." },
  { step: "03", title: "Vurdering", description: "En grundig analyse av spillet ditt — på banen, på rangen og med data." },
  { step: "04", title: "Din plan", description: "Du får en skreddersydd utviklingsplan og vi starter reisen sammen." },
] as const;

// ─── Academy Page ───
export const ACADEMY_FEATURES = [
  { title: "1:1 Coaching", description: "Dedikert tid med din trener — fokusert, intensiv og tilpasset dine behov." },
  { title: "Videoanalyse", description: "Avansert videoanalyse av sving, teknikk og bevegelsesmønster med AI-støttet feedback." },
  { title: "IUP-plan", description: "Din personlige utviklingsplan med ukentlige mål, øvelsesprogram og kontinuerlig oppfølging." },
  { title: "Mental trening", description: "Integrert mental coaching med fokus på prestasjon under press og turneringsmestring." },
  { title: "Kursmanagement", description: "Strategisk spill — les banen, velg riktig slag, og optimaliser scoren din." },
  { title: "Fysisk trening", description: "Golfspesifikk styrke, mobilitet og skadeforebygging i samarbeid med fysioterapeut." },
] as const;

export const ACADEMY_PROGRAMS = [
  {
    name: "Grunnpakke",
    price: "Fra 4 900,-/mnd",
    description: "For spillere som vil ha en solid struktur og jevnlig oppfølging.",
    features: ["2 coaching-økter/mnd", "IUP-plan", "Videoanalyse", "Meldingsstøtte"],
    highlighted: false,
  },
  {
    name: "Utviklingspakke",
    price: "Fra 8 900,-/mnd",
    description: "For ambisiøse spillere med klare mål og dedikasjon til forbedring.",
    features: ["4 coaching-økter/mnd", "IUP-plan", "Ukentlig videoanalyse", "Mental trening", "Kursmanagement-økt", "Direkte trener-tilgang"],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "På forespørsel",
    description: "For de som krever det aller beste — uten kompromisser.",
    features: ["Ubegrenset coaching", "Daglig oppfølging", "Turneringsstøtte", "Fysisk trening", "Full IUP + mentalt", "Reise-coaching"],
    highlighted: false,
  },
] as const;

export const ACADEMY_FAQ = [
  { q: "Hva skiller AK Golf Academy fra andre golftrenere?", a: "Vi tilbyr en helhetlig, evidensbasert tilnærming der hver elev får en skreddersydd utviklingsplan. Kombinasjonen av 1:1 coaching, videoanalyse, mental trening og kontinuerlig oppfølging gir resultater langt over gjennomsnittet." },
  { q: "Hvor ofte bør jeg trene for å se resultater?", a: "De fleste av våre elever ser merkbar fremgang med 2-4 coaching-økter i måneden, kombinert med egentrening etter IUP-planen. Vi tilpasser opplegget etter ditt nivå og dine mål." },
  { q: "Trenger jeg et visst handicap for å starte?", a: "Nei, vi jobber med spillere på alle nivåer. Det viktigste er motivasjon og vilje til å investere i egen utvikling. Vi tilpasser metodikken etter ditt utgangspunkt." },
  { q: "Hvordan fungerer videoanalysen?", a: "Vi bruker avansert videoteknologi for å analysere svingen din fra flere vinkler. Du får detaljerte tilbakemeldinger og konkrete øvelser du kan jobbe med mellom øktene." },
  { q: "Kan jeg fryse medlemskapet?", a: "Ja, alle pakker kan fryses i opptil 2 måneder per år ved sykdom, skade eller andre spesielle omstendigheter." },
  { q: "Tilbyr dere trening utendørs hele året?", a: "Vi trener både innendørs og utendørs, avhengig av sesong og været. Om vinteren bruker vi innendørsanlegg med simulator og analyseverktøy." },
  { q: "Hva inkluderer den mentale treningen?", a: "Mental trening er integrert i alle økter og inkluderer teknikker for visualisering, prestasjonsrutiner, fokus og stressmestring. For Elite-pakken tilbyr vi også dedikerte mentaløkter." },
  { q: "Hvordan søker jeg om plass?", a: "Send en søknad via nettstedet vårt. Vi tar kontakt innen 48 timer for å avtale en uforpliktende innledende samtale." },
] as const;

// ─── Junior Page ───
export const JUNIOR_PROGRAMS = [
  {
    ageGroup: "13–15 år",
    title: "Grunnlag",
    description: "Bygge solide tekniske ferdigheter, spilleforståelse og treningsvaner.",
    features: ["2 gruppeøkter/uke", "Individuell teknikk", "Introduksjon til konkurranse", "Sesongplan"],
  },
  {
    ageGroup: "16–17 år",
    title: "Utvikling",
    description: "Spisse ferdigheter, konkurrere regelmessig og utvikle eget spill.",
    features: ["3 økter/uke", "Individuell IUP", "Turneringsplan", "Mental trening", "Videoanalyse"],
  },
  {
    ageGroup: "18–19 år",
    title: "Pre-elite",
    description: "Forberedelse til elite- eller college-golf med full profesjonell støtte.",
    features: ["4-5 økter/uke", "Full IUP + mental", "Nasjonal/internasjonal konkurranse", "Fysisk trening", "Kursmanagement", "Stipend-veiledning"],
  },
] as const;

export const JUNIOR_FAQ = [
  { q: "Hva er minimumsnivå for å delta?", a: "Vi tar imot juniorer fra nybegynnernivå, men de må ha grønt kort eller tilsvarende grunnopplæring. Det viktigste er motivasjon og treningsvilje." },
  { q: "Hvor mange juniorer er det i hver gruppe?", a: "Maksimalt 6 juniorer per gruppe for å sikre individuell oppfølging. Noen økter er 1:1 eller i enda mindre grupper." },
  { q: "Hva koster juniorprogrammet?", a: "Prisene varierer etter aldersgruppe og program. Kontakt oss for en detaljert oversikt og muligheter for stønad/stipend." },
  { q: "Hvordan følger dere opp foreldrene?", a: "Vi har kvartalsvise foreldremøter, månedlige fremgangsrapporter og en åpen kommunikasjonskanal. Foreldreinvolvering er viktig for oss." },
  { q: "Tilbyr dere sommercamps?", a: "Ja, vi arrangerer intensive sommercamps i juni og juli med fokus på konkurranse, teknikk og det sosiale." },
  { q: "Hjelper dere med college-golf i USA?", a: "Absolutt. For 18-19-årsprogrammet tilbyr vi veiledning om college-prosessen, inkludert kontakt med universiteter og stipendsøknad." },
] as const;

// ─── Utvikling Page ───
export const SOFTWARE_FEATURES = [
  { title: "QR-treningsskilt", description: "Digitale treningsskilt med QR-koder som gir spillerne tilgang til øvelser, videoer og instruksjoner direkte på rangen." },
  { title: "IUP-plattform", description: "Skybasert plattform for individuelle utviklingsplaner. Spillere og trenere samarbeider i sanntid om mål og fremgang." },
  { title: "Analyseverktøy", description: "Dataanalyse av treningsdata, runder og utvikling over tid. Visualiser fremgang og identifiser forbedringspotensial." },
  { title: "Rapportering", description: "Automatiserte rapporter for klubbledelse, trenere og foreldre. Dokumenter aktivitet, fremgang og resultater." },
] as const;

export const KLUBB_FEATURES = [
  { title: "Sportsplaner", description: "Helhetlige sportsplaner tilpasset klubbens størrelse, ambisjoner og ressurser. Fra junior til elite." },
  { title: "Programdesign", description: "Skreddersydde treningsprogrammer for alle nivåer. Strukturerte ukeplaner, periodisering og konkurransekalender." },
  { title: "Trenerutvikling", description: "Kurs, mentoring og nettverk for klubbtrenere. Hev kompetansen og behold de beste trenerne." },
  { title: "Organisasjonsrådgiving", description: "Strategisk rådgiving for golfklubber som vil profesjonalisere sportslig aktivitet og organisasjonsstruktur." },
] as const;

export const UTVIKLING_AUDIENCES = [
  { title: "Golfklubber", description: "Små og store klubber som vil løfte trenings- og utviklingstilbudet." },
  { title: "Golfforbund", description: "Regionale og nasjonale forbund som søker standardiserte løsninger." },
  { title: "Trenere", description: "Profesjonelle trenere som vil effektivisere og digitalisere arbeidet." },
  { title: "Golfskoler", description: "Etablerte golfskoler som vil integrere teknologi og moderne metoder." },
] as const;

// ─── Footer ───
export const FOOTER_LINKS = {
  divisions: [
    { label: "Academy", href: "/academy" },
    { label: "Junior Academy", href: "/junior" },
    { label: "Software", href: "/utvikling" },
    { label: "Klubbtrening", href: "/utvikling" },
  ],
  company: [
    { label: "Om oss", href: "/#story" },
    { label: "Vår metode", href: "/#method" },
    { label: "Resultater", href: "/#results" },
    { label: "Verdier", href: "/#values" },
  ],
  contact: {
    email: "post@akgolf.no",
    phone: "+47 900 00 000",
    location: "Oslo, Norge",
  },
} as const;

// ─── Formspree ───
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
