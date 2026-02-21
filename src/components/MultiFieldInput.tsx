/**
 * MULTI-FIELD INPUT
 *
 * Renders multiple inputs on a single screen. Used for:
 * - Age + Gender + Units (basics-info)
 * - Height + Weight (body-measurements)
 * - Squat / Bench / Deadlift 1RM (max-lifts)
 *
 * Supports:
 * - `showWhen` — conditionally show a field based on another field's value
 * - `variants` — change unit/placeholder/max based on unit preference
 * - Mixed input types: number-input, single-select, slider
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { SubField } from '../types/questionnaire';
import { NumberInput } from './NumberInput';
import { OptionCard } from './OptionCard';
import { SliderInput } from './SliderInput';

interface MultiFieldInputProps {
  fields: SubField[];
  values: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
}

export function MultiFieldInput({ fields, values, onChange }: MultiFieldInputProps) {
  /**
   * Resolve variants: if the field has variants keyed by a unit preference,
   * merge those overrides into the field definition.
   */
  function resolveField(field: SubField): SubField {
    if (!field.variants) return field;
    // Check if any variant key matches a current value
    for (const [key, overrides] of Object.entries(field.variants)) {
      if (Object.values(values).includes(key)) {
        return { ...field, ...overrides };
      }
    }
    return field;
  }

  /**
   * Check showWhen condition
   */
  function isFieldVisible(field: SubField): boolean {
    if (!field.showWhen) return true;
    return values[field.showWhen.field] === field.showWhen.value;
  }

  return (
    <View style={styles.container}>
      {fields.map((rawField) => {
        const field = resolveField(rawField);
        if (!isFieldVisible(field)) return null;

        return (
          <View key={field.id} style={styles.fieldBlock}>
            {/* Field label */}
            <Text style={styles.fieldLabel}>{field.label}</Text>

            {/* Render by subfield type */}
            {field.type === 'number-input' && (
              <NumberInput
                value={values[field.id]}
                min={field.min}
                max={field.max}
                unit={field.unit || ''}
                placeholder={field.placeholder || 'Enter value'}
                onChange={(v) => onChange(field.id, v)}
              />
            )}

            {field.type === 'single-select' && field.options && (
              <View style={styles.optionsRow}>
                {field.options.map((opt) => (
                  <View key={opt.value} style={styles.optionItem}>
                    <OptionCard
                      label={opt.label}
                      icon={opt.icon}
                      isSelected={values[field.id] === opt.value}
                      onPress={() => onChange(field.id, opt.value)}
                    />
                  </View>
                ))}
              </View>
            )}

            {field.type === 'slider' && (
              <SliderInput
                value={values[field.id] ?? field.min ?? 0}
                min={field.min ?? 0}
                max={field.max ?? 100}
                step={field.step ?? 1}
                unit={field.unit}
                onChange={(v) => onChange(field.id, v)}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  fieldBlock: {
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsRow: {
    gap: spacing.sm,
  },
  optionItem: {
    // Each option card handles its own margins
  },
});
