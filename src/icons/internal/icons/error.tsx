import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ErrorOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="9" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </OutlineIcon>
  );
}

export function ErrorFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zm3 10.6L13.6 15 12 13.4 10.4 15 9 13.6 10.6 12 9 10.4 10.4 9 12 10.6 13.6 9 15 10.4 13.4 12 15 13.6z" />
    </FilledIcon>
  );
}
