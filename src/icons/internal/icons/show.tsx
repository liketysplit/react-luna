import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function ShowOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M2 12s3.5-6 10-6s10 6 10 6s-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
    </OutlineIcon>
  );
}

export function ShowFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 6c-6.5 0-10 6-10 6s3.5 6 10 6s10-6 10-6s-3.5-6-10-6zm0 9a3 3 0 1 1 0-6a3 3 0 0 1 0 6z" />
    </FilledIcon>
  );
}
