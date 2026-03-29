import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaButton } from "../luna-button";
import { LunaNotification } from "../luna-notification";
import { LunaNotificationGroup } from "./LunaNotificationGroup";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaNotificationGroup", () => {
  it("renders a framed section by default and labels it from the title", () => {
    renderWithTheme(
      <LunaNotificationGroup title="Operations feed" description="Current persistent updates.">
        <LunaNotification title="Mission sync">All systems nominal.</LunaNotification>
      </LunaNotificationGroup>
    );

    const group = screen.getByText("Operations feed").closest("section");

    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute("aria-labelledby");
    expect(group).toHaveClass("luna-notification-group--framed");
    expect(screen.getByText("Current persistent updates.")).toBeInTheDocument();
    expect(screen.getByText("All systems nominal.")).toBeInTheDocument();
  });

  it("supports semantic overrides, actions, and unframed presentation", () => {
    renderWithTheme(
      <LunaNotificationGroup
        as="aside"
        role="region"
        aria-label="Pinned notifications"
        framed={false}
        actions={<LunaButton size="small">Review all</LunaButton>}
      >
        <LunaNotification title="Signal drift">Review required.</LunaNotification>
      </LunaNotificationGroup>
    );

    const group = screen.getByRole("region", { name: "Pinned notifications" });

    expect(group.tagName).toBe("ASIDE");
    expect(group).not.toHaveClass("luna-notification-group--framed");
    expect(screen.getByRole("button", { name: "Review all" })).toBeInTheDocument();
  });

  it("renders multiple notification children inside the items region", () => {
    renderWithTheme(
      <LunaNotificationGroup title="Mission activity">
        <LunaNotification title="Queued">Relay sync is waiting.</LunaNotification>
        <LunaNotification title="Warning" tone="warning">
          Manual approval is still needed.
        </LunaNotification>
      </LunaNotificationGroup>
    );

    const items = document.querySelector(".luna-notification-group__items");

    expect(items?.querySelectorAll(".luna-notification")).toHaveLength(2);
    expect(screen.getByText("Manual approval is still needed.")).toBeInTheDocument();
  });

  it("resolves spacing tokens through the theme system", () => {
    renderWithTheme(
      <LunaNotificationGroup
        title="Theme override"
        gap="3"
        padding="6"
        maxWidth="24rem"
        rounded
      >
        <LunaNotification title="Update">Custom spacing.</LunaNotification>
      </LunaNotificationGroup>
    );

    const group = document.querySelector(".luna-notification-group");
    const items = document.querySelector(".luna-notification-group__items");

    expect(group).toHaveStyle({
      "--luna-notification-group-gap": "0.75rem",
      "--luna-notification-group-padding": "1.5rem",
      "--luna-notification-group-max-width": "24rem"
    });
    expect(group).toHaveClass("luna-notification-group--rounded");
    expect(items).toBeInTheDocument();
  });
});
