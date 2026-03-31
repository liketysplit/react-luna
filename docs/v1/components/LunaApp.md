# LunaApp

`LunaApp` is the application host.

It is intended to wrap the router and render routed pages inside a consistent app-level surface.

## Props

- `children: React.ReactNode`
- `gutter?: React.CSSProperties["padding"]`
- `topGutter?: React.CSSProperties["paddingTop"]`
- `rightGutter?: React.CSSProperties["paddingRight"]`
- `bottomGutter?: React.CSSProperties["paddingBottom"]`
- `leftGutter?: React.CSSProperties["paddingLeft"]`
- `color?: React.CSSProperties["color"]`
- `background?: React.CSSProperties["background"]`
- `backgroundImage?: React.CSSProperties["backgroundImage"]`
- `backgroundSize?: React.CSSProperties["backgroundSize"]`
- `backgroundPosition?: React.CSSProperties["backgroundPosition"]`
- `backgroundRepeat?: React.CSSProperties["backgroundRepeat"]`

It also accepts normal HTML attributes for the root element.

## Behavior

- `LunaApp` does not duplicate `LunaWireframe` region props
- router and page content are expected to live inside `children`
- page-level gutter props apply to the inner content wrapper
- color and background props apply to the app host
- when a child page already uses surfaced components such as `LunaPanel`, `LunaApp` stories should not also turn on `LunaWireframe` slot borders unless the comparison is specifically about wireframe borders

## Storybook Coverage

The current stories are intended to make the app-host behaviors obvious:

- `Playground`
- `Gutters`
- `WithTextRoute`
- `ExtremeLeftGutter`
- `ExtremeTopGutter`
- `ExtremeRightGutter`
- `ExtremeAllGutters`
- `BackgroundColorShift`
- `BackgroundImageLayer`
- `BackgroundCssStarField`

The current story pattern is:

- every story wraps the routed page in a demo page frame so the app host and page surface remain visually distinct
- non-text stories keep `LunaWireframe` borders off when `LunaPanel` is already providing the surface
- text-route and gutter-comparison stories can turn `LunaWireframe` borders on when that makes the layout boundary easier to read

## Intended Layering

Use `LunaApp` as the application host:

- app background
- app foreground color
- app gutters
- router host

Use `LunaWireframe` inside routed pages when those pages need the named shell regions.
