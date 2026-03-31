@liketysplit/react-luna

`@liketysplit/react-luna` is a React UI library for building themed application shells and reusable interface primitives without depending on another UI framework.

It ships:

- React components
- a default Lunar light and dark theme
- a package stylesheet
- a theme provider
- app and page shell primitives for full-page layouts

## Base Setup

Start here. This is the minimum consumer setup required for the package to render correctly.

### Hard Dependencies

Your application needs all of the following:

- `react`
- `react-dom`
- `@liketysplit/react-luna`
- `@liketysplit/react-luna/styles.css`
- `ThemeProvider` mounted near the application root

The package declares these peer dependencies:

- `react >= 18.0.0`
- `react-dom >= 18.0.0`

Current repository development and verification use React 18. If you see runtime mismatches, make sure your app and `react-luna` are resolving to the same React and `react-dom` versions.

### Install

```bash
npm install react react-dom @liketysplit/react-luna
```

### Minimum App Entry

Import the package stylesheet once and wrap your app in `ThemeProvider`.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@liketysplit/react-luna/styles.css";
import { ThemeProvider } from "@liketysplit/react-luna";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### First Render

```tsx
import { LunaButton, LunaCard, LunaHeader, LunaText } from "@liketysplit/react-luna";

export function App() {
  return (
    <LunaCard
      header={<LunaHeader title="Luna is mounted" subtitle="Base setup is working." />}
      actions={<LunaButton>Primary action</LunaButton>}
    >
      <LunaText>
        The stylesheet is loaded, the theme provider is mounted, and Luna components are ready to use.
      </LunaText>
    </LunaCard>
  );
}
```

## Root-Level Ideas

`react-luna` works best when you treat these as the root concepts of the system.

### 1. Theme First

The package is theme-driven.

- `ThemeProvider` owns the active theme and mode
- components read from shared tokens and generated CSS variables
- app-level styling should prefer Luna theme variables over ad hoc color systems

Start with the provider first, then override tokens as needed.

Theme guide:

- [docs/THEME.md](docs/THEME.md)

### 2. `LunaApp` Is The Application Host

Use `LunaApp` as the outer application host around your router.

It is meant for:

- app background
- app foreground color
- app gutters
- router host

Use it when you are building the top-level application frame, not when you are laying out a single route page.

Basic shape:

```tsx
import { LunaApp } from "@liketysplit/react-luna";
import { RouterProvider } from "react-router-dom";

export function AppShell({ router }: { router: React.ReactNode }) {
  return (
    <LunaApp gutter="1.5rem">
      {router}
    </LunaApp>
  );
}
```

Reference:

- [docs/v1/components/LunaApp.md](docs/v1/components/LunaApp.md)

### 3. `LunaWireframe` Is The Page Shell Layout Primitive

Use `LunaWireframe` inside a routed page component when that page needs named regions.

The page model is:

- `appBar`
- `left`
- `right`
- `centerTop`
- `centerMiddle`
- `centerBottom`

`centerMiddle` is the required main task area. The other regions are optional and the layout reflows when they are omitted.

The intended hierarchy is:

1. `ThemeProvider`
2. app root
3. `LunaApp`
4. router
5. route
6. page component
7. optional `LunaWireframe` inside that page

Not every page needs a wireframe. Use it when the page genuinely has shell regions.

Basic shape:

```tsx
import { LunaWireframe } from "@liketysplit/react-luna";

export function DashboardPage() {
  return (
    <LunaWireframe
      appBar="Page actions"
      left="Section navigation"
      centerTop="Page summary"
      centerMiddle="Primary route content"
      right="Inspector"
    />
  );
}
```

Full pattern:

```tsx
import { ThemeProvider, LunaApp, LunaWireframe } from "@liketysplit/react-luna";

function DashboardPage() {
  return (
    <LunaWireframe
      appBar="Page actions"
      left="Section navigation"
      centerMiddle="Primary route content"
      right="Inspector"
    />
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <LunaApp gutter="1rem">
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Router>
      </LunaApp>
    </ThemeProvider>
  );
}
```

References:

- [docs/v1/components/LunaWireframe.md](docs/v1/components/LunaWireframe.md)
- [docs/APP_SHELL_WIREFRAME.md](docs/APP_SHELL_WIREFRAME.md)

## Light And Dark Mode

`ThemeProvider` starts in light mode by default.

You can set the initial mode:

```tsx
import { ThemeProvider } from "@liketysplit/react-luna";

export function Root() {
  return (
    <ThemeProvider mode="dark">
      <App />
    </ThemeProvider>
  );
}
```

You can also toggle mode from descendants:

```tsx
import { LunaButton, useTheme } from "@liketysplit/react-luna";

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <LunaButton outline onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      Toggle theme
    </LunaButton>
  );
}
```

Important rule:

- Luna components follow the active theme automatically
- your own app chrome must also style from Luna variables such as `--luna-background`, `--luna-surface`, `--luna-foreground`, and `--luna-border` if you want dark and light mode to stay visually aligned

If an app host or routed page mixes Luna components with custom wrappers that ignore Luna variables, mode switching will look inconsistent even when the provider is working correctly.

## Theme Overrides

Use the `theme` prop for structural theme changes and `colors` for additive named colors.

```tsx
import type { DeepPartial, Theme } from "@liketysplit/react-luna";
import { ThemeProvider } from "@liketysplit/react-luna";

const appTheme: DeepPartial<Theme> = {
  typography: {
    fontFamily: "\"Instrument Sans\", system-ui, sans-serif"
  },
  modes: {
    light: {
      background: "neutral.100",
      surface: "neutral.50"
    },
    dark: {
      background: "#09111f",
      surface: "#101a2d"
    }
  }
};

export function Root() {
  return (
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  );
}
```

For the full token model and override rules:

- [docs/THEME.md](docs/THEME.md)

## What The Package Exports

The package entry exports:

- theme utilities such as `ThemeProvider` and `useTheme()`
- components such as `LunaButton`, `LunaCard`, `LunaHeader`, `LunaPanel`, `LunaApp`, and `LunaWireframe`
- icons

The package also exports a stylesheet:

```tsx
import "@liketysplit/react-luna/styles.css";
```

## Consumer Notes

- Import the stylesheet once, near the app root.
- Mount `ThemeProvider` close to the app root unless you intentionally want a smaller themed subtree.
- Prefer theme tokens and Luna CSS variables before creating a separate app-level color system.
- Use `LunaApp` for the application host around the router.
- Use `LunaWireframe` inside routed page components when those pages need named shell regions.
- Treat `LunaButton` as the baseline example for primitive contract quality and themeability.

## Local Development

For repository development:

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run build`
- `npm run test`
- `npm run storybook`
- `npm run storybook:build`

## Documentation

- [docs/THEME.md](docs/THEME.md)
- [docs/v1/components/LunaApp.md](docs/v1/components/LunaApp.md)
- [docs/v1/components/LunaWireframe.md](docs/v1/components/LunaWireframe.md)

## License

All rights reserved.
