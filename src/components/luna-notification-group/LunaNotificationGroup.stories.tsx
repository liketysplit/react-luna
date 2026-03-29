import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaNotification } from "../luna-notification";
import { LunaNotificationGroup } from "./LunaNotificationGroup";

const meta = {
  title: "Components/LunaNotificationGroup",
  component: LunaNotificationGroup,
  parameters: {
    layout: "padded"
  },
  args: {
    title: "Operations feed",
    description: "A grouped presentation for durable application notifications."
  }
} satisfies Meta<typeof LunaNotificationGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      actions={<LunaButton size="small">Review all</LunaButton>}
    >
      <LunaNotification title="Mission sync" meta="Now" tone="success">
        Orbital alignment completed without intervention.
      </LunaNotification>
      <LunaNotification title="Pending approval" meta="Queue" tone="warning" emphasis="outline">
        The next relay update still needs a manual review.
      </LunaNotification>
    </LunaNotificationGroup>
  )
};

export const FramedFeed: Story = {
  render: () => (
    <LunaNotificationGroup
      title="Team notifications"
      description="Use a framed group when the notifications need one shared surface."
      actions={<LunaButton size="small">Open inbox</LunaButton>}
      maxWidth="42rem"
    >
      <LunaNotification title="Deploy completed" meta="2 minutes ago" tone="success">
        The latest service build is live across the fleet.
      </LunaNotification>
      <LunaNotification title="Usage threshold reached" meta="Needs review" tone="info">
        Storage consumption has crossed the team review threshold.
      </LunaNotification>
      <LunaNotification title="Escalation requested" meta="Action needed" tone="danger">
        One unresolved alert now requires the incident workflow.
      </LunaNotification>
    </LunaNotificationGroup>
  )
};

export const UnframedRail: Story = {
  render: () => (
    <LunaNotificationGroup
      title="Sidebar feed"
      description="Unframed groups fit existing layouts that already provide their own chrome."
      framed={false}
      gap="3"
      maxWidth="24rem"
    >
      <LunaNotification title="Pinned reminder" meta="Pinned">
        Keep release notes aligned before publishing the next package.
      </LunaNotification>
      <LunaNotification title="Review requested" tone="info" emphasis="outline">
        One new documentation change is ready for a visual pass.
      </LunaNotification>
    </LunaNotificationGroup>
  )
};

export const CustomHeaderContent: Story = {
  render: () => (
    <LunaNotificationGroup
      title={
        <div>
          <strong>Release feed</strong>
        </div>
      }
      description={
        <div>
          Mixed header content stays slot-based so consumers can choose their own markup.
        </div>
      }
      actions={
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <LunaButton size="small">Review</LunaButton>
          <LunaButton size="small" flat>
            Later
          </LunaButton>
        </div>
      }
      rounded
      maxWidth="42rem"
    >
      <LunaNotification title="Visual checks ready" tone="info">
        Storybook screenshots are ready for the current component branch.
      </LunaNotification>
      <LunaNotification title="Two open follow-ups" tone="warning" emphasis="outline">
        Keep the group focused on presentation instead of history management.
      </LunaNotification>
    </LunaNotificationGroup>
  )
};
