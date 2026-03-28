import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaBadgeProps } from "./LunaBadge.props";
import "./LunaBadge.css";

type BadgeCssVariable =
  | "--luna-badge-padding-x"
  | "--luna-badge-padding-y"
  | "--luna-badge-font-size"
  | "--luna-badge-min-height";

type LunaBadgeStyle = React.CSSProperties &
  Partial<Record<BadgeCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSizeStyle(size: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!size) {
    return undefined;
  }

  const profile = theme.components.badge?.sizes?.[size];
  if (!profile) {
    return undefined;
  }

  return {
    ["--luna-badge-padding-x" as const]:
      resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX,
    ["--luna-badge-padding-y" as const]:
      resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY,
    ["--luna-badge-font-size" as const]:
      resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize,
    ["--luna-badge-min-height" as const]:
      resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight
  };
}

export const LunaBadge = React.forwardRef<HTMLElement, LunaBadgeProps>(function LunaBadge(
  { as, children, className, rounded, size, style, tone = "neutral", variant = "soft", ...props },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "span") as React.ElementType;
  const resolvedSize = size ?? theme.components.badge?.defaultSize ?? "medium";
  const sizeStyle = resolveSizeStyle(resolvedSize, theme);
  const resolvedStyle: LunaBadgeStyle = {
    ...sizeStyle,
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-badge", rounded && "luna-badge--rounded", className])}
      data-tone={tone}
      data-variant={variant}
      data-size={resolvedSize}
      style={resolvedStyle}
    >
      <span className="luna-badge__label">{children}</span>
    </Component>
  );
});
