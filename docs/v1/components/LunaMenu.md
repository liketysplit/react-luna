# LunaMenu

`LunaMenu` is the lightweight action menu composite for `react-luna`.

It owns:
- trigger-driven open and close behavior
- keyboard navigation across menu actions
- outside-click and `Escape` dismissal
- theme-aware floating surface and item states

It does not own:
- portals
- collision detection
- nested submenus
- section headers or dividers

## Props

- `children: React.ReactElement`
- `items: Array<{ value: string; label: React.ReactNode; description?: React.ReactNode; shortcut?: React.ReactNode; disabled?: boolean; destructive?: boolean; onSelect?: (value: string) => void }>`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean) => void`
- `onSelect?: (value: string, item: LunaMenuItem) => void`
- `placement?: "bottom-start" | "bottom-end"`
- `menuLabel?: string`

Native `HTMLAttributes<HTMLSpanElement>` continue to pass through to the root wrapper, including `className` and `style`.

## Contract

- `children` must be a single React element trigger
- the trigger receives `aria-haspopup="menu"` and open-state wiring
- clicking the trigger toggles the menu
- `ArrowDown` opens the menu and focuses the first enabled item
- `ArrowUp` opens the menu and focuses the last enabled item
- `Escape` closes the menu and returns focus to the trigger
- disabled items remain visible but are skipped during arrow-key navigation
- selecting an item closes the menu, restores focus to the trigger, then calls item and menu selection handlers
- `open` and `onOpenChange` support controlled usage
- `defaultOpen` supports uncontrolled initial state

## Accessibility Notes

- the surface renders with `role="menu"`
- each action renders as a button with `role="menuitem"`
- `menuLabel` provides the accessible name for the menu surface
- disabled actions use the native button disabled state

## Theme Integration

`LunaMenu` inherits the global theme tokens for:
- surface background, border, radius, and shadow
- foreground and muted text colors
- accent focus styling
- spacing and motion timing
