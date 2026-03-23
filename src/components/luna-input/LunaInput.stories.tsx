import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaText } from "../luna-text";
import { LunaInput } from "./LunaInput";

const meta = {
  title: "Components/LunaInput",
  component: LunaInput,
  args: {
    label: "Mission name",
    placeholder: "Enter mission name"
  }
} satisfies Meta<typeof LunaInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaInput
        label="Inset label"
        placeholder="Text inside the outline"
      />
      <LunaInput
        label="Floating label"
      />
      <LunaInput
        label="External label"
        externalLabel
        placeholder="Standard field label"
      />
    </LunaColumn>
  )
};

export const Sizes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaInput label="Small field" inputSize="sm" placeholder="Small input" />
      <LunaInput label="Medium field" inputSize="md" placeholder="Medium input" />
      <LunaInput label="Large field" inputSize="lg" placeholder="Large input" />
    </LunaColumn>
  )
};

export const SupportingText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaInput
        label="Mission name"
        placeholder="Luna Relay"
        helpText="Use a short operational name for review."
      />
      <LunaInput
        label="Launch code"
        defaultValue="A-12"
        error="Launch code format is incomplete."
      />
    </LunaColumn>
  )
};

export const LeadingAndTrailing: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaInput
        label="Search"
        placeholder="Search missions"
        leading={<LunaText variant="caption">Search</LunaText>}
      />
      <LunaInput
        label="Amount"
        defaultValue="24"
        leading={<LunaText variant="caption">USD</LunaText>}
        trailing={<LunaText variant="caption">per cycle</LunaText>}
      />
    </LunaColumn>
  )
};

export const NativeStates: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaInput label="Prefilled" defaultValue="Orbital review" />
      <LunaInput label="Disabled" defaultValue="Locked field" disabled />
      <LunaInput label="Read only" defaultValue="Review only" readOnly />
      <LunaInput label="Full width" fullWidth placeholder="This field stretches with its container" />
    </LunaColumn>
  )
};

export const SizeParity: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRow gap="4">
        <LunaInput label="Small input" inputSize="sm" placeholder="Small input" />
        <LunaInput label="Small disabled" inputSize="sm" defaultValue="Disabled" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaInput label="Medium input" inputSize="md" placeholder="Medium input" />
        <LunaInput label="Medium disabled" inputSize="md" defaultValue="Disabled" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaInput label="Large input" inputSize="lg" placeholder="Large input" />
        <LunaInput label="Large disabled" inputSize="lg" defaultValue="Disabled" disabled />
      </LunaRow>
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaInput label="Mission name" placeholder="Enter mission name" />
          <LunaInput label="Disabled" defaultValue="Locked field" disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
