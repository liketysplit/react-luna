import type { LunaIconSvgProps } from "../types";

export const LunaLoaderOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M4 12a8 8 0 0 1 8-8"/><path d="M12 4a8 8 0 0 1 7 4"/><path d="M20 12a8 8 0 0 1-4 7"/><path d="M12 20a8 8 0 0 1-7-4"/><path d="M4 12a8 8 0 0 1 1-4"/>
  </svg>
);

export const LunaLoaderFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="4" cy="12" r="1.6"/><circle cx="9" cy="12" r="2"/><circle cx="14" cy="12" r="2.4"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

export default LunaLoaderOutline;
