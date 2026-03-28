# LunaBadge Design Notes

`LunaBadge` exists to cover the smallest feedback surface in the library.

Design goals:
- stay compact enough to sit inline with text, headers, and cards
- preserve clear tone differences without turning into a full alert surface
- keep theme overrides straightforward by routing size and color through theme data

Contract boundaries:
- badges communicate concise state, not full guidance
- badges are not interactive by default
- badge sizing should remain token-driven instead of ad hoc per usage

This keeps the primitive distinct from `LunaAlert` and leaves room for a future `LunaTag` contract if removable or filter-oriented chips are needed later.
