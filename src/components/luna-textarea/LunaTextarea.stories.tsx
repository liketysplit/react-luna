import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaTextarea } from "./LunaTextarea";

const meta = {
  title: "Components/LunaTextarea",
  component: LunaTextarea,
  args: {
    label: "Mission notes",
    placeholder: "Write mission notes"
  }
} satisfies Meta<typeof LunaTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTextarea label="Inset label" placeholder="Write mission notes" />
      <LunaTextarea label="Floating label" />
      <LunaTextarea label="External label" externalLabel placeholder="Write mission notes" />
    </LunaColumn>
  )
};

export const ResizeModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTextarea label="Vertical resize" resize="vertical" defaultValue={"First line\nSecond line"} />
      <LunaTextarea label="No resize" resize="none" defaultValue={"Locked size\nStill multiline"} />
      <LunaTextarea label="Both directions" resize="both" defaultValue={"Resizable both ways"} />
    </LunaColumn>
  )
};

export const AutoGrow: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTextarea
        label="Auto grow"
        autoGrow
        minRows={3}
        maxRows={6}
        defaultValue={"Mission summary\nLine two\nLine three"}
      />
      <LunaTextarea
        label="Fixed height"
        height="12"
        defaultValue={"Pinned height example\nAdditional content"}
      />
    </LunaColumn>
  )
};

export const SupportingText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTextarea
        label="Mission notes"
        helpText="Capture context for the next operator."
        defaultValue="Staging complete."
      />
      <LunaTextarea
        label="Incident report"
        error="A longer response is required."
      />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTextarea label="Prefilled" defaultValue="Staging complete." />
      <LunaTextarea label="Disabled" defaultValue="Locked field" disabled />
      <LunaTextarea label="Full width" fullWidth placeholder="This field stretches with its container" />
    </LunaColumn>
  )
};

export const SizeParity: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRow gap="4">
        <LunaTextarea label="Small textarea" inputSize="sm" minRows={1} placeholder="Small textarea" />
        <LunaTextarea label="Small disabled" inputSize="sm" minRows={1} defaultValue="Disabled" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaTextarea label="Medium textarea" inputSize="md" minRows={1} placeholder="Medium textarea" />
        <LunaTextarea label="Medium disabled" inputSize="md" minRows={1} defaultValue="Disabled" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaTextarea label="Large textarea" inputSize="lg" minRows={1} placeholder="Large textarea" />
        <LunaTextarea label="Large disabled" inputSize="lg" minRows={1} defaultValue="Disabled" disabled />
      </LunaRow>
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaTextarea label="Mission notes" placeholder="Write mission notes" />
          <LunaTextarea label="Disabled" defaultValue="Locked field" disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
