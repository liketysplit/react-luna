import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaDateInput } from "./LunaDateInput";

const meta = {
  title: "Internal/LunaDateInput",
  component: LunaDateInput,
  args: {
    label: "Launch date"
  }
} satisfies Meta<typeof LunaDateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelModes: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDateInput label="Launch date" />
      <LunaDateInput label="Launch date" value="2026-03-22" readOnly />
      <LunaDateInput label="Launch date" value="2026-03-22" readOnly externalLabel />
    </LunaColumn>
  )
};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaDateInput label="Launch date" helpText="Use the mission review date." />
      <LunaDateInput label="Launch date" error="A launch date is required." />
      <LunaDateInput label="Launch date" value="2026-03-22" readOnly disabled />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaDateInput label="Launch date" value="2026-03-22" readOnly />
          <LunaDateInput label="Launch date" value="2026-03-22" readOnly disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
