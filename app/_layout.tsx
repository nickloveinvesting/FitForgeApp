/**
 * ROOT LAYOUT
 *
 * Expo Router file-based routing entry point.
 * Sets up the navigation stack with dark theme.
 * Initializes the AI provider on first render.
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../src/theme';
import { initializeAIProvider } from '../src/config/ai';

export default function RootLayout() {
  // Initialize AI provider once at app startup
  useEffect(() => {
    initializeAIProvider();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg.primary },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
