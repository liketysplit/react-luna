import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaBadge } from "./LunaBadge";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaBadge", () => {
  it("renders a span by default with the base contract attributes", () => {
    renderWithTheme(<LunaBadge>Docked</LunaBadge>);

    const badge = screen.getByText("Docked");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("luna-badge__label");
    expect(badge.parentElement).toHaveClass("luna-badge");
    expect(badge.parentElement).toHaveAttribute("data-tone", "neutral");
    expect(badge.parentElement).toHaveAttribute("data-variant", "soft");
    expect(badge.parentElement).toHaveAttribute("data-size", "medium");
  });

  it("passes through custom markup and root attributes", () => {
    renderWithTheme(
      <LunaBadge as="strong" className="mission-badge" rounded title="Docked">
        Docked
      </LunaBadge>
    );

    const badge = screen.getByTitle("Docked");

    expect(badge.tagName).toBe("STRONG");
    expect(badge).toHaveClass("luna-badge", "luna-badge--rounded", "mission-badge");
  });

  it("applies explicit tone and variant attributes", () => {
    renderWithTheme(
      <LunaBadge tone="success" variant="solid">
        Confirmed
      </LunaBadge>
    );

    const badge = screen.getByText("Confirmed").parentElement;

    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-variant", "solid");
  });

  it("uses the base theme size profile by default", () => {
    renderWithTheme(<LunaBadge>Docked</LunaBadge>);

    const badge = screen.getByText("Docked").parentElement;

    expect(badge).toHaveStyle({
      "--luna-badge-padding-x": "0.75rem",
      "--luna-badge-padding-y": "0.25rem",
      "--luna-badge-font-size": "0.875rem",
      "--luna-badge-min-height": "1.5rem"
    });
  });

  it("uses user theme defaults and custom size profiles when provided", () => {
    renderWithTheme(<LunaBadge>Docked</LunaBadge>, {
      theme: {
        components: {
          badge: {
            defaultSize: "compact",
            sizes: {
              compact: {
                paddingX: "1",
                paddingY: "0",
                fontSize: "xs",
                minHeight: "1rem"
              }
            }
          }
        }
      }
    });

    const badge = screen.getByText("Docked").parentElement;

    expect(badge).toHaveAttribute("data-size", "compact");
    expect(badge).toHaveStyle({
      "--luna-badge-padding-x": "0.25rem",
      "--luna-badge-padding-y": "0",
      "--luna-badge-font-size": "0.75rem",
      "--luna-badge-min-height": "1rem"
    });
  });
});
