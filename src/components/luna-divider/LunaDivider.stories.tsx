import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaText } from "../luna-text";
import { LunaDivider } from "./LunaDivider";

const meta = {
  title: "Components/LunaDivider",
  component: LunaDivider,
  args: {
    orientation: "horizontal",
    tone: "default"
  }
} satisfies Meta<typeof LunaDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <LunaColumn gap="4">
      <LunaText>Before content</LunaText>
      <LunaDivider {...args} />
      <LunaText>After content</LunaText>
    </LunaColumn>
  )
};

export const Tones: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDivider tone="default" />
      <LunaDivider tone="muted" />
      <LunaDivider tone="strong" />
    </LunaColumn>
  )
};

export const Labeled: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDivider label="Overview" labelAlign="start" />
      <LunaDivider label="Details" labelAlign="center" />
      <LunaDivider label="Actions" labelAlign="end" />
    </LunaColumn>
  )
};

export const InsetsAndSpacing: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDivider />
      <LunaDivider inset />
      <LunaDivider inset="8" spacing="8" label="Inset with spacing" />
    </LunaColumn>
  )
};

export const Vertical: Story = {
  render: () => (
    <LunaRow align="stretch" justify="start" wrap={false}>
      <div
        data-col-span="auto"
        style={{
          minHeight: "5rem",
          padding: "1rem",
          border: "1px solid var(--luna-border)",
          borderRadius: "var(--luna-radius-md)",
          background: "var(--luna-surface)"
        }}
      >
        <LunaText variant="label">Left panel</LunaText>
        <LunaText variant="body-small" muted>
          Navigation
        </LunaText>
      </div>
      <LunaDivider orientation="vertical" spacing="4" colSpan="auto" />
      <div
        data-col-span="auto"
        style={{
          minHeight: "5rem",
          padding: "1rem",
          border: "1px solid var(--luna-border)",
          borderRadius: "var(--luna-radius-md)",
          background: "var(--luna-surface)"
        }}
      >
        <LunaText variant="label">Center panel</LunaText>
        <LunaText variant="body-small" muted>
          Content
        </LunaText>
      </div>
      <LunaDivider orientation="vertical" tone="strong" spacing="4" colSpan="auto" />
      <div
        data-col-span="auto"
        style={{
          minHeight: "5rem",
          padding: "1rem",
          border: "1px solid var(--luna-border)",
          borderRadius: "var(--luna-radius-md)",
          background: "var(--luna-surface)"
        }}
      >
        <LunaText variant="label">Right panel</LunaText>
        <LunaText variant="body-small" muted>
          Actions
        </LunaText>
      </div>
    </LunaRow>
  )
};
