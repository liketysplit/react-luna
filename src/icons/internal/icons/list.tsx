import type { LunaIconSvgProps } from "../types";

export const ListOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/>
  </svg>
);

export const ListFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <rect x="9" y="5" width="11" height="2" rx="1"/><rect x="9" y="11" width="11" height="2" rx="1"/><rect x="9" y="17" width="11" height="2" rx="1"/><circle cx="5" cy="6" r="1.2"/><circle cx="5" cy="12" r="1.2"/><circle cx="5" cy="18" r="1.2"/>
  </svg>
);

export default ListOutline;
