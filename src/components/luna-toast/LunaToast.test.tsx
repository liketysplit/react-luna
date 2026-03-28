import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaToast } from "./LunaToast";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("LunaToast", () => {
  it("renders the default toast contract with announcement semantics", () => {
    renderWithTheme(<LunaToast title="Mission update">Orbit confirmed.</LunaToast>);

    const toast = screen.getByRole("status");

    expect(toast).toHaveAttribute("data-tone", "neutral");
    expect(toast).toHaveAttribute("data-emphasis", "soft");
    expect(toast).toHaveAttribute("data-placement", "bottom-right");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("aria-atomic", "true");
    expect(screen.getByText("Mission update")).toBeInTheDocument();
    expect(screen.getByText("Orbit confirmed.")).toBeInTheDocument();
  });

  it("supports dismiss buttons and reports dismiss events", () => {
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaToast title="Dismiss me" dismissible onOpenChange={onOpenChange}>
        Manual close.
      </LunaToast>
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("auto dismisses after the resolved duration", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaToast title="Telemetry synced" duration={1200} onOpenChange={onOpenChange}>
        Auto close.
      </LunaToast>
    );

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false, "timeout");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("pauses auto dismiss while hovered", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaToast title="Hover hold" duration={1000} onOpenChange={onOpenChange}>
        Stay visible while hovered.
      </LunaToast>
    );

    const toast = screen.getByRole("status");

    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false, "timeout");
  });

  it("supports controlled visibility without mutating its own open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = renderWithTheme(
      <LunaToast open title="Controlled" dismissible onOpenChange={onOpenChange}>
        Controlled toast.
      </LunaToast>
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaToast open={false} title="Controlled" dismissible onOpenChange={onOpenChange}>
          Controlled toast.
        </LunaToast>
      </ThemeProvider>
    );

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("resolves spacing and toast theme tokens through the theme system", () => {
    const { container } = renderWithTheme(
      <LunaToast title="Theme override" tone="info" emphasis="outline" padding="6" gap="2" inset="8">
        Custom theme.
      </LunaToast>,
      {
        theme: {
          components: {
            toast: {
              defaultPlacement: "top-left",
              maxWidth: "28rem",
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
    const toast = screen.getByRole("status");

    expect(providerRoot).toHaveStyle({
      "--luna-toast-max-width": "28rem",
      "--luna-toast-shadow": "0 16px 40px rgba(15, 23, 42, 0.22)",
      "--luna-toast-info-outline-border": "#8b5cf6"
    });
    expect(toast).toHaveAttribute("data-placement", "top-left");
    expect(toast).toHaveStyle({
      "--luna-toast-padding": "1.5rem",
      "--luna-toast-gap": "0.5rem",
      "--luna-toast-inset": "2rem"
    });
  });
});
