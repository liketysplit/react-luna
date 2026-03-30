import type React from "react";

export type LunaFormAlign = "left" | "center" | "right";

export type LunaFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "title"> & {
  as?: React.ElementType;
  header?: React.ReactNode;
  actions?: React.ReactNode;
  actionsAlign?: LunaFormAlign;
  actionsGap?: string;
  gap?: string;
};
