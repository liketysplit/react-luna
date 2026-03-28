import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { LunaTag } from "./LunaTag";

const variants = ["neutral", "primary", "success", "warning", "danger"] as const;
const sizes = ["small", "medium", "large"] as const;

const meta = {
  title: "Components/LunaTag",
  component: LunaTag,
  args: {
    children: "Stable orbit"
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof LunaTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <LunaTag variant={variant}>{variant}</LunaTag>
          <LunaTag variant={variant} rounded>
            {variant} rounded
          </LunaTag>
        </div>
      ))}
    </div>
  )
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      {sizes.map((size) => (
        <LunaTag key={size} size={size} variant="primary">
          {size}
        </LunaTag>
      ))}
      <LunaTag size="2.25rem">custom</LunaTag>
    </div>
  )
};

export const SemanticOverridesAndColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <LunaTag as="strong" variant="success">
        semantic strong
      </LunaTag>
      <LunaTag as="span" color="accent.500">
        token color
      </LunaTag>
      <LunaTag
        color="#0f766e"
        style={
          {
            "--luna-tag-fg": "#ecfeff"
          } as React.CSSProperties
        }
      >
        custom surface
      </LunaTag>
    </div>
  )
};
