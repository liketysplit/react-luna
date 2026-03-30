import type { LunaIconSvgProps } from "../types";

const starPath =
  "M12 5.4c.4 0 .73.26.86.64l1.2 3.44 3.63 1.12c.4.12.67.49.67.89s-.27.77-.67.89l-3.63 1.12-1.2 3.44c-.13.38-.46.64-.86.64s-.73-.26-.86-.64l-1.2-3.44-3.63-1.12c-.4-.12-.67-.49-.67-.89s.27-.77.67-.89l3.63-1.12 1.2-3.44c.13-.38.46-.64.86-.64Z";

export function LunaStarOutline({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d={starPath} fill="currentColor" opacity="0.92" />
    </svg>
  );
}

export function LunaStarFilled({ title, decorative = true, ...props }: LunaIconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d={starPath} fill="currentColor" />
    </svg>
  );
}

export default LunaStarOutline;
