import type { LunaIconSvgProps } from "../types";

export const LunaCrescentOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M15 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18z"/>
  </svg>
);

export const LunaCrescentFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M16 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18z"/>
  </svg>
);

export default LunaCrescentOutline;
