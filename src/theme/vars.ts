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
  if (button?.radius) {
    vars["--luna-btn-radius"] = resolveScaleValue(theme.radii, button.radius) ?? button.radius;
  }
  if (button?.paddingX) {
    vars["--luna-btn-padding-x"] = resolveScaleValue(theme.spacing, button.paddingX) ?? button.paddingX;
  }
  if (button?.paddingY) {
    vars["--luna-btn-padding-y"] = resolveScaleValue(theme.spacing, button.paddingY) ?? button.paddingY;
  }
  if (button?.fontSize) {
    vars["--luna-btn-font-size"] = resolveScaleValue(theme.typography.sizes, button.fontSize) ?? button.fontSize;
  }
  if (button?.fontWeight) {
    vars["--luna-btn-font-weight"] = String(button.fontWeight);
  }

  return vars;
}
