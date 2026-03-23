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

export type ThemeButtonSizeProfile = {
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  minHeight?: string;
  gap?: string;
  iconSize?: string;
};

export type ThemeButtonModeTokens = {
  bg?: string;
  fg?: string;
  hoverBg?: string;
  outlineFg?: string;
  outlineBorder?: string;
  outlineHoverBg?: string;
  flatFg?: string;
  infoFg?: string;
  infoHoverFg?: string;
};

export type ThemeTextVariantProfile = {
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
};

export type ThemeTextModeTokens = {
  fg?: string;
  mutedFg?: string;
  surfaceBg?: string;
  surfaceBorder?: string;
};

export type ThemeCardModeTokens = {
  bg?: string;
  fg?: string;
  border?: string;
  shadow?: string;
  elevatedShadow?: string;
  hoverBorder?: string;
  hoverShadow?: string;
};

export type ThemeDividerModeTokens = {
  default?: string;
  muted?: string;
  strong?: string;
  labelBg?: string;
  labelFg?: string;
};

export type ThemeInputSizeProfile = {
  minHeight?: string;
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  gap?: string;
};

export type ThemeInputModeTokens = {
  bg?: string;
  fg?: string;
  border?: string;
  hoverBorder?: string;
  focusBorder?: string;
  focusRing?: string;
  placeholder?: string;
  disabledBg?: string;
  disabledFg?: string;
  disabledBorder?: string;
  errorBorder?: string;
  errorFocusRing?: string;
  helpFg?: string;
  errorFg?: string;
  labelFg?: string;
};

export type ThemeCheckboxModeTokens = {
  bg?: string;
  border?: string;
  hoverBorder?: string;
  checkedBg?: string;
  checkedBorder?: string;
  checkFg?: string;
  focusBorder?: string;
  focusRing?: string;
  disabledBg?: string;
  disabledBorder?: string;
  disabledFg?: string;
  errorBorder?: string;
  helpFg?: string;
  errorFg?: string;
  labelFg?: string;
  descriptionFg?: string;
  disabledLabelFg?: string;
};

export type ThemeComponents = {
  button?: {
    defaultSize?: string;
    defaultIconDirection?: "left" | "right";
    radius?: string;
    fontWeight?: number;
    sizes?: Record<string, ThemeButtonSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeButtonModeTokens>>;
    colors?: Record<string, { bg?: string; fg?: string; border?: string }>;
  };
  text?: {
    defaultVariant?: string;
    variants?: Record<string, ThemeTextVariantProfile>;
    modes?: Partial<Record<ThemeMode, ThemeTextModeTokens>>;
  };
  card?: {
    defaultPadding?: string;
    defaultGap?: string;
    radius?: string;
    modes?: Partial<Record<ThemeMode, ThemeCardModeTokens>>;
  };
  divider?: {
    defaultSpacing?: string;
    defaultInset?: string;
    modes?: Partial<Record<ThemeMode, ThemeDividerModeTokens>>;
  };
  input?: {
    defaultSize?: string;
    radius?: string;
    sizes?: Record<string, ThemeInputSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeInputModeTokens>>;
  };
  checkbox?: {
    radius?: string;
    boxSize?: string;
    gap?: string;
    offsetY?: string;
    modes?: Partial<Record<ThemeMode, ThemeCheckboxModeTokens>>;
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
