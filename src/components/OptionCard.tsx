/**
 * OPTION CARD
 *
 * Selectable card for single-select and multi-select questions.
 * Matches the mockup design:
 * - Dark card background with subtle border
 * - Orange border + accent when selected
 * - Icon on the left, label + description stacked
 * - Checkmark indicator when selected
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: string;
  isSelected: boolean;
  onPress: () => void;
  multiSelect?: boolean;
}

export function OptionCard({
  label,
  description,
  icon,
  isSelected,
  onPress,
  multiSelect = false,
}: OptionCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left side: icon (if present) */}
      {icon && (
        <Text style={styles.icon}>{icon}</Text>
      )}

      {/* Center: label + description */}
      <View style={styles.content}>
        <Text style={[styles.label, isSelected && styles.labelSelected]}>
          {label}
        </Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>

      {/* Right side: selection indicator */}
      <View style={[
        styles.indicator,
        multiSelect ? styles.indicatorSquare : styles.indicatorCircle,
        isSelected && styles.indicatorSelected,
      ]}>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.muted,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  label: {
    ...typography.styles.body,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.accent.primary,
  },
  description: {
    ...typography.styles.caption,
    marginTop: 2,
  },
  indicator: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  indicatorCircle: {
    borderRadius: 12, // Fully round for single-select
  },
  indicatorSquare: {
    borderRadius: borderRadius.sm, // Rounded square for multi-select
  },
  indicatorSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.primary,
  },
  checkmark: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '700',
  },
});
