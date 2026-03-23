import type React from "react";

export type LunaTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;
  minHeight?: string;
  height?: string;
};
