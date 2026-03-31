import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaMetricCard } from "./LunaMetricCard";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaMetricCard", () => {
  it("renders the primary label and value", () => {
    renderWithTheme(<LunaMetricCard label="Monthly recurring revenue" value="$128,400" />);

    expect(screen.getByText("Monthly recurring revenue")).toBeInTheDocument();
    expect(screen.getByText("$128,400")).toBeInTheDocument();
  });

  it("renders delta and trend content for positive and negative states", () => {
    const { rerender } = renderWithTheme(
      <LunaMetricCard
        label="Qualified pipeline"
        value="$2.4M"
        delta="12.4%"
        trend="up"
      />
    );

    expect(screen.getByText("Up")).toBeInTheDocument();
    expect(screen.getByText("12.4%")).toBeInTheDocument();
    expect(screen.getByText("$2.4M").closest(".luna-metric-card")).toHaveAttribute(
      "data-trend",
      "up"
    );

    rerender(
      <ThemeProvider>
        <LunaMetricCard
          label="Qualified pipeline"
          value="$2.1M"
          delta="4.8%"
          trend="down"
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Down")).toBeInTheDocument();
    expect(screen.getByText("4.8%")).toBeInTheDocument();
    expect(screen.getByText("$2.1M").closest(".luna-metric-card")).toHaveAttribute(
      "data-trend",
      "down"
    );
  });

  it("omits optional regions when delta, meta, and visual are not provided", () => {
    renderWithTheme(<LunaMetricCard label="Churn" value="1.8%" />);

    const card = screen.getByText("Churn").closest(".luna-metric-card");

    expect(card?.querySelector(".luna-metric-card__footer")).not.toBeInTheDocument();
    expect(card?.querySelector(".luna-metric-card__visual")).not.toBeInTheDocument();
  });

  it("supports neutral trend and visual content", () => {
    renderWithTheme(
      <LunaMetricCard
        label="Activation rate"
        value="64%"
        delta="0.0%"
        trend="neutral"
        meta="Compared with last week"
        visual={<div>sparkline</div>}
      />
    );

    expect(screen.getByText("Flat")).toBeInTheDocument();
    expect(screen.getByText("Compared with last week")).toBeInTheDocument();
    expect(screen.getByText("sparkline")).toBeInTheDocument();
  });

  it("exposes an accessible region name from the label and value", () => {
    renderWithTheme(<LunaMetricCard label="Active seats" value="1,284" meta="Current billing period" />);

    expect(
      screen.getByRole("region", {
        name: /Active seats 1,284/i,
        description: /Current billing period/i
      })
    ).toBeInTheDocument();
  });
});
