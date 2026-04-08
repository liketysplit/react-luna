import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaSkeleton } from "../luna-skeleton";
import { LunaText } from "../luna-text";
import type { LunaPieChartDatum, LunaPieChartProps } from "./LunaPieChart.props";
import "./LunaPieChart.css";

type PieChartCssVariable =
  | "--luna-pie-chart-current-radius"
  | "--luna-pie-chart-current-chart-size"
  | "--luna-pie-chart-current-gap"
  | "--luna-pie-chart-current-legend-gap"
  | "--luna-pie-chart-current-legend-swatch-size"
  | "--luna-pie-chart-current-min-height"
  | "--luna-pie-chart-current-bg"
  | "--luna-pie-chart-current-border"
  | "--luna-pie-chart-current-shadow"
  | "--luna-pie-chart-current-chart-bg"
  | "--luna-pie-chart-current-separator"
  | "--luna-pie-chart-title-fg"
  | "--luna-pie-chart-description-fg"
  | "--luna-pie-chart-legend-fg"
  | "--luna-pie-chart-legend-value-fg"
  | "--luna-pie-chart-empty-fg"
  | "--luna-pie-chart-loading-fg"
  | "--luna-pie-chart-error-fg";

type LunaPieChartStyle = React.CSSProperties &
  Partial<Record<PieChartCssVariable, string | number | undefined>>;

type NormalizedDatum = LunaPieChartDatum & {
  color: string;
  percent: number;
  ratio: number;
  value: number;
};

const SVG_SIZE = 200;
const SVG_CENTER = SVG_SIZE / 2;
const SVG_RADIUS = 88;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1
  }).format(value);
}

function formatPercent(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded.toFixed(0)}%` : `${rounded}%`;
}

function resolveSpace(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveRadius(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function resolveShadow(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.shadows, value) ?? value;
}

function resolveSizeProfile(size: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!size) {
    return undefined;
  }

  return theme.components.pieChart?.sizes?.[size];
}

function polarToCartesian(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: SVG_CENTER + SVG_RADIUS * Math.cos(radians),
    y: SVG_CENTER + SVG_RADIUS * Math.sin(radians)
  };
}

function buildSlicePath(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${SVG_CENTER} ${SVG_CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${SVG_RADIUS} ${SVG_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z"
  ].join(" ");
}

function normalizeData(
  data: LunaPieChartDatum[],
  palette: string[],
  theme: ReturnType<typeof useTheme>["theme"]
) {
  const sanitizedValues = data.map((item) => ({
    ...item,
    value: Number.isFinite(item.value) && item.value > 0 ? item.value : 0
  }));
  const total = sanitizedValues.reduce((sum, item) => sum + item.value, 0);

  const normalized = sanitizedValues.map((item, index) => {
    const ratio = total > 0 ? item.value / total : 0;

    return {
      ...item,
      color: resolveTokenValue(theme, item.color ?? palette[index % palette.length] ?? "primary.500"),
      percent: ratio * 100,
      ratio
    } satisfies NormalizedDatum;
  });

  return {
    data: normalized,
    total,
    slices: normalized.filter((item) => item.value > 0)
  };
}

function createSummary(
  state: "ready" | "empty" | "loading" | "error",
  title: React.ReactNode | undefined,
  total: number,
  data: NormalizedDatum[]
) {
  const titleText = typeof title === "string" ? `${title}. ` : "";

  if (state === "loading") {
    return `${titleText}Loading chart data.`;
  }

  if (state === "error") {
    return `${titleText}Chart data could not be shown because the component is in an error state.`;
  }

  if (state === "empty") {
    return `${titleText}No chart data is available.`;
  }

  return `${titleText}Total ${formatNumber(total)} across ${data.length} categories. ${data
    .map((item) => `${item.label}: ${formatPercent(item.percent)} (${formatNumber(item.value)})`)
    .join(". ")}.`;
}

export const LunaPieChart = React.forwardRef<HTMLDivElement, LunaPieChartProps>(
  function LunaPieChart(
    {
      ariaLabel,
      className,
      data,
      description,
      empty,
      error,
      id,
      loading = false,
      showLegend = true,
      size,
      style,
      title,
      ...props
    },
    ref
  ) {
    const reactId = React.useId();
    const baseId = id ?? `luna-pie-chart-${reactId.replace(/:/g, "")}`;
    const descriptionId = description !== undefined && description !== null ? `${baseId}-description` : undefined;
    const summaryId = `${baseId}-summary`;
    const { theme, mode } = useTheme();
    const resolvedSize = size ?? theme.components.pieChart?.defaultSize ?? "medium";
    const sizeProfile = resolveSizeProfile(resolvedSize, theme);
    const modeTokens = theme.components.pieChart?.modes?.[mode];
    const palette = theme.components.pieChart?.palette ?? [];
    const normalized = normalizeData(data, palette, theme);
    const state = loading ? "loading" : error ? "error" : normalized.total <= 0 ? "empty" : "ready";
    const describedBy = [descriptionId, summaryId].filter(Boolean).join(" ") || undefined;

    const rootStyle: LunaPieChartStyle = {
      ["--luna-pie-chart-current-radius" as const]: resolveRadius(
        theme.components.pieChart?.radius,
        theme
      ),
      ["--luna-pie-chart-current-chart-size" as const]:
        resolveSpace(sizeProfile?.chartSize, theme) ?? sizeProfile?.chartSize,
      ["--luna-pie-chart-current-gap" as const]: resolveSpace(sizeProfile?.gap, theme),
      ["--luna-pie-chart-current-legend-gap" as const]: resolveSpace(sizeProfile?.legendGap, theme),
      ["--luna-pie-chart-current-legend-swatch-size" as const]: resolveSpace(
        sizeProfile?.legendSwatchSize,
        theme
      ),
      ["--luna-pie-chart-current-min-height" as const]:
        resolveSpace(sizeProfile?.minHeight, theme) ?? sizeProfile?.minHeight,
      ["--luna-pie-chart-current-bg" as const]: modeTokens?.bg
        ? resolveTokenValue(theme, modeTokens.bg)
        : undefined,
      ["--luna-pie-chart-current-border" as const]: modeTokens?.border
        ? resolveTokenValue(theme, modeTokens.border)
        : undefined,
      ["--luna-pie-chart-current-shadow" as const]: resolveShadow(modeTokens?.shadow, theme),
      ["--luna-pie-chart-current-chart-bg" as const]: modeTokens?.chartBg
        ? resolveTokenValue(theme, modeTokens.chartBg)
        : undefined,
      ["--luna-pie-chart-current-separator" as const]: modeTokens?.separator
        ? resolveTokenValue(theme, modeTokens.separator)
        : undefined,
      ["--luna-pie-chart-title-fg" as const]: modeTokens?.titleFg
        ? resolveTokenValue(theme, modeTokens.titleFg)
        : undefined,
      ["--luna-pie-chart-description-fg" as const]: modeTokens?.descriptionFg
        ? resolveTokenValue(theme, modeTokens.descriptionFg)
        : undefined,
      ["--luna-pie-chart-legend-fg" as const]: modeTokens?.legendFg
        ? resolveTokenValue(theme, modeTokens.legendFg)
        : undefined,
      ["--luna-pie-chart-legend-value-fg" as const]: modeTokens?.legendValueFg
        ? resolveTokenValue(theme, modeTokens.legendValueFg)
        : undefined,
      ["--luna-pie-chart-empty-fg" as const]: modeTokens?.emptyFg
        ? resolveTokenValue(theme, modeTokens.emptyFg)
        : undefined,
      ["--luna-pie-chart-loading-fg" as const]: modeTokens?.loadingFg
        ? resolveTokenValue(theme, modeTokens.loadingFg)
        : undefined,
      ["--luna-pie-chart-error-fg" as const]: modeTokens?.errorFg
        ? resolveTokenValue(theme, modeTokens.errorFg)
        : undefined,
      ...style
    };

    let currentAngle = 0;
    const summary = createSummary(state, title, normalized.total, normalized.data);

    return (
      <div
        {...props}
        ref={ref}
        className={toClassName(["luna-pie-chart", className])}
        data-size={resolvedSize}
        data-state={state}
        style={rootStyle}
      >
        {title || description ? (
          <header className="luna-pie-chart__header">
            {title ? (
              typeof title === "string" ? (
                <LunaText as="h2" variant="title" className="luna-pie-chart__title">
                  {title}
                </LunaText>
              ) : (
                <div className="luna-pie-chart__title">{title}</div>
              )
            ) : null}
            {description ? (
              typeof description === "string" ? (
                <LunaText
                  as="p"
                  id={descriptionId}
                  variant="body-small"
                  className="luna-pie-chart__description"
                >
                  {description}
                </LunaText>
              ) : (
                <div className="luna-pie-chart__description" id={descriptionId}>
                  {description}
                </div>
              )
            ) : null}
          </header>
        ) : null}
        <div className="luna-pie-chart__content">
          <div className="luna-pie-chart__visual-shell">
            {state === "ready" ? (
              <svg
                aria-describedby={describedBy}
                aria-label={ariaLabel}
                className="luna-pie-chart__svg"
                role="img"
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              >
                <circle
                  aria-hidden="true"
                  className="luna-pie-chart__track"
                  cx={SVG_CENTER}
                  cy={SVG_CENTER}
                  r={SVG_RADIUS}
                />
                {normalized.slices.length === 1 ? (
                  <circle
                    aria-hidden="true"
                    className="luna-pie-chart__slice"
                    cx={SVG_CENTER}
                    cy={SVG_CENTER}
                    fill={normalized.slices[0]?.color}
                    r={SVG_RADIUS}
                  />
                ) : (
                  normalized.slices.map((item) => {
                    const startAngle = currentAngle;
                    const endAngle = startAngle + item.ratio * 360;
                    currentAngle = endAngle;

                    return (
                      <path
                        aria-hidden="true"
                        className="luna-pie-chart__slice"
                        d={buildSlicePath(startAngle, endAngle)}
                        fill={item.color}
                        key={item.id ?? `${item.label}-${startAngle}`}
                      />
                    );
                  })
                )}
              </svg>
            ) : null}
            {state === "loading" ? (
              <div className="luna-pie-chart__placeholder" aria-hidden="true">
                <LunaSkeleton
                  className="luna-pie-chart__loading-chart"
                  height="var(--luna-pie-chart-current-chart-size)"
                  shape="circle"
                  width="var(--luna-pie-chart-current-chart-size)"
                />
                <div className="luna-pie-chart__loading-copy">
                  <LunaSkeleton height="1rem" width="8rem" />
                  <LunaSkeleton height="0.875rem" width="10rem" />
                </div>
              </div>
            ) : null}
            {state === "empty" ? (
              <div className="luna-pie-chart__state" role="status">
                <div aria-hidden="true" className="luna-pie-chart__empty-orbit" />
                <LunaText variant="label" className="luna-pie-chart__state-title">
                  Nothing to plot yet
                </LunaText>
                <LunaText variant="body-small" className="luna-pie-chart__state-copy">
                  {typeof empty === "string"
                    ? empty
                    : "Add at least one positive category value to render the chart."}
                </LunaText>
                {empty && typeof empty !== "string" ? (
                  <div className="luna-pie-chart__state-slot">{empty}</div>
                ) : null}
              </div>
            ) : null}
            {state === "error" ? (
              <div className="luna-pie-chart__state" role="alert">
                <div aria-hidden="true" className="luna-pie-chart__error-badge">
                  !
                </div>
                <LunaText variant="label" className="luna-pie-chart__state-title">
                  Chart unavailable
                </LunaText>
                {typeof error === "string" ? (
                  <LunaText variant="body-small" className="luna-pie-chart__state-copy">
                    {error}
                  </LunaText>
                ) : (
                  <div className="luna-pie-chart__state-slot">{error}</div>
                )}
              </div>
            ) : null}
          </div>
          {state === "ready" ? (
            <ul
              className={toClassName([
                "luna-pie-chart__legend",
                !showLegend && "luna-pie-chart__legend--hidden"
              ])}
            >
              {normalized.data.map((item, index) => (
                <li
                  className="luna-pie-chart__legend-item"
                  data-index={String(index)}
                  key={item.id ?? `${item.label}-${index}`}
                >
                  <span
                    aria-hidden="true"
                    className="luna-pie-chart__legend-swatch"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="luna-pie-chart__legend-copy">
                    <LunaText as="span" variant="label" className="luna-pie-chart__legend-label">
                      {item.label}
                    </LunaText>
                    <LunaText
                      as="span"
                      variant="caption"
                      className="luna-pie-chart__legend-value"
                    >
                      {formatPercent(item.percent)} • {formatNumber(item.value)}
                    </LunaText>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <span className="luna-pie-chart__sr-only" id={summaryId}>
          {summary}
        </span>
      </div>
    );
  }
);
