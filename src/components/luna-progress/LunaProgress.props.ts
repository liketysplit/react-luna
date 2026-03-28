import type React from "react";

export type LunaProgressProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "color"
> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  size?: string;
  tone?: string;
  showValue?: boolean;
  valueLabel?: React.ReactNode;
};
