# Theme Guide

This guide documents the `react-luna` theme system, how overrides work, how tokens are structured, and how downstream projects should consume the library without forking component styles.

Themeability is a first-class requirement in `react-luna`. The theme contract is meant to let an application change the library's visual language while keeping component APIs stable.

`LunaButton` remains the baseline primitive for this expectation. If button customization becomes awkward, the theme model needs work rather than the component needing app-specific escape hatches.

## What The Theme System Contains

The exported theme contract has seven shared token groups plus a component token section:

- `colors`: named color scales and custom named colors
- `modes`: semantic surface tokens for light and dark mode
- `typography`: font family, type sizes, weights, and line heights
- `spacing`: reusable spacing scale
- `radii`: corner radius scale
- `shadows`: shared elevation values
- `motion`: shared duration values
- `components`: component-level defaults, size profiles, and mode-aware token mappings

The default theme lives in `src/theme/base.ts`. `ThemeProvider` merges your overrides into that base theme, resolves the active mode, and exposes the result through React context and generated CSS variables.

## Basic Consumer Setup

Wrap your application in `ThemeProvider` and import the package stylesheet once.

```tsx
import "@liketysplit/react-luna/styles.css";
import { ThemeProvider } from "@liketysplit/react-luna";

export function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

By default:

- the provider starts in light mode
- the provider renders a wrapper with `data-luna-theme` and `data-luna-mode`
- all generated theme CSS variables are attached to that wrapper

Use the provider close to the app root unless you intentionally want a smaller themed subtree.

## Light And Dark Mode

`ThemeProvider` accepts a `mode` prop and `useTheme()` exposes the current mode plus a setter.

```tsx
import {
  ThemeProvider,
  useTheme
} from "@liketysplit/react-luna";

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      Toggle mode ({mode})
    </button>
  );
}

export function App() {
  return (
    <ThemeProvider mode="dark">
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}
```

Use `mode` when your application owns theme state. Use `setMode` when a descendant needs to toggle the active theme.

## Override Layers

There are two intended override paths:

1. `theme`
   Use this for partial structural overrides to the full theme object.
2. `colors`
   Use this for quick custom named colors without rewriting `theme.colors.custom`.

The provider applies them in this order:

1. start with `lunarTheme`
2. deep-merge the `theme` prop into it
3. merge the `colors` prop into `theme.colors.custom`

That means:

- you can override only the branches you need
- omitted values keep the default Lunar theme values
- `colors` is additive and can coexist with `theme.colors.custom`

## Token Structure And Resolution Rules

### Color Tokens

Color tokens are resolved in this order:

1. raw CSS colors such as `#7ab8ff`, `rgb(...)`, `hsl(...)`, or `var(...)`
2. custom named colors from `theme.colors.custom`
3. scale tokens using `scale.level`, such as `primary.600`

If you reference only a scale name, such as `primary`, the resolver falls back to the `600` level for that scale.

The default theme ships these built-in scales:

- `primary`
- `neutral`
- `accent`
- `success`
- `warning`
- `danger`

### Semantic Mode Tokens

`theme.modes.light` and `theme.modes.dark` define the shared semantic surface tokens:

- `background`
- `foreground`
- `surface`
- `border`
- `muted`

Component tokens should usually point at these shared scales instead of hard-coding one-off colors.

### Shared Scale Tokens

These groups resolve by key first and then fall back to raw CSS values when needed:

- `typography.sizes`
- `typography.weights`
- `typography.lineHeights`
- `spacing`
- `radii`
- `shadows`
- `motion`

This lets component tokens stay compact. For example, button size profiles can reference `"4"` for spacing and `"sm"` for type size.

### Component Tokens

`theme.components` is where component-specific defaults live. Common patterns include:

- `defaultSize`
- `radius`
- mode-specific token maps under `modes.light` and `modes.dark`
- size profiles under `sizes`
- tone or variant maps for components that support semantic treatments

Component tokens should refine the shared scales, not replace them with disconnected one-off values unless the design truly needs it.

## Partial Theme Overrides

Use the `theme` prop when you want to change the shared theme contract.

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
  },
  components: {
    button: {
      radius: "pill",
      sizes: {
        medium: {
          paddingX: "5",
          minHeight: "12"
        }
      }
    }
  }
};

export function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

This pattern is the right default for application-level theming. Keep the override object in one place and let consumers import it where the provider is mounted.

## Custom Named Colors

Use the `colors` prop when you want to add named colors for component props that accept token values.

```tsx
import { ThemeProvider } from "@liketysplit/react-luna";

export function App() {
  return (
    <ThemeProvider
      colors={{
        moonGlow: "#7ab8ff",
        crater: "#5d6b89"
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

Those names become available anywhere token resolution is used. For example:

```tsx
<LunaButton color="moonGlow">Launch</LunaButton>
```

Use `colors` for additive aliases. Use `theme.colors.scale` or `theme.colors.custom` when you want the full theme object to own the color definition.

## Consumer Usage Patterns

### Define One App Theme

Prefer one exported theme override object per consuming application.

```tsx
// app-theme.ts
import type { DeepPartial, Theme } from "@liketysplit/react-luna";

export const appTheme: DeepPartial<Theme> = {
  typography: {
    fontFamily: "\"Instrument Sans\", system-ui, sans-serif"
  }
};
```

This keeps all package-facing theme decisions in one place instead of scattering per-screen overrides.

### Theme Through Tokens First

Prefer token overrides over component forks or one-off wrapper styles.

Good:

- change `theme.components.button.radius`
- change `theme.modes.dark.surface`
- add `colors.brandAccent`

Avoid:

- duplicating a component just to change color or spacing
- pushing app-specific visual props into shared library contracts
- relying on deeply nested custom CSS before checking whether a token already exists

### Use `useTheme()` In Custom Composition

Use `useTheme()` when your own application components need to:

- read the active `theme`
- read or toggle `mode`
- access the generated `vars` map

```tsx
import { useTheme } from "@liketysplit/react-luna";

export function AppShell() {
  const { mode, vars } = useTheme();

  return (
    <section
      style={{
        background: vars["--luna-surface"],
        color: vars["--luna-foreground"]
      }}
    >
      Current mode: {mode}
    </section>
  );
}
```

This is the intended path for app-level composition that needs to stay synchronized with the active Luna theme.

### Use CSS Variables At App Boundaries

`ThemeProvider` writes shared variables such as these onto its root element:

- `--luna-background`
- `--luna-foreground`
- `--luna-surface`
- `--luna-border`
- `--luna-muted`
- `--luna-color-{scale}-{level}`
- `--luna-space-{key}`
- `--luna-radius-{key}`

That makes it reasonable to style application shells or layout wrappers around Luna components without reimplementing the theme logic yourself.

## Source Files

- `src/theme/base.ts`: default Lunar theme tokens
- `src/theme/types.ts`: public theme contract and `DeepPartial`
- `src/theme/provider.tsx`: `ThemeProvider` and `useTheme()`
- `src/theme/merge.ts`: deep merge behavior for partial overrides
- `src/theme/resolve.ts`: token resolution rules
- `src/theme/vars.ts`: generated CSS variable map

## Expectations

The intended theming direction for `react-luna` is:

- override tokens first
- keep component contracts stable
- let components derive presentation from shared theme values
- make downstream customization easier, not harder

If a consumer has to fork a component to change routine visual styling, the theme contract is missing something and should be improved at the theme layer.
