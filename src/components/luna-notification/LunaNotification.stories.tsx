import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaNotification } from "./LunaNotification";

const tones = ["neutral", "info", "success", "warning", "danger"] as const;
const emphases = ["soft", "solid", "outline"] as const;

const meta = {
  title: "Components/LunaNotification",
  component: LunaNotification,
  parameters: {
    layout: "padded"
  },
  args: {
    title: "Mission update",
    children: "The orbital sync finished successfully.",
    meta: "Now",
    dismissible: true
  }
} satisfies Meta<typeof LunaNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneAndEmphasisMatrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      {emphases.map((emphasis) => (
        <div
          key={emphasis}
          style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {tones.map((tone) => (
            <LunaNotification
              key={`${tone}-${emphasis}`}
              tone={tone}
              emphasis={emphasis}
              title={`${tone[0].toUpperCase()}${tone.slice(1)} notification`}
              meta="Queue"
            >
              Persistent application-level feedback for {tone} surfaces.
            </LunaNotification>
          ))}
        </div>
      ))}
    </div>
  )
};

export const WithActionAndMetadata: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "36rem" }}>
      <LunaNotification
        tone="info"
        title="Scheduled maintenance"
        meta="12 minutes ago"
        icon={<span>i</span>}
        action={
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <LunaButton size="small">Review</LunaButton>
            <LunaButton size="small" flat>
              Later
            </LunaButton>
          </div>
        }
      >
        The next relay upgrade is ready for review before it is promoted to the fleet.
      </LunaNotification>
      <LunaNotification
        tone="warning"
        emphasis="outline"
        title="Signal drift detected"
        meta="Needs review"
        icon={<span>!</span>}
        role="status"
        aria-live="polite"
      >
        This notification keeps its semantics opt-in so consumers can decide when an announcement is needed.
      </LunaNotification>
    </div>
  )
};

export const ControlledVisibility: Story = {
  render: () => {
    function ControlledNotificationStory() {
      const [open, setOpen] = React.useState(true);

      return (
        <div style={{ display: "grid", gap: "1rem", maxWidth: "32rem" }}>
          <LunaButton size="small" onClick={() => setOpen((value) => !value)}>
            {open ? "Hide notification" : "Show notification"}
          </LunaButton>
          <LunaNotification
            open={open}
            title="Persistent reminder"
            tone="success"
            meta="Pinned"
            dismissible
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
          >
            This story shows controlled visibility without introducing a notification group.
          </LunaNotification>
        </div>
      );
    }

    return <ControlledNotificationStory />;
  }
};
