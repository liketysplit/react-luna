import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaCheckboxGroup } from "./LunaCheckboxGroup";

const options = [
  {
    value: "telemetry",
    label: "Telemetry review",
    description: "Keep mission telemetry checks enabled during the release window."
  },
  {
    value: "readiness",
    label: "Launch readiness"
  },
  {
    value: "documentation",
    label: "Documentation handoff",
    disabled: true
  }
];

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaCheckboxGroup", () => {
  it("renders a checkbox group with a legend and native checkboxes", () => {
    renderWithTheme(<LunaCheckboxGroup label="Mission review checklist" options={options} />);

    expect(screen.getByText("Mission review checklist").tagName).toBe("SPAN");
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByRole("group", { name: /Mission review checklist/i })).toBeInTheDocument();
  });

  it("supports uncontrolled multi-selection", () => {
    renderWithTheme(<LunaCheckboxGroup label="Mission review checklist" options={options} />);

    const telemetry = screen.getByRole("checkbox", { name: /Telemetry review/i });
    const readiness = screen.getByRole("checkbox", { name: /Launch readiness/i });

    fireEvent.click(screen.getByText("Telemetry review"));
    fireEvent.click(screen.getByText("Launch readiness"));

    expect(telemetry).toBeChecked();
    expect(readiness).toBeChecked();
  });

  it("supports controlled multi-selection through value and onChange", () => {
    function ControlledGroupTest() {
      const [value, setValue] = React.useState<string[]>(["telemetry"]);

      return (
        <LunaCheckboxGroup
          label="Mission review checklist"
          options={options}
          value={value}
          onChange={setValue}
        />
      );
    }

    renderWithTheme(<ControlledGroupTest />);

    const telemetry = screen.getByRole("checkbox", { name: /Telemetry review/i });
    const readiness = screen.getByRole("checkbox", { name: /Launch readiness/i });

    expect(telemetry).toBeChecked();
    expect(readiness).not.toBeChecked();

    fireEvent.click(screen.getByText("Launch readiness"));

    expect(telemetry).toBeChecked();
    expect(readiness).toBeChecked();
  });

  it("calls onChange with the next selected values", () => {
    const handleChange = vi.fn();

    renderWithTheme(
      <LunaCheckboxGroup
        label="Mission review checklist"
        options={options}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByText("Telemetry review"));
    fireEvent.click(screen.getByText("Launch readiness"));
    fireEvent.click(screen.getByText("Telemetry review"));

    expect(handleChange).toHaveBeenLastCalledWith(["readiness"]);
  });

  it("renders group description and help text", () => {
    renderWithTheme(
      <LunaCheckboxGroup
        label="Mission review checklist"
        description="Select every review gate that must be completed."
        options={options}
        helpText="Choose at least one gate."
      />
    );

    expect(screen.getByText("Select every review gate that must be completed.")).toBeInTheDocument();
    expect(screen.getByText("Choose at least one gate.")).toBeInTheDocument();
  });

  it("renders error text instead of help text when both are present", () => {
    renderWithTheme(
      <LunaCheckboxGroup
        label="Mission review checklist"
        options={options}
        helpText="Choose at least one gate."
        error="At least one checklist item must be selected."
      />
    );

    expect(screen.queryByText("Choose at least one gate.")).not.toBeInTheDocument();
    expect(screen.getByText("At least one checklist item must be selected.")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /Mission review checklist/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("respects group and option disabled states", () => {
    renderWithTheme(
      <LunaCheckboxGroup
        label="Mission review checklist"
        options={options}
        defaultValue={["telemetry"]}
        disabled
      />
    );

    expect(screen.getByRole("checkbox", { name: /Telemetry review/i })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: /Launch readiness/i })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: /Documentation handoff/i })).toBeDisabled();
  });
});
