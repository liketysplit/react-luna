# LunaSpinner

`LunaSpinner` is the standard standalone loading indicator primitive for `react-luna`.

It owns:
- a compact reusable loading indicator for inline or block composition
- theme-driven size, color, track, and motion defaults
- decorative and semantic loading usage without coupling to buttons or form controls

It does not own:
- layout composition around loading states
- disabling or gating interactivity
- loading message copy outside its own accessible label

## Props

- `as?: React.ElementType`
- `size?: string`
- `color?: string`
- `decorative?: boolean`
- `label?: string`

## Contract

- `LunaSpinner` renders as `span` by default and supports `as` for alternate host elements
- `size` resolves through `theme.components.spinner.sizes` first, then theme spacing, then raw CSS values
- `color` resolves as raw CSS, custom theme color, or theme scale token
- motion duration resolves from `theme.components.spinner.duration`, which may reference shared theme motion tokens
- `decorative` defaults to `true`, which hides the spinner from assistive technology
- when `decorative={false}`, the spinner exposes `role="status"` and uses `label`, then the theme default label, then `"Loading"`
- `className` and `style` pass through to the root

## Theme Integration

`LunaSpinner` consumes the existing `ThemeProvider` for:
- default size
- per-size dimension and stroke-width profiles
- mode-aware spinner color
- mode-aware track color
- default accessible label
- shared motion timing

## Accessibility

- decorative spinners render with `aria-hidden="true"` by default
- semantic spinners can opt into `role="status"` with `decorative={false}`
- `label` lets consumers set the spoken loading message when the spinner participates in a semantic loading pattern
- `LunaSpinner` does not manage surrounding content announcements or focus behavior
