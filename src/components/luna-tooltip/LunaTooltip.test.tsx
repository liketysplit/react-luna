import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaTooltip } from "./LunaTooltip";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaTooltip", () => {
  it("opens on hover and wires aria-describedby to the trigger", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaTooltip content="Low fuel warning">
        <button type="button">Telemetry</button>
      </LunaTooltip>
    );

    const trigger = screen.getByRole("button", { name: "Telemetry" });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.hover(trigger);

    const tooltip = screen.getByRole("tooltip");

    expect(tooltip).toHaveTextContent("Low fuel warning");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    await user.unhover(trigger);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("opens on focus and closes on Escape", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaTooltip content="Keyboard shortcut available">
        <button type="button">Launch</button>
      </LunaTooltip>
    );

    await user.tab();

    const trigger = screen.getByRole("button", { name: "Launch" });

    expect(trigger).toHaveFocus();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Keyboard shortcut available");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("preserves an existing aria-describedby value when the tooltip opens", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <>
        <span id="launch-help">Launch help</span>
        <LunaTooltip content="Additional telemetry detail">
          <button type="button" aria-describedby="launch-help">
            Launch
          </button>
        </LunaTooltip>
      </>
    );

    const trigger = screen.getByRole("button", { name: "Launch" });

    await user.hover(trigger);

    const tooltip = screen.getByRole("tooltip");

    expect(trigger).toHaveAttribute("aria-describedby", `launch-help ${tooltip.id}`);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaTooltip content="Hidden detail" disabled>
        <button type="button">Telemetry</button>
      </LunaTooltip>
    );

    const trigger = screen.getByRole("button", { name: "Telemetry" });

    await user.hover(trigger);
    await user.tab();

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("resolves tooltip theme overrides onto the provider variables", () => {
    const { container } = renderWithTheme(
      <LunaTooltip content="Theme override" placement="right">
        <button type="button">Telemetry</button>
      </LunaTooltip>,
      {
        theme: {
          components: {
            tooltip: {
              maxWidth: "16",
              offset: "3",
              modes: {
                light: {
                  bg: "accent.500",
                  border: "accent.600"
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");

    expect(providerRoot).toHaveStyle({
      "--luna-tooltip-max-width": "4rem",
      "--luna-tooltip-offset-default": "0.75rem",
      "--luna-tooltip-bg": "#8b5cf6",
      "--luna-tooltip-border": "#7c3aed"
    });
  });
});
