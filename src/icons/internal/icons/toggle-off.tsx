import type { LunaIconSvgProps } from "../types";

export const ToggleOffOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="8" cy="12" r="3"/>
  </svg>
);

export const ToggleOffFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="8" cy="12" r="3" fill="#fff"/>
  </svg>
);

export default ToggleOffOutline;
