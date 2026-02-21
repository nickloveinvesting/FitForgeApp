/**
 * TYPE DEFINITIONS FOR THE QUESTIONNAIRE ENGINE
 *
 * The questionnaire uses a branching tree structure where each question
 * can route to different follow-up questions based on the user's answer.
 *
 * Key concepts:
 * - Question: A single question with its type, options, and routing logic
 * - QuestionFlow: The complete set of questions organized by ID
 * - UserProfile: The accumulated answers that define the user's fitness profile
 *
 * DESIGN PRINCIPLE: Fast where possible, deep where it matters.
 * - Basics (age, gender): single tap, move on instantly
 * - Goals: clear choices, minimal friction
 * - Injuries: progressive disclosure → deep pain trigger mapping
 * - Stress/Recovery: quick self-assessment for volume calibration
 */

// ─── Question Types ───────────────────────────────────────────────

export type QuestionType =
  | 'single-select'       // Pick one option (radio buttons)
  | 'multi-select'        // Pick multiple options (checkboxes)
  | 'slider'              // Numeric range (e.g., age, weight)
  | 'text-input'          // Free text entry
  | 'number-input'        // Numeric entry (e.g., max bench press)
  | 'injury-selector'     // Special: multi-select body areas + adds dynamic follow-ups
  | 'multi-text-add'      // Special: add multiple free-text entries (unlimited injuries)
  | 'multi-field';        // Multiple input fields on one screen (e.g., height + weight)

// ─── Option for select-type questions ─────────────────────────────

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

// ─── Branching Logic ──────────────────────────────────────────────

export interface BranchRule {
  condition: string | string[];
  nextQuestionId: string;
}

// ─── Question Definition ─────────────────────────────────────────

// ─── Sub-field for multi-field questions ─────────────────────────

export interface SubField {
  id: string;                       // Maps to profile field via engine
  label: string;
  type: 'number-input' | 'text-input' | 'single-select';
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  options?: QuestionOption[];       // For single-select sub-fields
  required?: boolean;
  /** Conditional display: only show if a profile field matches a value */
  showWhen?: { field: string; value: string };
  /** Alternate config when a profile field matches (e.g., imperial vs metric) */
  variants?: Record<string, Partial<SubField>>;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];

  // Slider/number config
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  // Text input config
  placeholder?: string;

  // Multi-field config
  fields?: SubField[];              // For 'multi-field' type

  // Validation
  required?: boolean;
  minSelections?: number;
  maxSelections?: number;

  // Branching
  branches?: BranchRule[];
  defaultNextId?: string | null;    // null = end of questionnaire

  // UI hints
  autoAdvance?: boolean;            // Auto-advance on single selection (no "Next" tap needed)
  progressWeight?: number;
}

// ─── Question Categories ─────────────────────────────────────────

export type QuestionCategory =
  | 'basics'
  | 'experience'
  | 'goals'
  | 'goal-details'
  | 'constraints'          // Injuries, pain triggers
  | 'equipment'
  | 'schedule'
  | 'recovery'             // NEW: stress, sleep, readiness
  | 'preferences';

// ─── The Complete Question Flow ──────────────────────────────────

export interface QuestionFlow {
  startId: string;
  questions: Record<string, Question>;
  categories: { id: QuestionCategory; label: string }[];
}

// ─── User's Accumulated Answers (EXPANDED) ───────────────────────

export interface UserProfile {
  // ── Basics ──
  age?: number;
  gender?: string;
  heightCm?: number;
  weightKg?: number;
  unitPreference?: 'metric' | 'imperial';
  /** Temp fields for imperial height conversion (ft/in → cm) */
  _heightFeet?: number;
  _heightInches?: number;

  // ── Experience ──
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  trainingMonths?: number;

  // ── Goals ──
  primaryGoal?: 'bodybuilding' | 'powerlifting' | 'athleticism';
  /** Multiple goals selected (max 2). primaryGoal is set to the first one. */
  goals?: string[];

  // Bodybuilding
  targetMuscles?: string[];
  splitPreference?: string;

  // Powerlifting
  maxSquat?: number;
  maxBench?: number;
  maxDeadlift?: number;
  competitionGoal?: string;
  weakPoints?: string[];

  // Athleticism
  sport?: string;
  performanceGoals?: string[];
  seasonPhase?: string;

  // ── Injuries & Constraints (DEEP) ──
  hasInjuries?: boolean;
  injuryAreas?: string[];                      // IDs of affected areas
  painTriggers?: Record<string, string[]>;     // { areaId: [triggerId, triggerId] }
  injuryNotes?: string;                        // Free-text for anything not covered
  additionalLimitations?: string[];            // User-added custom limitations (unlimited)

  // ── Equipment ──
  gymAccess?: string;
  availableEquipment?: string[];

  // ── Schedule ──
  daysPerWeek?: number;
  minutesPerSession?: number;
  preferredDays?: string[];

  // ── Recovery & Stress (NEW — feeds into MEV/MRV calculation) ──
  sleepQuality?: 'poor' | 'moderate' | 'good';
  sleepHours?: number;
  stressLevel?: 'low' | 'moderate' | 'high';
  recoveryCapacity?: 'low' | 'moderate' | 'high';

  // ── Preferences ──
  exerciseLikes?: string[];
  exerciseDislikes?: string[];

  // ── Raw answers ──
  answers: Record<string, string | string[] | number>;
}

// ─── Engine State ────────────────────────────────────────────────

export interface QuestionnaireState {
  currentQuestionId: string;
  history: string[];
  profile: UserProfile;
  isComplete: boolean;
  progress: number;
  /** Dynamic questions injected at runtime (e.g., pain triggers per injury) */
  dynamicQuestions: Record<string, Question>;
  /** Goal branches remaining to visit (for multi-goal support) */
  pendingGoalBranches: string[];
}
