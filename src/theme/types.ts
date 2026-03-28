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

export type ThemeAvatarSizeProfile = {
  size?: string;
  fontSize?: string;
};

export type ThemeAvatarModeTokens = {
  bg?: string;
  fg?: string;
  border?: string;
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

export type ThemeTagSizeProfile = {
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  minHeight?: string;
  gap?: string;
};

export type ThemeTagSurfaceTokens = {
  bg?: string;
  fg?: string;
  border?: string;
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

export type ThemeEmptyStateModeTokens = {
  bg?: string;
  fg?: string;
  border?: string;
  mutedFg?: string;
  mediaBg?: string;
  mediaBorder?: string;
};

export type ThemeAlertTone = "neutral" | "info" | "success" | "warning" | "danger";
export type ThemeAlertEmphasis = "soft" | "solid" | "outline";
export type ThemeBadgeTone = "neutral" | "info" | "success" | "warning" | "danger";
export type ThemeBadgeVariant = "soft" | "solid" | "outline";

export type ThemeAlertSurfaceTokens = {
  bg?: string;
  border?: string;
  fg?: string;
};

export type ThemeBadgeSizeProfile = {
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  minHeight?: string;
};

export type ThemeBadgeSurfaceTokens = {
  bg?: string;
  border?: string;
  fg?: string;
};

export type ThemeToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ThemeToastSurfaceTokens = {
  bg?: string;
  border?: string;
  fg?: string;
};

export type ThemeNotificationSurfaceTokens = {
  bg?: string;
  border?: string;
  fg?: string;
};

export type ThemeDividerModeTokens = {
  default?: string;
  muted?: string;
  strong?: string;
  labelBg?: string;
  labelFg?: string;
};

export type ThemeSkeletonSizeProfile = {
  height?: string;
};

export type ThemeSkeletonModeTokens = {
  bg?: string;
  highlight?: string;
};

export type ThemeSpinnerSizeProfile = {
  size?: string;
  strokeWidth?: string;
};

export type ThemeSpinnerModeTokens = {
  color?: string;
  track?: string;
};

export type ThemeProgressSizeProfile = {
  height?: string;
};

export type ThemeProgressModeTokens = {
  trackBg?: string;
  labelFg?: string;
  descriptionFg?: string;
  valueFg?: string;
};

export type ThemeProgressToneTokens = {
  fill?: string;
  glow?: string;
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

export type ThemeTabsSizeProfile = {
  minHeight?: string;
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  gap?: string;
};

export type ThemeTabsModeTokens = {
  listBg?: string;
  listBorder?: string;
  tabFg?: string;
  tabMutedFg?: string;
  tabHoverBg?: string;
  tabActiveBg?: string;
  tabActiveFg?: string;
  tabActiveBorder?: string;
  panelBg?: string;
  panelBorder?: string;
  focusRing?: string;
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

export type ThemeTooltipModeTokens = {
  bg?: string;
  fg?: string;
  border?: string;
  shadow?: string;
};

export type ThemeAccordionModeTokens = {
  itemBg?: string;
  itemBorder?: string;
  itemHoverBg?: string;
  itemActiveBg?: string;
  itemFg?: string;
  itemMutedFg?: string;
  itemIndicatorFg?: string;
  panelFg?: string;
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
  avatar?: {
    defaultSize?: string;
    radius?: string;
    fontWeight?: string | number;
    sizes?: Record<string, ThemeAvatarSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeAvatarModeTokens>>;
  };
  text?: {
    defaultVariant?: string;
    variants?: Record<string, ThemeTextVariantProfile>;
    modes?: Partial<Record<ThemeMode, ThemeTextModeTokens>>;
  };
  tag?: {
    defaultVariant?: string;
    defaultSize?: string;
    radius?: string;
    fontWeight?: string | number;
    sizes?: Record<string, ThemeTagSizeProfile>;
    variants?: Partial<Record<ThemeMode, Record<string, ThemeTagSurfaceTokens>>>;
  };
  card?: {
    defaultPadding?: string;
    defaultGap?: string;
    radius?: string;
    modes?: Partial<Record<ThemeMode, ThemeCardModeTokens>>;
  };
  emptyState?: {
    defaultPadding?: string;
    defaultGap?: string;
    defaultActionsGap?: string;
    maxWidth?: string;
    mediaSize?: string;
    radius?: string;
    mediaRadius?: string;
    modes?: Partial<Record<ThemeMode, ThemeEmptyStateModeTokens>>;
  };
  alert?: {
    defaultPadding?: string;
    defaultGap?: string;
    radius?: string;
    tones?: Partial<
      Record<
        ThemeMode,
        Partial<Record<ThemeAlertTone, Partial<Record<ThemeAlertEmphasis, ThemeAlertSurfaceTokens>>>>
      >
    >;
  };
  badge?: {
    defaultSize?: string;
    radius?: string;
    fontWeight?: string | number;
    sizes?: Record<string, ThemeBadgeSizeProfile>;
    tones?: Partial<
      Record<
        ThemeMode,
        Partial<Record<ThemeBadgeTone, Partial<Record<ThemeBadgeVariant, ThemeBadgeSurfaceTokens>>>>
      >
    >;
  };
  toast?: {
    defaultPadding?: string;
    defaultGap?: string;
    defaultInset?: string;
    defaultDuration?: number;
    defaultPlacement?: ThemeToastPlacement;
    radius?: string;
    maxWidth?: string;
    shadow?: string;
    tones?: Partial<
      Record<
        ThemeMode,
        Partial<Record<ThemeAlertTone, Partial<Record<ThemeAlertEmphasis, ThemeToastSurfaceTokens>>>>
      >
    >;
  };
  notification?: {
    defaultPadding?: string;
    defaultGap?: string;
    radius?: string;
    shadow?: string;
    tones?: Partial<
      Record<
        ThemeMode,
        Partial<
          Record<
            ThemeAlertTone,
            Partial<Record<ThemeAlertEmphasis, ThemeNotificationSurfaceTokens>>
          >
        >
      >
    >;
  };
  divider?: {
    defaultSpacing?: string;
    defaultInset?: string;
    modes?: Partial<Record<ThemeMode, ThemeDividerModeTokens>>;
  };
  skeleton?: {
    defaultSize?: string;
    defaultAnimation?: "pulse" | "wave" | "none";
    radius?: string;
    textRadius?: string;
    sizes?: Record<string, ThemeSkeletonSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeSkeletonModeTokens>>;
  };
  spinner?: {
    defaultSize?: string;
    duration?: string;
    defaultLabel?: string;
    sizes?: Record<string, ThemeSpinnerSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeSpinnerModeTokens>>;
  };
  progress?: {
    defaultSize?: string;
    defaultTone?: string;
    radius?: string;
    indeterminateDuration?: string;
    sizes?: Record<string, ThemeProgressSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeProgressModeTokens>>;
    tones?: Record<string, ThemeProgressToneTokens>;
  };
  input?: {
    defaultSize?: string;
    radius?: string;
    sizes?: Record<string, ThemeInputSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeInputModeTokens>>;
  };
  tabs?: {
    defaultSize?: string;
    radius?: string;
    panelRadius?: string;
    gap?: string;
    sizes?: Record<string, ThemeTabsSizeProfile>;
    modes?: Partial<Record<ThemeMode, ThemeTabsModeTokens>>;
  };
  checkbox?: {
    radius?: string;
    boxSize?: string;
    gap?: string;
    offsetY?: string;
    modes?: Partial<Record<ThemeMode, ThemeCheckboxModeTokens>>;
  };
  tooltip?: {
    radius?: string;
    maxWidth?: string;
    offset?: string;
    paddingX?: string;
    paddingY?: string;
    modes?: Partial<Record<ThemeMode, ThemeTooltipModeTokens>>;
  };
  accordion?: {
    defaultGap?: string;
    defaultItemGap?: string;
    defaultPanelPadding?: string;
    radius?: string;
    modes?: Partial<Record<ThemeMode, ThemeAccordionModeTokens>>;
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
