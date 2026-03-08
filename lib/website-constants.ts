// ─── Navigation ───
export const NAV_LINKS = [
  { label: "Coaching", href: "/coaching" },
  { label: "Junior Academy", href: "/junior" },
  { label: "Produkter", href: "/produkter" },
] as const;

// ─── Hero ───
export const HERO = {
  eyebrow: "Premium golfcoaching",
  heading: "Løft spillet ditt.",
  subheading: "Individuell coaching for ambisiøse golfere som vil ha resultater. Basert ved Gamle Fredrikstad Golfklubb.",
  locationBadge: "Gamle Fredrikstad Golfklubb, Fredrikstad",
  ctaPrimary: "Book en samtale",
  ctaSecondary: "Se vår metode",
  trustItems: ["PGA Professional", "TPI Certified", "Trackman Certified"],
} as const;

// ─── Credentials ───
export const CREDENTIALS = [
  { label: "PGA Professional" },
  { label: "TPI Certified" },
  { label: "Mental Coach" },
  { label: "Trackman Certified" },
] as const;

// ─── Divisions / Services ───
export const DIVISIONS = [
  {
    id: "coaching",
    title: "Coaching",
    description: "1:1 coaching, gruppetimer og bedriftsgolf. Skreddersydde opplegg for voksne spillere som vil ta spillet til neste nivå.",
    features: ["Individuell coaching", "Gruppetimer & kurs", "Bedriftsgolf & events", "Videoanalyse"],
    href: "/coaching",
    accent: "academy" as const,
  },
  {
    id: "junior",
    title: "Junior Academy",
    description: "Strukturert talentutvikling for unge spillere med ambisjon om å konkurrere på høyeste nivå.",
    features: ["Aldersinndelt trening", "Konkurranseprogram", "Periodisering", "Foreldresamarbeid"],
    href: "/junior",
    accent: "junior" as const,
  },
  {
    id: "produkter",
    title: "Produkter",
    description: "Digitale verktøy og plattformer for golfere og golfklubber som vil ligge i forkant av utviklingen.",
    features: ["AI Treningsplan", "QR Treningsskilt", "Merkevare-analyse", "Coaching-portal"],
    href: "/produkter",
    accent: "software" as const,
  },
] as const;

// ─── Method Pillars ───
export const METHOD_PILLARS = [
  {
    number: "01",
    title: "AK-Formelen",
    subtitle: "Teknikk + Strategi + Mental styrke",
    description: "Vår unike treningsmetodikk kombinerer fysisk teknikk, strategisk kursmanagement og mental robusthet i ett integrert system. Hver elev får en skreddersydd plan basert på grundig analyse.",
    image: "/images/academy/AK-Golf-Academy-1.jpg",
  },
  {
    number: "02",
    title: "Individuell utviklingsplan (IUP)",
    subtitle: "Din personlige vei til resultater",
    description: "Hver spiller får en detaljert, målstyrt utviklingsplan med klare milepæler, ukentlige fokusområder og kontinuerlig justering basert på fremgang og data.",
    image: "/images/academy/AK-Golf-Academy-8.jpg",
  },
  {
    number: "03",
    title: "Mentalt spill",
    subtitle: "Prestasjon under press",
    description: "Vi integrerer mental trening i hver økt. Visualisering, rutiner, fokusteknikker og stressmestring — fordi de beste slagene skjer når hodet er klart.",
    image: "/images/academy/AK-Golf-Academy-25.jpg",
  },
] as const;

// ─── Founder ───
export const FOUNDER = {
  name: "Anders Kristiansen",
  title: "Grunnlegger & Head Pro",
  bio: [
    "Med over 10 års erfaring som golftrenere på høyeste nivå har jeg viet karrieren min til å hjelpe ambisiøse spillere med å nå sitt fulle potensial. Fra juniorer med drøm om college-golf til voksne som jakter personlige mål — tilnærmingen er alltid individuell, evidensbasert og resultatorientert.",
    "Jeg grunnla AK Golf Group fordi jeg så et gap i markedet: spillere som ønsket mer enn generelle tips og gruppeundervisning, men en ekte partner i utviklingen. En trener som kjenner spillet ditt, følger opp mellom øktene, og justerer planen basert på data — ikke magefølelse.",
    "Min filosofi er enkel: teknikk alene er ikke nok. De beste resultatene kommer når vi jobber med hele spilleren — teknikk, strategi, mentalt spill og fysikk — i et integrert system tilpasset akkurat deg.",
  ],
  certifications: ["PGA Professional", "TPI Certified", "Mental Coach", "Trackman Certified"],
  experience: "10+",
} as const;

// ─── Testimonials ───
export const TESTIMONIALS = [
  {
    quote: "Anders har fullstendig transformert spillet mitt. Fra 18 til 11 i handicap på ett år — med en metode som føles naturlig og bærekraftig.",
    name: "Thomas R.",
    role: "Medlem siden 2022",
    featured: true,
    photo: "",
  },
  {
    quote: "Den individuelle tilnærmingen er det som skiller seg ut. Her er du ikke et nummer — du er et prosjekt de bryr seg om.",
    name: "Maria L.",
    role: "Academy-elev",
    featured: false,
    photo: "",
  },
  {
    quote: "Junior-programmet ga datteren vår struktur, motivasjon og en ekte følelse av mestring. Anbefales på det sterkeste.",
    name: "Erik og Lise S.",
    role: "Juniorforeldre",
    featured: false,
    photo: "",
  },
  {
    quote: "Vi implementerte AK Golf sin sportsplan i klubben. Resultatet var en 40% økning i juniorrekruttering første år.",
    name: "Knut A.",
    role: "Daglig leder, Bogstad GK",
    featured: false,
    photo: "",
  },
] as const;

// ─── Values ───
export const VALUES = [
  {
    number: "01",
    title: "Dedikasjon",
    description: "Vi gir hver spiller den tiden og oppmerksomheten som trengs for å oppnå reell fremgang.",
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

// ─── Application Steps ───
export const APPLICATION_STEPS = [
  { step: "01", title: "Ta kontakt", description: "Send oss en melding med dine mål og ditt nåværende nivå." },
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

export const ACADEMY_FAQ = [
  { q: "Hva skiller AK Golf Academy fra andre golftrenere?", a: "Vi tilbyr en helhetlig, evidensbasert tilnærming der hver elev får en skreddersydd utviklingsplan. Kombinasjonen av 1:1 coaching, videoanalyse, mental trening og kontinuerlig oppfølging gir resultater langt over gjennomsnittet." },
  { q: "Hvor ofte bør jeg trene for å se resultater?", a: "De fleste av våre elever ser merkbar fremgang med 2-4 coaching-økter i måneden, kombinert med egentrening etter IUP-planen. Vi tilpasser opplegget etter ditt nivå og dine mål." },
  { q: "Trenger jeg et visst handicap for å starte?", a: "Nei, vi jobber med spillere på alle nivåer. Det viktigste er motivasjon og vilje til å investere i egen utvikling. Vi tilpasser metodikken etter ditt utgangspunkt." },
  { q: "Hvordan fungerer videoanalysen?", a: "Vi bruker avansert videoteknologi for å analysere svingen din fra flere vinkler. Du får detaljerte tilbakemeldinger og konkrete øvelser du kan jobbe med mellom øktene." },
  { q: "Hva koster coaching?", a: "Pris avhenger av omfang og frekvens. Ta kontakt for en uforpliktende samtale, så finner vi en løsning som passer deg." },
  { q: "Tilbyr dere trening utendørs hele året?", a: "Vi trener både innendørs og utendørs, avhengig av sesong og været. Om vinteren bruker vi innendørsanlegg med simulator og analyseverktøy." },
  { q: "Hva inkluderer den mentale treningen?", a: "Mental trening er integrert i alle økter og inkluderer teknikker for visualisering, prestasjonsrutiner, fokus og stressmestring." },
  { q: "Hvordan kommer jeg i gang?", a: "Send oss en melding via nettstedet. Vi tar kontakt innen 48 timer for å avtale en uforpliktende innledende samtale." },
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

// ─── Merkevare Page ───
export const MERKEVARE_SOCIAL_PROOF = [
  { value: "40+", label: "golfklubber analysert" },
  { value: "24t", label: "leveringstid" },
  { value: "100%", label: "gratis analyse" },
  { value: "5★", label: "kundetilfredshet" },
] as const;

export const MERKEVARE_PACKAGES = [
  {
    name: "Basis",
    price: "Gratis",
    description: "En komplett merkevare-analyse av logoen din med farger, typografi og logo-regler.",
    features: [
      "Fargeanalyse (HEX, RGB, CMYK)",
      "WCAG-kontrastsjekk",
      "Logo-regler og frisoner",
      "Typografianbefalinger",
      "PDF-rapport",
    ],
    highlighted: false,
  },
  {
    name: "Profesjonell",
    price: "4 900 kr",
    description: "Alt i Basis, pluss et komplett designsystem med CSS-tokens og Tailwind-konfigurasjon.",
    features: [
      "Alt i Basis",
      "CSS design tokens",
      "Tailwind-konfigurasjon",
      "Fargepalett (primær, sekundær, nøytral)",
      "Komponentbibliotek (Figma)",
      "Brandguide-dokument",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Kontakt oss",
    description: "Skreddersydd merkevarebygging for klubber som vil ha en helhetlig og konsistent profil på tvers av alle flater.",
    features: [
      "Alt i Profesjonell",
      "Nettside-redesign",
      "Trykksaker og maler",
      "Sosiale medier-pakke",
      "Dedikert designer",
      "Løpende støtte",
    ],
    highlighted: false,
  },
] as const;

export const MERKEVARE_FEATURES = [
  { icon: "🎨", title: "Fargesystem", description: "Primær-, sekundær- og nøytralpaletter med Pantone, CMYK og HEX-koder for konsistent bruk på tvers av alle flater." },
  { icon: "Aa", title: "Typografisystem", description: "Anbefalte skrifttyper for headings, brødtekst og akkompagnement — med størrelseskala og linjeavstand." },
  { icon: "⬜", title: "Logo-regler", description: "Klare regler for plassering, minstestørrelse, frisoner og tillatte varianter av logoen." },
  { icon: "✓", title: "WCAG-tilgjengelighet", description: "Automatisk kontrastsjekk mot WCAG 2.1 AA-standard for å sikre lesbarhet for alle brukere." },
  { icon: "{}", title: "CSS Design Tokens", description: "Klare variabler for farger, spacing og typografi — klare til bruk i Tailwind eller CSS Custom Properties." },
  { icon: "📐", title: "Figma Komponenter", description: "Basis-komponentbibliotek i Figma med knapper, skjemaelementer og typografistiler tilpasset merkevaren." },
] as const;

// ─── Coaching Page (new sections) ───
export const COACHING_GROUP_OFFERINGS = [
  {
    title: "Klinics",
    description: "Temabaserte gruppetimer for 2–6 spillere. Intensive sesjoner rundt ett konkret tema — nakkesvingen, pitching, putting, kursmanagement.",
    tags: ["2–6 spillere", "Temabasert", "Fleksibelt tidspunkt"],
  },
  {
    title: "Weekend-kurs",
    description: "2-dagers intensivkurs med fokus på helhetlig utvikling. Kombinerer teknikk, strategi og mental trening i ett komprimert format.",
    tags: ["Helgekurs", "Helhetlig", "Begrenset plasser"],
  },
  {
    title: "Online coaching",
    description: "Videoanalyse og personlig tilbakemelding uansett hvor du er. Send inn svingvideo og få detaljert analyse med øvelsesprogram innen 48 timer.",
    tags: ["Fleksibelt", "Videoanalyse", "Raskt svar"],
  },
] as const;

export const COACHING_BUSINESS_OFFERINGS = [
  {
    title: "Bedriftspakker",
    description: "Halv- eller heldagsopplegg for bedrifter og lag. Coaching på banen kombinert med strategiske rammer og teambuilding — tilpasset alle nivåer.",
    tags: ["Halv/heldagsopplegg", "Alle nivåer", "Tilpasset gruppen"],
  },
  {
    title: "Teambuilding på banen",
    description: "Uforglemmelige lagopplevelser på golfbanen. Vi tilrettelegger for både nybegynnere og erfarne spillere med veiledning, konkurranser og moro.",
    tags: ["5–30 deltakere", "Kompetitiv & sosial", "Cateringmulighet"],
  },
  {
    title: "Turneringscoaching",
    description: "Strategisk forberedelse og spillplan for turneringer. Vi analyserer banen og hjelper deg med å optimalisere every decision before you tee off.",
    tags: ["Pre-turnering", "Banestrategi", "Mental forberedelse"],
  },
] as const;

// ─── Produkter Hub ───
export const PRODUKTER_CARDS = [
  {
    id: "treningsplan",
    title: "AI Treningsplan",
    description: "Personalisert 12-ukers treningsplan generert av AI basert på din profil, fasiliteter og sesong. Fra 199 kr.",
    badge: "Populær",
    href: "/produkter/treningsplan",
    accent: "gold" as const,
  },
  {
    id: "qr-skilt",
    title: "QR Treningsskilt",
    description: "Digitale treningsskilt med QR-koder som gir spillerne tilgang til øvelser og instruksjoner direkte på rangen.",
    badge: "For klubber",
    href: "/produkter/qr-skilt",
    accent: "software" as const,
  },
  {
    id: "merkevare",
    title: "Merkevare-analyse",
    description: "Gratis profesjonell analyse av golfklubbens logo, farger og typografi — levert innen 24 timer.",
    badge: "Gratis",
    href: "/produkter/merkevare",
    accent: "academy" as const,
  },
] as const;

// ─── Treningsplan Page ───
export const TRENINGSPLAN = {
  hero: {
    eyebrow: "AI Treningsplan",
    heading: "Din personlige treningsplan.\nGenerert av AI.",
    description: "Fyll ut fire enkle spørsmål — handicap, treningsfrekvens, fasiliteter og sesong — og få en personalisert 12-ukers treningsplan basert på AK Golf sin proprietære metodikk. Generert på sekunder, tilpasset akkurat deg.",
  },
  howItWorks: [
    {
      number: "01",
      title: "Svar på 4 spørsmål",
      description: "Handicap, antall økter, tilgjengelige fasiliteter og sesong. Det er alt vi trenger.",
    },
    {
      number: "02",
      title: "AI genererer din plan",
      description: "Vår AI kombinerer din profil med AK-formelen og lager en unik 12-ukers treningsplan.",
    },
    {
      number: "03",
      title: "Start treningen",
      description: "Få tilgang til din plan med ukentlige økter, øvelser, tester og progresjon.",
    },
  ],
  pricing: [
    {
      name: "Basis",
      price: "199 kr",
      period: "engangskjøp",
      description: "En komplett 12-ukers treningsplan som PDF. Perfekt for deg som vil ha en klar plan å følge.",
      features: [
        "12-ukers personalisert plan",
        "Ukentlige øktplaner med øvelser",
        "Testprotokoller med målverdier",
        "DECADE-drills tilpasset ditt nivå",
        "Mental treningsrutine",
        "PDF-nedlasting",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: "699 kr",
      period: "per sesong",
      description: "Alt i Basis, pluss web-dashboard med interaktive ukeplaner og kvartalsvis AI-justering.",
      features: [
        "Alt i Basis",
        "Interaktivt web-dashboard",
        "Logg testresultater digitalt",
        "Kvartalsvis AI-justering av plan",
        "Progresjonsoversikt",
        "E-postpåminnelser",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "1 999 kr",
      period: "per år",
      description: "Komplett årsabonnement med alle sesonger, kontinuerlig AI-justering og detaljert analyse.",
      features: [
        "Alt i Standard",
        "Alle 4 sesonger inkludert",
        "Kontinuerlig AI-justering",
        "Detaljert treningsanalyse",
        "Prioritert generering",
        "Kategoriprogresjons-tracking",
      ],
      highlighted: false,
    },
  ],
  faq: [
    { q: "Hvordan fungerer AI-treningsplanen?", a: "Du svarer på fire spørsmål om handicap, treningsfrekvens, fasiliteter og sesong. Vår AI bruker AK Golf sin proprietære treningsmetodikk (AK-formelen) til å generere en personalisert 12-ukers plan med ukentlige økter, øvelser, tester og progresjonskriterier." },
    { q: "Hva er AK-formelen?", a: "AK-formelen er vår evidensbaserte treningspyramide som balanserer fem nivåer: Fysisk, Teknikk, Golfslag, Spill og Turnering. Fordelingen tilpasses automatisk basert på ditt handicap-nivå, slik at du alltid trener på riktig ting." },
    { q: "Kan planen tilpasses mine fasiliteter?", a: "Ja! Du velger hvilke treningsfasiliteter du har tilgang til — driving range, putting green, simulator, treningsnett hjemme, gym osv. Planen inkluderer kun øvelser du faktisk kan gjennomføre." },
    { q: "Hva skjer når jeg forbedrer meg?", a: "Med Standard og Premium kan du logge testresultater kvartalsvis. AI-en analyserer fremgangen din og justerer planen automatisk — nye øvelser, høyere krav og progresjon mot neste kategori." },
    { q: "Hva er forskjellen på Basis, Standard og Premium?", a: "Basis gir deg en PDF-plan for én sesong (199 kr). Standard (699 kr/sesong) gir web-dashboard med interaktive planer og kvartalsvis justering. Premium (1999 kr/år) dekker alle sesonger med kontinuerlig justering og detaljert analyse." },
    { q: "Hvor lang tid tar det å generere en plan?", a: "Planen genereres på 10-30 sekunder. Du ser en gratis forhåndsvisning med oversikt, månedsfaser og de to første ukene før du bestemmer deg for å kjøpe." },
    { q: "Er dette en erstatning for en trener?", a: "AI-treningsplanen gir deg struktur, øvelser og progresjon basert på profesjonell metodikk. Den er et utmerket supplement til — eller utgangspunkt for — egen trening. For 1:1 coaching, se vårt Academy-tilbud." },
    { q: "Kan jeg få refusjon?", a: "Basis (PDF) har 14 dagers angrerett. Standard og Premium kan kanselleres når som helst, og du beholder tilgang ut perioden." },
  ],
} as const;

// ─── Footer ───
export const FOOTER_LINKS = {
  divisions: [
    { label: "Coaching", href: "/coaching" },
    { label: "Junior Academy", href: "/junior" },
    { label: "AI Treningsplan", href: "/produkter/treningsplan" },
    { label: "QR Treningsskilt", href: "/produkter/qr-skilt" },
    { label: "Merkevare", href: "/produkter/merkevare" },
  ],
  company: [
    { label: "Om oss", href: "/#story" },
    { label: "Vår metode", href: "/#method" },
    { label: "Verdier", href: "/#method" },
    { label: "Personvern", href: "/personvern" },
    { label: "Spillerportal", href: "/portal" },
  ],
  contact: {
    email: "post@akgolf.no",
    phone: "+47 909 67 995",
    location: "Gamle Fredrikstad Golfklubb, Fredrikstad",
  },
} as const;

