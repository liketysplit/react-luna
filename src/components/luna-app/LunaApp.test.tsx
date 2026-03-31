import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LunaApp } from "./LunaApp";

describe("LunaApp", () => {
  it("renders children", () => {
    render(<LunaApp><div>Route content</div></LunaApp>);

    expect(screen.getByText("Route content")).toBeInTheDocument();
  });

  it("applies app-level background props to the host", () => {
    render(
      <LunaApp
        data-testid="app"
        background="rgb(1, 2, 3)"
        backgroundImage="linear-gradient(red, blue)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <div>Route content</div>
      </LunaApp>
    );

    const host = screen.getByTestId("app");
    expect(host).toHaveStyle({
      background: "rgb(1, 2, 3)",
      backgroundImage: "linear-gradient(red, blue)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    });
  });

  it("applies gutter props to the inner content wrapper", () => {
    render(
      <LunaApp gutter="1rem" topGutter="2rem" rightGutter="3rem" bottomGutter="4rem" leftGutter="5rem">
        <div data-testid="route-content">Route content</div>
      </LunaApp>
    );

    const content = screen.getByTestId("route-content").parentElement;
    expect(content).toHaveStyle({
      padding: "2rem 3rem 4rem 5rem"
    });
  });
});
