import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaTopbar } from "./LunaTopbar";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaTopbar", () => {
  it("renders a header by default", () => {
    renderWithTheme(<LunaTopbar start="Brand" end="Actions" />);

    const topbar = screen.getByText("Brand").closest("header");

    expect(topbar).toHaveClass("luna-topbar");
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(
      <LunaTopbar as="div" start="Brand" end="Actions">
        Center
      </LunaTopbar>
    );

    const topbar = screen.getByText("Brand").closest("div");

    expect(topbar).toBeInTheDocument();
  });

  it("renders start, center, and end regions", () => {
    renderWithTheme(
      <LunaTopbar start={<span data-testid="start">Brand</span>} end={<span data-testid="end">Actions</span>}>
        <span data-testid="center">Navigation</span>
      </LunaTopbar>
    );

    expect(screen.getByTestId("start").closest(".luna-topbar__start")).toBeInTheDocument();
    expect(screen.getByTestId("center").closest(".luna-topbar__center")).toBeInTheDocument();
    expect(screen.getByTestId("end").closest(".luna-topbar__end")).toBeInTheDocument();
  });

  it("resolves spacing props through theme tokens", () => {
    renderWithTheme(
      <LunaTopbar start="Brand" end="Actions" gap="6" padding="4">
        Center
      </LunaTopbar>
    );

    const topbar = screen.getByText("Brand").closest(".luna-topbar");

    expect(topbar).toHaveStyle({
      "--luna-topbar-gap": "1.5rem",
      "--luna-topbar-padding": "1rem"
    });
  });

  it("applies sticky and border modifiers", () => {
    renderWithTheme(
      <LunaTopbar start="Brand" end="Actions" sticky bordered={false}>
        Center
      </LunaTopbar>
    );

    const topbar = screen.getByText("Brand").closest(".luna-topbar");

    expect(topbar).toHaveClass("luna-topbar--sticky");
    expect(topbar).not.toHaveClass("luna-topbar--bordered");
  });
});
