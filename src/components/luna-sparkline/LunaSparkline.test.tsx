import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaSparkline } from "./LunaSparkline";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSparkline", () => {
  it("renders ordered data without crashing", () => {
    const { container } = renderWithTheme(
      <LunaSparkline ariaLabel="Seven day trend" data={[8, 12, 10, 15, 18]} />
    );

    const sparkline = screen.getByRole("img", { name: "Seven day trend" });
    const path = container.querySelector(".luna-sparkline__line");

    expect(sparkline).toHaveAttribute("data-series-length", "5");
    expect(path).toHaveAttribute("d");
    expect(path?.getAttribute("d")).toContain("L");
  });

  it("handles empty and very short series with a minimal visual contract", () => {
    const { rerender } = renderWithTheme(
      <LunaSparkline ariaLabel="No trend data" data={[]} data-testid="sparkline" />
    );

    expect(screen.getByTestId("sparkline")).toHaveAttribute("data-empty", "true");
    expect(screen.getByTestId("sparkline")).toHaveAttribute("data-series-length", "0");

    rerender(
      <ThemeProvider>
        <LunaSparkline ariaLabel="One recorded point" data={[42]} data-testid="sparkline" />
      </ThemeProvider>
    );

    expect(screen.getByTestId("sparkline")).not.toHaveAttribute("data-empty");
    expect(screen.getByTestId("sparkline")).toHaveAttribute("data-series-length", "1");
  });

  it("uses the required accessibility label as the image name", () => {
    renderWithTheme(<LunaSparkline ariaLabel="Revenue trend for the last week" data={[3, 5, 7]} />);

    expect(screen.getByRole("img", { name: "Revenue trend for the last week" })).toBeVisible();
  });

  it("resolves size, tone, and empty state colors from the user theme", () => {
    renderWithTheme(
      <LunaSparkline
        ariaLabel="No trend data"
        data={[]}
        tone="positive"
        size="compact"
        data-testid="sparkline"
      />,
      {
        theme: {
          components: {
            sparkline: {
              strokeWidth: "0.25rem",
              sizes: {
                compact: {
                  width: "10",
                  height: "4"
                }
              },
              tones: {
                positive: {
                  stroke: "accent.500"
                }
              },
              modes: {
                light: {
                  emptyStroke: "accent.300"
                }
              }
            }
          }
        }
      }
    );

    expect(screen.getByTestId("sparkline")).toHaveStyle({
      "--luna-sparkline-current-width": "2.5rem",
      "--luna-sparkline-current-height": "1rem",
      "--luna-sparkline-current-stroke-width": "0.25rem",
      "--luna-sparkline-current-stroke": "#8b5cf6",
      "--luna-sparkline-current-empty-stroke": "#c4b5fd"
    });
  });
});
