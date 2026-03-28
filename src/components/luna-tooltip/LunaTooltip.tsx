import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaTooltipProps } from "./LunaTooltip.props";
import "./LunaTooltip.css";

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

function resolveSpacingValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

export const LunaTooltip = React.forwardRef<HTMLSpanElement, LunaTooltipProps>(function LunaTooltip(
  {
    children,
    className,
    content,
    disabled = false,
    maxWidth,
    offset,
    onBlur,
    onFocus,
    onKeyDownCapture,
    onMouseEnter,
    onMouseLeave,
    placement = "top",
    style,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const rootRef = React.useRef<HTMLSpanElement | null>(null);
  const reactId = React.useId();
  const tooltipId = `luna-tooltip-${reactId.replace(/:/g, "")}`;
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => rootRef.current as HTMLSpanElement, []);

  React.useEffect(() => {
    if (disabled && open) {
      setOpen(false);
    }
  }, [disabled, open]);

  const hasContent = content !== undefined && content !== null && content !== false;
  const shouldShow = !disabled && hasContent && open;
  const resolvedOffset = resolveSpacingValue(offset, theme);
  const resolvedMaxWidth = resolveSpacingValue(maxWidth, theme) ?? maxWidth;
  const resolvedStyle = {
    ...(resolvedOffset ? { ["--luna-tooltip-offset" as const]: resolvedOffset } : {}),
    ...(resolvedMaxWidth ? { ["--luna-tooltip-max-width" as const]: resolvedMaxWidth } : {}),
    ...style
  };

  const child = React.Children.only(children);

  if (!React.isValidElement(child)) {
    throw new Error("LunaTooltip expects a single React element child.");
  }

  const childElement = child as React.ReactElement<{ "aria-describedby"?: string }>;
  const describedBy = [childElement.props["aria-describedby"], shouldShow ? tooltipId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      {...props}
      ref={rootRef}
      className={toClassName(["luna-tooltip", className])}
      data-open={shouldShow ? "true" : "false"}
      data-placement={placement}
      onMouseEnter={composeEventHandlers(onMouseEnter, () => {
        if (!disabled && hasContent) {
          setOpen(true);
        }
      })}
      onMouseLeave={composeEventHandlers(onMouseLeave, () => {
        setOpen(false);
      })}
      onFocus={composeEventHandlers(onFocus, () => {
        if (!disabled && hasContent) {
          setOpen(true);
        }
      })}
      onBlur={composeEventHandlers(onBlur, (event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return;
        }

        setOpen(false);
      })}
      onKeyDownCapture={composeEventHandlers(onKeyDownCapture, (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      })}
      style={resolvedStyle}
    >
      {React.cloneElement(childElement, {
        "aria-describedby": describedBy || undefined
      })}
      {shouldShow ? (
        <span id={tooltipId} role="tooltip" className="luna-tooltip__bubble">
          <span className="luna-tooltip__content">{content}</span>
          <span aria-hidden="true" className="luna-tooltip__arrow" />
        </span>
      ) : null}
    </span>
  );
});
