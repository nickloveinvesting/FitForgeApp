/**
 * DESIGN SYSTEM & THEME
 *
 * Extracted from the app mockups:
 * - Dark mode primary with near-black backgrounds
 * - Orange accent (#FF6B00) for CTAs, active states, highlights
 * - Card-based layout with subtle dark gray cards
 * - Clean sans-serif typography
 * - Rounded corners on cards and inputs
 */

// ─── Color Palette ───────────────────────────────────────────────

export const colors = {
  // Backgrounds (darkest to lightest)
  bg: {
    primary: '#0A0A0A',        // Main screen background
    secondary: '#141414',      // Card backgrounds
    tertiary: '#1C1C1E',       // Elevated surfaces (modals, sheets)
    input: '#1C1C1E',          // Input field backgrounds
    hover: '#252527',          // Hover/press state on cards
  },

  // Orange accent spectrum
  accent: {
    primary: '#FF6B00',        // Primary CTA, active tabs, highlights
    secondary: '#FF8A33',      // Lighter orange for hover states
    tertiary: '#CC5500',       // Darker orange for pressed states
    muted: 'rgba(255, 107, 0, 0.15)',  // Orange tint for backgrounds
    border: 'rgba(255, 107, 0, 0.4)',  // Orange border (badges, active inputs)
  },

  // Text
  text: {
    primary: '#FFFFFF',        // Headings, primary text
    secondary: '#A0A0A0',     // Subtitles, descriptions
    tertiary: '#666666',       // Placeholder text, disabled
    inverse: '#0A0A0A',        // Text on orange backgrounds
    accent: '#FF6B00',         // Orange text (links, "ADD SET", "SAVE")
  },

  // Semantic colors
  success: '#34C759',          // PRs, completed sets, streaks
  warning: '#FFD60A',          // Caution states
  error: '#FF3B30',            // Errors, delete actions
  info: '#5AC8FA',             // Informational badges

  // Borders
  border: {
    default: '#2C2C2E',        // Card borders, dividers
    focused: '#FF6B00',        // Focused input borders
    subtle: '#1C1C1E',         // Subtle separators
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.6)',
} as const;

// ─── Typography ──────────────────────────────────────────────────

export const typography = {
  // Font families (using system fonts for now; can swap later)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font sizes with line heights
  sizes: {
    xs: { fontSize: 11, lineHeight: 14 },
    sm: { fontSize: 13, lineHeight: 18 },
    base: { fontSize: 15, lineHeight: 20 },
    md: { fontSize: 17, lineHeight: 22 },
    lg: { fontSize: 20, lineHeight: 25 },
    xl: { fontSize: 24, lineHeight: 30 },
    '2xl': { fontSize: 28, lineHeight: 34 },
    '3xl': { fontSize: 34, lineHeight: 41 },
  },

  // Pre-composed text styles
  styles: {
    // Screen titles (e.g., "Workouts", "Push Day")
    screenTitle: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700' as const,
      color: '#FF6B00',        // Orange titles like in mockup
    },
    // Section headers
    sectionHeader: {
      fontSize: 20,
      lineHeight: 25,
      fontWeight: '600' as const,
      color: '#FFFFFF',
    },
    // Card titles (e.g., "Leg Day 1/2/24")
    cardTitle: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '600' as const,
      color: '#FFFFFF',
    },
    // Body text
    body: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '400' as const,
      color: '#FFFFFF',
    },
    // Secondary/subtitle text
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400' as const,
      color: '#A0A0A0',
    },
    // Small labels
    label: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '500' as const,
      color: '#A0A0A0',
    },
    // Large numbers (stats like "22 Sets", "356 Cal")
    stat: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700' as const,
      color: '#FFFFFF',
    },
    // Accent text ("SAVE", "ADD SET", "+")
    accentAction: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '600' as const,
      color: '#FF6B00',
    },
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

// ─── Border Radius ───────────────────────────────────────────────

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 9999,      // Pill shape
} as const;

// ─── Shadows (subtle on dark backgrounds) ────────────────────────

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;

// ─── Common Component Styles ─────────────────────────────────────
// Reusable style presets matching the mockup patterns

export const componentStyles = {
  // Card container (like workout history cards)
  card: {
    backgroundColor: colors.bg.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border.default,
  },

  // Orange-bordered badge/chip (like "Volume", "1RM" badges)
  badge: {
    borderWidth: 1,
    borderColor: colors.accent.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'transparent',
  },

  // Primary button (orange background)
  buttonPrimary: {
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // Secondary button (orange outline)
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // Text input field
  input: {
    backgroundColor: colors.bg.input,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    color: colors.text.primary,
    fontSize: 15,
  },

  // Screen container
  screen: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },

  // Bottom tab bar style
  tabBar: {
    backgroundColor: colors.bg.secondary,
    borderTopColor: colors.border.default,
    borderTopWidth: 1,
  },
} as const;
