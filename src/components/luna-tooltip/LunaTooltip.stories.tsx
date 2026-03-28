import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaTooltip } from "./LunaTooltip";

const placements = ["top", "right", "bottom", "left"] as const;

const meta = {
  title: "Components/LunaTooltip",
  component: LunaTooltip,
  parameters: {
    layout: "centered"
  },
  args: {
    content: "Low-light calibration is active.",
    children: <LunaButton>Telemetry</LunaButton>
  }
} satisfies Meta<typeof LunaTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const PlacementMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, auto))",
        gap: "4rem",
        placeItems: "center"
      }}
    >
      {placements.map((placement) => (
        <LunaTooltip
          key={placement}
          placement={placement}
          content={`Tooltip on the ${placement} side.`}
        >
          <LunaButton>
            {placement[0].toUpperCase()}
            {placement.slice(1)}
          </LunaButton>
        </LunaTooltip>
      ))}
    </div>
  )
};

export const RichContentAndSizing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem", placeItems: "center" }}>
      <LunaTooltip
        content={
          <span>
            Lunar drift is within tolerance.
            <br />
            Final sync completes in twelve seconds.
          </span>
        }
        maxWidth="24"
      >
        <LunaButton outline>Mission status</LunaButton>
      </LunaTooltip>
      <LunaTooltip content="Tighter offsets can keep the bubble closer to dense controls." offset="1">
        <LunaButton flat>Compact spacing</LunaButton>
      </LunaTooltip>
    </div>
  )
};

export const DisabledTooltip: Story = {
  render: () => (
    <LunaTooltip content="This tooltip is intentionally disabled." disabled>
      <LunaButton>Tooltip disabled</LunaButton>
    </LunaTooltip>
  )
};
