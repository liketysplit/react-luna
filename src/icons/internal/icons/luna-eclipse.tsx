import type { LunaIconSvgProps } from "../types";

export const LunaEclipseOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="10" cy="12" r="6"/><path d="M14 6a6 6 0 1 1 0 12 6 6 0 0 0 0-12z"/>
  </svg>
);

export const LunaEclipseFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="10" cy="12" r="6"/><path d="M14 6a6 6 0 1 1 0 12 6 6 0 0 0 0-12z" fill="#fff" opacity=".35"/>
  </svg>
);

export default LunaEclipseOutline;
