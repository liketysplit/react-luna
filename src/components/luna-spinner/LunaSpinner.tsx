import React from "react";
import { useTheme } from "../../theme";
import { resolveModeTokens, resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import type { LunaSpinnerProps } from "./LunaSpinner.props";
import "./LunaSpinner.css";

type SpinnerCssVariable =
  | "--luna-spinner-current-size"
  | "--luna-spinner-current-color"
  | "--luna-spinner-current-track"
  | "--luna-spinner-current-stroke-width"
  | "--luna-spinner-current-duration";

type LunaSpinnerStyle = React.CSSProperties &
  Partial<Record<SpinnerCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpinnerSize(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  const profile = theme.components.spinner?.sizes?.[value];
  if (profile?.size) {
    return resolveScaleValue(theme.spacing, profile.size) ?? profile.size;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveSpinnerStrokeWidth(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  const profile = theme.components.spinner?.sizes?.[value];
  if (profile?.strokeWidth) {
    return resolveScaleValue(theme.spacing, profile.strokeWidth) ?? profile.strokeWidth;
  }

  return undefined;
}

export const LunaSpinner = React.forwardRef<HTMLElement, LunaSpinnerProps>(function LunaSpinner(
  { as, className, color, decorative = true, label, size, style, ...spinnerProps },
  ref
) {
  const { mode, theme } = useTheme();
  const Component = (as ?? "span") as React.ElementType;
  const resolvedSize = size ?? theme.components.spinner?.defaultSize ?? "medium";
  const modeTokens = resolveModeTokens(theme, mode);
  const spinnerModeTokens = theme.components.spinner?.modes?.[mode];
  const accessibleLabel = label ?? theme.components.spinner?.defaultLabel ?? "Loading";
  const spinnerStyle: LunaSpinnerStyle = {
    ["--luna-spinner-current-size" as const]: resolveSpinnerSize(resolvedSize, theme),
    ["--luna-spinner-current-color" as const]: color
      ? resolveTokenValue(theme, color)
      : spinnerModeTokens?.color
        ? resolveTokenValue(theme, spinnerModeTokens.color)
        : modeTokens.foreground,
    ["--luna-spinner-current-track" as const]: spinnerModeTokens?.track
      ? resolveTokenValue(theme, spinnerModeTokens.track)
      : modeTokens.border,
    ["--luna-spinner-current-stroke-width" as const]: resolveSpinnerStrokeWidth(
      resolvedSize,
      theme
    ),
    ["--luna-spinner-current-duration" as const]:
      resolveScaleValue(theme.motion, theme.components.spinner?.duration) ??
      theme.components.spinner?.duration,
    ...style
  };

  return (
    <Component
      {...spinnerProps}
      ref={ref}
      className={toClassName(["luna-spinner", className])}
      data-size={resolvedSize}
      role={decorative ? spinnerProps.role : spinnerProps.role ?? "status"}
      aria-hidden={decorative ? true : spinnerProps["aria-hidden"]}
      aria-label={!decorative ? spinnerProps["aria-label"] ?? accessibleLabel : spinnerProps["aria-label"]}
      style={spinnerStyle}
    >
      <span aria-hidden="true" className="luna-spinner__track" />
      <span aria-hidden="true" className="luna-spinner__indicator" />
    </Component>
  );
});
