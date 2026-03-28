# LunaAvatar

`LunaAvatar` is the base identity primitive for `react-luna`.

It owns:
- image presentation
- initials presentation
- fallback presentation
- theme-driven size tiers
- theme-driven avatar surface styling

It does not own:
- profile layout
- status badges
- grouping or stack behavior

## Contract

`LunaAvatar` renders a neutral shell with a semantic default of `span`.

Core rules:
- `src` wins while the image loads successfully
- if the image fails, the component falls back to initials, then `fallback`, then the built-in placeholder
- explicit `initials` win over initials derived from `name`
- `name` supplies the default accessible label when the component is not rendering an image
- `className` and `style` pass through to the root

## Props

- `as?: React.ElementType`
- `src?: string`
- `alt?: string`
- `name?: string`
- `initials?: string`
- `fallback?: React.ReactNode`
- `size?: string`

## Theme Integration

`LunaAvatar` consumes the existing `ThemeProvider` and uses:
- `theme.components.avatar.defaultSize`
- `theme.components.avatar.sizes`
- `theme.components.avatar.radius`
- `theme.components.avatar.fontWeight`
- mode-aware avatar tokens from `theme.components.avatar.modes`

`size` resolves in this order:
1. avatar component size map
2. theme spacing scale
3. raw CSS length

## Content Resolution

Priority order:
1. loaded image from `src`
2. explicit `initials`
3. initials derived from `name`
4. `fallback`
5. built-in placeholder

Initials behavior:
- single-word values use the first two characters
- multi-word values use the first character of the first two words
- resolved initials are uppercased

## Accessibility

- when an image renders, `alt` defaults to `name` and still accepts explicit empty alt text
- when the component renders initials, fallback, or the placeholder, it exposes `role="img"` when an accessible label is available
- `aria-label` can override the default accessible naming path
