import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaWireframe } from "./";
import type { LunaWireframeStoryArgs } from "./LunaWireframe.story-support";
import {
  defaultWireframeStoryArgs,
  renderLunaWireframeStory,
  renderLunaWireframeTextStory
} from "./LunaWireframe.story-support";
import "./LunaWireframe.stories.css";

const meta = {
  title: "Components/LunaWireframe",
  parameters: {
    layout: "fullscreen"
  },
  args: defaultWireframeStoryArgs,
  render: renderLunaWireframeStory
} satisfies Meta<LunaWireframeStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TextOnly: Story = {
  render: () => renderLunaWireframeTextStory()
};

export const TextOnlyBorderComparison: Story = {
  render: () => (
    <div
      className="luna-app-shell-wireframe-story"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: "0.5rem"
      }}
    >
      <div>
        <LunaWireframe
          appBar="Brand Primary action Search account"
          left="Section nav Saved views Working set"
          right="Inspector Activity Tools"
          centerTop="Page header Summary band"
          centerMiddle="Primary surface Supporting panel"
          centerBottom="Recent activity Related work System notes"
        />
      </div>
      <div>
        <LunaWireframe
          appBar="Brand Primary action Search account"
          appBarBorder
          left="Section nav Saved views Working set"
          leftBorder
          right="Inspector Activity Tools"
          rightBorder
          centerTop="Page header Summary band"
          centerTopBorder
          centerMiddle="Primary surface Supporting panel"
          centerMiddleBorder
          centerBottom="Recent activity Related work System notes"
          centerBottomBorder
        />
      </div>
    </div>
  )
};

export const FullShell: Story = {
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: true,
    showCenterBottom: true,
    narrow: false
  }
};

export const WithoutLeft: Story = {
  args: {
    showLeft: false
  }
};

export const WithoutRight: Story = {
  args: {
    showRight: false
  }
};

export const MainOnly: Story = {
  args: {
    showAppBar: true,
    showLeft: false,
    showRight: false,
    showCenterTop: false,
    showCenterBottom: false,
    narrow: false
  }
};

export const WithoutAppBar: Story = {
  args: {
    showAppBar: false,
    showLeft: true,
    showRight: true,
    showCenterTop: true,
    showCenterBottom: true,
    narrow: false
  }
};

export const NarrowWireframe: Story = {
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: true,
    showCenterBottom: true,
    narrow: true
  }
};

export const ThinCenterTop: Story = {
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: true,
    showCenterBottom: false,
    narrow: false,
    centerTopDensity: "thin",
    centerBottomDensity: "default",
    centerMiddleMode: "stretched"
  }
};

export const ThinCenterBottom: Story = {
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: false,
    showCenterBottom: true,
    narrow: false,
    centerTopDensity: "default",
    centerBottomDensity: "thin",
    centerMiddleMode: "stretched"
  }
};

export const CenterMiddleOnlyWithSideRails: Story = {
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: false,
    showCenterBottom: false,
    narrow: false,
    centerTopDensity: "default",
    centerBottomDensity: "default",
    centerMiddleMode: "stretched"
  }
};
