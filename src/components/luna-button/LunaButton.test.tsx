import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaButton } from "./LunaButton";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
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

  it("renders the alternate loading-star treatment when requested", () => {
    renderWithTheme(
      <LunaButton loading loadingAnimation="loading-star">
        Launch mission
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Launch mission" });

    expect(button).toHaveAttribute("data-loading-animation", "loading-star");
    expect(button.querySelector(".luna-button__loader-star")).toBeInTheDocument();
    expect(button.querySelector(".luna-button__loader-phases")).not.toBeInTheDocument();
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

  it("warns on malformed animation shorthand and drops the animation", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(<LunaButton animation="bounce .6s">Bounce</LunaButton>);

    const button = screen.getByRole("button", { name: "Bounce" });

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `animation` should follow \"<name> <duration> <iterationCount>\"."
    );
    expect(button).not.toHaveStyle({ animation: "luna-button-bounce .6s" });
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

  it("warns when directional props are used without absolute or fixed positioning", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(<LunaButton top="1rem">Orbit</LunaButton>);

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `top`, `right`, `bottom`, and `left` require `absolute` or `fixed`."
    );
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

  it("warns and lets icon content win over iconName", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaButton icon={<span data-testid="custom-icon">Moon</span>} iconName="star">
        Orbit
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Orbit Moon" });

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `icon` overrides `iconName` when both are provided."
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(button).not.toHaveTextContent("star");
  });

  it("renders internal icons when iconName is provided", () => {
    renderWithTheme(<LunaButton iconName="luna-crescent">Orbit</LunaButton>);

    const button = screen.getByRole("button", { name: /Orbit/i });
    const svg = button.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(button).not.toHaveTextContent("luna-crescent");
  });

  it("does not render an empty content slot for icon-only buttons", () => {
    renderWithTheme(<LunaButton fab iconName="luna-crescent" aria-label="Open moon actions" />);

    const button = screen.getByRole("button", { name: "Open moon actions" });

    expect(button.querySelector(".luna-button__content")).not.toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("warns and lets fab win over rounded", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaButton fab rounded>
        Orbit
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaButton: `fab` overrides `rounded` when both are provided."
    );
    expect(button.className).toContain("luna-button--fab");
    expect(button.className).not.toContain("luna-button--rounded");
  });

  it("uses the base theme defaults for size and icon direction", () => {
    renderWithTheme(<LunaButton>Orbit</LunaButton>);

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(button).toHaveAttribute("data-size", "medium");
    expect(button).toHaveAttribute("data-icon-direction", "right");
  });

  it("uses user theme defaults for size and icon direction when provided", () => {
    renderWithTheme(<LunaButton>Orbit</LunaButton>, {
      theme: {
        components: {
          button: {
            defaultSize: "large",
            defaultIconDirection: "left"
          }
        }
      }
    });

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(button).toHaveAttribute("data-size", "large");
    expect(button).toHaveAttribute("data-icon-direction", "left");
  });

  it("resolves background color tokens onto the root style", () => {
    renderWithTheme(<LunaButton color="primary.600">Orbit</LunaButton>);

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(button).toHaveStyle({ "--luna-btn-bg": "#4f46e5" });
  });

  it("resolves info color onto the informational color variable", () => {
    renderWithTheme(
      <LunaButton info color="primary.500">
        Orbit
      </LunaButton>
    );

    const button = screen.getByRole("button", { name: "Orbit" });

    expect(button).toHaveStyle({ "--luna-btn-info-color": "#6366f1" });
    expect(button).not.toHaveStyle({ "--luna-btn-bg": "#6366f1" });
  });
});
