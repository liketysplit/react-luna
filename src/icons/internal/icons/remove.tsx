import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function RemoveOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </OutlineIcon>
  );
}

export function RemoveFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M5 11h14v2H5z" />
    </FilledIcon>
  );
}
