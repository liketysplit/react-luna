import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import type { LunaSparklineProps } from "./LunaSparkline.props";
import "./LunaSparkline.css";

const VIEWBOX_SIZE = 100;
const EDGE_PADDING = 6;
const MIDPOINT = VIEWBOX_SIZE / 2;
const EMPTY_STATE_PATH = "M 30 50 L 70 50";

type SparklineCssVariable =
  | "--luna-sparkline-current-width"
  | "--luna-sparkline-current-height"
  | "--luna-sparkline-current-stroke-width"
  | "--luna-sparkline-current-stroke"
  | "--luna-sparkline-current-empty-stroke";

type LunaSparklineStyle = React.CSSProperties &
  Partial<Record<SparklineCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveDimensionValue(
  value: React.CSSProperties["width"] | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (typeof value !== "string") {
    return value;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveSeriesPath(data: number[]) {
  if (data.length === 0) {
    return EMPTY_STATE_PATH;
  }

  if (data.length === 1) {
    return `M ${EDGE_PADDING} ${MIDPOINT} L ${VIEWBOX_SIZE - EDGE_PADDING} ${MIDPOINT}`;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x =
      EDGE_PADDING + (index / (data.length - 1)) * (VIEWBOX_SIZE - EDGE_PADDING * 2);
    const y =
      range === 0
        ? MIDPOINT
        : EDGE_PADDING + ((max - value) / range) * (VIEWBOX_SIZE - EDGE_PADDING * 2);

    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return `M ${points[0]} ${points.slice(1).map((point) => `L ${point}`).join(" ")}`;
}

export const LunaSparkline = React.forwardRef<SVGSVGElement, LunaSparklineProps>(
  function LunaSparkline(
    {
      ariaLabel,
      className,
      data,
      height,
      preserveAspectRatio = "none",
      size,
      strokeWidth,
      style,
      tone,
      width,
      ...props
    },
    ref
  ) {
    const { theme, mode } = useTheme();
    const resolvedSize = size ?? theme.components.sparkline?.defaultSize ?? "medium";
    const resolvedTone = tone ?? theme.components.sparkline?.defaultTone ?? "neutral";
    const sizeProfile = theme.components.sparkline?.sizes?.[resolvedSize];
    const resolvedWidth = resolveDimensionValue(width ?? sizeProfile?.width, theme);
    const resolvedHeight = resolveDimensionValue(height ?? sizeProfile?.height, theme);
    const resolvedStrokeWidth =
      resolveDimensionValue(strokeWidth ?? theme.components.sparkline?.strokeWidth, theme) ??
      "0.1875rem";
    const resolvedStroke = resolveTokenValue(
      theme,
      theme.components.sparkline?.tones?.[resolvedTone]?.stroke ?? "neutral.500"
    );
    const resolvedEmptyStroke = resolveTokenValue(
      theme,
      theme.components.sparkline?.modes?.[mode]?.emptyStroke ?? "neutral.300"
    );
    const seriesPath = resolveSeriesPath(data);
    const isEmpty = data.length === 0;
    const rootStyle: LunaSparklineStyle = {
      ["--luna-sparkline-current-width" as const]: resolvedWidth,
      ["--luna-sparkline-current-height" as const]: resolvedHeight,
      ["--luna-sparkline-current-stroke-width" as const]: resolvedStrokeWidth,
      ["--luna-sparkline-current-stroke" as const]: resolvedStroke,
      ["--luna-sparkline-current-empty-stroke" as const]: resolvedEmptyStroke,
      ...style
    };

    return (
      <svg
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={toClassName(["luna-sparkline", className])}
        data-empty={isEmpty ? "true" : undefined}
        data-series-length={String(data.length)}
        data-size={resolvedSize}
        data-tone={resolvedTone}
        preserveAspectRatio={preserveAspectRatio}
        role="img"
        style={rootStyle}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      >
        <path
          aria-hidden="true"
          className="luna-sparkline__line"
          d={seriesPath}
          fill="none"
          pathLength={100}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
);
