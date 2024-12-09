// AppDetail.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppDetail from "../index";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

describe("AppDetail Component", () => {
  const mockItem = {
    icon: "icon-url",
    name: "Test App",
    briefDesc: "This is a brief description",
    description: "This is a detailed description of the app.",
  };

  it("renders correctly with initial collapsed view", () => {
    render(<AppDetail item={mockItem} />);
    expect(screen.getByText("Test App")).toBeInTheDocument();
    expect(screen.getByText("This is a brief description")).toBeInTheDocument();
    const descriptionElement = screen.getByText(
      "This is a detailed description of the app."
    );
    expect(descriptionElement).toHaveStyle("opacity: 0");
  });

  it("expands description on click", () => {
    render(<AppDetail item={mockItem} />);
    const container = screen.getByText("Test App").closest("div");
    fireEvent.click(container!);
    expect(
      screen.getByText("This is a detailed description of the app.")
    ).toBeInTheDocument();
  });

  it("collapses when clicking outside", () => {
    render(<AppDetail item={mockItem} />);
    const container = screen.getByText("Test App").closest("div");
    fireEvent.click(container!);
    expect(
      screen.getByText("This is a detailed description of the app.")
    ).toBeInTheDocument();

    fireEvent.mouseDown(document);
    const descriptionElement = screen.getByText(
      "This is a detailed description of the app."
    );
    expect(descriptionElement).toHaveStyle("opacity: 0");
  });
});
