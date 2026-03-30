import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function MenuOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
    </OutlineIcon>
  );
}

export function MenuFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
    </FilledIcon>
  );
}
