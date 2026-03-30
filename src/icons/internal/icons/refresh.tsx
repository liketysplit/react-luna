import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function RefreshOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.5 9a9 9 0 0 1 14.1-3.4L23 10" /><path d="M20.5 15a9 9 0 0 1-14.1 3.4L1 14" />
    </OutlineIcon>
  );
}

export function RefreshFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 4a8 8 0 0 1 5.3 2H14v2h7V1h-2v3.2A10 10 0 0 0 3.7 8.6l1.9.6A8 8 0 0 1 12 4zm8.4 10.8A8 8 0 0 1 12 20a8 8 0 0 1-5.3-2H10v-2H3v7h2v-3.2A10 10 0 0 0 20.3 15.4l-1.9-.6z" />
    </FilledIcon>
  );
}
