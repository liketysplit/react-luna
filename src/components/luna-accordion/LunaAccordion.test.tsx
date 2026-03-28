import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaAccordion } from "./LunaAccordion";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

const items = [
  {
    value: "systems",
    title: "Systems check",
    description: "Telemetry and thermal routing.",
    content: <div>Systems content</div>
  },
  {
    value: "payload",
    title: "Payload manifest",
    content: <div>Payload content</div>
  },
  {
    value: "disabled",
    title: "Disabled section",
    disabled: true,
    content: <div>Disabled content</div>
  }
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaAccordion", () => {
  it("renders buttons for each item and opens the default value", () => {
    renderWithTheme(<LunaAccordion items={items} defaultValue="systems" />);

    expect(screen.getByRole("button", { name: /Systems check/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("region", { name: /Systems check/i })).toBeVisible();
    expect(screen.getByText("Telemetry and thermal routing.")).toBeInTheDocument();
  });

  it("supports single-expand behavior by default", () => {
    renderWithTheme(<LunaAccordion items={items} defaultValue="systems" />);

    fireEvent.click(screen.getByRole("button", { name: /Payload manifest/i }));

    expect(screen.getByRole("button", { name: /Systems check/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(screen.getByRole("button", { name: /Payload manifest/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("supports multiple open items when multiple is true", () => {
    renderWithTheme(<LunaAccordion items={items} multiple />);

    fireEvent.click(screen.getByRole("button", { name: /Systems check/i }));
    fireEvent.click(screen.getByRole("button", { name: /Payload manifest/i }));

    expect(screen.getByRole("button", { name: /Systems check/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: /Payload manifest/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("keeps the open item expanded when collapsible is false", () => {
    renderWithTheme(
      <LunaAccordion items={items} defaultValue="systems" collapsible={false} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Systems check/i }));

    expect(screen.getByRole("button", { name: /Systems check/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("supports controlled usage and emits value changes", () => {
    const handleValueChange = vi.fn();

    const { rerender } = renderWithTheme(
      <LunaAccordion items={items} value="systems" onValueChange={handleValueChange} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Payload manifest/i }));

    expect(handleValueChange).toHaveBeenCalledWith("payload");

    rerender(
      <ThemeProvider>
        <LunaAccordion items={items} value="payload" onValueChange={handleValueChange} />
      </ThemeProvider>
    );

    expect(screen.getByRole("button", { name: /Payload manifest/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("does not toggle disabled items", () => {
    renderWithTheme(<LunaAccordion items={items} />);

    fireEvent.click(screen.getByRole("button", { name: /Disabled section/i }));

    expect(screen.getByRole("button", { name: /Disabled section/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    const trigger = screen.getByRole("button", { name: /Disabled section/i });
    const panelId = trigger.getAttribute("aria-controls");

    expect(document.getElementById(panelId ?? "")).toHaveAttribute("hidden");
  });

  it("applies spacing overrides onto the root style", () => {
    renderWithTheme(
      <LunaAccordion items={items} gap="5" itemGap="2" panelPadding="6" />
    );

    const accordion = screen.getByRole("button", { name: /Systems check/i }).closest(
      ".luna-accordion"
    );

    expect(accordion).toHaveStyle({
      "--luna-accordion-gap": "1.25rem",
      "--luna-accordion-item-gap": "0.5rem",
      "--luna-accordion-panel-padding": "1.5rem"
    });
  });

  it("renders the requested heading level", () => {
    renderWithTheme(<LunaAccordion items={items} headingLevel={4} />);

    expect(screen.getByRole("button", { name: /Systems check/i }).closest("h4")).toBeInTheDocument();
  });
});
