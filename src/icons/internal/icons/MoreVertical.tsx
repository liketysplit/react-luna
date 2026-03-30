import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function MoreVerticalOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="6" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="18" r="1.5" />
    </OutlineIcon>
  );
}

export function MoreVerticalFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 4.5A1.5 1.5 0 1 0 12 7.5A1.5 1.5 0 1 0 12 4.5zM12 10.5A1.5 1.5 0 1 0 12 13.5A1.5 1.5 0 1 0 12 10.5zM12 16.5A1.5 1.5 0 1 0 12 19.5A1.5 1.5 0 1 0 12 16.5z" />
    </FilledIcon>
  );
}
