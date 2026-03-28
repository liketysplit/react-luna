import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "../luna-button";
import { LunaModal } from "./LunaModal";

const meta = {
  title: "Components/LunaModal",
  component: LunaModal,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    open: true,
    title: "Confirm launch window",
    description: "Review the final checklist before promoting this mission to the live manifest.",
    children:
      "This modal stays focused on one composite surface. It does not own stacking, portal orchestration, or route-level workflows.",
    actions: (
      <>
        <LunaButton flat>Cancel</LunaButton>
        <LunaButton>Confirm</LunaButton>
      </>
    )
  }
} satisfies Meta<typeof LunaModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = {
  args: {
    size: "small",
    title: "Small dialog",
    description: "Use the small shell for terse confirmations and compact reviews."
  }
};

export const Large: Story = {
  args: {
    size: "large",
    title: "Large dialog",
    description: "Use the large shell when the body needs more reading room."
  }
};

export const Full: Story = {
  args: {
    size: "full",
    title: "Full dialog",
    description: "The full shell keeps the same contract while expanding to the viewport inset."
  }
};

export const LongBodyContent: Story = {
  render: () => (
    <LunaModal
      open
      size="large"
      title="Manifest review"
      description="Long content should scroll inside the modal body instead of pushing the shell off-screen."
      actions={
        <>
          <LunaButton flat>Dismiss</LunaButton>
          <LunaButton>Save changes</LunaButton>
        </>
      }
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        {Array.from({ length: 8 }, (_, index) => (
          <p key={index}>
            Segment {index + 1}. Orbital telemetry remains stable and the downstream application can still replace the modal theme without rewriting the structure.
          </p>
        ))}
      </div>
    </LunaModal>
  )
};

export const ControlledVisibility: Story = {
  render: () => {
    function ControlledModalStory() {
      const [open, setOpen] = React.useState(false);

      return (
        <div style={{ minHeight: "100dvh", padding: "2rem" }}>
          <LunaButton onClick={() => setOpen(true)}>Open modal</LunaButton>
          <LunaModal
            open={open}
            title="Controlled state"
            description="This story shows controlled visibility with reason-aware dismiss callbacks."
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
            actions={
              <>
                <LunaButton flat onClick={() => setOpen(false)}>
                  Close
                </LunaButton>
                <LunaButton onClick={() => setOpen(false)}>Apply</LunaButton>
              </>
            }
          >
            The parent decides whether to keep the modal open.
          </LunaModal>
        </div>
      );
    }

    return <ControlledModalStory />;
  }
};
