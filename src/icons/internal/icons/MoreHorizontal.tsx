import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function MoreHorizontalOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" />
    </OutlineIcon>
  );
}

export function MoreHorizontalFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M6 10.5A1.5 1.5 0 1 0 6 13.5A1.5 1.5 0 1 0 6 10.5zM12 10.5A1.5 1.5 0 1 0 12 13.5A1.5 1.5 0 1 0 12 10.5zM18 10.5A1.5 1.5 0 1 0 18 13.5A1.5 1.5 0 1 0 18 10.5z" />
    </FilledIcon>
  );
}
