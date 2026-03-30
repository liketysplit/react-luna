import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CollapseOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="10 10 3 3 9 3" /><polyline points="3 9 3 3 9 3" /><polyline points="14 14 21 21 15 21" /><polyline points="21 15 21 21 15 21" /><polyline points="14 10 21 3 15 3" /><polyline points="21 9 21 3 15 3" /><polyline points="10 14 3 21 9 21" /><polyline points="3 15 3 21 9 21" />
    </OutlineIcon>
  );
}

export function CollapseFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M3 3h6L6.5 5.5 10 9 8 11 4.5 7.5 3 9V3zm18 0v6l-1.5-1.5L16 11l-2-2 3.5-3.5L15 3h6zM3 21v-6l1.5 1.5L8 13l2 2-3.5 3.5L9 21H3zm18 0h-6l2.5-2.5L14 15l2-2 3.5 3.5L21 15v6z" />
    </FilledIcon>
  );
}
