import type React from "react";

export type LunaPaneProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  children?: React.ReactNode;
  border?: boolean;
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderStyle?: React.CSSProperties["borderStyle"];
  borderWidth?: React.CSSProperties["borderWidth"];
  radius?: React.CSSProperties["borderRadius"];
  width?: React.CSSProperties["width"];
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  height?: React.CSSProperties["height"];
  minHeight?: React.CSSProperties["minHeight"];
  maxHeight?: React.CSSProperties["maxHeight"];
};
