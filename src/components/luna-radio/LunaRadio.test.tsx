import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaRadio } from "./LunaRadio";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaRadio", () => {
  it("renders a native radio input", () => {
    renderWithTheme(<LunaRadio name="telemetry" label="Orbital telemetry" />);

    expect(screen.getByRole("radio", { name: /Orbital telemetry/i })).toBeInTheDocument();
  });

  it("selects through native label click behavior", () => {
    renderWithTheme(<LunaRadio name="telemetry" label="Orbital telemetry" />);

    const radio = screen.getByRole("radio", { name: /Orbital telemetry/i });

    expect(radio).not.toBeChecked();
    fireEvent.click(screen.getByText("Orbital telemetry"));
    expect(radio).toBeChecked();
  });

  it("supports grouped selection through shared name and controlled state", () => {
    function GroupedRadioTest() {
      const [value, setValue] = React.useState("standard");

      return (
        <>
          <LunaRadio
            name="launch-window"
            value="standard"
            label="Standard window"
            checked={value === "standard"}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                setValue("standard");
              }
            }}
          />
          <LunaRadio
            name="launch-window"
            value="priority"
            label="Priority window"
            checked={value === "priority"}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                setValue("priority");
              }
            }}
          />
        </>
      );
    }

    renderWithTheme(<GroupedRadioTest />);

    const standard = screen.getByRole("radio", { name: /Standard window/i });
    const priority = screen.getByRole("radio", { name: /Priority window/i });

    expect(standard).toBeChecked();
    expect(priority).not.toBeChecked();

    fireEvent.click(screen.getByText("Priority window"));

    expect(standard).not.toBeChecked();
    expect(priority).toBeChecked();
  });

  it("renders description and help text", () => {
    renderWithTheme(
      <LunaRadio
        name="telemetry"
        label="Orbital telemetry"
        description="Recommended for routine lunar reviews."
        helpText="Only one telemetry mode can be active."
      />
    );

    expect(screen.getByText("Recommended for routine lunar reviews.")).toBeInTheDocument();
    expect(screen.getByText("Only one telemetry mode can be active.")).toBeInTheDocument();
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaRadio
        name="telemetry"
        label="Orbital telemetry"
        helpText="Only one telemetry mode can be active."
        error="A telemetry mode must be selected."
      />
    );

    expect(screen.queryByText("Only one telemetry mode can be active.")).not.toBeInTheDocument();
    expect(screen.getByText("A telemetry mode must be selected.")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Orbital telemetry/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("respects the disabled state", () => {
    renderWithTheme(<LunaRadio name="telemetry" label="Orbital telemetry" disabled />);

    expect(screen.getByRole("radio", { name: /Orbital telemetry/i })).toBeDisabled();
  });
});
