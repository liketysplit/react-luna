import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaDrawer } from "./LunaDrawer";

const placements = ["left", "right", "top", "bottom"] as const;

const meta = {
  title: "Components/LunaDrawer",
  component: LunaDrawer,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    open: true,
    title: "Mission drawer",
    description:
      "Secondary content can move out of the page flow without leaving the current context.",
    children: (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <p>Use the drawer for contextual workflows, inspect panels, and compact settings.</p>
        <p>
          Keep the contract narrow and let applications decide focus management or routing above
          it.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", width: "100%" }}>
        <LunaButton flat>Cancel</LunaButton>
        <LunaButton>Apply changes</LunaButton>
      </div>
    )
  }
} satisfies Meta<typeof LunaDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const PlacementMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "1.5rem",
        padding: "2rem"
      }}
    >
      {placements.map((placement) => (
        <div
          key={placement}
          style={{
            position: "relative",
            minHeight: "18rem",
            border: "1px dashed var(--luna-border)",
            borderRadius: "1rem",
            overflow: "hidden",
            background: "color-mix(in srgb, var(--luna-surface) 92%, transparent)"
          }}
        >
          <LunaDrawer
            open
            showOverlay={false}
            placement={placement}
            title={`${placement[0].toUpperCase()}${placement.slice(1)} drawer`}
            description="Inline story preview without the viewport backdrop."
            size={placement === "left" || placement === "right" ? "18rem" : "12rem"}
          >
            Drawer content stays aligned to the chosen edge.
          </LunaDrawer>
        </div>
      ))}
    </div>
  )
};

export const ControlledVisibility: Story = {
  render: () => {
    function ControlledDrawerStory() {
      const [open, setOpen] = React.useState(false);

      return (
        <div style={{ minHeight: "24rem", padding: "2rem" }}>
          <LunaButton onClick={() => setOpen(true)}>Open drawer</LunaButton>
          <LunaDrawer
            open={open}
            title="Controlled visibility"
            description="This story keeps the open state in the story itself."
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <LunaButton onClick={() => setOpen(false)}>Done</LunaButton>
              </div>
            }
          >
            Application code can coordinate the drawer with local page state.
          </LunaDrawer>
        </div>
      );
    }

    return <ControlledDrawerStory />;
  }
};
