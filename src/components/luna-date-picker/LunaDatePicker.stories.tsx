import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaDatePicker } from "./LunaDatePicker";

const meta = {
  title: "Components/LunaDatePicker",
  component: LunaDatePicker,
  args: {
    label: "Date"
  }
} satisfies Meta<typeof LunaDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    mode: "simple"
  }
};

export const Picker: Story = {
  args: {
    mode: "picker",
    buttonPosition: "post"
  }
};

export const Range: Story = {
  args: {
    mode: "range",
    label: "Date range"
  }
};

export const ActionRegions: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDatePicker
        mode="picker"
        label="Date"
        buttonPosition="pre"
      />
      <LunaDatePicker
        mode="range"
        label="Date range"
        buttonPosition="post"
      />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDatePicker mode="picker" label="Date" helpText="Choose the mission review date." />
      <LunaDatePicker mode="picker" label="Date" error="A date is required." />
      <LunaDatePicker mode="range" label="Date range" />
      <LunaDatePicker mode="picker" label="Date" value="2026-03-23" disabled />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaDatePicker
            mode="picker"
            label="Date"
            buttonPosition="post"
          />
          <LunaDatePicker mode="range" label="Date range" />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
