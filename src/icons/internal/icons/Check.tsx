import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CheckOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </OutlineIcon>
  );
}

export function CheckFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M9.2 16.2L4.5 11.5l1.4-1.4 3.3 3.3 8.9-8.9 1.4 1.4-10.3 10.3z" />
    </FilledIcon>
  );
}
