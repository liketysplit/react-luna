import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme";
import type { ThemeProviderProps } from "../../theme/provider";
import { LunaAvatar } from "./LunaAvatar";

function renderWithTheme(
  ui: React.ReactElement,
  themeProps?: Omit<ThemeProviderProps, "children">
) {
  return render(<ThemeProvider {...themeProps}>{ui}</ThemeProvider>);
}

afterEach(() => {
  cleanup();
});

describe("LunaAvatar", () => {
  it("renders initials derived from name by default", () => {
    renderWithTheme(<LunaAvatar name="Luna Orbit" />);

    const avatar = screen.getByRole("img", { name: "Luna Orbit" });

    expect(avatar).toHaveAttribute("data-content", "initials");
    expect(avatar).toHaveTextContent("LO");
  });

  it("prefers explicit initials over derived name initials", () => {
    renderWithTheme(<LunaAvatar name="Luna Orbit" initials="nd" />);

    expect(screen.getByRole("img", { name: "Luna Orbit" })).toHaveTextContent("ND");
  });

  it("renders an image when src is provided", () => {
    renderWithTheme(<LunaAvatar src="/moon.png" name="Luna Orbit" />);

    const image = screen.getByRole("img", { name: "Luna Orbit" });

    expect(image.tagName).toBe("IMG");
  });

  it("falls back to initials when the image fails to load", () => {
    renderWithTheme(<LunaAvatar src="/moon.png" name="Luna Orbit" />);

    fireEvent.error(screen.getByRole("img", { name: "Luna Orbit" }));

    const avatar = screen.getByRole("img", { name: "Luna Orbit" });

    expect(avatar).toHaveAttribute("data-content", "initials");
    expect(avatar).toHaveTextContent("LO");
  });

  it("renders custom fallback content when initials are unavailable", () => {
    renderWithTheme(
      <LunaAvatar fallback={<span aria-hidden="true">✦</span>} aria-label="Fallback star avatar" />
    );

    const avatar = screen.getByRole("img", { name: "Fallback star avatar" });

    expect(avatar).toHaveAttribute("data-content", "fallback");
    expect(avatar).toHaveTextContent("✦");
  });

  it("uses the theme default size and radius values", () => {
    renderWithTheme(<LunaAvatar name="Luna Orbit" />);

    expect(screen.getByRole("img", { name: "Luna Orbit" })).toHaveStyle({
      "--luna-avatar-size": "2.5rem"
    });
  });

  it("uses user theme avatar sizing when provided", () => {
    renderWithTheme(<LunaAvatar name="Luna Orbit" />, {
      theme: {
        components: {
          avatar: {
            defaultSize: "small",
            sizes: {
              small: {
                size: "1.75rem",
                fontSize: "0.6875rem"
              }
            }
          }
        }
      }
    });

    expect(screen.getByRole("img", { name: "Luna Orbit" })).toHaveStyle({
      "--luna-avatar-size": "1.75rem",
      "--luna-avatar-font-size": "0.6875rem"
    });
  });

  it("accepts raw CSS sizes outside the named theme tiers", () => {
    renderWithTheme(<LunaAvatar name="Luna Orbit" size="3.75rem" />);

    expect(screen.getByRole("img", { name: "Luna Orbit" })).toHaveStyle({
      "--luna-avatar-size": "3.75rem"
    });
  });
});
