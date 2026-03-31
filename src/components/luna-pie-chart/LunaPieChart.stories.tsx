import type { Meta, StoryObj } from "@storybook/react";
import { LunaPanel } from "../luna-panel";
import { LunaPieChart } from "./LunaPieChart";

const baseData = [
  { label: "Returning", value: 48 },
  { label: "New", value: 32 },
  { label: "Partner", value: 20 }
];

const meta = {
  title: "Components/LunaPieChart",
  component: LunaPieChart,
  args: {
    ariaLabel: "Session share by visitor type",
    title: "Session mix",
    description: "Visitor type contribution across the current reporting window.",
    data: baseData
  }
} satisfies Meta<typeof LunaPieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManyCategories: Story = {
  args: {
    ariaLabel: "Revenue share by plan",
    title: "Revenue share",
    description: "Eight plan groups ordered by contribution to current monthly revenue.",
    data: [
      { label: "Enterprise", value: 36 },
      { label: "Growth", value: 22 },
      { label: "Starter", value: 14 },
      { label: "Legacy", value: 9 },
      { label: "Education", value: 7 },
      { label: "Sandbox", value: 5 },
      { label: "Internal", value: 4 },
      { label: "Trial", value: 3 }
    ]
  }
};

export const LegendForward: Story = {
  args: {
    ariaLabel: "Ticket share by queue",
    title: "Support queue load",
    description: "The legend carries the readable breakdown while the chart stays clean at panel size.",
    data: [
      { label: "Billing", value: 51, color: "warning.500" },
      { label: "Operations", value: 27, color: "primary.500" },
      { label: "Product", value: 14, color: "accent.500" },
      { label: "Security", value: 8, color: "danger.500" }
    ]
  }
};

export const NarrowWidth: Story = {
  render: (args) => (
    <div style={{ width: "16rem" }}>
      <LunaPieChart {...args} />
    </div>
  )
};

export const EmptyState: Story = {
  args: {
    ariaLabel: "No channel share data",
    title: "Channel mix",
    description: "No tracked visits landed in this period.",
    data: [],
    empty: "Connect a source or widen the date range to populate the chart."
  }
};

export const LoadingState: Story = {
  args: {
    ariaLabel: "Loading pipeline stage share",
    title: "Pipeline stage mix",
    description: "Waiting for the latest stage totals to arrive.",
    data: baseData,
    loading: true
  }
};

export const DashboardPanel: Story = {
  render: (args) => (
    <LunaPanel
      description="A compact panel composition with the chart embedded inside surrounding chrome."
      title="Traffic overview"
      width="min(32rem, 100%)"
    >
      <LunaPieChart {...args} title={undefined} description={undefined} />
    </LunaPanel>
  )
};
