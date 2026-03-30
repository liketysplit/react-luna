import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function HideOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M3 3l18 18" /><path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2" /><path d="M9.9 5.1A11.7 11.7 0 0 1 12 5c6.5 0 10 7 10 7a18.6 18.6 0 0 1-3.6 4.2" /><path d="M6 6.3C3.5 8.1 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4-.7" />
    </OutlineIcon>
  );
}

export function HideFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M2.7 1.3L1.3 2.7l3 3A14.7 14.7 0 0 0 2 12s3.5 6 10 6c1.8 0 3.3-.4 4.7-1l6 6 1.4-1.4-21.4-21.3zM12 9a3 3 0 0 1 3 3c0 .4-.1.8-.2 1.1l-3.9-3.9c.3-.1.7-.2 1.1-.2zm0-4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.6 3.4l-2.9-2.9c.3-.5.5-1 .5-1.5a5 5 0 0 0-5-5c-.5 0-1 .1-1.5.2L8.3 4.1c1.1-.1 2.3-.1 3.7-.1z" />
    </FilledIcon>
  );
}
