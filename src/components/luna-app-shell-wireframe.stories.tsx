import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import "./luna-app-shell-wireframe.stories.css";

type WireframeArgs = {
  showAppBar: boolean;
  showLeft: boolean;
  showRight: boolean;
  showCenterTop: boolean;
  showCenterBottom: boolean;
  narrow: boolean;
  centerTopDensity: "thin" | "default";
  centerBottomDensity: "thin" | "default";
  centerMiddleMode: "default" | "stretched";
};

function Region({
  label,
  detail,
  tone = "default",
  children
}: {
  label: string;
  detail: string;
  tone?: "default" | "chrome" | "emphasis";
  children?: React.ReactNode;
}) {
  return (
    <section
      className="luna-app-shell-wireframe__region"
      data-tone={tone}
      aria-label={label}
    >
      <header className="luna-app-shell-wireframe__region-header">
        <span className="luna-app-shell-wireframe__region-label">{label}</span>
        <span className="luna-app-shell-wireframe__region-detail">{detail}</span>
      </header>
      {children ? <div className="luna-app-shell-wireframe__region-body">{children}</div> : null}
    </section>
  );
}

function ShellWireframe({
  showAppBar,
  showLeft,
  showRight,
  showCenterTop,
  showCenterBottom,
  narrow,
  centerTopDensity,
  centerBottomDensity,
  centerMiddleMode
}: WireframeArgs) {
  const shellClassName = [
    "luna-app-shell-wireframe",
    narrow && "luna-app-shell-wireframe--narrow",
    !showAppBar && "luna-app-shell-wireframe--no-app-bar",
    !showLeft && "luna-app-shell-wireframe--no-left",
    !showRight && "luna-app-shell-wireframe--no-right"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="luna-app-shell-wireframe-story">
      <div className={shellClassName}>
        {showAppBar ? (
          <Region
            label="App Bar"
            detail="Persistent page chrome, command entry, identity"
            tone="chrome"
          >
            <div className="luna-app-shell-wireframe__chip-row">
              <span className="luna-app-shell-wireframe__chip">Brand</span>
              <span className="luna-app-shell-wireframe__chip">Primary action</span>
              <span className="luna-app-shell-wireframe__chip">Search / account</span>
            </div>
          </Region>
        ) : null}

        <div className="luna-app-shell-wireframe__body">
          {showLeft ? (
            <Region
              label="Left"
              detail="Navigation, filters, pinned workspace context"
            >
              <div className="luna-app-shell-wireframe__stack">
                <div className="luna-app-shell-wireframe__mini-block">Section nav</div>
                <div className="luna-app-shell-wireframe__mini-block">Saved views</div>
                <div className="luna-app-shell-wireframe__mini-block">Working set</div>
              </div>
            </Region>
          ) : null}

          <div className="luna-app-shell-wireframe__center">
            {showCenterTop ? (
              <Region
                label="Center Top"
                detail="Page intro, KPIs, alerts, active state summary"
                tone="emphasis"
              >
                <div
                  className="luna-app-shell-wireframe__hero-band"
                  data-density={centerTopDensity}
                >
                  <div
                    className="luna-app-shell-wireframe__hero-panel"
                    data-density={centerTopDensity}
                  >
                    Page header
                  </div>
                  <div
                    className="luna-app-shell-wireframe__hero-panel"
                    data-density={centerTopDensity}
                  >
                    Summary band
                  </div>
                </div>
              </Region>
            ) : null}

            <Region
              label="Center Middle"
              detail="Primary task surface, table, board, editor, or feed"
            >
              <div
                className="luna-app-shell-wireframe__canvas"
                data-mode={centerMiddleMode}
              >
                <div className="luna-app-shell-wireframe__canvas-toolbar">
                  <span className="luna-app-shell-wireframe__chip">Scope</span>
                  <span className="luna-app-shell-wireframe__chip">Sort</span>
                  <span className="luna-app-shell-wireframe__chip">Actions</span>
                </div>
                <div
                  className="luna-app-shell-wireframe__canvas-body"
                  data-mode={centerMiddleMode}
                >
                  <div
                    className="luna-app-shell-wireframe__canvas-card"
                    data-mode={centerMiddleMode}
                  >
                    Primary surface
                  </div>
                  <div
                    className="luna-app-shell-wireframe__canvas-card"
                    data-mode={centerMiddleMode}
                  >
                    Supporting panel
                  </div>
                  {centerMiddleMode === "stretched" ? (
                    <>
                      <div
                        className="luna-app-shell-wireframe__canvas-card"
                        data-mode={centerMiddleMode}
                      >
                        Content runway
                      </div>
                      <div
                        className="luna-app-shell-wireframe__canvas-card"
                        data-mode={centerMiddleMode}
                      >
                        Lower workspace
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </Region>

            {showCenterBottom ? (
              <Region
                label="Center Bottom"
                detail="Secondary context, history, related tasks, timeline"
              >
                <div
                  className="luna-app-shell-wireframe__footer-band"
                  data-density={centerBottomDensity}
                >
                  <div
                    className="luna-app-shell-wireframe__mini-block"
                    data-density={centerBottomDensity}
                  >
                    Recent activity
                  </div>
                  <div
                    className="luna-app-shell-wireframe__mini-block"
                    data-density={centerBottomDensity}
                  >
                    Related work
                  </div>
                  <div
                    className="luna-app-shell-wireframe__mini-block"
                    data-density={centerBottomDensity}
                  >
                    System notes
                  </div>
                </div>
              </Region>
            ) : null}
          </div>

          {showRight ? (
            <Region
              label="Right"
              detail="Inspector, queue, context drawer, secondary actions"
            >
              <div className="luna-app-shell-wireframe__stack">
                <div className="luna-app-shell-wireframe__mini-block">Inspector</div>
                <div className="luna-app-shell-wireframe__mini-block">Activity</div>
                <div className="luna-app-shell-wireframe__mini-block">Tools</div>
              </div>
            </Region>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/LunaAppShellWireframe",
  parameters: {
    layout: "fullscreen"
  },
  args: {
    showAppBar: true,
    showLeft: true,
    showRight: true,
    showCenterTop: true,
    showCenterBottom: true,
    narrow: false,
    centerTopDensity: "default",
    centerBottomDensity: "default",
    centerMiddleMode: "default"
  },
  render: (args) => <ShellWireframe {...args} />
} satisfies Meta<WireframeArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
