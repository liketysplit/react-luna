import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import type { LunaHeaderProps } from "./LunaHeader.props";
import "./LunaHeader.css";

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

function resolveAlign(align: LunaHeaderProps["align"]) {
  if (align === "center") {
    return { item: "center", text: "center" };
  }

  if (align === "right") {
    return { item: "end", text: "right" };
  }

  return { item: "start", text: "left" };
}

function resolveVariants(size: LunaHeaderProps["size"]) {
  if (size === "sm") {
    return {
      title: "label",
      subtitle: "caption"
    };
  }

  if (size === "lg") {
    return {
      title: "display",
      subtitle: "body"
    };
  }

  return {
    title: "title",
    subtitle: "body-small"
  };
}

export const LunaHeader = React.forwardRef<HTMLElement, LunaHeaderProps>(function LunaHeader(
  { align = "left", as, className, gap, size = "md", style, subtitle, title, ...props },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "div") as React.ElementType;
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedAlign = resolveAlign(align);
  const resolvedVariants = resolveVariants(size);
  const resolvedStyle = {
    ...(resolvedGap ? { ["--luna-header-gap" as const]: resolvedGap } : {}),
    ["--luna-header-align" as const]: resolvedAlign.item,
    ["--luna-header-text-align" as const]: resolvedAlign.text,
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-header", className])}
      style={resolvedStyle}
    >
      {title !== undefined && title !== null
        ? typeof title === "string"
          ? (
            <LunaText
              as="h2"
              variant={resolvedVariants.title}
              className="luna-header__title"
              data-size={size}
            >
              {title}
            </LunaText>
          )
          : (
            <div className="luna-header__title" data-size={size}>
              {title}
            </div>
          )
        : null}
      {subtitle !== undefined && subtitle !== null
        ? typeof subtitle === "string"
          ? (
            <LunaText
              variant={resolvedVariants.subtitle}
              muted
              className="luna-header__subtitle"
              data-size={size}
            >
              {subtitle}
            </LunaText>
          )
          : (
            <div className="luna-header__subtitle" data-size={size}>
              {subtitle}
            </div>
          )
        : null}
    </Component>
  );
});
