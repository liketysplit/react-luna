import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaText } from "./LunaText";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaText", () => {
  it("renders a paragraph by default", () => {
    renderWithTheme(<LunaText>Orbit</LunaText>);

    const text = screen.getByText("Orbit");

    expect(text.tagName).toBe("P");
    expect(text).toHaveAttribute("data-variant", "body");
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(
      <LunaText as="label" htmlFor="mission-code">
        Mission code
      </LunaText>
    );

    const text = screen.getByText("Mission code");

    expect(text.tagName).toBe("LABEL");
    expect(text).toHaveAttribute("for", "mission-code");
  });

  it("uses the user theme default variant when provided", () => {
    renderWithTheme(<LunaText>Orbit</LunaText>, {
      theme: {
        components: {
          text: {
            defaultVariant: "caption"
          }
        }
      }
    });

    const text = screen.getByText("Orbit");

    expect(text).toHaveAttribute("data-variant", "caption");
  });

  it("resolves explicit text color from theme tokens", () => {
    renderWithTheme(<LunaText color="primary.500">Orbit</LunaText>);

    const text = screen.getByText("Orbit");

    expect(text).toHaveStyle({ "--luna-text-color": "#6366f1" });
  });

  it("applies muted and truncate treatments as classes", () => {
    renderWithTheme(
      <LunaText muted truncate>
        Orbit
      </LunaText>
    );

    const text = screen.getByText("Orbit");

    expect(text.className).toContain("luna-text--muted");
    expect(text.className).toContain("luna-text--truncate");
  });

  it("treats inline tags as inline by default", () => {
    renderWithTheme(<LunaText as="span">Orbit</LunaText>);

    const text = screen.getByText("Orbit");

    expect(text.className).toContain("luna-text--inline");
  });

  it("passes alignment and weight through style resolution", () => {
    renderWithTheme(
      <LunaText align="center" weight={700}>
        Orbit
      </LunaText>
    );

    const text = screen.getByText("Orbit");

    expect(text).toHaveStyle({
      "--luna-text-align": "center",
      fontWeight: "700"
    });
  });
});
