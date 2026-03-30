import type { LunaIconSvgProps } from "../types";

export const LunaOrbitRingOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-20 12 12)"/>
  </svg>
);

export const LunaOrbitRingFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-20 12 12)"/>
  </svg>
);

export default LunaOrbitRingOutline;
