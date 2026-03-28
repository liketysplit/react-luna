import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaAlertProps } from "./LunaAlert.props";
import "./LunaAlert.css";

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

export const LunaAlert = React.forwardRef<HTMLElement, LunaAlertProps>(function LunaAlert(
  {
    as,
    children,
    className,
    emphasis = "soft",
    gap,
    icon,
    padding,
    rounded,
    style,
    title,
    tone = "neutral",
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "div") as React.ElementType;
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedGap = resolveSpacingValue(gap, theme);
  const hasBody = children !== undefined && children !== null;

  const resolvedStyle = {
    ...(resolvedPadding ? { ["--luna-alert-padding" as const]: resolvedPadding } : {}),
    ...(resolvedGap ? { ["--luna-alert-gap" as const]: resolvedGap } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName([
        "luna-alert",
        rounded && "luna-alert--rounded",
        !hasBody && "luna-alert--title-only",
        className
      ])}
      data-tone={tone}
      data-emphasis={emphasis}
      style={resolvedStyle}
    >
      {icon ? (
        <div aria-hidden="true" className="luna-alert__icon">
          {icon}
        </div>
      ) : null}
      <div className="luna-alert__content">
        {title ? <div className="luna-alert__title">{title}</div> : null}
        {hasBody ? <div className="luna-alert__body">{children}</div> : null}
      </div>
    </Component>
  );
});
