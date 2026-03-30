import type { LunaIconSvgProps } from "../types";

export function RadioUncheckedOutline({ title, decorative = true, ...props }: LunaIconSvgProps) {
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
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export function RadioUncheckedFilled({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16z" fillOpacity="0.2" />
    </svg>
  );
}

export default RadioUncheckedOutline;
