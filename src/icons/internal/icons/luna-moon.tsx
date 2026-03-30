import type { LunaIconSvgProps } from "../types";

export const LunaMoonOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M16.5 3.5A8.5 8.5 0 1 0 20.5 17 7.5 7.5 0 1 1 16.5 3.5z"/>
  </svg>
);

export const LunaMoonFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M15.5 3.5A8.8 8.8 0 1 0 20 16.7 7.4 7.4 0 1 1 15.5 3.5z"/>
  </svg>
);

export default LunaMoonOutline;
