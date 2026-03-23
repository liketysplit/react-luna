import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRadio } from "./LunaRadio";

const meta = {
  title: "Components/LunaRadio",
  component: LunaRadio,
  args: {
    name: "luna-radio-basic",
    label: "Orbital telemetry"
  }
} satisfies Meta<typeof LunaRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Grouped: Story = {
  render: () => <GroupedStory />
};

export const SupportText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRadio
        name="support-text"
        label="Primary telemetry"
        description="Recommended for standard lunar mission review."
        helpText="Only one telemetry mode can be active."
      />
      <LunaRadio
        name="support-text"
        label="Primary telemetry"
        description="Recommended for standard lunar mission review."
        error="A telemetry mode must be selected."
      />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <GroupedStory name="dark-mode-group" />
          <LunaRadio name="dark-mode-disabled" label="Disabled" disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};

function GroupedStory({ name = "launch-window" }: { name?: string }) {
  const [value, setValue] = React.useState("standard");

  return (
    <LunaColumn gap="4">
      <LunaRadio
        name={name}
        value="standard"
        label="Standard window"
        description="Balanced launch profile for routine missions."
        checked={value === "standard"}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            setValue("standard");
          }
        }}
      />
      <LunaRadio
        name={name}
        value="priority"
        label="Priority window"
        description="Use when mission timing takes precedence."
        checked={value === "priority"}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            setValue("priority");
          }
        }}
      />
      <LunaRadio
        name={name}
        value="hold"
        label="Hold launch"
        description="Keep the vehicle grounded until the next review cycle."
        checked={value === "hold"}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            setValue("hold");
          }
        }}
      />
      <LunaRadio
        name={name}
        value="disabled"
        label="Disabled option"
        description="Unavailable for this mission."
        disabled
      />
    </LunaColumn>
  );
}
