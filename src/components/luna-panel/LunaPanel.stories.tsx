import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaPanel } from "./LunaPanel";

const meta = {
  title: "Components/LunaPanel",
  component: LunaPanel,
  parameters: {
    layout: "centered"
  },
  args: {
    title: "Panel title",
    description: "Short supporting detail that explains what lives inside this surface.",
    children: "Panel body content."
  }
} satisfies Meta<typeof LunaPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "min(100%, 42rem)" }}>
      <LunaPanel title="Default panel" description="Neutral surface for general content.">
        Panel body content.
      </LunaPanel>
      <LunaPanel title="Chrome panel" description="Useful when the panel wants stronger page chrome." tone="chrome">
        Panel body content.
      </LunaPanel>
      <LunaPanel title="Emphasis panel" description="Useful for summary or high-context bands." tone="emphasis">
        Panel body content.
      </LunaPanel>
    </div>
  )
};
