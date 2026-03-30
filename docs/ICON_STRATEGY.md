# Icon Strategy

This document records the current recommended direction for icon support in `react-luna`.

## Why This Exists

Icons are a real library concern for primitives and composites. `react-luna` should not treat them as an afterthought or push the entire experience onto consumers.

The immediate need is to define a durable icon contract and provider model so the library can ship a strong default experience without blocking future extensibility.

## North Star

The library should support three icon paths:

- first-party `react-luna` icons as the default experience
- custom icons supplied by the consumer
- user-installed icon packs through adapters/providers

The contract should be designed so these paths coexist instead of forcing the project into one closed implementation.

## Recommended Direction

- Ship a first-party icon experience for `react-luna`.
- Back that experience with a provider model instead of hard-coding one icon source into every component.
- Keep direct user-supplied icon content supported everywhere a component reasonably allows iconography.
- Support user-installed icon packs through adapters instead of teaching components about specific third-party libraries.

## Provider Model

The preferred architecture is:

- `react-luna`
  - defines the shared icon contract used by components
  - resolves named icons through a provider
- `@react-luna/icons`
  - ships the default first-party icon set and provider
- optional adapter packages
  - `@react-luna/icons-fa`
  - `@react-luna/icons-lucide`
  - other user-installed packs later

Components should not know about Font Awesome classes, Lucide imports, or third-party icon naming schemes directly.

## Contract Guidance

- Components should continue to support explicit icon nodes such as `icon?: React.ReactNode`.
- Where named icons are supported, they should resolve through the icon provider instead of a component-local registry.
- If both a direct icon node and a named icon are provided, the direct icon node should win.
- New components should follow one shared contract instead of inventing one-off icon props.

## First-Party Experience

`react-luna` should feel complete out of the box.

That means:

- consumers should not need to install a third-party icon pack just to use the library normally
- the default icon set should be visually consistent with the design system
- first-party icons should still live behind the same provider contract used for adapters

Whether the implementation ships as a transitive dependency or an internal package is a packaging detail. The consumer experience should still feel first-class.

## Authoring Guidance

The project should maintain a deliberate icon asset pipeline instead of hand-managing random SVG files over time.

At minimum:

- raw SVG sources
- generated React exports
- generated icon-name/types metadata
- preview stories for review
- consistency checks for grid, stroke, and sizing

AI can help draft icons and automation can scaffold one icon issue at a time, but icon quality should still be curated by human review.

## Suggested Next Decisions

1. Define the shared provider interface and component-level icon contract.
2. Decide whether `react-luna` depends transitively on `@react-luna/icons` or bundles the default set another way.
3. Define the first-party icon authoring spec:
   - grid
   - stroke
   - optical rules
   - naming
4. Align button, notification, menu, and future composite APIs to the same provider-backed icon rules.
5. Decide which external adapter package should be the first proof path after first-party icons.

## Current Status

- `LunaButton` already exposes `icon` and `iconName`.
- The current docs and components still reflect a more provisional icon direction than the project now wants.
- A dedicated tracked issue should remain open until the provider contract, first-party package plan, and authoring pipeline are settled.
