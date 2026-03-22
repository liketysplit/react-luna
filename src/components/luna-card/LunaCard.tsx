import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaText } from "../luna-text";
import type { LunaCardProps } from "./LunaCard.props";
import "./LunaCard.css";

const warnedMessages = new Set<string>();

function warnOnce(message: string) {
  if (!import.meta.env.DEV || warnedMessages.has(message)) {
    return;
  }

  warnedMessages.add(message);
  console.warn(message);
}

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveCardColor(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveTokenValue(theme, value);
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

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return [child];
  });
}

export const LunaCard = React.forwardRef<HTMLElement, LunaCardProps>(function LunaCard(
  {
    actions,
    actionsAlign = "left",
    actionsGap = "2",
    as,
    bodyAlign = "left",
    children,
    className,
    color,
    elevated,
    flat,
    gap,
    interactive,
    outlined,
    padding,
    rounded,
    style,
    title,
    titleAlign = "left",
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "section") as React.ElementType;
  const resolvedColor = resolveCardColor(color, theme);
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedActionsGap = resolveSpacingValue(actionsGap, theme);

  if (flat && elevated) {
    warnOnce("LunaCard: `flat` overrides `elevated` when both are provided.");
  }

  const rootClassName = toClassName([
    "luna-card",
    outlined && "luna-card--outlined",
    !flat && elevated && "luna-card--elevated",
    flat && "luna-card--flat",
    rounded && "luna-card--rounded",
    interactive && "luna-card--interactive",
    className
  ]);

  const resolvedStyle = {
    ...(resolvedColor ? { ["--luna-card-bg-override" as const]: resolvedColor } : {}),
    ...(resolvedGap ? { ["--luna-card-gap" as const]: resolvedGap } : {}),
    ...(resolvedPadding ? { ["--luna-card-padding" as const]: resolvedPadding } : {}),
    ...style
  };

  return (
    <Component {...props} ref={ref} className={rootClassName} style={resolvedStyle}>
      {title ? (
        <LunaColumn className="luna-card__header" align={titleAlign === "center" ? "center" : titleAlign === "right" ? "end" : "start"} gap="2">
          {typeof title === "string" ? (
            <LunaText as="h3" variant="title" className="luna-card__title">
              {title}
            </LunaText>
          ) : (
            <div className="luna-card__title">{title}</div>
          )}
        </LunaColumn>
      ) : null}
      {children ? (
        <LunaColumn className="luna-card__body" align={bodyAlign === "center" ? "center" : bodyAlign === "right" ? "end" : "start"} gap="2">
          {children}
        </LunaColumn>
      ) : null}
      {actions ? (
        <LunaRow
          className="luna-card__actions"
          align="center"
          gap={resolvedActionsGap}
          justify={
            actionsAlign === "center"
              ? "center"
              : actionsAlign === "right"
                ? "end"
                : "start"
          }
          wrap={false}
        >
          {flattenChildren(actions).map((child, index) =>
            child === null || child === undefined || typeof child === "boolean" ? child : (
              <div data-col-span="auto" key={index}>
                {child}
              </div>
            )
          )}
        </LunaRow>
      ) : null}
    </Component>
  );
});
