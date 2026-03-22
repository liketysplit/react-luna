import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaDivider } from "./LunaDivider";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaDivider", () => {
  it("renders an hr by default", () => {
    renderWithTheme(<LunaDivider />);

    const divider = document.querySelector("hr.luna-divider");

    expect(divider).toBeInTheDocument();
  });

  it("renders a vertical separator with separator semantics", () => {
    renderWithTheme(<LunaDivider orientation="vertical" />);

    const divider = screen.getByRole("separator");

    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider.className).toContain("luna-divider--vertical");
  });

  it("renders the label for horizontal dividers", () => {
    renderWithTheme(<LunaDivider label="Details" />);

    const label = screen.getByText("Details");
    const divider = label.closest(".luna-divider");

    expect(label).toBeInTheDocument();
    expect(divider).toHaveClass("luna-divider--labeled");
    expect(divider?.tagName).toBe("DIV");
    expect(divider).toHaveAttribute("role", "separator");
  });

  it("applies label alignment classes", () => {
    renderWithTheme(<LunaDivider label="Details" labelAlign="end" />);

    const divider = screen.getByText("Details").closest(".luna-divider");

    expect(divider).toHaveClass("luna-divider--label-end");
  });

  it("resolves spacing and inset through theme spacing tokens", () => {
    renderWithTheme(<LunaDivider spacing="6" inset="4" />);

    const divider = document.querySelector(".luna-divider");

    expect(divider).toHaveStyle({
      "--luna-divider-spacing": "1.5rem",
      "--luna-divider-inset": "1rem"
    });
  });

  it("hides decorative dividers from assistive technology", () => {
    renderWithTheme(<LunaDivider decorative orientation="vertical" />);

    const divider = document.querySelector(".luna-divider");

    expect(divider).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the requested tone class", () => {
    renderWithTheme(<LunaDivider tone="strong" />);

    const divider = document.querySelector(".luna-divider");

    expect(divider).toHaveClass("luna-divider--strong");
  });
});
