import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaSkeleton } from "./LunaSkeleton";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaSkeleton", () => {
  it("renders a single decorative text skeleton by default", () => {
    renderWithTheme(<LunaSkeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    const items = skeleton.querySelectorAll(".luna-skeleton__item");

    expect(skeleton).toHaveAttribute("data-shape", "text");
    expect(skeleton).toHaveAttribute("data-animation", "wave");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveStyle({ "--luna-skeleton-current-width": "100%" });
  });

  it("renders the requested number of text lines and shortens the final line", () => {
    renderWithTheme(<LunaSkeleton data-testid="skeleton" lines={3} />);

    const skeleton = screen.getByTestId("skeleton");
    const items = skeleton.querySelectorAll(".luna-skeleton__item");

    expect(items).toHaveLength(3);
    expect(items[2]).toHaveStyle({ "--luna-skeleton-current-width": "72%" });
  });

  it("uses circle sizing when width is not provided", () => {
    renderWithTheme(<LunaSkeleton data-testid="skeleton" shape="circle" size="10" />);

    expect(screen.getByTestId("skeleton")).toHaveStyle({
      "--luna-skeleton-current-height": "2.5rem",
      "--luna-skeleton-current-width": "2.5rem"
    });
  });

  it("resolves width, height, and last line width through theme spacing tokens", () => {
    renderWithTheme(
      <LunaSkeleton
        data-testid="skeleton"
        shape="text"
        lines={2}
        width="16"
        height="3"
        lastLineWidth="8"
      />
    );

    const skeleton = screen.getByTestId("skeleton");
    const items = skeleton.querySelectorAll(".luna-skeleton__item");

    expect(skeleton).toHaveStyle({
      "--luna-skeleton-current-width": "4rem",
      "--luna-skeleton-current-height": "0.75rem"
    });
    expect(items[1]).toHaveStyle({ "--luna-skeleton-current-width": "2rem" });
  });

  it("uses user theme skeleton defaults when provided", () => {
    renderWithTheme(<LunaSkeleton data-testid="skeleton" />, {
      theme: {
        components: {
          skeleton: {
            defaultSize: "large",
            defaultAnimation: "pulse",
            sizes: {
              large: {
                height: "1.125rem"
              }
            }
          }
        }
      }
    });

    expect(screen.getByTestId("skeleton")).toHaveStyle({
      "--luna-skeleton-current-height": "1.125rem"
    });
    expect(screen.getByTestId("skeleton")).toHaveAttribute("data-animation", "pulse");
  });

  it("allows non-decorative usage to opt out of aria-hidden", () => {
    renderWithTheme(<LunaSkeleton data-testid="skeleton" decorative={false} />);

    expect(screen.getByTestId("skeleton")).not.toHaveAttribute("aria-hidden");
  });
});
