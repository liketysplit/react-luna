import type { LunaIconSvgProps } from "../types";

export const VolumeOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M5 10h4l5-4v12l-5-4H5z"/><path d="M18 9a4 4 0 0 1 0 6"/><path d="M16 6a8 8 0 0 1 0 12"/>
  </svg>
);

export const VolumeFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M5 10h4l5-4v12l-5-4H5z"/><path d="M18 9a4 4 0 0 1 0 6" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M16 6a8 8 0 0 1 0 12" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
);

export default VolumeOutline;
