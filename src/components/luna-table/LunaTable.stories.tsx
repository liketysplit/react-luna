import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaBadge } from "../luna-badge";
import { LunaButton } from "../luna-button";
import { LunaColumn } from "../luna-column";
import { LunaText } from "../luna-text";
import { LunaTable } from "./LunaTable";
import type { LunaTableColumn } from "./LunaTable.props";

type MissionRow = {
  id: string;
  pilot: string;
  status: "Ready" | "Holding" | "Delayed";
  window: string;
  cargo: string;
};

const rows: MissionRow[] = [
  {
    id: "mission-1",
    pilot: "Aria Sol",
    status: "Ready",
    window: "03:10 UTC",
    cargo: "Navigation relays"
  },
  {
    id: "mission-2",
    pilot: "Kellan Voss",
    status: "Holding",
    window: "05:40 UTC",
    cargo: "Thermal batteries"
  },
  {
    id: "mission-3",
    pilot: "Mira Quill",
    status: "Delayed",
    window: "08:15 UTC",
    cargo: "Orbital survey kits"
  }
];

const columns: Array<LunaTableColumn<MissionRow>> = [
  {
    accessorKey: "pilot",
    header: "Pilot",
    width: "22%"
  },
  {
    accessorKey: "status",
    header: "Status",
    renderCell: (row) => (
      <LunaBadge
        tone={
          row.status === "Ready"
            ? "success"
            : row.status === "Holding"
              ? "warning"
              : "danger"
        }
        variant="soft"
      >
        {row.status}
      </LunaBadge>
    )
  },
  {
    accessorKey: "window",
    header: "Launch window",
    align: "center"
  },
  {
    accessorKey: "cargo",
    header: "Cargo"
  },
  {
    id: "actions",
    header: "Actions",
    align: "right",
    renderCell: (row) => (
      <LunaButton flat size="small">
        View {row.id}
      </LunaButton>
    )
  }
];

const meta = {
  title: "Components/LunaTable",
  component: LunaTable,
  args: {
    caption: "Launch coordination roster for the next departure block.",
    columns,
    rows
  }
} satisfies Meta<typeof LunaTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <LunaTable {...args} getRowKey={(row) => row.id} hoverable striped />
};

export const Density: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaTable caption="Compact density" columns={columns} density="compact" rows={rows} />
      <LunaTable caption="Default density" columns={columns} density="default" rows={rows} />
      <LunaTable
        caption="Comfortable density"
        columns={columns}
        density="comfortable"
        rows={rows}
      />
    </LunaColumn>
  )
};

export const EmptyState: Story = {
  render: () => (
    <LunaTable
      caption="No missions are queued for this window."
      columns={columns}
      emptyState={
        <LunaText variant="body-small" muted>
          No departures are scheduled yet. Assign a pilot to begin the roster.
        </LunaText>
      }
      rows={[]}
    />
  )
};

export const StickyHeader: Story = {
  render: () => {
    const extendedRows = Array.from({ length: 10 }, (_, index) => ({
      ...rows[index % rows.length],
      id: `${rows[index % rows.length].id}-${index + 1}`
    }));

    return (
      <div style={{ maxHeight: "20rem", overflow: "auto" }}>
        <LunaTable
          caption="Sticky headers stay visible inside a bounded scroll region."
          columns={columns}
          getRowKey={(row) => row.id}
          rows={extendedRows}
          stickyHeader
        />
      </div>
    );
  }
};
