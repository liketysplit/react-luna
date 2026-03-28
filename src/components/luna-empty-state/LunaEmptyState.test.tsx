import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaEmptyState } from "./LunaEmptyState";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaEmptyState", () => {
  it("renders a section by default", () => {
    renderWithTheme(<LunaEmptyState title="No missions" description="Add one to continue." />);

    const emptyState = screen.getByText("No missions").closest("section");

    expect(emptyState).toBeInTheDocument();
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(
      <LunaEmptyState as="article" title="No signals" description="Connect a source." />
    );

    const emptyState = screen.getByText("No signals").closest("article");

    expect(emptyState).toBeInTheDocument();
  });

  it("renders media, description, and actions regions", () => {
    renderWithTheme(
      <LunaEmptyState
        title="Nothing here yet"
        description="Create a record to get started."
        media={<span data-testid="empty-state-media">*</span>}
        actions={<button type="button">Create record</button>}
      />
    );

    expect(
      screen.getByTestId("empty-state-media").closest(".luna-empty-state__media")
    ).toBeInTheDocument();
    expect(
      screen
        .getByText("Create a record to get started.")
        .closest(".luna-empty-state__description")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create record" }).closest(".luna-empty-state__actions")
    ).toBeInTheDocument();
  });

  it("supports alignment and spacing props", () => {
    renderWithTheme(
      <LunaEmptyState
        title="Alignment"
        description="Check positioning."
        align="right"
        padding="6"
        gap="3"
        actionsGap="4"
        maxWidth="16"
        actions={<button type="button">Launch</button>}
      />
    );

    const emptyState = document.querySelector(".luna-empty-state");
    const actions = document.querySelector(".luna-empty-state__actions");

    expect(emptyState).toHaveStyle({
      "--luna-empty-state-padding": "1.5rem",
      "--luna-empty-state-gap": "0.75rem",
      "--luna-empty-state-max-width": "4rem",
      "--luna-empty-state-align": "end",
      "--luna-empty-state-text-align": "right"
    });
    expect(actions).toHaveStyle({
      "--luna-layout-justify": "flex-end",
      "--luna-layout-gap": "1rem"
    });
  });

  it("treats children as the body region when provided", () => {
    renderWithTheme(
      <LunaEmptyState title="Custom body">
        <p>Use richer markup for the empty-state body.</p>
      </LunaEmptyState>
    );

    expect(screen.getByText("Use richer markup for the empty-state body.")).toBeInTheDocument();
  });

  it("uses theme overrides for empty-state defaults", () => {
    const { container } = renderWithTheme(
      <LunaEmptyState title="Theme override" description="Custom surface defaults." />,
      {
        theme: {
          components: {
            emptyState: {
              defaultPadding: "8",
              maxWidth: "16",
              modes: {
                light: {
                  mediaBg: "accent.100"
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");

    expect(providerRoot).toHaveStyle({
      "--luna-empty-state-padding-default": "2rem",
      "--luna-empty-state-max-width": "4rem",
      "--luna-empty-state-media-bg": "#ede9fe"
    });
  });
});
