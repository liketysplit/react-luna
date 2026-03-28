import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import type { LunaProgressProps } from "./LunaProgress.props";
import "./LunaProgress.css";

type ProgressCssVariable =
  | "--luna-progress-current-height"
  | "--luna-progress-current-radius"
  | "--luna-progress-current-value"
  | "--luna-progress-current-fill"
  | "--luna-progress-current-glow"
  | "--luna-progress-current-track-bg"
  | "--luna-progress-current-indeterminate-duration"
  | "--luna-progress-label-fg"
  | "--luna-progress-description-fg"
  | "--luna-progress-value-fg";

type LunaProgressStyle = React.CSSProperties &
  Partial<Record<ProgressCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function resolveSizeHeight(
  size: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!size) {
    return undefined;
  }

  const profile = theme.components.progress?.sizes?.[size];
  if (profile?.height) {
    return resolveScaleValue(theme.spacing, profile.height) ?? profile.height;
  }

  return resolveScaleValue(theme.spacing, size) ?? size;
}

function resolveRadius(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function resolveMotionValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.motion, value) ?? value;
}

function formatPercent(percent: number) {
  const rounded = Math.round(percent * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded.toFixed(0)}%` : `${rounded}%`;
}

export const LunaProgress = React.forwardRef<HTMLDivElement, LunaProgressProps>(
  function LunaProgress(
    {
      className,
      description,
      id,
      indeterminate = false,
      label,
      max = 100,
      min = 0,
      showValue = false,
      size,
      style,
      tone,
      value = 0,
      valueLabel,
      ...props
    },
    ref
  ) {
    const reactId = React.useId();
    const baseId = id ?? `luna-progress-${reactId.replace(/:/g, "")}`;
    const labelId = label !== undefined && label !== null ? `${baseId}-label` : undefined;
    const descriptionId =
      description !== undefined && description !== null ? `${baseId}-description` : undefined;
    const { theme, mode } = useTheme();
    const resolvedSize = size ?? theme.components.progress?.defaultSize ?? "medium";
    const resolvedTone = tone ?? theme.components.progress?.defaultTone ?? "primary";
    const resolvedHeight = resolveSizeHeight(resolvedSize, theme);
    const resolvedRadius = resolveRadius(theme.components.progress?.radius, theme);
    const resolvedDuration = resolveMotionValue(
      theme.components.progress?.indeterminateDuration,
      theme
    );
    const resolvedToneTokens = theme.components.progress?.tones?.[resolvedTone];
    const resolvedFill = resolveTokenValue(theme, resolvedToneTokens?.fill ?? "primary.600");
    const resolvedGlow = resolvedToneTokens?.glow
      ? resolveTokenValue(theme, resolvedToneTokens.glow)
      : undefined;
    const resolvedModeTokens = theme.components.progress?.modes?.[mode];
    const resolvedTrackBg = resolvedModeTokens?.trackBg
      ? resolveTokenValue(theme, resolvedModeTokens.trackBg)
      : undefined;
    const resolvedLabelFg = resolvedModeTokens?.labelFg
      ? resolveTokenValue(theme, resolvedModeTokens.labelFg)
      : undefined;
    const resolvedDescriptionFg = resolvedModeTokens?.descriptionFg
      ? resolveTokenValue(theme, resolvedModeTokens.descriptionFg)
      : undefined;
    const resolvedValueFg = resolvedModeTokens?.valueFg
      ? resolveTokenValue(theme, resolvedModeTokens.valueFg)
      : undefined;

    const boundedMax = Math.max(max, min);
    const clampedValue = clamp(value, min, boundedMax);
    const percent =
      boundedMax === min ? 0 : ((clampedValue - min) / (boundedMax - min)) * 100;
    const resolvedValueLabel =
      valueLabel ?? (!indeterminate && showValue ? formatPercent(percent) : undefined);

    const rootStyle: LunaProgressStyle = {
      ["--luna-progress-current-height" as const]: resolvedHeight,
      ["--luna-progress-current-radius" as const]: resolvedRadius,
      ["--luna-progress-current-value" as const]: `${percent}%`,
      ["--luna-progress-current-fill" as const]: resolvedFill,
      ["--luna-progress-current-glow" as const]: resolvedGlow,
      ["--luna-progress-current-track-bg" as const]: resolvedTrackBg,
      ["--luna-progress-current-indeterminate-duration" as const]: resolvedDuration,
      ["--luna-progress-label-fg" as const]: resolvedLabelFg,
      ["--luna-progress-description-fg" as const]: resolvedDescriptionFg,
      ["--luna-progress-value-fg" as const]: resolvedValueFg,
      ...style
    };

    return (
      <div
        {...props}
        ref={ref}
        className={toClassName(["luna-progress", className])}
        data-indeterminate={indeterminate ? "true" : undefined}
        data-size={resolvedSize}
        data-tone={resolvedTone}
        style={rootStyle}
      >
        {label || resolvedValueLabel ? (
          <div className="luna-progress__header">
            {label ? (
              <LunaText
                as="span"
                id={labelId}
                variant="label"
                className="luna-progress__label"
              >
                {label}
              </LunaText>
            ) : (
              <span />
            )}
            {resolvedValueLabel !== undefined && resolvedValueLabel !== null ? (
              <LunaText
                as="span"
                variant="caption"
                className="luna-progress__value"
              >
                {resolvedValueLabel}
              </LunaText>
            ) : null}
          </div>
        ) : null}
        {description ? (
          <LunaText
            as="div"
            id={descriptionId}
            variant="body-small"
            className="luna-progress__description"
          >
            {description}
          </LunaText>
        ) : null}
        <div
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          aria-valuemax={indeterminate ? undefined : boundedMax}
          aria-valuemin={indeterminate ? undefined : min}
          aria-valuenow={indeterminate ? undefined : clampedValue}
          className="luna-progress__track"
          role="progressbar"
        >
          <span aria-hidden="true" className="luna-progress__indicator" />
        </div>
      </div>
    );
  }
);
