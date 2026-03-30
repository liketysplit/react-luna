import type { LunaIconSvgProps } from "../types";

export const UsersOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="9" cy="9" r="3.5"/><circle cx="16.5" cy="10.5" r="2.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M14 19a4 4 0 0 1 6 0"/>
  </svg>
);

export const UsersFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M9 5.5A3.5 3.5 0 1 1 9 12a3.5 3.5 0 0 1 0-6.5zM16.5 8a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.5 20a5.5 5.5 0 0 1 11 0zM14 20a4 4 0 0 1 6 0z"/>
  </svg>
);

export default UsersOutline;
