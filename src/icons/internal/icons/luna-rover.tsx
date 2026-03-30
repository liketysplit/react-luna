import type { LunaIconSvgProps } from "../types";

export const LunaRoverOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="6" cy="17" r="1.5"/><circle cx="10" cy="17" r="1.5"/><circle cx="14" cy="17" r="1.5"/><circle cx="18" cy="17" r="1.5"/><path d="M5 15h14v-4H7l-2 2z"/><path d="M12 7v4"/><path d="m12 7 2-2"/>
  </svg>
);

export const LunaRoverFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="6" cy="17" r="1.5"/><circle cx="10" cy="17" r="1.5"/><circle cx="14" cy="17" r="1.5"/><circle cx="18" cy="17" r="1.5"/><path d="M5 15h14v-4H7l-2 2z"/><path d="M12 7v4"/><path d="m12 7 2-2"/>
  </svg>
);

export default LunaRoverOutline;
