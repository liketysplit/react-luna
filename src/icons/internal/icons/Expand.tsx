import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ExpandOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="9 3 3 3 3 9" /><line x1="3" y1="3" x2="10" y2="10" /><polyline points="15 21 21 21 21 15" /><line x1="14" y1="14" x2="21" y2="21" /><polyline points="21 9 21 3 15 3" /><line x1="14" y1="10" x2="21" y2="3" /><polyline points="3 15 3 21 9 21" /><line x1="3" y1="21" x2="10" y2="14" />
    </OutlineIcon>
  );
}

export function ExpandFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M3 3h7L7.5 5.5 10 8 8 10 5.5 7.5 3 10V3zm18 0v7l-2.5-2.5L16 10l-2-2 2.5-2.5L14 3h7zM3 21v-7l2.5 2.5L8 14l2 2-2.5 2.5L10 21H3zm18 0h-7l2.5-2.5L14 16l2-2 2.5 2.5L21 14v7z" />
    </FilledIcon>
  );
}
