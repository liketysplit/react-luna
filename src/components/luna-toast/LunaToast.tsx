import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaToastDismissReason, LunaToastProps } from "./LunaToast.props";
import "./LunaToast.css";

type ToastCssVariable =
  | "--luna-toast-padding"
  | "--luna-toast-gap"
  | "--luna-toast-inset";

type LunaToastStyle = React.CSSProperties &
  Partial<Record<ToastCssVariable, string | number | undefined>>;

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

export const LunaToast = React.forwardRef<HTMLDivElement, LunaToastProps>(function LunaToast(
  {
    action,
    children,
    className,
    defaultOpen = true,
    dismissible,
    dismissLabel = "Dismiss notification",
    duration,
    emphasis = "soft",
    gap,
    icon,
    inset,
    onOpenChange,
    open,
    padding,
    pauseOnHover = true,
    placement,
    rounded,
    role,
    style,
    title,
    tone = "neutral",
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [isHovered, setIsHovered] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const resolvedPlacement =
    placement ?? theme.components.toast?.defaultPlacement ?? "bottom-right";
  const resolvedDuration = duration ?? theme.components.toast?.defaultDuration;
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedInset = resolveSpacingValue(inset, theme);
  const hasBody = children !== undefined && children !== null;
  const resolvedStyle: LunaToastStyle = {
    ...(resolvedPadding ? { ["--luna-toast-padding" as const]: resolvedPadding } : {}),
    ...(resolvedGap ? { ["--luna-toast-gap" as const]: resolvedGap } : {}),
    ...(resolvedInset ? { ["--luna-toast-inset" as const]: resolvedInset } : {}),
    ...style
  };

  const closeToast = React.useCallback(
    (reason: LunaToastDismissReason) => {
      if (!isControlled) {
        setInternalOpen(false);
      }

      onOpenChange?.(false, reason);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    if (!resolvedDuration || resolvedDuration <= 0) {
      return undefined;
    }

    if (pauseOnHover && isHovered) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      closeToast("timeout");
    }, resolvedDuration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [closeToast, isHovered, isOpen, pauseOnHover, resolvedDuration]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      {...props}
      ref={ref}
      className={toClassName([
        "luna-toast",
        rounded && "luna-toast--rounded",
        !hasBody && "luna-toast--title-only",
        className
      ])}
      data-tone={tone}
      data-emphasis={emphasis}
      data-placement={resolvedPlacement}
      role={role ?? "status"}
      aria-live={props["aria-live"] ?? "polite"}
      aria-atomic={props["aria-atomic"] ?? true}
      style={resolvedStyle}
      onMouseEnter={(event) => {
        setIsHovered(true);
        props.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHovered(false);
        props.onMouseLeave?.(event);
      }}
    >
      {icon ? (
        <div aria-hidden="true" className="luna-toast__icon">
          {icon}
        </div>
      ) : null}
      <div className="luna-toast__content">
        {title ? <div className="luna-toast__title">{title}</div> : null}
        {hasBody ? <div className="luna-toast__body">{children}</div> : null}
        {action ? <div className="luna-toast__action">{action}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className="luna-toast__dismiss"
          aria-label={dismissLabel}
          onClick={() => {
            closeToast("dismiss");
          }}
        >
          <span aria-hidden="true">x</span>
        </button>
      ) : null}
    </div>
  );
});
