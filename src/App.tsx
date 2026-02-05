import { ThemeProvider, useTheme } from "./theme";

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      style={{ marginBottom: "1.5rem" }}
    >
      Toggle mode ({mode})
    </button>
  );
}

const palettes = [
  "primary",
  "neutral",
  "accent",
  "success",
  "warning",
  "danger"
];

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function SwatchGrid() {
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      {palettes.map((name) => (
        <div key={name}>
          <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
            {name}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
              gap: "0.5rem"
            }}
          >
            {steps.map((step) => (
              <div
                key={`${name}-${step}`}
                style={{
                  background: `var(--luna-color-${name}-${step})`,
                  borderRadius: "0.5rem",
                  height: "3.5rem",
                  border: "1px solid var(--luna-border)"
                }}
                title={`${name}.${step}`}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Content() {
  return (
    <main style={{ padding: "2rem" }}>
      <ThemeToggle />
      <h1>react-luna</h1>
      <p>Default lunar theme is active.</p>
      <SwatchGrid />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}
