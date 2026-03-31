import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaPanel } from "./LunaPanel";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaPanel", () => {
  it("renders title, description, and children", () => {
    renderWithTheme(
      <LunaPanel title="Panel title" description="Panel description">
        Panel body
      </LunaPanel>
    );

    expect(screen.getByText("Panel title")).toBeInTheDocument();
    expect(screen.getByText("Panel description")).toBeInTheDocument();
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("supports tone variants", () => {
    renderWithTheme(
      <LunaPanel tone="chrome" data-testid="panel">
        Panel body
      </LunaPanel>
    );

    expect(screen.getByTestId("panel")).toHaveAttribute("data-tone", "chrome");
  });

  it("passes size constraints through as raw css values", () => {
    renderWithTheme(
      <LunaPanel
        width="42ch"
        minWidth="20rem"
        maxWidth="80vw"
        height="320px"
        minHeight="12rem"
        maxHeight="70vh"
        data-testid="panel"
      >
        Panel body
      </LunaPanel>
    );

    expect(screen.getByTestId("panel")).toHaveStyle({
      width: "42ch",
      minWidth: "20rem",
      maxWidth: "80vw",
      height: "320px",
      minHeight: "12rem",
      maxHeight: "70vh"
    });
  });
});
