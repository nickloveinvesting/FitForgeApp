/**
 * INJURY SELECTOR COMPONENT
 *
 * A specialized multi-select for body areas with injury profiles.
 * Displays injury areas as tappable cards with icons, organized into
 * two groups: profiled areas (with pain triggers) and additional areas.
 *
 * Props:
 * - selected: string[] of currently selected area IDs
 * - onToggle: called when an area is toggled on/off
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { injuryProfiles, additionalInjuryAreas } from '../data/injuryProfiles';

interface InjurySelectorProps {
  selected: string[];
  onToggle: (areaId: string) => void;
}

export function InjurySelector({ selected, onToggle }: InjurySelectorProps) {
  return (
    <View style={styles.container}>
      {/* Profiled injury areas (have deep pain trigger data) */}
      <Text style={styles.sectionLabel}>COMMON AREAS</Text>
      <View style={styles.grid}>
        {injuryProfiles.map((profile) => {
          const isSelected = selected.includes(profile.id);
          return (
            <TouchableOpacity
              key={profile.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onToggle(profile.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardIcon}>{profile.icon}</Text>
              <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                {profile.label}
              </Text>
              {isSelected && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Additional areas (AI handles these with general logic) */}
      <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>OTHER AREAS</Text>
      <View style={styles.grid}>
        {additionalInjuryAreas.map((area) => {
          const isSelected = selected.includes(area.id);
          return (
            <TouchableOpacity
              key={area.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onToggle(area.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardIcon}>{area.icon}</Text>
              <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                {area.label}
              </Text>
              {isSelected && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selection count */}
      {selected.length > 0 && (
        <Text style={styles.selectionCount}>
          {selected.length} area{selected.length > 1 ? 's' : ''} selected
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.tertiary,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  sectionLabelSpaced: {
    marginTop: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    position: 'relative',
  },
  cardSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: 'rgba(255, 107, 0, 0.08)',
  },
  cardIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  cardLabel: {
    flex: 1,
    color: colors.text.secondary,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  cardLabelSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  checkMark: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  selectionCount: {
    color: colors.accent.primary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
