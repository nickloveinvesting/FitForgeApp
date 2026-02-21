/**
 * QUESTION FLOW DATA (v2 — Research-Backed)
 *
 * DESIGN PRINCIPLE: Fast where trivial, deep where it matters.
 *
 * FLOW:
 * FAST: Age + Gender + Units (1 screen) → Height + Weight (1 screen)
 * FAST: Experience (1 tap)
 * FAST: Goals (multi-select, up to 2) → Goal branches (2-4 questions each)
 * DEEP: Injury gate → Body areas → Pain triggers per area → Notes → Custom
 * FAST: Equipment (1-2 taps)
 * FAST: Schedule — Days + Session Length (2 taps)
 * FAST: Recovery — Sleep + Stress (2 taps)
 * OPT:  Preferences (0-2 taps)
 *
 * Healthy user: ~12 questions, ~60 seconds
 * User with injuries: ~18 questions, ~2.5 minutes
 */

import { QuestionFlow } from '../types/questionnaire';

export const questionFlow: QuestionFlow = {
  startId: 'basics-info',

  categories: [
    { id: 'basics', label: 'About You' },
    { id: 'experience', label: 'Experience' },
    { id: 'goals', label: 'Your Goals' },
    { id: 'goal-details', label: 'Goal Details' },
    { id: 'constraints', label: 'Injuries & Limitations' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'preferences', label: 'Preferences' },
  ],

  questions: {

    // ═══════════════════════════════════════════════════════════
    // BASICS — Grouped for speed
    // Screen 1: Age + Gender + Units
    // Screen 2: Height + Weight (unit-aware)
    // ═══════════════════════════════════════════════════════════

    'basics-info': {
      id: 'basics-info',
      category: 'basics',
      title: 'Let\'s start with the basics',
      subtitle: 'Used for recovery guidelines and volume calibration.',
      type: 'multi-field',
      fields: [
        {
          id: 'age',
          label: 'Age',
          type: 'number-input',
          placeholder: 'e.g., 28',
          unit: 'years',
          min: 14,
          max: 80,
          required: true,
        },
        {
          id: 'gender',
          label: 'Gender',
          type: 'single-select',
          options: [
            { id: 'male', label: 'Male' },
            { id: 'female', label: 'Female' },
            { id: 'non-binary', label: 'Non-binary' },
            { id: 'prefer-not', label: 'Prefer not to say' },
          ],
          required: true,
        },
        {
          id: 'unit-preference',
          label: 'Units',
          type: 'single-select',
          options: [
            { id: 'imperial', label: 'Imperial (lbs, ft/in)' },
            { id: 'metric', label: 'Metric (kg, cm)' },
          ],
          required: true,
        },
      ],
      required: true,
      defaultNextId: 'body-measurements',
    },

    'body-measurements': {
      id: 'body-measurements',
      category: 'basics',
      title: 'Height & Weight',
      type: 'multi-field',
      fields: [
        {
          id: 'height-feet',
          label: 'Height (ft)',
          type: 'number-input',
          placeholder: 'e.g., 5',
          unit: 'ft',
          min: 3,
          max: 8,
          required: true,
          showWhen: { field: 'unit-preference', value: 'imperial' },
        },
        {
          id: 'height-inches',
          label: 'Height (in)',
          type: 'number-input',
          placeholder: 'e.g., 10',
          unit: 'in',
          min: 0,
          max: 11,
          required: true,
          showWhen: { field: 'unit-preference', value: 'imperial' },
        },
        {
          id: 'height',
          label: 'Height',
          type: 'number-input',
          placeholder: 'e.g., 178',
          unit: 'cm',
          min: 100,
          max: 230,
          required: true,
          showWhen: { field: 'unit-preference', value: 'metric' },
        },
        {
          id: 'weight',
          label: 'Weight',
          type: 'number-input',
          placeholder: 'e.g., 185',
          unit: 'lbs',
          min: 30,
          max: 500,
          required: true,
          variants: {
            'imperial': { unit: 'lbs', placeholder: 'e.g., 185', max: 500 },
            'metric': { unit: 'kg', placeholder: 'e.g., 84', max: 250 },
          },
        },
      ],
      required: true,
      defaultNextId: 'experience-level',
    },

    // ═══════════════════════════════════════════════════════════
    // EXPERIENCE
    // ═══════════════════════════════════════════════════════════

    'experience-level': {
      id: 'experience-level',
      category: 'experience',
      title: 'Training experience?',
      subtitle: 'Be honest — controls exercise complexity and volume.',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'beginner', label: 'Beginner', description: 'Under 1 year consistent training', icon: '🌱' },
        { id: 'intermediate', label: 'Intermediate', description: '1-5 years consistent training', icon: '💪' },
        { id: 'advanced', label: 'Advanced', description: '5+ years structured progressive overload', icon: '🏆' },
      ],
      required: true,
      defaultNextId: 'primary-goal',
    },

    // ═══════════════════════════════════════════════════════════
    // PRIMARY GOAL — Branches
    // ═══════════════════════════════════════════════════════════

    'primary-goal': {
      id: 'primary-goal',
      category: 'goals',
      title: 'What are your goals?',
      subtitle: 'Pick up to 2. We\'ll tailor your program to both.',
      type: 'multi-select',
      maxSelections: 2,
      minSelections: 1,
      options: [
        { id: 'bodybuilding', label: 'Bodybuilding', description: 'Build muscle, improve aesthetics', icon: '🏋️' },
        { id: 'powerlifting', label: 'Powerlifting', description: 'Maximize squat, bench, deadlift', icon: '🔨' },
        { id: 'athleticism', label: 'Athleticism', description: 'Sport performance, speed, power', icon: '⚡' },
      ],
      required: true,
      // Engine handles routing via __next_goal_branch__ sentinel
      defaultNextId: '__next_goal_branch__',
    },

    // ── Bodybuilding Branch ──

    'target-muscles': {
      id: 'target-muscles',
      category: 'goal-details',
      title: 'Priority muscle groups?',
      subtitle: 'Up to 3. These get extra volume.',
      type: 'multi-select',
      maxSelections: 3, minSelections: 1,
      options: [
        { id: 'chest', label: 'Chest', icon: '🫁' },
        { id: 'back', label: 'Back / Lats', icon: '🔙' },
        { id: 'shoulders', label: 'Shoulders', icon: '🤷' },
        { id: 'arms', label: 'Arms', icon: '💪' },
        { id: 'legs', label: 'Legs', icon: '🦵' },
        { id: 'glutes', label: 'Glutes', icon: '🍑' },
        { id: 'core', label: 'Core', icon: '🎯' },
      ],
      required: true,
      defaultNextId: 'split-preference',
    },

    'split-preference': {
      id: 'split-preference',
      category: 'goal-details',
      title: 'Preferred training split?',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'push-pull-legs', label: 'Push / Pull / Legs' },
        { id: 'upper-lower', label: 'Upper / Lower' },
        { id: 'bro-split', label: 'Body Part Split' },
        { id: 'full-body', label: 'Full Body' },
        { id: 'auto', label: 'Choose for me' },
      ],
      required: true,
      defaultNextId: '__next_goal_branch__',
    },

    // ── Powerlifting Branch ──

    'max-lifts': {
      id: 'max-lifts',
      category: 'goal-details',
      title: 'Current 1-rep maxes?',
      subtitle: '0 if unknown. Used to program intensity.',
      type: 'multi-field',
      fields: [
        {
          id: 'max-squat',
          label: 'Squat',
          type: 'number-input',
          placeholder: '0',
          unit: 'lbs',
          min: 0,
          max: 1100,
          required: true,
          variants: {
            'imperial': { unit: 'lbs', placeholder: '0', max: 1100 },
            'metric': { unit: 'kg', placeholder: '0', max: 500 },
          },
        },
        {
          id: 'max-bench',
          label: 'Bench Press',
          type: 'number-input',
          placeholder: '0',
          unit: 'lbs',
          min: 0,
          max: 770,
          required: true,
          variants: {
            'imperial': { unit: 'lbs', placeholder: '0', max: 770 },
            'metric': { unit: 'kg', placeholder: '0', max: 350 },
          },
        },
        {
          id: 'max-deadlift',
          label: 'Deadlift',
          type: 'number-input',
          placeholder: '0',
          unit: 'lbs',
          min: 0,
          max: 1100,
          required: true,
          variants: {
            'imperial': { unit: 'lbs', placeholder: '0', max: 1100 },
            'metric': { unit: 'kg', placeholder: '0', max: 500 },
          },
        },
      ],
      required: true,
      defaultNextId: 'competition-goal',
    },

    'competition-goal': {
      id: 'competition-goal',
      category: 'goal-details',
      title: 'Training for competition?',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'no-comp', label: 'No, just getting stronger', icon: '💪' },
        { id: 'future-comp', label: 'Considering it', icon: '🤔' },
        { id: 'upcoming-comp', label: 'Yes, within 6 months', icon: '🏅' },
        { id: 'active-competitor', label: 'Active competitor', icon: '🏆' },
      ],
      required: true,
      defaultNextId: 'weak-points',
    },

    'weak-points': {
      id: 'weak-points',
      category: 'goal-details',
      title: 'Sticking points?',
      subtitle: 'Select all. We add targeted accessories.',
      type: 'multi-select',
      options: [
        { id: 'squat-depth', label: 'Squat: out of the hole' },
        { id: 'squat-lockout', label: 'Squat: lockout' },
        { id: 'bench-off-chest', label: 'Bench: off the chest' },
        { id: 'bench-lockout', label: 'Bench: lockout' },
        { id: 'deadlift-floor', label: 'Deadlift: off the floor' },
        { id: 'deadlift-lockout', label: 'Deadlift: lockout' },
        { id: 'grip', label: 'Grip strength' },
        { id: 'bracing', label: 'Core bracing' },
      ],
      required: false,
      defaultNextId: '__next_goal_branch__',
    },

    // ── Athleticism Branch ──

    'sport': {
      id: 'sport',
      category: 'goal-details',
      title: 'What sport?',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'basketball', label: 'Basketball', icon: '🏀' },
        { id: 'football', label: 'Soccer', icon: '⚽' },
        { id: 'american-football', label: 'American Football', icon: '🏈' },
        { id: 'mma', label: 'MMA / Combat Sports', icon: '🥊' },
        { id: 'running', label: 'Running / Track', icon: '🏃' },
        { id: 'swimming', label: 'Swimming', icon: '🏊' },
        { id: 'crossfit', label: 'CrossFit', icon: '🏋️' },
        { id: 'general', label: 'General Performance', icon: '⚡' },
      ],
      required: true,
      defaultNextId: 'performance-goals',
    },

    'performance-goals': {
      id: 'performance-goals',
      category: 'goal-details',
      title: 'Performance priorities?',
      subtitle: 'Up to 3.',
      type: 'multi-select',
      maxSelections: 3, minSelections: 1,
      options: [
        { id: 'speed', label: 'Speed', icon: '💨' },
        { id: 'power', label: 'Explosive Power', icon: '💥' },
        { id: 'agility', label: 'Agility', icon: '🔀' },
        { id: 'endurance', label: 'Endurance', icon: '❤️' },
        { id: 'strength', label: 'Max Strength', icon: '🔨' },
        { id: 'flexibility', label: 'Mobility', icon: '🧘' },
        { id: 'vertical-jump', label: 'Vertical Jump', icon: '⬆️' },
      ],
      required: true,
      defaultNextId: '__next_goal_branch__',
    },

    // ═══════════════════════════════════════════════════════════
    // INJURIES — Progressive Disclosure (DEEP)
    // Gate → Body Areas → Pain Triggers per Area → Notes → Custom
    // ═══════════════════════════════════════════════════════════

    'injury-gate': {
      id: 'injury-gate',
      category: 'constraints',
      title: 'Any injuries or physical limitations?',
      subtitle: 'Your plan is built around these. Be thorough.',
      type: 'single-select',
      options: [
        { id: 'none', label: 'No injuries or limitations', icon: '✅' },
        { id: 'yes', label: 'Yes, I have injuries/limitations', icon: '⚠️' },
      ],
      required: true,
      branches: [
        { condition: 'none', nextQuestionId: 'gym-access' },
        { condition: 'yes', nextQuestionId: 'injury-areas' },
      ],
    },

    'injury-areas': {
      id: 'injury-areas',
      category: 'constraints',
      title: 'Select all affected areas',
      subtitle: 'We\'ll ask specific follow-ups for each one.',
      type: 'multi-select',
      options: [
        { id: 'lumbar-spine', label: 'Lower Back / Lumbar Spine', icon: '🔙' },
        { id: 'rotator-cuff', label: 'Shoulder / Rotator Cuff', icon: '🦴' },
        { id: 'patellar-tendon', label: 'Knee / Patellar Tendon', icon: '🦵' },
        { id: 'hip-impingement', label: 'Hip Impingement', icon: '🦴' },
        { id: 'wrist-pain', label: 'Wrist / Hand', icon: '✋' },
        { id: 'elbow', label: 'Elbow / Tennis Elbow', icon: '💪' },
        { id: 'ankle', label: 'Ankle / Foot', icon: '🦶' },
        { id: 'neck', label: 'Neck / Cervical', icon: '🦴' },
        { id: 'thoracic', label: 'Upper Back / Thoracic', icon: '🔙' },
        { id: 'groin-adductor', label: 'Groin / Adductor', icon: '🦵' },
      ],
      required: true,
      minSelections: 1,
      // DYNAMIC: Engine generates pain trigger questions for selected areas
      defaultNextId: '__dynamic_pain_triggers__',
    },

    // Pain trigger questions are injected dynamically by the engine
    // based on which areas have profiles in injuryProfiles.ts

    'injury-notes': {
      id: 'injury-notes',
      category: 'constraints',
      title: 'Anything else about your injuries?',
      subtitle: 'Past surgeries, doctor restrictions, specific movements that hurt...',
      type: 'text-input',
      placeholder: 'e.g., "Torn rotator cuff surgery 2 years ago, still can\'t press overhead"',
      required: false,
      defaultNextId: 'additional-limitations',
    },

    'additional-limitations': {
      id: 'additional-limitations',
      category: 'constraints',
      title: 'Other limitations to consider?',
      subtitle: 'Add as many as needed. Tap + to add more.',
      type: 'multi-text-add',
      placeholder: 'e.g., "No impact exercises", "Bad balance on left side"',
      required: false,
      defaultNextId: 'gym-access',
    },

    // ═══════════════════════════════════════════════════════════
    // EQUIPMENT
    // ═══════════════════════════════════════════════════════════

    'gym-access': {
      id: 'gym-access',
      category: 'equipment',
      title: 'Where do you train?',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'full-gym', label: 'Full Gym', description: 'All equipment available', icon: '🏢' },
        { id: 'home-gym', label: 'Home Gym', icon: '🏠' },
        { id: 'minimal', label: 'Minimal Equipment', icon: '🎒' },
        { id: 'mixed', label: 'Mix (Gym + Home)', icon: '🔄' },
      ],
      required: true,
      branches: [
        { condition: 'full-gym', nextQuestionId: 'days-per-week' },
      ],
      defaultNextId: 'available-equipment',
    },

    'available-equipment': {
      id: 'available-equipment',
      category: 'equipment',
      title: 'What equipment do you have?',
      type: 'multi-select',
      options: [
        { id: 'dumbbells', label: 'Dumbbells', icon: '🏋️' },
        { id: 'barbell', label: 'Barbell + Plates', icon: '🏋️' },
        { id: 'squat-rack', label: 'Squat Rack', icon: '🏗️' },
        { id: 'bench', label: 'Adjustable Bench', icon: '🪑' },
        { id: 'pull-up-bar', label: 'Pull-up Bar', icon: '🔝' },
        { id: 'cables', label: 'Cable Machine', icon: '🔌' },
        { id: 'kettlebells', label: 'Kettlebells', icon: '🔔' },
        { id: 'resistance-bands', label: 'Resistance Bands', icon: '🔗' },
        { id: 'bodyweight', label: 'Bodyweight Only', icon: '🤸' },
      ],
      required: true,
      defaultNextId: 'days-per-week',
    },

    // ═══════════════════════════════════════════════════════════
    // SCHEDULE
    // ═══════════════════════════════════════════════════════════

    'days-per-week': {
      id: 'days-per-week',
      category: 'schedule',
      title: 'Training days per week?',
      subtitle: 'Consistency > volume.',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: '2', label: '2 days' },
        { id: '3', label: '3 days' },
        { id: '4', label: '4 days' },
        { id: '5', label: '5 days' },
        { id: '6', label: '6 days' },
      ],
      required: true,
      defaultNextId: 'minutes-per-session',
    },

    'minutes-per-session': {
      id: 'minutes-per-session',
      category: 'schedule',
      title: 'Session length?',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: '30', label: '30 min' },
        { id: '45', label: '45 min' },
        { id: '60', label: '60 min' },
        { id: '75', label: '75 min' },
        { id: '90', label: '90+ min' },
      ],
      required: true,
      defaultNextId: 'sleep-quality',
    },

    // ═══════════════════════════════════════════════════════════
    // RECOVERY & STRESS — NEW (feeds MEV/MRV volume algorithm)
    // ═══════════════════════════════════════════════════════════

    'sleep-quality': {
      id: 'sleep-quality',
      category: 'recovery',
      title: 'How\'s your sleep?',
      subtitle: 'Directly affects recovery capacity and volume prescription.',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'poor', label: 'Poor (< 6 hours)', description: 'Inconsistent or insufficient', icon: '😴' },
        { id: 'moderate', label: 'Moderate (6-7 hours)', icon: '😐' },
        { id: 'good', label: 'Good (7-9 hours)', description: 'Consistent and restful', icon: '😊' },
      ],
      required: true,
      defaultNextId: 'stress-level',
    },

    'stress-level': {
      id: 'stress-level',
      category: 'recovery',
      title: 'Current life stress?',
      subtitle: 'High stress = reduced MRV. Plan adapts.',
      type: 'single-select',
      autoAdvance: true,
      options: [
        { id: 'low', label: 'Low', description: 'Stable, manageable', icon: '🟢' },
        { id: 'moderate', label: 'Moderate', description: 'Some pressure', icon: '🟡' },
        { id: 'high', label: 'High', description: 'Major stressors active', icon: '🔴' },
      ],
      required: true,
      defaultNextId: 'exercise-likes',
    },

    // ═══════════════════════════════════════════════════════════
    // PREFERENCES — Optional
    // ═══════════════════════════════════════════════════════════

    'exercise-likes': {
      id: 'exercise-likes',
      category: 'preferences',
      title: 'Exercises you enjoy?',
      subtitle: 'Optional.',
      type: 'multi-select',
      options: [
        { id: 'squats', label: 'Squats' },
        { id: 'deadlifts', label: 'Deadlifts' },
        { id: 'bench-press', label: 'Bench Press' },
        { id: 'pull-ups', label: 'Pull-ups' },
        { id: 'overhead-press', label: 'Overhead Press' },
        { id: 'rows', label: 'Rows' },
        { id: 'lunges', label: 'Lunges' },
        { id: 'curls', label: 'Curls' },
        { id: 'hip-thrusts', label: 'Hip Thrusts' },
      ],
      required: false,
      defaultNextId: 'exercise-dislikes',
    },

    'exercise-dislikes': {
      id: 'exercise-dislikes',
      category: 'preferences',
      title: 'Exercises to avoid?',
      subtitle: 'Optional.',
      type: 'multi-select',
      options: [
        { id: 'squats', label: 'Squats' },
        { id: 'deadlifts', label: 'Deadlifts' },
        { id: 'bench-press', label: 'Bench Press' },
        { id: 'pull-ups', label: 'Pull-ups' },
        { id: 'burpees', label: 'Burpees' },
        { id: 'running', label: 'Running' },
        { id: 'planks', label: 'Planks' },
      ],
      required: false,
      defaultNextId: null, // END
    },
  },
};
