/**
 * NUMBER INPUT
 *
 * Styled numeric text input for questions like height, weight, 1RM maxes.
 * Shows the unit label inline and uses the orange accent on focus.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface NumberInputProps {
  value: number | undefined;
  min?: number;
  max?: number;
  unit: string;
  placeholder: string;
  onChange: (value: number) => void;
}

export function NumberInput({
  value,
  min = 0,
  max = 9999,
  unit,
  placeholder,
  onChange,
}: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.toString() ?? '');

  function handleChange(text: string) {
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setInputText(cleaned);

    const num = parseFloat(cleaned);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
      ]}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <View style={styles.unitBadge}>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.base,
  },
  inputWrapperFocused: {
    borderColor: colors.accent.primary,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    color: colors.text.primary,
    paddingVertical: spacing.lg,
  },
  unitBadge: {
    backgroundColor: colors.accent.muted,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  unitText: {
    color: colors.accent.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
