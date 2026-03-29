import type React from "react";

export type LunaBreadcrumbSize = "sm" | "md" | "lg";

export type LunaBreadcrumbItem = {
  key?: React.Key;
  label: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  current?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

export type LunaBreadcrumbProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  items: LunaBreadcrumbItem[];
  ariaLabel?: string;
  separator?: React.ReactNode;
  maxItems?: number;
  size?: LunaBreadcrumbSize;
  collapseLabel?: string;
};
