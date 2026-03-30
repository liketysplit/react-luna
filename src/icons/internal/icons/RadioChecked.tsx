import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function RadioCheckedOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" />
    </OutlineIcon>
  );
}

export function RadioCheckedFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zm0 11a3 3 0 1 1 0-6a3 3 0 0 1 0 6z" />
    </FilledIcon>
  );
}
