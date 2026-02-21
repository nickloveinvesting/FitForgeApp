/**
 * SLIDER INPUT
 *
 * Custom pan-responder slider for numeric range questions.
 * Displays min/max labels, current value, and a thumb that
 * tracks finger position across the track.
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

interface SliderInputProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function SliderInput({
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}: SliderInputProps) {
  const trackWidth = useRef(0);
  const trackX = useRef(0);

  // Calculate thumb position as percentage
  const fraction = Math.max(0, Math.min(1, (value - min) / (max - min)));

  /**
   * Convert a touch X position to a snapped slider value
   */
  function positionToValue(x: number): number {
    const frac = Math.max(0, Math.min(1, (x - trackX.current) / trackWidth.current));
    const raw = min + frac * (max - min);
    // Snap to step
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        onChange(positionToValue(evt.nativeEvent.pageX));
      },
      onPanResponderMove: (evt) => {
        onChange(positionToValue(evt.nativeEvent.pageX));
      },
    })
  ).current;

  /**
   * Capture the track's layout for position calculations
   */
  function onTrackLayout(e: LayoutChangeEvent) {
    trackWidth.current = e.nativeEvent.layout.width;
    // Measure absolute X position
    e.target?.measure?.((_x, _y, _w, _h, pageX) => {
      if (pageX !== undefined) trackX.current = pageX;
    });
  }

  return (
    <View style={styles.container}>
      {/* Current value display */}
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        {unit ? <Text style={styles.unitText}>{unit}</Text> : null}
      </View>

      {/* Slider track */}
      <View
        style={styles.trackContainer}
        onLayout={onTrackLayout}
        {...panResponder.panHandlers}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${fraction * 100}%` }]} />
          <View
            style={[
              styles.thumb,
              { left: `${fraction * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Min / Max labels */}
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>{min}{unit ? ` ${unit}` : ''}</Text>
        <Text style={styles.labelText}>{max}{unit ? ` ${unit}` : ''}</Text>
      </View>
    </View>
  );
}

const THUMB_SIZE = 28;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['2xl'],
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
  },
  valueText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.accent.primary,
  },
  unitText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  trackContainer: {
    paddingVertical: spacing.lg,
  },
  track: {
    height: 6,
    backgroundColor: colors.bg.tertiary,
    borderRadius: borderRadius.full,
    position: 'relative',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.full,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.accent.primary,
    borderWidth: 3,
    borderColor: '#fff',
    top: -(THUMB_SIZE - 6) / 2,
    marginLeft: -THUMB_SIZE / 2,
    // Shadow
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  labelText: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
});
