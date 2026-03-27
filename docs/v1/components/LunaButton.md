# LunaButton

`LunaButton` is the base action primitive for `react-luna`.

It is also the baseline example for what a durable primitive contract should look like in the library.

It is responsible for:
- button sizing
- button surface treatments
- theme-aware color resolution
- loading presentation
- animation hooks
- native button passthrough

It is not responsible for:
- icon library design
- container layout systems
- application-specific behavior

## Contract

`LunaButton` renders a native `<button>` and keeps native button semantics unless a prop here explicitly changes presentation.

Core rules:
- `children` wins over `value`
- `className` and `style` pass through to the root
- native button props continue to work
- `disabled` controls interactivity
- `loading` controls presentation only

North star:
- the contract should stay small enough to be learnable
- the contract should stay expressive enough for real downstream use
- the contract should remain compatible with strong theme overrides

## Props

### Layout And Positioning

- `absolute?: boolean`
- `fixed?: boolean`
- `top?: boolean | string | number`
- `right?: boolean | string | number`
- `bottom?: boolean | string | number`
- `left?: boolean | string | number`
- `block?: boolean`

Rules:
- `absolute` uses standard CSS absolute positioning
- `fixed` uses standard CSS fixed positioning
- `fixed` wins over `absolute` and warns in development when both are provided
- `top`, `right`, `bottom`, and `left` only make sense with `absolute` or `fixed`
- `block` makes the button fill the available inline space

### Surface And Shape

- `color?: string`
- `info?: boolean`
- `flat?: boolean`
- `outline?: boolean`
- `depressed?: boolean`
- `rounded?: boolean`
- `fab?: boolean`
- `light?: boolean`
- `dark?: boolean`

Rules:
- `outline`, `flat`, and `depressed` are composable
- `info` is the exception surface and wins over `outline`, `flat`, and `depressed`
- `rounded` applies to normal button treatments, but not `info` or `fab`
- `fab` wins over `rounded`
- `light` and `dark` are explicit component-level mode overrides

Meaning:
- `outline` adds the visible border treatment
- `flat` removes the background surface
- `depressed` removes box shadow
- `info` is link-like and still behaves like a button
- `fab` is a theme-driven floating action button treatment

### Color

`color` accepts:
- raw CSS colors such as hex, `rgb`, `hsl`, and `var(...)`
- theme custom colors
- theme tokens such as `primary.600`

Resolution order:
1. raw CSS color
2. user theme custom color
3. theme scale token

Rules:
- `color` normally controls background only
- `flat` applies after `color`, so it can intentionally remove the background
- `outline` does not derive its border from `color`
- `info` is the exception, where the resolved color is used for the visible informational treatment

### Size

- `size?: string`

Built-in size keys:
- `x-small`
- `small`
- `medium`
- `large`
- `x-large`

Resolution:
1. `size` resolves against the user theme first
2. if not found there, it resolves against the base theme
3. if `size` is not provided, the user theme default size key is used
4. if the user theme does not define a default size key, the base theme default is used

Current defaults:
- base theme default size key is `medium`

This shape intentionally leaves room for custom named sizes later.

### Loading

- `loading?: boolean`
- `loadingAnimation?: "lunar" | "loading-star"`

Rules:
- `loading` does not disable the button
- `loading` and `disabled` can both be true
- loading keeps the button shell in place
- loading hides content and centers a loader inside the existing shell

Current loading treatments:
- `lunar`: the default five-phase lunar loader
- `loading-star`: the preserved alternate loader

### Animation

- `animation?: string`

Public contract:
- `"<animationName> <duration> <iterationCount>"`

Examples:
- `bounce 3s infinite`
- `wiggle 4s infinite`
- `pulse 2s infinite`
- `bounce .6s 1`

Rules:
- `animation` is mutually exclusive
- the first token is mapped to the internal keyframes name
- the rest of the shorthand is preserved verbatim
- built-in animations include their own idle time inside the keyframes

Current built-in names:
- `bounce`
- `wiggle`
- `pulse`

Legacy support:
- bare animation names such as `bounce` still map to default shorthand values
- legacy animation classes remain compatibility-only hooks

### Icon Inputs

- `icon?: React.ReactNode`
- `iconName?: string`
- `iconDirection?: "left" | "right"`

Rules:
- `icon` is user-supplied icon content
- `iconName` is the current placeholder path for library-managed icons
- `icon` wins over `iconName` and warns in development when both are provided
- `iconDirection` defaults from theme
- current base theme default icon direction is `right`

Note:
- library icon strategy is intentionally deferred to its own story
- suggested direction is captured in `docs/ICON_STRATEGY.md`
- target direction includes custom consumer icons, user-installed icon packs, and eventual first-party icons

### State

- `disabled?: boolean`
- `type?: "button" | "submit" | "reset"`

Rules:
- `disabled` changes both interactivity and visible state
- `type` defaults to `button`

## Development Warnings

`LunaButton` warns in development for the resolved conflict cases that matter:
- `fixed` with `absolute`
- directional props without `absolute` or `fixed`
- `icon` with `iconName`
- `info` with `outline`, `flat`, or `depressed`
- `fab` with `rounded`
- malformed `animation` shorthand

## Theme Expectations

`LunaButton` depends on the theme for:
- default size key
- size profiles
- default icon direction
- mode-aware surface tokens
- outline, flat, and info color tokens

The base theme ships opinionated lunar defaults, and downstream themes can override them.

`LunaButton` should remain the proving ground for whether the theming model is actually strong enough for the rest of the library.

## Testing Focus

The button contract should stay covered in unit tests for:
- content resolution
- size and icon-direction defaults
- loading state behavior
- animation shorthand resolution
- warning behavior
- positioning conflict handling
- surface precedence and compatibility rules

## Deferred Work

- icon-library decisions are deferred to the icon story
- v1 icon-path guidance lives in `docs/ICON_STRATEGY.md`
- long-term icon support should preserve custom icons, installed icon packs, and first-party icons
- animation polish can continue without changing the public contract
