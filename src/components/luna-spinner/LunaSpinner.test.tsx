import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaSpinner } from "./LunaSpinner";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSpinner", () => {
  it("renders a decorative spinner by default", () => {
    renderWithTheme(<LunaSpinner data-testid="spinner" />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toHaveAttribute("aria-hidden", "true");
    expect(spinner).not.toHaveAttribute("role");
    expect(spinner).toHaveAttribute("data-size", "medium");
    expect(spinner.querySelectorAll(".luna-spinner__track")).toHaveLength(1);
    expect(spinner.querySelectorAll(".luna-spinner__indicator")).toHaveLength(1);
  });

  it("uses status semantics and the default loading label when decorative is false", () => {
    renderWithTheme(<LunaSpinner decorative={false} />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("prefers the explicit label for semantic usage", () => {
    renderWithTheme(<LunaSpinner decorative={false} label="Loading navigation" />);

    expect(screen.getByRole("status", { name: "Loading navigation" })).toBeInTheDocument();
  });

  it("resolves size tokens and theme color values", () => {
    renderWithTheme(<LunaSpinner data-testid="spinner" size="large" color="accent.500" />);

    expect(screen.getByTestId("spinner")).toHaveStyle({
      "--luna-spinner-current-size": "1.5rem",
      "--luna-spinner-current-color": "#8b5cf6"
    });
  });

  it("uses user theme spinner defaults when provided", () => {
    renderWithTheme(<LunaSpinner data-testid="spinner" />, {
      theme: {
        components: {
          spinner: {
            defaultSize: "large",
            duration: "slow",
            defaultLabel: "Syncing orbit",
            sizes: {
              large: {
                size: "2.25rem",
                strokeWidth: "0.3125rem"
              }
            },
            modes: {
              light: {
                color: "success.500",
                track: "rgba(16, 185, 129, 0.2)"
              }
            }
          }
        }
      }
    });

    expect(screen.getByTestId("spinner")).toHaveStyle({
      "--luna-spinner-current-size": "2.25rem",
      "--luna-spinner-current-color": "#10b981",
      "--luna-spinner-current-track": "rgba(16, 185, 129, 0.2)",
      "--luna-spinner-current-stroke-width": "0.3125rem",
      "--luna-spinner-current-duration": "260ms"
    });

    cleanup();
    renderWithTheme(
      <LunaSpinner decorative={false} />,
      {
        theme: {
          components: {
            spinner: {
              defaultLabel: "Syncing orbit"
            }
          }
        }
      }
    );

    expect(screen.getByRole("status", { name: "Syncing orbit" })).toBeInTheDocument();
  });

  it("supports custom element rendering", () => {
    renderWithTheme(<LunaSpinner as="div" data-testid="spinner" />);

    expect(screen.getByTestId("spinner").tagName).toBe("DIV");
  });
});
