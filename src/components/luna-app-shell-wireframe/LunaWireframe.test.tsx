import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaWireframe } from "./LunaWireframe";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaWireframe", () => {
  it("renders the provided slot content", () => {
    renderWithTheme(
      <LunaWireframe
        appBar="App bar"
        left="Left rail"
        centerTop="Center top"
        centerMiddle="Center middle"
        centerBottom="Center bottom"
        right="Right rail"
      />
    );

    expect(screen.getByText("App bar")).toBeInTheDocument();
    expect(screen.getByText("Left rail")).toBeInTheDocument();
    expect(screen.getByText("Center top")).toBeInTheDocument();
    expect(screen.getByText("Center middle")).toBeInTheDocument();
    expect(screen.getByText("Center bottom")).toBeInTheDocument();
    expect(screen.getByText("Right rail")).toBeInTheDocument();
  });

  it("applies omission and narrow classes to the shell", () => {
    renderWithTheme(
      <LunaWireframe centerMiddle="Center middle" narrow />
    );

    const shell = screen.getByText("Center middle").closest(".luna-app-shell-wireframe");
    expect(shell).toHaveClass("luna-app-shell-wireframe");
    expect(shell).toHaveClass("luna-app-shell-wireframe--narrow");
    expect(shell).toHaveClass("luna-app-shell-wireframe--no-left");
    expect(shell).toHaveClass("luna-app-shell-wireframe--no-right");
  });

  it("applies bordered slot classes only where requested", () => {
    renderWithTheme(
      <LunaWireframe
        appBar="App bar"
        appBarBorder
        left="Left rail"
        centerMiddle="Center middle"
        centerMiddleBorder
        right="Right rail"
      />
    );

    const appBarSlot = screen.getByText("App bar").closest(".luna-app-shell-wireframe__slot");
    const leftSlot = screen.getByText("Left rail").closest(".luna-app-shell-wireframe__slot");
    const centerMiddleSlot = screen
      .getByText("Center middle")
      .closest(".luna-app-shell-wireframe__slot");
    const rightSlot = screen.getByText("Right rail").closest(".luna-app-shell-wireframe__slot");

    expect(appBarSlot).toHaveClass("luna-app-shell-wireframe__slot--bordered");
    expect(leftSlot).not.toHaveClass("luna-app-shell-wireframe__slot--bordered");
    expect(centerMiddleSlot).toHaveClass("luna-app-shell-wireframe__slot--bordered");
    expect(rightSlot).not.toHaveClass("luna-app-shell-wireframe__slot--bordered");
  });
});
