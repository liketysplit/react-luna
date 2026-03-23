import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaSwitch } from "./LunaSwitch";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSwitch", () => {
  it("renders a native checkbox input", () => {
    renderWithTheme(<LunaSwitch label="Enable lunar telemetry" />);

    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toBeInTheDocument();
  });

  it("toggles through native label click behavior", () => {
    renderWithTheme(<LunaSwitch label="Enable lunar telemetry" />);

    const checkbox = screen.getByRole("checkbox", { name: /Enable lunar telemetry/i });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(screen.getByText("Enable lunar telemetry"));
    expect(checkbox).toBeChecked();
  });

  it("renders description and help text", () => {
    renderWithTheme(
      <LunaSwitch
        label="Enable lunar telemetry"
        description="Telemetry stays active while mission controls are in standby."
        helpText="Recommended for review environments."
      />
    );

    expect(
      screen.getByText("Telemetry stays active while mission controls are in standby.")
    ).toBeInTheDocument();
    expect(screen.getByText("Recommended for review environments.")).toBeInTheDocument();
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaSwitch
        label="Enable lunar telemetry"
        helpText="Recommended for review environments."
        error="Telemetry must remain enabled for this mission."
      />
    );

    expect(screen.queryByText("Recommended for review environments.")).not.toBeInTheDocument();
    expect(screen.getByText("Telemetry must remain enabled for this mission.")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("respects the disabled state", () => {
    renderWithTheme(<LunaSwitch label="Enable lunar telemetry" disabled />);

    expect(screen.getByRole("checkbox", { name: /Enable lunar telemetry/i })).toBeDisabled();
  });
});
