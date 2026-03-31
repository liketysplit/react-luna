import type React from "react";

export type LunaBarChartDatum = {
  label: string;
  value: number;
};

export type LunaBarChartProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "color" | "title"
> & {
  data: LunaBarChartDatum[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  ariaLabel: string;
  showLegend?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
};
