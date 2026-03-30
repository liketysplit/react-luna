import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CheckboxCheckedOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><polyline points="8 12 11 15 16 9" />
    </OutlineIcon>
  );
}

export function CheckboxCheckedFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 8l3 3 5-6-1.5-1.3-3.6 4.3-1.6-1.6L8 12z" />
    </FilledIcon>
  );
}
