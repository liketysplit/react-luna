import type { LunaIconSvgProps } from "../types";

export const UploadOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M12 20V9"/><path d="m8 13 4-4 4 4"/><path d="M5 4h14"/>
  </svg>
);

export const UploadFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="m12 7.6 4.7 4.7-1.4 1.4-2.3-2.3V20h-2v-8.6l-2.3 2.3-1.4-1.4z"/><path d="M5 4h14v2H5z"/>
  </svg>
);

export default UploadOutline;
