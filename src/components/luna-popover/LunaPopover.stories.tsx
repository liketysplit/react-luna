import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaPopover } from "./LunaPopover";

const meta = {
  title: "Components/LunaPopover",
  component: LunaPopover,
  parameters: {
    layout: "centered"
  },
  args: {
    surfaceLabel: "Quick actions",
    content: (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <strong style={{ fontSize: "0.95rem" }}>Mission controls</strong>
        <p style={{ margin: 0 }}>
          Anchored floating content can hold richer guidance, quick actions, or small forms without
          turning into full-screen overlays.
        </p>
      </div>
    ),
    children: <LunaButton>Open popover</LunaButton>
  }
} satisfies Meta<typeof LunaPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const PlacementMatrix: Story = {
  render: () => {
    const placements = ["top-start", "top-end", "bottom-start", "bottom-end"] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, auto))",
          gap: "5rem",
          placeItems: "center"
        }}
      >
        {placements.map((placement) => (
          <LunaPopover
            key={placement}
            placement={placement}
            surfaceLabel={`${placement} example`}
            content={
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <strong>{placement}</strong>
                <span>Use start and end placements to keep the anchor relationship predictable.</span>
              </div>
            }
          >
            <LunaButton outline>
              {placement[0].toUpperCase()}
              {placement.slice(1)}
            </LunaButton>
          </LunaPopover>
        ))}
      </div>
    );
  }
};

export const InteractiveContent: Story = {
  render: () => {
    function Example() {
      const [status, setStatus] = React.useState("Draft");

      return (
        <div style={{ display: "grid", gap: "1rem", placeItems: "start" }}>
          <LunaPopover
            surfaceLabel="Quick editor"
            minWidth="18rem"
            content={
              <form style={{ display: "grid", gap: "0.75rem" }}>
                <label style={{ display: "grid", gap: "0.35rem" }}>
                  Status
                  <input
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    style={{
                      padding: "0.625rem 0.75rem",
                      border: "1px solid var(--luna-border)",
                      borderRadius: "var(--luna-radius-md)",
                      background: "var(--luna-background)",
                      color: "var(--luna-foreground)",
                      font: "inherit"
                    }}
                  />
                </label>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
                  <span style={{ color: "var(--luna-muted)", fontSize: "0.8rem" }}>
                    Quick inline edit
                  </span>
                  <LunaButton flat type="button">
                    Save
                  </LunaButton>
                </div>
              </form>
            }
          >
            <LunaButton>Quick edit</LunaButton>
          </LunaPopover>
          <span style={{ color: "var(--luna-muted)" }}>Current status: {status}</span>
        </div>
      );
    }

    return <Example />;
  }
};

export const Controlled: Story = {
  render: () => {
    function Example() {
      const [open, setOpen] = React.useState(true);

      return (
        <div style={{ display: "grid", gap: "1rem", placeItems: "start" }}>
          <LunaPopover
            open={open}
            onOpenChange={setOpen}
            surfaceLabel="Controlled popover"
            content={
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <span>The parent decides whether the anchored surface stays open.</span>
                <LunaButton flat type="button" onClick={() => setOpen(false)}>
                  Close from parent state
                </LunaButton>
              </div>
            }
          >
            <LunaButton>Toggle controlled popover</LunaButton>
          </LunaPopover>
          <span style={{ color: "var(--luna-muted)" }}>Open: {open ? "true" : "false"}</span>
        </div>
      );
    }

    return <Example />;
  }
};
