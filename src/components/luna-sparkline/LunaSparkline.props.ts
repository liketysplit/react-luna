import type React from "react";

export type LunaSparklineTone = "neutral" | "positive" | "negative";

export type LunaSparklineProps = Omit<
  React.SVGAttributes<SVGSVGElement>,
  "children" | "color" | "aria-label"
> & {
  data: number[];
  ariaLabel: string;
  tone?: LunaSparklineTone;
  size?: string;
  strokeWidth?: string | number;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
};
