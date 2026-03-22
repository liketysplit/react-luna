import type React from "react";

export type LunaTextAlign = "left" | "center" | "right" | "justify";
export type LunaTextAs = React.ElementType;

export type LunaTextProps = React.HTMLAttributes<HTMLElement> & {
  as?: LunaTextAs;
  variant?: string;
  color?: string;
  muted?: boolean;
  truncate?: boolean;
  surface?: boolean;
  inline?: boolean;
  align?: LunaTextAlign;
  weight?: string | number;
  italic?: boolean;
  underline?: boolean;
};
