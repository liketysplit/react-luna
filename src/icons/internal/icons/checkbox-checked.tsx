import type { LunaIconSvgProps } from "../types";

export function CheckboxCheckedOutline({ title, decorative = true, ...props }: LunaIconSvgProps) {
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
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

export function CheckboxCheckedFilled({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 8l3 3 5-6-1.5-1.3-3.6 4.3-1.6-1.6L8 12z" />
    </svg>
  );
}

export default CheckboxCheckedOutline;
