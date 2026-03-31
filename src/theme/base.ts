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
      defaultSize: "medium",
      defaultIconDirection: "right",
      radius: "md",
      fontWeight: 600,
      modes: {
        light: {
          bg: "primary.600",
          fg: "#ffffff",
          hoverBg: "primary.700",
          outlineFg: "#ffffff",
          outlineBorder: "neutral.300",
          outlineHoverBg: "neutral.100",
          flatFg: "neutral.900",
          infoFg: "primary.500",
          infoHoverFg: "primary.600"
        },
        dark: {
          bg: "primary.400",
          fg: "#ffffff",
          hoverBg: "primary.300",
          outlineFg: "neutral.50",
          outlineBorder: "neutral.500",
          outlineHoverBg: "neutral.700",
          flatFg: "neutral.50",
          infoFg: "primary.200",
          infoHoverFg: "primary.100"
        }
      },
      sizes: {
        "x-small": {
          paddingX: "2",
          paddingY: "1",
          fontSize: "xs",
          minHeight: "1.75rem",
          gap: "1",
          iconSize: "0.875rem"
        },
        small: {
          paddingX: "3",
          paddingY: "1",
          fontSize: "xs",
          minHeight: "2rem",
          gap: "1",
          iconSize: "0.875rem"
        },
        medium: {
          paddingX: "4",
          paddingY: "2",
          fontSize: "sm",
          minHeight: "2.5rem",
          gap: "2",
          iconSize: "1rem"
        },
        large: {
          paddingX: "5",
          paddingY: "2",
          fontSize: "md",
          minHeight: "3rem",
          gap: "2",
          iconSize: "1.125rem"
        },
        "x-large": {
          paddingX: "6",
          paddingY: "3",
          fontSize: "lg",
          minHeight: "3.5rem",
          gap: "3",
          iconSize: "1.25rem"
        }
      },
      colors: {
        primary: {
          bg: "primary.600",
          fg: "#ffffff"
        }
      }
    },
    avatar: {
      defaultSize: "medium",
      radius: "pill",
      fontWeight: 600,
      modes: {
        light: {
          bg: "neutral.100",
          fg: "neutral.700",
          border: "neutral.200"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.100",
          border: "neutral.700"
        }
      },
      sizes: {
        "x-small": {
          size: "1.5rem",
          fontSize: "0.625rem"
        },
        small: {
          size: "2rem",
          fontSize: "0.75rem"
        },
        medium: {
          size: "2.5rem",
          fontSize: "0.875rem"
        },
        large: {
          size: "3rem",
          fontSize: "1rem"
        },
        "x-large": {
          size: "3.5rem",
          fontSize: "1.125rem"
        }
      }
    },
    text: {
      defaultVariant: "body",
      modes: {
        light: {
          fg: "neutral.900",
          mutedFg: "neutral.500",
          surfaceBg: "neutral.100",
          surfaceBorder: "neutral.200"
        },
        dark: {
          fg: "neutral.50",
          mutedFg: "neutral.400",
          surfaceBg: "neutral.800",
          surfaceBorder: "neutral.700"
        }
      },
      variants: {
        body: {
          fontSize: "md",
          fontWeight: "regular",
          lineHeight: "relaxed"
        },
        "body-small": {
          fontSize: "sm",
          fontWeight: "regular",
          lineHeight: "relaxed"
        },
        caption: {
          fontSize: "xs",
          fontWeight: "medium",
          lineHeight: "normal",
          letterSpacing: "0.01em"
        },
        label: {
          fontSize: "sm",
          fontWeight: "semibold",
          lineHeight: "normal",
          letterSpacing: "0.01em"
        },
        title: {
          fontSize: "xl",
          fontWeight: "semibold",
          lineHeight: "tight"
        },
        display: {
          fontSize: "xxl",
          fontWeight: "bold",
          lineHeight: "tight",
          letterSpacing: "-0.02em"
        }
      }
    },
    tag: {
      defaultVariant: "neutral",
      defaultSize: "medium",
      radius: "md",
      fontWeight: "medium",
      sizes: {
        small: {
          paddingX: "2",
          paddingY: "1",
          fontSize: "xs",
          minHeight: "1.25rem",
          gap: "1"
        },
        medium: {
          paddingX: "3",
          paddingY: "1",
          fontSize: "sm",
          minHeight: "1.5rem",
          gap: "1"
        },
        large: {
          paddingX: "4",
          paddingY: "2",
          fontSize: "sm",
          minHeight: "1.875rem",
          gap: "2"
        }
      },
      variants: {
        light: {
          neutral: {
            bg: "neutral.100",
            fg: "neutral.700",
            border: "neutral.300"
          },
          primary: {
            bg: "primary.100",
            fg: "primary.700",
            border: "primary.200"
          },
          success: {
            bg: "success.100",
            fg: "success.800",
            border: "success.200"
          },
          warning: {
            bg: "warning.100",
            fg: "warning.800",
            border: "warning.200"
          },
          danger: {
            bg: "danger.100",
            fg: "danger.800",
            border: "danger.200"
          }
        },
        dark: {
          neutral: {
            bg: "neutral.800",
            fg: "neutral.100",
            border: "neutral.700"
          },
          primary: {
            bg: "primary.900",
            fg: "primary.100",
            border: "primary.700"
          },
          success: {
            bg: "success.900",
            fg: "success.100",
            border: "success.700"
          },
          warning: {
            bg: "warning.900",
            fg: "warning.100",
            border: "warning.700"
          },
          danger: {
            bg: "danger.900",
            fg: "danger.100",
            border: "danger.700"
          }
        }
      }
    },
    card: {
      defaultPadding: "4",
      defaultGap: "4",
      radius: "lg",
      modes: {
        light: {
          bg: "neutral.50",
          fg: "neutral.900",
          border: "neutral.200",
          shadow: "sm",
          elevatedShadow: "md",
          hoverBorder: "neutral.300",
          hoverShadow: "md"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.700",
          shadow: "sm",
          elevatedShadow: "md",
          hoverBorder: "neutral.500",
          hoverShadow: "md"
        }
      }
    },
    emptyState: {
      defaultPadding: "6",
      defaultGap: "4",
      defaultActionsGap: "3",
      maxWidth: "32rem",
      mediaSize: "5rem",
      radius: "lg",
      mediaRadius: "pill",
      modes: {
        light: {
          bg: "neutral.100",
          fg: "neutral.900",
          border: "neutral.200",
          mutedFg: "neutral.600",
          mediaBg: "primary.50",
          mediaBorder: "primary.100"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.700",
          mutedFg: "neutral.300",
          mediaBg: "neutral.700",
          mediaBorder: "neutral.600"
        }
      }
    },
    accordion: {
      defaultGap: "3",
      defaultItemGap: "0.375rem",
      defaultPanelPadding: "4",
      radius: "lg",
      modes: {
        light: {
          itemBg: "neutral.50",
          itemBorder: "neutral.200",
          itemHoverBg: "neutral.100",
          itemActiveBg: "primary.50",
          itemFg: "neutral.900",
          itemMutedFg: "neutral.600",
          itemIndicatorFg: "primary.600",
          panelFg: "neutral.800"
        },
        dark: {
          itemBg: "neutral.800",
          itemBorder: "neutral.700",
          itemHoverBg: "neutral.700",
          itemActiveBg: "neutral.700",
          itemFg: "neutral.50",
          itemMutedFg: "neutral.300",
          itemIndicatorFg: "primary.300",
          panelFg: "neutral.100"
        }
      }
    },
    alert: {
      defaultPadding: "4",
      defaultGap: "3",
      radius: "lg",
      tones: {
        light: {
          neutral: {
            soft: {
              bg: "neutral.100",
              border: "neutral.300",
              fg: "neutral.900"
            },
            solid: {
              bg: "neutral.800",
              border: "neutral.800",
              fg: "neutral.50"
            },
            outline: {
              bg: "neutral.50",
              border: "neutral.300",
              fg: "neutral.900"
            }
          },
          info: {
            soft: {
              bg: "primary.50",
              border: "primary.200",
              fg: "primary.800"
            },
            solid: {
              bg: "primary.600",
              border: "primary.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "primary.300",
              fg: "primary.800"
            }
          },
          success: {
            soft: {
              bg: "success.50",
              border: "success.200",
              fg: "success.800"
            },
            solid: {
              bg: "success.600",
              border: "success.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "success.300",
              fg: "success.800"
            }
          },
          warning: {
            soft: {
              bg: "warning.50",
              border: "warning.200",
              fg: "warning.900"
            },
            solid: {
              bg: "warning.600",
              border: "warning.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "warning.300",
              fg: "warning.900"
            }
          },
          danger: {
            soft: {
              bg: "danger.50",
              border: "danger.200",
              fg: "danger.800"
            },
            solid: {
              bg: "danger.600",
              border: "danger.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "danger.300",
              fg: "danger.800"
            }
          }
        },
        dark: {
          neutral: {
            soft: {
              bg: "neutral.800",
              border: "neutral.600",
              fg: "neutral.50"
            },
            solid: {
              bg: "neutral.200",
              border: "neutral.200",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "neutral.600",
              fg: "neutral.50"
            }
          },
          info: {
            soft: {
              bg: "primary.900",
              border: "primary.700",
              fg: "primary.100"
            },
            solid: {
              bg: "primary.400",
              border: "primary.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "primary.500",
              fg: "primary.100"
            }
          },
          success: {
            soft: {
              bg: "success.900",
              border: "success.700",
              fg: "success.100"
            },
            solid: {
              bg: "success.400",
              border: "success.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "success.500",
              fg: "success.100"
            }
          },
          warning: {
            soft: {
              bg: "warning.900",
              border: "warning.700",
              fg: "warning.100"
            },
            solid: {
              bg: "warning.400",
              border: "warning.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "warning.500",
              fg: "warning.100"
            }
          },
          danger: {
            soft: {
              bg: "danger.900",
              border: "danger.700",
              fg: "danger.100"
            },
            solid: {
              bg: "danger.400",
              border: "danger.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "danger.500",
              fg: "danger.100"
            }
          }
        }
      }
    },
    badge: {
      defaultSize: "medium",
      radius: "md",
      fontWeight: "semibold",
      sizes: {
        small: {
          paddingX: "2",
          paddingY: "1",
          fontSize: "xs",
          minHeight: "1.25rem"
        },
        medium: {
          paddingX: "3",
          paddingY: "1",
          fontSize: "sm",
          minHeight: "1.5rem"
        },
        large: {
          paddingX: "4",
          paddingY: "2",
          fontSize: "sm",
          minHeight: "1.875rem"
        }
      },
      tones: {
        light: {
          neutral: {
            soft: {
              bg: "neutral.100",
              border: "neutral.200",
              fg: "neutral.700"
            },
            solid: {
              bg: "neutral.800",
              border: "neutral.800",
              fg: "neutral.50"
            },
            outline: {
              bg: "neutral.50",
              border: "neutral.300",
              fg: "neutral.800"
            }
          },
          info: {
            soft: {
              bg: "primary.50",
              border: "primary.200",
              fg: "primary.700"
            },
            solid: {
              bg: "primary.600",
              border: "primary.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "primary.300",
              fg: "primary.700"
            }
          },
          success: {
            soft: {
              bg: "success.50",
              border: "success.200",
              fg: "success.700"
            },
            solid: {
              bg: "success.600",
              border: "success.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "success.300",
              fg: "success.700"
            }
          },
          warning: {
            soft: {
              bg: "warning.50",
              border: "warning.200",
              fg: "warning.800"
            },
            solid: {
              bg: "warning.600",
              border: "warning.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "warning.300",
              fg: "warning.800"
            }
          },
          danger: {
            soft: {
              bg: "danger.50",
              border: "danger.200",
              fg: "danger.700"
            },
            solid: {
              bg: "danger.600",
              border: "danger.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "danger.300",
              fg: "danger.700"
            }
          }
        },
        dark: {
          neutral: {
            soft: {
              bg: "neutral.800",
              border: "neutral.700",
              fg: "neutral.100"
            },
            solid: {
              bg: "neutral.50",
              border: "neutral.50",
              fg: "neutral.900"
            },
            outline: {
              bg: "neutral.900",
              border: "neutral.600",
              fg: "neutral.100"
            }
          },
          info: {
            soft: {
              bg: "primary.900",
              border: "primary.700",
              fg: "primary.100"
            },
            solid: {
              bg: "primary.300",
              border: "primary.300",
              fg: "neutral.900"
            },
            outline: {
              bg: "neutral.900",
              border: "primary.500",
              fg: "primary.100"
            }
          },
          success: {
            soft: {
              bg: "success.900",
              border: "success.700",
              fg: "success.100"
            },
            solid: {
              bg: "success.300",
              border: "success.300",
              fg: "neutral.900"
            },
            outline: {
              bg: "neutral.900",
              border: "success.500",
              fg: "success.100"
            }
          },
          warning: {
            soft: {
              bg: "warning.900",
              border: "warning.700",
              fg: "warning.100"
            },
            solid: {
              bg: "warning.300",
              border: "warning.300",
              fg: "neutral.900"
            },
            outline: {
              bg: "neutral.900",
              border: "warning.500",
              fg: "warning.100"
            }
          },
          danger: {
            soft: {
              bg: "danger.900",
              border: "danger.700",
              fg: "danger.100"
            },
            solid: {
              bg: "danger.300",
              border: "danger.300",
              fg: "neutral.900"
            },
            outline: {
              bg: "neutral.900",
              border: "danger.500",
              fg: "danger.100"
            }
          }
        }
      }
    },
    toast: {
      defaultPadding: "4",
      defaultGap: "3",
      defaultInset: "4",
      defaultDuration: 5000,
      defaultPlacement: "bottom-right",
      radius: "lg",
      maxWidth: "24rem",
      shadow: "md",
      tones: {
        light: {
          neutral: {
            soft: {
              bg: "neutral.50",
              border: "neutral.200",
              fg: "neutral.900"
            },
            solid: {
              bg: "neutral.800",
              border: "neutral.800",
              fg: "neutral.50"
            },
            outline: {
              bg: "neutral.50",
              border: "neutral.300",
              fg: "neutral.900"
            }
          },
          info: {
            soft: {
              bg: "primary.50",
              border: "primary.200",
              fg: "primary.800"
            },
            solid: {
              bg: "primary.600",
              border: "primary.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "primary.300",
              fg: "primary.800"
            }
          },
          success: {
            soft: {
              bg: "success.50",
              border: "success.200",
              fg: "success.800"
            },
            solid: {
              bg: "success.600",
              border: "success.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "success.300",
              fg: "success.800"
            }
          },
          warning: {
            soft: {
              bg: "warning.50",
              border: "warning.200",
              fg: "warning.900"
            },
            solid: {
              bg: "warning.600",
              border: "warning.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "warning.300",
              fg: "warning.900"
            }
          },
          danger: {
            soft: {
              bg: "danger.50",
              border: "danger.200",
              fg: "danger.800"
            },
            solid: {
              bg: "danger.600",
              border: "danger.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "danger.300",
              fg: "danger.800"
            }
          }
        },
        dark: {
          neutral: {
            soft: {
              bg: "neutral.800",
              border: "neutral.600",
              fg: "neutral.50"
            },
            solid: {
              bg: "neutral.200",
              border: "neutral.200",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "neutral.600",
              fg: "neutral.50"
            }
          },
          info: {
            soft: {
              bg: "primary.900",
              border: "primary.700",
              fg: "primary.100"
            },
            solid: {
              bg: "primary.400",
              border: "primary.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "primary.500",
              fg: "primary.100"
            }
          },
          success: {
            soft: {
              bg: "success.900",
              border: "success.700",
              fg: "success.100"
            },
            solid: {
              bg: "success.400",
              border: "success.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "success.500",
              fg: "success.100"
            }
          },
          warning: {
            soft: {
              bg: "warning.900",
              border: "warning.700",
              fg: "warning.100"
            },
            solid: {
              bg: "warning.400",
              border: "warning.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "warning.500",
              fg: "warning.100"
            }
          },
          danger: {
            soft: {
              bg: "danger.900",
              border: "danger.700",
              fg: "danger.100"
            },
            solid: {
              bg: "danger.400",
              border: "danger.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "danger.500",
              fg: "danger.100"
            }
          }
        }
      }
    },
    notification: {
      defaultPadding: "4",
      defaultGap: "3",
      radius: "lg",
      shadow: "sm",
      tones: {
        light: {
          neutral: {
            soft: {
              bg: "neutral.50",
              border: "neutral.200",
              fg: "neutral.900"
            },
            solid: {
              bg: "neutral.800",
              border: "neutral.800",
              fg: "neutral.50"
            },
            outline: {
              bg: "neutral.50",
              border: "neutral.300",
              fg: "neutral.900"
            }
          },
          info: {
            soft: {
              bg: "primary.50",
              border: "primary.200",
              fg: "primary.800"
            },
            solid: {
              bg: "primary.600",
              border: "primary.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "primary.300",
              fg: "primary.800"
            }
          },
          success: {
            soft: {
              bg: "success.50",
              border: "success.200",
              fg: "success.800"
            },
            solid: {
              bg: "success.600",
              border: "success.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "success.300",
              fg: "success.800"
            }
          },
          warning: {
            soft: {
              bg: "warning.50",
              border: "warning.200",
              fg: "warning.900"
            },
            solid: {
              bg: "warning.600",
              border: "warning.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "warning.300",
              fg: "warning.900"
            }
          },
          danger: {
            soft: {
              bg: "danger.50",
              border: "danger.200",
              fg: "danger.800"
            },
            solid: {
              bg: "danger.600",
              border: "danger.600",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.50",
              border: "danger.300",
              fg: "danger.800"
            }
          }
        },
        dark: {
          neutral: {
            soft: {
              bg: "neutral.800",
              border: "neutral.600",
              fg: "neutral.50"
            },
            solid: {
              bg: "neutral.200",
              border: "neutral.200",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "neutral.600",
              fg: "neutral.50"
            }
          },
          info: {
            soft: {
              bg: "primary.900",
              border: "primary.700",
              fg: "primary.100"
            },
            solid: {
              bg: "primary.400",
              border: "primary.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "primary.500",
              fg: "primary.100"
            }
          },
          success: {
            soft: {
              bg: "success.900",
              border: "success.700",
              fg: "success.100"
            },
            solid: {
              bg: "success.400",
              border: "success.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "success.500",
              fg: "success.100"
            }
          },
          warning: {
            soft: {
              bg: "warning.900",
              border: "warning.700",
              fg: "warning.100"
            },
            solid: {
              bg: "warning.400",
              border: "warning.400",
              fg: "#0b1220"
            },
            outline: {
              bg: "neutral.900",
              border: "warning.500",
              fg: "warning.100"
            }
          },
          danger: {
            soft: {
              bg: "danger.900",
              border: "danger.700",
              fg: "danger.100"
            },
            solid: {
              bg: "danger.400",
              border: "danger.400",
              fg: "#ffffff"
            },
            outline: {
              bg: "neutral.900",
              border: "danger.500",
              fg: "danger.100"
            }
          }
        }
      }
    },
    tabs: {
      defaultSize: "medium",
      radius: "pill",
      panelRadius: "lg",
      gap: "4",
      sizes: {
        small: {
          minHeight: "2rem",
          paddingX: "3",
          paddingY: "1",
          fontSize: "xs",
          gap: "1"
        },
        medium: {
          minHeight: "2.5rem",
          paddingX: "4",
          paddingY: "2",
          fontSize: "sm",
          gap: "2"
        },
        large: {
          minHeight: "3rem",
          paddingX: "5",
          paddingY: "2",
          fontSize: "md",
          gap: "2"
        }
      },
      modes: {
        light: {
          listBg: "neutral.100",
          listBorder: "neutral.200",
          tabFg: "neutral.700",
          tabMutedFg: "neutral.400",
          tabHoverBg: "neutral.50",
          tabActiveBg: "neutral.50",
          tabActiveFg: "neutral.900",
          tabActiveBorder: "primary.300",
          panelBg: "neutral.50",
          panelBorder: "neutral.200",
          focusRing: "rgba(99, 102, 241, 0.18)"
        },
        dark: {
          listBg: "neutral.800",
          listBorder: "neutral.700",
          tabFg: "neutral.100",
          tabMutedFg: "neutral.500",
          tabHoverBg: "neutral.700",
          tabActiveBg: "neutral.900",
          tabActiveFg: "neutral.50",
          tabActiveBorder: "primary.500",
          panelBg: "neutral.900",
          panelBorder: "neutral.700",
          focusRing: "rgba(129, 140, 248, 0.24)"
        }
      }
    },
    notificationGroup: {
      defaultControlRailWidth: "7.5%"
    },
    drawer: {
      defaultPadding: "5",
      defaultGap: "4",
      defaultInset: "4",
      defaultSize: "28rem",
      defaultPlacement: "right",
      radius: "lg",
      shadow: "lg",
      modes: {
        light: {
          bg: "neutral.50",
          fg: "neutral.900",
          border: "neutral.200",
          backdrop: "rgba(15, 23, 42, 0.52)"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.700",
          backdrop: "rgba(2, 6, 23, 0.72)"
        }
      }
    },
    breadcrumb: {
      defaultSize: "md",
      radius: "sm",
      sizes: {
        sm: {
          gap: "1",
          separatorGap: "1",
          fontSize: "xs",
          minHeight: "6",
          paddingX: "1",
          paddingY: "0"
        },
        md: {
          gap: "2",
          separatorGap: "2",
          fontSize: "sm",
          minHeight: "8",
          paddingX: "2",
          paddingY: "0"
        },
        lg: {
          gap: "2",
          separatorGap: "2",
          fontSize: "md",
          minHeight: "10",
          paddingX: "2",
          paddingY: "0"
        }
      },
      modes: {
        light: {
          linkFg: "neutral.700",
          currentFg: "neutral.900",
          mutedFg: "neutral.500",
          separatorFg: "neutral.400",
          hoverBg: "neutral.100",
          focusRing: "rgba(99, 102, 241, 0.18)"
        },
        dark: {
          linkFg: "neutral.200",
          currentFg: "neutral.50",
          mutedFg: "neutral.400",
          separatorFg: "neutral.500",
          hoverBg: "neutral.800",
          focusRing: "rgba(129, 140, 248, 0.24)"
        }
      }
    },
    modal: {
      defaultSize: "medium",
      defaultPadding: "5",
      defaultGap: "4",
      defaultInset: "4",
      radius: "lg",
      sizes: {
        small: {
          maxWidth: "28rem"
        },
        medium: {
          maxWidth: "36rem"
        },
        large: {
          maxWidth: "48rem"
        },
        full: {
          maxWidth: "100%"
        }
      },
      modes: {
        light: {
          bg: "neutral.50",
          fg: "neutral.900",
          border: "neutral.200",
          backdrop: "rgb(15 23 42 / 0.58)",
          shadow: "lg"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.600",
          backdrop: "rgb(2 6 23 / 0.74)",
          shadow: "lg"
        }
      }
    },
    divider: {
      defaultSpacing: "4",
      defaultInset: "4",
      modes: {
        light: {
          default: "neutral.200",
          muted: "neutral.100",
          strong: "neutral.400",
          labelBg: "neutral.50",
          labelFg: "neutral.500"
        },
        dark: {
          default: "neutral.700",
          muted: "neutral.800",
          strong: "neutral.500",
          labelBg: "neutral.900",
          labelFg: "neutral.400"
        }
      }
    },
    skeleton: {
      defaultSize: "medium",
      defaultAnimation: "wave",
      radius: "md",
      textRadius: "pill",
      sizes: {
        "x-small": {
          height: "0.375rem"
        },
        small: {
          height: "0.5rem"
        },
        medium: {
          height: "0.75rem"
        },
        large: {
          height: "1rem"
        },
        "x-large": {
          height: "1.25rem"
        }
      },
      modes: {
        light: {
          bg: "neutral.200",
          highlight: "rgba(255, 255, 255, 0.55)"
        },
        dark: {
          bg: "neutral.700",
          highlight: "rgba(248, 250, 252, 0.16)"
        }
      }
    },
    spinner: {
      defaultSize: "medium",
      duration: "900ms",
      defaultLabel: "Loading",
      sizes: {
        "x-small": {
          size: "3",
          strokeWidth: "0.125rem"
        },
        small: {
          size: "4",
          strokeWidth: "0.125rem"
        },
        medium: {
          size: "5",
          strokeWidth: "0.1875rem"
        },
        large: {
          size: "6",
          strokeWidth: "0.1875rem"
        },
        "x-large": {
          size: "8",
          strokeWidth: "0.25rem"
        }
      },
      modes: {
        light: {
          color: "primary.600",
          track: "rgba(148, 163, 184, 0.24)"
        },
        dark: {
          color: "primary.300",
          track: "rgba(226, 232, 240, 0.22)"
        }
      }
    },
    progress: {
      defaultSize: "medium",
      defaultTone: "primary",
      radius: "pill",
      indeterminateDuration: "1.4s",
      sizes: {
        "x-small": {
          height: "0.25rem"
        },
        small: {
          height: "0.375rem"
        },
        medium: {
          height: "0.5rem"
        },
        large: {
          height: "0.75rem"
        },
        "x-large": {
          height: "1rem"
        }
      },
      modes: {
        light: {
          trackBg: "neutral.200",
          labelFg: "neutral.800",
          descriptionFg: "neutral.500",
          valueFg: "neutral.600"
        },
        dark: {
          trackBg: "neutral.700",
          labelFg: "neutral.100",
          descriptionFg: "neutral.400",
          valueFg: "neutral.300"
        }
      },
      tones: {
        primary: {
          fill: "primary.600",
          glow: "rgba(99, 102, 241, 0.32)"
        },
        success: {
          fill: "success.500",
          glow: "rgba(16, 185, 129, 0.28)"
        },
        warning: {
          fill: "warning.500",
          glow: "rgba(249, 115, 22, 0.28)"
        },
        danger: {
          fill: "danger.500",
          glow: "rgba(239, 68, 68, 0.28)"
        },
        neutral: {
          fill: "neutral.500",
          glow: "rgba(100, 116, 139, 0.28)"
        }
      }
    },
    input: {
      defaultSize: "md",
      radius: "md",
        sizes: {
          sm: {
            minHeight: "2rem",
            paddingX: "2",
            paddingY: "1",
            fontSize: "xs",
            gap: "1"
          },
          md: {
            minHeight: "2.5rem",
            paddingX: "4",
            paddingY: "2",
            fontSize: "sm",
            gap: "2"
          },
          lg: {
            minHeight: "3rem",
            paddingX: "5",
            paddingY: "2",
            fontSize: "md",
            gap: "2"
          }
        },
      modes: {
        light: {
          bg: "neutral.50",
          fg: "neutral.900",
          border: "neutral.300",
          hoverBorder: "neutral.400",
          focusBorder: "primary.500",
          focusRing: "rgba(99, 102, 241, 0.18)",
          placeholder: "neutral.400",
          disabledBg: "neutral.100",
          disabledFg: "neutral.500",
          disabledBorder: "neutral.200",
          errorBorder: "danger.500",
          errorFocusRing: "rgba(239, 68, 68, 0.18)",
          helpFg: "neutral.500",
          errorFg: "danger.600",
          labelFg: "neutral.800"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.600",
          hoverBorder: "neutral.500",
          focusBorder: "primary.300",
          focusRing: "rgba(129, 140, 248, 0.22)",
          placeholder: "neutral.500",
          disabledBg: "neutral.900",
          disabledFg: "neutral.500",
          disabledBorder: "neutral.700",
          errorBorder: "danger.400",
          errorFocusRing: "rgba(248, 113, 113, 0.2)",
          helpFg: "neutral.400",
          errorFg: "danger.300",
          labelFg: "neutral.100"
        }
      }
    },
    checkbox: {
      radius: "sm",
      boxSize: "1.125rem",
      gap: "2",
      offsetY: "0.125rem",
      modes: {
        light: {
          bg: "neutral.50",
          border: "neutral.300",
          hoverBorder: "neutral.400",
          checkedBg: "primary.600",
          checkedBorder: "primary.600",
          checkFg: "#ffffff",
          focusBorder: "primary.500",
          focusRing: "rgba(99, 102, 241, 0.18)",
          disabledBg: "neutral.100",
          disabledBorder: "neutral.200",
          disabledFg: "neutral.500",
          errorBorder: "danger.500",
          helpFg: "neutral.500",
          errorFg: "danger.600",
          labelFg: "neutral.900",
          descriptionFg: "neutral.500",
          disabledLabelFg: "neutral.500"
        },
        dark: {
          bg: "neutral.800",
          border: "neutral.600",
          hoverBorder: "neutral.500",
          checkedBg: "primary.400",
          checkedBorder: "primary.400",
          checkFg: "#ffffff",
          focusBorder: "primary.300",
          focusRing: "rgba(129, 140, 248, 0.22)",
          disabledBg: "neutral.900",
          disabledBorder: "neutral.700",
          disabledFg: "neutral.500",
          errorBorder: "danger.400",
          helpFg: "neutral.400",
          errorFg: "danger.300",
          labelFg: "neutral.50",
          descriptionFg: "neutral.400",
          disabledLabelFg: "neutral.500"
        }
      }
    },
    tooltip: {
      radius: "md",
      maxWidth: "18rem",
      offset: "2",
      paddingX: "3",
      paddingY: "2",
      modes: {
        light: {
          bg: "neutral.900",
          fg: "neutral.50",
          border: "neutral.700",
          shadow: "md"
        },
        dark: {
          bg: "neutral.100",
          fg: "neutral.900",
          border: "neutral.300",
          shadow: "md"
        }
      }
    },
    popover: {
      radius: "lg",
      minWidth: "14rem",
      maxWidth: "20rem",
      offset: "3",
      padding: "4",
      arrowSize: "3",
      arrowInset: "4",
      modes: {
        light: {
          bg: "neutral.100",
          fg: "neutral.900",
          border: "neutral.200",
          shadow: "lg"
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.700",
          shadow: "lg"
        }
      }
    },
    app: {
      minHeight: "100vh",
      contentMinHeight: "100vh",
      modes: {
        light: {
          bg: "transparent",
          fg: "neutral.900"
        },
        dark: {
          bg: "transparent",
          fg: "neutral.50"
        }
      }
    },
    pane: {
      modes: {
        light: {
          borderColor: "rgba(108, 122, 171, 0.28)"
        },
        dark: {
          borderColor: "rgba(108, 122, 171, 0.28)"
        }
      }
    },
    panel: {
      padding: "4",
      gap: "0.875rem",
      radius: "1.125rem",
      headerGap: "0.35rem",
      titleFontSize: "0.8rem",
      titleLetterSpacing: "0.08em",
      descriptionFontSize: "0.95rem",
      descriptionLineHeight: "1.4",
      modes: {
        light: {
          bg: "rgba(255, 255, 255, 0.9)",
          fg: "neutral.900",
          border: "rgba(108, 122, 171, 0.22)",
          shadow: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          chromeBg: "linear-gradient(180deg, rgba(234, 239, 255, 0.95), rgba(248, 250, 255, 0.95))",
          emphasisBg: "linear-gradient(180deg, rgba(242, 245, 255, 0.98), rgba(255, 255, 255, 0.94))",
          titleFg: "#46537e",
          descriptionFg: "#5b688f"
        },
        dark: {
          bg: "rgba(255, 255, 255, 0.9)",
          fg: "neutral.900",
          border: "rgba(108, 122, 171, 0.22)",
          shadow: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          chromeBg: "linear-gradient(180deg, rgba(234, 239, 255, 0.95), rgba(248, 250, 255, 0.95))",
          emphasisBg: "linear-gradient(180deg, rgba(242, 245, 255, 0.98), rgba(255, 255, 255, 0.94))",
          titleFg: "#46537e",
          descriptionFg: "#5b688f"
        }
      }
    },
    metricCard: {
      padding: "4",
      gap: "4",
      radius: "lg",
      headerGap: "2",
      footerGap: "2",
      labelFontSize: "xs",
      labelLetterSpacing: "0.08em",
      valueFontSize: "xxl",
      valueLineHeight: "tight",
      deltaFontSize: "sm",
      metaFontSize: "sm",
      visualMinWidth: "6rem",
      accentHeight: "0.25rem",
      modes: {
        light: {
          bg: "neutral.50",
          fg: "neutral.900",
          border: "neutral.200",
          shadow: "sm",
          labelFg: "neutral.500",
          valueFg: "neutral.950",
          metaFg: "neutral.500",
          visualBg: "neutral.100",
          trendUpFg: "success.700",
          trendDownFg: "danger.700",
          trendNeutralFg: "neutral.500",
          tones: {
            default: "neutral.300",
            info: "primary.500",
            success: "success.500",
            warning: "warning.500",
            danger: "danger.500"
          }
        },
        dark: {
          bg: "neutral.800",
          fg: "neutral.50",
          border: "neutral.700",
          shadow: "sm",
          labelFg: "neutral.400",
          valueFg: "neutral.50",
          metaFg: "neutral.300",
          visualBg: "neutral.900",
          trendUpFg: "success.300",
          trendDownFg: "danger.300",
          trendNeutralFg: "neutral.300",
          tones: {
            default: "neutral.600",
            info: "primary.300",
            success: "success.300",
            warning: "warning.300",
            danger: "danger.300"
          }
        }
      }
    },
    wireframe: {
      gap: "4",
      padding: "4",
      railMin: "14rem",
      railMax: "18rem",
      narrowMaxWidth: "28rem",
      slotRadius: "1.125rem",
      borderedPadding: "4",
      modes: {
        light: {
          slotBorder: "rgba(108, 122, 171, 0.22)",
          slotBg: "rgba(255, 255, 255, 0.9)",
          slotFg: "neutral.900",
          slotShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          appBarBg: "linear-gradient(180deg, rgba(234, 239, 255, 0.95), rgba(248, 250, 255, 0.95))",
          centerTopBg: "linear-gradient(180deg, rgba(242, 245, 255, 0.98), rgba(255, 255, 255, 0.94))"
        },
        dark: {
          slotBorder: "rgba(108, 122, 171, 0.22)",
          slotBg: "rgba(255, 255, 255, 0.9)",
          slotFg: "neutral.900",
          slotShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          appBarBg: "linear-gradient(180deg, rgba(234, 239, 255, 0.95), rgba(248, 250, 255, 0.95))",
          centerTopBg: "linear-gradient(180deg, rgba(242, 245, 255, 0.98), rgba(255, 255, 255, 0.94))"
        }
      }
    }
  }
};
