import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ChevronLeftOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="14 6 8 12 14 18" />
    </OutlineIcon>
  );
}

export function ChevronLeftFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M8 12l6 6V6l-6 6z" />
    </FilledIcon>
  );
}
