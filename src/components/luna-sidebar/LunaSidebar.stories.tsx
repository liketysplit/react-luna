import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaHeader } from "../luna-header";
import { LunaSidebar } from "./LunaSidebar";

const meta = {
  title: "Components/LunaSidebar",
  component: LunaSidebar,
  args: {
    sticky: true,
    header: (
      <LunaHeader
        title="Operations"
        subtitle="Keep persistent actions and status grouped beside the main page flow."
      />
    ),
    children: (
      <nav aria-label="Sidebar sections" style={{ display: "grid", gap: "0.75rem" }}>
        <a href="#overview">Overview</a>
        <a href="#activity">Activity</a>
        <a href="#alerts">Alerts</a>
        <a href="#team">Team</a>
      </nav>
    ),
    footer: (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <LunaButton>Primary action</LunaButton>
        <LunaButton flat>Secondary action</LunaButton>
      </div>
    )
  }
} satisfies Meta<typeof LunaSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LayoutPreview: Story = {
  parameters: {
    layout: "fullscreen"
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 20rem) minmax(0, 1fr)",
        gap: "1.5rem",
        minHeight: "100vh",
        padding: "2rem",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--luna-background) 96%, white) 0%, var(--luna-background) 100%)"
      }}
    >
      <LunaSidebar {...args} />
      <main
        style={{
          display: "grid",
          alignContent: "start",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid var(--luna-border)",
          borderRadius: "1rem",
          background: "var(--luna-surface)"
        }}
      >
        <LunaHeader
          title="Mission control"
          subtitle="The sidebar stays visible while the main content scrolls independently."
        />
        {Array.from({ length: 6 }, (_, index) => (
          <section
            key={index}
            style={{
              minHeight: "7rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "color-mix(in srgb, var(--luna-surface) 84%, var(--luna-background))",
              border: "1px solid color-mix(in srgb, var(--luna-border) 80%, transparent)"
            }}
          >
            Content section {index + 1}
          </section>
        ))}
      </main>
    </div>
  )
};

export const CustomWidth: Story = {
  args: {
    sticky: false,
    width: "22rem"
  }
};
