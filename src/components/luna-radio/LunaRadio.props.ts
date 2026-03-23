import type React from "react";

export type LunaRadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
};
