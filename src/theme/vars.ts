import type { Theme } from "./types";
import { resolveModeTokens, resolveTokenValue, resolveScaleValue } from "./resolve";

function resolveFontWeightValue(theme: Theme, value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return String(theme.typography.weights[value] ?? value);
}

export function buildThemeVars(theme: Theme, mode: "light" | "dark"): Record<string, string> {
  const vars: Record<string, string> = {};
  const modeTokens = resolveModeTokens(theme, mode);

  vars["--luna-background"] = modeTokens.background;
  vars["--luna-foreground"] = modeTokens.foreground;
  vars["--luna-surface"] = modeTokens.surface;
  vars["--luna-border"] = modeTokens.border;
  vars["--luna-muted"] = modeTokens.muted;

  vars["--luna-font-family"] = theme.typography.fontFamily;

  for (const [name, scale] of Object.entries(theme.colors.scale)) {
    for (const [level, value] of Object.entries(scale)) {
      vars[`--luna-color-${name}-${level}`] = value;
    }
  }

  for (const [name, value] of Object.entries(theme.colors.custom)) {
    vars[`--luna-color-${name}`] = resolveTokenValue(theme, value);
  }

  for (const [name, value] of Object.entries(theme.spacing)) {
    vars[`--luna-space-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.radii)) {
    vars[`--luna-radius-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.shadows)) {
    vars[`--luna-shadow-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.motion)) {
    vars[`--luna-motion-${name}`] = value;
  }

  const button = theme.components.button;
  if (button?.defaultSize) {
    vars["--luna-btn-size-default"] = button.defaultSize;
  }
  if (button?.defaultIconDirection) {
    vars["--luna-btn-icon-direction-default"] = button.defaultIconDirection;
  }
  if (button?.radius) {
    vars["--luna-btn-radius"] = resolveScaleValue(theme.radii, button.radius) ?? button.radius;
  }
  if (button?.fontWeight) {
    vars["--luna-btn-font-weight"] = String(button.fontWeight);
  }
  const buttonMode = button?.modes?.[mode];
  if (buttonMode?.bg) {
    vars["--luna-btn-bg-default"] = resolveTokenValue(theme, buttonMode.bg);
  }
  if (buttonMode?.fg) {
    vars["--luna-btn-fg-default"] = resolveTokenValue(theme, buttonMode.fg);
  }
  if (buttonMode?.hoverBg) {
    vars["--luna-btn-hover-bg"] = resolveTokenValue(theme, buttonMode.hoverBg);
  }
  if (buttonMode?.outlineFg) {
    vars["--luna-btn-outline-fg"] = resolveTokenValue(theme, buttonMode.outlineFg);
  }
  if (buttonMode?.outlineBorder) {
    vars["--luna-btn-outline-border"] = resolveTokenValue(theme, buttonMode.outlineBorder);
  }
  if (buttonMode?.outlineHoverBg) {
    vars["--luna-btn-outline-hover-bg"] = resolveTokenValue(theme, buttonMode.outlineHoverBg);
  }
  if (buttonMode?.flatFg) {
    vars["--luna-btn-flat-fg"] = resolveTokenValue(theme, buttonMode.flatFg);
  }
  if (buttonMode?.infoFg) {
    vars["--luna-btn-info-fg"] = resolveTokenValue(theme, buttonMode.infoFg);
  }
  if (buttonMode?.infoHoverFg) {
    vars["--luna-btn-info-hover-fg"] = resolveTokenValue(theme, buttonMode.infoHoverFg);
  }
  if (button?.sizes) {
    for (const [name, profile] of Object.entries(button.sizes)) {
      if (profile.paddingX) {
        vars[`--luna-btn-size-${name}-padding-x`] =
          resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX;
      }
      if (profile.paddingY) {
        vars[`--luna-btn-size-${name}-padding-y`] =
          resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY;
      }
      if (profile.fontSize) {
        vars[`--luna-btn-size-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.minHeight) {
        vars[`--luna-btn-size-${name}-min-height`] =
          resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight;
      }
      if (profile.gap) {
        vars[`--luna-btn-size-${name}-gap`] =
          resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap;
      }
      if (profile.iconSize) {
        vars[`--luna-btn-size-${name}-icon-size`] =
          resolveScaleValue(theme.typography.sizes, profile.iconSize) ?? profile.iconSize;
      }
    }
  }

  const text = theme.components.text;
  if (text?.defaultVariant) {
    vars["--luna-text-variant-default"] = text.defaultVariant;
  }
  const textMode = text?.modes?.[mode];
  if (textMode?.fg) {
    vars["--luna-text-fg"] = resolveTokenValue(theme, textMode.fg);
  }
  if (textMode?.mutedFg) {
    vars["--luna-text-muted-fg"] = resolveTokenValue(theme, textMode.mutedFg);
  }
  if (textMode?.surfaceBg) {
    vars["--luna-text-surface-bg"] = resolveTokenValue(theme, textMode.surfaceBg);
  }
  if (textMode?.surfaceBorder) {
    vars["--luna-text-surface-border"] = resolveTokenValue(theme, textMode.surfaceBorder);
  }
  if (text?.variants) {
    for (const [name, profile] of Object.entries(text.variants)) {
      if (profile.fontSize) {
        vars[`--luna-text-variant-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.fontWeight !== undefined) {
        vars[`--luna-text-variant-${name}-font-weight`] =
          resolveFontWeightValue(theme, profile.fontWeight) ?? String(profile.fontWeight);
      }
      if (profile.lineHeight) {
        vars[`--luna-text-variant-${name}-line-height`] =
          resolveScaleValue(theme.typography.lineHeights, profile.lineHeight) ?? profile.lineHeight;
      }
      if (profile.letterSpacing) {
        vars[`--luna-text-variant-${name}-letter-spacing`] = profile.letterSpacing;
      }
      if (profile.textTransform) {
        vars[`--luna-text-variant-${name}-text-transform`] = profile.textTransform;
      }
    }
  }

  const card = theme.components.card;
  if (card?.defaultPadding) {
    vars["--luna-card-padding-default"] =
      resolveScaleValue(theme.spacing, card.defaultPadding) ?? card.defaultPadding;
  }
  if (card?.defaultGap) {
    vars["--luna-card-gap-default"] =
      resolveScaleValue(theme.spacing, card.defaultGap) ?? card.defaultGap;
  }
  if (card?.radius) {
    vars["--luna-card-radius"] = resolveScaleValue(theme.radii, card.radius) ?? card.radius;
  }
  const cardMode = card?.modes?.[mode];
  if (cardMode?.bg) {
    vars["--luna-card-bg"] = resolveTokenValue(theme, cardMode.bg);
  }
  if (cardMode?.fg) {
    vars["--luna-card-fg"] = resolveTokenValue(theme, cardMode.fg);
  }
  if (cardMode?.border) {
    vars["--luna-card-border"] = resolveTokenValue(theme, cardMode.border);
  }
  if (cardMode?.shadow) {
    vars["--luna-card-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.shadow) ?? resolveTokenValue(theme, cardMode.shadow);
  }
  if (cardMode?.elevatedShadow) {
    vars["--luna-card-elevated-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.elevatedShadow) ??
      resolveTokenValue(theme, cardMode.elevatedShadow);
  }
  if (cardMode?.hoverBorder) {
    vars["--luna-card-hover-border"] = resolveTokenValue(theme, cardMode.hoverBorder);
  }
  if (cardMode?.hoverShadow) {
    vars["--luna-card-hover-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.hoverShadow) ??
      resolveTokenValue(theme, cardMode.hoverShadow);
  }

  const divider = theme.components.divider;
  if (divider?.defaultSpacing) {
    vars["--luna-divider-spacing-default"] =
      resolveScaleValue(theme.spacing, divider.defaultSpacing) ?? divider.defaultSpacing;
  }
  if (divider?.defaultInset) {
    vars["--luna-divider-inset-default"] =
      resolveScaleValue(theme.spacing, divider.defaultInset) ?? divider.defaultInset;
  }
  const dividerMode = divider?.modes?.[mode];
  if (dividerMode?.default) {
    vars["--luna-divider-default"] = resolveTokenValue(theme, dividerMode.default);
  }
  if (dividerMode?.muted) {
    vars["--luna-divider-muted"] = resolveTokenValue(theme, dividerMode.muted);
  }
  if (dividerMode?.strong) {
    vars["--luna-divider-strong"] = resolveTokenValue(theme, dividerMode.strong);
  }
  if (dividerMode?.labelBg) {
    vars["--luna-divider-label-bg"] = resolveTokenValue(theme, dividerMode.labelBg);
  }
  if (dividerMode?.labelFg) {
    vars["--luna-divider-label-fg"] = resolveTokenValue(theme, dividerMode.labelFg);
  }

  const input = theme.components.input;
  if (input?.defaultSize) {
    vars["--luna-input-size-default"] = input.defaultSize;
  }
  if (input?.radius) {
    vars["--luna-input-radius"] = resolveScaleValue(theme.radii, input.radius) ?? input.radius;
  }
  const inputMode = input?.modes?.[mode];
  if (inputMode?.bg) {
    vars["--luna-input-bg"] = resolveTokenValue(theme, inputMode.bg);
  }
  if (inputMode?.fg) {
    vars["--luna-input-fg"] = resolveTokenValue(theme, inputMode.fg);
  }
  if (inputMode?.border) {
    vars["--luna-input-border"] = resolveTokenValue(theme, inputMode.border);
  }
  if (inputMode?.hoverBorder) {
    vars["--luna-input-hover-border"] = resolveTokenValue(theme, inputMode.hoverBorder);
  }
  if (inputMode?.focusBorder) {
    vars["--luna-input-focus-border"] = resolveTokenValue(theme, inputMode.focusBorder);
  }
  if (inputMode?.focusRing) {
    vars["--luna-input-focus-ring"] = inputMode.focusRing;
  }
  if (inputMode?.placeholder) {
    vars["--luna-input-placeholder"] = resolveTokenValue(theme, inputMode.placeholder);
  }
  if (inputMode?.disabledBg) {
    vars["--luna-input-disabled-bg"] = resolveTokenValue(theme, inputMode.disabledBg);
  }
  if (inputMode?.disabledFg) {
    vars["--luna-input-disabled-fg"] = resolveTokenValue(theme, inputMode.disabledFg);
  }
  if (inputMode?.disabledBorder) {
    vars["--luna-input-disabled-border"] = resolveTokenValue(theme, inputMode.disabledBorder);
  }
  if (inputMode?.errorBorder) {
    vars["--luna-input-error-border"] = resolveTokenValue(theme, inputMode.errorBorder);
  }
  if (inputMode?.errorFocusRing) {
    vars["--luna-input-error-focus-ring"] = inputMode.errorFocusRing;
  }
  if (inputMode?.helpFg) {
    vars["--luna-input-help-fg"] = resolveTokenValue(theme, inputMode.helpFg);
  }
  if (inputMode?.errorFg) {
    vars["--luna-input-error-fg"] = resolveTokenValue(theme, inputMode.errorFg);
  }
  if (inputMode?.labelFg) {
    vars["--luna-input-label-fg"] = resolveTokenValue(theme, inputMode.labelFg);
  }
  if (input?.sizes) {
    for (const [name, profile] of Object.entries(input.sizes)) {
      if (profile.minHeight) {
        vars[`--luna-input-size-${name}-min-height`] =
          resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight;
      }
      if (profile.paddingX) {
        vars[`--luna-input-size-${name}-padding-x`] =
          resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX;
      }
      if (profile.paddingY) {
        vars[`--luna-input-size-${name}-padding-y`] =
          resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY;
      }
      if (profile.fontSize) {
        vars[`--luna-input-size-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.gap) {
        vars[`--luna-input-size-${name}-gap`] =
          resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap;
      }
    }
  }

  return vars;
}
