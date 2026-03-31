type DemoDensity = "thin" | "default";
type DemoMode = "default" | "stretched";

export function LunaWireframeDemoChipRow({
  items
}: {
  items: string[];
}) {
  return (
    <div className="luna-app-shell-wireframe-demo__chip-row">
      {items.map((item) => (
        <span
          key={item}
          className="luna-app-shell-wireframe-demo__chip"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function LunaWireframeDemoStack({
  items
}: {
  items: string[];
}) {
  return (
    <div className="luna-app-shell-wireframe-demo__stack">
      {items.map((item) => (
        <div
          key={item}
          className="luna-app-shell-wireframe-demo__mini-block"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function LunaWireframeDemoBand({
  items,
  density = "default"
}: {
  items: string[];
  density?: DemoDensity;
}) {
  return (
    <div
      className="luna-app-shell-wireframe-demo__hero-band"
      data-density={density}
    >
      {items.map((item) => (
        <div
          key={item}
          className="luna-app-shell-wireframe-demo__hero-panel"
          data-density={density}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function LunaWireframeDemoFooter({
  items,
  density = "default"
}: {
  items: string[];
  density?: DemoDensity;
}) {
  return (
    <div
      className="luna-app-shell-wireframe-demo__footer-band"
      data-density={density}
    >
      {items.map((item) => (
        <div
          key={item}
          className="luna-app-shell-wireframe-demo__mini-block"
          data-density={density}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function LunaWireframeDemoCanvas({
  toolbarItems,
  cardItems,
  mode = "default"
}: {
  toolbarItems: string[];
  cardItems: string[];
  mode?: DemoMode;
}) {
  return (
    <div
      className="luna-app-shell-wireframe-demo__canvas"
      data-mode={mode}
    >
      <div className="luna-app-shell-wireframe-demo__canvas-toolbar">
        {toolbarItems.map((item) => (
          <span
            key={item}
            className="luna-app-shell-wireframe-demo__chip"
          >
            {item}
          </span>
        ))}
      </div>
      <div
        className="luna-app-shell-wireframe-demo__canvas-body"
        data-mode={mode}
      >
        {cardItems.map((item) => (
          <div
            key={item}
            className="luna-app-shell-wireframe-demo__canvas-card"
            data-mode={mode}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
