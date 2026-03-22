import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../theme";
import { LunaColumn } from "./luna-column";
import { LunaGrid } from "./luna-grid";
import { LunaRow } from "./luna-row";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("layout primitives", () => {
  it("wraps row children internally and defaults row wrapping on", () => {
    renderWithTheme(
      <LunaRow gap="4" data-testid="row">
        <div data-col-span={6}>One</div>
        <div>Two</div>
      </LunaRow>
    );

    const row = screen.getByTestId("row");
    const items = row.querySelectorAll(".luna-row__item");

    expect(row.className).toContain("luna-row");
    expect(row.className).not.toContain("luna-row--no-wrap");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveStyle({ "--luna-layout-span-xs": "6" });
    expect(items[1]).toHaveStyle({ "--luna-layout-span-xs": "12" });
  });

  it("normalizes alias-based responsive spans", () => {
    renderWithTheme(
      <LunaRow data-testid="row">
        <div data-col-span={{ mobile: 12, tablet: 6, desktop: 4 }}>One</div>
      </LunaRow>
    );

    const item = screen.getByTestId("row").querySelector(".luna-row__item");

    expect(item).toHaveStyle({
      "--luna-layout-span-xs": "12",
      "--luna-layout-span-md": "6",
      "--luna-layout-span-lg": "4"
    });
  });

  it("lets column participate in the span system and resolves theme gap tokens", () => {
    renderWithTheme(
      <LunaColumn gap="4" colSpan={6} data-testid="column">
        <div>One</div>
      </LunaColumn>
    );

    const column = screen.getByTestId("column");

    expect(column).toHaveStyle({
      "--luna-layout-gap": "1rem",
      "--luna-layout-span-xs": "6"
    });
  });

  it("defaults grid to 12 columns and wraps direct children", () => {
    renderWithTheme(
      <LunaGrid data-testid="grid">
        <div data-col-span={4}>One</div>
        <div data-col-span={8}>Two</div>
      </LunaGrid>
    );

    const grid = screen.getByTestId("grid");
    const items = grid.querySelectorAll(".luna-grid__item");

    expect(grid).toHaveStyle({ "--luna-grid-columns": "12" });
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveStyle({ "--luna-layout-span-xs": "4" });
    expect(items[1]).toHaveStyle({ "--luna-layout-span-xs": "8" });
  });
});
