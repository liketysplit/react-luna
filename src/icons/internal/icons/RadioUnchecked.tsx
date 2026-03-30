import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function RadioUncheckedOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="8" />
    </OutlineIcon>
  );
}

export function RadioUncheckedFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16z" fillOpacity="0.2" />
    </FilledIcon>
  );
}
