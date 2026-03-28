import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaProgress } from "./LunaProgress";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaProgress", () => {
  it("renders determinate progress semantics and formatted value text", () => {
    renderWithTheme(<LunaProgress label="Upload" value={32} showValue />);

    const progressbar = screen.getByRole("progressbar", { name: "Upload" });

    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-valuenow", "32");
    expect(screen.getByText("32%")).toBeInTheDocument();
  });

  it("clamps determinate progress to the provided bounds", () => {
    renderWithTheme(<LunaProgress label="Setup" min={10} max={30} value={90} showValue />);

    const progressbar = screen.getByRole("progressbar", { name: "Setup" });

    expect(progressbar).toHaveAttribute("aria-valuemin", "10");
    expect(progressbar).toHaveAttribute("aria-valuemax", "30");
    expect(progressbar).toHaveAttribute("aria-valuenow", "30");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("omits numeric progress semantics in indeterminate mode", () => {
    renderWithTheme(<LunaProgress label="Processing" indeterminate />);

    const root = screen.getByText("Processing").closest(".luna-progress");
    const progressbar = screen.getByRole("progressbar", { name: "Processing" });

    expect(progressbar).not.toHaveAttribute("aria-valuemin");
    expect(progressbar).not.toHaveAttribute("aria-valuemax");
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
    expect(root).toHaveAttribute("data-indeterminate", "true");
  });

  it("supports custom visible value labels", () => {
    renderWithTheme(<LunaProgress label="Upload" value={45} valueLabel="3 of 7 files" />);

    expect(screen.getByText("3 of 7 files")).toBeInTheDocument();
  });

  it("resolves size and tone from the user theme", () => {
    renderWithTheme(<LunaProgress data-testid="progress" size="roomy" tone="brand" />, {
      theme: {
        components: {
          progress: {
            defaultTone: "neutral",
            radius: "md",
            indeterminateDuration: "slow",
            sizes: {
              roomy: {
                height: "1"
              }
            },
            tones: {
              brand: {
                fill: "accent.500",
                glow: "rgba(139, 92, 246, 0.3)"
              }
            }
          }
        }
      }
    });

    expect(screen.getByTestId("progress")).toHaveStyle({
      "--luna-progress-current-height": "0.25rem",
      "--luna-progress-current-fill": "#8b5cf6",
      "--luna-progress-current-radius": "0.5rem",
      "--luna-progress-current-indeterminate-duration": "260ms"
    });
  });

  it("links descriptions to the progressbar", () => {
    renderWithTheme(<LunaProgress label="Sync" description="Preparing records" value={20} />);

    const description = screen.getByText("Preparing records");
    const progressbar = screen.getByRole("progressbar", { name: "Sync" });

    expect(progressbar).toHaveAttribute("aria-describedby", description.id);
  });
});
