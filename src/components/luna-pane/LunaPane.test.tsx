import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaPane } from "./LunaPane";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaPane", () => {
  it("renders children without adding panel structure", () => {
    renderWithTheme(<LunaPane>Pane content</LunaPane>);

    expect(screen.getByText("Pane content")).toBeInTheDocument();
  });

  it("supports border direction attributes", () => {
    renderWithTheme(
      <LunaPane borderRight borderBottom data-testid="pane">
        Pane content
      </LunaPane>
    );

    const pane = screen.getByTestId("pane");
    expect(pane).toHaveAttribute("data-border-right", "true");
    expect(pane).toHaveAttribute("data-border-bottom", "true");
    expect(pane).not.toHaveAttribute("data-border");
  });

  it("passes border and size styles through as raw css values", () => {
    renderWithTheme(
      <LunaPane
        border
        borderStyle="dashed"
        borderWidth="2px"
        radius="1.25rem"
        width="40ch"
        minHeight="12rem"
        data-testid="pane"
      >
        Pane content
      </LunaPane>
    );

    expect(screen.getByTestId("pane")).toHaveStyle({
      borderStyle: "dashed",
      borderWidth: "2px",
      borderRadius: "1.25rem",
      width: "40ch",
      minHeight: "12rem"
    });
  });
});
