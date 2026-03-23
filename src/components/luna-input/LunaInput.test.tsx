import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaInput } from "./LunaInput";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaInput", () => {
  it("associates the label with the native input", () => {
    renderWithTheme(<LunaInput label="Mission name" />);

    const input = screen.getByLabelText("Mission name");

    expect(input.tagName).toBe("INPUT");
  });

  it("uses inset labels by default inside the control shell", () => {
    renderWithTheme(<LunaInput label="Mission name" />);

    const input = screen.getByLabelText("Mission name");
    const insetLabel = screen.getByText("Mission name");

    expect(input.tagName).toBe("INPUT");
    expect(insetLabel.closest(".luna-input-field__control")).toBeInTheDocument();
  });

  it("floats inset labels when the field is focused or filled", () => {
    renderWithTheme(<LunaInput label="Mission name" />);

    const input = screen.getByLabelText("Mission name");
    const field = input.closest(".luna-input-field");

    expect(field?.className).not.toContain("luna-input-field--inset-label-active");

    fireEvent.focus(input);
    expect(field?.className).toContain("luna-input-field--inset-label-active");

    fireEvent.change(input, { target: { value: "Apollo" } });
    fireEvent.blur(input);
    expect(field?.className).toContain("luna-input-field--inset-label-active");
  });

  it("supports opting back to an external label", () => {
    renderWithTheme(<LunaInput label="Mission name" externalLabel />);

    const input = screen.getByLabelText("Mission name");
    const label = screen.getByText("Mission name");

    expect(input.tagName).toBe("INPUT");
    expect(label.closest(".luna-input-field__control")).not.toBeInTheDocument();
    expect(label.closest(".luna-input-field__label")).toBeInTheDocument();
  });

  it("passes through defaultValue and placeholder to the native input", () => {
    renderWithTheme(<LunaInput defaultValue="Orbital review" placeholder="Enter text" />);

    expect(screen.getByDisplayValue("Orbital review")).toHaveAttribute("placeholder", "Enter text");
  });

  it("renders help text and connects it through aria-describedby", () => {
    renderWithTheme(<LunaInput label="Mission" helpText="Use a short title." />);

    const input = screen.getByLabelText("Mission");
    const message = screen.getByText("Use a short title.");

    expect(input).toHaveAttribute("aria-describedby", message.getAttribute("id"));
  });

  it("lets error win over help text and marks the input invalid", () => {
    renderWithTheme(
      <LunaInput label="Mission" helpText="Helper" error="A value is required." />
    );

    const input = screen.getByLabelText("Mission");

    expect(screen.getByText("A value is required.")).toBeInTheDocument();
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders leading and trailing content inside the control shell", () => {
    renderWithTheme(
      <LunaInput
        label="Amount"
        leading={<span data-testid="leading">USD</span>}
        trailing={<span data-testid="trailing">per cycle</span>}
      />
    );

    expect(screen.getByTestId("leading")).toBeInTheDocument();
    expect(screen.getByTestId("trailing")).toBeInTheDocument();
  });

  it("applies the requested size to the field root", () => {
    renderWithTheme(<LunaInput label="Mission" inputSize="lg" />);

    const field = screen.getByLabelText("Mission").closest(".luna-input-field");

    expect(field).toHaveAttribute("data-size", "lg");
  });

  it("applies full width styling when requested", () => {
    renderWithTheme(<LunaInput label="Mission" fullWidth />);

    const field = screen.getByLabelText("Mission").closest(".luna-input-field");

    expect(field?.className).toContain("luna-input-field--full-width");
  });
});
