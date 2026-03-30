import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function LoadingOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M21 12a9 9 0 1 1-9-9" />
    </OutlineIcon>
  );
}

export function LoadingFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3z" />
    </FilledIcon>
  );
}
