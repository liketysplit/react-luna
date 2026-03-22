# LunaGrid

`LunaGrid` is the base 12-column layout primitive.

It owns:
- explicit 12-column layout
- gap between direct children
- direct-child span handling
- responsive `colSpan` normalization

Default element:
- `div`

Key rules:
- `columns` defaults to `12`
- direct children are wrapped internally
- the internal child wrapper applies normalized `colSpan`
- `colSpan` supports both numeric values and responsive objects
- alias keys such as `mobile`, `tablet`, and `desktop` normalize to canonical breakpoint keys
