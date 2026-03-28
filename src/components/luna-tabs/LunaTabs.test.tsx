import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaTabs } from "./LunaTabs";
import type { LunaTabsItem } from "./LunaTabs.props";

const items: LunaTabsItem[] = [
  {
    value: "overview",
    label: "Overview",
    panel: <div>Overview panel</div>
  },
  {
    value: "payload",
    label: "Payload",
    panel: <div>Payload panel</div>
  },
  {
    value: "archive",
    label: "Archive",
    panel: <div>Archive panel</div>,
    disabled: true
  }
];

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaTabs", () => {
  it("selects the first enabled item by default", () => {
    renderWithTheme(<LunaTabs items={items} />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const payloadTab = screen.getByRole("tab", { name: "Payload" });
    const payloadPanel = document.getElementById(payloadTab.getAttribute("aria-controls") ?? "");

    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Overview" })).toHaveTextContent("Overview panel");
    expect(payloadPanel).toBeInTheDocument();
    expect(payloadPanel).toHaveAttribute("hidden");
  });

  it("supports controlled selection and reports value changes on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderWithTheme(<LunaTabs items={items} value="overview" onValueChange={onValueChange} />);

    await user.click(screen.getByRole("tab", { name: "Payload" }));

    expect(onValueChange).toHaveBeenCalledWith("payload");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus and selection with arrow keys in automatic mode", async () => {
    const user = userEvent.setup();

    renderWithTheme(<LunaTabs items={items} />);

    await user.tab();
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");

    const payloadTab = screen.getByRole("tab", { name: "Payload" });

    expect(payloadTab).toHaveFocus();
    expect(payloadTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Payload" })).toHaveTextContent("Payload panel");
  });

  it("keeps manual activation separate from focus movement until Enter is pressed", async () => {
    const user = userEvent.setup();

    renderWithTheme(<LunaTabs items={items} activationMode="manual" />);

    await user.tab();
    await user.keyboard("{ArrowRight}");

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const payloadTab = screen.getByRole("tab", { name: "Payload" });

    expect(payloadTab).toHaveFocus();
    expect(overviewTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Enter}");

    expect(payloadTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Payload" })).toHaveTextContent("Payload panel");
  });

  it("uses vertical navigation keys when requested", async () => {
    const user = userEvent.setup();

    renderWithTheme(<LunaTabs items={items} orientation="vertical" />);

    await user.tab();
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("tab", { name: "Payload" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Payload" })).toHaveAttribute("aria-selected", "true");
  });

  it("skips disabled items during keyboard navigation and Home or End targeting", async () => {
    const user = userEvent.setup();

    renderWithTheme(<LunaTabs items={items} />);

    await user.tab();
    await user.keyboard("{End}");

    expect(screen.getByRole("tab", { name: "Payload" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Payload" })).toHaveAttribute("aria-selected", "true");
  });

  it("uses theme defaults for size and exposes tab theme variables", () => {
    const { container } = renderWithTheme(<LunaTabs items={items} />, {
      theme: {
        components: {
          tabs: {
            defaultSize: "large",
            radius: "lg",
            modes: {
              light: {
                tabActiveBg: "accent.500",
                panelBorder: "accent.600"
              }
            }
          }
        }
      }
    });

    expect(screen.getByRole("tablist").closest(".luna-tabs")).toHaveAttribute("data-size", "large");

    const providerRoot = container.querySelector("[data-luna-theme]");

    expect(providerRoot).toHaveStyle({
      "--luna-tabs-radius": "0.75rem",
      "--luna-tabs-tab-active-bg": "#8b5cf6",
      "--luna-tabs-panel-border": "#7c3aed"
    });
  });

  it("warns when duplicate item values are provided", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaTabs
        items={[
          {
            value: "overview",
            label: "Overview",
            panel: <div>One</div>
          },
          {
            value: "overview",
            label: "Overview again",
            panel: <div>Two</div>
          }
        ]}
      />
    );

    expect(warnSpy).toHaveBeenCalledWith(
      'LunaTabs: duplicate item value "overview" was provided.'
    );
  });
});
