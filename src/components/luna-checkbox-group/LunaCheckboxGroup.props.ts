import type React from "react";

export type LunaCheckboxGroupOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type LunaCheckboxGroupProps = Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children" | "defaultValue" | "onChange"
> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  name?: string;
  options: LunaCheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};
