import type React from "react";

export type LunaDateRangeValue = {
  start?: string;
  end?: string;
};

type LunaDatePickerBaseProps = {
  label?: React.ReactNode;
  externalLabel?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  buttonPosition?: "pre" | "post";
};

type LunaDatePickerSimpleOrPickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "size" | "type" | "value" | "defaultValue" | "onChange"
> &
  LunaDatePickerBaseProps & {
    mode?: "simple" | "picker";
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
  };

type LunaDatePickerRangeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "size" | "type" | "value" | "defaultValue" | "onChange"
> &
  LunaDatePickerBaseProps & {
    mode: "range";
    value?: LunaDateRangeValue;
    defaultValue?: LunaDateRangeValue;
    onChange?: (value: LunaDateRangeValue) => void;
  };

export type LunaDatePickerProps =
  | LunaDatePickerSimpleOrPickerProps
  | LunaDatePickerRangeProps;
