import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaPanel } from "../luna-panel";
import { LunaScatterChart } from "./LunaScatterChart";
import "./LunaScatterChart.stories.css";

const basicData = [
  { label: "North", x: 8, y: 22 },
  { label: "South", x: 14, y: 38 },
  { label: "East", x: 20, y: 35 },
  { label: "West", x: 28, y: 51 },
  { label: "Central", x: 34, y: 48 },
  { label: "Coastal", x: 41, y: 62 }
];

const clusteredData = [
  { label: "A1", x: 12, y: 44 },
  { label: "A2", x: 13, y: 47 },
  { label: "A3", x: 15, y: 45 },
  { label: "A4", x: 16, y: 49 },
  { label: "B1", x: 28, y: 24 },
  { label: "B2", x: 29, y: 27 },
  { label: "B3", x: 31, y: 25 },
  { label: "Outlier", x: 44, y: 72 }
];

const sparseData = [
  { label: "Low", x: 4, y: 12 },
  { label: "Mid", x: 22, y: 41 },
  { label: "High", x: 47, y: 18 }
];

const meta = {
  title: "Components/LunaScatterChart",
  component: LunaScatterChart,
  parameters: {
    layout: "centered"
  },
  args: {
    ariaLabel: "Relationship between response time and completion score",
    title: "Response relationship",
    description: "Single-series paired values for relationship and spread in dashboard surfaces.",
    data: basicData,
    showGrid: true
  }
} satisfies Meta<typeof LunaScatterChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    showLegend: true
  }
};

export const Clustered: Story = {
  args: {
    ariaLabel: "Clustered adoption observations",
    title: "Clustered observations",
    description: "Nearby points should stay readable without collapsing into a blur.",
    data: clusteredData,
    showLegend: true
  }
};

export const Sparse: Story = {
  args: {
    ariaLabel: "Sparse distribution observations",
    title: "Sparse distribution",
    description: "A sparse set should still feel intentional and balanced.",
    data: sparseData
  }
};

export const NarrowWidth: Story = {
  render: (args) => (
    <div className="luna-scatter-chart-story-narrow">
      <LunaScatterChart {...args} />
    </div>
  ),
  args: {
    ariaLabel: "Scatter chart in a narrow panel",
    title: "Narrow panel",
    description: "The axis chrome stays readable inside compact dashboard widths.",
    data: basicData
  }
};

export const Empty: Story = {
  args: {
    ariaLabel: "Empty scatter chart",
    title: "Response relationship",
    description: "The empty state keeps the same chart surface footprint.",
    data: []
  }
};

export const Loading: Story = {
  args: {
    ariaLabel: "Loading scatter chart",
    title: "Response relationship",
    description: "Loading preserves the chart frame while paired values resolve.",
    data: basicData,
    loading: true
  }
};

export const PanelEmbedding: Story = {
  render: (args) => (
    <div className="luna-scatter-chart-story-panel">
      <LunaPanel
        title="Program dashboard"
        description="Scatter chart surfaces should feel finished inside panel compositions."
      >
        <div className="luna-scatter-chart-story-dashboard">
          <LunaScatterChart {...args} />
        </div>
      </LunaPanel>
    </div>
  ),
  args: {
    ariaLabel: "Relationship between throughput and quality score",
    title: "Throughput versus quality",
    description: "Paired delivery metrics for the current planning window.",
    data: clusteredData,
    showLegend: true
  }
};

export const ErrorState: Story = {
  args: {
    ariaLabel: "Scatter chart unavailable",
    title: "Response relationship",
    description: "Error messaging uses the same framed chart shell.",
    data: basicData,
    error: "We could not load the paired relationship data for this chart."
  }
};
