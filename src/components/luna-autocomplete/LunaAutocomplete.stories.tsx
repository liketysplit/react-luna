import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaAutocomplete } from "./LunaAutocomplete";

const options = [
  { value: "moon-phase", label: "Moon phase" },
  { value: "orbital-window", label: "Orbital window" },
  { value: "launch-readiness", label: "Launch readiness review" },
  { value: "telemetry", label: "Telemetry sync", disabled: true }
];

const meta = {
  title: "Components/LunaAutocomplete",
  component: LunaAutocomplete,
  args: {
    label: "Mission check",
    options
  }
} satisfies Meta<typeof LunaAutocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaAutocomplete label="Inset label" options={options} placeholder="Search checks" />
      <LunaAutocomplete
        label="External label"
        externalLabel
        options={options}
        placeholder="Search checks"
      />
    </LunaColumn>
  )
};

export const Sizes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaAutocomplete label="Small autocomplete" inputSize="sm" options={options} placeholder="Search checks" />
      <LunaAutocomplete label="Medium autocomplete" inputSize="md" options={options} placeholder="Search checks" />
      <LunaAutocomplete label="Large autocomplete" inputSize="lg" options={options} placeholder="Search checks" />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaAutocomplete label="Empty" options={options} placeholder="Search checks" />
      <LunaAutocomplete label="Selected" options={options} defaultValue="moon-phase" />
      <LunaAutocomplete
        label="No results"
        options={options}
        defaultValue="moon-phase"
        placeholder="Search checks"
        noResultsText="Nothing matched this search."
      />
      <LunaAutocomplete label="Disabled" options={options} defaultValue="moon-phase" disabled />
      <LunaAutocomplete
        label="Full width"
        options={options}
        fullWidth
        placeholder="This field stretches with its container"
      />
    </LunaColumn>
  )
};

export const SupportingText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaAutocomplete
        label="Mission check"
        options={options}
        placeholder="Search checks"
        helpText="Type to narrow the list of checks."
      />
      <LunaAutocomplete
        label="Mission check"
        options={options}
        error="You need to choose a valid check."
      />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaAutocomplete label="Mission check" options={options} placeholder="Search checks" />
          <LunaAutocomplete label="Disabled" options={options} defaultValue="moon-phase" disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};

export const SizeParity: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRow gap="4">
        <LunaAutocomplete label="Small" inputSize="sm" options={options} placeholder="Search checks" />
        <LunaAutocomplete label="Small disabled" inputSize="sm" options={options} defaultValue="moon-phase" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaAutocomplete label="Medium" inputSize="md" options={options} placeholder="Search checks" />
        <LunaAutocomplete label="Medium disabled" inputSize="md" options={options} defaultValue="moon-phase" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaAutocomplete label="Large" inputSize="lg" options={options} placeholder="Search checks" />
        <LunaAutocomplete label="Large disabled" inputSize="lg" options={options} defaultValue="moon-phase" disabled />
      </LunaRow>
    </LunaColumn>
  )
};
