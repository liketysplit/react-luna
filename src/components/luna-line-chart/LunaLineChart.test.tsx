import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaLineChart } from "./LunaLineChart";

const basicSeries = [
  { x: "Mon", y: 12 },
  { x: "Tue", y: 18 },
  { x: "Wed", y: 14 },
  { x: "Thu", y: 23 },
  { x: "Fri", y: 19 }
];

const denseSeries = Array.from({ length: 18 }, (_, index) => ({
  x: `Day ${index + 1}`,
  y: 40 + index
}));

function renderWithTheme(
  ui: React.ReactElement,
  options?: {
    theme?: React.ComponentProps<typeof ThemeProvider>["theme"];
  }
) {
  return render(<ThemeProvider theme={options?.theme}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaLineChart", () => {
  it("renders a line path and sampled axes for normal data", () => {
    const { container } = renderWithTheme(
      <LunaLineChart
        ariaLabel="Weekly trend"
        ariaDescription="Trend over five days."
        data={basicSeries}
        showMarkers
      />
    );

    const chart = screen.getByRole("group", { name: "Weekly trend" });
    expect(chart).toHaveAttribute("aria-roledescription", "line chart");
    expect(screen.getByText("Trend over five days.")).toBeInTheDocument();
    expect(container.querySelector(".luna-line-chart__series")).toHaveAttribute("d");
    expect(container.querySelectorAll(".luna-line-chart__marker")).toHaveLength(basicSeries.length);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });

  it("samples dense x-axis labels instead of rendering every point label", () => {
    const { container } = renderWithTheme(
      <LunaLineChart ariaLabel="Dense trend" data={denseSeries} />
    );

    expect(container.querySelectorAll(".luna-line-chart__x-axis-label").length).toBeLessThan(
      denseSeries.length
    );
  });

  it("renders the empty state when no valid datapoints exist", () => {
    renderWithTheme(
      <LunaLineChart
        ariaLabel="Empty trend"
        data={[]}
        emptyTitle="No events yet"
        emptyDescription="Waiting for the first event."
      />
    );

    expect(screen.getByText("No events yet")).toBeInTheDocument();
    expect(screen.getByText("Waiting for the first event.")).toBeInTheDocument();
  });

  it("renders the loading state with busy semantics", () => {
    renderWithTheme(<LunaLineChart ariaLabel="Loading trend" data={[]} loading />);

    expect(screen.getByRole("group", { name: "Loading trend" })).toHaveAttribute("aria-busy", "true");
  });

  it("surfaces theme overrides through the provider variables", () => {
    const { container } = renderWithTheme(
      <LunaLineChart ariaLabel="Theme trend" data={basicSeries} />,
      {
        theme: {
          components: {
            lineChart: {
              modes: {
                light: {
                  line: "#123456",
                  grid: "#abcdef"
                }
              }
            }
          }
        }
      }
    );

    const provider = container.querySelector("[data-luna-theme]");
    expect(provider).toHaveStyle({
      "--luna-line-chart-line": "#123456",
      "--luna-line-chart-grid": "#abcdef"
    });
  });
});
