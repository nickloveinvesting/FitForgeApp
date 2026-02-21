/**
 * PROGRESS BAR
 *
 * Animated horizontal progress bar showing questionnaire completion.
 * Uses the orange accent color on a dark track.
 */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, borderRadius } from '../theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  // Clamp between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          { width: `${clampedProgress * 100}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: colors.bg.tertiary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.full,
  },
});
