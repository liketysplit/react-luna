import type { LunaIconSvgProps } from "../types";

export const LunaMoonStarOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M15.5 4.5A7.5 7.5 0 1 0 19 16.2 6.4 6.4 0 1 1 15.5 4.5z"/><path d="m18.5 4 .7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7z"/>
  </svg>
);

export const LunaMoonStarFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M16 4a8 8 0 1 0 0 16 6.5 6.5 0 1 1 0-16z"/><path d="m18.6 4 .6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6z"/>
  </svg>
);

export default LunaMoonStarOutline;
