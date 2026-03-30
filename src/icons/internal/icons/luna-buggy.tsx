import type { LunaIconSvgProps } from "../types";

export const LunaBuggyOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M5.4 11.4h8.2l2.5 2.1h2v3.3H5.4v-5.4Z" fill="currentColor" opacity="0.92" />
    <path d="M13.2 11.4v2.1h2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.3" cy="18" r="1.6" fill="currentColor" />
    <circle cx="15.9" cy="18" r="1.6" fill="currentColor" />
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
    <path d="M5.4 11.4h8.2l2.5 2.1h2v3.3H5.4v-5.4Z" />
    <path d="M13.2 11.4v2.1h2.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.3" cy="18" r="1.6" />
    <circle cx="15.9" cy="18" r="1.6" />
  </svg>
);

export default LunaBuggyOutline;
