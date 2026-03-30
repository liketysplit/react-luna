import type { LunaIconSvgProps } from "../types";

export const DownloadOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M12 4v11"/><path d="m8 11 4 4 4-4"/><path d="M5 20h14"/>
  </svg>
);

export const DownloadFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M11 4h2v8.6l2.3-2.3 1.4 1.4L12 16.4l-4.7-4.7 1.4-1.4 2.3 2.3z"/><path d="M5 18h14v2H5z"/>
  </svg>
);

export default DownloadOutline;
