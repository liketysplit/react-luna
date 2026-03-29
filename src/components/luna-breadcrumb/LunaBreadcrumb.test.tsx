import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaBreadcrumb } from "./LunaBreadcrumb";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LunaBreadcrumb", () => {
  it("renders navigation semantics and marks the current page", () => {
    renderWithTheme(
      <LunaBreadcrumb
        items={[
          { label: "Mission control", href: "#" },
          { label: "Flights", href: "#" },
          { label: "Telemetry", current: true }
        ]}
      />
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mission control" })).toHaveAttribute("href", "#");
    expect(screen.getByText("Telemetry")).toHaveAttribute("aria-current", "page");
  });

  it("uses the last item as current when no explicit current item is provided", () => {
    renderWithTheme(
      <LunaBreadcrumb
        items={[
          { label: "Mission control", href: "#" },
          { label: "Flights", href: "#" },
          { label: "Telemetry" }
        ]}
      />
    );

    expect(screen.getByText("Telemetry")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Telemetry" })).not.toBeInTheDocument();
  });

  it("collapses long trails around the current item", () => {
    renderWithTheme(
      <LunaBreadcrumb
        maxItems={4}
        items={[
          { label: "Mission control", href: "#" },
          { label: "Flights", href: "#" },
          { label: "Outer system", href: "#" },
          { label: "Europa relay", href: "#" },
          { label: "Telemetry", href: "#" },
          { label: "Packet detail", current: true }
        ]}
      />
    );

    expect(screen.getByLabelText("Collapsed breadcrumb items")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Flights" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Telemetry" })).toBeInTheDocument();
    expect(screen.getByText("Packet detail")).toHaveAttribute("aria-current", "page");
  });

  it("supports button actions for non-link items", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <LunaBreadcrumb
        items={[
          { label: "Mission control", onClick },
          { label: "Telemetry", current: true }
        ]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Mission control" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("resolves breadcrumb theme tokens through the theme system", () => {
    const { container } = renderWithTheme(
      <LunaBreadcrumb
        size="lg"
        items={[
          { label: "Mission control", href: "#" },
          { label: "Telemetry", current: true }
        ]}
      />,
      {
        theme: {
          components: {
            breadcrumb: {
              radius: "pill",
              modes: {
                light: {
                  linkFg: "accent.500",
                  currentFg: "neutral.900",
                  mutedFg: "neutral.500",
                  separatorFg: "warning.500",
                  hoverBg: "neutral.100",
                  focusRing: "rgba(139, 92, 246, 0.24)"
                }
              },
              sizes: {
                lg: {
                  gap: "3",
                  separatorGap: "2",
                  fontSize: "lg",
                  minHeight: "12",
                  paddingX: "3",
                  paddingY: "1"
                }
              }
            }
          }
        }
      }
    );

    const providerRoot = container.querySelector("[data-luna-theme]");
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });

    expect(providerRoot).toHaveStyle({
      "--luna-breadcrumb-radius": "999px",
      "--luna-breadcrumb-link-fg": "#8b5cf6",
      "--luna-breadcrumb-separator-fg": "#f97316",
      "--luna-breadcrumb-size-lg-gap": "0.75rem",
      "--luna-breadcrumb-size-lg-min-height": "3rem"
    });
    expect(breadcrumb).toHaveAttribute("data-size", "lg");
  });
});
