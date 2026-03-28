import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaHoverText } from "./LunaHoverText";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaHoverText", () => {
  it("swaps inline content on hover without tooltip semantics", async () => {
    const user = userEvent.setup();

    renderWithTheme(<LunaHoverText hoverContent="Signal wavering">Signal stable</LunaHoverText>);

    const hoverText = screen.getByText("Signal stable").closest(".luna-hover-text");

    if (!hoverText) {
      throw new Error("Expected LunaHoverText root.");
    }

    expect(hoverText).toHaveAttribute("data-active", "false");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.hover(hoverText);

    expect(hoverText).toHaveAttribute("data-active", "true");
    expect(screen.getByText("Signal stable")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Signal wavering")).toHaveAttribute("aria-hidden", "false");

    await user.unhover(hoverText);

    expect(hoverText).toHaveAttribute("data-active", "false");
  });

  it("supports keyboard activation when focusable is enabled", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaHoverText focusable hoverContent="Keyboard focus activates the swap">
        Tab to inspect
      </LunaHoverText>
    );

    const hoverText = screen.getByText("Tab to inspect").closest(".luna-hover-text");

    if (!hoverText) {
      throw new Error("Expected LunaHoverText root.");
    }

    expect(hoverText).toHaveAttribute("tabindex", "0");

    await user.tab();

    expect(hoverText).toHaveFocus();
    expect(hoverText).toHaveAttribute("data-active", "true");

    await user.tab();

    expect(hoverText).toHaveAttribute("data-active", "false");
  });

  it("does not activate while disabled", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaHoverText disabled focusable hoverContent="Hidden alternate">
        Static copy
      </LunaHoverText>
    );

    const hoverText = screen.getByText("Static copy").closest(".luna-hover-text");

    if (!hoverText) {
      throw new Error("Expected LunaHoverText root.");
    }

    await user.hover(hoverText);
    await user.tab();

    expect(hoverText).toHaveAttribute("data-active", "false");
  });

  it("resolves theme tokens for base and hover colors", () => {
    const { container } = renderWithTheme(
      <LunaHoverText color="primary.500" hoverColor="accent.500" hoverContent="Alternate copy">
        Base copy
      </LunaHoverText>
    );

    const hoverText = container.querySelector(".luna-hover-text");

    expect(hoverText).toHaveStyle({
      "--luna-hover-text-color": "#6366f1",
      "--luna-hover-text-hover-color": "#8b5cf6"
    });
  });
});
