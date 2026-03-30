import type { LunaIconSvgProps } from "../types";

export const LunaCometOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="16" cy="8" r="3"/><path d="M4 18c3-5 6-7 10-8"/><path d="M6 20c2-3 4-5 7-6"/>
  </svg>
);

export const LunaCometFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="16" cy="8" r="3"/><path d="M5 18c4-5 7-7 11-8"/><path d="M7 20c2-3 5-5 8-6"/>
  </svg>
);

export default LunaCometOutline;
