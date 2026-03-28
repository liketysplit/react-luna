import type { Meta, StoryObj } from "@storybook/react";
import { LunaHoverText } from "./LunaHoverText";

const meta = {
  title: "Components/LunaHoverText",
  component: LunaHoverText,
  parameters: {
    layout: "centered"
  },
  args: {
    children: "Signal stable",
    hoverContent: "Signal wavering"
  }
} satisfies Meta<typeof LunaHoverText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FocusableInlineCopy: Story = {
  args: {
    focusable: true,
    children: "Hover or tab to inspect",
    hoverContent: "Keyboard focus uses the same inline swap"
  }
};

export const ThemedColorShift: Story = {
  args: {
    focusable: true,
    color: "neutral.500",
    hoverColor: "primary.500",
    children: "Orbit alignment nominal",
    hoverContent: "Orbit alignment drifting"
  }
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    children: "Static readout",
    hoverContent: "This copy stays hidden while disabled"
  }
};
