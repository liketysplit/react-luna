import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function AddOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </OutlineIcon>
  );
}

export function AddFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </FilledIcon>
  );
}
