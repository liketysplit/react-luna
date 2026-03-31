import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaPanel } from "../luna-panel";
import { LunaBarChart } from "./LunaBarChart";
import "./LunaBarChart.stories.css";

const quarterlyRevenue = [
  { label: "North", value: 42 },
  { label: "South", value: 31 },
  { label: "East", value: 54 },
  { label: "West", value: 26 },
  { label: "Central", value: 38 }
];

const meta = {
  title: "Components/LunaBarChart",
  component: LunaBarChart,
  parameters: {
    layout: "centered"
  },
  args: {
    ariaLabel: "Quarterly performance by region",
    title: "Quarterly performance",
    description: "Single-series comparison for dashboard panels and summary surfaces.",
    data: quarterlyRevenue
  }
} satisfies Meta<typeof LunaBarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    showLegend: true
  }
};

export const SmallDataset: Story = {
  args: {
    ariaLabel: "Issue status counts",
    title: "Issue status",
    description: "Compact category counts for a short status summary.",
    data: [
      { label: "Open", value: 8 },
      { label: "Resolved", value: 21 },
      { label: "Deferred", value: 5 }
    ]
  }
};

export const LongerLabels: Story = {
  args: {
    ariaLabel: "Operational work categories",
    title: "Operational categories",
    description: "Moderately long labels should remain readable without collapsing the chart.",
    data: [
      { label: "Release planning and handoff", value: 17 },
      { label: "Customer account migration", value: 24 },
      { label: "Quarterly instrumentation refresh", value: 13 },
      { label: "Support backlog refinement", value: 19 }
    ]
  }
};

export const NarrowWidth: Story = {
  render: (args) => (
    <div className="luna-bar-chart-story-narrow">
      <LunaBarChart {...args} />
    </div>
  ),
  args: {
    ariaLabel: "Quarterly performance by region in a narrow panel",
    title: "Narrow panel",
    description: "The plot scrolls horizontally before labels become unreadable.",
    data: quarterlyRevenue
  }
};

export const Empty: Story = {
  args: {
    ariaLabel: "Empty bar chart",
    title: "Quarterly performance",
    description: "The empty surface keeps the container stable and explanatory.",
    data: []
  }
};

export const Loading: Story = {
  args: {
    ariaLabel: "Loading quarterly performance chart",
    title: "Quarterly performance",
    description: "Loading keeps the chart footprint intact while data resolves.",
    data: quarterlyRevenue,
    loading: true
  }
};

export const ErrorState: Story = {
  args: {
    ariaLabel: "Chart unavailable",
    title: "Quarterly performance",
    description: "Error state uses the same framed surface and leaves room for recovery messaging.",
    data: quarterlyRevenue,
    error: "We could not load the comparison data for this chart."
  }
};

export const PanelEmbedding: Story = {
  render: (args) => (
    <div className="luna-bar-chart-story-panel">
      <LunaPanel
        title="Program dashboard"
        description="Chart content should feel finished inside a composed panel surface."
      >
        <div className="luna-bar-chart-story-dashboard">
          <LunaBarChart {...args} />
        </div>
      </LunaPanel>
    </div>
  ),
  args: {
    ariaLabel: "Delivery throughput by stream",
    title: "Delivery throughput",
    description: "Issue throughput for the current delivery streams.",
    data: [
      { label: "Foundation", value: 12 },
      { label: "Primitives", value: 28 },
      { label: "Composites", value: 16 },
      { label: "Docs", value: 9 }
    ],
    showLegend: true
  }
};
