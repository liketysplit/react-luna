import type React from "react";

export type LunaAppProps = Omit<React.HTMLAttributes<HTMLElement>, "color" | "children"> & {
  children: React.ReactNode;
  gutter?: React.CSSProperties["padding"];
  topGutter?: React.CSSProperties["paddingTop"];
  rightGutter?: React.CSSProperties["paddingRight"];
  bottomGutter?: React.CSSProperties["paddingBottom"];
  leftGutter?: React.CSSProperties["paddingLeft"];
  color?: React.CSSProperties["color"];
  background?: React.CSSProperties["background"];
  backgroundImage?: React.CSSProperties["backgroundImage"];
  backgroundSize?: React.CSSProperties["backgroundSize"];
  backgroundPosition?: React.CSSProperties["backgroundPosition"];
  backgroundRepeat?: React.CSSProperties["backgroundRepeat"];
};
