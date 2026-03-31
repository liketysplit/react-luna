import type React from "react";

export type LunaMetricCardTone = "default" | "info" | "success" | "warning" | "danger";
export type LunaMetricCardTrend = "up" | "down" | "neutral";

export type LunaMetricCardProps = Omit<React.HTMLAttributes<HTMLElement>, "children" | "title"> & {
  as?: React.ElementType;
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  trend?: LunaMetricCardTrend;
  meta?: React.ReactNode;
  tone?: LunaMetricCardTone;
  visual?: React.ReactNode;
};
