import React from "react";
import type { LunaIconSvgProps } from "../types";

function LunaCrescentBase({
  title,
  decorative = true,
  children,
  ...props
}: LunaIconSvgProps & { children: React.ReactNode }) {
  const maskId = React.useId();

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="black" />
          <circle cx="12" cy="12" r="7.5" fill="white" />
          <circle cx="15.5" cy="10.5" r="6.25" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{children}</g>
    </svg>
  );
}

export function LunaCrescentOutline(props: LunaIconSvgProps) {
  return (
    <LunaCrescentBase {...props}>
      <circle
        cx="12"
        cy="12"
        r="7.5"
        fill="currentColor"
        opacity="0.92"
      />
    </LunaCrescentBase>
  );
}

export function LunaCrescentFilled(props: LunaIconSvgProps) {
  return (
    <LunaCrescentBase {...props}>
      <circle cx="12" cy="12" r="7.5" fill="currentColor" />
    </LunaCrescentBase>
  );
}

export default LunaCrescentOutline;
