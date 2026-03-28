# LunaTooltip

`LunaTooltip` is the lightweight descriptive overlay primitive for `react-luna`.

It owns:
- short supplemental descriptions for a single trigger
- hover and focus visibility behavior
- keyboard dismissal with `Escape`
- theme-aware bubble styling and placement

It does not own:
- interactive floating content
- focus trapping
- click-to-open disclosure behavior
- menu or popover actions

## Contract

`LunaTooltip` wraps one React element child and describes that trigger when the tooltip is visible.

Core rules:
- the child must be a single React element
- `content` is the tooltip body and may be text or richer non-interactive markup
- the tooltip opens on pointer hover and keyboard focus
- the tooltip closes on pointer leave, focus leave, and `Escape`
- `aria-describedby` is applied to the trigger while the tooltip is visible
- `disabled` suppresses all tooltip behavior

## Props

- `content: React.ReactNode`
- `children: React.ReactElement`
- `placement?: "top" | "right" | "bottom" | "left"`
- `disabled?: boolean`
- `offset?: string`
- `maxWidth?: string`

Native `HTMLAttributes<HTMLSpanElement>` continue to pass through to the wrapping root, including `className` and `style`.

## Accessibility Notes

- the bubble renders with `role="tooltip"`
- the trigger keeps its own native semantics
- the component preserves any existing `aria-describedby` values on the trigger and appends the tooltip id while open
- tooltip content should remain descriptive, not interactive

## Theme Integration

`LunaTooltip` consumes the theme system for:
- bubble background, foreground, and border
- radius and shadow
- default offset and max width
- default horizontal and vertical padding

`offset` and `maxWidth` resolve through theme spacing first, then raw CSS values.
