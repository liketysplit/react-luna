import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type {
  LunaNotificationDismissReason,
  LunaNotificationProps
} from "./LunaNotification.props";
import "./LunaNotification.css";

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

export const LunaNotification = React.forwardRef<HTMLElement, LunaNotificationProps>(
  function LunaNotification(
    {
      action,
      as,
      children,
      className,
      defaultOpen = true,
      dismissible,
      dismissLabel = "Dismiss notification",
      emphasis = "soft",
      gap,
      icon,
      meta,
      onOpenChange,
      open,
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
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const Component = (as ?? "section") as React.ElementType;
    const resolvedPadding = resolveSpacingValue(padding, theme);
    const resolvedGap = resolveSpacingValue(gap, theme);
    const hasBody = children !== undefined && children !== null;

    const resolvedStyle = {
      ...(resolvedPadding ? { ["--luna-notification-padding" as const]: resolvedPadding } : {}),
      ...(resolvedGap ? { ["--luna-notification-gap" as const]: resolvedGap } : {}),
      ...style
    };

    const closeNotification = React.useCallback(
      (reason: LunaNotificationDismissReason) => {
        if (!isControlled) {
          setInternalOpen(false);
        }

        onOpenChange?.(false, reason);
      },
      [isControlled, onOpenChange]
    );

    if (!isOpen) {
      return null;
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName([
          "luna-notification",
          rounded && "luna-notification--rounded",
          !hasBody && "luna-notification--title-only",
          className
        ])}
        data-tone={tone}
        data-emphasis={emphasis}
        style={resolvedStyle}
      >
        {icon ? (
          <div aria-hidden="true" className="luna-notification__icon">
            {icon}
          </div>
        ) : null}
        <div className="luna-notification__content">
          {title || meta ? (
            <div className="luna-notification__header">
              {title ? <div className="luna-notification__title">{title}</div> : null}
              {meta ? <div className="luna-notification__meta">{meta}</div> : null}
            </div>
          ) : null}
          {hasBody ? <div className="luna-notification__body">{children}</div> : null}
          {action ? <div className="luna-notification__action">{action}</div> : null}
        </div>
        {dismissible ? (
          <button
            type="button"
            className="luna-notification__dismiss"
            aria-label={dismissLabel}
            onClick={() => {
              closeNotification("dismiss");
            }}
          >
            <span aria-hidden="true">x</span>
          </button>
        ) : null}
      </Component>
    );
  }
);
