import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaButton } from "../luna-button";
import { LunaColumn } from "../luna-column";
import { LunaText } from "../luna-text";
import { LunaCard } from "./LunaCard";

const meta = {
  title: "Components/LunaCard",
  component: LunaCard,
  args: {
    title: "Mission Brief"
  }
} satisfies Meta<typeof LunaCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <LunaCard
      {...args}
      actionsGap="2"
      actions={
        <>
          <LunaButton flat>Dismiss</LunaButton>
          <LunaButton>Launch</LunaButton>
        </>
      }
    >
      <LunaText>
        Lunar winds are stable. Primary telemetry is green across all systems.
      </LunaText>
    </LunaCard>
  )
};

export const RegionAlignment: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaCard
        title="Centered card"
        titleAlign="center"
        bodyAlign="center"
        actionsAlign="center"
        actions={<LunaButton>Continue</LunaButton>}
      >
        <LunaText variant="body-small" muted>
          All checkpoints are aligned for departure.
        </LunaText>
      </LunaCard>
      <LunaCard
        title="Right-aligned actions"
        actionsAlign="right"
        actionsGap="3"
        actions={
          <>
            <LunaButton flat>Cancel</LunaButton>
            <LunaButton>Approve</LunaButton>
          </>
        }
      >
        <LunaText>Action alignment is independent from title and body alignment.</LunaText>
      </LunaCard>
    </LunaColumn>
  )
};

export const SurfaceTreatments: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaCard title="Default card">
        <LunaText>Base grouped-content surface.</LunaText>
      </LunaCard>
      <LunaCard title="Outlined card" outlined>
        <LunaText>Border-first surface treatment.</LunaText>
      </LunaCard>
      <LunaCard title="Elevated card" elevated>
        <LunaText>Stronger elevation treatment.</LunaText>
      </LunaCard>
      <LunaCard title="Flat interactive card" flat interactive>
        <LunaText>Interactive surface with no shadow.</LunaText>
      </LunaCard>
      <LunaCard title="Colored card" color="primary.600">
        <LunaText color="#ffffff">Color sets background intent while content stays composable.</LunaText>
      </LunaCard>
    </LunaColumn>
  )
};

export const Spacing: Story = {
  render: () => (
    <LunaColumn gap="4">
      <LunaCard title="Compact card" padding="3" gap="2">
        <LunaText variant="body-small">Smaller padding and region spacing.</LunaText>
      </LunaCard>
      <LunaCard
        title="Spacious card"
        padding="6"
        gap="5"
        actionsGap="4"
        actions={
          <>
            <LunaButton flat>Later</LunaButton>
            <LunaButton>Review</LunaButton>
          </>
        }
      >
        <LunaText>
          Padding, content gap, and action gap resolve through theme spacing first, then raw CSS
          values.
        </LunaText>
      </LunaCard>
    </LunaColumn>
  )
};
