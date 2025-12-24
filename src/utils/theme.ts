// Premium Dark Theme - Production Quality UI
export const theme = {
  colors: {
    // Primary accent - Muted vibrant orange (food-app inspired)
    primary: "#FF6B35", // Vibrant but not neon orange
    primaryDark: "#E85A2B",
    primaryLight: "#FF8A5B",
    primaryMuted: "#FF6B3520", // 12% opacity for backgrounds

    // Secondary accent - Warm amber
    secondary: "#FFB84D",
    secondaryLight: "#FFC976",
    secondaryMuted: "#FFB84D20",

    // Accent color - Teal for variety
    accent: "#1DB9A4",
    accentLight: "#3DD4BE",
    accentMuted: "#1DB9A420",

    // Dark backgrounds (not pure black - better for eyes)
    background: "#0F0F0F", // Very dark gray - main background
    surface: "#1A1A1A", // Dark gray cards/surfaces
    surfaceVariant: "#242424", // Slightly lighter for elevation
    card: "#1A1A1A",
    elevated: "#2A2A2A", // Highest elevation

    // Text colors - High contrast on dark
    text: "#F5F5F5", // Off-white for primary text
    textSecondary: "#B0B0B0", // Medium gray for secondary
    textMuted: "#707070", // Muted for tertiary text
    textInverse: "#0F0F0F", // For light backgrounds

    // Status colors - Dark theme optimized
    success: "#4ADE80", // Bright green
    successMuted: "#4ADE8020",
    error: "#F87171", // Bright red
    errorMuted: "#F8717120",
    warning: "#FBBF24", // Amber
    warningMuted: "#FBBF2420",
    info: "#60A5FA", // Blue
    infoMuted: "#60A5FA20",

    // Borders and dividers - Subtle on dark
    border: "#2A2A2A",
    borderLight: "#353535",
    divider: "#252525",

    // Overlays
    overlay: "#00000080", // 50% black overlay
    shimmer: "#FFFFFF10", // Subtle shimmer effect

    // Shadow colors for dark theme
    shadow: "#00000060",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 24,
    round: 999,
  },

  typography: {
    // Display text
    display: {
      fontSize: 36,
      fontWeight: "700" as const,
      lineHeight: 44,
      letterSpacing: -0.5,
    },
    // Headings
    h1: {
      fontSize: 28,
      fontWeight: "700" as const,
      lineHeight: 36,
      letterSpacing: -0.3,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
      letterSpacing: -0.2,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: "600" as const,
      lineHeight: 24,
    },
    // Body text
    subtitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 15,
      fontWeight: "400" as const,
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 13,
      fontWeight: "400" as const,
      lineHeight: 18,
    },
    captionSmall: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
    // Button text
    button: {
      fontSize: 16,
      fontWeight: "600" as const,
      lineHeight: 24,
      letterSpacing: 0.3,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
    },
  },

  shadows: {
    none: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 3,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
    },
  },

  // Button interaction defaults - prevents weird highlight effects
  buttonDefaults: {
    activeOpacity: 0.7,
    underlayColor: "transparent",
  },

  // Common component styles for consistency
  components: {
    card: {
      backgroundColor: "#1A1A1A",
      borderRadius: 14,
      padding: 16,
    },
    button: {
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
    input: {
      backgroundColor: "#242424",
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: "#2A2A2A",
    },
    badge: {
      borderRadius: 999,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
  },

  // Animation durations
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

export type Theme = typeof theme;
