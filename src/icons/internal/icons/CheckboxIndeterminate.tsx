import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CheckboxIndeterminateOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="12" x2="16" y2="12" />
    </OutlineIcon>
  );
}

export function CheckboxIndeterminateFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 7v2h8v-2H8z" />
    </FilledIcon>
  );
}
