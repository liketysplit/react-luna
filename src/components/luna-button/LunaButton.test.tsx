import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaButton } from "./LunaButton";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaButton", () => {
  it("prefers children over value", () => {
    renderWithTheme(<LunaButton value="Fallback">Visible label</LunaButton>);

    const button = screen.getByRole("button", { name: "Visible label" });

    expect(button).toHaveTextContent("Visible label");
    expect(button).not.toHaveTextContent("Fallback");
  });

  it("renders the lunar loader without removing the button content node", () => {
    renderWithTheme(<LunaButton loading>Launch mission</LunaButton>);

    const button = screen.getByRole("button", { name: "Launch mission" });

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button.querySelector(".luna-button__content")).toBeInTheDocument();
    expect(button.querySelector(".luna-button__loader-phases")).toBeInTheDocument();
    expect(button.querySelectorAll(".luna-button__moon")).toHaveLength(5);
  });

  it("maps shorthand animation names to LunaButton keyframes", () => {
    renderWithTheme(<LunaButton animation="bounce .6s 1">Bounce</LunaButton>);

    const button = screen.getByRole("button", { name: "Bounce" });

    expect(button).toHaveStyle({ animation: "luna-button-bounce .6s 1" });
  });

  it("keeps legacy animation names working through the default shorthand map", () => {
    renderWithTheme(<LunaButton animation="bounce">Bounce</LunaButton>);

    const button = screen.getByRole("button", { name: "Bounce" });

    expect(button).toHaveStyle({ animation: "luna-button-bounce 3s infinite" });
  });

  it("warns and lets info win over conflicting surface props", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaButton info outline flat depressed>
        Mission briefing
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Mission briefing" });

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `info` overrides `outline`, `flat`, and `depressed` when combined."
    );
    expect(button.className).toContain("luna-button--info");
    expect(button.className).not.toContain("luna-button--outline");
    expect(button.className).not.toContain("luna-button--flat");
    expect(button.className).not.toContain("luna-button--depressed");
  });

  it("warns and lets fixed win over absolute", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaButton absolute fixed>
        Orbit
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `fixed` overrides `absolute` when both are provided."
    );
    expect(button.className).toContain("luna-button--fixed");
    expect(button.className).not.toContain("luna-button--absolute");
  });
});
