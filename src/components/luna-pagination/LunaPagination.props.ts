import type React from "react";

export type LunaPaginationSize = "sm" | "md" | "lg";

export type LunaPaginationProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showPreviousNext?: boolean;
  disabled?: boolean;
  size?: LunaPaginationSize;
  ariaLabel?: string;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
};
