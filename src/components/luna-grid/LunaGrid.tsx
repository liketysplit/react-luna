import React from "react";
import { useTheme } from "../../theme";
import {
  buildSpanStyle,
  normalizeGap,
  toClassName,
  wrapLayoutChildren
} from "../layout-shared";
import type { LunaGridProps } from "./LunaGrid.props";
import "./LunaGrid.css";

export const LunaGrid = React.forwardRef<HTMLElement, LunaGridProps>(function LunaGrid(
  { as, children, className, colSpan, columns = 12, gap, inline, style, ...props },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "div") as React.ElementType;
  const resolvedStyle = {
    ...buildSpanStyle(colSpan),
    ["--luna-grid-columns" as const]: String(columns),
    ...(gap ? { ["--luna-layout-gap" as const]: normalizeGap(gap, theme) } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-grid", inline && "luna-grid--inline", className])}
      style={resolvedStyle}
    >
      {wrapLayoutChildren(children, "luna-grid__item")}
    </Component>
  );
});
