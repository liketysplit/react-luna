import { LunaWireframe } from "./";
import type { LunaWireframeProps } from "./LunaWireframe.props";
import { LunaPanel } from "../luna-panel";
import {
  LunaWireframeDemoBand,
  LunaWireframeDemoCanvas,
  LunaWireframeDemoChipRow,
  LunaWireframeDemoFooter,
  LunaWireframeDemoStack
} from "./LunaWireframe.demo";

export type LunaWireframeStoryArgs = {
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

function AppBarContent() {
  return (
    <LunaPanel
      title="App Bar"
      description="Persistent page chrome, command entry, identity"
      tone="chrome"
    >
      <LunaWireframeDemoChipRow items={["Brand", "Primary action", "Search / account"]} />
    </LunaPanel>
  );
}

function LeftRailContent() {
  return (
    <LunaPanel
      title="Left"
      description="Navigation, filters, pinned workspace context"
    >
      <LunaWireframeDemoStack items={["Section nav", "Saved views", "Working set"]} />
    </LunaPanel>
  );
}

function CenterTopContent({
  density
}: {
  density: LunaWireframeStoryArgs["centerTopDensity"];
}) {
  return (
    <LunaPanel
      title="Center Top"
      description="Page intro, KPIs, alerts, active state summary"
      tone="emphasis"
    >
      <LunaWireframeDemoBand items={["Page header", "Summary band"]} density={density} />
    </LunaPanel>
  );
}

function CenterMiddleContent({
  mode
}: {
  mode: LunaWireframeStoryArgs["centerMiddleMode"];
}) {
  return (
    <LunaPanel
      title="Center Middle"
      description="Primary task surface, table, board, editor, or feed"
    >
      <LunaWireframeDemoCanvas
        toolbarItems={["Scope", "Sort", "Actions"]}
        cardItems={
          mode === "stretched"
            ? ["Primary surface", "Supporting panel", "Content runway", "Lower workspace"]
            : ["Primary surface", "Supporting panel"]
        }
        mode={mode}
      />
    </LunaPanel>
  );
}

function CenterBottomContent({
  density
}: {
  density: LunaWireframeStoryArgs["centerBottomDensity"];
}) {
  return (
    <LunaPanel
      title="Center Bottom"
      description="Secondary context, history, related tasks, timeline"
    >
      <LunaWireframeDemoFooter
        items={["Recent activity", "Related work", "System notes"]}
        density={density}
      />
    </LunaPanel>
  );
}

function RightRailContent() {
  return (
    <LunaPanel
      title="Right"
      description="Inspector, queue, context drawer, secondary actions"
    >
      <LunaWireframeDemoStack items={["Inspector", "Activity", "Tools"]} />
    </LunaPanel>
  );
}

export const defaultWireframeStoryArgs: LunaWireframeStoryArgs = {
  showAppBar: true,
  showLeft: true,
  showRight: true,
  showCenterTop: true,
  showCenterBottom: true,
  narrow: false,
  centerTopDensity: "default",
  centerBottomDensity: "default",
  centerMiddleMode: "default"
};

export function renderLunaWireframeStory(
  args: LunaWireframeStoryArgs
) {
  const componentArgs: LunaWireframeProps = {
    appBar: args.showAppBar ? <AppBarContent /> : undefined,
    left: args.showLeft ? <LeftRailContent /> : undefined,
    right: args.showRight ? <RightRailContent /> : undefined,
    centerTop: args.showCenterTop ? (
      <CenterTopContent density={args.centerTopDensity} />
    ) : undefined,
    centerMiddle: <CenterMiddleContent mode={args.centerMiddleMode} />,
    centerBottom: args.showCenterBottom ? (
      <CenterBottomContent density={args.centerBottomDensity} />
    ) : undefined,
    narrow: args.narrow
  };

  return (
    <div className="luna-app-shell-wireframe-story">
      <LunaWireframe {...componentArgs} />
    </div>
  );
}

export function renderLunaWireframeTextStory() {
  return (
    <div className="luna-app-shell-wireframe-story">
      <LunaWireframe
        appBar="Brand Primary action Search account"
        left="Section nav Saved views Working set"
        right="Inspector Activity Tools"
        centerTop="Page header Summary band"
        centerMiddle="Primary surface Supporting panel"
        centerBottom="Recent activity Related work System notes"
      />
    </div>
  );
}
