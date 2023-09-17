import { useTheme } from './ThemeProvider';
import Button from '../ux/Button';
export default function ThemeExampleUse() {
  const { toggleTheme } = useTheme();
  return (
    <>
      <Button onClick={() => toggleTheme()} size="xxs" rounded>
        Toggle Theme
      </Button>
    </>
  );
}
