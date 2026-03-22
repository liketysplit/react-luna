import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaText } from "./LunaText";

const meta = {
  title: "Components/LunaText",
  component: LunaText,
  args: {
    children: "The moon keeps its shape by changing how it catches light."
  }
} satisfies Meta<typeof LunaText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <LunaText variant="display">Lunar display text</LunaText>
      <LunaText variant="title">Lunar title text</LunaText>
      <LunaText variant="body">Body text for sustained reading and standard content.</LunaText>
      <LunaText variant="body-small">
        Smaller body text for dense layouts or secondary copy.
      </LunaText>
      <LunaText variant="label">Mission label</LunaText>
      <LunaText variant="caption">Caption text for supporting detail.</LunaText>
    </div>
  )
};

export const Semantics: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <LunaText>Default paragraph semantics</LunaText>
      <LunaText as="span">Inline span semantics</LunaText>
      <LunaText as="label" variant="label">
        Field label semantics
      </LunaText>
      <LunaText as="h2" variant="title">
        Heading semantics through as
      </LunaText>
    </div>
  )
};

export const DecorationAndOverflow: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "22rem" }}>
      <LunaText muted>Muted body copy follows the mode-aware muted token.</LunaText>
      <LunaText surface>Surface treatment stays lightweight and text-first.</LunaText>
      <LunaText underline>Underline is available without turning text into a button.</LunaText>
      <LunaText italic>Italic emphasis is explicit.</LunaText>
      <LunaText truncate title="A very long line that should truncate instead of breaking the layout unexpectedly.">
        A very long line that should truncate instead of breaking the layout unexpectedly.
      </LunaText>
    </div>
  )
};

export const ColorAndAlignment: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <LunaText color="primary.500">Theme token color override.</LunaText>
      <LunaText color="#9dd6ff">Raw color override.</LunaText>
      <LunaText align="center">Centered text alignment.</LunaText>
      <LunaText align="right">Right-aligned text alignment.</LunaText>
    </div>
  )
};
