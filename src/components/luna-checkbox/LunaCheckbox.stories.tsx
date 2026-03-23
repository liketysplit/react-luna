import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaCheckbox } from "./LunaCheckbox";

const meta = {
  title: "Components/LunaCheckbox",
  component: LunaCheckbox,
  args: {
    label: "Enable lunar telemetry"
  }
} satisfies Meta<typeof LunaCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaCheckbox label="Unchecked" />
      <LunaCheckbox label="Checked" defaultChecked />
      <ControlledIndeterminateStory />
      <LunaCheckbox label="Disabled" defaultChecked disabled />
    </LunaColumn>
  )
};

export const SupportText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaCheckbox
        label="Enable lunar telemetry"
        description="Telemetry stays active during staged launches."
        helpText="Recommended for review environments."
      />
      <LunaCheckbox
        label="Enable lunar telemetry"
        description="Telemetry stays active during staged launches."
        error="Telemetry must stay enabled for this mission."
      />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaCheckbox label="Enable lunar telemetry" />
          <LunaCheckbox label="Checked" defaultChecked />
          <ControlledIndeterminateStory />
          <LunaCheckbox label="Disabled" defaultChecked disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};

function ControlledIndeterminateStory() {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);

  return (
    <LunaCheckbox
      label="Indeterminate"
      checked={checked}
      indeterminate={indeterminate}
      onChange={(event) => {
        setIndeterminate(false);
        setChecked(event.currentTarget.checked);
      }}
      description="First click resolves the mixed state into a normal checked state."
    />
  );
}
