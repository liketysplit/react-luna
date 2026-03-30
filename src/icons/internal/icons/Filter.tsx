import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function FilterOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polygon points="4 5 20 5 14 12 14 19 10 17 10 12 4 5" />
    </OutlineIcon>
  );
}

export function FilterFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M4 5h16l-6 7v7l-4-2v-5L4 5z" />
    </FilledIcon>
  );
}
