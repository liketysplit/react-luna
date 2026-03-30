import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function WarningOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 3L2 20h20L12 3z" /><line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="1" />
    </OutlineIcon>
  );
}

export function WarningFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3L2 20h20L12 3zm1 13h-2v-2h2v2zm0-4h-2V8h2v4z" />
    </FilledIcon>
  );
}
