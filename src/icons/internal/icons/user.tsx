import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function UserOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="4" />
    </OutlineIcon>
  );
}

export function UserFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 12a5 5 0 1 0 0-10a5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.7-8 6v1h16v-1c0-3.3-3.6-6-8-6z" />
    </FilledIcon>
  );
}
