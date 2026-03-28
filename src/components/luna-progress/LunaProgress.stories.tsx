import type { Meta, StoryObj } from "@storybook/react";
import { LunaProgress } from "./LunaProgress";

const meta = {
  title: "Components/LunaProgress",
  component: LunaProgress,
  args: {
    label: "Uploading release assets",
    description: "Pushing the final files into the package pipeline.",
    value: 64,
    showValue: true
  }
} satisfies Meta<typeof LunaProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "min(28rem, 90vw)" }}>
      <LunaProgress label="Extra small" size="x-small" value={28} showValue />
      <LunaProgress label="Small" size="small" value={42} showValue />
      <LunaProgress label="Medium" size="medium" value={56} showValue />
      <LunaProgress label="Large" size="large" value={73} showValue />
      <LunaProgress label="Extra large" size="x-large" value={88} showValue />
    </div>
  )
};

export const ToneMatrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "min(28rem, 90vw)" }}>
      <LunaProgress label="Primary" tone="primary" value={36} showValue />
      <LunaProgress label="Success" tone="success" value={68} showValue />
      <LunaProgress label="Warning" tone="warning" value={54} showValue />
      <LunaProgress label="Danger" tone="danger" value={82} showValue />
      <LunaProgress label="Neutral" tone="neutral" value={47} showValue />
    </div>
  )
};

export const Indeterminate: Story = {
  args: {
    label: "Provisioning environment",
    description: "Waiting for the runtime to finish the remaining background work.",
    indeterminate: true,
    showValue: false
  }
};

export const CustomValueLabel: Story = {
  args: {
    label: "Migrating data",
    description: "The archive is being reshaped into the new storage layout.",
    value: 45,
    valueLabel: "9 of 20 batches"
  }
};
