import type React from "react";
import type {
  LunaLayoutAlign,
  LunaLayoutJustify,
  LunaLayoutSpan
} from "../layout-shared";

export type LunaColumnProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  gap?: string;
  align?: LunaLayoutAlign;
  justify?: LunaLayoutJustify;
  inline?: boolean;
  colSpan?: LunaLayoutSpan;
};
