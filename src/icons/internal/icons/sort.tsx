import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function SortOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <line x1="8" y1="6" x2="8" y2="18" /><polyline points="5 9 8 6 11 9" /><line x1="16" y1="18" x2="16" y2="6" /><polyline points="13 15 16 18 19 15" />
    </OutlineIcon>
  );
}

export function SortFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M7 6l-3 3h2v9h2V9h2L7 6zm10 12l3-3h-2V6h-2v9h-2l3 3z" />
    </FilledIcon>
  );
}
