# Theme Guide

This guide explains how to use the default lunar theme and how to override it with your own tokens and colors.

## Basic Usage

Use the provider and do nothing else to get the default light theme.

```tsx
import { ThemeProvider } from "react-luna";

export function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Light and Dark Mode

You can set the mode explicitly and toggle it in runtime.

```tsx
import { ThemeProvider, useTheme } from "react-luna";

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

## Partial Theme Overrides

You do not need to provide a full theme. Provide only the parts you want to change.

```tsx
import { ThemeProvider } from "react-luna";

const partialTheme = {
  typography: {
    fontFamily: "\"Work Sans\", system-ui, sans-serif"
  },
  modes: {
    dark: {
      background: "neutral.950",
      foreground: "neutral.50"
    }
  }
};

export function App() {
  return (
    <ThemeProvider theme={partialTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Custom Named Colors

Add your own named colors and use them as tokens.

```tsx
import { ThemeProvider } from "react-luna";

export function App() {
  return (
    <ThemeProvider colors={{ mystic: "#7b7bff" }}>
      <YourApp />
    </ThemeProvider>
  );
}
```

You can then reference `mystic` in component props that accept a `color` token.

## Token Usage

Theme tokens use a `scale.level` format, such as `primary.600` or `neutral.100`. If you only provide the scale name, a sensible default level is used.

## Files

- `src/theme/base.ts`: the default lunar theme
- `src/theme/provider.tsx`: ThemeProvider and useTheme
- `src/theme/merge.ts`: deep merge for partial overrides
- `src/theme/vars.ts`: CSS variable generation
