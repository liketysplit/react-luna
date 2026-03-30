import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function InfoOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="12" r="9" /><line x1="12" y1="10" x2="12" y2="16" /><circle cx="12" cy="7" r="1" />
    </OutlineIcon>
  );
}

export function InfoFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zm1 13h-2v-5h2v5zm-1-7.25a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5z" />
    </FilledIcon>
  );
}
