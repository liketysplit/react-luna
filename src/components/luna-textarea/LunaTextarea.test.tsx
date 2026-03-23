import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaTextarea } from "./LunaTextarea";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaTextarea", () => {
  it("associates the label with the native textarea", () => {
    renderWithTheme(<LunaTextarea label="Mission notes" />);

    const textarea = screen.getByLabelText("Mission notes");

    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("uses inset labels by default", () => {
    renderWithTheme(<LunaTextarea label="Mission notes" />);

    const textarea = screen.getByLabelText("Mission notes");
    const label = screen.getByText("Mission notes");

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(label.closest(".luna-textarea-field__control")).toBeInTheDocument();
  });

  it("supports opting back to an external label", () => {
    renderWithTheme(<LunaTextarea label="Mission notes" externalLabel />);

    const textarea = screen.getByLabelText("Mission notes");
    const label = screen.getByText("Mission notes");

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(label.closest(".luna-textarea-field__control")).not.toBeInTheDocument();
  });

  it("floats inset labels when the field is focused or filled", () => {
    renderWithTheme(<LunaTextarea label="Mission notes" />);

    const textarea = screen.getByLabelText("Mission notes");
    const field = textarea.closest(".luna-textarea-field");

    expect(field?.className).not.toContain("luna-textarea-field--inset-label-active");

    fireEvent.focus(textarea);
    expect(field?.className).toContain("luna-textarea-field--inset-label-active");

    fireEvent.change(textarea, { target: { value: "Apollo" } });
    fireEvent.blur(textarea);
    expect(field?.className).toContain("luna-textarea-field--inset-label-active");
  });

  it("lets error win over help text and marks the textarea invalid", () => {
    renderWithTheme(
      <LunaTextarea label="Mission notes" helpText="Helper" error="A longer note is required." />
    );

    const textarea = screen.getByLabelText("Mission notes");

    expect(screen.getByText("A longer note is required.")).toBeInTheDocument();
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("applies the requested size to the field root", () => {
    renderWithTheme(<LunaTextarea label="Mission notes" inputSize="lg" />);

    const field = screen.getByLabelText("Mission notes").closest(".luna-textarea-field");

    expect(field).toHaveAttribute("data-size", "lg");
  });

  it("applies resize and height styling", () => {
    renderWithTheme(
      <LunaTextarea label="Mission notes" resize="none" minHeight="10" height="12" />
    );

    const textarea = screen.getByLabelText("Mission notes");

    expect(textarea).toHaveStyle({
      minHeight: "var(--luna-textarea-min-height, auto)",
      height: "var(--luna-textarea-height, auto)"
    });
    expect(textarea.closest(".luna-textarea-field__control")).toHaveStyle({
      "--luna-textarea-resize": "none",
      "--luna-textarea-min-height": "2.5rem",
      "--luna-textarea-height": "3rem"
    });
  });
});
