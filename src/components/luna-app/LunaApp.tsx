import React from "react";
import type { LunaAppProps } from "./LunaApp.props";
import "./LunaApp.css";

export const LunaApp = React.forwardRef<HTMLElement, LunaAppProps>(function LunaApp(
  {
    children,
    className,
    gutter,
    topGutter,
    rightGutter,
    bottomGutter,
    leftGutter,
    color,
    background,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    style,
    ...props
  },
  ref
) {
  const resolvedClassName = ["luna-app", className].filter(Boolean).join(" ");
  const resolvedStyle: React.CSSProperties = {
    ...(color ? { color } : {}),
    ...(background ? { background } : {}),
    ...(backgroundImage ? { backgroundImage } : {}),
    ...(backgroundSize ? { backgroundSize } : {}),
    ...(backgroundPosition ? { backgroundPosition } : {}),
    ...(backgroundRepeat ? { backgroundRepeat } : {}),
    ...style
  };
  const contentStyle: React.CSSProperties = {
    ...(gutter ? { padding: gutter } : {}),
    ...(topGutter ? { paddingTop: topGutter } : {}),
    ...(rightGutter ? { paddingRight: rightGutter } : {}),
    ...(bottomGutter ? { paddingBottom: bottomGutter } : {}),
    ...(leftGutter ? { paddingLeft: leftGutter } : {})
  };

  return (
    <main {...props} ref={ref} className={resolvedClassName} style={resolvedStyle}>
      <div className="luna-app__content" style={contentStyle}>
        {children}
      </div>
    </main>
  );
});
