import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "../luna-column";
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
