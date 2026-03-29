import type React from "react";

export type LunaRadioGroupOrientation = "vertical" | "horizontal";

export type LunaRadioGroupItem = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type LunaRadioGroupProps = Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children" | "defaultValue" | "onChange"
> & {
  items: LunaRadioGroupItem[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: LunaRadioGroupOrientation;
  required?: boolean;
};
