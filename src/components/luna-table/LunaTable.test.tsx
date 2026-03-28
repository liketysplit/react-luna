import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import { LunaTable } from "./LunaTable";
import type { LunaTableColumn } from "./LunaTable.props";

type MissionRow = {
  id: string;
  pilot: string;
  status: string;
  window: string;
};

const columns: Array<LunaTableColumn<MissionRow>> = [
  { accessorKey: "pilot", header: "Pilot" },
  { accessorKey: "status", header: "Status", align: "center" },
  { accessorKey: "window", header: "Window", align: "right", width: "10rem" },
  {
    id: "actions",
    header: "Actions",
    align: "right",
    renderCell: (row) => <button type="button">View {row.id}</button>
  }
];

const rows: MissionRow[] = [
  {
    id: "mission-1",
    pilot: "Aria Sol",
    status: "Ready",
    window: "03:10 UTC"
  }
];

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaTable", () => {
  it("renders semantic table markup with caption, headers, and cells", () => {
    renderWithTheme(
      <LunaTable caption="Launch roster" columns={columns} getRowKey={(row) => row.id} rows={rows} />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Launch roster").tagName).toBe("CAPTION");
    expect(screen.getByRole("columnheader", { name: "Pilot" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Aria Sol" })).toBeInTheDocument();
  });

  it("uses renderCell when provided", () => {
    renderWithTheme(
      <LunaTable columns={columns} getRowKey={(row) => row.id} rows={rows} />
    );

    expect(screen.getByRole("button", { name: "View mission-1" })).toBeInTheDocument();
  });

  it("renders the empty state across all columns", () => {
    renderWithTheme(
      <LunaTable columns={columns} emptyState="No missions queued." rows={[]} />
    );

    const emptyCell = screen.getByText("No missions queued.");

    expect(emptyCell).toHaveAttribute("colspan", String(columns.length));
  });

  it("applies density and modifier flags to the root", () => {
    renderWithTheme(
      <LunaTable
        columns={columns}
        density="comfortable"
        hoverable
        rows={rows}
        stickyHeader
        striped
      />
    );

    const root = screen.getByRole("table").closest(".luna-table");

    expect(root).toHaveAttribute("data-density", "comfortable");
    expect(root?.className).toContain("luna-table--hoverable");
    expect(root?.className).toContain("luna-table--striped");
    expect(root?.className).toContain("luna-table--sticky-header");
  });

  it("applies alignment and width styles to the configured column", () => {
    renderWithTheme(<LunaTable columns={columns} rows={rows} />);

    const rightAlignedHeader = screen.getByRole("columnheader", { name: "Window" });
    const bodyRow = screen.getByRole("row", { name: /Aria Sol/ });
    const rightAlignedCell = within(bodyRow).getByRole("cell", { name: "03:10 UTC" });

    expect(rightAlignedHeader).toHaveAttribute("data-align", "right");
    expect(rightAlignedHeader).toHaveStyle({ width: "10rem" });
    expect(rightAlignedCell).toHaveAttribute("data-align", "right");
    expect(rightAlignedCell).toHaveStyle({ width: "10rem" });
  });

  it("uses getRowClassName to decorate rendered rows", () => {
    renderWithTheme(
      <LunaTable
        columns={columns}
        getRowClassName={(row) => (row.status === "Ready" ? "mission-ready" : undefined)}
        rows={rows}
      />
    );

    expect(screen.getByRole("row", { name: /Aria Sol/ })).toHaveClass("mission-ready");
  });
});
