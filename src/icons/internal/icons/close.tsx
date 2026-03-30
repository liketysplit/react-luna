import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CloseOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </OutlineIcon>
  );
}

export function CloseFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M18.3 7.1L16.9 5.7 12 10.6 7.1 5.7 5.7 7.1l4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9z" />
    </FilledIcon>
  );
}
