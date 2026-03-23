import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaCheckbox } from "./LunaCheckbox";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaCheckbox", () => {
  it("renders a native checkbox input", () => {
    renderWithTheme(<LunaCheckbox label="Enable lunar telemetry" />);

    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toBeInTheDocument();
  });

  it("toggles through native label click behavior", () => {
    renderWithTheme(<LunaCheckbox label="Enable lunar telemetry" />);

    const checkbox = screen.getByRole("checkbox", { name: /Enable lunar telemetry/i });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(screen.getByText("Enable lunar telemetry"));
    expect(checkbox).toBeChecked();
  });

  it("applies the indeterminate state to the native input", () => {
    renderWithTheme(<LunaCheckbox label="Enable lunar telemetry" indeterminate />);

    const checkbox = screen.getByRole("checkbox", { name: /Enable lunar telemetry/i }) as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);
  });

  it("renders description and help text", () => {
    renderWithTheme(
      <LunaCheckbox
        label="Enable lunar telemetry"
        description="Telemetry stays active during staged launches."
        helpText="Recommended for review environments."
      />
    );

    expect(screen.getByText("Telemetry stays active during staged launches.")).toBeInTheDocument();
    expect(screen.getByText("Recommended for review environments.")).toBeInTheDocument();
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaCheckbox
        label="Enable lunar telemetry"
        helpText="Recommended for review environments."
        error="Telemetry must stay enabled."
      />
    );

    expect(screen.queryByText("Recommended for review environments.")).not.toBeInTheDocument();
    expect(screen.getByText("Telemetry must stay enabled.")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("respects the disabled state", () => {
    renderWithTheme(<LunaCheckbox label="Enable lunar telemetry" disabled />);

    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toBeDisabled();
  });
});
