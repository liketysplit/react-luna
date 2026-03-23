import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaSelect } from "./LunaSelect";

const options = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma", disabled: true }
];

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSelect", () => {
  it("associates the label with the native select", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} />);

    const select = screen.getByRole("button", { name: /Mission phase/i });

    expect(select.tagName).toBe("BUTTON");
  });

  it("uses inset labels by default", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} />);

    const select = screen.getByRole("button", { name: /Mission phase/i });
    const label = screen.getByText("Mission phase");

    expect(select.tagName).toBe("BUTTON");
    expect(label.closest(".luna-select-field__control")).toBeInTheDocument();
  });

  it("supports opting back to an external label", () => {
    renderWithTheme(<LunaSelect label="Mission phase" externalLabel options={options} />);

    const select = screen.getByRole("button", { name: /Mission phase/i });
    const label = screen.getByText("Mission phase");

    expect(select.tagName).toBe("BUTTON");
    expect(label.closest(".luna-select-field__control")).not.toBeInTheDocument();
  });

  it("floats inset labels when the field is focused or filled", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} />);

    const select = screen.getByRole("button", { name: /Mission phase/i });
    const field = select.closest(".luna-select-field");
    const control = select.closest(".luna-select-field__control");

    expect(field?.className).not.toContain("luna-select-field--inset-label-active");

    fireEvent.focus(select);
    expect(field?.className).toContain("luna-select-field--inset-label-active");

    fireEvent.mouseDown(control as HTMLElement);
    fireEvent.click(screen.getByRole("option", { name: "Beta" }));
    expect(field?.className).toContain("luna-select-field--inset-label-active");
  });

  it("renders a placeholder option when requested", () => {
    renderWithTheme(
      <LunaSelect label="Mission phase" options={options} placeholder="Choose a phase" />
    );

    expect(screen.getByRole("button", { name: /Mission phase/i })).toHaveTextContent("Choose a phase");
  });

  it("renders help and error text with error taking precedence", () => {
    const { rerender } = renderWithTheme(
      <LunaSelect label="Mission phase" options={options} helpText="Pick the active phase." />
    );

    expect(screen.getByText("Pick the active phase.")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaSelect
          label="Mission phase"
          options={options}
          helpText="Pick the active phase."
          error="A value is required."
        />
      </ThemeProvider>
    );

    expect(screen.queryByText("Pick the active phase.")).not.toBeInTheDocument();
    expect(screen.getByText("A value is required.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mission phase/i })).toHaveAttribute("aria-invalid", "true");
  });

  it("applies the requested size to the field root", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} inputSize="lg" />);

    const field = screen.getByRole("button", { name: /Mission phase/i }).closest(".luna-select-field");

    expect(field).toHaveAttribute("data-size", "lg");
  });

  it("opens the listbox when the control shell is clicked", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} />);

    const trigger = screen.getByRole("button", { name: /Mission phase/i });
    const control = trigger.closest(".luna-select-field__control");

    expect(control).toBeInTheDocument();

    fireEvent.mouseDown(control as HTMLElement);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("does not render fallback text under an inset label when empty", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} />);

    const trigger = screen.getByRole("button", { name: /Mission phase/i });

    expect(trigger).not.toHaveTextContent("Select an option");
  });

  it("does not open when disabled", () => {
    renderWithTheme(<LunaSelect label="Mission phase" options={options} disabled />);

    const trigger = screen.getByRole("button", { name: /Mission phase/i });
    const control = trigger.closest(".luna-select-field__control");

    fireEvent.mouseDown(control as HTMLElement);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not render a clear affordance when disabled", () => {
    renderWithTheme(
      <LunaSelect label="Mission phase" options={options} defaultValue="beta" disabled />
    );

    expect(screen.queryByRole("button", { name: "Clear selection" })).not.toBeInTheDocument();
  });

  it("clears the selected value without opening the listbox", () => {
    renderWithTheme(
      <LunaSelect label="Mission phase" options={options} defaultValue="beta" />
    );

    const trigger = screen.getByRole("button", { name: /Mission phase/i });
    const clearButton = screen.getByRole("button", { name: "Clear selection" });

    fireEvent.click(clearButton);

    expect(trigger).toHaveTextContent("");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
