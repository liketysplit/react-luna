import type { LunaIconSvgProps } from "../types";

export const LunaBuggyOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M5 17V11h8l3 3v3"/><path d="M10 11V8h3"/>
  </svg>
);

export const LunaBuggyFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M5 17V11h8l3 3v3z"/><path d="M10 11V8h3v3z"/>
  </svg>
);

export default LunaBuggyOutline;
