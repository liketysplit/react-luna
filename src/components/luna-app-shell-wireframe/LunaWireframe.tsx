import type { LunaWireframeProps } from "./LunaWireframe.props";
import "./LunaWireframe.css";

export function LunaWireframe({
  appBar,
  appBarBorder = false,
  left,
  leftBorder = false,
  right,
  rightBorder = false,
  centerTop,
  centerTopBorder = false,
  centerMiddle,
  centerMiddleBorder = false,
  centerBottom,
  centerBottomBorder = false,
  narrow,
}: LunaWireframeProps) {
  const shellClassName = [
    "luna-app-shell-wireframe",
    narrow && "luna-app-shell-wireframe--narrow",
    !left && "luna-app-shell-wireframe--no-left",
    !right && "luna-app-shell-wireframe--no-right"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClassName}>
      {appBar ? (
        <div
          className={[
            "luna-app-shell-wireframe__slot",
            "luna-app-shell-wireframe__slot--app-bar",
            appBarBorder && "luna-app-shell-wireframe__slot--bordered"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {appBar}
        </div>
      ) : null}

      <div className="luna-app-shell-wireframe__body">
        {left ? (
          <div
            className={[
              "luna-app-shell-wireframe__slot",
              "luna-app-shell-wireframe__slot--left",
              leftBorder && "luna-app-shell-wireframe__slot--bordered"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {left}
          </div>
        ) : null}

        <div className="luna-app-shell-wireframe__center">
          {centerTop ? (
            <div
              className={[
                "luna-app-shell-wireframe__slot",
                "luna-app-shell-wireframe__slot--center-top",
                centerTopBorder && "luna-app-shell-wireframe__slot--bordered"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {centerTop}
            </div>
          ) : null}

          <div
            className={[
              "luna-app-shell-wireframe__slot",
              "luna-app-shell-wireframe__slot--center-middle",
              centerMiddleBorder && "luna-app-shell-wireframe__slot--bordered"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {centerMiddle}
          </div>

          {centerBottom ? (
            <div
              className={[
                "luna-app-shell-wireframe__slot",
                "luna-app-shell-wireframe__slot--center-bottom",
                centerBottomBorder && "luna-app-shell-wireframe__slot--bordered"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {centerBottom}
            </div>
          ) : null}
        </div>

        {right ? (
          <div
            className={[
              "luna-app-shell-wireframe__slot",
              "luna-app-shell-wireframe__slot--right",
              rightBorder && "luna-app-shell-wireframe__slot--bordered"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {right}
          </div>
        ) : null}
      </div>
    </div>
  );
}
