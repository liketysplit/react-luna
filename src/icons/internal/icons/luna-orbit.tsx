import type { LunaIconSvgProps } from "../types";

export const LunaOrbitOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="8" ry="4" transform="rotate(-25 12 12)"/>
  </svg>
);

export const LunaOrbitFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="12" cy="12" r="2.4"/><ellipse cx="12" cy="12" rx="8" ry="4" transform="rotate(-25 12 12)"/>
  </svg>
);

export default LunaOrbitOutline;
