import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function DeleteOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <polyline points="3 6 5 6 21 6" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </OutlineIcon>
  );
}

export function DeleteFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M9 3h6l1 2h5v2H3V5h5l1-2zm-3 5h12l-1 13H7L6 8zm3 2v9h2v-9H9zm4 0v9h2v-9h-2z" />
    </FilledIcon>
  );
}
