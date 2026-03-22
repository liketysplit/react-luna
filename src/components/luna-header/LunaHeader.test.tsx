import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaHeader } from "./LunaHeader";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaHeader", () => {
  it("renders a div by default", () => {
    renderWithTheme(<LunaHeader title="Mission" />);

    const header = screen.getByText("Mission").closest("div");

    expect(header).toHaveClass("luna-header");
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(<LunaHeader as="header" title="Mission" />);

    const header = screen.getByText("Mission").closest("header");

    expect(header).toBeInTheDocument();
  });

  it("renders string title and subtitle through LunaText defaults", () => {
    renderWithTheme(<LunaHeader title="Mission" subtitle="Telemetry stable" />);

    const title = screen.getByText("Mission");
    const subtitle = screen.getByText("Telemetry stable");

    expect(title).toHaveAttribute("data-variant", "title");
    expect(subtitle).toHaveAttribute("data-variant", "body-small");
    expect(subtitle.className).toContain("luna-text--muted");
  });

  it("applies alignment styles to the root", () => {
    renderWithTheme(<LunaHeader title="Mission" align="center" />);

    const header = screen.getByText("Mission").closest(".luna-header");

    expect(header).toHaveStyle({
      "--luna-header-align": "center",
      "--luna-header-text-align": "center"
    });
  });

  it("resolves gap through theme spacing tokens", () => {
    renderWithTheme(<LunaHeader title="Mission" gap="4" />);

    const header = screen.getByText("Mission").closest(".luna-header");

    expect(header).toHaveStyle({ "--luna-header-gap": "1rem" });
  });

  it("renders custom title and subtitle content without forcing LunaText wrappers", () => {
    renderWithTheme(
      <LunaHeader title={<span data-testid="title-node">Mission</span>} subtitle={<span data-testid="subtitle-node">Telemetry</span>} />
    );

    expect(screen.getByTestId("title-node")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle-node")).toBeInTheDocument();
  });
});
