import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CheckboxUncheckedOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </OutlineIcon>
  );
}

export function CheckboxUncheckedFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fillOpacity="0.2" />
    </FilledIcon>
  );
}
