import type React from "react";

export type LunaInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};
