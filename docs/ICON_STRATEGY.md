# Icon Strategy

This document records the current recommended direction for icon support in `react-luna`.

## Why This Exists

Icons are a real library concern for primitives and composites, but the project should not block on building a full icon system before the contract is clear.

The immediate need is to define the path, not to overbuild the implementation.

## North Star

The library should support three icon paths:

- custom icons supplied by the consumer
- user-installed icon packs or adapters
- optional first-party `react-luna` icons

The contract should be designed so these paths can coexist instead of forcing the project into one early implementation.

## Recommended V1 Path

- Prefer explicit user-supplied icon content as `React.ReactNode` in component APIs.
- Keep the public contract open enough that user-installed icon packs can plug in cleanly later.
- Treat library-managed icon naming as provisional until there is a deliberate first-party icon package or icon asset strategy.
- Avoid spreading placeholder icon-name semantics across more components before the icon contract is settled.

## Practical Guidance

- For V1, `icon`, `startIcon`, and `endIcon`-style inputs are safer than committing to a large built-in icon surface too early.
- If `iconName` exists in a component, it should be treated as provisional unless the library ships a real internal icon map.
- New components should not assume a mature internal icon registry exists.

## Suggested Next Decisions

1. Define the shared icon contract for custom icons, user-installed icon packs, and eventual first-party icons.
2. Decide whether first-party `react-luna` icons ship in V1 or later.
3. Keep V1 components compatible with user-supplied icon nodes even if first-party icons are deferred.
4. Align button, notification, menu, and future composite APIs to the same icon rules.

## Current Status

- `LunaButton` already exposes `icon` and `iconName`.
- The repo docs currently defer icon-library decisions.
- A dedicated tracked issue should remain open until the contract is settled.
