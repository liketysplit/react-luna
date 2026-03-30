import React from "react";
import type { LunaIconSvgProps } from "../types";

function LunaPhaseWaningGibbousBase({
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
      <circle cx="12" cy="12" r="7.5" fill="currentColor" opacity="0.18" />
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="black" />
          <circle cx="12" cy="12" r="7.5" fill="white" />
          <circle cx="7.4" cy="12" r="6.9" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{children}</g>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.2" opacity="0.22" />
    </svg>
  );
}

export function LunaPhaseWaningGibbousOutline(props: LunaIconSvgProps) {
  return (
    <LunaPhaseWaningGibbousBase {...props}>
      <circle cx="12" cy="12" r="7.5" fill="currentColor" opacity="0.92" />
    </LunaPhaseWaningGibbousBase>
  );
}

export function LunaPhaseWaningGibbousFilled(props: LunaIconSvgProps) {
  return (
    <LunaPhaseWaningGibbousBase {...props}>
      <circle cx="12" cy="12" r="7.5" fill="currentColor" />
    </LunaPhaseWaningGibbousBase>
  );
}

export default LunaPhaseWaningGibbousOutline;
