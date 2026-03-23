import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaSlider } from "./LunaSlider";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSlider", () => {
  it("renders a native range input", () => {
    renderWithTheme(<LunaSlider label="Telemetry strength" />);

    expect(screen.getByLabelText("Telemetry strength")).toHaveAttribute("type", "range");
  });

  it("shows the current value by default", () => {
    renderWithTheme(<LunaSlider label="Telemetry strength" defaultValue={42} />);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("updates the displayed value for uncontrolled changes", () => {
    renderWithTheme(<LunaSlider label="Telemetry strength" defaultValue={42} />);

    const slider = screen.getByLabelText("Telemetry strength");
    fireEvent.change(slider, { target: { value: "64" } });

    expect(screen.getByText("64")).toBeInTheDocument();
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaSlider
        label="Telemetry strength"
        helpText="Use higher values for stronger correction."
        error="Signal strength is below the required range."
      />
    );

    expect(
      screen.queryByText("Use higher values for stronger correction.")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Signal strength is below the required range.")).toBeInTheDocument();
    expect(screen.getByLabelText("Telemetry strength")).toHaveAttribute("aria-invalid", "true");
  });

  it("respects the disabled state", () => {
    renderWithTheme(<LunaSlider label="Telemetry strength" disabled />);

    expect(screen.getByLabelText("Telemetry strength")).toBeDisabled();
  });
});
