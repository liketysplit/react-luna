import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaSwitch } from "./LunaSwitch";

const meta = {
  title: "Components/LunaSwitch",
  component: LunaSwitch,
  args: {
    label: "Enable lunar telemetry"
  }
} satisfies Meta<typeof LunaSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSwitch label="Off" />
      <LunaSwitch label="On" defaultChecked />
      <LunaSwitch label="Disabled off" disabled />
      <LunaSwitch label="Disabled on" defaultChecked disabled />
    </LunaColumn>
  )
};

export const SupportText: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSwitch
        label="Enable lunar telemetry"
        description="Telemetry stays active while mission controls are in standby."
        helpText="Recommended for review environments."
      />
      <LunaSwitch
        label="Enable lunar telemetry"
        description="Telemetry stays active while mission controls are in standby."
        error="Telemetry must remain enabled for this mission."
      />
    </LunaColumn>
  )
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaSwitch label="Off" />
          <LunaSwitch label="On" defaultChecked />
          <LunaSwitch label="Disabled on" defaultChecked disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
