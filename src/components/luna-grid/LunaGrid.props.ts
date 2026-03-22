import type React from "react";
import type { LunaLayoutAlign, LunaLayoutJustify, LunaLayoutSpan } from "../layout-shared";

export type LunaGridProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  gap?: string;
  columns?: number;
  inline?: boolean;
  align?: LunaLayoutAlign;
  justify?: LunaLayoutJustify;
  colSpan?: LunaLayoutSpan;
};
