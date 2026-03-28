# LunaSkeleton

`LunaSkeleton` is the standard loading placeholder primitive for `react-luna`.

It owns:
- reusable loading placeholders for common shapes
- theme-driven surface and animation treatment
- text-line grouping for common content placeholders
- width and height resolution through theme spacing or raw CSS values

It does not own:
- loading state orchestration
- application-specific layout composition
- announcements or status messaging

## Props

- `as?: React.ElementType`
- `shape?: "text" | "block" | "pill" | "circle"`
- `size?: string`
- `width?: string`
- `height?: string`
- `lines?: number`
- `lastLineWidth?: string`
- `animation?: "pulse" | "wave" | "none"`
- `inline?: boolean`
- `decorative?: boolean`

## Contract

- `shape` defaults to `text`
- `size` resolves through `theme.components.skeleton.sizes` first, then through theme spacing, then raw CSS values
- `width`, `height`, and `lastLineWidth` resolve through theme spacing first, then raw CSS values
- text, block, and pill shapes expand to `100%` width by default unless `inline` or `width` changes that
- circle skeletons default to equal width and height when `width` is not provided
- `lines` only affects the `text` shape and is clamped to at least one line
- multi-line text skeletons shorten the last line to `72%` width by default unless `lastLineWidth` is provided
- `animation` defaults from the theme and supports `wave`, `pulse`, or `none`
- `decorative` defaults to `true` so the skeleton is hidden from assistive technology unless a consumer opts into a semantic use case
- `className` and `style` pass through to the root

## Theme Integration

`LunaSkeleton` consumes the existing `ThemeProvider` for:
- default skeleton size
- default animation mode
- default block radius
- text-line radius
- size profiles
- mode-aware base surface color
- mode-aware highlight treatment
- shared motion timing tokens

## Accessibility

- skeleton placeholders are decorative by default and render with `aria-hidden="true"`
- consumers can set `decorative={false}` when the placeholder must participate in a larger semantic pattern
- `LunaSkeleton` does not announce loading state on its own; parent surfaces should own that decision
