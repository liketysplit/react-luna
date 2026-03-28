import type { Meta, StoryObj } from "@storybook/react";
import { LunaBadge } from "./LunaBadge";

const tones = ["neutral", "info", "success", "warning", "danger"] as const;
const variants = ["soft", "solid", "outline"] as const;

const meta = {
  title: "Components/LunaBadge",
  component: LunaBadge,
  parameters: {
    layout: "centered"
  },
  args: {
    children: "Docked"
  }
} satisfies Meta<typeof LunaBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneAndVariantMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        gridTemplateColumns: "repeat(3, minmax(0, max-content))",
        alignItems: "start"
      }}
    >
      {variants.map((variant) => (
        <div key={variant} style={{ display: "grid", gap: "0.75rem" }}>
          {tones.map((tone) => (
            <LunaBadge key={`${tone}-${variant}`} tone={tone} variant={variant}>
              {tone[0].toUpperCase()}
              {tone.slice(1)}
            </LunaBadge>
          ))}
        </div>
      ))}
    </div>
  )
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <LunaBadge size="small">Small</LunaBadge>
      <LunaBadge size="medium">Medium</LunaBadge>
      <LunaBadge size="large">Large</LunaBadge>
    </div>
  )
};

export const RoundedAndSemanticMarkup: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <LunaBadge rounded tone="info">
        Rounded
      </LunaBadge>
      <LunaBadge as="strong" variant="solid" tone="success">
        Confirmed
      </LunaBadge>
      <LunaBadge as="span" variant="outline" tone="warning" aria-label="Manual review needed">
        Review
      </LunaBadge>
    </div>
  )
};
