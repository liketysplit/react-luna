import type { LunaIconSvgProps } from "../types";

export function LunaPhaseNewOutline({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function LunaPhaseNewFilled({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="7.5" fill="currentColor" opacity="0.18" />
    </svg>
  );
}

export default LunaPhaseNewOutline;
