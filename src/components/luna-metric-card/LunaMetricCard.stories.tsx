import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaMetricCard } from "./LunaMetricCard";

function TrendBars() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        alignItems: "end",
        gap: "0.3rem",
        width: "100%",
        minHeight: "4.75rem"
      }}
    >
      {[28, 34, 30, 42, 48, 56].map((height, index) => (
        <span
          key={index}
          style={{
            display: "block",
            width: "100%",
            height: `${height}px`,
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(79, 70, 229, 0.94), rgba(56, 189, 248, 0.88))"
          }}
        />
      ))}
    </div>
  );
}

const meta = {
  title: "Components/LunaMetricCard",
  component: LunaMetricCard,
  parameters: {
    layout: "centered"
  },
  args: {
    label: "Monthly recurring revenue",
    value: "$128,400",
    meta: "Compared with the previous 30 days"
  }
} satisfies Meta<typeof LunaMetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicKpiCard: Story = {};

export const PositiveDelta: Story = {
  args: {
    label: "Qualified pipeline",
    value: "$2.4M",
    delta: "12.4%",
    trend: "up",
    meta: "Compared with last month"
  }
};

export const NegativeDelta: Story = {
  args: {
    label: "Net retention",
    value: "92.1%",
    delta: "3.7%",
    trend: "down",
    meta: "Compared with last quarter"
  }
};

export const NeutralNoDelta: Story = {
  args: {
    label: "Activation rate",
    value: "64%",
    meta: "No material movement this week"
  }
};

export const WithCompactTrendContent: Story = {
  args: {
    label: "Daily active users",
    value: "18,240",
    delta: "6.2%",
    trend: "up",
    meta: "Seven day rolling average",
    visual: <TrendBars />
  }
};

export const NarrowWidthDenseLayout: Story = {
  render: () => (
    <div style={{ width: "16.5rem" }}>
      <LunaMetricCard
        label="Conversion"
        value="7.4%"
        delta="0.3%"
        trend="neutral"
        meta="Week over week"
        visual={<TrendBars />}
      />
    </div>
  )
};
