import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaBarChart } from "./LunaBarChart";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaBarChart", () => {
  const sampleData = [
    { label: "North", value: 18 },
    { label: "South", value: 24 },
    { label: "West", value: 12 }
  ];

  it("renders the chart bars and values for normal data", () => {
    const { container } = renderWithTheme(
      <LunaBarChart ariaLabel="Regional counts" data={sampleData} title="Regional counts" />
    );

    expect(screen.getByRole("img", { name: "Regional counts" })).toBeInTheDocument();
    expect(container.querySelectorAll(".luna-bar-chart__bar")).toHaveLength(3);
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders the empty state when no data is provided", () => {
    const { container } = renderWithTheme(
      <LunaBarChart ariaLabel="Empty chart" data={[]} title="Regional counts" />
    );
    const emptyState = container.querySelector(".luna-empty-state");

    expect(screen.getByText("No chart data")).toBeInTheDocument();
    expect(emptyState).not.toBeNull();
    expect(
      within(emptyState as HTMLElement).getByText(
        "Add categorical values to render this comparison."
      )
    ).toBeInTheDocument();
  });

  it("renders a loading surface while keeping chart semantics", () => {
    const { container } = renderWithTheme(
      <LunaBarChart
        ariaLabel="Loading regional counts"
        data={sampleData}
        loading
        title="Regional counts"
      />
    );

    expect(screen.getByRole("img", { name: "Loading regional counts" })).toBeInTheDocument();
    expect(container.querySelectorAll(".luna-bar-chart__loading-column")).toHaveLength(5);
  });

  it("renders the error state when a failure message is provided", () => {
    const { container } = renderWithTheme(
      <LunaBarChart
        ariaLabel="Regional counts unavailable"
        data={sampleData}
        error="We could not load the regional counts."
        title="Regional counts"
      />
    );
    const emptyState = container.querySelector(".luna-empty-state");

    expect(screen.getByText("Unable to display chart")).toBeInTheDocument();
    expect(emptyState).not.toBeNull();
    expect(
      within(emptyState as HTMLElement).getByText("We could not load the regional counts.")
    ).toBeInTheDocument();
  });

  it("renders the legend when requested and falls back to a generic label", () => {
    renderWithTheme(
      <LunaBarChart ariaLabel="Regional counts" data={sampleData} showLegend />
    );

    expect(screen.getByText("Values")).toBeInTheDocument();
  });

  it("keeps long category labels available through the title attribute", () => {
    renderWithTheme(
      <LunaBarChart
        ariaLabel="Operational work categories"
        data={[
          {
            label: "Quarterly instrumentation refresh",
            value: 11
          }
        ]}
      />
    );

    expect(screen.getByTitle("Quarterly instrumentation refresh")).toBeInTheDocument();
  });

  it("uses the accessibility label and description on the chart graphic", () => {
    renderWithTheme(
      <LunaBarChart
        ariaLabel="Regional counts bar chart"
        data={sampleData}
        description="Comparison of current regional issue counts."
        title="Regional counts"
      />
    );

    const chart = screen.getByRole("img", { name: "Regional counts bar chart" });
    const description = screen.getByText("Comparison of current regional issue counts.");

    expect(chart).toHaveAttribute("aria-describedby", expect.stringContaining(description.id));
  });

  it("resolves theme-driven bar chart tokens and palette colors", () => {
    const { container } = renderWithTheme(
      <LunaBarChart ariaLabel="Regional counts" data={sampleData} />,
      {
        theme: {
          components: {
            barChart: {
              radius: "pill",
              padding: "6",
              chartHeight: "12rem",
              palette: ["accent.500"],
              modes: {
                light: {
                  bg: "neutral.50",
                  border: "neutral.300",
                  axisText: "neutral.500",
                  axisGrid: "neutral.200",
                  legendText: "neutral.700",
                  valueText: "accent.700",
                  stateText: "neutral.600"
                }
              }
            }
          }
        }
      }
    );

    const root = container.querySelector(".luna-bar-chart");
    const firstBar = container.querySelector(".luna-bar-chart__bar");

    expect(root).toHaveStyle({
      "--luna-bar-chart-radius": "999px",
      "--luna-bar-chart-padding": "1.5rem",
      "--luna-bar-chart-height": "12rem",
      "--luna-bar-chart-bg": "#f8fafc",
      "--luna-bar-chart-border": "#cbd5e1"
    });
    expect(firstBar).toHaveStyle({
      "--luna-bar-chart-current-bar-color": "#8b5cf6"
    });
  });
});
