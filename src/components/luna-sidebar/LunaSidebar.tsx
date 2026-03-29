import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaSidebarProps } from "./LunaSidebar.props";
import "./LunaSidebar.css";

type SidebarCssVariable =
  | "--luna-sidebar-width"
  | "--luna-sidebar-padding"
  | "--luna-sidebar-gap"
  | "--luna-sidebar-sticky-offset";

type LunaSidebarStyle = React.CSSProperties &
  Partial<Record<SidebarCssVariable, string | number | undefined>>;

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

export const LunaSidebar = React.forwardRef<HTMLElement, LunaSidebarProps>(function LunaSidebar(
  {
    as,
    children,
    className,
    footer,
    gap,
    header,
    padding,
    sticky = false,
    stickyOffset,
    style,
    width,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "aside") as React.ElementType;
  const resolvedWidth = resolveSpacingValue(width, theme) ?? width ?? theme.components.sidebar?.defaultWidth;
  const resolvedPadding =
    resolveSpacingValue(padding, theme) ??
    resolveSpacingValue(theme.components.sidebar?.defaultPadding, theme) ??
    theme.components.sidebar?.defaultPadding;
  const resolvedGap =
    resolveSpacingValue(gap, theme) ??
    resolveSpacingValue(theme.components.sidebar?.defaultGap, theme) ??
    theme.components.sidebar?.defaultGap;
  const resolvedStickyOffset =
    resolveSpacingValue(stickyOffset, theme) ??
    resolveSpacingValue(theme.components.sidebar?.defaultStickyOffset, theme) ??
    theme.components.sidebar?.defaultStickyOffset;

  const resolvedStyle: LunaSidebarStyle = {
    ...(resolvedWidth ? { ["--luna-sidebar-width" as const]: resolvedWidth } : {}),
    ...(resolvedPadding ? { ["--luna-sidebar-padding" as const]: resolvedPadding } : {}),
    ...(resolvedGap ? { ["--luna-sidebar-gap" as const]: resolvedGap } : {}),
    ...(resolvedStickyOffset
      ? { ["--luna-sidebar-sticky-offset" as const]: resolvedStickyOffset }
      : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-sidebar", className])}
      data-sticky={sticky ? "true" : "false"}
      style={resolvedStyle}
    >
      {header ? <div className="luna-sidebar__header">{header}</div> : null}
      {children !== undefined && children !== null ? (
        <div className="luna-sidebar__content">{children}</div>
      ) : null}
      {footer ? <div className="luna-sidebar__footer">{footer}</div> : null}
    </Component>
  );
});
