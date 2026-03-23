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
import type { LunaRowProps } from "./LunaRow.props";
import "./LunaRow.css";

export const LunaRow = React.forwardRef<HTMLElement, LunaRowProps>(function LunaRow(
  { as, align, children, className, colSpan, gap, inline, justify, style, wrap = true, ...props },
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
      className={toClassName([
        "luna-row",
        inline && "luna-row--inline",
        !wrap && "luna-row--no-wrap",
        className
      ])}
      style={resolvedStyle}
    >
      {wrapLayoutChildren(children, "luna-row__item", "auto")}
    </Component>
  );
});
