import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaHeader } from "./LunaHeader";

const meta = {
  title: "Components/LunaHeader",
  component: LunaHeader,
  args: {
    title: "Mission Brief",
    subtitle: "Primary telemetry is stable and ready for review."
  }
} satisfies Meta<typeof LunaHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Alignments: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <LunaHeader title="Left aligned" subtitle="Default header behavior." />
      <LunaHeader title="Centered" subtitle="Useful for cards and spotlight content." align="center" />
      <LunaHeader title="Right aligned" subtitle="Useful for utility-heavy panels." align="right" />
    </div>
  )
};

export const GapControl: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <LunaHeader title="Compact spacing" subtitle="Uses a tighter vertical relationship." gap="1" />
      <LunaHeader title="Loose spacing" subtitle="Uses a roomier vertical relationship." gap="4" />
    </div>
  )
};

export const CustomContent: Story = {
  render: () => (
    <LunaHeader
      title={<span>Custom title content</span>}
      subtitle={<span>Subtitle can also be arbitrary inline content.</span>}
    />
  )
};
