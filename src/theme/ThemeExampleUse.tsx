import { useTheme } from "./ThemeProvider";
import Button from "../ux/Button";
export default function ThemeExampleUse() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <h1>Theme Example Use</h1>
      <Button onClick={() => toggleTheme()} size='xxs' rounded>Toggle Theme</Button>
      <div style={{ background: theme.colors.primary }}>
        This component uses the theme's primary color.
      </div>
    </>
  );
}
