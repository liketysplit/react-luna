import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaEmptyState } from "../luna-empty-state";
import { LunaSkeleton } from "../luna-skeleton";
import type { LunaBarChartDatum, LunaBarChartProps } from "./LunaBarChart.props";
import "./LunaBarChart.css";

type BarChartCssVariable =
  | "--luna-bar-chart-radius"
  | "--luna-bar-chart-padding"
  | "--luna-bar-chart-header-gap"
  | "--luna-bar-chart-legend-gap"
  | "--luna-bar-chart-height"
  | "--luna-bar-chart-bar-gap"
  | "--luna-bar-chart-bar-min-width"
  | "--luna-bar-chart-bg"
  | "--luna-bar-chart-border"
  | "--luna-bar-chart-axis-text"
  | "--luna-bar-chart-axis-grid"
  | "--luna-bar-chart-legend-text"
  | "--luna-bar-chart-value-text"
  | "--luna-bar-chart-state-text";

type LunaBarChartStyle = React.CSSProperties &
  Partial<Record<BarChartCssVariable, string | number | undefined>>;

type BarStyle = React.CSSProperties & {
  "--luna-bar-chart-current-bar-color": string;
  "--luna-bar-chart-current-bar-percent": string;
};

type NormalizedDatum = LunaBarChartDatum & {
  safeLabel: string;
  normalizedValue: number;
  formattedValue: string;
  percent: number;
  color: string;
};

const DEFAULT_PALETTE = [
  "primary.500",
  "accent.500",
  "success.500",
  "warning.500",
  "danger.500"
];

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveDimensionValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveRadiusValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function normalizeValue(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

function getNiceMaxValue(value: number) {
  if (value <= 0) {
    return 1;
  }

  const exponent = Math.pow(10, Math.floor(Math.log10(value)));
  const fraction = value / exponent;

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

function buildNumberFormatter(maxValue: number) {
  return new Intl.NumberFormat(undefined, {
    notation: maxValue >= 1000 ? "compact" : "standard",
    maximumFractionDigits: maxValue >= 10 ? 0 : 1
  });
}

function buildTicks(maxValue: number) {
  const tickCount = 5;
  const step = maxValue / (tickCount - 1);

  return Array.from({ length: tickCount }, (_, index) =>
    Number((maxValue - step * index).toFixed(4))
  );
}

function resolveLegendLabel(title: React.ReactNode) {
  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }

  return "Values";
}

export const LunaBarChart = React.forwardRef<HTMLElement, LunaBarChartProps>(
  function LunaBarChart(
    {
      ariaLabel,
      className,
      data,
      description,
      emptyState = "Add categorical values to render this comparison.",
      error,
      loading = false,
      showLegend = false,
      style,
      title,
      ...props
    },
    ref
  ) {
    const reactId = React.useId();
    const baseId = `luna-bar-chart-${reactId.replace(/:/g, "")}`;
    const descriptionId =
      description !== undefined && description !== null ? `${baseId}-description` : undefined;
    const summaryId = `${baseId}-summary`;
    const { theme, mode } = useTheme();
    const chartTheme = theme.components.barChart;
    const modeTokens = chartTheme?.modes?.[mode];
    const resolvedRadius = resolveRadiusValue(chartTheme?.radius, theme);
    const resolvedPadding = resolveDimensionValue(chartTheme?.padding, theme);
    const resolvedHeaderGap = resolveDimensionValue(chartTheme?.headerGap, theme);
    const resolvedLegendGap = resolveDimensionValue(chartTheme?.legendGap, theme);
    const resolvedHeight = resolveDimensionValue(chartTheme?.chartHeight, theme);
    const resolvedBarGap = resolveDimensionValue(chartTheme?.barGap, theme);
    const resolvedBarMinWidth = resolveDimensionValue(chartTheme?.barMinWidth, theme);
    const paletteTokens = chartTheme?.palette?.length ? chartTheme.palette : DEFAULT_PALETTE;
    const resolvedPalette = paletteTokens.map((token) => resolveTokenValue(theme, token));
    const resolvedMaxValue = getNiceMaxValue(
      data.reduce((max, item) => Math.max(max, normalizeValue(item.value)), 0)
    );
    const numberFormatter = buildNumberFormatter(resolvedMaxValue);
    const ticks = buildTicks(resolvedMaxValue);
    const normalizedData: NormalizedDatum[] = data.map((item, index) => {
      const normalizedValue = normalizeValue(item.value);
      return {
        ...item,
        safeLabel: item.label.trim().length > 0 ? item.label : `Item ${index + 1}`,
        normalizedValue,
        formattedValue: numberFormatter.format(normalizedValue),
        percent: (normalizedValue / resolvedMaxValue) * 100,
        color:
          resolvedPalette[index % resolvedPalette.length] ?? resolveTokenValue(theme, "primary.500")
      };
    });

    const state = error ? "error" : loading ? "loading" : normalizedData.length === 0 ? "empty" : "ready";
    const chartSummary =
      state === "loading"
        ? "Chart loading."
        : state === "error"
          ? typeof error === "string"
            ? error
            : "Chart data is unavailable."
          : state === "empty"
            ? typeof emptyState === "string"
              ? emptyState
              : "No chart data is available."
            : normalizedData.map((item) => `${item.safeLabel}: ${item.formattedValue}`).join("; ");
    const rootStyle: LunaBarChartStyle = {
      ["--luna-bar-chart-radius" as const]: resolvedRadius,
      ["--luna-bar-chart-padding" as const]: resolvedPadding,
      ["--luna-bar-chart-header-gap" as const]: resolvedHeaderGap,
      ["--luna-bar-chart-legend-gap" as const]: resolvedLegendGap,
      ["--luna-bar-chart-height" as const]: resolvedHeight,
      ["--luna-bar-chart-bar-gap" as const]: resolvedBarGap,
      ["--luna-bar-chart-bar-min-width" as const]: resolvedBarMinWidth,
      ["--luna-bar-chart-bg" as const]:
        modeTokens?.bg ? resolveTokenValue(theme, modeTokens.bg) : undefined,
      ["--luna-bar-chart-border" as const]:
        modeTokens?.border ? resolveTokenValue(theme, modeTokens.border) : undefined,
      ["--luna-bar-chart-axis-text" as const]:
        modeTokens?.axisText ? resolveTokenValue(theme, modeTokens.axisText) : undefined,
      ["--luna-bar-chart-axis-grid" as const]:
        modeTokens?.axisGrid ? resolveTokenValue(theme, modeTokens.axisGrid) : undefined,
      ["--luna-bar-chart-legend-text" as const]:
        modeTokens?.legendText ? resolveTokenValue(theme, modeTokens.legendText) : undefined,
      ["--luna-bar-chart-value-text" as const]:
        modeTokens?.valueText ? resolveTokenValue(theme, modeTokens.valueText) : undefined,
      ["--luna-bar-chart-state-text" as const]:
        modeTokens?.stateText ? resolveTokenValue(theme, modeTokens.stateText) : undefined,
      ...style
    };

    return (
      <section
        {...props}
        ref={ref}
        className={toClassName(["luna-bar-chart", className])}
        data-state={state}
        aria-busy={loading ? "true" : undefined}
        style={rootStyle}
      >
        {title || description ? (
          <div className="luna-bar-chart__header">
            {title ? <div className="luna-bar-chart__title">{title}</div> : null}
            {description ? (
              <div className="luna-bar-chart__description" id={descriptionId}>
                {description}
              </div>
            ) : null}
          </div>
        ) : null}
        {showLegend && state === "ready" ? (
          <div className="luna-bar-chart__legend" aria-hidden="true">
            <span className="luna-bar-chart__legend-swatch" />
            <span className="luna-bar-chart__legend-label">{resolveLegendLabel(title)}</span>
          </div>
        ) : null}
        <div
          className="luna-bar-chart__visual"
          role="img"
          aria-label={ariaLabel}
          aria-describedby={[descriptionId, summaryId].filter(Boolean).join(" ") || undefined}
          aria-roledescription="bar chart"
        >
          {state === "loading" ? (
            <div className="luna-bar-chart__loading" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="luna-bar-chart__loading-column" key={index}>
                  <LunaSkeleton
                    className="luna-bar-chart__loading-value"
                    inline
                    shape="text"
                    width={index % 2 === 0 ? "12" : "10"}
                  />
                  <LunaSkeleton
                    className="luna-bar-chart__loading-bar"
                    height={`${48 + index * 12}px`}
                    shape="block"
                    width="100%"
                  />
                  <LunaSkeleton
                    className="luna-bar-chart__loading-label"
                    inline
                    shape="text"
                    width={index % 2 === 0 ? "14" : "16"}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {state === "error" ? (
            <LunaEmptyState
              className="luna-bar-chart__state"
              framed={false}
              title="Unable to display chart"
              description={error}
            />
          ) : null}
          {state === "empty" ? (
            <LunaEmptyState
              className="luna-bar-chart__state"
              framed={false}
              title="No chart data"
              description={emptyState}
            />
          ) : null}
          {state === "ready" ? (
            <div className="luna-bar-chart__plot">
              <div className="luna-bar-chart__axis" aria-hidden="true">
                {ticks.map((tick) => (
                  <div className="luna-bar-chart__axis-row" key={tick}>
                    <span className="luna-bar-chart__axis-label">
                      {numberFormatter.format(tick)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="luna-bar-chart__plot-scroll">
                <div className="luna-bar-chart__plot-surface">
                  <div className="luna-bar-chart__grid" aria-hidden="true">
                    {ticks.map((tick) => (
                      <span className="luna-bar-chart__grid-line" key={tick} />
                    ))}
                  </div>
                  <div className="luna-bar-chart__bars">
                    {normalizedData.map((item) => {
                      const barStyle: BarStyle = {
                        "--luna-bar-chart-current-bar-color": item.color,
                        "--luna-bar-chart-current-bar-percent": `${item.percent}%`
                      };

                      return (
                        <div className="luna-bar-chart__column" key={item.safeLabel}>
                          <span className="luna-bar-chart__value" title={item.formattedValue}>
                            {item.formattedValue}
                          </span>
                          <div className="luna-bar-chart__bar-track">
                            <span
                              aria-hidden="true"
                              className="luna-bar-chart__bar"
                              style={barStyle}
                            />
                          </div>
                          <span className="luna-bar-chart__category" title={item.safeLabel}>
                            {item.safeLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <p className="luna-bar-chart__sr-only" id={summaryId}>
          {chartSummary}
        </p>
      </section>
    );
  }
);
