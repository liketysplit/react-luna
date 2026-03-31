import React from "react";
import type { LunaPaneProps } from "./LunaPane.props";
import "./LunaPane.css";

export const LunaPane = React.forwardRef<HTMLElement, LunaPaneProps>(function LunaPane(
  {
    as,
    border = false,
    borderBottom = false,
    borderLeft = false,
    borderRight = false,
    borderStyle,
    borderTop = false,
    borderWidth,
    children,
    className,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    radius,
    style,
    width,
    ...props
  },
  ref
) {
  const Component = (as ?? "div") as React.ElementType;
  const resolvedClassName = ["luna-pane", className].filter(Boolean).join(" ");
  const resolvedStyle: React.CSSProperties = {
    ...(borderStyle ? { borderStyle } : {}),
    ...(borderWidth ? { borderWidth } : {}),
    ...(radius ? { borderRadius: radius } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(minWidth ? { minWidth } : {}),
    ...(maxWidth ? { maxWidth } : {}),
    ...(minHeight ? { minHeight } : {}),
    ...(maxHeight ? { maxHeight } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={resolvedClassName}
      data-border={border ? "true" : undefined}
      data-border-top={borderTop ? "true" : undefined}
      data-border-right={borderRight ? "true" : undefined}
      data-border-bottom={borderBottom ? "true" : undefined}
      data-border-left={borderLeft ? "true" : undefined}
      style={resolvedStyle}
    >
      {children}
    </Component>
  );
});
