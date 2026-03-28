import React from "react";
import { useTheme } from "../../theme";
import { resolveTokenValue } from "../../theme/resolve";
import type { LunaHoverTextProps } from "./LunaHoverText.props";
import "./LunaHoverText.css";

type HoverTextCssVariable = "--luna-hover-text-color" | "--luna-hover-text-hover-color";

type LunaHoverTextStyle = React.CSSProperties &
  Partial<Record<HoverTextCssVariable, string | number | undefined>>;

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

function resolveColor(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveTokenValue(theme, value);
}

export const LunaHoverText = React.forwardRef<HTMLElement, LunaHoverTextProps>(function LunaHoverText(
  {
    as,
    children,
    className,
    color,
    disabled = false,
    focusable = false,
    hoverColor,
    hoverContent,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    style,
    tabIndex,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "span") as React.ElementType;
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const hasHoverContent = hoverContent !== undefined && hoverContent !== null && hoverContent !== false;
  const active = !disabled && hasHoverContent && (hovered || focused);
  const resolvedColor = resolveColor(color, theme);
  const resolvedHoverColor = resolveColor(hoverColor, theme);
  const resolvedStyle: LunaHoverTextStyle = {
    ...(resolvedColor ? { ["--luna-hover-text-color" as const]: resolvedColor } : {}),
    ...(resolvedHoverColor
      ? { ["--luna-hover-text-hover-color" as const]: resolvedHoverColor }
      : {}),
    ...style
  };
  const resolvedTabIndex = !disabled && focusable && tabIndex === undefined ? 0 : tabIndex;

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-hover-text", className])}
      data-active={active ? "true" : "false"}
      data-focusable={focusable ? "true" : "false"}
      onMouseEnter={composeEventHandlers(onMouseEnter, () => {
        if (!disabled && hasHoverContent) {
          setHovered(true);
        }
      })}
      onMouseLeave={composeEventHandlers(onMouseLeave, () => {
        setHovered(false);
      })}
      onFocus={composeEventHandlers(onFocus, () => {
        if (!disabled && hasHoverContent) {
          setFocused(true);
        }
      })}
      onBlur={composeEventHandlers(onBlur, (event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return;
        }

        setFocused(false);
      })}
      style={resolvedStyle}
      tabIndex={resolvedTabIndex}
    >
      <span aria-hidden={active} className="luna-hover-text__default">
        {children}
      </span>
      <span aria-hidden={!active} className="luna-hover-text__hover">
        {hoverContent}
      </span>
    </Component>
  );
});
