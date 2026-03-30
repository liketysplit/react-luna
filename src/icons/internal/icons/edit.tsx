import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function EditOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </OutlineIcon>
  );
}

export function EditFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M3 17.2V21h3.8L18.2 9.6 14.4 5.8 3 17.2zm17.7-10a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1.3 1.3 3.8 3.8 1.4-1.4z" />
    </FilledIcon>
  );
}
