# LunaTable

`LunaTable` is the base composite for structured row and column data in `react-luna`.

It owns:
- a semantic table inside a scroll shell
- column headers and cell rendering
- row striping and hover treatment
- density control
- sticky header treatment
- empty-state rendering

Default root element:
- `div`

## Props

- `columns: Array<LunaTableColumn<RowData>>`
- `rows: RowData[]`
- `caption?: React.ReactNode`
- `emptyState?: React.ReactNode`
- `density?: "compact" | "default" | "comfortable"`
- `striped?: boolean`
- `hoverable?: boolean`
- `stickyHeader?: boolean`
- `getRowKey?: (row: RowData, rowIndex: number) => React.Key`
- `getRowClassName?: (row: RowData, rowIndex: number) => string | undefined`

`LunaTableColumn<RowData>` supports:
- `id?: string`
- `header: React.ReactNode`
- `accessorKey?: Extract<keyof RowData, string>`
- `renderCell?: (row: RowData, rowIndex: number) => React.ReactNode`
- `align?: "left" | "center" | "right"`
- `width?: string`
- `headerClassName?: string`
- `cellClassName?: string`

## Contract

- `columns` define the table header and the cell renderer for each column
- `accessorKey` reads plain row values directly
- `renderCell` handles richer cell content such as badges, actions, or stacked text
- `getRowKey` should be supplied for stable row identity when the data has a natural key
- `getRowClassName` decorates body rows without changing the base table contract
- `emptyState` renders a single row that spans all columns
- the root scroll shell allows horizontal overflow without changing the inner table semantics

## Theme Integration

`LunaTable` uses the shared theme tokens for:
- surface background
- foreground and muted text
- borders and dividers
- spacing
- radius
- shadow

Consumers can override the component with table-specific custom properties such as:
- `--luna-table-bg`
- `--luna-table-border`
- `--luna-table-header-bg`
- `--luna-table-header-fg`
- `--luna-table-divider`
- `--luna-table-caption-fg`
- `--luna-table-empty-fg`
