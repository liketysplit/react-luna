import React from "react";
import { useTheme } from "../../theme";
import { resolveModeTokens, resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import type { ThemeTagSurfaceTokens } from "../../theme/types";
import type { LunaTagProps } from "./LunaTag.props";
import "./LunaTag.css";

type TagCssVariable =
  | "--luna-tag-padding-x"
  | "--luna-tag-padding-y"
  | "--luna-tag-font-size"
  | "--luna-tag-min-height"
  | "--luna-tag-gap"
  | "--luna-tag-bg"
  | "--luna-tag-fg"
  | "--luna-tag-border"
  | "--luna-tag-radius"
  | "--luna-tag-font-weight";

type LunaTagStyle = React.CSSProperties &
  Partial<Record<TagCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveTagSize(size: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!size) {
    return undefined;
  }

  const profile = theme.components.tag?.sizes?.[size];
  if (profile) {
    return {
      paddingX: resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX,
      paddingY: resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY,
      fontSize:
        resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize,
      minHeight: resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight,
      gap: resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap
    };
  }

  const resolvedSpacing = resolveScaleValue(theme.spacing, size) ?? size;
  return {
    paddingX: resolvedSpacing,
    paddingY: undefined,
    fontSize: undefined,
    minHeight: resolvedSpacing,
    gap: undefined
  };
}

function resolveRadius(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function resolveFontWeight(
  value: string | number | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return value;
  }

  return theme.typography.weights[value] ?? value;
}

function resolveSurfaceToken(
  token: string | undefined,
  fallback: string,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!token) {
    return fallback;
  }

  return resolveTokenValue(theme, token);
}

export const LunaTag = React.forwardRef<HTMLElement, LunaTagProps>(function LunaTag(
  { as, children, className, color, rounded, size, style, variant, ...tagProps },
  ref
) {
  const { mode, theme } = useTheme();
  const Component = (as ?? "span") as React.ElementType;
  const modeTokens = resolveModeTokens(theme, mode);
  const resolvedVariant = variant ?? theme.components.tag?.defaultVariant ?? "neutral";
  const resolvedSize = size ?? theme.components.tag?.defaultSize ?? "medium";
  const sizeProfile = resolveTagSize(resolvedSize, theme);
  const variantTokens: ThemeTagSurfaceTokens | undefined =
    theme.components.tag?.variants?.[mode]?.[resolvedVariant];
  const resolvedRadius = resolveRadius(theme.components.tag?.radius, theme);
  const resolvedFontWeight = resolveFontWeight(theme.components.tag?.fontWeight, theme);
  const resolvedColor = color ? resolveTokenValue(theme, color) : undefined;

  const tagStyle: LunaTagStyle = {
    ["--luna-tag-padding-x" as const]: sizeProfile?.paddingX,
    ["--luna-tag-padding-y" as const]: sizeProfile?.paddingY,
    ["--luna-tag-font-size" as const]:
      sizeProfile?.fontSize ?? theme.typography.sizes.xs,
    ["--luna-tag-min-height" as const]: sizeProfile?.minHeight,
    ["--luna-tag-gap" as const]: sizeProfile?.gap,
    ["--luna-tag-bg" as const]: resolvedColor ?? resolveSurfaceToken(variantTokens?.bg, modeTokens.surface, theme),
    ["--luna-tag-fg" as const]:
      variantTokens?.fg ? resolveTokenValue(theme, variantTokens.fg) : modeTokens.foreground,
    ["--luna-tag-border" as const]:
      resolvedColor ?? resolveSurfaceToken(variantTokens?.border, modeTokens.border, theme),
    ["--luna-tag-radius" as const]: resolvedRadius,
    ["--luna-tag-font-weight" as const]:
      resolvedFontWeight !== undefined ? String(resolvedFontWeight) : undefined,
    ...style
  };

  return (
    <Component
      {...tagProps}
      ref={ref}
      className={toClassName(["luna-tag", rounded && "luna-tag--rounded", className])}
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      style={tagStyle}
    >
      {children}
    </Component>
  );
});
