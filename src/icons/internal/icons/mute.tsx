import type { LunaIconSvgProps } from "../types";

export const MuteOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M5 10h4l5-4v12l-5-4H5z"/><path d="m17 10 4 4"/><path d="m21 10-4 4"/>
  </svg>
);

export const MuteFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M5 10h4l5-4v12l-5-4H5z"/><path d="m17 10 4 4" fill="none" stroke="#fff" stroke-width="1.75" stroke-linecap="round"/><path d="m21 10-4 4" fill="none" stroke="#fff" stroke-width="1.75" stroke-linecap="round"/>
  </svg>
);

export default MuteOutline;
