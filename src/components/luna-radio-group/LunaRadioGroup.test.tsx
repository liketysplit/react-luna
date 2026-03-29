import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaRadioGroup } from "./LunaRadioGroup";

const items = [
  {
    value: "standard",
    label: "Standard window",
    description: "Balanced launch profile for routine missions."
  },
  {
    value: "priority",
    label: "Priority window",
    description: "Use when mission timing takes precedence."
  },
  {
    value: "hold",
    label: "Hold launch",
    description: "Keep the vehicle grounded until the next review cycle."
  },
  {
    value: "disabled",
    label: "Disabled option",
    disabled: true
  }
];

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaRadioGroup", () => {
  it("renders a grouped set of radio inputs with a legend", () => {
    renderWithTheme(<LunaRadioGroup label="Launch window" name="launch-window" items={items} />);

    expect(screen.getByText("Launch window", { selector: "legend" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("supports uncontrolled selection with defaultValue", () => {
    renderWithTheme(
      <LunaRadioGroup
        label="Launch window"
        name="launch-window"
        items={items}
        defaultValue="standard"
      />
    );

    const standard = screen.getByRole("radio", { name: /Standard window/i });
    const priority = screen.getByRole("radio", { name: /Priority window/i });

    expect(standard).toBeChecked();
    expect(priority).not.toBeChecked();

    fireEvent.click(screen.getByText("Priority window"));

    expect(standard).not.toBeChecked();
    expect(priority).toBeChecked();
  });

  it("supports controlled value updates through onValueChange", () => {
    function ControlledGroupTest() {
      const [value, setValue] = React.useState("standard");

      return (
        <LunaRadioGroup
          label="Launch window"
          name="launch-window"
          items={items}
          value={value}
          onValueChange={setValue}
        />
      );
    }

    renderWithTheme(<ControlledGroupTest />);

    const standard = screen.getByRole("radio", { name: /Standard window/i });
    const hold = screen.getByRole("radio", { name: /Hold launch/i });

    fireEvent.click(screen.getByText("Hold launch"));

    expect(standard).not.toBeChecked();
    expect(hold).toBeChecked();
  });

  it("calls onValueChange with the selected option value", () => {
    const onValueChange = vi.fn();

    renderWithTheme(
      <LunaRadioGroup
        label="Launch window"
        name="launch-window"
        items={items}
        onValueChange={onValueChange}
      />
    );

    fireEvent.click(screen.getByText("Priority window"));

    expect(onValueChange).toHaveBeenCalledWith("priority");
  });

  it("renders description and support text with error taking precedence", () => {
    const { rerender } = renderWithTheme(
      <LunaRadioGroup
        label="Launch window"
        description="Keep the mission review locked to a single active profile."
        name="launch-window"
        items={items}
        helpText="Choose the launch profile for the upcoming review."
      />
    );

    expect(
      screen.getByText("Keep the mission review locked to a single active profile.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Choose the launch profile for the upcoming review.")
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaRadioGroup
          label="Launch window"
          name="launch-window"
          items={items}
          helpText="Choose the launch profile for the upcoming review."
          error="A launch profile must be selected."
        />
      </ThemeProvider>
    );

    expect(
      screen.queryByText("Choose the launch profile for the upcoming review.")
    ).not.toBeInTheDocument();
    expect(screen.getByText("A launch profile must be selected.")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /Launch window/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("applies disabled state to the whole group and to disabled items", () => {
    const { rerender } = renderWithTheme(
      <LunaRadioGroup label="Launch window" name="launch-window" items={items} />
    );

    expect(screen.getByRole("radio", { name: /Disabled option/i })).toBeDisabled();

    rerender(
      <ThemeProvider>
        <LunaRadioGroup label="Launch window" name="launch-window" items={items} disabled />
      </ThemeProvider>
    );

    expect(screen.getByRole("radio", { name: /Standard window/i })).toBeDisabled();
    expect(screen.getByRole("group", { name: /Launch window/i })).toBeDisabled();
  });
});
