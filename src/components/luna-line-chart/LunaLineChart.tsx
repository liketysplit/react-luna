import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaSpinner } from "../luna-spinner";
import { LunaText } from "../luna-text";
import type { LunaLineChartDatum, LunaLineChartProps } from "./LunaLineChart.props";
import "./LunaLineChart.css";

type LineChartCssVariable =
  | "--luna-line-chart-height"
  | "--luna-line-chart-padding"
  | "--luna-line-chart-radius"
  | "--luna-line-chart-bg"
  | "--luna-line-chart-border"
  | "--luna-line-chart-title-fg"
  | "--luna-line-chart-description-fg"
  | "--luna-line-chart-axis-fg"
  | "--luna-line-chart-axis-muted-fg"
  | "--luna-line-chart-grid"
  | "--luna-line-chart-line"
  | "--luna-line-chart-line-width"
  | "--luna-line-chart-marker-fill"
  | "--luna-line-chart-marker-stroke"
  | "--luna-line-chart-marker-size"
  | "--luna-line-chart-legend-fg"
  | "--luna-line-chart-state-bg"
  | "--luna-line-chart-state-border"
  | "--luna-line-chart-state-fg";

type LunaLineChartStyle = React.CSSProperties &
  Partial<Record<LineChartCssVariable, string | number | undefined>>;

type ChartGeometry = {
  width: number;
  height: number;
  plotLeft: number;
  plotTop: number;
  plotWidth: number;
  plotHeight: number;
};

type ChartPoint = LunaLineChartDatum & {
  x: number;
  y: number;
};

const warnedMessages = new Set<string>();
const CHART_GEOMETRY: ChartGeometry = {
  width: 360,
  height: 220,
  plotLeft: 44,
  plotTop: 18,
  plotWidth: 300,
  plotHeight: 166
};

function warnOnce(message: string) {
  if (!import.meta.env.DEV || warnedMessages.has(message)) {
    return;
  }

  warnedMessages.add(message);
  console.warn(message);
}

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpaceValue(
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

function resolveThemeColor(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveTokenValue(theme, value);
}

function resolveNumericString(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? value : String(parsedValue);
}

function getAccessibleName(
  ariaLabel: string | undefined,
  title: React.ReactNode,
  legendLabel: React.ReactNode
) {
  if (ariaLabel) {
    return ariaLabel;
  }

  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }

  if (typeof legendLabel === "string" && legendLabel.trim().length > 0) {
    return legendLabel;
  }

  warnOnce(
    "LunaLineChart: provide `ariaLabel` when `title` is not plain text so the chart has an accessible name."
  );
  return "Line chart";
}

function getAccessibleDescription(
  ariaDescription: string | undefined,
  description: React.ReactNode
) {
  if (ariaDescription) {
    return ariaDescription;
  }

  if (typeof description === "string" && description.trim().length > 0) {
    return description;
  }

  return undefined;
}

function getPointX(index: number, count: number, geometry: ChartGeometry) {
  if (count <= 1) {
    return geometry.plotLeft + geometry.plotWidth / 2;
  }

  return geometry.plotLeft + (index / (count - 1)) * geometry.plotWidth;
}

function getDomain(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const padding = Math.max(Math.abs(max) * 0.12, 1);
    return {
      min: min - padding,
      max: max + padding
    };
  }

  const padding = Math.max((max - min) * 0.12, 0.5);

  return {
    min: min - padding,
    max: max + padding
  };
}

function getPointY(value: number, domainMin: number, domainMax: number, geometry: ChartGeometry) {
  const ratio = (value - domainMin) / (domainMax - domainMin);
  return geometry.plotTop + geometry.plotHeight - ratio * geometry.plotHeight;
}

function buildChartPoints(data: LunaLineChartDatum[], geometry: ChartGeometry) {
  const values = data.map((datum) => datum.value);
  const domain = getDomain(values);
  const points = data.map((datum, index) => ({
    ...datum,
    x: getPointX(index, data.length, geometry),
    y: getPointY(datum.value, domain.min, domain.max, geometry)
  }));

  return {
    points,
    domain
  };
}

function buildLinePath(points: ChartPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function getYTicks(domainMin: number, domainMax: number, tickCount: number) {
  if (tickCount <= 1) {
    return [domainMax];
  }

  return Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);
    return domainMax - ratio * (domainMax - domainMin);
  });
}

function getVisibleXTickIndexes(count: number, maxTicks: number) {
  if (count <= 0) {
    return [];
  }

  if (count <= maxTicks) {
    return Array.from({ length: count }, (_, index) => index);
  }

  const step = (count - 1) / (maxTicks - 1);
  const indexes = new Set<number>();

  for (let tickIndex = 0; tickIndex < maxTicks; tickIndex += 1) {
    indexes.add(Math.round(tickIndex * step));
  }

  indexes.add(0);
  indexes.add(count - 1);

  return Array.from(indexes).sort((left, right) => left - right);
}

function formatAxisValue(value: number, range: number) {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  if (range < 5) {
    return value.toFixed(1).replace(/\.0$/, "");
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: range < 20 ? 1 : 0
  }).format(value);
}

function getLegendLabel(title: React.ReactNode, legendLabel: React.ReactNode) {
  if (legendLabel !== undefined && legendLabel !== null) {
    return legendLabel;
  }

  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }

  return "Series";
}

function renderStateBody(
  state: "loading" | "empty" | "error",
  error: React.ReactNode | undefined
) {
  if (state === "loading") {
    return (
      <>
        <LunaSpinner decorative={false} label="Loading line chart" />
        <LunaText as="span" variant="label" className="luna-line-chart__state-title">
          Loading chart
        </LunaText>
        <LunaText as="span" variant="body-small" className="luna-line-chart__state-description">
          Preparing the latest trend points for display.
        </LunaText>
      </>
    );
  }

  if (state === "error") {
    return (
      <>
        <LunaText as="span" variant="label" className="luna-line-chart__state-title">
          Chart unavailable
        </LunaText>
        <div className="luna-line-chart__state-description">
          {typeof error === "string" ? (
            <LunaText as="span" variant="body-small">
              {error}
            </LunaText>
          ) : (
            error
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <LunaText as="span" variant="label" className="luna-line-chart__state-title">
        No data yet
      </LunaText>
      <LunaText as="span" variant="body-small" className="luna-line-chart__state-description">
        Add at least one ordered value to render the chart surface.
      </LunaText>
    </>
  );
}

export const LunaLineChart = React.forwardRef<HTMLElement, LunaLineChartProps>(
  function LunaLineChart(
    {
      ariaDescription,
      ariaLabel,
      className,
      data,
      description,
      error,
      id,
      legendLabel,
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
    const baseId = id ?? `luna-line-chart-${reactId.replace(/:/g, "")}`;
    const descriptionId =
      description !== undefined && description !== null ? `${baseId}-description` : undefined;
    const hiddenDescriptionId = `${baseId}-aria-description`;
    const { mode, theme } = useTheme();
    const componentTheme = theme.components.lineChart;
    const modeTokens = componentTheme?.modes?.[mode];
    const resolvedAccessibleName = getAccessibleName(ariaLabel, title, legendLabel);
    const resolvedAccessibleDescription = getAccessibleDescription(ariaDescription, description);
    const state = loading ? "loading" : error ? "error" : data.length === 0 ? "empty" : "ready";
    const geometry = CHART_GEOMETRY;
    const resolvedHeight =
      resolveSpaceValue(componentTheme?.height, theme) ?? `${geometry.height / 16}rem`;
    const resolvedPadding = resolveSpaceValue(componentTheme?.padding, theme);
    const resolvedRadius = resolveRadiusValue(componentTheme?.radius, theme);
    const resolvedTickCount = Math.max(2, componentTheme?.yTickCount ?? 4);
    const resolvedMaxXTicks = Math.max(2, componentTheme?.maxXTicks ?? 6);
    const resolvedMarkerThreshold = Math.max(1, componentTheme?.markerThreshold ?? 12);
    const resolvedLegendLabel = getLegendLabel(title, legendLabel);
    const lineWidth = resolveNumericString(componentTheme?.lineWidth) ?? "3";
    const markerSize = resolveNumericString(componentTheme?.markerSize) ?? "4.5";
    const chartStyle: LunaLineChartStyle = {
      ["--luna-line-chart-height" as const]: resolvedHeight,
      ["--luna-line-chart-padding" as const]: resolvedPadding,
      ["--luna-line-chart-radius" as const]: resolvedRadius,
      ["--luna-line-chart-bg" as const]: resolveThemeColor(modeTokens?.bg, theme),
      ["--luna-line-chart-border" as const]: resolveThemeColor(modeTokens?.border, theme),
      ["--luna-line-chart-title-fg" as const]: resolveThemeColor(modeTokens?.titleFg, theme),
      ["--luna-line-chart-description-fg" as const]: resolveThemeColor(
        modeTokens?.descriptionFg,
        theme
      ),
      ["--luna-line-chart-axis-fg" as const]: resolveThemeColor(modeTokens?.axisFg, theme),
      ["--luna-line-chart-axis-muted-fg" as const]: resolveThemeColor(
        modeTokens?.axisMutedFg,
        theme
      ),
      ["--luna-line-chart-grid" as const]: resolveThemeColor(modeTokens?.grid, theme),
      ["--luna-line-chart-line" as const]: resolveThemeColor(modeTokens?.line, theme),
      ["--luna-line-chart-line-width" as const]: lineWidth,
      ["--luna-line-chart-marker-fill" as const]: resolveThemeColor(modeTokens?.markerFill, theme),
      ["--luna-line-chart-marker-stroke" as const]: resolveThemeColor(
        modeTokens?.markerStroke,
        theme
      ),
      ["--luna-line-chart-marker-size" as const]: markerSize,
      ["--luna-line-chart-legend-fg" as const]: resolveThemeColor(modeTokens?.legendFg, theme),
      ["--luna-line-chart-state-bg" as const]: resolveThemeColor(modeTokens?.stateBg, theme),
      ["--luna-line-chart-state-border" as const]: resolveThemeColor(
        modeTokens?.stateBorder,
        theme
      ),
      ["--luna-line-chart-state-fg" as const]: resolveThemeColor(modeTokens?.stateFg, theme),
      ...style
    };

    const chart =
      state === "ready"
        ? buildChartPoints(data, geometry)
        : {
            points: [] as ChartPoint[],
            domain: { min: 0, max: 0 }
          };
    const linePath = chart.points.length > 1 ? buildLinePath(chart.points) : undefined;
    const showMarkers = chart.points.length > 0 && chart.points.length <= resolvedMarkerThreshold;
    const yTicks = getYTicks(chart.domain.min, chart.domain.max, resolvedTickCount);
    const visibleXTickIndexes = getVisibleXTickIndexes(data.length, resolvedMaxXTicks);
    const valueRange = chart.domain.max - chart.domain.min;

    return (
      <section
        {...props}
        ref={ref}
        className={toClassName(["luna-line-chart", className])}
        data-grid={showGrid ? "true" : undefined}
        data-state={state}
        style={chartStyle}
      >
        {title || description ? (
          <div className="luna-line-chart__header">
            {title !== undefined && title !== null ? (
              typeof title === "string" ? (
                <LunaText as="h2" variant="label" className="luna-line-chart__title">
                  {title}
                </LunaText>
              ) : (
                <div className="luna-line-chart__title">{title}</div>
              )
            ) : null}
            {description !== undefined && description !== null ? (
              typeof description === "string" ? (
                <LunaText
                  as="p"
                  id={descriptionId}
                  variant="body-small"
                  className="luna-line-chart__description"
                >
                  {description}
                </LunaText>
              ) : (
                <div className="luna-line-chart__description" id={descriptionId}>
                  {description}
                </div>
              )
            ) : null}
          </div>
        ) : null}

        {showLegend ? (
          <div className="luna-line-chart__legend" aria-hidden="true">
            <span className="luna-line-chart__legend-swatch" />
            <span className="luna-line-chart__legend-label">{resolvedLegendLabel}</span>
          </div>
        ) : null}

        {resolvedAccessibleDescription ? (
          <span className="luna-line-chart__sr-only" id={hiddenDescriptionId}>
            {resolvedAccessibleDescription}
          </span>
        ) : null}

        {state === "ready" ? (
          <div
            aria-describedby={resolvedAccessibleDescription ? hiddenDescriptionId : descriptionId}
            aria-label={resolvedAccessibleName}
            className="luna-line-chart__surface"
            role="img"
          >
            <svg
              aria-hidden="true"
              className="luna-line-chart__svg"
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            >
              {showGrid
                ? yTicks.map((tick) => {
                    const y = getPointY(tick, chart.domain.min, chart.domain.max, geometry);
                    return (
                      <line
                        className="luna-line-chart__grid-line"
                        key={`grid-${tick}`}
                        x1={geometry.plotLeft}
                        x2={geometry.plotLeft + geometry.plotWidth}
                        y1={y}
                        y2={y}
                      />
                    );
                  })
                : null}

              <line
                className="luna-line-chart__axis-line"
                x1={geometry.plotLeft}
                x2={geometry.plotLeft + geometry.plotWidth}
                y1={geometry.plotTop + geometry.plotHeight}
                y2={geometry.plotTop + geometry.plotHeight}
              />

              {yTicks.map((tick) => {
                const y = getPointY(tick, chart.domain.min, chart.domain.max, geometry);
                return (
                  <text
                    className="luna-line-chart__axis-label"
                    key={`tick-${tick}`}
                    textAnchor="end"
                    x={geometry.plotLeft - 8}
                    y={y + 4}
                  >
                    {formatAxisValue(tick, valueRange)}
                  </text>
                );
              })}

              {visibleXTickIndexes.map((index) => {
                const point = chart.points[index];
                return (
                  <text
                    className="luna-line-chart__axis-label luna-line-chart__axis-label--muted"
                    key={point.label}
                    textAnchor={index === 0 ? "start" : index === data.length - 1 ? "end" : "middle"}
                    x={point.x}
                    y={geometry.plotTop + geometry.plotHeight + 24}
                  >
                    {point.label}
                  </text>
                );
              })}

              {linePath ? <path className="luna-line-chart__line" d={linePath} /> : null}

              {chart.points.length === 1 ? (
                <circle
                  className="luna-line-chart__marker luna-line-chart__marker--solo"
                  cx={chart.points[0].x}
                  cy={chart.points[0].y}
                  r={Number(markerSize) || 4.5}
                />
              ) : null}

              {showMarkers
                ? chart.points.map((point, index) => (
                    <circle
                      className="luna-line-chart__marker"
                      cx={point.x}
                      cy={point.y}
                      data-current={index === chart.points.length - 1 ? "true" : undefined}
                      key={`${point.label}-${point.value}`}
                      r={Number(markerSize) || 4.5}
                    />
                  ))
                : null}
            </svg>
          </div>
        ) : (
          <div
            className="luna-line-chart__state"
            role={state === "error" ? "alert" : state === "loading" ? "status" : "note"}
          >
            {renderStateBody(state, error)}
          </div>
        )}
      </section>
    );
  }
);
