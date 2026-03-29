import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import type { LunaNotificationGroupProps } from "./LunaNotificationGroup.props";
import "./LunaNotificationGroup.css";

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

export const LunaNotificationGroup = React.forwardRef<HTMLElement, LunaNotificationGroupProps>(
  function LunaNotificationGroup(
    {
      actions,
      as,
      children,
      className,
      description,
      framed = true,
      gap,
      maxWidth,
      padding,
      rounded,
      style,
      title,
      ...props
    },
    ref
  ) {
    const { theme } = useTheme();
    const Component = (as ?? "section") as React.ElementType;
    const reactId = React.useId();
    const baseId = reactId.replace(/:/g, "");
    const titleId = title ? `luna-notification-group-title-${baseId}` : undefined;
    const resolvedGap = resolveSpacingValue(gap, theme);
    const resolvedPadding = resolveSpacingValue(padding, theme);
    const resolvedMaxWidth = resolveSpacingValue(maxWidth, theme);
    const hasBody = children !== undefined && children !== null;
    const resolvedStyle = {
      ...(resolvedGap ? { ["--luna-notification-group-gap" as const]: resolvedGap } : {}),
      ...(resolvedPadding ? { ["--luna-notification-group-padding" as const]: resolvedPadding } : {}),
      ...(resolvedMaxWidth
        ? { ["--luna-notification-group-max-width" as const]: resolvedMaxWidth }
        : {}),
      ...style
    };

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName([
          "luna-notification-group",
          framed && "luna-notification-group--framed",
          rounded && "luna-notification-group--rounded",
          !hasBody && "luna-notification-group--header-only",
          className
        ])}
        aria-labelledby={props["aria-labelledby"] ?? titleId}
        style={resolvedStyle}
      >
        {(title || description || actions) ? (
          <div className="luna-notification-group__header">
            <div className="luna-notification-group__header-copy">
              {title !== undefined && title !== null
                ? typeof title === "string"
                  ? (
                    <LunaText
                      as="h2"
                      variant="label"
                      className="luna-notification-group__title"
                      id={titleId}
                    >
                      {title}
                    </LunaText>
                  )
                  : (
                    <div className="luna-notification-group__title" id={titleId}>
                      {title}
                    </div>
                  )
                : null}
              {description !== undefined && description !== null
                ? typeof description === "string"
                  ? (
                    <LunaText
                      variant="body-small"
                      muted
                      className="luna-notification-group__description"
                    >
                      {description}
                    </LunaText>
                  )
                  : (
                    <div className="luna-notification-group__description">{description}</div>
                  )
                : null}
            </div>
            {actions ? <div className="luna-notification-group__actions">{actions}</div> : null}
          </div>
        ) : null}
        {hasBody ? <div className="luna-notification-group__items">{children}</div> : null}
      </Component>
    );
  }
);
