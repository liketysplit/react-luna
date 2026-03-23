import type React from "react";

export type LunaAutocompleteOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type LunaAutocompleteProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue" | "onChange"
> & {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  options: LunaAutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  noResultsText?: React.ReactNode;
};
