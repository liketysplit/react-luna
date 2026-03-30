import type { LunaIconSvgProps } from "../types";

export const BackOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
  </svg>
);

export const BackFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M11.4 5.3 4.7 12l6.7 6.7 1.4-1.4L8.5 13H19v-2H8.5l4.3-4.3z"/>
  </svg>
);

export default BackOutline;
