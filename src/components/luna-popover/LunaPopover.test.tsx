import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaButton } from "../luna-button";
import { LunaPopover } from "./LunaPopover";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaPopover", () => {
  it("opens from the trigger and moves focus into the surface", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaPopover
        content={
          <form>
            <label>
              Call sign
              <input defaultValue="Nova" />
            </label>
          </form>
        }
      >
        <LunaButton>Open popover</LunaButton>
      </LunaPopover>
    );

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    const dialog = screen.getByRole("dialog", { name: "Popover" });
    const input = screen.getByRole("textbox", { name: "Call sign" });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open popover" })).toHaveAttribute("aria-expanded", "true");
    await vi.waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  it("closes on outside click and escape and restores trigger focus on escape", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <div>
        <LunaPopover content={<button type="button">Inside action</button>}>
          <LunaButton>Open popover</LunaButton>
        </LunaPopover>
        <button type="button">Outside</button>
      </div>
    );

    const trigger = screen.getByRole("button", { name: "Open popover" });

    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    await vi.waitFor(() => {
      expect(trigger).toHaveFocus();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderWithTheme(
      <LunaPopover open onOpenChange={onOpenChange} content="Controlled content">
        <LunaButton>Open popover</LunaButton>
      </LunaPopover>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaPopover content="Hidden detail" disabled>
        <LunaButton>Open popover</LunaButton>
      </LunaPopover>
    );

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("resolves popover theme tokens and spacing overrides through the theme system", async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <LunaPopover
        content="Theme override"
        padding="6"
        offset="3"
        minWidth="16"
        maxWidth="24rem"
      >
        <LunaButton>Open popover</LunaButton>
      </LunaPopover>,
      {
        theme: {
          components: {
            popover: {
              radius: "pill",
              minWidth: "16",
              maxWidth: "22rem",
              offset: "4",
              padding: "5",
              arrowSize: "2",
              arrowInset: "6",
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

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    const providerRoot = container.querySelector("[data-luna-theme]");
    const root = container.querySelector(".luna-popover");

    expect(providerRoot).toHaveStyle({
      "--luna-popover-radius": "999px",
      "--luna-popover-min-width": "4rem",
      "--luna-popover-max-width": "22rem",
      "--luna-popover-offset-default": "1rem",
      "--luna-popover-padding-default": "1.25rem",
      "--luna-popover-arrow-size": "0.5rem",
      "--luna-popover-arrow-inset": "1.5rem",
      "--luna-popover-bg": "#8b5cf6",
      "--luna-popover-border": "#7c3aed"
    });
    expect(root).toHaveStyle({
      "--luna-popover-padding": "1.5rem",
      "--luna-popover-offset": "0.75rem",
      "--luna-popover-min-width": "4rem",
      "--luna-popover-max-width": "24rem"
    });
  });

  it("renders an optional shaped arrow when requested", async () => {
    const user = userEvent.setup();

    const { container } = renderWithTheme(
      <LunaPopover content="Anchored detail" showArrow>
        <LunaButton>Open popover</LunaButton>
      </LunaPopover>
    );

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(container.querySelector(".luna-popover__arrow")).toBeInTheDocument();
    expect(container.querySelector(".luna-popover")).toHaveAttribute("data-arrow", "true");
  });
});
