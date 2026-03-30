import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaColumn } from "../luna-column";
import { LunaNotificationGroup } from "./LunaNotificationGroup";

const meta = {
  title: "Components/LunaNotificationGroup",
  component: LunaNotificationGroup,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    framed: false,
    dismissible: true
  }
} satisfies Meta<typeof LunaNotificationGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CollapsedTopRow: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      defaultOpen={false}
      items={[
        {
          title: "Launch checklist updated",
          meta: "2m ago",
          tone: "info",
          body: "Crew readiness notes were updated after the final review pass."
        },
        {
          title: "Approval required",
          meta: "Queue",
          tone: "warning",
          emphasis: "outline",
          body: "A manual sign-off is still required before continuing the deployment lane."
        },
        {
          title: "Escalated signal",
          meta: "Urgent",
          tone: "danger",
          body: "One active incident has been promoted into the response workflow."
        }
      ]}
    />
  )
};

export const ExpandedTopRow: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      items={[
        {
          title: "Pinned reminder",
          meta: "Pinned",
          tone: "neutral",
          body: "Keep release notes aligned before publishing the next package."
        },
        {
          title: "Review requested",
          tone: "info",
          emphasis: "outline",
          body: "One new documentation change is ready for a visual pass."
        },
        {
          title: "Deployment complete",
          meta: "Now",
          tone: "success",
          body: "The latest service build is live across the fleet."
        }
      ]}
    />
  )
};

export const ExpandHidden: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      defaultOpen={false}
      showExpand={false}
      items={[
        {
          title: "Queued release note",
          meta: "Pinned",
          tone: "neutral",
          body: "Keep the feed visible without exposing an expand affordance."
        },
        {
          title: "Escalated signal",
          meta: "Urgent",
          tone: "danger",
          body: "One active incident has been promoted into the response workflow."
        }
      ]}
    />
  )
};

export const DismissHidden: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      showDismissAll={false}
      items={[
        {
          title: "Review requested",
          tone: "info",
          emphasis: "outline",
          body: "The group keeps its left toggle but does not show the dismiss-all affordance."
        },
        {
          title: "Deployment complete",
          meta: "Now",
          tone: "success",
          body: "The latest service build is live across the fleet."
        }
      ]}
    />
  )
};

export const ItemDismissContract: Story = {
  render: (args) => (
    <LunaNotificationGroup
      {...args}
      defaultOpen={false}
      items={[
        {
          title: "Escalated signal",
          meta: "Urgent",
          tone: "danger",
          body: "Dismiss single items from the group without collapsing the whole surface."
        },
        {
          title: "Queued follow-up",
          meta: "2m ago",
          tone: "info",
          body: "Each internal notification owns its own dismiss control on the far right."
        }
      ]}
    />
  )
};

export const SizeContract: Story = {
  render: (args) => (
    <LunaColumn gap="6" style={{ width: "100%" }}>
      <LunaNotificationGroup
        {...args}
        defaultOpen={false}
        size="sm"
        items={[
          {
            title: "Compact update",
            meta: "Now",
            tone: "info",
            body: "Small notifications keep the stack tight."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "Small notifications stay at a single-line body in the stack."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "The small stack stays dense but still dismissible item by item."
          }
        ]}
      />
      <LunaNotificationGroup
        {...args}
        defaultOpen={false}
        size="md"
        items={[
          {
            title: "Standard update",
            meta: "Now",
            tone: "info",
            body: "Medium notifications allow a second line before truncating body content in the group."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "The medium stack gives the body more room while keeping the same grouped behavior."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "This shows the default notification size contract when the group is collapsed."
          }
        ]}
      />
      <LunaNotificationGroup
        {...args}
        defaultOpen={false}
        size="lg"
        items={[
          {
            title: "Expanded update",
            meta: "Now",
            tone: "info",
            body: "Large notifications allow a third line before truncating body content so dense grouped surfaces can still preserve hierarchy."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "The large stack should read as the most spacious version of the same grouped-notification contract."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "Even at the largest size, each item should still dismiss cleanly inside the collapsed stack."
          }
        ]}
      />
    </LunaColumn>
  )
};

export const ExpandedSizeContract: Story = {
  render: (args) => (
    <LunaColumn gap="6" style={{ width: "100%" }}>
      <LunaNotificationGroup
        {...args}
        size="sm"
        items={[
          {
            title: "Compact update",
            meta: "Now",
            tone: "info",
            body: "Small notifications keep the stack tight."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "Small notifications stay at a single-line body in the stack."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "The small stack stays dense but still dismissible item by item."
          }
        ]}
      />
      <LunaNotificationGroup
        {...args}
        size="md"
        items={[
          {
            title: "Standard update",
            meta: "Now",
            tone: "info",
            body: "Medium notifications allow a second line before truncating body content in the group."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "The medium stack gives the body more room while keeping the same grouped behavior."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "This shows the default notification size contract when the group is expanded."
          }
        ]}
      />
      <LunaNotificationGroup
        {...args}
        size="lg"
        items={[
          {
            title: "Expanded update",
            meta: "Now",
            tone: "info",
            body: "Large notifications allow a third line before truncating body content so dense grouped surfaces can still preserve hierarchy."
          },
          {
            title: "Queued review",
            meta: "Queue",
            tone: "warning",
            body: "The large stack should read as the most spacious version of the same grouped-notification contract."
          },
          {
            title: "Pinned alert",
            meta: "Pinned",
            tone: "danger",
            body: "Even at the largest size, each item should still dismiss cleanly inside the expanded group."
          }
        ]}
      />
    </LunaColumn>
  )
};
