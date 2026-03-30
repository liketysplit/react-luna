import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function FileOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M14 2H6v20h12V8z" /><polyline points="14 2 14 8 20 8" />
    </OutlineIcon>
  );
}

export function FileFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M6 2h8l6 6v14H6V2zm7 1.5V9h5.5L13 3.5z" />
    </FilledIcon>
  );
}
