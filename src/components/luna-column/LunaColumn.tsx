import React from "react";
import { useTheme } from "../../theme";
import {
  buildSpanStyle,
  mapAlign,
  mapJustify,
  normalizeGap,
  toClassName,
  wrapLayoutChildren
} from "../layout-shared";
import type { LunaColumnProps } from "./LunaColumn.props";
import "./LunaColumn.css";

export const LunaColumn = React.forwardRef<HTMLElement, LunaColumnProps>(function LunaColumn(
  { as, align, children, className, colSpan, gap, inline, justify, style, ...props },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "div") as React.ElementType;
  const resolvedStyle = {
    ...buildSpanStyle(colSpan),
    ...(gap ? { ["--luna-layout-gap" as const]: normalizeGap(gap, theme) } : {}),
    ...(align ? { ["--luna-layout-align" as const]: mapAlign(align) } : {}),
    ...(justify ? { ["--luna-layout-justify" as const]: mapJustify(justify) } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-column", inline && "luna-column--inline", className])}
      style={resolvedStyle}
    >
      {wrapLayoutChildren(children, "luna-column__item")}
    </Component>
  );
});
