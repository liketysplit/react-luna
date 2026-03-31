import type React from "react";

export type LunaLineChartDatum = {
  label: string;
  value: number;
};

export type LunaLineChartProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  data: LunaLineChartDatum[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  ariaLabel?: string;
  ariaDescription?: string;
  legendLabel?: React.ReactNode;
  showLegend?: boolean;
  showGrid?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
};
