import type { LunaIconSvgProps } from "../types";

export const SaveOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <path d="M5 5h12l2 2v12H5z"/><path d="M8 5v5h7"/><path d="M8 19v-6h8v6"/>
  </svg>
);

export const SaveFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M5 4h11l3 3v13H5z"/><path d="M8 4h7v5H8z" fill="#fff"/><path d="M8 13h8v7H8z" fill="#fff" opacity=".9"/>
  </svg>
);

export default SaveOutline;
