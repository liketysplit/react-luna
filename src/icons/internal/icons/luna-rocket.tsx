import type { LunaIconSvgProps } from "../types";

export const LunaRocketOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M12 3c3 2 5 5 5 9v2l-5 7-5-7v-2c0-4 2-7 5-9z"/><circle cx="12" cy="10" r="2"/><path d="M9 18l-2 3"/><path d="M15 18l2 3"/>
  </svg>
);

export const LunaRocketFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M12 3c3 2 5 5 5 9v2l-5 7-5-7v-2c0-4 2-7 5-9z"/><circle cx="12" cy="10" r="2" fill="#fff"/><path d="M9 18l-2 3"/><path d="M15 18l2 3"/>
  </svg>
);

export default LunaRocketOutline;
