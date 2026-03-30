# LunaNotification

`LunaNotification` is the persistent application-level feedback primitive for `react-luna`.

It owns:
- durable notification surfaces that sit outside normal inline copy
- optional metadata, action, and dismiss regions
- controlled and uncontrolled visibility
- theme-aware spacing and surface styling
- native semantic passthrough

It does not own:
- notification stacking or grouping
- history views or notification inbox behavior
- auto-dismiss timing
- application-specific message formatting

## Position In The Feedback Stack

The intended split is:

- `LunaAlert`: inline, persistent feedback inside normal content flow
- `LunaNotification`: persistent application-level feedback surface
- `LunaToast`: transient overlay feedback

`LunaNotification` should stay focused on one durable notification item so future grouping or history work can build around it instead of being baked into the primitive.

## Props

- `as?: React.ElementType`
- `size?: "sm" | "md" | "lg"`
- `tone?: "neutral" | "info" | "success" | "warning" | "danger"`
- `emphasis?: "soft" | "solid" | "outline"`
- `title?: React.ReactNode`
- `icon?: React.ReactNode`
- `meta?: React.ReactNode`
- `action?: React.ReactNode`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean, reason: "dismiss") => void`
- `dismissible?: boolean`
- `dismissLabel?: string`
- `padding?: string`
- `gap?: string`
- `rounded?: boolean`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root, including `role`, `aria-live`, and `aria-atomic`.

## Contract

- default element is `section`
- `tone` controls the semantic color family
- `size` controls the standard notification density
- `sm` keeps the body to one visible line
- `md` allows two visible body lines
- `lg` allows three visible body lines
- `emphasis` controls surface strength without changing the message structure
- `title` renders the stronger heading line
- `meta` renders a compact trailing metadata slot in the header
- `children` render the supporting body content
- `action` renders an optional follow-up region below the body
- `icon` is decorative by default and stays out of the accessibility tree
- `open` makes the component controlled
- `defaultOpen` seeds uncontrolled visibility and defaults to `true`
- `dismissible` adds a close button for local persistence control
- `onOpenChange` reports local dismiss events with `"dismiss"`
- `className` and `style` pass through to the root

## Theme Integration

`LunaNotification` consumes the existing theme system for:
- default padding
- default gap
- radius
- shadow
- density defaults through the size contract
- per-tone surface colors for each emphasis level

Spacing overrides resolve through theme spacing first, then raw CSS values.

## Accessibility Notes

`LunaNotification` does not force live-region behavior.

Use explicit native semantics when the notification should be announced:
- `role="status"` for polite updates
- `role="alert"` for urgent interruptions

That keeps persistent notifications reusable both for passive inbox-style surfaces and for actively announced application feedback.

## Current Hardening Gaps

- narrow-width behavior for grouped notification layouts is still under active hardening and should be solved at the system level, not per-story
- notification sizing is now standardized, but responsive composition with group rails and stacked surfaces still needs a shared breakpoint contract
- icon placeholders are still temporary and should be replaced once the icon system lands
