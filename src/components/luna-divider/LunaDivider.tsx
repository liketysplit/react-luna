import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import type { LunaDividerProps } from "./LunaDivider.props";
import "./LunaDivider.css";

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

export const LunaDivider = React.forwardRef<HTMLElement, LunaDividerProps>(function LunaDivider(
  {
    as,
    className,
    decorative,
    inset,
    label,
    labelAlign = "center",
    orientation = "horizontal",
    spacing,
    style,
    tone = "default",
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const resolvedSpacing = resolveSpacingValue(spacing, theme);
  const resolvedInset =
    typeof inset === "string" ? resolveSpacingValue(inset, theme) : inset ? "var(--luna-divider-inset-default)" : undefined;
  const isLabeled = orientation === "horizontal" && label !== undefined && label !== null;
  const Component = (
    as ?? (orientation === "vertical" || isLabeled ? "div" : "hr")
  ) as React.ElementType;

  const resolvedStyle = {
    ...(resolvedSpacing ? { ["--luna-divider-spacing" as const]: resolvedSpacing } : {}),
    ...(resolvedInset ? { ["--luna-divider-inset" as const]: resolvedInset } : {}),
    ...style
  };

  const rootClassName = toClassName([
    "luna-divider",
    orientation === "vertical" ? "luna-divider--vertical" : "luna-divider--horizontal",
    tone === "muted" && "luna-divider--muted",
    tone === "strong" && "luna-divider--strong",
    inset && "luna-divider--inset",
    isLabeled && "luna-divider--labeled",
    isLabeled && `luna-divider--label-${labelAlign}`,
    className
  ]);

  const accessibilityProps =
    orientation === "vertical"
      ? decorative
        ? { ["aria-hidden" as const]: true }
        : { role: "separator" as const, ["aria-orientation" as const]: "vertical" }
      : isLabeled
        ? decorative
          ? { ["aria-hidden" as const]: true }
          : { role: "separator" as const, ["aria-orientation" as const]: "horizontal" }
      : decorative
        ? { ["aria-hidden" as const]: true }
        : {};

  return (
    <Component
      {...props}
      {...accessibilityProps}
      ref={ref}
      className={rootClassName}
      style={resolvedStyle}
    >
      {isLabeled ? (
        <LunaText as="span" variant="caption" className="luna-divider__label">
          {label}
        </LunaText>
      ) : null}
    </Component>
  );
});
