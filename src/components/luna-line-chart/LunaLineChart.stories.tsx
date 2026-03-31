import type { Meta, StoryObj } from "@storybook/react";
import { LunaPanel } from "../luna-panel";
import { LunaLineChart } from "./LunaLineChart";

const basicData = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 46 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 49 },
  { label: "Fri", value: 58 },
  { label: "Sat", value: 63 },
  { label: "Sun", value: 61 }
];

const sparseData = [
  { label: "Week 1", value: 18 },
  { label: "Week 2", value: 27 },
  { label: "Week 3", value: 25 },
  { label: "Week 4", value: 36 }
];

const denseData = [
  { label: "01", value: 14 },
  { label: "02", value: 17 },
  { label: "03", value: 16 },
  { label: "04", value: 20 },
  { label: "05", value: 23 },
  { label: "06", value: 25 },
  { label: "07", value: 24 },
  { label: "08", value: 29 },
  { label: "09", value: 33 },
  { label: "10", value: 31 },
  { label: "11", value: 36 },
  { label: "12", value: 38 },
  { label: "13", value: 42 },
  { label: "14", value: 39 }
];

const meta = {
  title: "Components/LunaLineChart",
  component: LunaLineChart,
  args: {
    data: basicData,
    title: "Weekly active listeners",
    description: "Seven-day trend across the current dashboard view.",
    ariaLabel: "Weekly active listeners line chart"
  }
} satisfies Meta<typeof LunaLineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    showGrid: true,
    showLegend: true,
    legendLabel: "Active listeners"
  }
};

export const SparseData: Story = {
  args: {
    data: sparseData,
    title: "Monthly check-ins",
    description: "A short sequence should keep labels and markers fully visible.",
    ariaLabel: "Monthly check-ins line chart",
    showLegend: true,
    legendLabel: "Check-ins"
  }
};

export const DenseData: Story = {
  args: {
    data: denseData,
    title: "Intraday request volume",
    description: "Denser data suppresses point markers to keep the line readable.",
    ariaLabel: "Intraday request volume line chart",
    showGrid: true
  }
};

export const NarrowWidth: Story = {
  render: (args) => (
    <div style={{ width: "18rem" }}>
      <LunaLineChart {...args} />
    </div>
  ),
  args: {
    data: basicData,
    title: "Compact panel trend",
    description: "The chart should remain readable in a constrained panel width.",
    ariaLabel: "Compact panel trend line chart",
    showLegend: true,
    legendLabel: "Active listeners"
  }
};

export const EmptyState: Story = {
  args: {
    data: [],
    title: "No usage yet",
    description: "The empty state uses the same chart shell and header treatment.",
    ariaLabel: "Empty usage line chart"
  }
};

export const LoadingState: Story = {
  args: {
    data: basicData,
    title: "Syncing trend",
    description: "Loading keeps the chart footprint stable while data refreshes.",
    ariaLabel: "Loading trend line chart",
    loading: true
  }
};

export const DashboardPanel: Story = {
  render: (args) => (
    <div style={{ width: "min(36rem, 100%)" }}>
      <LunaPanel
        title="Operations overview"
        description="A simple panel embedding for dashboard composition."
      >
        <LunaLineChart {...args} />
      </LunaPanel>
    </div>
  ),
  args: {
    data: basicData,
    title: "Queue latency",
    description: "Smoothed hourly trend for the current deployment window.",
    ariaLabel: "Queue latency line chart",
    showLegend: true,
    legendLabel: "Latency"
  }
};
