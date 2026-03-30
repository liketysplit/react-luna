import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaNotification } from "./LunaNotification";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaNotification", () => {
  it("renders the default persistent notification contract", () => {
    renderWithTheme(<LunaNotification title="Mission update">Orbit confirmed.</LunaNotification>);

    const notification = document.querySelector(".luna-notification");

    expect(notification).toHaveAttribute("data-tone", "neutral");
    expect(notification).toHaveAttribute("data-emphasis", "soft");
    expect(screen.getByText("Mission update")).toBeInTheDocument();
    expect(screen.getByText("Orbit confirmed.")).toBeInTheDocument();
  });

  it("renders icon, metadata, action content, and native semantics passthrough", () => {
    renderWithTheme(
      <LunaNotification
        title="Signal drift"
        meta="Pinned"
        icon={<span data-testid="notification-icon">!</span>}
        action={<button type="button">Review</button>}
        role="status"
      >
        Check the latest telemetry.
      </LunaNotification>
    );

    const notification = screen.getByRole("status");

    expect(notification.querySelector(".luna-notification__icon")).toBeInTheDocument();
    expect(screen.getByTestId("notification-icon")).toBeInTheDocument();
    expect(screen.getByText("Pinned")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Review" })).toBeInTheDocument();
  });

  it("supports dismiss buttons and reports dismiss events", () => {
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaNotification title="Dismiss me" dismissible onOpenChange={onOpenChange}>
        Manual close.
      </LunaNotification>
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");
    expect(document.querySelector(".luna-notification")).not.toBeInTheDocument();
  });

  it("supports controlled visibility without mutating its own open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = renderWithTheme(
      <LunaNotification open title="Controlled" dismissible onOpenChange={onOpenChange}>
        Controlled notification.
      </LunaNotification>
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");
    expect(document.querySelector(".luna-notification")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaNotification open={false} title="Controlled" dismissible onOpenChange={onOpenChange}>
          Controlled notification.
        </LunaNotification>
      </ThemeProvider>
    );

    expect(document.querySelector(".luna-notification")).not.toBeInTheDocument();
  });

  it("supports a title-only notification", () => {
    renderWithTheme(<LunaNotification title="Telemetry synced" />);

    const notification = document.querySelector(".luna-notification");

    expect(screen.getByText("Telemetry synced")).toBeInTheDocument();
    expect(notification).toHaveClass("luna-notification--title-only");
  });

  it("supports size variants for standard notification density", () => {
    renderWithTheme(
      <>
        <LunaNotification size="sm" title="Small">
          Small body
        </LunaNotification>
        <LunaNotification size="md" title="Medium">
          Medium body
        </LunaNotification>
        <LunaNotification size="lg" title="Large">
          Large body
        </LunaNotification>
      </>
    );

    const notifications = document.querySelectorAll(".luna-notification");

    expect(notifications[0]).toHaveAttribute("data-size", "sm");
    expect(notifications[1]).toHaveAttribute("data-size", "md");
    expect(notifications[2]).toHaveAttribute("data-size", "lg");
  });

  it("resolves spacing and notification theme tokens through the theme system", () => {
    const { container } = renderWithTheme(
      <LunaNotification
        title="Theme override"
        tone="info"
        emphasis="outline"
        padding="6"
        gap="2"
      >
        Custom theme.
      </LunaNotification>,
      {
        theme: {
          components: {
            notification: {
              shadow: "lg",
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
    const notification = document.querySelector(".luna-notification");

    expect(providerRoot).toHaveStyle({
      "--luna-notification-shadow": "0 16px 40px rgba(15, 23, 42, 0.22)",
      "--luna-notification-info-outline-border": "#8b5cf6"
    });
    expect(notification).toHaveStyle({
      "--luna-notification-padding": "1.5rem",
      "--luna-notification-gap": "0.5rem"
    });
  });
});
