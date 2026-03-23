import type React from "react";

export type LunaMultiselectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type LunaMultiselectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "multiple" | "value" | "defaultValue" | "onChange"
> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  options: LunaMultiselectOption[];
  placeholder?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};
