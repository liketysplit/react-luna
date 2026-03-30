import type { LunaIconSvgProps } from "../types";

export const LunaPhasesOutline = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
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
    <circle cx="4" cy="12" r="2"/><circle cx="9" cy="12" r="2.5"/><circle cx="14" cy="12" r="3"/><circle cx="19" cy="12" r="2.5"/>
  </svg>
);

export const LunaPhasesFilled = ({ title, decorative = true, ...props }: LunaIconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={decorative ? true : undefined}
    role={decorative ? undefined : "img"}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="4" cy="12" r="2"/><circle cx="9" cy="12" r="2.5"/><circle cx="14" cy="12" r="3"/><circle cx="19" cy="12" r="2.5"/>
  </svg>
);

export default LunaPhasesOutline;
