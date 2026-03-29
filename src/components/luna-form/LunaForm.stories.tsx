import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaButton } from "../luna-button";
import { LunaCheckbox } from "../luna-checkbox";
import { LunaHeader } from "../luna-header";
import { LunaInput } from "../luna-input";
import { LunaSelect } from "../luna-select";
import { LunaTextarea } from "../luna-textarea";
import { LunaForm } from "./LunaForm";

const selectOptions = [
  { value: "low", label: "Low orbit" },
  { value: "mid", label: "Mid orbit" },
  { value: "high", label: "High orbit" }
];

const meta = {
  title: "Components/LunaForm",
  component: LunaForm
} satisfies Meta<typeof LunaForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <LunaForm
      {...args}
      header={<LunaHeader title="Mission intake" subtitle="Confirm the launch request details." />}
      actions={
        <>
          <LunaButton flat type="reset">
            Reset
          </LunaButton>
          <LunaButton type="submit">Submit request</LunaButton>
        </>
      }
    >
      <LunaInput label="Mission name" name="missionName" placeholder="Aurora relay" externalLabel />
      <LunaSelect
        label="Orbit band"
        name="orbitBand"
        options={selectOptions}
        placeholder="Choose orbit"
        externalLabel
      />
      <LunaTextarea
        label="Launch note"
        name="launchNote"
        minRows={3}
        placeholder="Add final crew notes"
        externalLabel
      />
    </LunaForm>
  )
};

export const ActionAlignment: Story = {
  render: () => (
    <LunaForm
      header={<LunaHeader title="Final review" subtitle="Action alignment stays configurable." />}
      actionsAlign="right"
      actions={
        <>
          <LunaButton flat type="button">
            Save draft
          </LunaButton>
          <LunaButton type="submit">Approve flight plan</LunaButton>
        </>
      }
    >
      <LunaInput
        label="Call sign"
        name="callSign"
        defaultValue="Moonline Seven"
        externalLabel
      />
      <LunaCheckbox
        label="Ready for launch window"
        name="launchReady"
        defaultChecked
        description="This confirms the crew accepts the current weather corridor."
      />
    </LunaForm>
  )
};

export const CompactSpacing: Story = {
  render: () => (
    <LunaForm
      gap="3"
      actionsGap="2"
      header={<LunaHeader title="Quick confirmation" subtitle="Tighter spacing for short workflows." />}
      actions={<LunaButton type="submit">Confirm</LunaButton>}
    >
      <LunaInput label="Code" name="code" defaultValue="L-42" externalLabel />
      <LunaInput label="Verifier" name="verifier" defaultValue="Control deck" externalLabel />
    </LunaForm>
  )
};
