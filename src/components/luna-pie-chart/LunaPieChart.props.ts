import type React from "react";

export type LunaPieChartDatum = {
  id?: string;
  label: string;
  value: number;
  color?: string;
};

export type LunaPieChartProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
  ariaLabel: string;
  data: LunaPieChartDatum[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  empty?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
  showLegend?: boolean;
  size?: string;
};
