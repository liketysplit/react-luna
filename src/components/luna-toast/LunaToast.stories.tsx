import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaToast } from "./LunaToast";

const tones = ["neutral", "info", "success", "warning", "danger"] as const;
const emphases = ["soft", "solid", "outline"] as const;

const meta = {
  title: "Components/LunaToast",
  component: LunaToast,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    title: "Mission update",
    children: "The orbital sync finished successfully.",
    dismissible: true
  }
} satisfies Meta<typeof LunaToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneAndEmphasisMatrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", padding: "2rem" }}>
      {emphases.map((emphasis) => (
        <div
          key={emphasis}
          style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {tones.map((tone, index) => (
            <div key={`${tone}-${emphasis}`} style={{ position: "relative", minHeight: "9rem" }}>
              <LunaToast
                tone={tone}
                emphasis={emphasis}
                placement={
                  index === 0 ? "top-left" : index === 1 ? "top-center" : "top-right"
                }
                title={`${tone[0].toUpperCase()}${tone.slice(1)} toast`}
                dismissible
                duration={0}
                style={{ position: "absolute" }}
              >
                Transient overlay feedback for {tone} surfaces.
              </LunaToast>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export const AutoDismissAndAction: Story = {
  render: () => (
    <LunaToast
      tone="success"
      title="Upload complete"
      duration={4000}
      action={<a href="#review">Review payload</a>}
      icon={<span>+</span>}
      dismissible
    >
      The latest transmission is ready for verification.
    </LunaToast>
  )
};

export const ControlledVisibility: Story = {
  render: () => {
    function ControlledToastStory() {
      const [open, setOpen] = React.useState(true);

      return (
        <div style={{ minHeight: "14rem", padding: "2rem" }}>
          <button type="button" onClick={() => setOpen((value) => !value)}>
            {open ? "Hide toast" : "Show toast"}
          </button>
          <LunaToast
            open={open}
            title="Controlled visibility"
            tone="info"
            dismissible
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
            duration={0}
          >
            This story shows controlled open state without a notification manager.
          </LunaToast>
        </div>
      );
    }

    return <ControlledToastStory />;
  }
};
