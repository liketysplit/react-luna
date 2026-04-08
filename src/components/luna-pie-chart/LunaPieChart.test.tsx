import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaPieChart } from "./LunaPieChart";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaPieChart", () => {
  const data = [
    { label: "Returning", value: 60 },
    { label: "New", value: 30 },
    { label: "Partner", value: 10 }
  ];

  it("renders a chart image and legend entries for normal data", () => {
    renderWithTheme(
      <LunaPieChart
        ariaLabel="Traffic share by source"
        data={data}
        title="Traffic share"
      />
    );

    expect(screen.getByRole("img", { name: "Traffic share by source" })).toBeInTheDocument();
    expect(screen.getByText("Returning")).toBeInTheDocument();
    expect(screen.getByText("60% • 60")).toBeInTheDocument();
    expect(screen.getByText("Partner")).toBeInTheDocument();
  });

  it("renders the empty state when no positive data is available", () => {
    renderWithTheme(
      <LunaPieChart
        ariaLabel="No data"
        data={[
          { label: "Returning", value: 0 },
          { label: "New", value: -4 }
        ]}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Nothing to plot yet");
    expect(screen.queryByRole("img", { name: "No data" })).not.toBeInTheDocument();
  });

  it("keeps the legend in the DOM even when it is visually hidden", () => {
    renderWithTheme(<LunaPieChart ariaLabel="Quiet chart" data={data} showLegend={false} />);

    const legendLabel = screen.getByText("Returning");
    expect(legendLabel.closest(".luna-pie-chart__legend")).toHaveClass(
      "luna-pie-chart__legend--hidden"
    );
  });

  it("exposes the accessibility naming contract through the chart image", () => {
    renderWithTheme(
      <LunaPieChart
        ariaLabel="Plan mix for current month"
        data={data}
        description="Share by active plan tier."
      />
    );

    const chart = screen.getByRole("img", { name: "Plan mix for current month" });
    expect(chart).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Share by active plan tier.")).toHaveAttribute("id");
  });

  it("resolves theme-driven sizing and color tokens", () => {
    renderWithTheme(<LunaPieChart ariaLabel="Branded mix" data={data} data-testid="chart" size="roomy" />, {
      theme: {
        components: {
          pieChart: {
            radius: "md",
            palette: ["accent.500"],
            sizes: {
              roomy: {
                chartSize: "16",
                gap: "6",
                legendGap: "4",
                legendSwatchSize: "5",
                minHeight: "16"
              }
            },
            modes: {
              light: {
                bg: "neutral.100",
                border: "neutral.300",
                separator: "neutral.100"
              }
            }
          }
        }
      }
    });

    expect(screen.getByTestId("chart")).toHaveStyle({
      "--luna-pie-chart-current-chart-size": "4rem",
      "--luna-pie-chart-current-gap": "1.5rem",
      "--luna-pie-chart-current-legend-gap": "1rem",
      "--luna-pie-chart-current-legend-swatch-size": "1.25rem",
      "--luna-pie-chart-current-min-height": "4rem",
      "--luna-pie-chart-current-radius": "0.5rem",
      "--luna-pie-chart-current-bg": "#f1f5f9"
    });
  });
});
