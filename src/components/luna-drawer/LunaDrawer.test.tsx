import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaDrawer } from "./LunaDrawer";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaDrawer", () => {
  it("renders the default drawer contract with dialog semantics", () => {
    renderWithTheme(
      <LunaDrawer open title="Mission details" description="Inspect the latest telemetry.">
        Orbit data.
      </LunaDrawer>
    );

    const drawer = screen.getByRole("dialog", { name: "Mission details" });

    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(drawer).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Orbit data.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dismiss drawer" })).toBeInTheDocument();
  });

  it("supports overlay dismissal and reports the reason", () => {
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaDrawer open title="Dismiss me" onOpenChange={onOpenChange}>
        Overlay close.
      </LunaDrawer>
    );

    fireEvent.click(document.querySelector(".luna-drawer__backdrop") as Element);

    expect(onOpenChange).toHaveBeenCalledWith(false, "overlay");
  });

  it("closes on Escape when enabled", () => {
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaDrawer open title="Escape close" onOpenChange={onOpenChange}>
        Keyboard close.
      </LunaDrawer>
    );

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false, "escape");
  });

  it("supports controlled visibility without mutating its own open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = renderWithTheme(
      <LunaDrawer open title="Controlled" onOpenChange={onOpenChange}>
        Controlled drawer.
      </LunaDrawer>
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss drawer" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");
    expect(screen.getByRole("dialog", { name: "Controlled" })).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaDrawer open={false} title="Controlled" onOpenChange={onOpenChange}>
          Controlled drawer.
        </LunaDrawer>
      </ThemeProvider>
    );

    expect(screen.queryByRole("dialog", { name: "Controlled" })).not.toBeInTheDocument();
  });

  it("resolves spacing and drawer theme tokens through the theme system", () => {
    const { container } = renderWithTheme(
      <LunaDrawer
        open
        title="Theme override"
        placement="left"
        padding="6"
        gap="2"
        inset="8"
        size="16"
      >
        Custom theme.
      </LunaDrawer>,
      {
        theme: {
          components: {
            drawer: {
              defaultPlacement: "left",
              shadow: "md",
              modes: {
                light: {
                  bg: "neutral.50",
                  border: "accent.500",
                  backdrop: "rgba(15, 23, 42, 0.4)"
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");
    const shell = document.querySelector(".luna-drawer");

    expect(providerRoot).toHaveStyle({
      "--luna-drawer-shadow": "0 8px 24px rgba(15, 23, 42, 0.18)",
      "--luna-drawer-border": "#8b5cf6",
      "--luna-drawer-backdrop": "rgba(15, 23, 42, 0.4)"
    });
    expect(shell).toHaveAttribute("data-placement", "left");
    expect(shell).toHaveStyle({
      "--luna-drawer-padding": "1.5rem",
      "--luna-drawer-gap": "0.5rem",
      "--luna-drawer-inset": "2rem",
      "--luna-drawer-size": "4rem"
    });
  });
});
