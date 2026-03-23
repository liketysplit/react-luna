import type React from "react";

export type LunaSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type LunaSelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  options: LunaSelectOption[];
  placeholder?: string;
};
