import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaButton } from "../luna-button";
import { LunaColumn } from "../luna-column";
import { LunaRow } from "../luna-row";
import { LunaText } from "../luna-text";
import { LunaEmptyState } from "./LunaEmptyState";

function EmptyOrbitIllustration() {
  return (
    <svg viewBox="0 0 120 120" width="72" height="72" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="6" opacity="0.24" />
      <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.16" />
      <path
        d="M60 30c10 0 18 8 18 18"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="82" cy="42" r="6" fill="currentColor" />
    </svg>
  );
}

const meta = {
  title: "Components/LunaEmptyState",
  component: LunaEmptyState,
  parameters: {
    layout: "centered"
  },
  args: {
    title: "No missions yet",
    description: "Create your first mission to start tracking launches, crews, and destination notes."
  }
} satisfies Meta<typeof LunaEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StandardNoData: Story = {
  render: (args) => (
    <LunaEmptyState
      {...args}
      media={<EmptyOrbitIllustration />}
      actions={
        <LunaRow gap="3" justify="center">
          <LunaButton flat>Import data</LunaButton>
          <LunaButton>Create mission</LunaButton>
        </LunaRow>
      }
    />
  )
};

export const FirstRunFlow: Story = {
  render: () => (
    <LunaEmptyState
      title="Welcome to mission control"
      description="Connect a source or create a draft mission to turn this workspace into your launch board."
      media={<EmptyOrbitIllustration />}
      actions={
        <LunaRow gap="3" justify="center">
          <LunaButton flat>View guide</LunaButton>
          <LunaButton>Connect source</LunaButton>
        </LunaRow>
      }
    />
  )
};

export const AlignmentAndSurfaceVariants: Story = {
  render: () => (
    <LunaColumn gap="4" style={{ width: "min(100%, 42rem)" }}>
      <LunaEmptyState
        align="left"
        title="Left-aligned guidance"
        description="Useful when the empty state lives inside a larger document flow."
        media={<span style={{ fontSize: "2rem", lineHeight: 1 }}>+</span>}
        actions={<LunaButton>Create collection</LunaButton>}
      />
      <LunaEmptyState
        align="right"
        framed={false}
        title="Unframed variant"
        description="The contract can sit inside an existing parent surface without stacking extra chrome."
        actions={
          <LunaRow gap="3" justify="end">
            <LunaButton flat>Dismiss</LunaButton>
            <LunaButton>Review options</LunaButton>
          </LunaRow>
        }
      />
    </LunaColumn>
  )
};

export const CustomContent: Story = {
  render: () => (
    <LunaEmptyState
      media={<span style={{ fontSize: "2rem", lineHeight: 1 }}>*</span>}
      title={<span>Nothing has reached this orbit</span>}
      actions={<LunaButton>Open scanner</LunaButton>}
    >
      <LunaText variant="body-small" muted align="center">
        Custom body content can include richer markup without leaving the component contract.
      </LunaText>
    </LunaEmptyState>
  )
};
