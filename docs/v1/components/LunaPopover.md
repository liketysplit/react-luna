# LunaPopover

`LunaPopover` is the anchored floating-content primitive for `react-luna`.

It owns:
- trigger-driven open and close behavior
- anchored non-modal surface placement
- outside-click and `Escape` dismissal
- focus entry into the surface and focus restoration on keyboard dismissal
- theme-aware surface spacing and styling

It does not own:
- portals
- collision detection
- viewport flipping
- menu semantics
- modal focus trapping or backdrop behavior

## Contract

`LunaPopover` wraps one React element trigger and reveals richer anchored content next to that trigger.

Core rules:
- the child must be a single React element trigger
- `content` may contain interactive markup
- clicking the trigger toggles the surface
- the surface closes on outside click and `Escape`
- the trigger receives `aria-haspopup="dialog"`, `aria-expanded`, and `aria-controls` wiring while open
- focus moves into the first focusable element in the surface when it opens
- focus returns to the trigger when the surface closes by `Escape` or trigger toggle
- `disabled` suppresses all popover behavior
- `open` and `onOpenChange` support controlled usage
- `defaultOpen` supports uncontrolled initial state

## Props

- `content: React.ReactNode`
- `children: React.ReactElement`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean) => void`
- `placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end"`
- `disabled?: boolean`
- `surfaceLabel?: string`
- `showArrow?: boolean`
- `offset?: string`
- `padding?: string`
- `minWidth?: string`
- `maxWidth?: string`

Native `HTMLAttributes<HTMLSpanElement>` continue to pass through to the root wrapper, including `className` and `style`.

## Accessibility Notes

- the floating surface renders with `role="dialog"` and `aria-modal="false"`
- `surfaceLabel` provides the accessible name for the floating surface
- consumers should keep the trigger name and surface label distinct enough that screen reader users can tell what opened
- use `LunaMenu` when the content is a menu of actions rather than general anchored content

## Theme Integration

`LunaPopover` consumes the theme system for:
- surface background, foreground, border, radius, and shadow
- default offset, padding, minimum width, maximum width, and optional arrow size/inset

`offset`, `padding`, `minWidth`, and `maxWidth` resolve through theme spacing first, then raw CSS values.

`showArrow` is a contract-level choice. Theme tokens style the shaped arrow when enabled, but the component does not force arrows on by default.
