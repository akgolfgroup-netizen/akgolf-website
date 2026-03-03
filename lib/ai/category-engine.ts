// Category Engine — Deterministic preprocessing for AI plan generation
// All values hardcoded from AK Golf methodology references (CANON)
// This ensures methodology guardrails can never be hallucinated by AI
//
// CROSS-REFERENCE NOTES (verified against CANON 2026-03-02):
// PYRAMID_TABLE: Interpolated from 4-level CANON (D/C/B/A) + age-group source.
// CS_TABLE: CANON indexes by age + 4 levels; code maps to 11 categories as proxy.
// PR_TABLE: CANON indexes by age (PR2=10+, PR3=12+, PR4=13+, PR5=14+);
//   code maps to HCP categories. Age parameter now overrides when provided.

// ─── Types ───

export type Category = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";

export type LPhase = "L-KROPP" | "L-ARM" | "L-KØLLE" | "L-BALL" | "L-AUTO";

export type Season = "vinter" | "var" | "sommer" | "host";

export type AgeGroup = "mini_golf" | "knoett" | "junior_basis" | "junior_utvikling" | "junior_elite" | "voksen";

export type Facility =
  | "driving_range"
  | "bunker"
  | "small_putting_green"
  | "large_putting_green"
  | "chipping_area"
  | "trackman_simulator"
  | "home_net"
  | "gym";

export type MEnvironment = "M0" | "M1" | "M2" | "M3" | "M4" | "M5";

export type PRLevel = "PR1" | "PR2" | "PR3" | "PR4" | "PR5";

export type DrillCategory = "putting" | "short_game" | "approach" | "tee_shot" | "on_course";

export type MentalTrainingApproach = "lekbasert" | "strukturert" | "avansert";

export interface PyramidDistribution {
  FYS: number;
  TEK: number;
  SLAG: number;
  SPILL: number;
  TURN: number;
}

export interface SeasonalFocus {
  primary: string;
  secondary: string;
  indoorOutdoor: "indoor" | "overgang" | "outdoor";
  expectedOutcomes: string;
}

export interface TimeAllocation {
  totalMinutesPerWeek: number;
  FYS: number;
  TEK: number;
  SLAG: number;
  SPILL: number;
  TURN: number;
}

export interface CategoryInfo {
  category: Category;
  name: string;
  handicapRange: string;
  trainingFocus: string;
}

export interface AgeGroupInfo {
  ageGroup: AgeGroup;
  name: string;
  ageRange: string;
  maxHoursPerWeek: string;
  maxCS: string;
  maxPR: PRLevel;
  lPhaseOverride?: LPhase;
  pyramidOverride?: PyramidDistribution;
  mentalApproach: MentalTrainingApproach;
  mentalMinutesPerWeek: string;
  lifeFocus: string[];
  testFrequency: string;
}

export interface ProcessedProfile {
  category: Category;
  categoryInfo: CategoryInfo;
  ageGroup?: AgeGroupInfo;
  pyramid: PyramidDistribution;
  lPhase: LPhase;
  lPhaseDescription: string;
  maxCS: string;
  prRange: PRLevel[];
  mEnvironments: MEnvironment[];
  seasonalFocus: SeasonalFocus;
  timeAllocation: TimeAllocation;
  applicableTests: string[];
  applicableDrillCategories: DrillCategory[];
  weeklyThemeRotation: WeekTheme[];
  sessionStructure: SessionStructure;
  mentalApproach: MentalTrainingApproach;
  mentalMinutesPerWeek: string;
  lifeFocus: string[];
}

export interface WeekTheme {
  week: number;
  theme: string;
  distribution: { FYS: number; TEK: number; SLAG: number; SPILL: number };
}

export interface SessionStructure {
  durationMinutes: number;
  warmup: number;
  mainA: number;
  mainB: number;
  application: number;
  cooldown: number;
  blockVsVariable: { block: number; variable: number };
}

export interface PlayerInput {
  handicap: number;
  age?: number;
  sessionsPerWeek: number;
  facilities: Facility[];
  season: Season;
  goals?: string;
}

// ─── Age Group Lookup (CANON: 02_STRUKTUR_OG_ALDERSGRUPPER.MD) ───

const AGE_GROUP_TABLE: AgeGroupInfo[] = [
  {
    ageGroup: "mini_golf",
    name: "Mini Golf",
    ageRange: "5-7",
    maxHoursPerWeek: "1-2",
    maxCS: "CS20-40",
    maxPR: "PR1",
    lPhaseOverride: "L-KROPP",
    pyramidOverride: { FYS: 40, TEK: 40, SLAG: 15, SPILL: 5, TURN: 0 },
    mentalApproach: "lekbasert",
    mentalMinutesPerWeek: "0 (innbakt i lek)",
    lifeFocus: ["LIFE-SOS", "LIFE-KAR"],
    testFrequency: "ingen",
  },
  {
    ageGroup: "knoett",
    name: "Knøtt",
    ageRange: "8-10",
    maxHoursPerWeek: "2-3",
    maxCS: "CS40",
    maxPR: "PR1",
    lPhaseOverride: "L-ARM",
    pyramidOverride: { FYS: 30, TEK: 50, SLAG: 15, SPILL: 5, TURN: 0 },
    mentalApproach: "lekbasert",
    mentalMinutesPerWeek: "0-10",
    lifeFocus: ["LIFE-SOS", "LIFE-KAR"],
    testFrequency: "årlig, forenklet",
  },
  {
    ageGroup: "junior_basis",
    name: "Junior Basis",
    ageRange: "11-13",
    maxHoursPerWeek: "3-5",
    maxCS: "CS60",
    maxPR: "PR3",
    pyramidOverride: { FYS: 25, TEK: 45, SLAG: 20, SPILL: 10, TURN: 0 },
    mentalApproach: "strukturert",
    mentalMinutesPerWeek: "10-15",
    lifeFocus: ["LIFE-SELV", "LIFE-EMO"],
    testFrequency: "halvårlig",
  },
  {
    ageGroup: "junior_utvikling",
    name: "Junior Utvikling",
    ageRange: "14-16",
    maxHoursPerWeek: "6-10",
    maxCS: "CS80",
    maxPR: "PR4",
    pyramidOverride: { FYS: 20, TEK: 30, SLAG: 25, SPILL: 15, TURN: 10 },
    mentalApproach: "strukturert",
    mentalMinutesPerWeek: "20-30",
    lifeFocus: ["LIFE-RES", "LIFE-SELV"],
    testFrequency: "kvartalsvis",
  },
  {
    ageGroup: "junior_elite",
    name: "Junior Elite",
    ageRange: "17-19",
    maxHoursPerWeek: "10-15+",
    maxCS: "CS100",
    maxPR: "PR5",
    pyramidOverride: { FYS: 15, TEK: 25, SLAG: 20, SPILL: 20, TURN: 20 },
    mentalApproach: "avansert",
    mentalMinutesPerWeek: "60+",
    lifeFocus: ["LIFE-EMO", "LIFE-RES"],
    testFrequency: "månedlig",
  },
  {
    ageGroup: "voksen",
    name: "Voksen",
    ageRange: "20+",
    maxHoursPerWeek: "variabel",
    maxCS: "CS100",
    maxPR: "PR5",
    mentalApproach: "avansert",
    mentalMinutesPerWeek: "variabel",
    lifeFocus: ["LIFE-EMO", "LIFE-RES"],
    testFrequency: "kvartalsvis",
  },
];

function getAgeGroup(age: number): AgeGroupInfo {
  if (age < 8) return AGE_GROUP_TABLE[0]; // mini_golf
  if (age < 11) return AGE_GROUP_TABLE[1]; // knoett
  if (age < 14) return AGE_GROUP_TABLE[2]; // junior_basis
  if (age < 17) return AGE_GROUP_TABLE[3]; // junior_utvikling
  if (age < 20) return AGE_GROUP_TABLE[4]; // junior_elite
  return AGE_GROUP_TABLE[5]; // voksen
}

export function getAgeGroupInfo(age: number): AgeGroupInfo {
  return getAgeGroup(age);
}

// ─── Category Lookup ───

const CATEGORY_TABLE: CategoryInfo[] = [
  { category: "K", name: "Komplett nybegynner", handicapRange: "54+", trainingFocus: "FYS+TEK" },
  { category: "J", name: "Nybegynner", handicapRange: "45-54", trainingFocus: "FYS+TEK" },
  { category: "I", name: "Nybegynner+", handicapRange: "36-45", trainingFocus: "FYS+TEK" },
  { category: "H", name: "Mellomliggende", handicapRange: "30-36", trainingFocus: "FYS+TEK" },
  { category: "G", name: "Utvikling", handicapRange: "25-30", trainingFocus: "FYS+TEK" },
  { category: "F", name: "Aktiv amatør", handicapRange: "20-25", trainingFocus: "FYS+TEK" },
  { category: "E", name: "Klubb", handicapRange: "15-20", trainingFocus: "FYS+TEK" },
  { category: "D", name: "Klubb+", handicapRange: "10-15", trainingFocus: "TEK+SLAG" },
  { category: "C", name: "Regional topp", handicapRange: "5-10", trainingFocus: "TEK+SLAG" },
  { category: "B", name: "Nasjonalt lag", handicapRange: "2-5", trainingFocus: "SLAG+SPILL" },
  { category: "A", name: "Elite/Tour", handicapRange: "+2 til 2", trainingFocus: "SPILL+TURN" },
];

// ─── Pyramid Distributions ───

const PYRAMID_TABLE: Record<Category, PyramidDistribution> = {
  K: { FYS: 35, TEK: 35, SLAG: 20, SPILL: 10, TURN: 0 },
  J: { FYS: 35, TEK: 35, SLAG: 20, SPILL: 10, TURN: 0 },
  I: { FYS: 30, TEK: 30, SLAG: 25, SPILL: 10, TURN: 5 },
  H: { FYS: 30, TEK: 30, SLAG: 25, SPILL: 10, TURN: 5 },
  G: { FYS: 25, TEK: 25, SLAG: 25, SPILL: 15, TURN: 10 },
  F: { FYS: 25, TEK: 25, SLAG: 25, SPILL: 15, TURN: 10 },
  E: { FYS: 20, TEK: 25, SLAG: 25, SPILL: 20, TURN: 10 },
  D: { FYS: 20, TEK: 25, SLAG: 25, SPILL: 20, TURN: 10 },
  C: { FYS: 15, TEK: 20, SLAG: 25, SPILL: 25, TURN: 15 },
  B: { FYS: 15, TEK: 20, SLAG: 25, SPILL: 25, TURN: 15 },
  A: { FYS: 15, TEK: 15, SLAG: 20, SPILL: 25, TURN: 25 },
};

// ─── L-Phase Mapping ───

const L_PHASE_TABLE: Record<Category, { phase: LPhase; description: string }> = {
  K: { phase: "L-KROPP", description: "Kroppskontroll uten utstyr — balanse, rotasjon, koordinasjon" },
  J: { phase: "L-KROPP", description: "Kroppskontroll uten utstyr — balanse, rotasjon, koordinasjon" },
  I: { phase: "L-ARM", description: "Arm-/håndbevegelser med kølle — grep, svingebue, tempo" },
  H: { phase: "L-ARM", description: "Arm-/håndbevegelser med kølle — grep, svingebue, tempo" },
  G: { phase: "L-KØLLE", description: "Hele svingbevegelsen — P-posisjoner, kontaktpunkt" },
  F: { phase: "L-KØLLE", description: "Hele svingbevegelsen — P-posisjoner, kontaktpunkt" },
  E: { phase: "L-BALL", description: "Ballkontakt og flukt — treffkvalitet, retning" },
  D: { phase: "L-BALL", description: "Ballkontakt og flukt — treffkvalitet, retning" },
  C: { phase: "L-AUTO", description: "Automatisert bevegelse — ubevisst kompetanse, prestasjon" },
  B: { phase: "L-AUTO", description: "Automatisert bevegelse — ubevisst kompetanse, prestasjon" },
  A: { phase: "L-AUTO", description: "Automatisert bevegelse — vedlikehold + finpuss" },
};

// ─── CS Limits ───

const CS_TABLE: Record<Category, string> = {
  K: "CS20-40",
  J: "CS40",
  I: "CS40-60",
  H: "CS60",
  G: "CS60-80",
  F: "CS80",
  E: "CS80",
  D: "CS80-100",
  C: "CS100",
  B: "CS100",
  A: "CS100",
};

// ─── PR Range ───

const PR_TABLE: Record<Category, PRLevel[]> = {
  K: ["PR1"],
  J: ["PR1"],
  I: ["PR1", "PR2"],
  H: ["PR1", "PR2"],
  G: ["PR1", "PR2"],
  F: ["PR1", "PR2", "PR3"],
  E: ["PR1", "PR2", "PR3"],
  D: ["PR1", "PR2", "PR3", "PR4"],
  C: ["PR1", "PR2", "PR3", "PR4"],
  B: ["PR1", "PR2", "PR3", "PR4", "PR5"],
  A: ["PR1", "PR2", "PR3", "PR4", "PR5"],
};

// ─── Seasonal Focus ───

const SEASONAL_FOCUS: Record<Season, SeasonalFocus> = {
  vinter: {
    primary: "FYS-forbedring, teknikk-korreksjoner",
    secondary: "Mental trening, indoor-simulering",
    indoorOutdoor: "indoor",
    expectedOutcomes: "CS-økning, bevegelighetstest-forbedring",
  },
  var: {
    primary: "Overgang outdoor, SLAG-utvikling",
    secondary: "Banestrategi, putting",
    indoorOutdoor: "overgang",
    expectedOutcomes: "Scorebaseline, PEI-forbedring",
  },
  sommer: {
    primary: "Turneringsforberedelse, scoring-optimalisering",
    secondary: "Mental styrke under press",
    indoorOutdoor: "outdoor",
    expectedOutcomes: "HCP-forbedring, turneringsresultater",
  },
  host: {
    primary: "Evaluering, IUP-oppdatering",
    secondary: "Planlegging neste sesong",
    indoorOutdoor: "overgang",
    expectedOutcomes: "Testresultater, kategoriprogressjon",
  },
};

// ─── 4-Week Theme Rotation ───

const WEEK_THEMES: WeekTheme[] = [
  { week: 1, theme: "Langt spill (driver, fairwaywood, lange jern)", distribution: { FYS: 20, TEK: 30, SLAG: 40, SPILL: 10 } },
  { week: 2, theme: "Kort spill (putting, chipping, pitching)", distribution: { FYS: 20, TEK: 25, SLAG: 45, SPILL: 10 } },
  { week: 3, theme: "Banespill (strategi, kursnavigering, scoring)", distribution: { FYS: 15, TEK: 15, SLAG: 20, SPILL: 50 } },
  { week: 4, theme: "Testing og evaluering", distribution: { FYS: 25, TEK: 25, SLAG: 25, SPILL: 25 } },
];

// ─── Session Structure ───

const SESSION_DURATION = 90; // minutes

function getSessionStructure(category: Category): SessionStructure {
  const isBeginnerRange = ["K", "J", "I", "H"].includes(category);
  return {
    durationMinutes: SESSION_DURATION,
    warmup: 15,
    mainA: 25,
    mainB: 25,
    application: 15,
    cooldown: 10,
    blockVsVariable: isBeginnerRange
      ? { block: 70, variable: 30 }
      : { block: 30, variable: 70 },
  };
}

// ─── Facility → M-Environment Mapping ───

function getMEnvironments(facilities: Facility[]): MEnvironment[] {
  const envs = new Set<MEnvironment>();

  for (const facility of facilities) {
    switch (facility) {
      case "gym":
        envs.add("M0");
        break;
      case "driving_range":
      case "small_putting_green":
      case "large_putting_green":
      case "chipping_area":
      case "bunker":
      case "home_net":
        envs.add("M1");
        break;
      case "trackman_simulator":
        envs.add("M3");
        break;
    }
  }

  // M1 (range) is always available if any hitting facility exists
  if (facilities.some(f => ["driving_range", "home_net"].includes(f))) {
    envs.add("M1");
  }

  return Array.from(envs).sort();
}

// ─── Facility → Applicable Tests ───

function getApplicableTests(category: Category, facilities: Facility[]): string[] {
  const tests: string[] = [];
  const hasLaunchMonitor = facilities.includes("trackman_simulator");
  const hasRange = facilities.includes("driving_range");
  const hasPuttingGreen = facilities.includes("small_putting_green") || facilities.includes("large_putting_green");
  const hasGym = facilities.includes("gym");
  const isAdvanced = ["A", "B", "C", "D", "E", "F"].includes(category);

  // Always available
  if (hasPuttingGreen) {
    tests.push("3m Putting Accuracy", "6m Putting Accuracy");
  }

  if (hasGym) {
    tests.push("Medicine Ball Throw", "Vertical Jump", "Hip Rotation Mobility");
  }

  if (hasLaunchMonitor) {
    tests.push("Driver Clubhead Speed", "7-Iron Clubhead Speed", "Driver Carry Distance");
  }

  if (hasRange && isAdvanced) {
    tests.push("PEI 25m", "PEI 50m", "PEI 75m", "PEI 100m");
    if (["A", "B", "C", "D"].includes(category)) {
      tests.push("PEI 125m", "PEI 150m");
    }
    tests.push("Fairway Accuracy", "GIR Simulation");
  }

  // Mental tests (always available)
  tests.push("Focus Test", "Pre-Shot Routine Consistency");

  if (isAdvanced) {
    tests.push("Competition Simulation");
  }

  return tests;
}

// ─── Facility → Applicable Drill Categories ───

function getApplicableDrillCategories(facilities: Facility[], season: Season): DrillCategory[] {
  const categories = new Set<DrillCategory>();

  // Putting is available if any putting green or simulator
  if (facilities.includes("small_putting_green") || facilities.includes("large_putting_green") || facilities.includes("trackman_simulator")) {
    categories.add("putting");
  }

  // Short game needs chipping area or bunker
  if (facilities.includes("chipping_area") || facilities.includes("bunker")) {
    categories.add("short_game");
  }

  // Approach/tee shots need range, simulator, or net
  if (facilities.includes("driving_range") || facilities.includes("trackman_simulator") || facilities.includes("home_net")) {
    categories.add("approach");
    categories.add("tee_shot");
  }

  // On-course only available in outdoor seasons
  if (season !== "vinter" && (facilities.includes("driving_range") || facilities.includes("chipping_area"))) {
    categories.add("on_course");
  }

  return Array.from(categories);
}

// ─── Core Functions ───

export function getCategory(handicap: number): Category {
  if (handicap > 54) return "K";
  if (handicap > 45) return "J";
  if (handicap > 36) return "I";
  if (handicap > 30) return "H";
  if (handicap > 25) return "G";
  if (handicap > 20) return "F";
  if (handicap > 15) return "E";
  if (handicap > 10) return "D";
  if (handicap > 5) return "C";
  if (handicap > 2) return "B";
  return "A";
}

export function getCategoryInfo(category: Category): CategoryInfo {
  return CATEGORY_TABLE.find(c => c.category === category)!;
}

export function getPyramid(category: Category): PyramidDistribution {
  return PYRAMID_TABLE[category];
}

function allocateTime(pyramid: PyramidDistribution, totalMinutes: number): TimeAllocation {
  return {
    totalMinutesPerWeek: totalMinutes,
    FYS: Math.round((pyramid.FYS / 100) * totalMinutes),
    TEK: Math.round((pyramid.TEK / 100) * totalMinutes),
    SLAG: Math.round((pyramid.SLAG / 100) * totalMinutes),
    SPILL: Math.round((pyramid.SPILL / 100) * totalMinutes),
    TURN: Math.round((pyramid.TURN / 100) * totalMinutes),
  };
}

// ─── Mental Training Approach per Category (when no age provided) ───

function getMentalApproachForCategory(category: Category): MentalTrainingApproach {
  if (["K", "J"].includes(category)) return "lekbasert";
  if (["I", "H", "G", "F"].includes(category)) return "strukturert";
  return "avansert";
}

function getMentalMinutesForCategory(category: Category): string {
  if (["K", "J"].includes(category)) return "0-10 (innbakt i lek)";
  if (["I", "H"].includes(category)) return "10-15";
  if (["G", "F"].includes(category)) return "20-30";
  return "60+";
}

function getLifeFocusForCategory(category: Category): string[] {
  if (["K", "J"].includes(category)) return ["LIFE-SOS", "LIFE-KAR"];
  if (["I", "H"].includes(category)) return ["LIFE-SELV", "LIFE-EMO"];
  if (["G", "F"].includes(category)) return ["LIFE-RES", "LIFE-SELV"];
  return ["LIFE-EMO", "LIFE-RES"];
}

// ─── Main Preprocessing Function ───

export function preprocessPlayerProfile(input: PlayerInput): ProcessedProfile {
  const category = getCategory(input.handicap);
  const categoryInfo = getCategoryInfo(category);
  const lPhaseEntry = L_PHASE_TABLE[category];
  const totalWeeklyMinutes = input.sessionsPerWeek * SESSION_DURATION;

  // Age group overrides (when age is provided)
  const ageGroupInfo = input.age != null ? getAgeGroup(input.age) : undefined;

  // Pyramid: use age-group override for juniors, else HCP-based
  const pyramid = ageGroupInfo?.pyramidOverride ?? getPyramid(category);

  // L-Phase: age-group can cap L-phase for young players
  const lPhase = ageGroupInfo?.lPhaseOverride ?? lPhaseEntry.phase;
  const lPhaseDescription = ageGroupInfo?.lPhaseOverride
    ? L_PHASE_TABLE[category].description
    : lPhaseEntry.description;

  // CS: age-group caps club speed for young players
  const maxCS = ageGroupInfo ? ageGroupInfo.maxCS : CS_TABLE[category];

  // PR: age-group caps pressure levels for young players
  let prRange = PR_TABLE[category];
  if (ageGroupInfo) {
    const maxPRIndex = ["PR1", "PR2", "PR3", "PR4", "PR5"].indexOf(ageGroupInfo.maxPR);
    prRange = prRange.filter((_, i) => i <= maxPRIndex);
  }

  // Mental training approach
  const mentalApproach = ageGroupInfo?.mentalApproach ?? getMentalApproachForCategory(category);
  const mentalMinutesPerWeek = ageGroupInfo?.mentalMinutesPerWeek ?? getMentalMinutesForCategory(category);
  const lifeFocus = ageGroupInfo?.lifeFocus ?? getLifeFocusForCategory(category);

  return {
    category,
    categoryInfo,
    ageGroup: ageGroupInfo,
    pyramid,
    lPhase,
    lPhaseDescription,
    maxCS,
    prRange,
    mEnvironments: getMEnvironments(input.facilities),
    seasonalFocus: SEASONAL_FOCUS[input.season],
    timeAllocation: allocateTime(pyramid, totalWeeklyMinutes),
    applicableTests: getApplicableTests(category, input.facilities),
    applicableDrillCategories: getApplicableDrillCategories(input.facilities, input.season),
    weeklyThemeRotation: WEEK_THEMES,
    sessionStructure: getSessionStructure(category),
    mentalApproach,
    mentalMinutesPerWeek,
    lifeFocus,
  };
}

// ─── Facility Display Names (for UI) ───

export const FACILITY_OPTIONS: { value: Facility; label: string; description: string }[] = [
  { value: "driving_range", label: "Driving range", description: "Treningsfelt for fulle slag" },
  { value: "bunker", label: "Bunker for trening", description: "Øvingsbunker ved range eller green" },
  { value: "small_putting_green", label: "Liten putting green", description: "Puttingmatte eller liten green" },
  { value: "large_putting_green", label: "Stor putting green", description: "Full putting green med variert terreng" },
  { value: "chipping_area", label: "Chipping/pitching area", description: "Eget område for kort spill" },
  { value: "trackman_simulator", label: "Trackman/simulator", description: "Innendørs simulator med launch monitor" },
  { value: "home_net", label: "Treningsnett hjemme", description: "Slå i nett hjemme uten ballflukt" },
  { value: "gym", label: "Styrkerom/gym", description: "Tilgang til treningssenter" },
];

// ─── Season Display Names (for UI) ───

export const SEASON_OPTIONS: { value: Season; label: string; months: string }[] = [
  { value: "vinter", label: "Vinter", months: "Januar – Mars" },
  { value: "var", label: "Vår", months: "April – Juni" },
  { value: "sommer", label: "Sommer", months: "Juli – September" },
  { value: "host", label: "Høst", months: "Oktober – Desember" },
];

// ─── Age Group Display Names (for UI) ───

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string; ageRange: string }[] = [
  { value: "mini_golf", label: "Mini Golf", ageRange: "5–7 år" },
  { value: "knoett", label: "Knøtt", ageRange: "8–10 år" },
  { value: "junior_basis", label: "Junior Basis", ageRange: "11–13 år" },
  { value: "junior_utvikling", label: "Junior Utvikling", ageRange: "14–16 år" },
  { value: "junior_elite", label: "Junior Elite", ageRange: "17–19 år" },
  { value: "voksen", label: "Voksen", ageRange: "20+ år" },
];
