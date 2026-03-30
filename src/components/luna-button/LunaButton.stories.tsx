import type { Meta, StoryObj } from "@storybook/react";
import { LunaButton } from "./LunaButton";
import "./LunaButton.stories.css";

const themeColorRows = [
  { label: "Primary", value: "primary.600" },
  { label: "Accent", value: "accent.500" },
  { label: "Success", value: "success.500" },
  { label: "Warning", value: "warning.500" },
  { label: "Danger", value: "danger.500" },
  { label: "Neutral", value: "neutral.700" }
];

const customColorRows = [
  { label: "Moon glow", value: "#7ab8ff" },
  { label: "Lunar ice", value: "#9ae6ff" },
  { label: "Dust rose", value: "#c78db7" }
];

const meta = {
  title: "Components/LunaButton",
  component: LunaButton,
  parameters: {
    layout: "centered"
  },
  args: {
    children: "Launch mission"
  }
} satisfies Meta<typeof LunaButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizeScale: Story = {
  render: () => (
    <div className="luna-button-story-grid">
      <div className="luna-button-story-row">
        <LunaButton size="x-small">X-Small</LunaButton>
        <LunaButton size="small">Small</LunaButton>
        <LunaButton size="medium">Medium</LunaButton>
        <LunaButton size="large">Large</LunaButton>
        <LunaButton size="x-large">X-Large</LunaButton>
      </div>
    </div>
  )
};

export const SurfaceTreatments: Story = {
  render: () => (
    <div className="luna-button-story-row">
      <LunaButton>Default</LunaButton>
      <LunaButton outline>Outline</LunaButton>
      <LunaButton flat>Flat</LunaButton>
      <LunaButton depressed>Depressed</LunaButton>
      <LunaButton outline flat depressed>
        Combined
      </LunaButton>
    </div>
  )
};

export const InfoAndIconography: Story = {
  render: () => (
    <div className="luna-button-story-grid">
      <div className="luna-button-story-row">
        <LunaButton info>Mission briefing</LunaButton>
        <LunaButton info color="#7ab8ff">
          Lunar atlas
        </LunaButton>
      </div>
      <div className="luna-button-story-row">
        <LunaButton iconName="luna-crescent">Orbit</LunaButton>
        <LunaButton iconName="luna-crescent" iconDirection="left">
          Dock
        </LunaButton>
        <LunaButton fab iconName="luna-crescent" aria-label="Open moon actions" />
      </div>
    </div>
  )
};

export const MotionAndState: Story = {
  render: () => (
    <div className="luna-button-story-surface">
      <div className="luna-button-story-row">
        <LunaButton animation="bounce 3s infinite">Bounce</LunaButton>
        <LunaButton animation="wiggle 4s infinite">Wiggle</LunaButton>
        <LunaButton animation="pulse 2s infinite">Pulse</LunaButton>
        <LunaButton loading>Loading</LunaButton>
        <LunaButton loading loadingAnimation="loading-star">
          Loading star
        </LunaButton>
        <LunaButton disabled>Disabled</LunaButton>
        <LunaButton loading disabled>
          Loading disabled
        </LunaButton>
      </div>
    </div>
  )
};

export const ColorMatrix: Story = {
  render: () => (
    <div className="luna-button-story-grid">
      <div className="luna-button-story-surface luna-button-story-matrix">
        {themeColorRows.map((row) => (
          <div className="luna-button-story-matrix-row" key={row.label}>
            <div className="luna-button-story-matrix-label">{row.label}</div>
            <LunaButton color={row.value}>Default</LunaButton>
            <LunaButton color={row.value} outline>
              Outline
            </LunaButton>
            <LunaButton color={row.value} flat>
              Flat
            </LunaButton>
            <LunaButton color={row.value} info>
              Info
            </LunaButton>
          </div>
        ))}
      </div>
      <div className="luna-button-story-surface luna-button-story-matrix">
        {customColorRows.map((row) => (
          <div className="luna-button-story-matrix-row" key={row.label}>
            <div className="luna-button-story-matrix-label">{row.label}</div>
            <LunaButton color={row.value}>Default</LunaButton>
            <LunaButton color={row.value} outline>
              Outline
            </LunaButton>
            <LunaButton color={row.value} flat>
              Flat
            </LunaButton>
            <LunaButton color={row.value} info>
              Info
            </LunaButton>
          </div>
        ))}
      </div>
    </div>
  )
};
