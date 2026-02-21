/**
 * INJURY PROFILES — Extracted from Research Document
 *
 * Each injury area maps to:
 * - Pain triggers (what the user feels — used in questionnaire)
 * - Hard exclusions (exercises that MUST be avoided)
 * - Safe substitutions (alternatives organized by target muscle)
 * - Rehab protocols (warm-up additions when this injury is present)
 *
 * This data drives two things:
 * 1. The questionnaire: pain trigger questions per injury area
 * 2. The AI prompt context: sent with plan generation request
 *
 * Sources: 300+ studies, NSCA/ACSM consensus, Israetel/Schoenfeld/Helms
 */

// ─── Types ───────────────────────────────────────────────────────

export interface PainTrigger {
  id: string;
  label: string;                    // User-friendly description
  technicalNote?: string;           // Brief biomechanical rationale
}

export interface ExerciseExclusion {
  exercise: string;
  reason: string;
}

export interface SafeSubstitution {
  targetMuscle: string;
  exercise: string;
  rationale: string;
}

export interface RehabExercise {
  exercise: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rationale: string;
}

export interface InjuryProfile {
  id: string;
  label: string;                    // Display name
  icon: string;                     // Emoji for UI
  bodyArea: string;                 // Anatomical region
  painTriggers: PainTrigger[];
  hardExclusions: ExerciseExclusion[];
  safeSubstitutions: SafeSubstitution[];
  rehabExercises: RehabExercise[];
  keyPrinciples: string[];          // General rules for this injury
}

// ─── Injury Profiles ─────────────────────────────────────────────

export const injuryProfiles: InjuryProfile[] = [

  // ═══════════════════════════════════════════════════════════
  // 1. LUMBAR SPINE / HERNIATED DISC
  // ═══════════════════════════════════════════════════════════
  {
    id: 'lumbar-spine',
    label: 'Lower Back / Lumbar Spine',
    icon: '🔙',
    bodyArea: 'spine',
    painTriggers: [
      { id: 'pain-forward-bending', label: 'Pain when bending forward', technicalNote: 'Spinal flexion under load increases disc shear stress' },
      { id: 'pain-twisting-load', label: 'Pain when twisting under load', technicalNote: 'Rotational stress on lumbar discs' },
      { id: 'pain-spinal-flexion', label: 'Pain with spinal flexion (rounding back)', technicalNote: 'Posterior disc displacement risk' },
      { id: 'radiating-leg-pain', label: 'Radiating pain down leg (sciatica)', technicalNote: 'Nerve root compression indicator' },
      { id: 'pain-sitting-long', label: 'Pain after prolonged sitting' },
      { id: 'morning-stiffness', label: 'Significant morning stiffness in lower back' },
    ],
    hardExclusions: [
      { exercise: 'Conventional Deadlift', reason: 'High shear force (2-3 kN at 75-100% 1RM); spinal flexion under load' },
      { exercise: 'Barbell Bent Over Row', reason: 'Combines spinal flexion + horizontal loading = disc herniation risk' },
      { exercise: 'Deep Back Squat', reason: 'Excessive lumbar flexion at depth; forward pelvic tilt "butt wink"' },
      { exercise: 'Sit-ups / Crunches', reason: 'Repeated flexion causes posterior disc displacement' },
      { exercise: 'Good Mornings', reason: 'High lumbar moment arm + flexion under load' },
      { exercise: 'High-Impact Running/Jumping', reason: 'Repetitive compressive loading on injured disc' },
    ],
    safeSubstitutions: [
      { targetMuscle: 'Posterior Chain', exercise: 'Hex Bar Deadlift', rationale: '20-30% reduction in lumbar stress vs conventional; more upright torso' },
      { targetMuscle: 'Posterior Chain', exercise: 'Romanian Deadlift from Blocks', rationale: 'Reduced ROM limits lumbar flexion demands' },
      { targetMuscle: 'Quads', exercise: 'Leg Press', rationale: 'Back pad support eliminates spinal compression; controlled ROM' },
      { targetMuscle: 'Quads', exercise: 'Leg Extension', rationale: 'Zero spinal load; pure knee extension' },
      { targetMuscle: 'Hamstrings', exercise: 'Lying/Seated Leg Curl', rationale: 'Zero spinal load; pure knee flexion' },
      { targetMuscle: 'Back/Lats', exercise: 'Chest-Supported T-Bar Row', rationale: 'Chest pad eliminates lumbar involvement' },
    ],
    rehabExercises: [
      { exercise: 'McKenzie Extensions (Cobra Stretch)', sets: 2, reps: '10', duration: '5s hold per rep', rationale: 'Extension reduces posterior disc pressure' },
      { exercise: 'Bird Dogs', sets: 2, reps: '10 per side', rationale: 'Activates deep core stabilizers without flexion' },
      { exercise: 'Dead Bug', sets: 2, reps: '8 per side', rationale: 'Core activation in spine-safe position' },
    ],
    keyPrinciples: [
      'Maintain neutral spine during all loaded movements',
      'Avoid spinal flexion + twisting + compression combination',
      'Use chest-supported or machine variations to eliminate lumbar load',
      'Prioritize extension-based core work over flexion',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. ROTATOR CUFF
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rotator-cuff',
    label: 'Shoulder / Rotator Cuff',
    icon: '🦴',
    bodyArea: 'shoulder',
    painTriggers: [
      { id: 'pain-overhead-press', label: 'Pain with overhead pressing', technicalNote: 'Subacromial impingement at >90° abduction' },
      { id: 'pain-internal-rotation', label: 'Pain with internal rotation', technicalNote: 'Stresses torn rotator cuff tissue' },
      { id: 'pain-horizontal-adduction', label: 'Pain reaching across body', technicalNote: 'Horizontal adduction compresses subacromial space' },
      { id: 'weakness-external-rotation', label: 'Weakness when rotating arm outward' },
      { id: 'painful-arc', label: 'Pain raising arm between 60-120°', technicalNote: 'Classic painful arc = subacromial impingement sign' },
      { id: 'night-pain-shoulder', label: 'Pain sleeping on affected shoulder' },
    ],
    hardExclusions: [
      { exercise: 'Overhead Press (Barbell/Dumbbell)', reason: 'Subacromial impingement at >90° abduction; high superior shear' },
      { exercise: 'Behind-the-Neck Press', reason: 'Extreme external rotation + impingement position' },
      { exercise: 'Upright Rows', reason: 'Internal rotation + abduction = impingement' },
      { exercise: 'Heavy Bench Press (>85% 1RM)', reason: 'Anterior instability risk; excessive horizontal adduction torque' },
      { exercise: 'Dips', reason: 'Extreme shoulder extension + internal rotation = anterior cuff stress' },
    ],
    safeSubstitutions: [
      { targetMuscle: 'Shoulders (Lateral)', exercise: 'Lateral Raises (<90° ROM)', rationale: 'Controlled abduction below impingement angle' },
      { targetMuscle: 'Chest', exercise: 'Incline Press (30-45°)', rationale: 'Less horizontal adduction than flat bench; reduced cuff stress' },
      { targetMuscle: 'Back/Lats', exercise: 'Chest-Supported Row', rationale: 'Stable scapula position; no momentum compensation' },
      { targetMuscle: 'Rotator Cuff', exercise: 'Band External Rotations (Elbow at Side)', rationale: 'Isolated infraspinatus/teres minor strengthening' },
      { targetMuscle: 'Scapular Stabilizers', exercise: 'Scapular Wall Slides', rationale: 'Strengthens serratus anterior/lower traps' },
    ],
    rehabExercises: [
      { exercise: 'Pendulum Swings', sets: 3, duration: '30 seconds', rationale: 'Gentle ROM without active muscle contraction' },
      { exercise: 'External Rotation with Band', sets: 3, reps: '15', rationale: 'Targets infraspinatus/teres minor; critical for stability' },
      { exercise: 'Scapular Retraction (Light Rows)', sets: 3, reps: '12', rationale: 'Strengthens rhomboids/mid-traps; improves positioning' },
    ],
    keyPrinciples: [
      'Avoid overhead movements above 90° abduction',
      'Prioritize external rotation and scapular stability work',
      'Use incline angles (30-45°) instead of flat bench',
      'Eccentric training protocols for tendon healing (12+ weeks)',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. PATELLAR TENDINOPATHY (KNEE)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'patellar-tendon',
    label: 'Knee / Patellar Tendon',
    icon: '🦵',
    bodyArea: 'knee',
    painTriggers: [
      { id: 'pain-jumping-landing', label: 'Pain with jumping or landing', technicalNote: 'Patellar tendon loading index >0.70 during plyometrics' },
      { id: 'pain-deep-squatting', label: 'Pain in deep squat position', technicalNote: 'High compressive force + deep knee flexion' },
      { id: 'pain-knee-extension-load', label: 'Pain extending knee under load', technicalNote: 'Direct patellar tendon strain' },
      { id: 'pain-inferior-patella', label: 'Localized pain just below kneecap', technicalNote: 'Inferior pole patella = classic patellar tendinopathy sign' },
      { id: 'pain-stairs-down', label: 'Pain going downstairs' },
      { id: 'stiffness-after-sitting', label: 'Stiffness after prolonged sitting' },
    ],
    hardExclusions: [
      { exercise: 'Box Jumps / Depth Jumps', reason: 'Tendon loading exceeds tissue tolerance during acute phase' },
      { exercise: 'Running / Sprinting (Acute)', reason: 'Repetitive high-velocity knee extension = tendon overload' },
      { exercise: 'Heavy Deep Back Squat', reason: 'High compressive force + deep knee flexion during inflammation' },
      { exercise: 'Heavy Ballistic Leg Extension', reason: 'Isolated quad contraction = direct patellar tendon strain' },
    ],
    safeSubstitutions: [
      { targetMuscle: 'Quads', exercise: 'Leg Press (Controlled ROM)', rationale: 'Adjustable depth limits knee flexion angle' },
      { targetMuscle: 'Quads', exercise: 'Hack Squat', rationale: 'Machine-guided path; reduced patellar shear vs free squat' },
      { targetMuscle: 'Quads (Isometric)', exercise: 'Wall Sit', rationale: 'Static hold reduces dynamic loading; safe for early rehab' },
      { targetMuscle: 'Quads (Eccentric)', exercise: 'Single-Leg Decline Squat (25° Board)', rationale: 'Gold-standard eccentric protocol; 3s eccentric, 4s concentric' },
      { targetMuscle: 'Quads (Functional)', exercise: 'Step-Ups / Step-Downs', rationale: 'Low-impact progressive overload via step height' },
    ],
    rehabExercises: [
      { exercise: 'Spanish Squat (Isometric)', sets: 5, duration: '45s hold', rationale: 'Isometric contraction reduces pain via motor cortex inhibition; effects last 45 min' },
      { exercise: 'Isometric Leg Extension (30-60° flexion)', sets: 5, duration: '45s hold', rationale: 'Pain-free loading at safe knee angle' },
      { exercise: 'Single-Leg Decline Squat', sets: 3, reps: '15', rationale: 'Heavy slow resistance protocol; normalizes tendon structure' },
    ],
    keyPrinciples: [
      'Progress: isometric → isotonic → eccentric → plyometric over 12 weeks',
      'Heavy Slow Resistance superior to eccentric-only',
      'Isometrics provide immediate analgesia (use pre-workout)',
      'No plyometrics until pain-free HSR training for 4+ weeks',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. HIP IMPINGEMENT (FAI)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'hip-impingement',
    label: 'Hip / Femoroacetabular Impingement',
    icon: '🦴',
    bodyArea: 'hip',
    painTriggers: [
      { id: 'pain-deep-hip-flexion', label: 'Pain with deep hip bending (90°+)', technicalNote: 'Abnormal femoral-acetabular contact at >90° flexion' },
      { id: 'pain-hip-internal-rotation', label: 'Pain rotating hip inward', technicalNote: 'Internal rotation creates labral compression' },
      { id: 'pain-hip-adduction-flexion', label: 'Pain crossing legs or squeezing knees', technicalNote: 'Combined adduction + flexion = triple threat for FAI' },
      { id: 'anterior-hip-groin-pain', label: 'Pain in front of hip / groin area', technicalNote: 'Classic C-sign: hand grips around hip joint' },
      { id: 'pain-getting-out-of-car', label: 'Pain getting out of car or low chair' },
    ],
    hardExclusions: [
      { exercise: 'Deep Squats (ATG)', reason: 'Excessive hip flexion >110° = anterior impingement' },
      { exercise: 'Pistol Squats', reason: 'Extreme hip flexion + internal rotation + adduction' },
      { exercise: 'Cycling (Acute Phase)', reason: 'Repetitive hip flexion + internal rotation in closed chain' },
    ],
    safeSubstitutions: [
      { targetMuscle: 'Quads/Glutes', exercise: 'Box Squat (Parallel or Above)', rationale: 'Limited ROM prevents excessive hip flexion; box provides depth control' },
      { targetMuscle: 'Glutes', exercise: 'Hip Thrusts', rationale: 'Hip extension-dominant; minimal hip flexion; high glute activation' },
      { targetMuscle: 'Hip Abductors', exercise: 'Clamshells / Side-Lying Abduction', rationale: 'Strengthens gluteus medius; improves stability without impingement' },
      { targetMuscle: 'Hip Extensors', exercise: 'Romanian Deadlift', rationale: 'Hinge pattern with neutral hip; minimal flexion' },
    ],
    rehabExercises: [
      { exercise: 'Hip Flexor Stretch (Kneeling Lunge)', sets: 2, duration: '30s per side', rationale: 'Reduces anterior hip tightness; improves extension ROM' },
      { exercise: 'Pelvic Tilts (Cat-Cow)', sets: 2, reps: '10', rationale: 'Promotes lumbopelvic dissociation' },
      { exercise: 'Hip Abduction in Quadruped', sets: 2, reps: '10 per side', rationale: 'Activates hip abductors without impingement position' },
    ],
    keyPrinciples: [
      'Avoid hip flexion greater than 90°',
      'Avoid combined flexion + adduction + internal rotation',
      'Emphasize hip extension and external rotation',
      'Use box/depth limiters on all squat variations',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. WRIST PAIN
  // ═══════════════════════════════════════════════════════════
  {
    id: 'wrist-pain',
    label: 'Wrist / Hand',
    icon: '✋',
    bodyArea: 'wrist',
    painTriggers: [
      { id: 'pain-wrist-hyperextension', label: 'Pain with wrist bent backwards (push-ups, planks)', technicalNote: 'Wrist hyperextension >70° compresses carpal structures' },
      { id: 'pain-barbell-pressing', label: 'Pain gripping barbell during pressing', technicalNote: 'Extended wrist under heavy load = joint stress' },
      { id: 'wrist-weakness-grip', label: 'Weak grip or dropping things' },
      { id: 'pain-wrist-rotation', label: 'Pain when rotating wrist (turning doorknob)' },
    ],
    hardExclusions: [
      { exercise: 'Standard Push-Ups (Flat Hand)', reason: 'Wrist hyperextension >70° = carpal compression' },
      { exercise: 'Heavy Barbell Bench Press (Standard Grip)', reason: 'Extended wrist under heavy load = joint stress' },
      { exercise: 'Barbell Overhead Press (Bent Wrist)', reason: 'Hyperextension + compressive load' },
    ],
    safeSubstitutions: [
      { targetMuscle: 'Chest/Triceps', exercise: 'Push-Ups on Dumbbells/Kettlebells', rationale: 'Neutral grip eliminates wrist hyperextension' },
      { targetMuscle: 'Chest/Triceps', exercise: 'Elevated Push-Ups (Bench)', rationale: 'Reduced wrist angle = less joint stress' },
      { targetMuscle: 'Core', exercise: 'Forearm Plank', rationale: 'Eliminates wrist involvement entirely' },
      { targetMuscle: 'All Pressing', exercise: 'Fat Gripz / Thick Bar Variations', rationale: 'Thicker diameter distributes force; reduces strain' },
    ],
    rehabExercises: [
      { exercise: 'Wrist Flexor Stretch', sets: 2, duration: '20s per side', rationale: 'Extend arm, pull fingers back with opposite hand' },
      { exercise: 'Wrist Extensor Stretch', sets: 2, duration: '20s per side', rationale: 'Extend arm, pull fingers down with opposite hand' },
      { exercise: 'Wrist Circles', sets: 2, reps: '10 each direction', rationale: 'Promotes synovial fluid distribution; improves ROM' },
      { exercise: 'Grip Strengthening (Tennis Ball Squeeze)', sets: 3, reps: '10 x 5s hold', rationale: 'Strengthens flexors/extensors; improves stability' },
    ],
    keyPrinciples: [
      'Use neutral grip handles wherever possible',
      'Avoid wrist hyperextension under load',
      'Wrist wraps can help during transition but are not a long-term fix',
      'Strengthen grip and forearm muscles progressively',
    ],
  },
];

// ─── Quick Lookup ────────────────────────────────────────────────

export const injuryProfileMap: Record<string, InjuryProfile> = {};
injuryProfiles.forEach((p) => { injuryProfileMap[p.id] = p; });

// ─── Additional "Other" Injury Areas ─────────────────────────────
// These don't have full research profiles yet but users should
// be able to select them. The AI will handle these with general
// constraint logic.

export const additionalInjuryAreas = [
  { id: 'elbow', label: 'Elbow / Tennis Elbow', icon: '💪' },
  { id: 'ankle', label: 'Ankle / Foot', icon: '🦶' },
  { id: 'neck', label: 'Neck / Cervical Spine', icon: '🦴' },
  { id: 'thoracic', label: 'Upper Back / Thoracic Spine', icon: '🔙' },
  { id: 'glute-piriformis', label: 'Glute / Piriformis / Sciatica', icon: '🍑' },
  { id: 'groin-adductor', label: 'Groin / Adductor Strain', icon: '🦵' },
  { id: 'achilles', label: 'Achilles Tendon', icon: '🦶' },
  { id: 'shin-splints', label: 'Shin Splints', icon: '🦵' },
];
