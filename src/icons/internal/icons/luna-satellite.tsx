import type React from "react";
import type { LunaIconSvgProps } from "../types";

function SatelliteFrame({
  title,
  decorative = true,
  children,
  ...props
}: LunaIconSvgProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function LunaSatelliteOutline(props: LunaIconSvgProps) {
  return (
    <SatelliteFrame {...props}>
      <rect x="3.75" y="9.25" width="4" height="5.5" rx="1.2" fill="currentColor" opacity="0.92" />
      <rect x="16.25" y="9.25" width="4" height="5.5" rx="1.2" fill="currentColor" opacity="0.92" />
      <rect x="9.6" y="9.1" width="4.8" height="5.8" rx="1.6" fill="currentColor" opacity="0.92" />
      <path d="M7.75 11.95h1.85m4.8 0h1.85" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m12 9.1 2.9-2.9m-5.8 11.6 2.9-2.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="0.85" fill="currentColor" opacity="0.22" />
    </SatelliteFrame>
  );
}

export function LunaSatelliteFilled(props: LunaIconSvgProps) {
  return (
    <SatelliteFrame {...props}>
      <rect x="3.75" y="9.25" width="4" height="5.5" rx="1.2" fill="currentColor" opacity="0.8" />
      <rect x="16.25" y="9.25" width="4" height="5.5" rx="1.2" fill="currentColor" opacity="0.8" />
      <rect x="9.6" y="9.1" width="4.8" height="5.8" rx="1.6" fill="currentColor" />
      <path d="M7.75 11.95h1.85m4.8 0h1.85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m12 9.1 2.9-2.9m-5.8 11.6 2.9-2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SatelliteFrame>
  );
}

export default LunaSatelliteOutline;
