import type { Meta, StoryObj } from "@storybook/react";
import { LunaAlert } from "./LunaAlert";

const tones = ["neutral", "info", "success", "warning", "danger"] as const;
const emphases = ["soft", "solid", "outline"] as const;

const meta = {
  title: "Components/LunaAlert",
  component: LunaAlert,
  parameters: {
    layout: "padded"
  },
  args: {
    title: "Mission update",
    children: "The orbital sync finished successfully."
  }
} satisfies Meta<typeof LunaAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneAndEmphasisMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
      }}
    >
      {emphases.map((emphasis) => (
        <div key={emphasis} style={{ display: "grid", gap: "0.75rem" }}>
          {tones.map((tone) => (
            <LunaAlert
              key={`${tone}-${emphasis}`}
              tone={tone}
              emphasis={emphasis}
              title={`${tone[0].toUpperCase()}${tone.slice(1)} alert`}
            >
              Theme-driven inline messaging for {tone} surfaces.
            </LunaAlert>
          ))}
        </div>
      ))}
    </div>
  )
};

export const WithIconAndAnnouncementSemantics: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "36rem" }}>
      <LunaAlert
        tone="info"
        title="Scheduled update"
        icon={<span>i</span>}
        role="status"
        aria-live="polite"
      >
        Background sync completed. Review the latest data when you are ready.
      </LunaAlert>
      <LunaAlert
        tone="warning"
        emphasis="outline"
        title="Signal drift detected"
        icon={<span>!</span>}
        role="alert"
        aria-live="assertive"
      >
        Manual review is needed before the next launch window opens.
      </LunaAlert>
    </div>
  )
};

export const CustomSpacing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "30rem" }}>
      <LunaAlert tone="success" title="Compact" padding="3" gap="2">
        A tighter alert still resolves through theme spacing tokens first.
      </LunaAlert>
      <LunaAlert tone="danger" emphasis="solid" rounded padding="5" gap="4">
        Stronger emphasis can be paired with larger spacing without leaving the component contract.
      </LunaAlert>
    </div>
  )
};
