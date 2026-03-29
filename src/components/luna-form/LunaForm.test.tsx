import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaForm } from "./LunaForm";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaForm", () => {
  it("renders a form by default", () => {
    renderWithTheme(<LunaForm header="Mission">Body</LunaForm>);

    const form = screen.getByText("Mission").closest("form");

    expect(form).toBeInTheDocument();
  });

  it("supports semantic overrides through as", () => {
    renderWithTheme(
      <LunaForm as="section" header="Mission">
        Body
      </LunaForm>
    );

    const form = screen.getByText("Mission").closest("section");

    expect(form).toBeInTheDocument();
  });

  it("renders header, body, and actions regions", () => {
    renderWithTheme(
      <LunaForm header="Mission" actions={<button type="submit">Launch</button>}>
        Body copy
      </LunaForm>
    );

    expect(screen.getByText("Mission").closest(".luna-form__header")).toBeInTheDocument();
    expect(screen.getByText("Body copy").closest(".luna-form__body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Launch" }).closest(".luna-form__actions")).toBeInTheDocument();
  });

  it("applies alignment props to the actions region", () => {
    renderWithTheme(
      <LunaForm
        header="Mission"
        actionsAlign="right"
        actions={<button type="submit">Launch</button>}
      >
        Body copy
      </LunaForm>
    );

    expect(screen.getByRole("button", { name: "Launch" }).closest(".luna-form__actions")).toHaveStyle({
      "--luna-layout-justify": "flex-end"
    });
  });

  it("resolves spacing tokens onto the root style", () => {
    renderWithTheme(
      <LunaForm header="Mission" gap="6">
        Body
      </LunaForm>
    );

    const form = screen.getByText("Mission").closest(".luna-form");

    expect(form).toHaveStyle({ "--luna-form-gap": "1.5rem" });
  });

  it("passes through native submit behavior", () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    renderWithTheme(
      <LunaForm onSubmit={handleSubmit} actions={<button type="submit">Launch</button>}>
        <input name="mission" defaultValue="Aurora" />
      </LunaForm>
    );

    fireEvent.submit(screen.getByRole("button", { name: "Launch" }).closest("form") as HTMLFormElement);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
