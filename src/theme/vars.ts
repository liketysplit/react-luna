import type { Theme } from "./types";
import { resolveModeTokens, resolveTokenValue, resolveScaleValue } from "./resolve";

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

  return vars;
}
