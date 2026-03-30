import type { LunaIconSvgProps } from "../types";

export const LunaRoverOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <rect x="5.7" y="10.7" width="11.3" height="4.5" rx="1.7" fill="currentColor" opacity="0.92" />
    <rect x="8" y="8.6" width="5.1" height="2.4" rx="1.1" fill="currentColor" opacity="0.72" />
    <path d="M13.1 9.6h2.5m-2 0 1.5-1.5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    <circle cx="6.9" cy="17.4" r="1.35" fill="currentColor" />
    <circle cx="10.4" cy="17.4" r="1.35" fill="currentColor" />
    <circle cx="13.9" cy="17.4" r="1.35" fill="currentColor" />
    <circle cx="17.4" cy="17.4" r="1.35" fill="currentColor" />
  </svg>
);

export const LunaRoverFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <rect x="5.7" y="10.7" width="11.3" height="4.5" rx="1.7" />
    <rect x="8" y="8.6" width="5.1" height="2.4" rx="1.1" opacity="0.76" />
    <path d="M13.1 9.6h2.5m-2 0 1.5-1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="6.9" cy="17.4" r="1.35" />
    <circle cx="10.4" cy="17.4" r="1.35" />
    <circle cx="13.9" cy="17.4" r="1.35" />
    <circle cx="17.4" cy="17.4" r="1.35" />
  </svg>
);

export default LunaRoverOutline;
