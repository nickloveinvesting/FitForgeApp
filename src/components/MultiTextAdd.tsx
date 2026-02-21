/**
 * MULTI TEXT ADD
 *
 * Unlimited free-text input with chip display.
 * Used for exercise likes/dislikes and custom limitations.
 * User types text, presses Add, and entries appear as removable chips.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface MultiTextAddProps {
  values: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
  maxItems?: number;
}

export function MultiTextAdd({
  values,
  placeholder,
  onChange,
  maxItems = 20,
}: MultiTextAddProps) {
  const [inputText, setInputText] = useState('');

  /**
   * Add the current input as a new chip
   */
  function handleAdd() {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    if (values.length >= maxItems) return;
    // Prevent duplicates (case-insensitive)
    if (values.some((v) => v.toLowerCase() === trimmed.toLowerCase())) return;

    onChange([...values, trimmed]);
    setInputText('');
  }

  /**
   * Remove a chip by index
   */
  function handleRemove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <View style={styles.container}>
      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            !inputText.trim() && styles.addButtonDisabled,
          ]}
          onPress={handleAdd}
          disabled={!inputText.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Chip display */}
      {values.length > 0 && (
        <View style={styles.chipContainer}>
          {values.map((value, index) => (
            <View key={`${value}-${index}`} style={styles.chip}>
              <Text style={styles.chipText}>{value}</Text>
              <TouchableOpacity
                onPress={() => handleRemove(index)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.chipRemove}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Helper text */}
      <Text style={styles.helperText}>
        {values.length === 0
          ? 'Type and press Add (optional)'
          : `${values.length} item${values.length > 1 ? 's' : ''} added`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    color: colors.text.primary,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.bg.tertiary,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.base,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.muted,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    gap: spacing.sm,
  },
  chipText: {
    color: colors.accent.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  chipRemove: {
    color: colors.accent.primary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
  helperText: {
    color: colors.text.tertiary,
    fontSize: 13,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
