import type { LunaIconSvgProps } from "../types";

export function RadioCheckedOutline({ title, decorative = true, ...props }: LunaIconSvgProps) {
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
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function RadioCheckedFilled({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zm0 11a3 3 0 1 1 0-6a3 3 0 0 1 0 6z" />
    </svg>
  );
}

export default RadioCheckedOutline;
