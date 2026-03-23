import type React from "react";

export type LunaSwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
};
