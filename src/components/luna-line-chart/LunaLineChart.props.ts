import type React from "react";

export type LunaLineChartDatum = {
  x: string | number | Date;
  y: number;
};

export type LunaLineChartLabelFormatterContext = {
  index: number;
  points: LunaLineChartDatum[];
};

export type LunaLineChartProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "color" | "title"
> & {
  ariaLabel: string;
  ariaDescription?: string;
  data: LunaLineChartDatum[];
  emptyDescription?: React.ReactNode;
  emptyTitle?: React.ReactNode;
  error?: React.ReactNode;
  errorDescription?: React.ReactNode;
  errorTitle?: React.ReactNode;
  formatXAxisLabel?: (
    value: LunaLineChartDatum["x"],
    context: LunaLineChartLabelFormatterContext
  ) => string;
  formatYAxisLabel?: (value: number) => string;
  height?: React.CSSProperties["height"];
  loading?: boolean;
  loadingLabel?: string;
  showGridLines?: boolean;
  showMarkers?: boolean;
};
