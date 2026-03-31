import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaPanel } from "../luna-panel";
import { LunaWireframe } from "../luna-app-shell-wireframe";
import { LunaApp } from "./LunaApp";

const meta = {
  title: "Components/LunaApp",
  component: LunaApp,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    gutter: "1.5rem",
    background:
      "radial-gradient(circle at top left, rgba(160, 176, 220, 0.18), transparent 28rem), linear-gradient(180deg, rgba(10, 14, 28, 0.04), rgba(10, 14, 28, 0))"
  }
} satisfies Meta<typeof LunaApp>;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoPageFrame({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100%",
        padding: "1rem",
        borderRadius: "1.5rem",
        border: "1px solid rgba(103, 119, 171, 0.24)",
        background: "rgba(248, 250, 255, 0.92)",
        boxShadow: "0 1.5rem 4rem rgba(28, 37, 67, 0.12)",
        boxSizing: "border-box"
      }}
    >
      {children}
    </div>
  );
}

function DemoPage() {
  return (
    <DemoPageFrame>
      <LunaWireframe
        appBar={
          <LunaPanel title="App Bar" description="Router chrome, identity, global actions">
            Brand Primary action Search account
          </LunaPanel>
        }
        left={
          <LunaPanel title="Left" description="Navigation or workspace context">
            Section nav Saved views Working set
          </LunaPanel>
        }
        right={
          <LunaPanel title="Right" description="Inspector, queue, tools">
            Inspector Activity Tools
          </LunaPanel>
        }
        centerTop={
          <LunaPanel title="Center Top" description="Page intro and summary band" tone="emphasis">
            Page header Summary band
          </LunaPanel>
        }
        centerMiddle={
          <LunaPanel title="Center Middle" description="Route content area">
            Primary route content rendered inside LunaApp
          </LunaPanel>
        }
        centerBottom={
          <LunaPanel title="Center Bottom" description="Secondary context">
            Recent activity Related work System notes
          </LunaPanel>
        }
      />
    </DemoPageFrame>
  );
}

export const Playground: Story = {
  render: (args) => (
    <LunaApp {...args}>
      <DemoPage />
    </LunaApp>
  )
};

export const Gutters: Story = {
  render: () => (
    <LunaApp
      background="linear-gradient(180deg, rgba(24, 31, 54, 0.06), rgba(24, 31, 54, 0.02))"
      topGutter="1rem"
      rightGutter="3rem"
      bottomGutter="2rem"
      leftGutter="4rem"
    >
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerTop="Page intro Summary band"
          centerTopBorder
          centerMiddle="This story is showing LunaApp gutter behavior around the routed page surface."
          centerMiddleBorder
          centerBottom="Recent activity Related work"
          centerBottomBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const WithTextRoute: Story = {
  render: () => (
    <LunaApp gutter="1.25rem" background="rgba(245, 247, 253, 1)">
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerMiddle="This is where routed page content would render."
          centerMiddleBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const ExtremeLeftGutter: Story = {
  render: () => (
    <LunaApp background="rgba(245, 247, 253, 1)" leftGutter="8rem" gutter="1rem">
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerMiddle="Extreme left gutter to show how the routed page shifts inward from the app edge."
          centerMiddleBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const ExtremeTopGutter: Story = {
  render: () => (
    <LunaApp background="rgba(245, 247, 253, 1)" topGutter="7rem" gutter="1rem">
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerMiddle="Extreme top gutter to show the page dropping lower inside the app host."
          centerMiddleBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const ExtremeRightGutter: Story = {
  render: () => (
    <LunaApp background="rgba(245, 247, 253, 1)" rightGutter="8rem" gutter="1rem">
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerMiddle="Extreme right gutter to show the routed page pulling away from the right edge."
          centerMiddleBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const ExtremeAllGutters: Story = {
  render: () => (
    <LunaApp
      background="rgba(238, 242, 252, 1)"
      topGutter="5rem"
      rightGutter="6rem"
      bottomGutter="4rem"
      leftGutter="6rem"
    >
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerTop="Page intro Summary band"
          centerTopBorder
          centerMiddle="All gutters exaggerated so the full app host inset is obvious."
          centerMiddleBorder
          centerBottom="Recent activity Related work"
          centerBottomBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const BackgroundColorShift: Story = {
  render: () => (
    <LunaApp
      gutter="1.5rem"
      color="#eaf0ff"
      background="linear-gradient(180deg, rgb(34 42 74), rgb(17 22 40))"
    >
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerTop="Page intro Summary band"
          centerTopBorder
          centerMiddle="Background color shift on the app host while the page surface stays readable."
          centerMiddleBorder
          centerBottom="Recent activity Related work"
          centerBottomBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const BackgroundImageLayer: Story = {
  render: () => (
    <LunaApp
      gutter="1.5rem"
      background="linear-gradient(180deg, rgba(11, 18, 36, 0.84), rgba(18, 26, 50, 0.88))"
      backgroundImage={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%2309111f'/%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='84' cy='91' r='1.8'/%3E%3Ccircle cx='151' cy='172' r='1.2'/%3E%3Ccircle cx='266' cy='78' r='1.5'/%3E%3Ccircle cx='392' cy='148' r='2.1'/%3E%3Ccircle cx='518' cy='112' r='1.1'/%3E%3Ccircle cx='664' cy='196' r='1.7'/%3E%3Ccircle cx='792' cy='88' r='1.3'/%3E%3Ccircle cx='948' cy='140' r='2'/%3E%3Ccircle cx='1056' cy='92' r='1.2'/%3E%3Ccircle cx='1184' cy='178' r='1.6'/%3E%3Ccircle cx='1328' cy='108' r='1.4'/%3E%3Ccircle cx='1470' cy='158' r='2.2'/%3E%3Ccircle cx='120' cy='318' r='1.4'/%3E%3Ccircle cx='238' cy='260' r='2'/%3E%3Ccircle cx='356' cy='352' r='1.1'/%3E%3Ccircle cx='470' cy='298' r='1.6'/%3E%3Ccircle cx='612' cy='338' r='2.1'/%3E%3Ccircle cx='724' cy='284' r='1.2'/%3E%3Ccircle cx='870' cy='330' r='1.5'/%3E%3Ccircle cx='984' cy='268' r='2.3'/%3E%3Ccircle cx='1138' cy='344' r='1.3'/%3E%3Ccircle cx='1276' cy='292' r='1.9'/%3E%3Ccircle cx='1422' cy='332' r='1.5'/%3E%3Ccircle cx='1540' cy='276' r='1.1'/%3E%3Ccircle cx='98' cy='514' r='1.7'/%3E%3Ccircle cx='214' cy='586' r='1.2'/%3E%3Ccircle cx='330' cy='462' r='2.1'/%3E%3Ccircle cx='456' cy='556' r='1.4'/%3E%3Ccircle cx='582' cy='496' r='1.1'/%3E%3Ccircle cx='710' cy='572' r='1.8'/%3E%3Ccircle cx='848' cy='486' r='1.3'/%3E%3Ccircle cx='970' cy='548' r='2.2'/%3E%3Ccircle cx='1098' cy='470' r='1.5'/%3E%3Ccircle cx='1236' cy='566' r='1.2'/%3E%3Ccircle cx='1362' cy='500' r='2'/%3E%3Ccircle cx='1498' cy='578' r='1.6'/%3E%3Ccircle cx='142' cy='724' r='1.3'/%3E%3Ccircle cx='282' cy='674' r='2.1'/%3E%3Ccircle cx='410' cy='756' r='1.2'/%3E%3Ccircle cx='534' cy='692' r='1.6'/%3E%3Ccircle cx='678' cy='738' r='1.9'/%3E%3Ccircle cx='812' cy='686' r='1.1'/%3E%3Ccircle cx='926' cy='770' r='1.5'/%3E%3Ccircle cx='1062' cy='708' r='2.2'/%3E%3Ccircle cx='1188' cy='754' r='1.4'/%3E%3Ccircle cx='1324' cy='694' r='1.7'/%3E%3Ccircle cx='1468' cy='762' r='2'/%3E%3C/g%3E%3C/svg%3E")`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <DemoPageFrame>
        <LunaWireframe
          appBar="Router Nav Account"
          appBarBorder
          left="Inbox Tasks Reports"
          leftBorder
          centerTop="Page intro Summary band"
          centerTopBorder
          centerMiddle="Background image layering on the app host behind the routed page surface."
          centerMiddleBorder
          centerBottom="Recent activity Related work"
          centerBottomBorder
          right="Inspector Activity"
          rightBorder
        />
      </DemoPageFrame>
    </LunaApp>
  )
};

export const BackgroundCssStarField: Story = {
  render: () => (
    <>
      <style>
        {`
          @keyframes luna-app-starfield-drift {
            0% {
              background-position:
                0 0,
                0 0,
                0 0,
                18px 24px,
                0 0;
            }
            100% {
              background-position:
                0 0,
                0 0,
                -72px 72px,
                64px 120px,
                0 0;
            }
          }
        `}
      </style>
      <LunaApp
        gutter="1.5rem"
        className="luna-app-story-starfield"
        background={`
          radial-gradient(circle at 20% 18%, rgba(170, 195, 255, 0.14), transparent 16rem),
          radial-gradient(circle at 80% 12%, rgba(217, 230, 255, 0.1), transparent 18rem),
          radial-gradient(circle, rgba(255, 255, 255, 0.7) 1px, transparent 1.5px) 0 0 / 72px 72px,
          radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1.5px) 18px 24px / 96px 96px,
          linear-gradient(180deg, rgba(10, 16, 32, 0.96), rgba(17, 24, 45, 0.94))
        `}
        style={{
          animation: "luna-app-starfield-drift 18s linear infinite"
        }}
      >
        <DemoPageFrame>
          <LunaWireframe
            appBar="Router Nav Account"
            appBarBorder
            left="Inbox Tasks Reports"
            leftBorder
            centerTop="Page intro Summary band"
            centerTopBorder
            centerMiddle="Pure CSS star field on the app host behind the routed page surface."
            centerMiddleBorder
            centerBottom="Recent activity Related work"
            centerBottomBorder
            right="Inspector Activity"
            rightBorder
          />
        </DemoPageFrame>
      </LunaApp>
    </>
  )
};
