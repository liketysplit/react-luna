import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaPanel } from "../luna-panel";
import { LunaLineChart } from "./LunaLineChart";

const basicSeries = [
  { x: "Mon", y: 14 },
  { x: "Tue", y: 18 },
  { x: "Wed", y: 16 },
  { x: "Thu", y: 22 },
  { x: "Fri", y: 25 },
  { x: "Sat", y: 21 },
  { x: "Sun", y: 29 }
];

const sparseSeries = [
  { x: "Jan", y: 1200 },
  { x: "Mar", y: 1800 },
  { x: "Jun", y: 1500 },
  { x: "Sep", y: 2400 }
];

const denseSeries = Array.from({ length: 36 }, (_, index) => ({
  x: `Day ${index + 1}`,
  y: 48 + Math.round(Math.sin(index / 4) * 18 + Math.cos(index / 7) * 9 + index * 0.8)
}));

const meta = {
  title: "Components/LunaLineChart",
  component: LunaLineChart,
  parameters: {
    layout: "centered"
  },
  args: {
    ariaLabel: "Weekly trend",
    ariaDescription: "Trend line showing the week climbing toward the weekend.",
    data: basicSeries,
    showGridLines: true,
    showMarkers: true
  }
} satisfies Meta<typeof LunaLineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const SparseData: Story = {
  args: {
    ariaLabel: "Sparse quarterly signals",
    ariaDescription: "Four reported values distributed across the year.",
    data: sparseSeries,
    formatYAxisLabel: (value) =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1
      }).format(value)
  }
};

export const DenseData: Story = {
  args: {
    ariaLabel: "Dense thirty-six day trend",
    ariaDescription: "A dense rolling signal with labels sampled for readability.",
    data: denseSeries,
    showMarkers: false
  }
};

export const EmptyState: Story = {
  args: {
    ariaLabel: "Empty usage trend",
    ariaDescription: "No datapoints are available for the current filter.",
    data: [],
    emptyTitle: "No reporting trend yet",
    emptyDescription: "This view will chart activity as soon as the source stream starts sending values."
  }
};

export const LoadingState: Story = {
  args: {
    ariaLabel: "Loading usage trend",
    ariaDescription: "The chart is preparing the current reporting range.",
    data: [],
    loading: true
  }
};

export const DashboardEmbed: Story = {
  render: () => (
    <div style={{ width: "min(100%, 54rem)" }}>
      <LunaPanel
        title="Mission throughput"
        description="Thirty day output trend inside a reporting panel."
        tone="chrome"
      >
        <LunaLineChart
          ariaLabel="Mission throughput for the last thirty days"
          ariaDescription="Output climbs through the second half of the month and settles into a higher range."
          data={denseSeries}
          showMarkers={false}
          formatXAxisLabel={(value, context) =>
            context.index === 0 || context.index === denseSeries.length - 1
              ? String(value)
              : String(value).replace("Day ", "")
          }
        />
      </LunaPanel>
    </div>
  )
};

export const ThemeOverride: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        components: {
          lineChart: {
            modes: {
              light: {
                line: "#14b8a6",
                grid: "rgba(20, 184, 166, 0.18)",
                axisText: "#0f766e",
                bg: "linear-gradient(180deg, rgba(240, 253, 250, 0.94), rgba(236, 253, 245, 0.9))"
              }
            }
          }
        }
      }}
    >
      <LunaLineChart
        ariaLabel="Theme override trend"
        ariaDescription="A theme override story proving the chart surface can be recolored through the theme."
        data={basicSeries}
        showMarkers
      />
    </ThemeProvider>
  )
};
