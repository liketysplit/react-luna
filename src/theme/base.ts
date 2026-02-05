import type { Theme } from "./types";

export const lunarTheme: Theme = {
  colors: {
    scale: {
      primary: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81"
      },
      neutral: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1f2937",
        900: "#0f172a"
      },
      accent: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95"
      },
      success: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b"
      },
      warning: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12"
      },
      danger: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d"
      }
    },
    custom: {}
  },
  modes: {
    light: {
      background: "neutral.50",
      foreground: "neutral.900",
      surface: "neutral.100",
      border: "neutral.200",
      muted: "neutral.500"
    },
    dark: {
      background: "neutral.900",
      foreground: "neutral.50",
      surface: "neutral.800",
      border: "neutral.700",
      muted: "neutral.400"
    }
  },
  typography: {
    fontFamily: "\"Work Sans\", system-ui, sans-serif",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem"
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: "1.1",
      normal: "1.4",
      relaxed: "1.6"
    }
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem"
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "999px"
  },
  shadows: {
    sm: "0 2px 8px rgba(15, 23, 42, 0.12)",
    md: "0 8px 24px rgba(15, 23, 42, 0.18)",
    lg: "0 16px 40px rgba(15, 23, 42, 0.22)"
  },
  motion: {
    fast: "120ms",
    base: "180ms",
    slow: "260ms"
  },
  components: {
    button: {
      radius: "md",
      paddingX: "4",
      paddingY: "2",
      fontSize: "sm",
      fontWeight: 600,
      colors: {
        primary: {
          bg: "primary.600",
          fg: "#ffffff"
        }
      }
    }
  }
};
