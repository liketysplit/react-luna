import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../theme";
import { LunaButton } from "./luna-button";
import { LunaColumn } from "./luna-column";
import { LunaDatePicker } from "./luna-date-picker";
import { LunaRow } from "./luna-row";
import { LunaInput } from "./luna-input";
import { LunaSelect } from "./luna-select";
import { LunaTextarea } from "./luna-textarea";

const selectOptions = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma", disabled: true }
];

const meta = {
  title: "Components/FieldComparison"
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function SizeLabel({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeLabel = size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";

  return sizeLabel;
}

function ComponentColumn({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <LunaColumn gap="4">
      <strong>{title}</strong>
      {children}
    </LunaColumn>
  );
}

function SizeColumn({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeLabel = SizeLabel({ size });

  return (
    <LunaColumn gap="4">
      <LunaInput
        label={`${sizeLabel} input`}
        inputSize={size}
        placeholder={`${sizeLabel} input`}
      />
      <LunaSelect
        label={`${sizeLabel} select`}
        inputSize={size}
        options={selectOptions}
        placeholder="Choose"
      />
      <LunaDatePicker
        mode="picker"
        label={`${sizeLabel} date`}
        inputSize={size}
      />
      <LunaTextarea
        label={`${sizeLabel} textarea`}
        inputSize={size}
        minRows={1}
        placeholder={`${sizeLabel} textarea`}
      />
    </LunaColumn>
  );
}

function FieldRow({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeLabel = SizeLabel({ size });

  return (
    <LunaRow gap="4">
      <LunaButton size={size === "sm" ? "small" : size === "md" ? "medium" : "large"}>
        {sizeLabel} button
      </LunaButton>
      <LunaInput
        label={`${sizeLabel} input`}
        inputSize={size}
        placeholder={`${sizeLabel} input`}
      />
      <LunaSelect
        label={`${sizeLabel} select`}
        inputSize={size}
        options={selectOptions}
        placeholder="Choose"
      />
      <LunaDatePicker
        mode="picker"
        label={`${sizeLabel} date`}
        inputSize={size}
      />
      <LunaTextarea
        label={`${sizeLabel} textarea`}
        inputSize={size}
        minRows={1}
        placeholder={`${sizeLabel} textarea`}
      />
    </LunaRow>
  );
}

export const SizeComparison: Story = {
  render: () => (
    <LunaRow gap="4" wrap>
      <ComponentColumn title="Buttons">
        <LunaButton size="small">Small button</LunaButton>
        <LunaButton size="medium">Medium button</LunaButton>
        <LunaButton size="large">Large button</LunaButton>
      </ComponentColumn>
      <ComponentColumn title="Inputs">
        <LunaInput label="Small input" inputSize="sm" placeholder="Small input" />
        <LunaInput label="Medium input" inputSize="md" placeholder="Medium input" />
        <LunaInput label="Large input" inputSize="lg" placeholder="Large input" />
      </ComponentColumn>
      <ComponentColumn title="Selects">
        <LunaSelect label="Small select" inputSize="sm" options={selectOptions} placeholder="Choose" />
        <LunaSelect label="Medium select" inputSize="md" options={selectOptions} placeholder="Choose" />
        <LunaSelect label="Large select" inputSize="lg" options={selectOptions} placeholder="Choose" />
      </ComponentColumn>
      <ComponentColumn title="Date Pickers">
        <LunaDatePicker mode="picker" label="Small date" inputSize="sm" />
        <LunaDatePicker mode="picker" label="Medium date" inputSize="md" />
        <LunaDatePicker mode="picker" label="Large date" inputSize="lg" />
      </ComponentColumn>
      <ComponentColumn title="Textareas">
        <LunaTextarea label="Small textarea" inputSize="sm" minRows={1} placeholder="Small textarea" />
        <LunaTextarea label="Medium textarea" inputSize="md" minRows={1} placeholder="Medium textarea" />
        <LunaTextarea label="Large textarea" inputSize="lg" minRows={1} placeholder="Large textarea" />
      </ComponentColumn>
    </LunaRow>
  )
};

export const SizeWall: Story = {
  render: () => (
    <LunaRow gap="4" wrap>
      <SizeColumn size="sm" />
      <SizeColumn size="md" />
      <SizeColumn size="lg" />
    </LunaRow>
  )
};

export const DatePickerSizeComparison: Story = {
  render: () => (
    <LunaColumn gap="4">
      <FieldRow size="sm" />
      <FieldRow size="md" />
      <FieldRow size="lg" />
    </LunaColumn>
  )
};

export const DarkModeSizeComparison: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem", background: "var(--luna-background)" }}>
        <LunaRow gap="4" wrap>
          <ComponentColumn title="Buttons">
            <LunaButton size="small">Small button</LunaButton>
            <LunaButton size="medium">Medium button</LunaButton>
            <LunaButton size="large">Large button</LunaButton>
          </ComponentColumn>
          <ComponentColumn title="Inputs">
            <LunaInput label="Small input" inputSize="sm" placeholder="Small input" />
            <LunaInput label="Medium input" inputSize="md" placeholder="Medium input" />
            <LunaInput label="Large input" inputSize="lg" placeholder="Large input" />
          </ComponentColumn>
          <ComponentColumn title="Selects">
            <LunaSelect label="Small select" inputSize="sm" options={selectOptions} placeholder="Choose" />
            <LunaSelect label="Medium select" inputSize="md" options={selectOptions} placeholder="Choose" />
            <LunaSelect label="Large select" inputSize="lg" options={selectOptions} placeholder="Choose" />
          </ComponentColumn>
          <ComponentColumn title="Date Pickers">
            <LunaDatePicker mode="picker" label="Small date" inputSize="sm" />
            <LunaDatePicker mode="picker" label="Medium date" inputSize="md" />
            <LunaDatePicker mode="picker" label="Large date" inputSize="lg" />
          </ComponentColumn>
          <ComponentColumn title="Textareas">
            <LunaTextarea label="Small textarea" inputSize="sm" minRows={1} placeholder="Small textarea" />
            <LunaTextarea label="Medium textarea" inputSize="md" minRows={1} placeholder="Medium textarea" />
            <LunaTextarea label="Large textarea" inputSize="lg" minRows={1} placeholder="Large textarea" />
          </ComponentColumn>
        </LunaRow>
      </div>
    </ThemeProvider>
  )
};
