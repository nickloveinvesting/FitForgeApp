/**
 * HOME / ONBOARDING SCREEN
 *
 * Entry point of the app. Shows:
 * 1. Welcome splash → Start questionnaire
 * 2. Questionnaire flow
 * 3. Plan generation → Plan result
 *
 * This is the main flow for the MVP. Later this will route
 * to a dashboard if the user already has a plan.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, borderRadius, typography, componentStyles } from '../src/theme';
import { QuestionnaireScreen } from '../src/screens/QuestionnaireScreen';
import { PlanResultScreen } from '../src/screens/PlanResultScreen';
import { generateAIPlan } from '../src/engine/aiPlanGenerator';
import { UserProfile } from '../src/types/questionnaire';
import { WorkoutPlan } from '../src/types/plan';

type AppPhase = 'welcome' | 'questionnaire' | 'generating' | 'plan-result';

export default function HomeScreen() {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  // ─── Handle questionnaire completion ─────────────────────
  const handleQuestionnaireComplete = useCallback(
    async (profileData: Record<string, unknown>) => {
      setPhase('generating');

      // Generate plan from profile using AI (with fallback)
      const profile = profileData as unknown as UserProfile;
      const generatedPlan = await generateAIPlan(profile);
      setPlan(generatedPlan);

      setPhase('plan-result');
    },
    []
  );

  // ─── Render based on current phase ───────────────────────

  switch (phase) {
    case 'welcome':
      return <WelcomeScreen onStart={() => setPhase('questionnaire')} />;

    case 'questionnaire':
      return <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />;

    case 'generating':
      return <GeneratingScreen />;

    case 'plan-result':
      return plan ? (
        <PlanResultScreen
          plan={plan}
          onStartTraining={() => {
            // TODO: Navigate to workout tracking screen
            console.log('Start training pressed');
          }}
        />
      ) : null;

    default:
      return null;
  }
}

// ─── Welcome Screen ──────────────────────────────────────────────

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.welcomeContainer}>
        {/* Logo / Brand */}
        <View style={styles.logoSection}>
          <Text style={styles.logoIcon}>🏋️</Text>
          <Text style={styles.appName}>FitForge</Text>
          <Text style={styles.tagline}>
            Your AI-powered personal training coach
          </Text>
        </View>

        {/* Features list */}
        <View style={styles.featuresList}>
          <FeatureItem
            icon="🎯"
            title="Personalized Plans"
            description="Tailored to your goals, equipment, and limitations"
          />
          <FeatureItem
            icon="🔄"
            title="Adaptive Training"
            description="Plans that adjust based on your feedback in real-time"
          />
          <FeatureItem
            icon="📊"
            title="Progress Tracking"
            description="Track every set, rep, and PR with detailed analytics"
          />
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Build My Plan →</Text>
        </TouchableOpacity>

        <Text style={styles.timeEstimate}>
          Takes about 2 minutes
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Feature Item Component ──────────────────────────────────────

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

// ─── Generating Screen ───────────────────────────────────────────

function GeneratingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.generatingContainer}>
        <ActivityIndicator size="large" color={colors.accent.primary} />
        <Text style={styles.generatingTitle}>Building Your Plan</Text>
        <Text style={styles.generatingSubtitle}>
          Analyzing your profile and selecting the optimal exercises...
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },

  // Welcome
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: spacing.base,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.accent.primary,
    letterSpacing: -1,
  },
  tagline: {
    ...typography.styles.caption,
    fontSize: 16,
    marginTop: spacing.sm,
    textAlign: 'center',
  },

  // Features
  featuresList: {
    marginBottom: spacing['4xl'],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: spacing.base,
    width: 44,
    textAlign: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDescription: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },

  // CTA
  startButton: {
    ...componentStyles.buttonPrimary,
    paddingVertical: spacing.lg,
  },
  startButtonText: {
    color: colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  timeEstimate: {
    ...typography.styles.caption,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  // Generating
  generatingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  generatingTitle: {
    ...typography.styles.screenTitle,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  generatingSubtitle: {
    ...typography.styles.caption,
    fontSize: 16,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 24,
  },
});
