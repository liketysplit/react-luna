import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ChevronUpOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="6 14 12 8 18 14" />
    </OutlineIcon>
  );
}

export function ChevronUpFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 8l-6 6h12l-6-6z" />
    </FilledIcon>
  );
}
