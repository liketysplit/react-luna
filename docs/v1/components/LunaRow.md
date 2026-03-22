# LunaRow

`LunaRow` is the base horizontal layout primitive.

It owns:
- horizontal child flow
- gap between direct children
- alignment and justification
- optional wrapping
- 12-column subdivision through `colSpan`

Default element:
- `div`

Key rules:
- `wrap` defaults to `true`
- direct children are wrapped internally
- the internal child wrapper applies normalized `colSpan`
- `gap` resolves through theme spacing first, then raw CSS values
