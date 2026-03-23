import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "../luna-column";
import { ThemeProvider } from "../../theme";
import { LunaRow } from "../luna-row";
import { LunaSelect } from "./LunaSelect";

const options = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma", disabled: true }
];

const meta = {
  title: "Components/LunaSelect",
  component: LunaSelect,
  args: {
    label: "Mission phase",
    options
  }
} satisfies Meta<typeof LunaSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSelect label="Inset label" options={options} placeholder="Choose a phase" />
      <LunaSelect label="Floating label" options={options} />
      <LunaSelect label="External label" externalLabel options={options} placeholder="Choose a phase" />
    </LunaColumn>
  )
};

export const Sizes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSelect label="Small select" inputSize="sm" options={options} placeholder="Choose" />
      <LunaSelect label="Medium select" inputSize="md" options={options} placeholder="Choose" />
      <LunaSelect label="Large select" inputSize="lg" options={options} placeholder="Choose" />
    </LunaColumn>
  )
};

export const SizeParity: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaRow gap="4">
        <LunaSelect label="Small select" inputSize="sm" options={options} placeholder="Choose" />
        <LunaSelect label="Small disabled" inputSize="sm" options={options} defaultValue="alpha" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaSelect label="Medium select" inputSize="md" options={options} placeholder="Choose" />
        <LunaSelect label="Medium disabled" inputSize="md" options={options} defaultValue="alpha" disabled />
      </LunaRow>
      <LunaRow gap="4">
        <LunaSelect label="Large select" inputSize="lg" options={options} placeholder="Choose" />
        <LunaSelect label="Large disabled" inputSize="lg" options={options} defaultValue="alpha" disabled />
      </LunaRow>
    </LunaColumn>
  )
};

export const SupportingText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSelect
        label="Mission phase"
        options={options}
        placeholder="Choose a phase"
        helpText="Pick the active review phase."
      />
      <LunaSelect
        label="Mission phase"
        options={options}
        error="You need to choose a valid phase."
      />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSelect label="Empty" options={options} />
      <LunaSelect label="Prefilled" options={options} defaultValue="beta" />
      <LunaSelect label="Clearable" options={options} defaultValue="alpha" />
      <LunaSelect label="Disabled" options={options} defaultValue="alpha" disabled />
      <LunaSelect label="Full width" options={options} fullWidth placeholder="This field stretches with its container" />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaSelect label="Mission phase" options={options} placeholder="Choose a phase" />
          <LunaSelect label="Disabled" options={options} defaultValue="alpha" disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
