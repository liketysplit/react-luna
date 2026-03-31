import React from "react";
import type { LunaMetricCardProps, LunaMetricCardTrend } from "./LunaMetricCard.props";
import "./LunaMetricCard.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getTrendLabel(trend: LunaMetricCardTrend | undefined) {
  if (trend === undefined) {
    return null;
  }

  if (trend === "up") {
    return "Up";
  }

  if (trend === "down") {
    return "Down";
  }

  return "Flat";
}

export const LunaMetricCard = React.forwardRef<HTMLElement, LunaMetricCardProps>(
  function LunaMetricCard(
    {
      as,
      className,
      delta,
      label,
      meta,
      style,
      tone = "default",
      trend,
      value,
      visual,
      ...props
    },
    ref
  ) {
    const Component = (as ?? "section") as React.ElementType;
    const labelId = React.useId();
    const valueId = React.useId();
    const deltaId = React.useId();
    const metaId = React.useId();
    const trendLabel = getTrendLabel(trend);
    const hasFooter = delta !== undefined || delta === 0 || meta !== undefined || meta === 0;
    const describedBy = [
      delta !== undefined || delta === 0 ? deltaId : null,
      meta !== undefined || meta === 0 ? metaId : null
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName(["luna-metric-card", className])}
        data-tone={tone}
        data-trend={trend}
        data-has-visual={visual ? "true" : undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-describedby={describedBy || undefined}
        style={style}
      >
        <div className="luna-metric-card__content">
          <div className="luna-metric-card__header">
            <div className="luna-metric-card__label" id={labelId}>
              {label}
            </div>
          </div>
          <div className="luna-metric-card__value" id={valueId}>
            {value}
          </div>
          {hasFooter ? (
            <div className="luna-metric-card__footer">
              {delta !== undefined || delta === 0 ? (
                <div className="luna-metric-card__delta" id={deltaId}>
                  {trendLabel ? (
                    <>
                      <span aria-hidden="true" className="luna-metric-card__trend-dot" />
                      <span className="luna-metric-card__trend-label">{trendLabel}</span>
                    </>
                  ) : null}
                  <span className="luna-metric-card__delta-value">{delta}</span>
                </div>
              ) : null}
              {meta !== undefined || meta === 0 ? (
                <div className="luna-metric-card__meta" id={metaId}>
                  {meta}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {visual ? <div className="luna-metric-card__visual">{visual}</div> : null}
      </Component>
    );
  }
);
