# LunaBadge

`LunaBadge` is the compact inline status label primitive for `react-luna`.

It owns:
- short status labels and metadata chips
- tone-driven compact emphasis
- theme-aware size profiles
- inline semantic element passthrough

It does not own:
- interaction or dismissal behavior
- filtering and removable tag patterns
- alert-style message bodies
- application-specific status rules

## Contract

`LunaBadge` renders a compact inline container around short text content.

Core rules:
- default element is `span`
- `tone` controls the semantic color family
- `variant` controls surface strength
- `size` resolves through the theme badge size map
- `rounded` switches the badge to a pill radius
- native `HTMLAttributes<HTMLElement>` continue to pass through to the root

## Props

- `as?: React.ElementType`
- `tone?: "neutral" | "info" | "success" | "warning" | "danger"`
- `variant?: "soft" | "solid" | "outline"`
- `size?: string`
- `rounded?: boolean`

## Theme Integration

`LunaBadge` consumes the theme for:
- default size key
- per-size padding, font-size, and minimum height
- radius
- font weight
- per-tone and per-variant badge surface tokens

The base theme ships `small`, `medium`, and `large` size profiles.

## Intended Use

Use `LunaBadge` for compact inline status labels such as:
- environment markers
- sync state
- review state
- compact metadata chips

Keep richer messaging in `LunaAlert` and keep removable or filter-like behavior out of this primitive.
