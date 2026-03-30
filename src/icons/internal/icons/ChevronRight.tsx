import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ChevronRightOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="10 6 16 12 10 18" />
    </OutlineIcon>
  );
}

export function ChevronRightFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M16 12l-6-6v12l6-6z" />
    </FilledIcon>
  );
}
