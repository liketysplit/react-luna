import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaAvatar } from "../luna-avatar";
import { LunaButton } from "../luna-button";
import { LunaHeader } from "../luna-header";
import { LunaText } from "../luna-text";
import { LunaTopbar } from "./LunaTopbar";

function renderNavigation() {
  return (
    <nav aria-label="Primary" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <LunaButton flat size="small">
        Overview
      </LunaButton>
      <LunaButton flat size="small">
        Activity
      </LunaButton>
      <LunaButton flat size="small">
        Crew
      </LunaButton>
    </nav>
  );
}

const meta = {
  title: "Components/LunaTopbar",
  component: LunaTopbar
} satisfies Meta<typeof LunaTopbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <LunaTopbar
      start={<LunaHeader title="Orbital Console" subtitle="Northern relay" size="sm" />}
      end={
        <>
          <LunaButton flat size="small">
            Support
          </LunaButton>
          <LunaButton size="small">Launch</LunaButton>
        </>
      }
    >
      {renderNavigation()}
    </LunaTopbar>
  )
};

export const CenteredNavigation: Story = {
  render: () => (
    <LunaTopbar
      start={
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LunaAvatar name="Luna Station" size="small" />
          <LunaHeader title="Beacon Deck" subtitle="West approach" size="sm" />
        </div>
      }
      end={
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LunaText variant="body-small" muted>
            Quiet watch
          </LunaText>
          <LunaAvatar name="Jordan Beacon" size="small" />
        </div>
      }
    >
      {renderNavigation()}
    </LunaTopbar>
  )
};

export const SurfaceControls: Story = {
  render: () => (
    <div style={{ background: "var(--luna-background)", padding: "1.5rem" }}>
      <LunaTopbar
        bordered={false}
        gap="6"
        padding="6"
        start={<LunaHeader title="Transit Window" subtitle="Expanded spacing" size="sm" />}
        end={<LunaButton flat size="small">Archive</LunaButton>}
      >
        <LunaText variant="body-small" muted>
          Surface spacing resolves through theme tokens before raw values.
        </LunaText>
      </LunaTopbar>
    </div>
  )
};
