import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaAlert } from "./LunaAlert";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaAlert", () => {
  it("renders the default inline alert contract", () => {
    renderWithTheme(<LunaAlert title="Mission update">Orbit confirmed.</LunaAlert>);

    const alert = document.querySelector(".luna-alert");

    expect(alert).toHaveAttribute("data-tone", "neutral");
    expect(alert).toHaveAttribute("data-emphasis", "soft");
    expect(screen.getByText("Mission update")).toBeInTheDocument();
    expect(screen.getByText("Orbit confirmed.")).toBeInTheDocument();
  });

  it("renders icon content and native semantics passthrough", () => {
    renderWithTheme(
      <LunaAlert title="Warning" icon={<span data-testid="alert-icon">!</span>} role="alert">
        Check the launch path.
      </LunaAlert>
    );

    const alert = screen.getByRole("alert");

    expect(alert.querySelector(".luna-alert__icon")).toBeInTheDocument();
    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
  });

  it("resolves padding and gap through theme spacing tokens", () => {
    renderWithTheme(
      <LunaAlert title="Spacing" padding="6" gap="2">
        Calibrated spacing.
      </LunaAlert>
    );

    const alert = document.querySelector(".luna-alert");

    expect(alert).toHaveStyle({
      "--luna-alert-padding": "1.5rem",
      "--luna-alert-gap": "0.5rem"
    });
  });

  it("supports a title-only alert", () => {
    renderWithTheme(<LunaAlert title="Telemetry synced" />);

    const alert = document.querySelector(".luna-alert");

    expect(screen.getByText("Telemetry synced")).toBeInTheDocument();
    expect(alert).toHaveClass("luna-alert--title-only");
  });

  it("uses theme overrides for alert defaults and tone tokens", () => {
    const { container } = renderWithTheme(
      <LunaAlert tone="info" emphasis="outline" title="Theme override">
        Custom alert theme.
      </LunaAlert>,
      {
        theme: {
          components: {
            alert: {
              defaultPadding: "6",
              tones: {
                light: {
                  info: {
                    outline: {
                      border: "accent.500"
                    }
                  }
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");

    expect(providerRoot).toHaveStyle({
      "--luna-alert-padding-default": "1.5rem",
      "--luna-alert-info-outline-border": "#8b5cf6"
    });
  });
});
