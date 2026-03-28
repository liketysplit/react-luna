import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaButton } from "../luna-button";
import { LunaMenu } from "./LunaMenu";

const items = [
  {
    value: "rename",
    label: "Rename mission",
    description: "Update the mission title."
  },
  {
    value: "share",
    label: "Share logbook",
    disabled: true
  },
  {
    value: "archive",
    label: "Archive mission",
    destructive: true
  }
];

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaMenu", () => {
  it("opens from the trigger and focuses the first enabled item", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <LunaMenu items={items}>
        <LunaButton>Open menu</LunaButton>
      </LunaMenu>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const menu = screen.getByRole("menu", { name: "Menu" });
    const firstItem = screen.getByRole("menuitem", { name: /Rename mission/i });

    expect(menu).toBeInTheDocument();
    expect(firstItem).toHaveFocus();
  });

  it("moves through enabled items with the keyboard and skips disabled entries", async () => {
    renderWithTheme(
      <LunaMenu items={items}>
        <LunaButton>Open menu</LunaButton>
      </LunaMenu>
    );

    const trigger = screen.getByRole("button", { name: "Open menu" });

    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    const renameItem = screen.getByRole("menuitem", { name: /Rename mission/i });
    expect(renameItem).toHaveFocus();

    fireEvent.keyDown(renameItem, { key: "ArrowDown" });

    expect(screen.getByRole("menuitem", { name: /Archive mission/i })).toHaveFocus();
  });

  it("calls selection handlers, closes the menu, and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onItemSelect = vi.fn();

    renderWithTheme(
      <LunaMenu
        items={[
          {
            value: "rename",
            label: "Rename mission",
            onSelect: onItemSelect
          }
        ]}
        onSelect={onSelect}
      >
        <LunaButton>Open menu</LunaButton>
      </LunaMenu>
    );

    const trigger = screen.getByRole("button", { name: "Open menu" });

    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: "Rename mission" }));

    expect(onItemSelect).toHaveBeenCalledWith("rename");
    expect(onSelect).toHaveBeenCalledWith("rename", expect.objectContaining({ value: "rename" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("supports controlled open state and outside click dismissal", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderWithTheme(
      <div>
        <LunaMenu items={items} open onOpenChange={onOpenChange}>
          <LunaButton>Open menu</LunaButton>
        </LunaMenu>
        <button type="button">Outside</button>
      </div>
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape and returns focus to the trigger", () => {
    renderWithTheme(
      <LunaMenu items={items}>
        <LunaButton>Open menu</LunaButton>
      </LunaMenu>
    );

    const trigger = screen.getByRole("button", { name: "Open menu" });

    fireEvent.click(trigger);

    const renameItem = screen.getByRole("menuitem", { name: /Rename mission/i });

    fireEvent.keyDown(renameItem, { key: "Escape" });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
