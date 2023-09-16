import { useTheme } from "./ThemeProvider";
export default function ThemeExampleUse() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <h1>Theme Example Use</h1>
      <button onClick={() => toggleTheme()}>Toggle Theme</button>
      <div style={{ background: theme.colors.primary }}>
        This component uses the theme's primary color.
      </div>
    </>
  );
}
