import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaTopbarProps } from "./LunaTopbar.props";
import "./LunaTopbar.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpacingValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

export const LunaTopbar = React.forwardRef<HTMLElement, LunaTopbarProps>(function LunaTopbar(
  {
    as,
    bordered = true,
    children,
    className,
    end,
    gap,
    padding,
    start,
    sticky = false,
    style,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "header") as React.ElementType;
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const hasCenter = children !== undefined && children !== null;
  const hasStart = start !== undefined && start !== null;
  const hasEnd = end !== undefined && end !== null;
  const resolvedStyle = {
    ...(resolvedGap ? { ["--luna-topbar-gap" as const]: resolvedGap } : {}),
    ...(resolvedPadding ? { ["--luna-topbar-padding" as const]: resolvedPadding } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName([
        "luna-topbar",
        bordered && "luna-topbar--bordered",
        sticky && "luna-topbar--sticky",
        className
      ])}
      data-has-center={hasCenter ? "true" : "false"}
      data-has-start={hasStart ? "true" : "false"}
      data-has-end={hasEnd ? "true" : "false"}
      style={resolvedStyle}
    >
      {hasStart ? <div className="luna-topbar__start">{start}</div> : <div aria-hidden="true" />}
      {hasCenter ? <div className="luna-topbar__center">{children}</div> : null}
      {hasEnd ? <div className="luna-topbar__end">{end}</div> : <div aria-hidden="true" />}
    </Component>
  );
});
