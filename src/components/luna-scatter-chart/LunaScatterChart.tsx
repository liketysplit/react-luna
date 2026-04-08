import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaEmptyState } from "../luna-empty-state";
import { LunaSkeleton } from "../luna-skeleton";
import { LunaText } from "../luna-text";
import type { LunaScatterChartDatum, LunaScatterChartProps } from "./LunaScatterChart.props";
import "./LunaScatterChart.css";

type ScatterChartCssVariable =
  | "--luna-scatter-chart-radius"
  | "--luna-scatter-chart-padding"
  | "--luna-scatter-chart-gap"
  | "--luna-scatter-chart-header-gap"
  | "--luna-scatter-chart-legend-gap"
  | "--luna-scatter-chart-height"
  | "--luna-scatter-chart-point-size"
  | "--luna-scatter-chart-bg"
  | "--luna-scatter-chart-border"
  | "--luna-scatter-chart-shadow"
  | "--luna-scatter-chart-plot-bg"
  | "--luna-scatter-chart-title-fg"
  | "--luna-scatter-chart-description-fg"
  | "--luna-scatter-chart-axis-text"
  | "--luna-scatter-chart-axis-line"
  | "--luna-scatter-chart-grid"
  | "--luna-scatter-chart-legend-text"
  | "--luna-scatter-chart-legend-meta-text"
  | "--luna-scatter-chart-state-text"
  | "--luna-scatter-chart-current-point-color";

type LunaScatterChartStyle = React.CSSProperties &
  Partial<Record<ScatterChartCssVariable, string | number | undefined>>;

type AxisTick = {
  value: number;
  offset: number;
  label: string;
};

type PlotPoint = LunaScatterChartDatum & {
  safeLabel: string;
  left: number;
  top: number;
};

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpace(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveRadius(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function resolveHeight(
  value: React.CSSProperties["height"] | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (typeof value !== "string") {
    return value;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function normalizeData(data: LunaScatterChartDatum[]) {
  return data
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .map((point, index) => ({
      ...point,
      safeLabel:
        typeof point.label === "string" && point.label.trim().length > 0
          ? point.label.trim()
          : `Point ${index + 1}`
    }));
}

function buildDomain(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const padding = Math.max(Math.abs(min) * 0.12, 1);
    return { min: min - padding, max: max + padding };
  }

  const span = max - min;
  const padding = span * 0.12;

  return {
    min: min - padding,
    max: max + padding
  };
}

function getNiceStep(rawStep: number) {
  if (rawStep <= 0 || !Number.isFinite(rawStep)) {
    return 1;
  }

  const exponent = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const fraction = rawStep / exponent;

  if (fraction <= 1) {
    return exponent;
  }

  if (fraction <= 2) {
    return 2 * exponent;
  }

  if (fraction <= 5) {
    return 5 * exponent;
  }

  return 10 * exponent;
}

function formatAxisValue(value: number) {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function buildTicks(domain: { min: number; max: number }, count = 5) {
  const span = domain.max - domain.min || 1;
  const step = getNiceStep(span / Math.max(1, count - 1));
  const niceMin = Math.floor(domain.min / step) * step;
  const niceMax = Math.ceil(domain.max / step) * step;
  const range = niceMax - niceMin || step;
  const tickCount = Math.round(range / step);

  return Array.from({ length: tickCount + 1 }, (_, index) => {
    const value = niceMin + index * step;
    return {
      value,
      offset: ((value - niceMin) / range) * 100,
      label: formatAxisValue(value)
    } satisfies AxisTick;
  });
}

function buildPlotPoints(
  data: ReturnType<typeof normalizeData>,
  xDomain: { min: number; max: number },
  yDomain: { min: number; max: number }
) {
  const xSpan = xDomain.max - xDomain.min || 1;
  const ySpan = yDomain.max - yDomain.min || 1;

  return data.map((point) => ({
    ...point,
    left: ((point.x - xDomain.min) / xSpan) * 100,
    top: 100 - ((point.y - yDomain.min) / ySpan) * 100
  })) satisfies PlotPoint[];
}

function resolveLegendLabel(title: React.ReactNode) {
  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }

  return "Observations";
}

function createSummary(
  state: "ready" | "empty" | "loading" | "error",
  data: ReturnType<typeof normalizeData>,
  xDomain: { min: number; max: number } | null,
  yDomain: { min: number; max: number } | null,
  title: React.ReactNode | undefined,
  error: React.ReactNode | undefined
) {
  const titleText = typeof title === "string" && title.trim().length > 0 ? `${title}. ` : "";

  if (state === "loading") {
    return `${titleText}Loading scatter chart data.`;
  }

  if (state === "error") {
    return `${titleText}${
      typeof error === "string" && error.trim().length > 0
        ? error
        : "Scatter chart data is unavailable."
    }`;
  }

  if (state === "empty") {
    return `${titleText}No scatter chart data is available.`;
  }

  return `${titleText}${data.length} points. X values range from ${formatAxisValue(
    xDomain?.min ?? 0
  )} to ${formatAxisValue(xDomain?.max ?? 0)}. Y values range from ${formatAxisValue(
    yDomain?.min ?? 0
  )} to ${formatAxisValue(yDomain?.max ?? 0)}.`;
}

export const LunaScatterChart = React.forwardRef<HTMLElement, LunaScatterChartProps>(
  function LunaScatterChart(
    {
      ariaDescription,
      ariaLabel,
      className,
      data,
      description,
      emptyState = "Add paired numeric values to render the relationship.",
      error,
      height,
      id,
      loading = false,
      showGrid = true,
      showLegend = false,
      style,
      title,
      ...props
    },
    ref
  ) {
    const reactId = React.useId();
    const baseId = id ?? `luna-scatter-chart-${reactId.replace(/:/g, "")}`;
    const visibleDescriptionId =
      description !== undefined && description !== null ? `${baseId}-description` : undefined;
    const assistiveDescriptionId =
      ariaDescription && ariaDescription.trim().length > 0 ? `${baseId}-aria-description` : undefined;
    const summaryId = `${baseId}-summary`;
    const { theme, mode } = useTheme();
    const chartTheme = theme.components.scatterChart;
    const modeTokens = chartTheme?.modes?.[mode];
    const normalizedData = normalizeData(data);
    const state = error ? "error" : loading ? "loading" : normalizedData.length === 0 ? "empty" : "ready";
    const xDomain = normalizedData.length > 0 ? buildDomain(normalizedData.map((point) => point.x)) : null;
    const yDomain = normalizedData.length > 0 ? buildDomain(normalizedData.map((point) => point.y)) : null;
    const xTicks = xDomain ? buildTicks(xDomain) : [];
    const yTicks = yDomain ? buildTicks(yDomain) : [];
    const plotPoints =
      xDomain && yDomain ? buildPlotPoints(normalizedData, xDomain, yDomain) : [];
    const palette = chartTheme?.palette?.length ? chartTheme.palette : ["primary.500"];
    const pointColor = resolveTokenValue(theme, palette[0] ?? "primary.500");
    const describedBy = [visibleDescriptionId, assistiveDescriptionId, summaryId]
      .filter(Boolean)
      .join(" ") || undefined;

    const rootStyle: LunaScatterChartStyle = {
      ["--luna-scatter-chart-radius" as const]: resolveRadius(chartTheme?.radius, theme),
      ["--luna-scatter-chart-padding" as const]: resolveSpace(chartTheme?.padding, theme),
      ["--luna-scatter-chart-gap" as const]: resolveSpace(chartTheme?.gap, theme),
      ["--luna-scatter-chart-header-gap" as const]: resolveSpace(chartTheme?.headerGap, theme),
      ["--luna-scatter-chart-legend-gap" as const]: resolveSpace(chartTheme?.legendGap, theme),
      ["--luna-scatter-chart-height" as const]:
        resolveHeight(height, theme) ??
        resolveHeight(chartTheme?.chartHeight, theme),
      ["--luna-scatter-chart-point-size" as const]:
        resolveSpace(chartTheme?.pointSize, theme) ?? chartTheme?.pointSize,
      ["--luna-scatter-chart-bg" as const]:
        modeTokens?.bg ? resolveTokenValue(theme, modeTokens.bg) : undefined,
      ["--luna-scatter-chart-border" as const]:
        modeTokens?.border ? resolveTokenValue(theme, modeTokens.border) : undefined,
      ["--luna-scatter-chart-shadow" as const]:
        modeTokens?.shadow
          ? resolveScaleValue(theme.shadows, modeTokens.shadow) ??
            resolveTokenValue(theme, modeTokens.shadow)
          : undefined,
      ["--luna-scatter-chart-plot-bg" as const]:
        modeTokens?.plotBg ? resolveTokenValue(theme, modeTokens.plotBg) : undefined,
      ["--luna-scatter-chart-title-fg" as const]:
        modeTokens?.titleFg ? resolveTokenValue(theme, modeTokens.titleFg) : undefined,
      ["--luna-scatter-chart-description-fg" as const]:
        modeTokens?.descriptionFg ? resolveTokenValue(theme, modeTokens.descriptionFg) : undefined,
      ["--luna-scatter-chart-axis-text" as const]:
        modeTokens?.axisText ? resolveTokenValue(theme, modeTokens.axisText) : undefined,
      ["--luna-scatter-chart-axis-line" as const]:
        modeTokens?.axisLine ? resolveTokenValue(theme, modeTokens.axisLine) : undefined,
      ["--luna-scatter-chart-grid" as const]:
        modeTokens?.grid ? resolveTokenValue(theme, modeTokens.grid) : undefined,
      ["--luna-scatter-chart-legend-text" as const]:
        modeTokens?.legendText ? resolveTokenValue(theme, modeTokens.legendText) : undefined,
      ["--luna-scatter-chart-legend-meta-text" as const]:
        modeTokens?.legendMetaText ? resolveTokenValue(theme, modeTokens.legendMetaText) : undefined,
      ["--luna-scatter-chart-state-text" as const]:
        modeTokens?.stateText ? resolveTokenValue(theme, modeTokens.stateText) : undefined,
      ["--luna-scatter-chart-current-point-color" as const]: pointColor,
      ...style
    };

    return (
      <section
        {...props}
        ref={ref}
        className={toClassName(["luna-scatter-chart", className])}
        data-state={state}
        aria-busy={loading ? "true" : undefined}
        style={rootStyle}
      >
        {title || description ? (
          <header className="luna-scatter-chart__header">
            {title ? (
              typeof title === "string" ? (
                <LunaText as="h2" variant="title" className="luna-scatter-chart__title">
                  {title}
                </LunaText>
              ) : (
                <div className="luna-scatter-chart__title">{title}</div>
              )
            ) : null}
            {description ? (
              typeof description === "string" ? (
                <LunaText
                  as="p"
                  id={visibleDescriptionId}
                  variant="body-small"
                  className="luna-scatter-chart__description"
                >
                  {description}
                </LunaText>
              ) : (
                <div className="luna-scatter-chart__description" id={visibleDescriptionId}>
                  {description}
                </div>
              )
            ) : null}
          </header>
        ) : null}

        {assistiveDescriptionId ? (
          <p className="luna-scatter-chart__sr-only" id={assistiveDescriptionId}>
            {ariaDescription}
          </p>
        ) : null}

        {showLegend && state === "ready" ? (
          <div className="luna-scatter-chart__legend" aria-hidden="true">
            <span className="luna-scatter-chart__legend-swatch" />
            <span className="luna-scatter-chart__legend-copy">
              <span className="luna-scatter-chart__legend-label">{resolveLegendLabel(title)}</span>
              <span className="luna-scatter-chart__legend-meta">
                {normalizedData.length} point{normalizedData.length === 1 ? "" : "s"}
              </span>
            </span>
          </div>
        ) : null}

        <div
          className="luna-scatter-chart__visual"
          role="img"
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-roledescription="scatter chart"
        >
          {state === "ready" ? (
            <div className="luna-scatter-chart__frame">
              <div className="luna-scatter-chart__y-axis" aria-hidden="true">
                {yTicks.map((tick) => (
                  <span
                    className="luna-scatter-chart__y-axis-label"
                    key={`y-${tick.value}`}
                    style={{ bottom: `${tick.offset}%` }}
                  >
                    {tick.label}
                  </span>
                ))}
              </div>

              <div className="luna-scatter-chart__plot-shell">
                <div className="luna-scatter-chart__plot-surface">
                  {showGrid
                    ? yTicks.map((tick) => (
                        <span
                          aria-hidden="true"
                          className="luna-scatter-chart__grid-line luna-scatter-chart__grid-line--horizontal"
                          key={`grid-y-${tick.value}`}
                          style={{ bottom: `${tick.offset}%` }}
                        />
                      ))
                    : null}
                  {showGrid
                    ? xTicks.map((tick) => (
                        <span
                          aria-hidden="true"
                          className="luna-scatter-chart__grid-line luna-scatter-chart__grid-line--vertical"
                          key={`grid-x-${tick.value}`}
                          style={{ left: `${tick.offset}%` }}
                        />
                      ))
                    : null}
                  <span
                    aria-hidden="true"
                    className="luna-scatter-chart__axis-line luna-scatter-chart__axis-line--x"
                  />
                  <span
                    aria-hidden="true"
                    className="luna-scatter-chart__axis-line luna-scatter-chart__axis-line--y"
                  />
                  {plotPoints.map((point, index) => (
                    <span
                      aria-hidden="true"
                      className="luna-scatter-chart__point"
                      key={point.id ?? `${point.x}-${point.y}-${index}`}
                      style={{ left: `${point.left}%`, top: `${point.top}%` }}
                      title={`${point.safeLabel}: x ${formatAxisValue(point.x)}, y ${formatAxisValue(point.y)}`}
                    />
                  ))}
                </div>

                <div className="luna-scatter-chart__x-axis" aria-hidden="true">
                  {xTicks.map((tick) => (
                    <span
                      className="luna-scatter-chart__x-axis-label"
                      key={`x-${tick.value}`}
                      style={{ left: `${tick.offset}%` }}
                    >
                      {tick.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {state === "loading" ? (
            <div className="luna-scatter-chart__loading" aria-hidden="true">
              <div className="luna-scatter-chart__loading-axis">
                <LunaSkeleton inline width="8" />
                <LunaSkeleton inline width="10" />
                <LunaSkeleton inline width="8" />
                <LunaSkeleton inline width="9" />
              </div>
              <div className="luna-scatter-chart__loading-plot">
                <LunaSkeleton className="luna-scatter-chart__loading-surface" height="100%" shape="block" />
                <span className="luna-scatter-chart__loading-dot luna-scatter-chart__loading-dot--one" />
                <span className="luna-scatter-chart__loading-dot luna-scatter-chart__loading-dot--two" />
                <span className="luna-scatter-chart__loading-dot luna-scatter-chart__loading-dot--three" />
              </div>
              <div className="luna-scatter-chart__loading-axis luna-scatter-chart__loading-axis--x">
                <LunaSkeleton inline width="10" />
                <LunaSkeleton inline width="8" />
                <LunaSkeleton inline width="11" />
                <LunaSkeleton inline width="9" />
              </div>
            </div>
          ) : null}

          {state === "empty" ? (
            <LunaEmptyState
              className="luna-scatter-chart__state"
              framed={false}
              title="No chart data"
              description={emptyState}
            />
          ) : null}

          {state === "error" ? (
            <LunaEmptyState
              className="luna-scatter-chart__state"
              framed={false}
              title="Unable to display chart"
              description={error}
            />
          ) : null}
        </div>

        <p className="luna-scatter-chart__sr-only" id={summaryId}>
          {createSummary(state, normalizedData, xDomain, yDomain, title, error)}
        </p>
      </section>
    );
  }
);
