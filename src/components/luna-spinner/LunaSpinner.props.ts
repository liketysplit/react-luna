import type React from "react";

export type LunaSpinnerProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "color"
> & {
  as?: React.ElementType;
  size?: string;
  color?: string;
  decorative?: boolean;
  label?: string;
};
