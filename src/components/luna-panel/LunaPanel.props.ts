import type React from "react";

export type LunaPanelTone = "default" | "chrome" | "emphasis";

export type LunaPanelProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: LunaPanelTone;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  minHeight?: React.CSSProperties["minHeight"];
  maxHeight?: React.CSSProperties["maxHeight"];
  children?: React.ReactNode;
};
