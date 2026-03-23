import type React from "react";

export type LunaDateInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "size" | "type"
> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};
