import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../../theme";
import { LunaButton } from "../luna-button";
import { LunaText } from "../luna-text";
import { LunaAccordion } from "./LunaAccordion";

const items = [
  {
    value: "systems",
    title: "Systems check",
    description: "Telemetry, pressure, and thermal routing.",
    content: (
      <LunaText variant="body-small">
        Core telemetry is stable and thermal routing remains within the expected launch window.
      </LunaText>
    )
  },
  {
    value: "payload",
    title: "Payload manifest",
    description: "Scientific instruments and relay cargo.",
    content: (
      <LunaText variant="body-small">
        The relay package is locked, sealed, and cleared for lunar transfer.
      </LunaText>
    )
  },
  {
    value: "handoff",
    title: "Ground handoff",
    description: "Final communication path before departure.",
    content: (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <LunaText variant="body-small">
          Ground control remains synchronized across all channels.
        </LunaText>
        <div>
          <LunaButton size="small">Review checklist</LunaButton>
        </div>
      </div>
    )
  }
];

const meta = {
  title: "Components/LunaAccordion",
  component: LunaAccordion,
  parameters: {
    layout: "padded"
  },
  args: {
    items
  }
} satisfies Meta<typeof LunaAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleExpand: Story = {
  args: {
    defaultValue: "systems"
  }
};

export const MultipleExpand: Story = {
  args: {
    multiple: true,
    defaultValue: ["systems", "payload"]
  }
};

export const NonCollapsible: Story = {
  args: {
    collapsible: false,
    defaultValue: "systems"
  }
};

export const ThemeOverride: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        components: {
          accordion: {
            radius: "xl",
            defaultGap: "4",
            modes: {
              light: {
                itemBg: "neutral.100",
                itemBorder: "primary.200",
                itemHoverBg: "primary.50",
                itemActiveBg: "primary.100",
                itemIndicatorFg: "primary.700",
                itemMutedFg: "neutral.700",
                panelFg: "neutral.800"
              }
            }
          }
        }
      }}
    >
      <LunaAccordion
        items={items}
        defaultValue="payload"
        panelPadding="5"
        itemGap="2"
      />
    </ThemeProvider>
  )
};
