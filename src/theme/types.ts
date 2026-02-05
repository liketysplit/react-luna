export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ThemeColors = {
  scale: Record<string, ColorScale>;
  custom: Record<string, string>;
};

export type ThemeModeTokens = {
  background: string;
  foreground: string;
  surface: string;
  border: string;
  muted: string;
};

export type ThemeModes = {
  light: ThemeModeTokens;
  dark: ThemeModeTokens;
};

export type ThemeTypography = {
  fontFamily: string;
  sizes: Record<string, string>;
  weights: Record<string, number>;
  lineHeights: Record<string, string>;
};

export type ThemeSpacing = Record<string, string>;
export type ThemeRadii = Record<string, string>;
export type ThemeShadows = Record<string, string>;
export type ThemeMotion = Record<string, string>;

export type ThemeComponents = {
  button?: {
    radius?: string;
    paddingX?: string;
    paddingY?: string;
    fontSize?: string;
    fontWeight?: number;
    colors?: Record<string, { bg?: string; fg?: string; border?: string }>;
  };
};

export type Theme = {
  colors: ThemeColors;
  modes: ThemeModes;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  motion: ThemeMotion;
  components: ThemeComponents;
};

export type ThemeMode = "light" | "dark";

type Primitive = string | number | boolean | null | undefined;
export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : { [K in keyof T]?: DeepPartial<T[K]> };
