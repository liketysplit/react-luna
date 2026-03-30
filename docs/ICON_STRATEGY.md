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

## Current Status

The library now has a working internal icon surface:

- `LunaIcon` is the first-party icon entry point
- internal icons support `name` + `variant` instead of separate public outline/filled names
- Storybook exposes a playground and gallery coverage for the implemented core internal set
- Playwright manifest coverage exists for the icon stories
- `LunaNotification` and `LunaNotificationGroup` are already using the internal icon surface

The current internal registry is still repo-local and not yet exposed as a provider package. The next step remains extracting this into a durable provider architecture instead of treating the internal registry as the final public backend.

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

The current implementation should be treated as the first-party baseline that future providers must match:

- named resolution by semantic icon name
- `outline` / `filled` variant support
- size mapping through one shared contract
- accessibility support through decorative vs labeled rendering
- Storybook discoverability for the full available set

## Provider Support Checklist

The provider system should explicitly support evaluation and normalization of the following icon libraries.

### Core Libraries

#### Font Awesome

Must evaluate:

- free vs pro separation
- solid / regular / brands variants
- React wrapper usage through `@fortawesome/react-fontawesome`
- icon lookup through definition objects, not only loose strings
- tree-shaking limitations
- CSS vs SVG usage modes

#### Lucide

Must evaluate:

- SVG-based rendering
- tree-shakable imports
- support for `size`, `color`, and `strokeWidth`
- naming cleanliness

#### Heroicons

Must evaluate:

- outline + solid variants
- React package support through `@heroicons/react`
- naming differences vs other providers

#### Tabler Icons

Must evaluate:

- broad icon coverage
- consistent `24x24` grid and stroke behavior
- React package support

#### Phosphor Icons

Must evaluate:

- multiple weights: thin, light, regular, bold, fill
- variant mapping support
- flexible styling

#### Material Symbols

Must evaluate:

- font vs SVG usage
- fill / weight / grade / optical size controls
- mapping to the shared `react-luna` API

#### Iconify

Must evaluate:

- support for multiple icon sets
- dynamic loading behavior
- `prefix:name` naming format
- performance considerations

### Secondary Libraries

These are optional, but still worth tracking:

#### Feather

Evaluate:

- compatibility with Lucide naming
- usefulness as a simple SVG set

#### Remix Icons

Evaluate:

- filled + outline styles
- broader UI coverage
- CSS + SVG usage

#### Bootstrap Icons

Evaluate:

- SVG-based integration
- simple React wrapping path
- common UI coverage

## Provider Validation Criteria

Every provider should be judged against the same baseline:

- resolves icons by string name
- works as a React component or can be wrapped as one
- accepts `size`
- accepts `color` or inherits `currentColor`
- supports a consistent `viewBox`, ideally `24x24`
- can be normalized to the shared `react-luna` icon API
- supports accessibility needs such as `aria-hidden` and titles
- can map from semantic names to provider-specific names
- does not force direct provider usage inside shared components

## Integration Rules

- never import provider icons directly inside shared components
- always go through the shared icon abstraction
- must support provider swapping without breaking component APIs
- must support fallback behavior when an icon is not found
- must support a semantic mapping layer from `react-luna` names to provider names

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

The current first-party work is intentionally split into two buckets:

- core UI icons that are acceptable for immediate component use
- Luna-specific icons that form a separate brand layer and should not be judged by the same treatment as the core utility set

That means the system should keep the core UI set as the production baseline for general components, while the Luna-specific set follows its own brand-icon rules.

Current implementation status:

- core UI icons are implemented and in use
- Luna-specific icons are planned and documented
- the current Luna implementation has been intentionally pulled back until the underlying art is stronger

## Luna Brand Layer

The `luna-*` icons are not generic utility icons. They are a brand layer.

They should feel:

- quiet
- lunar
- geometric
- intentional

They should not feel:

- flashy
- overly detailed
- generic sci-fi
- cartoonish

### Luna Brand Rules

- use a `24x24` canvas
- keep a minimum `2px` padding around the usable shape
- prioritize filled shape readability
- keep edges rounded
- avoid micro-detail smaller than `1px`
- stay readable at `16px`
- avoid gradients, pure white, and multi-color rendering
- keep the visual language calm, geometric, and slightly organic

### Luna Brand Presentation

The Luna set should be reviewed with dedicated stories and brand-focused inspection, but it should not force a special runtime wrapper into the shared icon component before the art is ready.

That means:

- keep the Luna brand rules documented
- keep the Luna icon list planned
- do not surface Luna icons in the shipped internal icon set until the artwork is ready

## Internal Core Icon Set

The first-party set should stay intentionally small at the start and focus on icons used directly by components.

### Navigation

- `menu`
- `close`
- `back`
- `forward`
- `chevron-up`
- `chevron-down`
- `chevron-left`
- `chevron-right`

### Actions

- `add`
- `remove`
- `edit`
- `delete`
- `save`
- `download`
- `upload`
- `refresh`
- `search`
- `filter`

### Status / Feedback

- `success`
- `warning`
- `error`
- `info`
- `loading`

### UI Controls

- `check`
- `checkbox-checked`
- `checkbox-unchecked`
- `radio-checked`
- `radio-unchecked`
- `toggle-on`
- `toggle-off`

### Visibility / State

- `show`
- `hide`
- `expand`
- `collapse`

### User / Content

- `user`
- `users`
- `settings`
- `home`
- `folder`
- `file`

### Layout / Misc

- `grid`
- `list`
- `more`
- `more-horizontal`
- `more-vertical`

### Media

- `play`
- `pause`
- `stop`
- `volume`
- `mute`

### Core Set Rules

- only include icons used directly by components
- keep the first-party set small, roughly `20` to `40` to start
- prefer semantic names such as `success` instead of literal shapes such as `check-circle`
- avoid duplicating full external libraries
- treat the first-party set as part of the visual identity

## Internal Icon System Spec

The internal icon set should be a small, UI-first system built for pure React, HTML, and CSS usage.

### Goal

The first-party icon system should:

- support `outline` and `filled` variants
- work in light and dark themes without separate theme-specific assets
- remain easy to style with CSS
- avoid requiring separate icon files for theme colors

### Variant Contract

Every internal icon should support:

- `outline`
- `filled`

These are visual variants of the same semantic icon.

Public API should use:

- `name="check"`
- `variant="outline" | "filled"`

Do not expose separate public names such as:

- `check-outline`
- `check-filled`

### Theme Handling

Icons should not use separate light-mode and dark-mode SVG files unless absolutely necessary.

Preferred rendering contract:

- use `fill="currentColor"` and/or `stroke="currentColor"`
- CSS or theme tokens control the rendered color
- icons inherit color from parent or explicit classes/tokens

That allows one icon asset to work across light and dark themes.

### Geometry Contract

- default `viewBox` should be `24x24`
- outline icons should use a consistent stroke width
- line cap and line join rules should stay consistent across the set
- icons should be optically centered and aligned to the same grid
- shapes should remain legible at small sizes

### Rendering Contract

- outline variants should be stroke-first
- filled variants should be fill-first
- both variants should still follow the `currentColor` rule
- avoid creating separate colorized variants of the same icon

### Accessibility Contract

- icons should be decorative by default when used as visual affordances only
- when an icon conveys meaningful standalone content, the API must allow a title/label path
- provider normalization should preserve accessibility support such as `aria-hidden` and titles

### Authoring Constraints

- use only SVG paths/shapes
- no hardcoded theme colors
- no gradients
- no shadows or filters
- no raster assets
- avoid ornamental complexity that reduces small-size clarity

### Export / Component Contract

- one semantic public icon name per concept
- variant should be a prop, not a separate public icon name
- internal icons must work both as React components and through the shared provider system

## Authoring Guidance

The project should maintain a deliberate icon asset pipeline instead of hand-managing random SVG files over time.

At minimum:

- raw SVG sources
- generated React exports
- generated icon-name/types metadata
- preview stories for review
- consistency checks for grid, stroke, and sizing

The issue should also preserve room for icon work to be split in two ways later:

- library/provider integration work
- first-party icon creation/refinement work

That makes it easier to hand off provider compatibility or single-icon drafting work separately when needed.

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
