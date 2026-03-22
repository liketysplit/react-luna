import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaCard } from "./LunaCard";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaCard", () => {
  it("renders a section by default", () => {
    renderWithTheme(<LunaCard title="Mission">Body</LunaCard>);

    const card = screen.getByText("Mission").closest("section");

    expect(card).toBeInTheDocument();
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(
      <LunaCard as="article" title="Mission">
        Body
      </LunaCard>
    );

    const card = screen.getByText("Mission").closest("article");

    expect(card).toBeInTheDocument();
  });

  it("renders title, body, and actions regions", () => {
    renderWithTheme(
      <LunaCard title="Mission" actions={<button type="button">Launch</button>}>
        Body copy
      </LunaCard>
    );

    const title = screen.getByText("Mission");
    const body = screen.getByText("Body copy");
    const action = screen.getByRole("button", { name: "Launch" });

    expect(title.closest(".luna-card__header")).toBeInTheDocument();
    expect(body.closest(".luna-card__body")).toBeInTheDocument();
    expect(action.closest(".luna-card__actions")).toBeInTheDocument();
  });

  it("applies alignment props to each region", () => {
    renderWithTheme(
      <LunaCard
        title="Mission"
        titleAlign="center"
        bodyAlign="right"
        actionsAlign="center"
        actions={<button type="button">Launch</button>}
      >
        Body copy
      </LunaCard>
    );

    expect(screen.getByText("Mission").closest(".luna-card__header")).toHaveStyle({
      "--luna-layout-align": "center"
    });
    expect(screen.getByText("Body copy").closest(".luna-card__body")).toHaveStyle({
      "--luna-layout-align": "flex-end"
    });
    expect(screen.getByRole("button", { name: "Launch" }).closest(".luna-card__actions")).toHaveStyle({
      "--luna-layout-justify": "center"
    });
  });

  it("warns and lets flat win over elevated", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(
      <LunaCard flat elevated title="Mission">
        Body
      </LunaCard>
    );

    const card = screen.getByText("Mission").closest(".luna-card");

    expect(warnSpy).toHaveBeenCalledWith(
      "LunaCard: `flat` overrides `elevated` when both are provided."
    );
    expect(card?.className).toContain("luna-card--flat");
    expect(card?.className).not.toContain("luna-card--elevated");
  });

  it("resolves spacing tokens onto the root style", () => {
    renderWithTheme(
      <LunaCard title="Mission" padding="6" gap="3">
        Body
      </LunaCard>
    );

    const card = screen.getByText("Mission").closest(".luna-card");

    expect(card).toHaveStyle({
      "--luna-card-padding": "1.5rem",
      "--luna-card-gap": "0.75rem"
    });
  });

  it("resolves color onto the card background override variable", () => {
    renderWithTheme(
      <LunaCard title="Mission" color="primary.600">
        Body
      </LunaCard>
    );

    const card = screen.getByText("Mission").closest(".luna-card");

    expect(card).toHaveStyle({ "--luna-card-bg-override": "#4f46e5" });
  });
});
