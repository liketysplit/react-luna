# Avatar Design

This document tracks the current design direction for the `LunaAvatar` primitive.

## Design Stance

- Keep the contract small and identity-focused.
- Prefer content precedence over many visual toggles.
- Keep size and surface treatment theme-driven by default.
- Make fallback behavior explicit and durable.

## Decisions So Far

### Content Inputs

- `src?: string`
- `alt?: string`
- `name?: string`
- `initials?: string`
- `fallback?: React.ReactNode`

Rules:
- `src` is the preferred presentation path
- image failure falls through to initials, then fallback, then the built-in placeholder
- `initials` override derived initials from `name`

### Root Semantics

- `as?: React.ElementType`

Rules:
- the default root is `span`
- the component should stay neutral and composable inside navigation, cards, comments, and lists

### Size

- `size?: string`

Rules:
- size should resolve against avatar size keys first
- unresolved size values may fall through to theme spacing or raw CSS lengths
- the base theme should ship the same major size tiers used across other primitives

### Surface

Rules:
- surface colors come from theme mode tokens
- shape and weight come from theme values instead of extra component props
- downstream overrides should work through both theme configuration and root style variables
