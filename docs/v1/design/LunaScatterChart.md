# LunaScatterChart

`LunaScatterChart` should read as a finished chart surface rather than a thin wrapper over plotting math.

The design direction is:
- single-series only
- numeric axes only
- quiet axis chrome with enough contrast to orient the eye
- dense points with a soft glow so clusters read quickly
- a stable framed shell that can sit inside dashboards without extra rescue styling

The component should stay visually disciplined:
- the data points carry the emphasis
- grid lines remain optional and supportive
- legend treatment stays minimal because there is only one series
- if future needs push toward multi-series or statistical overlays, that should be a separate issue
