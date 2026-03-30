import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function SuccessOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" />
    </OutlineIcon>
  );
}

export function SuccessFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zm-1 12l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L17 9l-6 6z" />
    </FilledIcon>
  );
}
