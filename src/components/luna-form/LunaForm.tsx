import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import type { LunaFormProps } from "./LunaForm.props";
import "./LunaForm.css";

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

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return [child];
  });
}

export const LunaForm = React.forwardRef<HTMLElement, LunaFormProps>(function LunaForm(
  { actions, actionsAlign = "left", actionsGap = "3", as, children, className, gap, header, style, ...props },
  ref
) {
  const { theme } = useTheme();
  const Component = (as ?? "form") as React.ElementType;
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedActionsGap = resolveSpacingValue(actionsGap, theme);
  const resolvedStyle = {
    ...(resolvedGap ? { ["--luna-form-gap" as const]: resolvedGap } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={toClassName(["luna-form", className])}
      style={resolvedStyle}
    >
      {header ? <div className="luna-form__header">{header}</div> : null}
      {children ? <LunaColumn className="luna-form__body" gap="3">{children}</LunaColumn> : null}
      {actions ? (
        <LunaRow
          className="luna-form__actions"
          align="center"
          gap={resolvedActionsGap}
          justify={
            actionsAlign === "center"
              ? "center"
              : actionsAlign === "right"
                ? "end"
                : "start"
          }
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
