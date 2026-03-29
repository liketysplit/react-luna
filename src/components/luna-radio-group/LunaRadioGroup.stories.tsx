import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRadioGroup } from "./LunaRadioGroup";

const items = [
  {
    value: "standard",
    label: "Standard window",
    description: "Balanced launch profile for routine missions."
  },
  {
    value: "priority",
    label: "Priority window",
    description: "Use when mission timing takes precedence."
  },
  {
    value: "hold",
    label: "Hold launch",
    description: "Keep the vehicle grounded until the next review cycle."
  },
  {
    value: "disabled",
    label: "Disabled option",
    description: "Unavailable for this mission.",
    disabled: true
  }
];

const meta = {
  title: "Components/LunaRadioGroup",
  component: LunaRadioGroup,
  args: {
    label: "Launch window",
    name: "launch-window",
    items
  }
} satisfies Meta<typeof LunaRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: "standard"
  }
};

export const Horizontal: Story = {
  args: {
    defaultValue: "priority",
    orientation: "horizontal"
  }
};

export const SupportText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRadioGroup
        label="Launch window"
        name="support-text-help"
        items={items.slice(0, 3)}
        helpText="Choose the launch profile for the upcoming review."
      />
      <LunaRadioGroup
        label="Launch window"
        name="support-text-error"
        items={items.slice(0, 3)}
        error="A launch profile must be selected."
      />
    </LunaColumn>
  )
};

export const Controlled: Story = {
  render: () => <ControlledStory />
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaRadioGroup
          label="Launch window"
          name="launch-window-dark"
          items={items}
          defaultValue="standard"
        />
      </div>
    </ThemeProvider>
  )
};

function ControlledStory() {
  const [value, setValue] = React.useState("standard");

  return (
    <LunaRadioGroup
      label="Launch window"
      description="Keep the mission review locked to a single active profile."
      name="launch-window-controlled"
      items={items.slice(0, 3)}
      value={value}
      onValueChange={setValue}
      helpText={`Selected: ${value}`}
    />
  );
}
