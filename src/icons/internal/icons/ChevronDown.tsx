import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ChevronDownOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="6 10 12 16 18 10" />
    </OutlineIcon>
  );
}

export function ChevronDownFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 16l6-6H6l6 6z" />
    </FilledIcon>
  );
}
