import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaButton } from "../luna-button";
import { LunaColumn } from "../luna-column";
import { LunaMenu } from "./LunaMenu";

const items = [
  {
    value: "rename",
    label: "Rename mission",
    description: "Update the shared mission title for the whole crew.",
    shortcut: "Shift+R"
  },
  {
    value: "duplicate",
    label: "Duplicate briefing",
    description: "Create a fresh copy with all current details."
  },
  {
    value: "share",
    label: "Share logbook",
    description: "Invite another reviewer to the current workspace.",
    disabled: true,
    shortcut: "Cmd+S"
  },
  {
    value: "archive",
    label: "Archive mission",
    description: "Move this mission into long-term storage.",
    destructive: true
  }
];

const meta = {
  title: "Components/LunaMenu",
  component: LunaMenu,
  args: {
    items,
    children: <LunaButton>Open menu</LunaButton>
  }
} satisfies Meta<typeof LunaMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        width: "100%",
        maxWidth: "40rem"
      }}
    >
      <LunaMenu items={items} placement="bottom-start">
        <LunaButton>Start aligned</LunaButton>
      </LunaMenu>
      <LunaMenu items={items} placement="bottom-end">
        <LunaButton>End aligned</LunaButton>
      </LunaMenu>
    </div>
  )
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [lastAction, setLastAction] = React.useState("No action selected yet.");

    return (
      <LunaColumn gap="4">
        <LunaMenu
          items={items}
          open={open}
          onOpenChange={setOpen}
          onSelect={(value) => {
            setLastAction(`Selected action: ${value}`);
          }}
        >
          <LunaButton>{open ? "Close menu" : "Open menu"}</LunaButton>
        </LunaMenu>
        <div style={{ color: "var(--luna-muted)" }}>{lastAction}</div>
      </LunaColumn>
    );
  }
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaMenu items={items}>
          <LunaButton>Dark surface</LunaButton>
        </LunaMenu>
      </div>
    </ThemeProvider>
  )
};
