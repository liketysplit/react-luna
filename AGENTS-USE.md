# react-luna AGENTS USE

This file explains how to use the package well, how to choose components, and how to compose pages in a Luna-native way.

## Root Concepts

Build from these layers in order:

1. `ThemeProvider`
2. app root
3. `LunaApp`
4. router
5. route
6. page component
7. optional `LunaWireframe`
8. page slot content built from Luna primitives and composites

### Theme First

- Start with `ThemeProvider` near the app root.
- Import `@liketysplit/react-luna/styles.css` once.
- Prefer Luna theme tokens and Luna CSS variables before creating a separate app color system.
- If dark and light mode look inconsistent, first check whether app-owned wrappers are ignoring `--luna-*` variables.

### `LunaApp` For The Application Host

Use `LunaApp` for:

- app background
- app foreground color
- app gutters
- router host

Do not use `LunaApp` to replace page-region layout. That belongs to `LunaWireframe` inside a page component.

### `LunaWireframe` For Page Regions

Use `LunaWireframe` inside a routed page when that page has named shell regions:

- `appBar`
- `left`
- `right`
- `centerTop`
- `centerMiddle`
- `centerBottom`

Rules:

- `centerMiddle` is the required primary task area.
- `left` and `right` are optional context rails, not mandatory structure.
- `centerTop` and `centerBottom` are support bands, not peers to the main work area.
- Omit regions instead of filling them with placeholders.

### `LunaPane` For Quiet Structure Inside A Wireframe Slot

Use `LunaPane` when a wireframe region needs:

- directional separators
- quiet framed boundaries
- edge control without escalating to a stronger card or panel surface

Prefer `LunaPane` inside slots before inventing extra shell behavior in `LunaWireframe`.

### `LunaPanel` For Stronger Surfaced Content

Use `LunaPanel` when a region needs a more explicit surfaced block with panel-like emphasis.

Do not turn every wireframe slot into a panel by default. The page should keep structural hierarchy clear.

## How To Make Good Pages With Wireframes

### Good Page Structure

A good Luna page usually looks like this:

1. `ThemeProvider` owns theme state.
2. `LunaApp` owns the application host around the router.
3. the router renders a route.
4. the route renders a page component.
5. that page may use `LunaWireframe` if it needs named regions.
6. `centerMiddle` holds the primary task surface.
7. side rails and top or bottom bands only appear when they add real context.

Do not treat `LunaWireframe` as the app root. It is a page-level layout primitive.

### Recommended Slot Roles

- `appBar`
  Brand, search, route-level actions, account controls, or top navigation.

- `left`
  Section navigation, saved views, filters, workspace context, or local navigation.

- `right`
  Inspector content, activity, metadata, tools, or secondary context.

- `centerTop`
  Page header, summary band, breadcrumbs, KPIs, or route-level status.

- `centerMiddle`
  The main work area. Tables, forms, cards, detail views, dashboards, or routed feature content belong here.

- `centerBottom`
  Follow-up context such as recent activity, notes, related records, or supporting metadata.

### Wireframe Rules

- Keep the main task in `centerMiddle`.
- Use side rails for context, not duplicate primary content.
- Use optional border props only when bordered separation helps the page read more clearly.
- Do not add fake shell chrome or decorative demo scaffolding inside `LunaWireframe` itself.
- Do not force every page into all six regions.
- If the page is simple, a lean wireframe with only `appBar` and `centerMiddle` is valid.

### Bad Wireframe Patterns

- putting the main task in a side rail
- using all slots just because they exist
- treating `LunaWireframe` like a generic card grid
- filling empty slots with placeholder noise
- making every slot bordered and equally loud
- skipping `LunaApp` and rebuilding the app host with ad hoc wrappers
- treating `LunaWireframe` as if it should wrap the router

## Component Selection Guide

Use these components for their intended jobs.

### App And Shell

- `LunaApp`
  Outer application host.

- `LunaWireframe`
  Page-level shell with named regions, used inside a routed page when needed.

- `LunaPane`
  Quiet structural boundary inside a slot or region.

- `LunaPanel`
  Stronger surfaced panel content.

### Layout

- `LunaRow`
  Horizontal composition.

- `LunaColumn`
  Vertical composition.

- `LunaGrid`
  Grid-based composition across breakpoints.

### Typography And Identity

- `LunaText`
  General text rendering.

- `LunaHeader`
  Titles, subtitles, and section headers.

- `LunaBadge`
  Compact status signal.

- `LunaTag`
  Tagging or token-like labeling.

- `LunaAvatar`
  User or entity identity marker.

### Actions And Navigation

- `LunaButton`
  Primary or secondary action trigger.

- `LunaBreadcrumb`
  Hierarchical route navigation.

- `LunaTabs`
  Switching between related views in one frame of reference.

- `LunaPagination`
  Paged navigation for lists and tables.

- `LunaMenu`
  Structured action lists or contextual menus.

### Content Surfaces And Feedback

- `LunaCard`
  Grouped content surface.

- `LunaAlert`
  Inline feedback that should remain in the document flow.

- `LunaNotification`
  Single notification item.

- `LunaNotificationGroup`
  Stacked notification feed or grouped notices.

- `LunaToast`
  Transient feedback.

- `LunaProgress`
  Progress state with optional labeling.

- `LunaSkeleton`
  Loading placeholders.

- `LunaSpinner`
  Active loading indicator.

- `LunaEmptyState`
  No-data or no-results state.

- `LunaDivider`
  Content separation.

### Forms And Input

- `LunaForm`
  Form wrapper and grouped form composition.

- `LunaInput`
  Single-line text input.

- `LunaTextarea`
  Multi-line text input.

- `LunaSelect`
  Single select from a known option set.

- `LunaMultiselect`
  Multi-select from a known option set.

- `LunaAutocomplete`
  Search-assisted option picking.

- `LunaCheckbox`
  Single boolean choice.

- `LunaCheckboxGroup`
  Multiple checkbox choices as a group.

- `LunaRadio`
  Single option within a radio set.

- `LunaRadioGroup`
  Exclusive choice group.

- `LunaSwitch`
  Immediate on or off setting.

- `LunaSlider`
  Range or scalar adjustment.

- `LunaDateInput`
  Typed date entry.

- `LunaDatePicker`
  Calendar-based date selection.

### Data And Disclosure

- `LunaTable`
  Tabular structured data.

- `LunaAccordion`
  Progressive disclosure for stacked sections.

- `LunaPopover`
  Anchored supplementary content.

- `LunaTooltip`
  Brief descriptive hint.

- `LunaHoverText`
  Hover-revealed descriptive text treatment.

### Overlays

- `LunaDrawer`
  Side-entering overlay or supporting workflow panel.

- `LunaModal`
  Focused modal workflow or interruptive decision point.

## Choosing Between Similar Components

- Use `LunaAlert` for inline status in the page.
- Use `LunaToast` for transient feedback.
- Use `LunaNotification` or `LunaNotificationGroup` for feed-like or dismissible notice patterns.

- Use `LunaCard` for grouped surface content.
- Use `LunaPanel` when the surface should read as a stronger named panel.
- Use `LunaPane` when the structure should stay quiet.

- Use `LunaTabs` when the user is comparing related content in one frame.
- Use `LunaBreadcrumb` when the user needs route hierarchy.
- Use `LunaMenu` when the user needs a list of actions.

- Use `LunaSelect` when options are known and manageable.
- Use `LunaAutocomplete` when users benefit from searching the option space.
- Use `LunaMultiselect` when many values can be chosen.

- Use `LunaModal` for blocking focus-managed tasks.
- Use `LunaDrawer` for secondary overlay workflows that can sit beside the main page.

## Page Composition Checklist

Before shipping a page, confirm:

- the stylesheet is imported once
- `ThemeProvider` is mounted at the right level
- app-owned CSS respects Luna variables
- `LunaApp` owns the app host
- router and routes sit inside `LunaApp`
- `LunaWireframe` is only used inside a page when that page needs named shell regions
- `centerMiddle` contains the main work
- optional slots are present only when they add real value
- surfaces inside slots use the quietest component that still communicates the right hierarchy
