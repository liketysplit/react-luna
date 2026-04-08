import type React from "react";

export type LunaScatterChartDatum = {
  id?: string;
  label?: string;
  x: number;
  y: number;
};

export type LunaScatterChartProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "color" | "title"
> & {
  ariaLabel: string;
  ariaDescription?: string;
  data: LunaScatterChartDatum[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  emptyState?: React.ReactNode;
  error?: React.ReactNode;
  height?: React.CSSProperties["height"];
  loading?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
};
