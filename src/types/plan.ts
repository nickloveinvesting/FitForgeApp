/**
 * TYPE DEFINITIONS FOR WORKOUT PLANS (v2 — AI-Generated)
 *
 * Simplified and flexible types that work with AI-generated plans.
 * The AI returns structured JSON that maps directly to these types.
 *
 * KEY CHANGE: No more Exercise library reference. Exercises are
 * defined inline by the AI with full context (name, sets, reps, etc.)
 */

// ─── Planned Exercise (within a workout) ─────────────────────

export interface PlannedExercise {
  exerciseName: string;             // Full exercise name from AI
  sets: number;
  reps: string;                     // String for ranges like "8-10" or "5x5"
  rir?: number;                     // Reps In Reserve target
  restSeconds?: number;             // Rest between sets
  notes?: string;                   // Form cues, tempo, injury modifications
  tier?: 'T1' | 'T2' | 'T3';      // Session priority tier
  progressionRule?: string;         // How to progress week over week
  isWarmup?: boolean;               // Whether this is a warmup/prehab exercise
  supersetWith?: string;            // Name of exercise if part of superset
  tempoGuide?: string;              // e.g., "3-1-2-0"
}

// ─── Single Workout Day ──────────────────────────────────────

export interface WorkoutDay {
  dayNumber: number;                // 1-based within the week
  name: string;                     // e.g., "Push Day A", "Upper Body"
  focus: string;                    // e.g., "Chest, Shoulders, Triceps"
  exercises: PlannedExercise[];     // Ordered list (warmup first, then main)
  estimatedMinutes?: number;        // Optional duration estimate
}

// ─── Weekly Plan ─────────────────────────────────────────────

export interface WeekPlan {
  weekNumber: number;
  days: WorkoutDay[];
}

// ─── The Complete Workout Plan ───────────────────────────────

export interface WorkoutPlan {
  planName: string;                 // e.g., "Push/Pull/Legs Hypertrophy"
  splitType: string;                // e.g., "Push/Pull/Legs", "Upper/Lower"
  daysPerWeek: number;
  days: WorkoutDay[];               // The week template
  weekPlan: WeekPlan;               // Current week's plan

  // Progression
  progressionRules: ProgressionRule[];

  // Constraints applied
  constraints: string[];            // Human-readable list

  // Metadata
  generatedAt: string;              // ISO date string
}

// ─── Progression Rules ───────────────────────────────────────

export interface ProgressionRule {
  type: string;                     // e.g., "mesocycle", "linear", "double-progression"
  description: string;              // Human-readable rule
}

// ─── Plan Generation Request ─────────────────────────────────
// (Kept for potential future use with Supabase Edge Functions)

export interface PlanGenerationRequest {
  profile: Record<string, string | string[] | number>;
  constraints: PlanConstraint[];
}

export interface PlanConstraint {
  type: 'injury' | 'equipment' | 'time' | 'schedule' | 'exercise-exclusion';
  description: string;
  severity: 'hard' | 'soft';
}
