# LunaBarChart

`LunaBarChart` is intended to feel like a finished chart surface, not a starter chart primitive waiting for application code to rescue it.

The design direction is:
- vertical bars only
- quiet axis chrome
- strong value readability
- stable framed surface for panels and dashboards
- enough density control through theme tokens instead of prop sprawl

The component should stay visually disciplined:
- bars carry most of the emphasis
- grid lines stay supportive and low contrast
- labels are allowed to wrap before the chart turns into a cramped abbreviation puzzle
- horizontal overflow is preferred over unreadable compression in narrow containers

This baseline is meant to prove the contract quality for future chart work. If chart needs start pushing toward engines, builders, or multi-series configuration, that should be a separate issue rather than growth inside this component.
