import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaMultiselect } from "./LunaMultiselect";

const options = [
  { value: "moon-phase", label: "Moon phase" },
  { value: "orbital-window", label: "Orbital window" },
  { value: "launch-readiness", label: "Launch readiness review" },
  { value: "telemetry", label: "Telemetry sync", disabled: true }
];

const meta = {
  title: "Components/LunaMultiselect",
  component: LunaMultiselect,
  args: {
    label: "Mission checks",
    options
  }
} satisfies Meta<typeof LunaMultiselect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaMultiselect label="Inset label" options={options} placeholder="Choose checks" />
      <LunaMultiselect
        label="External label"
        externalLabel
        options={options}
        placeholder="Choose checks"
      />
    </LunaColumn>
  )
};

export const Sizes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaMultiselect
        label="Small multiselect"
        inputSize="sm"
        options={options}
        placeholder="Choose checks"
      />
      <LunaMultiselect
        label="Medium multiselect"
        inputSize="md"
        options={options}
        placeholder="Choose checks"
      />
      <LunaMultiselect
        label="Large multiselect"
        inputSize="lg"
        options={options}
        placeholder="Choose checks"
      />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaMultiselect label="Empty" options={options} placeholder="Choose checks" />
      <LunaMultiselect label="One selected" options={options} defaultValue={["moon-phase"]} />
      <LunaMultiselect
        label="Many selected"
        options={options}
        defaultValue={["moon-phase", "orbital-window", "launch-readiness"]}
      />
      <LunaMultiselect
        label="Disabled"
        options={options}
        defaultValue={["moon-phase", "orbital-window"]}
        disabled
      />
      <LunaMultiselect
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
      <LunaMultiselect
        label="Mission checks"
        options={options}
        placeholder="Choose checks"
        helpText="Select every review gate that applies."
      />
      <LunaMultiselect
        label="Mission checks"
        options={options}
        error="You need at least one selected check."
      />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaMultiselect label="Mission checks" options={options} placeholder="Choose checks" />
          <LunaMultiselect
            label="Disabled"
            options={options}
            defaultValue={["moon-phase", "orbital-window"]}
            disabled
          />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};

export const SizeParity: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRow gap="4">
        <LunaMultiselect label="Small" inputSize="sm" options={options} placeholder="Choose checks" />
        <LunaMultiselect
          label="Small disabled"
          inputSize="sm"
          options={options}
          defaultValue={["moon-phase", "orbital-window"]}
          disabled
        />
      </LunaRow>
      <LunaRow gap="4">
        <LunaMultiselect label="Medium" inputSize="md" options={options} placeholder="Choose checks" />
        <LunaMultiselect
          label="Medium disabled"
          inputSize="md"
          options={options}
          defaultValue={["moon-phase", "orbital-window"]}
          disabled
        />
      </LunaRow>
      <LunaRow gap="4">
        <LunaMultiselect label="Large" inputSize="lg" options={options} placeholder="Choose checks" />
        <LunaMultiselect
          label="Large disabled"
          inputSize="lg"
          options={options}
          defaultValue={["moon-phase", "orbital-window"]}
          disabled
        />
      </LunaRow>
    </LunaColumn>
  )
};
