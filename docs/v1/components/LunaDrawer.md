# LunaDrawer

`LunaDrawer` is the edge-anchored overlay surface for contextual workflows that should stay near the current page state.

It owns:
- one drawer panel and its optional backdrop
- controlled and uncontrolled visibility
- edge placement and theme-aware sizing
- optional title, description, footer, and dismiss affordance
- local dismissal through overlay click or Escape

It does not own:
- focus trapping
- portals
- routing
- nested drawer orchestration
- multi-step workflow state

## Props

- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `footer?: React.ReactNode`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean, reason: "dismiss" | "overlay" | "escape") => void`
- `placement?: "left" | "right" | "top" | "bottom"`
- `size?: string`
- `inset?: string`
- `padding?: string`
- `gap?: string`
- `rounded?: boolean`
- `dismissible?: boolean`
- `dismissLabel?: string`
- `closeOnOverlayClick?: boolean`
- `closeOnEscape?: boolean`
- `showOverlay?: boolean`

Native `HTMLAttributes<HTMLDivElement>` continue to pass through to the outer shell. Use `aria-label`, `aria-labelledby`, `aria-describedby`, and `role` when a different dialog announcement rule is needed.

## Contract

- default root shell is `div`
- default panel semantics are `role="dialog"` and `aria-modal={true}` when the backdrop is visible
- `open` makes the component controlled
- `defaultOpen` seeds uncontrolled visibility and defaults to `false`
- `onOpenChange` reports local close events with `"dismiss"`, `"overlay"`, or `"escape"`
- `title` and `description` wire the default dialog labeling when explicit aria attributes are not provided
- `footer` renders a dedicated action region below the body content
- `size` applies width for left and right drawers, and height for top and bottom drawers
- `showOverlay={false}` keeps the drawer inline to its story or container while preserving placement behavior
- `className` and `style` pass through to the outer shell

## Theme Integration

`LunaDrawer` consumes the existing theme system for:
- default padding
- default gap
- default inset
- default size
- default placement
- radius
- shadow
- light and dark panel and backdrop tokens

Spacing overrides resolve through theme spacing first, then raw CSS values.

## Accessibility Notes

`LunaDrawer` exposes dialog semantics, but it does not trap focus or move focus on open.

Consumers remain responsible for:
- moving focus into the drawer when their workflow needs it
- restoring focus after close
- deciding whether the drawer should behave as a modal or a non-modal side panel
