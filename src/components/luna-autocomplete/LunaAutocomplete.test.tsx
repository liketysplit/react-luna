import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaAutocomplete } from "./LunaAutocomplete";

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

describe("LunaAutocomplete", () => {
  it("uses inset labels by default", () => {
    renderWithTheme(<LunaAutocomplete label="Mission check" options={options} />);

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    const label = screen.getByText("Mission check");

    expect(input.tagName).toBe("INPUT");
    expect(label.closest(".luna-autocomplete-field__control")).toBeInTheDocument();
  });

  it("supports opting back to an external label", () => {
    renderWithTheme(
      <LunaAutocomplete label="Mission check" externalLabel options={options} />
    );

    const label = screen.getByText("Mission check");
    expect(label.closest(".luna-autocomplete-field__control")).not.toBeInTheDocument();
  });

  it("focuses and opens from the whole control shell", () => {
    renderWithTheme(<LunaAutocomplete label="Mission check" options={options} />);

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    const control = input.closest(".luna-autocomplete-field__control");

    fireEvent.mouseDown(control as HTMLElement);

    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filters options as the user types", () => {
    renderWithTheme(<LunaAutocomplete label="Mission check" options={options} />);

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "be" } });

    expect(screen.getByRole("option", { name: "Beta" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Alpha" })).not.toBeInTheDocument();
  });

  it("commits the highlighted option on enter", () => {
    const handleChange = vi.fn();

    renderWithTheme(
      <LunaAutocomplete label="Mission check" options={options} onChange={handleChange} />
    );

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "be" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenLastCalledWith("beta");
    expect(input).toHaveValue("Beta");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("shows a no-results row when nothing matches", () => {
    renderWithTheme(
      <LunaAutocomplete
        label="Mission check"
        options={options}
        noResultsText="Nothing matched."
      />
    );

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "zzz" } });

    expect(screen.getByText("Nothing matched.")).toBeInTheDocument();
  });

  it("clears the selected value and query", () => {
    const handleChange = vi.fn();

    renderWithTheme(
      <LunaAutocomplete
        label="Mission check"
        options={options}
        defaultValue="alpha"
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear value" }));

    const input = screen.getByRole("combobox", { name: /Mission check/i });
    expect(input).toHaveValue("");
    expect(handleChange).toHaveBeenLastCalledWith("");
  });

  it("does not render a clear affordance when disabled", () => {
    renderWithTheme(
      <LunaAutocomplete
        label="Mission check"
        options={options}
        defaultValue="alpha"
        disabled
      />
    );

    expect(screen.queryByRole("button", { name: "Clear value" })).not.toBeInTheDocument();
  });

  it("renders help and error text with error taking precedence", () => {
    const { rerender } = renderWithTheme(
      <LunaAutocomplete
        label="Mission check"
        options={options}
        helpText="Type to narrow the list."
      />
    );

    expect(screen.getByText("Type to narrow the list.")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaAutocomplete
          label="Mission check"
          options={options}
          helpText="Type to narrow the list."
          error="You need to choose a valid check."
        />
      </ThemeProvider>
    );

    expect(screen.queryByText("Type to narrow the list.")).not.toBeInTheDocument();
    expect(screen.getByText("You need to choose a valid check.")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Mission check/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("applies the requested size to the field root", () => {
    renderWithTheme(
      <LunaAutocomplete label="Mission check" options={options} inputSize="lg" />
    );

    const field = screen
      .getByRole("combobox", { name: /Mission check/i })
      .closest(".luna-autocomplete-field");

    expect(field).toHaveAttribute("data-size", "lg");
  });
});
