import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
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
    dismissible: true,
    size: "md"
  }
} satisfies Meta<typeof LunaNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizeContract: Story = {
  render: () => (
    <LunaColumn gap="4" style={{ width: "min(100%, 42rem)" }}>
      <LunaNotification size="sm" title="Compact status" meta="Now" dismissible>
        Small notifications keep the body to one line.
      </LunaNotification>
      <LunaNotification size="md" title="Standard status" meta="Queue" dismissible>
        Medium notifications allow a second line before truncating the body content.
      </LunaNotification>
      <LunaNotification size="lg" title="Expanded status" meta="Pinned" dismissible>
        Large notifications allow a third line before truncating the body content for denser but
        still controlled previews.
      </LunaNotification>
    </LunaColumn>
  )
};

export const ToneAndEmphasisMatrix: Story = {
  render: () => (
    <LunaColumn gap="4" style={{ width: "min(100%, 40rem)" }}>
      {emphases.map((emphasis) => (
        <LunaColumn key={emphasis} gap="3">
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
        </LunaColumn>
      ))}
    </LunaColumn>
  )
};

export const WithActionAndMetadata: Story = {
  render: () => (
    <LunaColumn gap="4" style={{ maxWidth: "36rem" }}>
      <LunaNotification
        tone="info"
        title="Scheduled maintenance"
        meta="12 minutes ago"
        icon={<span>i</span>}
        action={
          <LunaRow gap="3" wrap>
            <LunaButton size="small">Review</LunaButton>
            <LunaButton size="small" flat>
              Later
            </LunaButton>
          </LunaRow>
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
    </LunaColumn>
  )
};

export const EdgeVarieties: Story = {
  render: () => (
    <LunaColumn gap="4" style={{ width: "min(100%, 38rem)" }}>
      <LunaNotification
        tone="info"
        title="Review requested"
        meta="Queue"
        icon={<span>i</span>}
      >
        Soft notifications keep the left edge subtle while still signaling the tone.
      </LunaNotification>
      <LunaNotification
        tone="success"
        emphasis="outline"
        title="Deployment completed"
        meta="2 minutes ago"
        icon={<span>*</span>}
      >
        Outline notifications let the accent edge do more of the visual work.
      </LunaNotification>
      <LunaNotification
        tone="danger"
        emphasis="solid"
        title="Pager escalation"
        meta="Action needed"
        icon={<span>!</span>}
        action={
          <LunaRow gap="3" wrap>
            <LunaButton size="small">Open incident</LunaButton>
            <LunaButton size="small" flat>
              Silence
            </LunaButton>
          </LunaRow>
        }
      >
        Solid notifications can still carry a readable edge treatment without losing density.
      </LunaNotification>
    </LunaColumn>
  )
};

export const ControlledVisibility: Story = {
  render: () => {
    function ControlledNotificationStory() {
      const [open, setOpen] = React.useState(true);

      return (
        <LunaColumn gap="4" style={{ maxWidth: "32rem" }}>
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
        </LunaColumn>
      );
    }

    return <ControlledNotificationStory />;
  }
};
