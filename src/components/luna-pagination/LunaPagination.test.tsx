import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaPagination } from "./LunaPagination";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaPagination", () => {
  it("renders a collapsed page range with the current page marked", () => {
    renderWithTheme(<LunaPagination currentPage={5} totalPages={10} />);

    const navigation = screen.getByRole("navigation", { name: "Pagination" });
    const currentPage = screen.getByRole("button", { name: "Current page, page 5" });

    expect(navigation).toBeInTheDocument();
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Go to page 2" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 10" })).toBeInTheDocument();
  });

  it("calls onPageChange for previous, next, and direct page selection", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    renderWithTheme(
      <LunaPagination currentPage={3} totalPages={6} onPageChange={onPageChange} />
    );

    await user.click(screen.getByRole("button", { name: "Go to previous page" }));
    await user.click(screen.getByRole("button", { name: "Go to next page" }));
    await user.click(screen.getByRole("button", { name: "Go to page 6" }));

    expect(onPageChange).toHaveBeenCalledTimes(3);
    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 6);
  });

  it("does not fire changes for the current page or disabled boundary controls", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    renderWithTheme(
      <LunaPagination currentPage={1} totalPages={4} onPageChange={onPageChange} />
    );

    await user.click(screen.getByRole("button", { name: "Current page, page 1" }));
    await user.click(screen.getByRole("button", { name: "Go to previous page" }));

    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
  });

  it("supports compact sizing and hiding the directional controls", () => {
    renderWithTheme(
      <LunaPagination
        currentPage={2}
        totalPages={5}
        size="sm"
        showPreviousNext={false}
      />
    );

    expect(screen.queryByRole("button", { name: "Go to previous page" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Current page, page 2" })).toHaveAttribute(
      "data-size",
      "small"
    );
  });

  it("returns nothing when there are no pages to render", () => {
    renderWithTheme(<LunaPagination currentPage={1} totalPages={0} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
