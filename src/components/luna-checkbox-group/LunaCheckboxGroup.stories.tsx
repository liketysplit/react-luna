import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaCheckboxGroup } from "./LunaCheckboxGroup";

const options = [
  {
    value: "telemetry",
    label: "Telemetry review",
    description: "Keep mission telemetry checks enabled during the release window."
  },
  {
    value: "readiness",
    label: "Launch readiness",
    description: "Confirm launch approvals and payload sequencing before handoff."
  },
  {
    value: "documentation",
    label: "Documentation handoff",
    description: "Include updated runbooks and change notes for downstream teams.",
    disabled: true
  }
];

const meta = {
  title: "Components/LunaCheckboxGroup",
  component: LunaCheckboxGroup,
  args: {
    label: "Mission review checklist",
    options
  }
} satisfies Meta<typeof LunaCheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <LunaCheckboxGroup label="Unchecked group" options={options} />
      <LunaCheckboxGroup
        label="Preselected group"
        options={options}
        defaultValue={["telemetry", "readiness"]}
      />
      <LunaCheckboxGroup
        label="Disabled group"
        options={options}
        defaultValue={["telemetry"]}
        disabled
      />
      <ControlledStory />
    </div>
  )
};

export const SupportText: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <LunaCheckboxGroup
        label="Mission review checklist"
        description="Select every review gate that must be completed before the mission closes."
        options={options}
        helpText="Choose at least one gate for every release review."
      />
      <LunaCheckboxGroup
        label="Mission review checklist"
        description="Select every review gate that must be completed before the mission closes."
        options={options}
        error="At least one checklist item must be selected."
      />
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div
        style={{
          padding: "1rem",
          background: "var(--luna-background)",
          display: "grid",
          gap: "1.5rem"
        }}
      >
        <LunaCheckboxGroup
          label="Mission review checklist"
          options={options}
          defaultValue={["telemetry"]}
        />
        <LunaCheckboxGroup label="Disabled group" options={options} disabled />
      </div>
    </ThemeProvider>
  )
};

function ControlledStory() {
  const [value, setValue] = React.useState<string[]>(["telemetry"]);

  return (
    <LunaCheckboxGroup
      label="Controlled group"
      description="Selection stays driven by the parent component."
      options={options}
      value={value}
      onChange={setValue}
      helpText={`Selected: ${value.join(", ") || "none"}`}
    />
  );
}
