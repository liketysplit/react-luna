import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaDateInput } from "./LunaDateInput";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaDateInput", () => {
  it("renders a native date input", () => {
    renderWithTheme(<LunaDateInput label="Launch date" />);

    expect(screen.getByLabelText("Launch date")).toHaveAttribute("type", "date");
  });

  it("always floats the inset label for date inputs", () => {
    renderWithTheme(<LunaDateInput label="Launch date" />);

    const field = screen.getByLabelText("Launch date").closest(".luna-date-input-field");

    expect(field).toHaveClass("luna-date-input-field--inset-label-active");
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaDateInput
        label="Launch date"
        helpText="Use the mission review date."
        error="A launch date is required."
      />
    );

    expect(screen.queryByText("Use the mission review date.")).not.toBeInTheDocument();
    expect(screen.getByText("A launch date is required.")).toBeInTheDocument();
    expect(screen.getByLabelText("Launch date")).toHaveAttribute("aria-invalid", "true");
  });

  it("still updates through native date input changes", () => {
    renderWithTheme(<LunaDateInput label="Launch date" />);

    const input = screen.getByLabelText("Launch date");
    fireEvent.change(input, { target: { value: "2026-03-22" } });

    expect(input).toHaveValue("2026-03-22");
  });

  it("respects the disabled state", () => {
    renderWithTheme(<LunaDateInput label="Launch date" disabled />);

    expect(screen.getByLabelText("Launch date")).toBeDisabled();
  });
});
