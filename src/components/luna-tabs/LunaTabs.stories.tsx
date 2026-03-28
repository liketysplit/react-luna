import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaButton } from "../luna-button";
import { LunaCard } from "../luna-card";
import { LunaColumn } from "../luna-column";
import { LunaHeader } from "../luna-header";
import { LunaText } from "../luna-text";
import { LunaTabs } from "./LunaTabs";

const missionItems = [
  {
    value: "overview",
    label: "Overview",
    panel: (
      <LunaColumn gap="3">
        <LunaHeader
          title="Mission overview"
          subtitle="Primary telemetry is synchronized across the launch stack."
        />
        <LunaText>
          Use tabs when content shares one frame of reference and users need fast comparison
          between related sections.
        </LunaText>
      </LunaColumn>
    )
  },
  {
    value: "payload",
    label: "Payload",
    panel: (
      <LunaCard
        header={<LunaHeader title="Payload manifest" subtitle="Ready for validation." />}
        actions={<LunaButton size="small">Review</LunaButton>}
      >
        <LunaText variant="body-small">
          Payload checks completed with stable temperature and pressure readings.
        </LunaText>
      </LunaCard>
    )
  },
  {
    value: "timeline",
    label: "Timeline",
    panel: (
      <LunaColumn gap="2">
        <LunaText variant="label">Mission timeline</LunaText>
        <LunaText variant="body-small">T-12 hours: final inspection</LunaText>
        <LunaText variant="body-small">T-03 hours: crew boarding</LunaText>
        <LunaText variant="body-small">T-00 hours: launch window opens</LunaText>
      </LunaColumn>
    )
  }
];

const meta = {
  title: "Components/LunaTabs",
  component: LunaTabs,
  args: {
    items: missionItems
  }
} satisfies Meta<typeof LunaTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};

export const ManualActivation: Story = {
  args: {
    activationMode: "manual",
    items: [
      ...missionItems,
      {
        value: "archives",
        label: "Archives",
        panel: (
          <LunaText variant="body-small">
            Manual activation keeps focus movement separate from content changes.
          </LunaText>
        ),
        disabled: true
      }
    ]
  }
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    fullWidth: true
  }
};
