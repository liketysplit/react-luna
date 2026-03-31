import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaEmptyState } from "../luna-empty-state";
import { LunaSkeleton } from "../luna-skeleton";
import type { LunaLineChartDatum, LunaLineChartProps } from "./LunaLineChart.props";
import "./LunaLineChart.css";

type ChartCssVariable = "--luna-line-chart-current-height";

type LunaLineChartStyle = React.CSSProperties &
  Partial<Record<ChartCssVariable, string | number | undefined>>;

type PlotPoint = {
  x: number;
  y: number;
  datum: LunaLineChartDatum;
  index: number;
};

type AxisTick = {
  value: number;
  offset: number;
  label: string;
};

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;
const PLOT_LEFT = 8;
const PLOT_RIGHT = 98;
const PLOT_TOP = 6;
const PLOT_BOTTOM = 90;
const DEFAULT_Y_TICK_COUNT = 4;
const MAX_X_TICKS = 6;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveDimensionValue(
  value: React.CSSProperties["height"] | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (typeof value !== "string") {
    return value;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveNumericValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  const resolved = resolveScaleValue(theme.spacing, value) ?? value;
  const numeric = Number.parseFloat(String(resolved));

  return Number.isFinite(numeric) ? numeric : undefined;
}

function normalizeData(data: LunaLineChartDatum[]) {
  return data.filter((point) => Number.isFinite(point.y));
}

function buildYDomain(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const padding = Math.max(Math.abs(min) * 0.1, 1);
    return { min: min - padding, max: max + padding };
  }

  const span = max - min;
  const padding = span * 0.12;
  return { min: min - padding, max: max + padding };
}

function formatAxisValue(value: LunaLineChartDatum["x"]) {
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  return String(value);
}

function formatNumericAxisValue(value: number) {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1);
}

function buildPlotPoints(data: LunaLineChartDatum[]) {
  const domain = buildYDomain(data.map((point) => point.y));
  const xSpan = data.length > 1 ? data.length - 1 : 1;
  const ySpan = domain.max - domain.min || 1;

  const points = data.map((datum, index) => {
    const x =
      data.length === 1
        ? (PLOT_LEFT + PLOT_RIGHT) / 2
        : PLOT_LEFT + ((PLOT_RIGHT - PLOT_LEFT) * index) / xSpan;
    const y =
      PLOT_BOTTOM - ((datum.y - domain.min) / ySpan) * (PLOT_BOTTOM - PLOT_TOP);

    return {
      x,
      y,
      datum,
      index
    } satisfies PlotPoint;
  });

  return { points, domain };
}

function buildLinePath(points: PlotPoint[]) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    const point = points[0];
    return `M ${point.x} ${point.y}`;
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function buildYAxisTicks(
  min: number,
  max: number,
  formatYAxisLabel: LunaLineChartProps["formatYAxisLabel"]
) {
  return Array.from({ length: DEFAULT_Y_TICK_COUNT + 1 }, (_, index) => {
    const ratio = index / DEFAULT_Y_TICK_COUNT;
    const value = max - (max - min) * ratio;
    return {
      value,
      offset: ratio * 100,
      label: formatYAxisLabel ? formatYAxisLabel(value) : formatNumericAxisValue(value)
    } satisfies AxisTick;
  });
}

function buildXAxisTicks(
  data: LunaLineChartDatum[],
  formatXAxisLabel: LunaLineChartProps["formatXAxisLabel"]
) {
  if (data.length === 0) {
    return [];
  }

  const desiredCount = Math.min(MAX_X_TICKS, data.length);
  const indices = new Set<number>();

  if (data.length === 1) {
    indices.add(0);
  } else {
    for (let step = 0; step < desiredCount; step += 1) {
      const ratio = desiredCount === 1 ? 0 : step / (desiredCount - 1);
      const index = Math.round(ratio * (data.length - 1));
      indices.add(index);
    }
  }

  return Array.from(indices)
    .sort((left, right) => left - right)
    .map((index) => {
      const datum = data[index];
      const label = formatXAxisLabel
        ? formatXAxisLabel(datum.x, { index, points: data })
        : formatAxisValue(datum.x);

      return {
        value: index,
        offset: data.length === 1 ? 50 : (index / (data.length - 1)) * 100,
        label
      };
    });
}

export const LunaLineChart = React.forwardRef<HTMLDivElement, LunaLineChartProps>(
  function LunaLineChart(
    {
      ariaDescription,
      ariaLabel,
      className,
      data,
      emptyDescription = "Add data points to show a trend line.",
      emptyTitle = "No chart data",
      error,
      errorDescription,
      errorTitle = "Chart unavailable",
      formatXAxisLabel,
      formatYAxisLabel,
      height,
      loading = false,
      loadingLabel = "Loading chart",
      showGridLines = true,
      showMarkers = false,
      style,
      ...props
    },
    ref
  ) {
    const { theme } = useTheme();
    const descriptionId = React.useId();
    const normalizedData = normalizeData(data);
    const resolvedState = error
      ? "error"
      : loading
        ? "loading"
        : normalizedData.length === 0
          ? "empty"
          : "ready";

    const resolvedHeight =
      resolveDimensionValue(height, theme) ??
      resolveDimensionValue(theme.components.lineChart?.height, theme);
    const markerRadius = (resolveNumericValue(theme.components.lineChart?.markerSize, theme) ?? 4.5) / 2.5;
    const resolvedStyle: LunaLineChartStyle = {
      ["--luna-line-chart-current-height" as const]: resolvedHeight,
      ...style
    };

    const ariaDescriptionText =
      typeof ariaDescription === "string" && ariaDescription.trim().length > 0
        ? ariaDescription
        : undefined;

    if (resolvedState !== "ready") {
      return (
        <div
          {...props}
          ref={ref}
          className={toClassName(["luna-line-chart", className])}
          data-state={resolvedState}
          role="group"
          aria-label={ariaLabel}
          aria-roledescription="line chart"
          aria-describedby={ariaDescriptionText ? descriptionId : undefined}
          aria-busy={resolvedState === "loading" ? true : undefined}
          style={resolvedStyle}
        >
          {ariaDescriptionText ? (
            <div className="luna-line-chart__sr-only" id={descriptionId}>
              {ariaDescriptionText}
            </div>
          ) : null}
          <div className="luna-line-chart__state">
            {resolvedState === "loading" ? (
              <div className="luna-line-chart__loading">
                <div className="luna-line-chart__loading-bars" aria-label={loadingLabel}>
                  <div className="luna-line-chart__loading-y-axis" aria-hidden="true">
                    <LunaSkeleton width="2" />
                    <LunaSkeleton width="2.5" />
                    <LunaSkeleton width="2" />
                    <LunaSkeleton width="2.25" />
                    <LunaSkeleton width="1.75" />
                  </div>
                  <div className="luna-line-chart__loading-plot">
                    <LunaSkeleton shape="block" height="100%" />
                  </div>
                </div>
                <div className="luna-line-chart__loading-x-axis" aria-hidden="true">
                  <LunaSkeleton width="2.5" />
                  <LunaSkeleton width="2.25" />
                  <LunaSkeleton width="2.75" />
                  <LunaSkeleton width="2.25" />
                </div>
              </div>
            ) : (
              <LunaEmptyState
                framed={false}
                title={resolvedState === "error" ? errorTitle : emptyTitle}
                description={
                  resolvedState === "error"
                    ? (errorDescription ?? error)
                    : emptyDescription
                }
              />
            )}
          </div>
        </div>
      );
    }

    const { points, domain } = buildPlotPoints(normalizedData);
    const yTicks = buildYAxisTicks(domain.min, domain.max, formatYAxisLabel);
    const xTicks = buildXAxisTicks(normalizedData, formatXAxisLabel);
    const linePath = buildLinePath(points);

    return (
      <div
        {...props}
        ref={ref}
        className={toClassName(["luna-line-chart", className])}
        data-state="ready"
        role="group"
        aria-label={ariaLabel}
        aria-roledescription="line chart"
        aria-describedby={ariaDescriptionText ? descriptionId : undefined}
        style={resolvedStyle}
      >
        {ariaDescriptionText ? (
          <div className="luna-line-chart__sr-only" id={descriptionId}>
            {ariaDescriptionText}
          </div>
        ) : null}
        <div className="luna-line-chart__frame">
          <div className="luna-line-chart__y-axis" aria-hidden="true">
            {yTicks.map((tick) => (
              <span
                className="luna-line-chart__y-axis-label"
                key={tick.offset}
                style={{ bottom: `${tick.offset}%` }}
              >
                {tick.label}
              </span>
            ))}
          </div>
          <div className="luna-line-chart__plot">
            <svg aria-hidden="true" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
              {showGridLines
                ? yTicks.map((tick) => (
                    <line
                      className="luna-line-chart__grid-line"
                      key={`y-${tick.offset}`}
                      x1={PLOT_LEFT}
                      x2={PLOT_RIGHT}
                      y1={PLOT_BOTTOM - (tick.offset / 100) * (PLOT_BOTTOM - PLOT_TOP)}
                      y2={PLOT_BOTTOM - (tick.offset / 100) * (PLOT_BOTTOM - PLOT_TOP)}
                    />
                  ))
                : null}
              {showGridLines
                ? xTicks.map((tick) => (
                    <line
                      className="luna-line-chart__grid-line"
                      key={`x-${tick.value}`}
                      x1={
                        normalizedData.length === 1
                          ? (PLOT_LEFT + PLOT_RIGHT) / 2
                          : PLOT_LEFT + (tick.offset / 100) * (PLOT_RIGHT - PLOT_LEFT)
                      }
                      x2={
                        normalizedData.length === 1
                          ? (PLOT_LEFT + PLOT_RIGHT) / 2
                          : PLOT_LEFT + (tick.offset / 100) * (PLOT_RIGHT - PLOT_LEFT)
                      }
                      y1={PLOT_TOP}
                      y2={PLOT_BOTTOM}
                    />
                  ))
                : null}
              <line className="luna-line-chart__axis-line" x1={PLOT_LEFT} x2={PLOT_RIGHT} y1={PLOT_BOTTOM} y2={PLOT_BOTTOM} />
              <line className="luna-line-chart__axis-line" x1={PLOT_LEFT} x2={PLOT_LEFT} y1={PLOT_TOP} y2={PLOT_BOTTOM} />
              <path className="luna-line-chart__series" d={linePath} />
              {showMarkers
                ? points.map((point) => (
                    <circle
                      className="luna-line-chart__marker"
                      cx={point.x}
                      cy={point.y}
                      key={`${point.index}-${point.datum.y}`}
                      r={markerRadius}
                    />
                  ))
                : null}
            </svg>
          </div>
          <div className="luna-line-chart__x-axis" aria-hidden="true">
            {xTicks.map((tick) => (
              <span
                className="luna-line-chart__x-axis-label"
                key={`${tick.value}-${tick.label}`}
                style={{ left: `${tick.offset}%` }}
              >
                {tick.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
