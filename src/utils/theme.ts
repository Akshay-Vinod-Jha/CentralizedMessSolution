// Theme configuration for clean, modern, student-friendly UI
export const theme = {
  colors: {
    // Primary colors - soft and welcoming
    primary: "#5B9BD5", // Soft blue - trustworthy and calm
    primaryDark: "#4A7DB0",
    primaryLight: "#A3C9E8",

    // Secondary colors
    secondary: "#F4A261", // Warm orange - friendly and energetic
    secondaryLight: "#F9C694",

    // Accent colors
    accent: "#2A9D8F", // Teal - fresh and modern
    accentLight: "#6FBDB0",

    // Neutral colors
    background: "#F8F9FA", // Very light gray - clean
    surface: "#FFFFFF", // Pure white
    card: "#FFFFFF",

    // Text colors
    text: "#2D3436", // Dark gray - readable
    textSecondary: "#636E72", // Medium gray
    textLight: "#B2BEC3", // Light gray

    // Status colors
    success: "#6BCF7F", // Soft green
    error: "#E74C3C", // Soft red
    warning: "#F39C12", // Orange
    info: "#3498DB", // Blue

    // Border and divider
    border: "#DFE6E9",
    divider: "#EEF2F5",

    // Shadow
    shadow: "#00000015",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },

  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "500" as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
  },

  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
