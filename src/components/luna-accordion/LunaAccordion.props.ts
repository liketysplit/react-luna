import type React from "react";

export type LunaAccordionValue = string | string[] | null;

export type LunaAccordionItem = {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type LunaAccordionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange" | "value"
> & {
  items: LunaAccordionItem[];
  value?: LunaAccordionValue;
  defaultValue?: LunaAccordionValue;
  onValueChange?: (value: LunaAccordionValue) => void;
  multiple?: boolean;
  collapsible?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  gap?: string;
  itemGap?: string;
  panelPadding?: string;
  rounded?: boolean;
};
