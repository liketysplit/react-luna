import type React from "react";
import type { LunaLayoutSpan } from "../layout-shared";

export type LunaDividerOrientation = "horizontal" | "vertical";
export type LunaDividerTone = "default" | "muted" | "strong";
export type LunaDividerLabelAlign = "start" | "center" | "end";

export type LunaDividerProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  colSpan?: LunaLayoutSpan;
  orientation?: LunaDividerOrientation;
  tone?: LunaDividerTone;
  inset?: boolean | string;
  label?: React.ReactNode;
  labelAlign?: LunaDividerLabelAlign;
  spacing?: string;
  decorative?: boolean;
};
