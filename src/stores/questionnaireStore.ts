/**
 * QUESTIONNAIRE ZUSTAND STORE (v2)
 *
 * Global state management for the onboarding questionnaire.
 * Uses Zustand for lightweight reactive state.
 *
 * v2 CHANGES:
 * - Added dynamicQuestions to state (for runtime-injected pain triggers)
 * - All state extraction includes dynamicQuestions field
 */

import { create } from 'zustand';
import {
  QuestionnaireState,
  UserProfile,
} from '../types/questionnaire';
import {
  createInitialState,
  answerQuestion,
  goBack,
  getCurrentQuestion,
  getCurrentAnswer,
} from '../engine/questionEngine';
import { questionFlow } from '../data/questionFlow';

// ─── Store Interface ─────────────────────────────────────────────

interface QuestionnaireStore extends QuestionnaireState {
  // Actions
  answer: (value: string | string[] | number | Record<string, string | number>) => void;
  back: () => void;
  reset: () => void;

  // Computed getters
  getQuestion: () => ReturnType<typeof getCurrentQuestion>;
  getAnswer: () => ReturnType<typeof getCurrentAnswer>;
  getProfile: () => UserProfile;
}

// ─── Helper: Extract QuestionnaireState from store ───────────────
/** Pulls only the QuestionnaireState fields from the store (excludes actions) */
function extractState(state: QuestionnaireStore): QuestionnaireState {
  return {
    currentQuestionId: state.currentQuestionId,
    history: state.history,
    profile: state.profile,
    isComplete: state.isComplete,
    progress: state.progress,
    dynamicQuestions: state.dynamicQuestions,
    pendingGoalBranches: state.pendingGoalBranches,
  };
}

// ─── Create the Store ────────────────────────────────────────────

export const useQuestionnaireStore = create<QuestionnaireStore>((set, get) => {
  const initialState = createInitialState(questionFlow);

  return {
    ...initialState,

    // ─── Answer current question and advance ───────────────
    answer: (value) => {
      const newState = answerQuestion(extractState(get()), questionFlow, value);
      set(newState);
    },

    // ─── Go back to previous question ──────────────────────
    back: () => {
      const newState = goBack(extractState(get()));
      set(newState);
    },

    // ─── Reset questionnaire to beginning ──────────────────
    reset: () => {
      set(createInitialState(questionFlow));
    },

    // ─── Get current question object ───────────────────────
    getQuestion: () => {
      return getCurrentQuestion(extractState(get()), questionFlow);
    },

    // ─── Get saved answer for current question ─────────────
    getAnswer: () => {
      return getCurrentAnswer(extractState(get()));
    },

    // ─── Get the full user profile ─────────────────────────
    getProfile: () => {
      return get().profile;
    },
  };
});
