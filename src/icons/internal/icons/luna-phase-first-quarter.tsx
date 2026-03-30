import type { LunaIconSvgProps } from "../types";

function LunaPhaseFirstQuarterBase({ title, decorative = true, ...props }: LunaIconSvgProps) {
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
      <path d="M12 4.5a7.5 7.5 0 0 1 0 15V4.5Z" fill="currentColor" />
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.2" opacity="0.22" />
    </svg>
  );
}

export function LunaPhaseFirstQuarterOutline(props: LunaIconSvgProps) {
  return <LunaPhaseFirstQuarterBase {...props} />;
}

export function LunaPhaseFirstQuarterFilled(props: LunaIconSvgProps) {
  return <LunaPhaseFirstQuarterBase {...props} />;
}

export default LunaPhaseFirstQuarterOutline;
