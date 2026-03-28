# LunaPagination

`LunaPagination` is the controlled page-navigation composite for `react-luna`.

It owns:
- navigation landmark semantics
- collapsed page-range rendering with ellipsis gaps
- previous and next page controls
- current-page treatment
- size-aware pagination control layout

## Props

- `currentPage: number`
- `totalPages: number`
- `onPageChange?: (page: number) => void`
- `siblingCount?: number`
- `boundaryCount?: number`
- `showPreviousNext?: boolean`
- `disabled?: boolean`
- `size?: "sm" | "md" | "lg"`
- `ariaLabel?: string`
- `previousLabel?: React.ReactNode`
- `nextLabel?: React.ReactNode`

`className`, `style`, and other root `nav` attributes pass through to the navigation element.

## Contract

- `LunaPagination` is controlled; `currentPage` is the active page and `onPageChange` reports requested page changes
- `totalPages <= 0` renders nothing
- page ranges collapse with ellipsis when the full set would be too wide
- `siblingCount` controls how many pages stay visible on each side of the current page
- `boundaryCount` controls how many pages stay visible at the beginning and end of the range
- a single hidden page is shown directly instead of replaced by an ellipsis
- the current page sets `aria-current="page"`
- previous and next controls disable at the range boundaries
- `showPreviousNext={false}` renders the page list without directional controls
- `disabled` disables all interactive controls without changing the visible range

## Theme Integration

`LunaPagination` is styled through local CSS variables layered on top of the shared button and theme tokens for:
- page-control gap
- inactive control background, border, and foreground
- current-page background and foreground
- compact and large control minimum widths
- ellipsis color
