# LunaToast

`LunaToast` is the transient overlay feedback primitive for `react-luna`.

It owns:
- transient overlay messaging
- controlled and uncontrolled visibility
- optional auto-dismiss timing
- theme-aware placement and spacing
- optional dismiss affordance

It does not own:
- multi-toast orchestration
- stacking and queue management
- application-level notification history
- application-specific message formatting

## Position In The Feedback Stack

The intended split is:

- `LunaAlert`: inline, persistent feedback inside normal content flow
- `LunaToast`: transient overlay feedback for time-bound updates
- `LunaNotification`: broader application-level notification surface

`LunaToast` should stay small enough to be embedded directly where a consumer already knows when one overlay message should appear.

## Props

- `tone?: "neutral" | "info" | "success" | "warning" | "danger"`
- `emphasis?: "soft" | "solid" | "outline"`
- `title?: React.ReactNode`
- `icon?: React.ReactNode`
- `action?: React.ReactNode`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean, reason: "dismiss" | "timeout") => void`
- `duration?: number`
- `pauseOnHover?: boolean`
- `dismissible?: boolean`
- `dismissLabel?: string`
- `placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`
- `inset?: string`
- `padding?: string`
- `gap?: string`
- `rounded?: boolean`

Native `HTMLAttributes<HTMLDivElement>` continue to pass through to the root, including `role`, `aria-live`, and `aria-atomic`.

## Contract

- default root element is `div`
- default announcement semantics are `role="status"`, `aria-live="polite"`, and `aria-atomic={true}`
- `children` render the body content
- `title` renders the stronger heading line
- `action` renders an optional content region below the body
- `dismissible` adds a close button without requiring a separate manager
- `open` makes the component controlled
- `defaultOpen` seeds uncontrolled visibility and defaults to `true`
- `duration` controls auto-dismiss in milliseconds
- `duration={0}` or any non-positive value disables auto-dismiss
- `pauseOnHover` pauses the auto-dismiss timer while the pointer is over the toast
- `onOpenChange` reports local close events with either `"dismiss"` or `"timeout"`
- `className` and `style` pass through to the root

## Theme Integration

`LunaToast` consumes the existing theme system for:
- default padding
- default gap
- default inset
- default placement
- default duration
- max width
- radius
- shadow
- per-tone surface colors for each emphasis level

Spacing overrides resolve through theme spacing first, then raw CSS values.

## Accessibility Notes

`LunaToast` defaults to polite status semantics because it represents transient feedback.

Override the native attributes when a different announcement rule is needed:
- use `role="alert"` and `aria-live="assertive"` for urgent interruptions
- pass `aria-live="off"` when the toast is purely visual

Consumers remain responsible for deciding when a toast should appear and whether multiple messages need a higher-level container.
