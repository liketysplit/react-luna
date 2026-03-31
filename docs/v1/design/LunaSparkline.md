# Sparkline Design

This document records the initial design direction for `LunaSparkline`.

## Design Stance

- keep the contract intentionally narrow
- optimize for dense presentation surfaces, not chart exploration
- make accessibility text required because the visual is compact and non-textual
- keep themeability first-class for tone and compact sizing
- avoid turning the primitive into a generic chart engine

## Decisions So Far

- accept one ordered numeric series only
- render a single compact SVG line treatment
- require `ariaLabel` instead of relying on nearby text
- support `neutral`, `positive`, and `negative` tones only
- allow compact sizing overrides through `size`, `width`, `height`, and `strokeWidth`

## Current Intent Notes

### Trend Model

- input is oldest-to-newest ordered data
- short and flat series must still render predictably
- empty data should show an intentionally minimal placeholder instead of disappearing

### Visual Model

- the primitive stays line-only
- tone is a clarity aid, not a semantic matrix
- default density comes from theme size profiles instead of fixed pixel values

### Composition

- `LunaSparkline` should embed cleanly inside `LunaPanel`
- future metric-card work can compose this primitive without changing the contract
- layout and surrounding metric copy belong to the parent surface, not the sparkline itself

## Build Order

1. define the compact trend contract
2. implement the SVG rendering and minimal empty state
3. wire theme defaults for size, stroke width, and tone
4. add Storybook coverage for trend states and embedding
5. add tests and public docs
