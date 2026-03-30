import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function CalendarOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="3" y1="11" x2="21" y2="11" />
    </OutlineIcon>
  );
}

export function CalendarFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M8 2h2v3h4V2h2v3h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V2zm-3 9v8h14v-8H5z" />
    </FilledIcon>
  );
}
