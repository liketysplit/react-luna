# LunaNotificationGroup

`LunaNotificationGroup` is the grouped presentation composite for arranging multiple `LunaNotification` items under one shared heading or action surface.

It owns:
- grouped presentation for existing notification items
- optional title, description, and actions regions
- framed or unframed container styling
- theme-aware spacing overrides

It does not own:
- notification item behavior
- queue management
- notification history or inbox logic
- shared dismissal orchestration

## Props

- `as?: React.ElementType`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `actions?: React.ReactNode`
- `gap?: string`
- `padding?: string`
- `maxWidth?: string`
- `rounded?: boolean`
- `framed?: boolean`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root, including `role`, `aria-label`, `aria-labelledby`, `className`, and `style`.

## Contract

- default element is `section`
- `title` labels the group automatically when `aria-labelledby` is not provided manually
- `description` provides supporting copy above the grouped notifications
- `actions` renders an optional trailing header region
- `children` remain the notification items and are not transformed into a data model
- `framed` defaults to `true` so the group can present one shared container
- `rounded` increases the group corner radius
- `gap`, `padding`, and `maxWidth` resolve through theme spacing first, then raw CSS values

## Accessibility Notes

- use `aria-label` or `aria-labelledby` when the group needs an explicit accessible name
- keep announcement behavior on individual `LunaNotification` items rather than assigning one live region to the full group
- prefer `framed={false}` when the surrounding layout already provides the needed visual container
