import type { Meta, StoryObj } from "@storybook/react";
import { LunaSkeleton } from "./LunaSkeleton";

const meta = {
  title: "Components/LunaSkeleton",
  component: LunaSkeleton,
  parameters: {
    layout: "centered"
  },
  args: {
    width: "16"
  }
} satisfies Meta<typeof LunaSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ShapeMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        width: "min(36rem, 90vw)"
      }}
    >
      <LunaSkeleton shape="text" lines={3} />
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <LunaSkeleton shape="circle" size="10" />
        <LunaSkeleton shape="pill" width="8" size="4" />
        <LunaSkeleton shape="block" width="12" height="6" />
      </div>
    </div>
  )
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", width: "20rem" }}>
      <LunaSkeleton size="x-small" />
      <LunaSkeleton size="small" />
      <LunaSkeleton size="medium" />
      <LunaSkeleton size="large" />
      <LunaSkeleton size="x-large" />
    </div>
  )
};

export const AnimationModes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "20rem" }}>
      <LunaSkeleton animation="wave" />
      <LunaSkeleton animation="pulse" />
      <LunaSkeleton animation="none" />
    </div>
  )
};

export const SurfaceComposition: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        width: "min(28rem, 90vw)",
        padding: "1.5rem",
        border: "1px solid var(--luna-border)",
        borderRadius: "var(--luna-radius-lg)",
        background: "var(--luna-surface)"
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <LunaSkeleton shape="circle" size="12" />
        <div style={{ display: "grid", gap: "0.5rem", flex: 1 }}>
          <LunaSkeleton shape="text" width="10" />
          <LunaSkeleton shape="text" lines={2} lastLineWidth="6" />
        </div>
      </div>
      <LunaSkeleton shape="block" height="12" />
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <LunaSkeleton shape="pill" width="7" size="4" />
        <LunaSkeleton shape="pill" width="5" size="4" />
      </div>
    </div>
  )
};
