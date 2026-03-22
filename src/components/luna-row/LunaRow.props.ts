import type React from "react";
import type {
  LunaLayoutAlign,
  LunaLayoutJustify,
  LunaLayoutSpan
} from "../layout-shared";

export type LunaRowProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  gap?: string;
  align?: LunaLayoutAlign;
  justify?: LunaLayoutJustify;
  wrap?: boolean;
  inline?: boolean;
  colSpan?: LunaLayoutSpan;
};
