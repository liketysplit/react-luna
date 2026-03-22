import React from "react";
import { useTheme } from "../../theme";
import { resolveTokenValue } from "../../theme/resolve";
import type { LunaTextProps } from "./LunaText.props";
import "./LunaText.css";

const INLINE_TAGS = new Set(["span", "strong", "em", "small", "label", "b", "i", "u"]);

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveTextColor(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveTokenValue(theme, value);
}

export const LunaText = React.forwardRef<HTMLElement, LunaTextProps>(function LunaText(
  {
    as,
    align,
    children,
    className,
    color,
    inline,
    italic,
    muted,
    surface,
    style,
    truncate,
    underline,
    variant,
    weight,
    ...textProps
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "p") as React.ElementType;
  const resolvedVariant = variant ?? theme.components.text?.defaultVariant ?? "body";
  const resolvedColor = resolveTextColor(color, theme);
  const shouldRenderInline =
    inline === true || (inline !== false && typeof Component === "string" && INLINE_TAGS.has(Component));

  const resolvedStyle = {
    ...(align ? { ["--luna-text-align" as const]: align } : {}),
    ...(resolvedColor ? { ["--luna-text-color" as const]: resolvedColor } : {}),
    ...(weight !== undefined ? { fontWeight: weight } : {}),
    ...style
  };

  return (
    <Component
      {...textProps}
      ref={ref}
      className={toClassName([
        "luna-text",
        shouldRenderInline && "luna-text--inline",
        muted && "luna-text--muted",
        truncate && "luna-text--truncate",
        surface && "luna-text--surface",
        italic && "luna-text--italic",
        underline && "luna-text--underline",
        className
      ])}
      data-variant={resolvedVariant}
      style={resolvedStyle}
    >
      {children}
    </Component>
  );
});
