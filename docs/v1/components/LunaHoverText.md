# LunaHoverText

`LunaHoverText` is the inline alternate-copy primitive for `react-luna`.

It owns:
- inline text swaps on hover and focus
- preserved document flow while the copy changes
- optional keyboard reachability for otherwise static text
- theme-resolved base and hover colors

It does not own:
- floating overlays
- explanatory tooltip semantics
- interactive popover content
- disclosure or click-to-open behavior

## Contract

`LunaHoverText` renders one inline root element and shows alternate copy in place when it becomes active.

Core rules:
- `children` is the resting copy
- `hoverContent` is the alternate inline copy
- the active state opens on pointer hover and focus
- the component stays inline and never renders `role="tooltip"`
- `focusable` adds `tabIndex={0}` when the root would otherwise be static text
- `disabled` suppresses hover and focus activation

## Props

- `as?: React.ElementType`
- `hoverContent: React.ReactNode`
- `disabled?: boolean`
- `focusable?: boolean`
- `color?: string`
- `hoverColor?: string`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root, including `className`, `style`, and event handlers.

## Accessibility Notes

- `LunaHoverText` is not a tooltip and does not wire `aria-describedby`
- focus behavior only applies when the root can receive focus naturally or through `focusable`
- the resting and active copy are toggled with `aria-hidden` so only the current inline state is exposed

## Color

`color` and `hoverColor` accept:
- raw CSS colors such as hex, `rgb`, `hsl`, and `var(...)`
- theme custom colors
- theme tokens such as `primary.500`

If omitted, the component inherits the surrounding text color.

## Theme Expectations

`LunaHoverText` does not require a dedicated theme component slice.

It relies on:
- the shared typography and font-family variables
- inherited text color by default
- token resolution when `color` or `hoverColor` are provided
