/**
 * TEXT INPUT FIELD
 *
 * Multi-line text input for free-text questions (injury notes, etc.)
 * Dark themed with orange focus border.
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

interface TextInputFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function TextInputField({
  value,
  placeholder,
  onChange,
}: TextInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
  },
  input: {
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    color: colors.text.primary,
    fontSize: 16,
    minHeight: 120,
    lineHeight: 24,
  },
  inputFocused: {
    borderColor: colors.accent.primary,
  },
});
