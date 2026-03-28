import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaRow } from "../luna-row";
import { LunaText } from "../luna-text";
import type { LunaEmptyStateProps } from "./LunaEmptyState.props";
import "./LunaEmptyState.css";

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

function resolveAlign(align: LunaEmptyStateProps["align"]) {
  if (align === "center") {
    return { items: "center", text: "center", actions: "center" } as const;
  }

  if (align === "right") {
    return { items: "end", text: "right", actions: "end" } as const;
  }

  return { items: "start", text: "left", actions: "start" } as const;
}

export const LunaEmptyState = React.forwardRef<HTMLElement, LunaEmptyStateProps>(
  function LunaEmptyState(
    {
      actions,
      actionsGap,
      align = "center",
      as,
      children,
      className,
      description,
      framed = true,
      gap,
      maxWidth,
      media,
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
    const resolvedPadding = resolveSpacingValue(padding, theme);
    const resolvedGap = resolveSpacingValue(gap, theme);
    const resolvedActionsGap = resolveSpacingValue(actionsGap, theme);
    const resolvedMaxWidth = resolveSpacingValue(maxWidth, theme);
    const resolvedAlign = resolveAlign(align);
    const body = children ?? description;
    const hasBody = body !== undefined && body !== null;

    const resolvedStyle = {
      ...(resolvedPadding ? { ["--luna-empty-state-padding" as const]: resolvedPadding } : {}),
      ...(resolvedGap ? { ["--luna-empty-state-gap" as const]: resolvedGap } : {}),
      ...(resolvedActionsGap
        ? { ["--luna-empty-state-actions-gap" as const]: resolvedActionsGap }
        : {}),
      ...(resolvedMaxWidth ? { ["--luna-empty-state-max-width" as const]: resolvedMaxWidth } : {}),
      ["--luna-empty-state-align" as const]: resolvedAlign.items,
      ["--luna-empty-state-text-align" as const]: resolvedAlign.text,
      ...style
    };

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName([
          "luna-empty-state",
          rounded && "luna-empty-state--rounded",
          framed && "luna-empty-state--framed",
          !hasBody && "luna-empty-state--title-only",
          className
        ])}
        style={resolvedStyle}
      >
        {media ? (
          <div aria-hidden="true" className="luna-empty-state__media">
            {media}
          </div>
        ) : null}
        <div className="luna-empty-state__content">
          {title !== undefined && title !== null
            ? typeof title === "string"
              ? (
                <LunaText
                  as="h2"
                  variant="title"
                  className="luna-empty-state__title"
                  align={resolvedAlign.text}
                >
                  {title}
                </LunaText>
              )
              : (
                <div className="luna-empty-state__title">{title}</div>
              )
            : null}
          {hasBody
            ? typeof body === "string"
              ? (
                <LunaText
                  variant="body"
                  muted
                  className="luna-empty-state__description"
                  align={resolvedAlign.text}
                >
                  {body}
                </LunaText>
              )
              : (
                <div className="luna-empty-state__description">{body}</div>
              )
            : null}
        </div>
        {actions ? (
          <LunaRow
            className="luna-empty-state__actions"
            align="center"
            justify={resolvedAlign.actions}
            gap={resolvedActionsGap}
          >
            {actions}
          </LunaRow>
        ) : null}
      </Component>
    );
  }
);
