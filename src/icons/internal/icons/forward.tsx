import type { LunaIconSvgProps } from "../types";

export const ForwardOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export const ForwardFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M12.6 5.3 11.2 6.7 15.5 11H5v2h10.5l-4.3 4.3 1.4 1.4 6.7-6.7z"/>
  </svg>
);

export default ForwardOutline;
