import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaHeader } from "../luna-header";
import { LunaSidebar } from "./LunaSidebar";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSidebar", () => {
  it("renders as an aside by default with header, content, and footer regions", () => {
    renderWithTheme(
      <LunaSidebar
        header={<LunaHeader title="Workspace" subtitle="Primary navigation" />}
        footer={<button type="button">Invite</button>}
      >
        <nav aria-label="Workspace sections">
          <a href="#overview">Overview</a>
        </nav>
      </LunaSidebar>
    );

    const sidebar = screen.getByText("Workspace").closest(".luna-sidebar");

    expect(sidebar?.tagName).toBe("ASIDE");
    expect(sidebar?.querySelector(".luna-sidebar__header")).not.toBeNull();
    expect(sidebar?.querySelector(".luna-sidebar__content")).not.toBeNull();
    expect(sidebar?.querySelector(".luna-sidebar__footer")).not.toBeNull();
    expect(screen.getByRole("navigation", { name: "Workspace sections" })).toBeInTheDocument();
  });

  it("supports semantic element overrides and forwards refs", () => {
    const ref = React.createRef<HTMLElement>();

    renderWithTheme(
      <LunaSidebar as="nav" ref={ref} aria-label="Primary sidebar">
        Links
      </LunaSidebar>
    );

    const sidebar = screen.getByRole("navigation", { name: "Primary sidebar" });

    expect(sidebar.tagName).toBe("NAV");
    expect(ref.current).toBe(sidebar);
  });

  it("resolves spacing overrides and sticky offset through theme spacing", () => {
    renderWithTheme(
      <LunaSidebar
        data-testid="sidebar"
        gap="6"
        padding="8"
        sticky
        stickyOffset="10"
        width="16"
      >
        Content
      </LunaSidebar>
    );

    expect(screen.getByTestId("sidebar")).toHaveStyle({
      "--luna-sidebar-gap": "1.5rem",
      "--luna-sidebar-padding": "2rem",
      "--luna-sidebar-sticky-offset": "2.5rem",
      "--luna-sidebar-width": "4rem"
    });
    expect(screen.getByTestId("sidebar")).toHaveAttribute("data-sticky", "true");
  });

  it("omits empty header and footer wrappers when they are not provided", () => {
    renderWithTheme(<LunaSidebar data-testid="sidebar">Content</LunaSidebar>);

    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar.querySelector(".luna-sidebar__header")).toBeNull();
    expect(sidebar.querySelector(".luna-sidebar__footer")).toBeNull();
    expect(sidebar.querySelector(".luna-sidebar__content")).not.toBeNull();
  });
});
