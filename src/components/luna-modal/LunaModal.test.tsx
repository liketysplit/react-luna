import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaModal } from "./LunaModal";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaModal", () => {
  it("renders the default modal contract with dialog semantics", () => {
    renderWithTheme(
      <LunaModal open title="Mission review" description="Review before launch.">
        Confirm the latest checklist.
      </LunaModal>
    );

    const dialog = screen.getByRole("dialog", { name: "Mission review" });

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-size", "medium");
    expect(screen.getByText("Review before launch.")).toBeInTheDocument();
    expect(screen.getByText("Confirm the latest checklist.")).toBeInTheDocument();
  });

  it("supports dismiss button, backdrop, and escape close reasons", () => {
    const onOpenChange = vi.fn();
    const { rerender, container } = renderWithTheme(
      <LunaModal open title="Close me" onOpenChange={onOpenChange}>
        Body
      </LunaModal>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onOpenChange).toHaveBeenCalledWith(false, "dismiss");

    rerender(
      <ThemeProvider>
        <LunaModal open title="Close me" onOpenChange={onOpenChange}>
          Body
        </LunaModal>
      </ThemeProvider>
    );

    fireEvent.click(container.querySelector(".luna-modal__backdrop") as Element);
    expect(onOpenChange).toHaveBeenCalledWith(false, "backdrop");

    rerender(
      <ThemeProvider>
        <LunaModal open title="Close me" onOpenChange={onOpenChange}>
          Body
        </LunaModal>
      </ThemeProvider>
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false, "escape");
  });

  it("keeps the modal open when backdrop and escape dismissal are disabled", () => {
    const onOpenChange = vi.fn();
    const { container } = renderWithTheme(
      <LunaModal
        open
        title="Pinned"
        onOpenChange={onOpenChange}
        closeOnBackdrop={false}
        closeOnEscape={false}
      >
        Body
      </LunaModal>
    );

    fireEvent.click(container.querySelector(".luna-modal__backdrop") as Element);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("supports uncontrolled visibility", () => {
    renderWithTheme(
      <LunaModal defaultOpen title="Uncontrolled">
        Body
      </LunaModal>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("focuses the dialog and restores the previous trigger focus when it closes", async () => {
    function Example() {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open modal
          </button>
          <LunaModal open={open} title="Focus test" onOpenChange={(nextOpen) => setOpen(nextOpen)}>
            Body
          </LunaModal>
        </>
      );
    }

    renderWithTheme(<Example />);

    const trigger = screen.getByRole("button", { name: "Open modal" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Focus test" });
    const dismissButton = screen.getByRole("button", { name: "Close dialog" });
    await vi.waitFor(() => {
      expect(dismissButton).toHaveFocus();
    });

    fireEvent.click(dismissButton);

    await vi.waitFor(() => {
      expect(trigger).toHaveFocus();
    });

    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("resolves modal theme tokens and spacing overrides through the theme system", () => {
    const { container } = renderWithTheme(
      <LunaModal open title="Theme override" size="large" padding="6" gap="2" inset="8">
        Custom theme.
      </LunaModal>,
      {
        theme: {
          components: {
            modal: {
              defaultSize: "large",
              radius: "pill",
              sizes: {
                large: {
                  maxWidth: "52rem"
                }
              },
              modes: {
                light: {
                  border: "accent.500"
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");
    const dialog = screen.getByRole("dialog");

    expect(providerRoot).toHaveStyle({
      "--luna-modal-size-default": "large",
      "--luna-modal-radius": "999px",
      "--luna-modal-size-large-max-width": "52rem",
      "--luna-modal-border": "#8b5cf6"
    });
    expect(dialog).toHaveAttribute("data-size", "large");
    expect(dialog).toHaveStyle({
      "--luna-modal-padding": "1.5rem",
      "--luna-modal-gap": "0.5rem",
      "--luna-modal-inset": "2rem"
    });
  });
});
