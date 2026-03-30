import { BaseIconProps, OutlineIcon, FilledIcon } from "../BaseIcon";

export function HomeOutline(props: BaseIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" />
    </OutlineIcon>
  );
}

export function HomeFilled(props: BaseIconProps) {
  return (
    <FilledIcon {...props}>
      <path d="M12 3l9 7v11h-6v-6H9v6H3V10l9-7z" />
    </FilledIcon>
  );
}
