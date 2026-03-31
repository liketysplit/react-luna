import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaScatterChart } from "./LunaScatterChart";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaScatterChart", () => {
  const sampleData = [
    { label: "North", x: 8, y: 22 },
    { label: "South", x: 14, y: 38 },
    { label: "West", x: 28, y: 51 }
  ];

  it("renders scatter points for normal data", () => {
    const { container } = renderWithTheme(
      <LunaScatterChart ariaLabel="Regional relationship" data={sampleData} title="Regional relationship" />
    );

    expect(screen.getByRole("img", { name: "Regional relationship" })).toBeInTheDocument();
    expect(container.querySelectorAll(".luna-scatter-chart__point")).toHaveLength(3);
    expect(screen.getByTitle("North: x 8, y 22")).toBeInTheDocument();
  });

  it("renders the empty state when no data is provided", () => {
    renderWithTheme(
      <LunaScatterChart ariaLabel="Empty scatter chart" data={[]} title="Regional relationship" />
    );

    expect(screen.getByText("No chart data")).toBeInTheDocument();
    expect(
      screen.getByText("Add paired numeric values to render the relationship.")
    ).toBeInTheDocument();
  });

  it("renders clustered and sparse datasets without changing the single-series contract", () => {
    const clusteredData = [
      { label: "A1", x: 11, y: 42 },
      { label: "A2", x: 12, y: 44 },
      { label: "A3", x: 14, y: 43 },
      { label: "Outlier", x: 30, y: 67 }
    ];
    const { container, rerender } = renderWithTheme(
      <ThemeProvider>
        <LunaScatterChart ariaLabel="Clustered points" data={clusteredData} />
      </ThemeProvider>
    );

    expect(container.querySelectorAll(".luna-scatter-chart__point")).toHaveLength(4);
    expect(screen.getByTitle("Outlier: x 30, y 67")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaScatterChart
          ariaLabel="Sparse points"
          data={[
            { label: "Low", x: 3, y: 12 },
            { label: "High", x: 40, y: 44 }
          ]}
        />
      </ThemeProvider>
    );

    expect(container.querySelectorAll(".luna-scatter-chart__point")).toHaveLength(2);
    expect(screen.getByTitle("High: x 40, y 44")).toBeInTheDocument();
  });

  it("renders the legend when requested", () => {
    renderWithTheme(
      <LunaScatterChart ariaLabel="Regional relationship" data={sampleData} showLegend title="Regional relationship" />
    );

    expect(screen.getByRole("heading", { name: "Regional relationship" })).toBeInTheDocument();
    expect(screen.getByText("3 points")).toBeInTheDocument();
  });

  it("uses the accessibility label and description on the chart graphic", () => {
    renderWithTheme(
      <LunaScatterChart
        ariaLabel="Regional relationship scatter chart"
        ariaDescription="Scatter chart describing the relationship between activity and completion."
        data={sampleData}
        description="Visible description"
        title="Regional relationship"
      />
    );

    const chart = screen.getByRole("img", { name: "Regional relationship scatter chart" });

    expect(chart).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Scatter chart describing the relationship between activity and completion.")).toBeInTheDocument();
  });

  it("renders loading and error states with the same chart surface", () => {
    const { container, rerender } = renderWithTheme(
      <LunaScatterChart ariaLabel="Loading chart" data={sampleData} loading />
    );

    expect(container.querySelector(".luna-scatter-chart__loading")).not.toBeNull();

    rerender(
      <ThemeProvider>
        <LunaScatterChart
          ariaLabel="Chart unavailable"
          data={sampleData}
          error="We could not load the paired relationship data."
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Unable to display chart")).toBeInTheDocument();
    expect(
      screen.getAllByText("We could not load the paired relationship data.").length
    ).toBeGreaterThan(0);
  });

  it("resolves theme-driven scatter chart tokens and palette color", () => {
    const { container } = renderWithTheme(
      <LunaScatterChart ariaLabel="Regional relationship" data={sampleData} />,
      {
        theme: {
          components: {
            scatterChart: {
              radius: "pill",
              padding: "6",
              chartHeight: "12rem",
              pointSize: "4",
              palette: ["accent.500"],
              modes: {
                light: {
                  bg: "neutral.50",
                  border: "neutral.300",
                  plotBg: "neutral.100",
                  axisText: "neutral.500",
                  axisLine: "neutral.400",
                  grid: "neutral.200",
                  legendText: "neutral.700",
                  legendMetaText: "neutral.500",
                  stateText: "neutral.600"
                }
              }
            }
          }
        }
      }
    );

    const root = container.querySelector(".luna-scatter-chart");

    expect(root).toHaveStyle({
      "--luna-scatter-chart-radius": "999px",
      "--luna-scatter-chart-padding": "1.5rem",
      "--luna-scatter-chart-height": "12rem",
      "--luna-scatter-chart-point-size": "1rem",
      "--luna-scatter-chart-bg": "#f8fafc",
      "--luna-scatter-chart-border": "#cbd5e1",
      "--luna-scatter-chart-current-point-color": "#8b5cf6"
    });
  });
});
