// TypeScript types for AI-generated training plan output
// The AI agent must conform to these types in its JSON output

export interface GeneratedPlan {
  summary: PlanSummary;
  monthlyPhases: MonthlyPhase[];
  weeklySchedule: WeekSchedule[];
  exercises: Exercise[];
  testPlan: TestPlan;
  mentalTraining: MentalTraining;
  progressionCriteria: ProgressionCriteria;
}

export interface PlanSummary {
  playerCategory: string;
  categoryName: string;
  handicapRange: string;
  mainFocus: string;
  estimatedImprovement: string;
  pyramidDistribution: {
    FYS: number;
    TEK: number;
    SLAG: number;
    SPILL: number;
    TURN: number;
  };
  totalWeeks: number;
  sessionsPerWeek: number;
  minutesPerSession: number;
}

export interface MonthlyPhase {
  month: number;
  name: string;
  phase: string;
  focus: string[];
  goals: string[];
  keyExercises: string[];
}

export interface WeekSchedule {
  weekNumber: number;
  theme: string;
  days: DayPlan[];
}

export interface DayPlan {
  dayNumber: number;
  dayName: string;
  isRestDay: boolean;
  sessionType?: string;
  duration?: number;
  warmup?: string;
  mainA?: SessionBlock;
  mainB?: SessionBlock;
  application?: string;
  cooldown?: string;
  prLevel?: string;
  mEnvironment?: string;
  lifeReflection?: string;
}

export interface SessionBlock {
  area: string;
  focus: string;
  exercises: string[];
  duration: number;
  tips: string;
}

export interface Exercise {
  name: string;
  category: string;
  pyramidLevel: string;
  difficulty: string;
  duration: number;
  equipment: string[];
  steps: string[];
  tips: string[];
  prLevel: string;
  mEnvironment: string;
  decadeDrill?: string;
}

export interface TestPlan {
  schedule: TestScheduleEntry[];
  protocols: TestProtocol[];
  targets: TestTarget[];
}

export interface TestScheduleEntry {
  label: string;
  weekNumber: number;
  purpose: string;
}

export interface TestProtocol {
  name: string;
  equipment: string;
  procedure: string;
  scoring: string;
}

export interface TestTarget {
  testName: string;
  currentCategoryTarget: string;
  nextCategoryTarget: string;
}

export interface MentalTraining {
  focusSkills: string[];
  weeklyPractice: string;
  preShotRoutine: string;
  lifeFramework: {
    dimension: string;
    focus: string;
    weeklyExercise: string;
  }[];
}

export interface ProgressionCriteria {
  currentCategory: string;
  nextCategory: string;
  requirements: string[];
  estimatedTimeline: string;
  keyMilestones: string[];
}

// Preview is a subset shown before payment
export interface PlanPreview {
  summary: PlanSummary;
  monthlyPhases: MonthlyPhase[];
  sampleWeeks: WeekSchedule[]; // First 2 weeks only
  testPlan: {
    schedule: TestScheduleEntry[];
    protocols: TestProtocol[];
  };
  progressionCriteria: ProgressionCriteria;
}

export function extractPreview(plan: GeneratedPlan): PlanPreview {
  return {
    summary: plan.summary,
    monthlyPhases: plan.monthlyPhases,
    sampleWeeks: plan.weeklySchedule.slice(0, 2),
    testPlan: {
      schedule: plan.testPlan.schedule,
      protocols: plan.testPlan.protocols,
    },
    progressionCriteria: plan.progressionCriteria,
  };
}
