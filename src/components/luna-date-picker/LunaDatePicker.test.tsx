import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaDatePicker } from "./LunaDatePicker";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaDatePicker", () => {
  it("renders the native fallback in simple mode", () => {
    renderWithTheme(<LunaDatePicker mode="simple" label="Launch date" />);

    expect(screen.getByLabelText("Launch date")).toHaveAttribute("type", "date");
  });

  it("opens the calendar in picker mode and selects a date", () => {
    const handleChange = vi.fn();
    renderWithTheme(<LunaDatePicker mode="picker" label="Launch date" onChange={handleChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    fireEvent.click(screen.getByRole("button", { name: "23" }));

    expect(handleChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
  });

  it("selects a range in range mode", () => {
    const handleChange = vi.fn();
    renderWithTheme(<LunaDatePicker mode="range" label="Launch window" onChange={handleChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    fireEvent.click(screen.getAllByRole("button", { name: "10" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "13" })[0]);

    expect(handleChange).toHaveBeenLastCalledWith({
      start: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      end: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    });
  });

  it("renders error text instead of help text", () => {
    renderWithTheme(
      <LunaDatePicker
        mode="picker"
        label="Launch date"
        helpText="Choose the mission review date."
        error="A launch date is required."
      />
    );

    expect(screen.queryByText("Choose the mission review date.")).not.toBeInTheDocument();
    expect(screen.getByText("A launch date is required.")).toBeInTheDocument();
  });

  it("shows a clear affordance for picker values", () => {
    renderWithTheme(<LunaDatePicker mode="picker" label="Launch date" value="2026-03-23" />);

    expect(screen.getByRole("button", { name: "Clear value" })).toBeInTheDocument();
  });

  it("renders an attached calendar button and keeps footer actions inside the panel", () => {
    renderWithTheme(
      <LunaDatePicker
        mode="picker"
        label="Launch date"
        buttonPosition="pre"
      />
    );

    expect(screen.getByRole("button", { name: "Open calendar" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));

    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Done" })).toBeInTheDocument();
  });
});
