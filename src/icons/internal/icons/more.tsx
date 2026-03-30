import type { LunaIconSvgProps } from "../types";

export const MoreOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>
  </svg>
);

export const MoreFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="6" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="18" cy="12" r="1.8"/>
  </svg>
);

export default MoreOutline;
