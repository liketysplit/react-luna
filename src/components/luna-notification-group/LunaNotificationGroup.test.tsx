import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaButton } from "../luna-button";
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
      <LunaNotificationGroup
        title="Operations feed"
        description="Current persistent updates."
        items={[{ title: "Mission sync", body: "All systems nominal." }]}
      />
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
        showExpand={false}
        items={[{ title: "Signal drift", body: "Review required." }]}
      />
    );

    const group = screen.getByRole("region", { name: "Pinned notifications" });

    expect(group.tagName).toBe("ASIDE");
    expect(group).not.toHaveClass("luna-notification-group--framed");
    expect(screen.getByRole("button", { name: "Review all" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Expand notification group" })).not.toBeInTheDocument();
  });

  it("supports collapsed stack preview and toggle expansion", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        defaultOpen={false}
        items={[
          { title: "Queued", body: "Relay sync is waiting." },
          { title: "Warning", tone: "warning", body: "Manual approval is still needed." }
        ]}
      />
    );

    const toggle = screen.getByRole("button", { name: "Expand notification group" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".luna-notification-group__stack-preview")).toBeInTheDocument();
    expect(document.querySelector(".luna-notification-group__items")).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Collapse notification group" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(document.querySelector(".luna-notification-group__items")).toBeInTheDocument();
  });

  it("supports group-level dismissal", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        dismissible
        items={[{ title: "Queued", body: "Relay sync is waiting." }]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Dismiss notification group" }));

    expect(screen.queryByText("Mission activity")).not.toBeInTheDocument();
  });

  it("lets dismiss-all visibility be controlled explicitly", () => {
    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        dismissible
        showDismissAll={false}
        items={[{ title: "Queued", body: "Relay sync is waiting." }]}
      />
    );

    expect(screen.queryByRole("button", { name: "Dismiss notification group" })).not.toBeInTheDocument();
  });

  it("renders multiple internal notification items inside the items region", () => {
    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        items={[
          { title: "Queued", body: "Relay sync is waiting.", iconName: "info" },
          { title: "Warning", tone: "warning", body: "Manual approval is still needed." }
        ]}
      />
    );

    const items = document.querySelector(".luna-notification-group__items");

    expect(items?.querySelectorAll(".luna-notification")).toHaveLength(2);
    expect(screen.getByText("Manual approval is still needed.")).toBeInTheDocument();
    expect(items?.querySelector(".luna-notification__icon svg")).toBeInTheDocument();
  });

  it("renders at most three visual items from the group", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        defaultOpen={false}
        items={[
          { title: "One", body: "First" },
          { title: "Two", body: "Second" },
          { title: "Three", body: "Third" },
          { title: "Four", body: "Fourth" }
        ]}
      />
    );

    expect(document.querySelectorAll(".luna-notification-group__stack-front")).toHaveLength(1);
    expect(document.querySelectorAll(".luna-notification-group__stack-item")).toHaveLength(2);
    expect(screen.queryByText("First")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Expand notification group" }));

    expect(document.querySelectorAll(".luna-notification")).toHaveLength(3);
    expect(screen.queryByText("First")).not.toBeInTheDocument();
  });

  it("always allows single internal notifications to be dismissed", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        items={[
          { title: "Queued", body: "Relay sync is waiting." },
          { title: "Warning", tone: "warning", body: "Manual approval is still needed." }
        ]}
      />
    );

    const dismissButtons = screen.getAllByRole("button", { name: "Dismiss notification" });

    expect(dismissButtons).toHaveLength(2);

    await user.click(dismissButtons[0]!);

    await waitFor(() => {
      expect(document.querySelectorAll(".luna-notification").length).toBeLessThanOrEqual(1);
    });
  });

  it("keeps single-item dismissal available in the collapsed stack preview", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    renderWithTheme(
      <LunaNotificationGroup
        title="Mission activity"
        defaultOpen={false}
        items={[
          { title: "Queued", body: "Relay sync is waiting." },
          { title: "Warning", tone: "warning", body: "Manual approval is still needed." }
        ]}
      />
    );

    await user.click(screen.getAllByRole("button", { name: "Dismiss notification" })[0]!);

    await waitFor(() => {
      expect(document.querySelectorAll(".luna-notification").length).toBeLessThanOrEqual(1);
    });
  });

  it("resolves spacing tokens through the theme system", () => {
    renderWithTheme(
      <LunaNotificationGroup
        title="Theme override"
        gap="3"
        padding="6"
        maxWidth="24rem"
        rounded
        items={[{ title: "Update", body: "Custom spacing." }]}
      />
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
