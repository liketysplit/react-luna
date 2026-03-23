import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaMultiselect } from "./LunaMultiselect";

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

describe("LunaMultiselect", () => {
  it("uses inset labels by default", () => {
    renderWithTheme(<LunaMultiselect label="Mission checks" options={options} />);

    const trigger = screen.getByRole("button", { name: /Mission checks/i });
    const label = screen.getByText("Mission checks");

    expect(trigger.tagName).toBe("BUTTON");
    expect(label.closest(".luna-multiselect-field__control")).toBeInTheDocument();
  });

  it("supports opting back to an external label", () => {
    renderWithTheme(
      <LunaMultiselect label="Mission checks" externalLabel options={options} />
    );

    const label = screen.getByText("Mission checks");

    expect(label.closest(".luna-multiselect-field__control")).not.toBeInTheDocument();
  });

  it("opens the listbox when the control shell is clicked", () => {
    renderWithTheme(<LunaMultiselect label="Mission checks" options={options} />);

    const trigger = screen.getByRole("button", { name: /Mission checks/i });
    const control = trigger.closest(".luna-multiselect-field__control");

    fireEvent.mouseDown(control as HTMLElement);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("toggles an option without closing the listbox", () => {
    renderWithTheme(<LunaMultiselect label="Mission checks" options={options} />);

    const control = screen
      .getByRole("button", { name: /Mission checks/i })
      .closest(".luna-multiselect-field__control");

    fireEvent.mouseDown(control as HTMLElement);
    fireEvent.click(screen.getByRole("option", { name: /Alpha/i }));

    expect(
      screen
        .getByRole("button", { name: /Mission checks/i })
        .closest(".luna-multiselect-field")
    ).toHaveClass("luna-multiselect-field--open");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("summarizes multiple selections as first label plus count", () => {
    renderWithTheme(
      <LunaMultiselect
        label="Mission checks"
        options={options}
        defaultValue={["alpha", "beta"]}
      />
    );

    expect(screen.getByRole("button", { name: /Mission checks/i })).toHaveTextContent(
      "Alpha (+1)"
    );
  });

  it("renders a placeholder when empty", () => {
    renderWithTheme(
      <LunaMultiselect
        label="Mission checks"
        options={options}
        placeholder="Choose checks"
      />
    );

    expect(screen.getByRole("button", { name: /Mission checks/i })).toHaveTextContent(
      "Choose checks"
    );
  });

  it("does not render fallback text under an inset label when empty and no placeholder exists", () => {
    renderWithTheme(<LunaMultiselect label="Mission checks" options={options} />);

    expect(screen.getByRole("button", { name: /Mission checks/i })).not.toHaveTextContent(
      "Select an option"
    );
  });

  it("clears all selected values without opening the listbox", () => {
    renderWithTheme(
      <LunaMultiselect
        label="Mission checks"
        options={options}
        defaultValue={["alpha", "beta"]}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));

    const trigger = screen.getByRole("button", { name: /Mission checks/i });
    expect(trigger).toHaveTextContent("");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not open when disabled", () => {
    renderWithTheme(<LunaMultiselect label="Mission checks" options={options} disabled />);

    const trigger = screen.getByRole("button", { name: /Mission checks/i });
    const control = trigger.closest(".luna-multiselect-field__control");

    fireEvent.mouseDown(control as HTMLElement);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not render a clear affordance when disabled", () => {
    renderWithTheme(
      <LunaMultiselect
        label="Mission checks"
        options={options}
        defaultValue={["alpha", "beta"]}
        disabled
      />
    );

    expect(screen.queryByRole("button", { name: "Clear selection" })).not.toBeInTheDocument();
  });

  it("renders help and error text with error taking precedence", () => {
    const { rerender } = renderWithTheme(
      <LunaMultiselect
        label="Mission checks"
        options={options}
        helpText="Pick every gate that applies."
      />
    );

    expect(screen.getByText("Pick every gate that applies.")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LunaMultiselect
          label="Mission checks"
          options={options}
          helpText="Pick every gate that applies."
          error="You need at least one check."
        />
      </ThemeProvider>
    );

    expect(screen.queryByText("Pick every gate that applies.")).not.toBeInTheDocument();
    expect(screen.getByText("You need at least one check.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mission checks/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("applies the requested size to the field root", () => {
    renderWithTheme(
      <LunaMultiselect label="Mission checks" options={options} inputSize="lg" />
    );

    const field = screen
      .getByRole("button", { name: /Mission checks/i })
      .closest(".luna-multiselect-field");

    expect(field).toHaveAttribute("data-size", "lg");
  });

  it("calls onChange with the next selected values", () => {
    const handleChange = vi.fn();

    renderWithTheme(
      <LunaMultiselect label="Mission checks" options={options} onChange={handleChange} />
    );

    const control = screen
      .getByRole("button", { name: /Mission checks/i })
      .closest(".luna-multiselect-field__control");

    fireEvent.mouseDown(control as HTMLElement);
    fireEvent.click(screen.getByRole("option", { name: /Alpha/i }));
    fireEvent.click(screen.getByRole("option", { name: /Beta/i }));

    expect(handleChange).toHaveBeenLastCalledWith(["alpha", "beta"]);
  });
});
