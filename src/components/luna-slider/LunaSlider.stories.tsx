import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../theme";
import { LunaColumn } from "../luna-column";
import { LunaSlider } from "./LunaSlider";

const meta = {
  title: "Components/LunaSlider",
  component: LunaSlider,
  args: {
    label: "Telemetry strength",
    min: 0,
    max: 100,
    defaultValue: 42
  }
} satisfies Meta<typeof LunaSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const States: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaSlider label="Telemetry strength" defaultValue={42} description="Adjust mission signal tolerance." />
      <LunaSlider label="Telemetry strength" defaultValue={68} helpText="Use higher values for stronger correction." />
      <LunaSlider label="Telemetry strength" defaultValue={12} error="Signal strength is below the required range." />
      <LunaSlider label="Telemetry strength" defaultValue={42} disabled />
    </LunaColumn>
  )
};

export const WithoutValue: Story = {
  render: () => <LunaSlider label="Telemetry strength" defaultValue={42} showValue={false} />
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaColumn gap="4">
          <LunaSlider label="Telemetry strength" defaultValue={42} />
          <LunaSlider label="Telemetry strength" defaultValue={42} disabled />
        </LunaColumn>
      </div>
    </ThemeProvider>
  )
};
