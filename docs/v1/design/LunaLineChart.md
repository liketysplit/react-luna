# Line Chart Design

This document records the first-pass design direction for `LunaLineChart`.

## Design Stance

- keep the contract intentionally narrow
- ship one polished single-series chart before adding chart families
- keep theming first-class across line, axes, legend, markers, and container treatment
- prefer automatic clutter reduction over exposing extra knobs
- keep panel and dashboard embedding as a first-order use case

## Decisions So Far

- use an inline SVG surface for deterministic rendering
- keep x-axis labels ordered and automatically thinned for denser data
- keep y-axis labels consistent with a small fixed tick count
- render horizontal gridlines only
- auto-hide point markers when density rises past the baseline threshold
- keep the legend optional because there is only one series
- define loading, empty, and error shells in the primitive instead of leaving them implicit

## Visual Intent Notes

### Surface

- the chart should feel at home inside cards and panels without needing wrapper-specific styling
- the line remains the visual focal point
- the container should look finished even when the chart is empty or loading

### Axes

- x-axis labels should stay legible in narrow and moderately dense layouts
- y-axis labels should support quick scanning without turning into a full analytics grid
- gridlines stay subtle enough that hiding them remains a valid choice

### Markers

- markers are useful for sparse sequences
- markers should disappear automatically before they become visual noise

## Build Order

1. define the single-series contract
2. implement the themed SVG surface and state shells
3. add Storybook coverage for sparse, dense, narrow, empty, and panel states
4. add tests for rendering, labeling, legend, and theme behavior
5. add docs and release metadata
