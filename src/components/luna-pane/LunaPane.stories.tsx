import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaApp } from "../luna-app";
import { LunaWireframe } from "../luna-app-shell-wireframe";
import { LunaPane } from "./LunaPane";

const meta = {
  title: "Components/LunaPane",
  component: LunaPane,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    borderRight: true,
    minHeight: "12rem",
    children: "Pane content"
  }
} satisfies Meta<typeof LunaPane>;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryStage({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top left, rgba(160, 176, 220, 0.18), transparent 28rem), linear-gradient(180deg, rgba(10, 14, 28, 0.04), rgba(10, 14, 28, 0))"
      }}
    >
      {children}
    </div>
  );
}

function PaneDemoStack({
  items
}: {
  items: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: "100%" }}>
      {items.map((item) => (
        <div
          key={item}
          style={{
            minHeight: "2.75rem",
            padding: "0.75rem",
            borderRadius: "0.85rem",
            border: "1px dashed rgba(107, 121, 169, 0.35)",
            background: "rgba(247, 249, 255, 0.88)",
            color: "#5a668d",
            boxSizing: "border-box"
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function PaneDemoCanvas({
  title,
  detail
}: {
  title: string;
  detail: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap"
        }}
      >
        {["Scope", "Sort", "Actions"].map((item) => (
          <div
            key={item}
            style={{
              minHeight: "2rem",
              padding: "0 0.75rem",
              borderRadius: "999px",
              border: "1px solid rgba(108, 122, 171, 0.22)",
              background: "rgba(233, 238, 252, 0.8)",
              color: "#43507a",
              display: "inline-flex",
              alignItems: "center"
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        style={{
          minHeight: "11rem",
          padding: "1rem",
          borderRadius: "0.95rem",
          border: "1px dashed rgba(107, 121, 169, 0.35)",
          background: "rgba(247, 249, 255, 0.88)",
          color: "#5a668d",
          boxSizing: "border-box"
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem", color: "#46537e" }}>{title}</div>
        <div>{detail}</div>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <StoryStage>
      <div style={{ width: "min(100%, 42rem)" }}>
        <LunaPane {...args} />
      </div>
    </StoryStage>
  )
};

export const EdgeDirections: Story = {
  render: () => (
    <StoryStage>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
        <LunaPane borderTop minHeight="10rem">Top border only</LunaPane>
        <LunaPane borderRight minHeight="10rem">Right border only</LunaPane>
        <LunaPane borderBottom minHeight="10rem">Bottom border only</LunaPane>
        <LunaPane borderLeft minHeight="10rem">Left border only</LunaPane>
      </div>
    </StoryStage>
  )
};

export const ThicknessAndStyle: Story = {
  render: () => (
    <StoryStage>
      <div style={{ display: "grid", gap: "1.5rem", width: "min(100%, 48rem)" }}>
        <LunaPane border borderWidth="1px" radius="1rem" minHeight="8rem">
          Hairline full border
        </LunaPane>
        <LunaPane borderRight borderWidth="4px" minHeight="8rem">
          Thick right divider
        </LunaPane>
        <LunaPane borderTop borderBottom borderStyle="dashed" borderWidth="2px" minHeight="8rem">
          Dashed horizontal rails
        </LunaPane>
      </div>
    </StoryStage>
  )
};

export const InsideWireframe: Story = {
  render: () => (
    <StoryStage>
      <LunaWireframe
        appBar={
          <LunaPane borderBottom style={{ paddingBottom: "0.75rem" }}>
            <div style={{ color: "#46537e" }}>Router Nav Account</div>
          </LunaPane>
        }
        left={
          <LunaPane borderRight style={{ paddingRight: "1rem" }} minHeight="100%">
            <PaneDemoStack items={["Inbox", "Tasks", "Reports"]} />
          </LunaPane>
        }
        centerMiddle={
          <LunaPane border radius="1rem" style={{ padding: "1rem" }}>
            <PaneDemoCanvas
              title="LunaPane inside LunaWireframe"
              detail="The wireframe stays structural. The pane provides the quiet boundary and framing inside the slot."
            />
          </LunaPane>
        }
        right={
          <LunaPane borderLeft style={{ paddingLeft: "1rem" }} minHeight="100%">
            <PaneDemoStack items={["Inspector", "Activity", "Tools"]} />
          </LunaPane>
        }
      />
    </StoryStage>
  )
};

export const InsideApp: Story = {
  render: () => (
    <LunaApp gutter="1.5rem" background="linear-gradient(180deg, rgba(24, 31, 54, 0.06), rgba(24, 31, 54, 0.02))">
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
        <LunaWireframe
          appBar={
            <LunaPane borderBottom style={{ paddingBottom: "0.75rem" }}>
              <div style={{ color: "#46537e" }}>App host route chrome</div>
            </LunaPane>
          }
          left={
            <LunaPane borderRight style={{ paddingRight: "1rem" }} minHeight="100%">
              <PaneDemoStack items={["Left nav", "Pinned items", "Working set"]} />
            </LunaPane>
          }
          centerMiddle={
            <LunaPane border radius="1rem" style={{ padding: "1rem" }}>
              <PaneDemoCanvas
                title="LunaPane inside LunaApp"
                detail="The app owns the page host. The wireframe owns the region layout. The pane supplies the quiet edge treatment inside the routed page."
              />
            </LunaPane>
          }
          right={
            <LunaPane borderLeft style={{ paddingLeft: "1rem" }} minHeight="100%">
              <PaneDemoStack items={["Inspector", "Queue", "Context"]} />
            </LunaPane>
          }
        />
      </div>
    </LunaApp>
  )
};
