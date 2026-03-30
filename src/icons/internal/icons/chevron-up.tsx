import type { LunaIconSvgProps } from "../types";

export const ChevronUpOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="m6 14 6-6 6 6"/>
  </svg>
);

export const ChevronUpFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="m12 8-6 6 1.4 1.4L12 10.8l4.6 4.6L18 14z"/>
  </svg>
);

export default ChevronUpOutline;
