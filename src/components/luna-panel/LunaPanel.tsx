import React from "react";
import type { LunaPanelProps } from "./LunaPanel.props";
import "./LunaPanel.css";

export const LunaPanel = React.forwardRef<HTMLElement, LunaPanelProps>(function LunaPanel(
  {
    as,
    children,
    className,
    description,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    style,
    title,
    tone = "default",
    width,
    ...props
  },
  ref
) {
  const Component = (as ?? "section") as React.ElementType;
  const resolvedClassName = ["luna-panel", className].filter(Boolean).join(" ");
  const resolvedStyle = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(minWidth ? { minWidth } : {}),
    ...(maxWidth ? { maxWidth } : {}),
    ...(minHeight ? { minHeight } : {}),
    ...(maxHeight ? { maxHeight } : {}),
    ...style
  };

  return (
    <Component
      {...props}
      ref={ref}
      className={resolvedClassName}
      data-tone={tone}
      style={resolvedStyle}
    >
      {title || description ? (
        <div className="luna-panel__header">
          {title ? <div className="luna-panel__title">{title}</div> : null}
          {description ? <div className="luna-panel__description">{description}</div> : null}
        </div>
      ) : null}
      {children ? <div className="luna-panel__body">{children}</div> : null}
    </Component>
  );
});
