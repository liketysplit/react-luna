import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function SearchOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="11" cy="11" r="7" /><line x1="20" y1="20" x2="16.65" y2="16.65" />
    </OutlineIcon>
  );
}

export function SearchFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M10.5 3a7.5 7.5 0 1 0 4.66 13.38l4.23 4.24 1.41-1.42-4.23-4.23A7.5 7.5 0 0 0 10.5 3zm0 2a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11z" />
    </FilledIcon>
  );
}
