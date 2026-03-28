import type React from "react";

export type LunaTableAlign = "left" | "center" | "right";
export type LunaTableDensity = "compact" | "default" | "comfortable";

export type LunaTableColumn<RowData extends Record<string, unknown>> = {
  id?: string;
  header: React.ReactNode;
  accessorKey?: Extract<keyof RowData, string>;
  renderCell?: (row: RowData, rowIndex: number) => React.ReactNode;
  align?: LunaTableAlign;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
};

export type LunaTableProps<RowData extends Record<string, unknown>> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  columns: Array<LunaTableColumn<RowData>>;
  rows: RowData[];
  caption?: React.ReactNode;
  emptyState?: React.ReactNode;
  density?: LunaTableDensity;
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  getRowKey?: (row: RowData, rowIndex: number) => React.Key;
  getRowClassName?: (row: RowData, rowIndex: number) => string | undefined;
};
