import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaPanel } from "../luna-panel";
import { LunaText } from "../luna-text";
import { LunaSparkline } from "./LunaSparkline";

const meta = {
  title: "Components/LunaSparkline",
  component: LunaSparkline,
  parameters: {
    layout: "centered"
  },
  args: {
    ariaLabel: "Thirty day active user trend",
    data: [14, 18, 16, 24, 28, 26, 34, 38],
    width: "10rem",
    height: "3rem"
  }
} satisfies Meta<typeof LunaSparkline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const UpwardTrend: Story = {
  args: {
    ariaLabel: "Weekly signups trending upward",
    data: [6, 8, 11, 15, 18, 22, 27],
    tone: "positive"
  }
};

export const DownwardTrend: Story = {
  args: {
    ariaLabel: "Weekly incident count trending downward",
    data: [31, 28, 24, 20, 18, 14, 10],
    tone: "negative"
  }
};

export const FlatLowVarianceTrend: Story = {
  args: {
    ariaLabel: "Latency trend holding steady",
    data: [42, 43, 42, 43, 42, 42, 43]
  }
};

export const VeryShortSeries: Story = {
  args: {
    ariaLabel: "Fresh trend with one recorded point",
    data: [18],
    width: "7rem",
    height: "2.5rem"
  }
};

export const EmptyState: Story = {
  args: {
    ariaLabel: "No trend data is available yet",
    data: [],
    width: "7rem",
    height: "2.5rem"
  }
};

export const EmbeddedMetricCard: Story = {
  render: () => (
    <LunaPanel
      title="Active users"
      description="Compact trend treatment inside a metric card style surface."
      width="18rem"
    >
      <div
        style={{
          display: "grid",
          gap: "0.75rem"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: "1rem"
          }}
        >
          <div style={{ display: "grid", gap: "0.125rem" }}>
            <LunaText as="span" variant="caption">
              Current value
            </LunaText>
            <LunaText as="span" variant="display">
              18,240
            </LunaText>
          </div>
          <LunaText as="span" variant="label" style={{ color: "var(--luna-success-500)" }}>
            +12.4%
          </LunaText>
        </div>
        <LunaSparkline
          ariaLabel="Active users increased over the last seven days"
          data={[12, 14, 13, 16, 17, 18, 21]}
          tone="positive"
          width="100%"
          height="3rem"
        />
      </div>
    </LunaPanel>
  )
};
