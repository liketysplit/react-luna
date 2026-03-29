import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaPopoverProps } from "./LunaPopover.props";
import "./LunaPopover.css";

type PopoverCssVariable =
  | "--luna-popover-offset"
  | "--luna-popover-padding"
  | "--luna-popover-min-width"
  | "--luna-popover-max-width";

type LunaPopoverStyle = React.CSSProperties &
  Partial<Record<PopoverCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function composeEventHandlers<EventType extends React.SyntheticEvent>(
  originalHandler: ((event: EventType) => void) | undefined,
  nextHandler: (event: EventType) => void
) {
  return (event: EventType) => {
    originalHandler?.(event);

    if (!event.defaultPrevented) {
      nextHandler(event);
    }
  };
}

function assignRef<ValueType>(
  ref: React.ForwardedRef<ValueType> | React.Ref<ValueType> | undefined,
  value: ValueType | null
) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref && "current" in ref) {
    (ref as React.MutableRefObject<ValueType | null>).current = value;
  }
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

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");
}

export const LunaPopover = React.forwardRef<HTMLSpanElement, LunaPopoverProps>(function LunaPopover(
  {
    children,
    className,
    content,
    defaultOpen = false,
    disabled = false,
    maxWidth,
    minWidth,
    offset,
    onOpenChange,
    open,
    padding,
    placement = "bottom-start",
    showArrow = false,
    style,
    surfaceLabel = "Popover",
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const rootRef = React.useRef<HTMLSpanElement | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const surfaceRef = React.useRef<HTMLDivElement | null>(null);
  const restoreFocusOnCloseRef = React.useRef(false);
  const reactId = React.useId();
  const popoverId = `luna-popover-${reactId.replace(/:/g, "")}`;
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;
  const hasContent = content !== undefined && content !== null && content !== false;
  const resolvedOffset = resolveSpacingValue(offset, theme);
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedMinWidth = resolveSpacingValue(minWidth, theme) ?? minWidth;
  const resolvedMaxWidth = resolveSpacingValue(maxWidth, theme) ?? maxWidth;
  const resolvedStyle: LunaPopoverStyle = {
    ...(resolvedOffset ? { ["--luna-popover-offset" as const]: resolvedOffset } : {}),
    ...(resolvedPadding ? { ["--luna-popover-padding" as const]: resolvedPadding } : {}),
    ...(resolvedMinWidth ? { ["--luna-popover-min-width" as const]: resolvedMinWidth } : {}),
    ...(resolvedMaxWidth ? { ["--luna-popover-max-width" as const]: resolvedMaxWidth } : {}),
    ...style
  };

  React.useImperativeHandle(ref, () => rootRef.current as HTMLSpanElement, []);

  React.useEffect(() => {
    if (disabled && isOpen) {
      if (!isControlled) {
        setInternalOpen(false);
      }

      onOpenChange?.(false);
    }
  }, [disabled, isControlled, isOpen, onOpenChange]);

  React.useEffect(() => {
    if (!isOpen) {
      if (restoreFocusOnCloseRef.current) {
        restoreFocusOnCloseRef.current = false;
        triggerRef.current?.focus();
      }

      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const surface = surfaceRef.current;
      if (!surface) {
        return;
      }

      const [firstFocusable] = getFocusableElements(surface);
      (firstFocusable ?? surface).focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  function setPopoverOpen(nextOpen: boolean) {
    if (!hasContent || disabled) {
      return;
    }

    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    if (nextOpen !== isOpen) {
      onOpenChange?.(nextOpen);
    }
  }

  function closePopover({ restoreFocus = false }: { restoreFocus?: boolean } = {}) {
    restoreFocusOnCloseRef.current = restoreFocus;
    setPopoverOpen(false);
  }

  const child = React.Children.only(children);

  if (!React.isValidElement(child)) {
    throw new Error("LunaPopover expects a single React element child.");
  }

  const childProps = child.props as {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    ["aria-disabled"]?: boolean | "true" | "false";
  };
  const childIsDisabled =
    childProps.disabled === true ||
    childProps["aria-disabled"] === true ||
    childProps["aria-disabled"] === "true";

  const trigger = React.cloneElement(child, {
    "aria-controls": isOpen ? popoverId : undefined,
    "aria-expanded": isOpen ? true : undefined,
    "aria-haspopup": "dialog",
    onClick: composeEventHandlers(childProps.onClick, (event: React.MouseEvent<HTMLElement>) => {
      triggerRef.current = event.currentTarget;

      if (childIsDisabled || disabled || !hasContent) {
        return;
      }

      if (isOpen) {
        closePopover({ restoreFocus: true });
        return;
      }

      setPopoverOpen(true);
    }),
    onKeyDown: composeEventHandlers(childProps.onKeyDown, (event: React.KeyboardEvent<HTMLElement>) => {
      triggerRef.current = event.currentTarget;

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closePopover({ restoreFocus: true });
      }
    })
  } as Record<string, unknown>);

  return (
    <span
      {...props}
      ref={(value) => {
        rootRef.current = value;
        assignRef(ref, value);
      }}
      className={toClassName(["luna-popover", className])}
      data-open={isOpen ? "true" : "false"}
      data-arrow={showArrow ? "true" : "false"}
      data-placement={placement}
      style={resolvedStyle}
    >
      {trigger}
      {isOpen && hasContent ? (
        <div
          id={popoverId}
          ref={surfaceRef}
          className="luna-popover__surface"
          role="dialog"
          aria-label={surfaceLabel}
          aria-modal="false"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              closePopover({ restoreFocus: true });
            }
          }}
        >
          {showArrow ? <span className="luna-popover__arrow" aria-hidden="true" /> : null}
          <div className="luna-popover__content">{content}</div>
        </div>
      ) : null}
    </span>
  );
});
