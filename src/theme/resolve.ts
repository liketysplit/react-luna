import type { Theme, ThemeMode, ThemeModeTokens } from "./types";

const RAW_COLOR_PATTERNS = [/^#/, /^rgb/, /^hsl/, /^var\(/];

export function isRawColor(value: string): boolean {
  return RAW_COLOR_PATTERNS.some((pattern) => pattern.test(value));
}

export function resolveTokenValue(theme: Theme, token: string): string {
  if (isRawColor(token)) {
    return token;
  }

  if (theme.colors.custom[token]) {
    return theme.colors.custom[token];
  }

  const [scaleName, scaleLevel] = token.split(".");
  const scale = theme.colors.scale[scaleName];
  if (scale) {
    if (scaleLevel && scale[scaleLevel as keyof typeof scale]) {
      return scale[scaleLevel as keyof typeof scale];
    }
    return scale[600];
  }

  return token;
}

export function resolveModeTokens(theme: Theme, mode: ThemeMode): ThemeModeTokens {
  const modeTokens = theme.modes[mode];
  return {
    background: resolveTokenValue(theme, modeTokens.background),
    foreground: resolveTokenValue(theme, modeTokens.foreground),
    surface: resolveTokenValue(theme, modeTokens.surface),
    border: resolveTokenValue(theme, modeTokens.border),
    muted: resolveTokenValue(theme, modeTokens.muted)
  };
}

export function resolveScaleValue(
  scale: Record<string, string>,
  value?: string
): string | undefined {
  if (!value) {
    return undefined;
  }

  return scale[value] ?? value;
}
