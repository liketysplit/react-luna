import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../theme";
import { LunaSpinner } from "./LunaSpinner";

const meta = {
  title: "Components/LunaSpinner",
  component: LunaSpinner,
  parameters: {
    layout: "centered"
  },
  args: {
    decorative: true,
    size: "medium"
  }
} satisfies Meta<typeof LunaSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <LunaSpinner size="x-small" />
      <LunaSpinner size="small" />
      <LunaSpinner size="medium" />
      <LunaSpinner size="large" />
      <LunaSpinner size="x-large" />
    </div>
  )
};

export const SurfaceModes: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "1rem",
        width: "min(30rem, 90vw)"
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "8rem",
          borderRadius: "var(--luna-radius-lg)",
          border: "1px solid var(--luna-border)",
          background: "var(--luna-background)"
        }}
      >
        <LunaSpinner size="large" />
      </div>
      <ThemeProvider mode="dark">
        <div
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "8rem",
            borderRadius: "var(--luna-radius-lg)",
            border: "1px solid var(--luna-border)",
            background: "var(--luna-background)",
            color: "var(--luna-foreground)"
          }}
        >
          <LunaSpinner size="large" />
        </div>
      </ThemeProvider>
    </div>
  )
};

export const SemanticUsage: Story = {
  render: () => (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        borderRadius: "var(--luna-radius-lg)",
        border: "1px solid var(--luna-border)",
        background: "var(--luna-surface)"
      }}
    >
      <LunaSpinner decorative={false} label="Loading telemetry" />
      <span>Loading telemetry</span>
    </div>
  )
};

export const ThemeOverride: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        components: {
          spinner: {
            defaultSize: "large",
            duration: "slow",
            sizes: {
              large: {
                size: "2.5rem",
                strokeWidth: "0.3125rem"
              }
            },
            modes: {
              light: {
                color: "accent.500",
                track: "rgba(139, 92, 246, 0.18)"
              }
            }
          }
        }
      }}
    >
      <LunaSpinner />
    </ThemeProvider>
  )
};
