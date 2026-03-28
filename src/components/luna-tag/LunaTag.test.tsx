import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaTag } from "./LunaTag";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaTag", () => {
  it("renders a span by default with the neutral medium contract", () => {
    renderWithTheme(<LunaTag>Stable orbit</LunaTag>);

    const tag = screen.getByText("Stable orbit");

    expect(tag.tagName).toBe("SPAN");
    expect(tag).toHaveAttribute("data-variant", "neutral");
    expect(tag).toHaveAttribute("data-size", "medium");
    expect(tag).toHaveStyle({
      "--luna-tag-bg": "#f1f5f9",
      "--luna-tag-fg": "#334155",
      "--luna-tag-border": "#cbd5e1"
    });
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(<LunaTag as="strong">Queued</LunaTag>);

    expect(screen.getByText("Queued").tagName).toBe("STRONG");
  });

  it("resolves theme variant and size defaults when provided", () => {
    renderWithTheme(<LunaTag>Synced</LunaTag>, {
      theme: {
        components: {
          tag: {
            defaultVariant: "success",
            defaultSize: "large",
            sizes: {
              large: {
                paddingX: "5",
                paddingY: "2",
                fontSize: "md",
                minHeight: "2rem"
              }
            },
            variants: {
              light: {
                success: {
                  bg: "success.200",
                  fg: "success.900",
                  border: "success.300"
                }
              }
            }
          }
        }
      }
    });

    expect(screen.getByText("Synced")).toHaveAttribute("data-variant", "success");
    expect(screen.getByText("Synced")).toHaveAttribute("data-size", "large");
    expect(screen.getByText("Synced")).toHaveStyle({
      "--luna-tag-bg": "#a7f3d0",
      "--luna-tag-fg": "#064e3b",
      "--luna-tag-border": "#6ee7b7",
      "--luna-tag-padding-x": "1.25rem",
      "--luna-tag-min-height": "2rem"
    });
  });

  it("accepts raw CSS sizes outside named theme tiers", () => {
    renderWithTheme(<LunaTag size="2rem">Tight</LunaTag>);

    expect(screen.getByText("Tight")).toHaveStyle({
      "--luna-tag-padding-x": "2rem",
      "--luna-tag-min-height": "2rem"
    });
  });

  it("resolves color overrides against the tag surface", () => {
    renderWithTheme(<LunaTag color="accent.500">Accent</LunaTag>);

    expect(screen.getByText("Accent")).toHaveStyle({
      "--luna-tag-bg": "#8b5cf6",
      "--luna-tag-border": "#8b5cf6"
    });
  });
});
