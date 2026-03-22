# LunaColumn

`LunaColumn` is the base vertical layout primitive.

It owns:
- vertical child flow
- gap between direct children
- alignment and justification
- 12-column subdivision through `colSpan`

Default element:
- `div`

Key rules:
- direct children are wrapped internally
- the internal child wrapper applies normalized `colSpan`
- `gap` resolves through theme spacing first, then raw CSS values
