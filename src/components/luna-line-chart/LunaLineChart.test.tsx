import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaLineChart } from "./LunaLineChart";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

const sparseData = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 16 },
  { label: "Thu", value: 22 }
];

const denseData = Array.from({ length: 14 }, (_, index) => ({
  label: `P${index + 1}`,
  value: 12 + index * 2
}));

describe("LunaLineChart", () => {
  it("renders a semantic chart surface for normal data", () => {
    renderWithTheme(
      <LunaLineChart
        ariaLabel="Weekly trend chart"
        data={sparseData}
        description="Performance over four points"
        title="Weekly trend"
      />
    );

    const chart = screen.getByRole("img", { name: "Weekly trend chart" });

    expect(chart).toBeInTheDocument();
    expect(chart.querySelector(".luna-line-chart__line")).toBeInTheDocument();
    expect(chart.querySelectorAll(".luna-line-chart__marker")).toHaveLength(4);
  });

  it("renders the empty state when no data is present", () => {
    renderWithTheme(<LunaLineChart ariaLabel="Empty trend chart" data={[]} />);

    expect(screen.getByText("No data yet")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Empty trend chart" })).not.toBeInTheDocument();
  });

  it("suppresses markers for denser data to reduce clutter", () => {
    renderWithTheme(<LunaLineChart ariaLabel="Dense trend chart" data={denseData} />);

    const chart = screen.getByRole("img", { name: "Dense trend chart" });

    expect(chart.querySelector(".luna-line-chart__line")).toBeInTheDocument();
    expect(chart.querySelectorAll(".luna-line-chart__marker")).toHaveLength(0);
  });

  it("renders the legend when requested", () => {
    renderWithTheme(
      <LunaLineChart
        ariaLabel="Requests trend chart"
        data={sparseData}
        legendLabel="Requests"
        showLegend
      />
    );

    expect(screen.getByText("Requests")).toBeInTheDocument();
  });

  it("uses the title as the accessible name when ariaLabel is not provided", () => {
    renderWithTheme(<LunaLineChart data={sparseData} title="Request trend" />);

    expect(screen.getByRole("img", { name: "Request trend" })).toBeInTheDocument();
  });

  it("applies theme-driven chart variables", () => {
    renderWithTheme(
      <LunaLineChart ariaLabel="Themed chart" data={sparseData} />,
      {
        theme: {
          components: {
            lineChart: {
              height: "16",
              padding: "6",
              radius: "lg",
              lineWidth: "5",
              markerSize: "6",
              modes: {
                light: {
                  line: "accent.500",
                  axisFg: "neutral.700",
                  stateBg: "neutral.100"
                }
              }
            }
          }
        }
      }
    );

    expect(screen.getByText("Mon").closest(".luna-line-chart")).toHaveStyle({
      "--luna-line-chart-height": "4rem",
      "--luna-line-chart-padding": "1.5rem",
      "--luna-line-chart-radius": "0.75rem",
      "--luna-line-chart-line-width": "5",
      "--luna-line-chart-marker-size": "6",
      "--luna-line-chart-line": "#8b5cf6",
      "--luna-line-chart-axis-fg": "#334155",
      "--luna-line-chart-state-bg": "#f1f5f9"
    });
  });
});
