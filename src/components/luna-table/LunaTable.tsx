import React from "react";
import type { LunaTableColumn, LunaTableProps } from "./LunaTable.props";
import "./LunaTable.css";

type LunaTableComponent = <RowData extends Record<string, unknown>>(
  props: LunaTableProps<RowData> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getColumnId<RowData extends Record<string, unknown>>(
  column: LunaTableColumn<RowData>,
  index: number
) {
  return column.id ?? column.accessorKey ?? `column-${index}`;
}

function getCellContent<RowData extends Record<string, unknown>>(
  column: LunaTableColumn<RowData>,
  row: RowData,
  rowIndex: number
) {
  if (column.renderCell) {
    return column.renderCell(row, rowIndex);
  }

  if (column.accessorKey) {
    return row[column.accessorKey] as React.ReactNode;
  }

  return null;
}

export const LunaTable = React.forwardRef(function LunaTableInner<
  RowData extends Record<string, unknown>
>(
  {
    caption,
    className,
    columns,
    density = "default",
    emptyState = "No rows to display.",
    getRowClassName,
    getRowKey,
    hoverable,
    rows,
    stickyHeader,
    striped,
    style,
    ...props
  }: LunaTableProps<RowData>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const rootClassName = toClassName([
    "luna-table",
    striped && "luna-table--striped",
    hoverable && "luna-table--hoverable",
    stickyHeader && "luna-table--sticky-header",
    className
  ]);

  return (
    <div
      {...props}
      ref={ref}
      className={rootClassName}
      data-density={density}
      style={style}
    >
      <table className="luna-table__table">
        {caption ? <caption className="luna-table__caption">{caption}</caption> : null}
        <thead className="luna-table__head">
          <tr className="luna-table__row luna-table__row--head">
            {columns.map((column, columnIndex) => (
              <th
                className={toClassName([
                  "luna-table__header",
                  column.headerClassName
                ])}
                data-align={column.align ?? "left"}
                key={getColumnId(column, columnIndex)}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="luna-table__body">
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr
                className={toClassName([
                  "luna-table__row",
                  getRowClassName?.(row, rowIndex)
                ])}
                key={getRowKey?.(row, rowIndex) ?? rowIndex}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    className={toClassName([
                      "luna-table__cell",
                      column.cellClassName
                    ])}
                    data-align={column.align ?? "left"}
                    key={`${getColumnId(column, columnIndex)}-${rowIndex}`}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {getCellContent(column, row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="luna-table__row luna-table__row--empty">
              <td className="luna-table__empty" colSpan={columns.length || 1}>
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}) as LunaTableComponent;
