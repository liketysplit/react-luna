import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "../luna-column";
import { LunaText } from "../luna-text";
import { LunaBreadcrumb } from "./LunaBreadcrumb";

const items = [
  { label: "Mission control", href: "#" },
  { label: "Flights", href: "#" },
  { label: "Europa relay", href: "#" },
  { label: "Telemetry", current: true }
];

const meta = {
  title: "Components/LunaBreadcrumb",
  component: LunaBreadcrumb,
  args: {
    items,
    size: "md",
    separator: "/"
  }
} satisfies Meta<typeof LunaBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const CollapsedTrail: Story = {
  args: {
    maxItems: 4,
    items: [
      { label: "Mission control", href: "#" },
      { label: "Flights", href: "#" },
      { label: "Outer system", href: "#" },
      { label: "Europa relay", href: "#" },
      { label: "Telemetry", href: "#" },
      { label: "Packet detail", current: true }
    ]
  }
};

export const CustomSeparator: Story = {
  args: {
    separator: "•",
    items: [
      { label: "System map", href: "#" },
      { label: "Habitat ring", href: "#" },
      { label: "Life support", current: true }
    ]
  }
};

export const ActionTrail: Story = {
  render: () => {
    function ActionTrailStory() {
      const [currentStep, setCurrentStep] = React.useState("Payload");

      const actionItems = [
        {
          label: "Assembly",
          current: currentStep === "Assembly",
          onClick: () => setCurrentStep("Assembly")
        },
        {
          label: "Fueling",
          current: currentStep === "Fueling",
          onClick: () => setCurrentStep("Fueling")
        },
        { label: "Payload", current: currentStep === "Payload" },
        { label: "Launch window", disabled: true }
      ];

      return (
        <LunaColumn gap="3">
          <LunaBreadcrumb items={actionItems} separator=">" />
          <LunaText variant="body-small" muted>
            Current step: {currentStep}
          </LunaText>
        </LunaColumn>
      );
    }

    return <ActionTrailStory />;
  }
};
