import type { LunaIconSvgProps } from "../types";

export function CheckboxIndeterminateOutline({
  title,
  decorative = true,
  ...props
}: LunaIconSvgProps) {
  return (
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function CheckboxIndeterminateFilled({
  title,
  decorative = true,
  ...props
}: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 7v2h8v-2H8z" />
    </svg>
  );
}

export default CheckboxIndeterminateOutline;
