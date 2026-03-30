import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function FolderOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M3 19V7h6l2 2h10v10H3z" />
    </OutlineIcon>
  );
}

export function FolderFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M3 6h7l2 2h9v11H3V6z" />
    </FilledIcon>
  );
}
