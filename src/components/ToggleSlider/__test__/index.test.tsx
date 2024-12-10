// ToggleSlider.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToggleSlider from "../index";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

describe("ToggleSlider Component", () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  const mockOffset = (
    element: HTMLElement,
    offsetLeft: number,
    offsetWidth: number
  ) => {
    // Mock offsetLeft
    Object.defineProperty(element, "offsetLeft", {
      configurable: true,
      value: offsetLeft,
    });
    // Mock offsetWidth
    Object.defineProperty(element, "offsetWidth", {
      configurable: true,
      value: offsetWidth,
    });
  };

  it("renders all items correctly", () => {
    render(<ToggleSlider items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("changes active index on click and updates the slider position", async () => {
    render(<ToggleSlider items={items} />);

    const itemElements = screen.getAllByText(/Item \d/);
    itemElements.forEach((element, index) => {
      mockOffset(element, index * 100, 100);
    });

    const itemToClick = screen.getByText("Item 2");
    fireEvent.click(itemToClick);

    // Wait for potential state updates or effects
    await new Promise((r) => setTimeout(r, 2000));

    // Assuming the active item has the class "font-bold"
    expect(itemToClick).toHaveClass("font-bold");

    // Verify slider position after click (using mocked offset)
    const motionDiv = document.querySelector('div[data-testid="selector-bg"]');
    expect(motionDiv).toHaveStyle({
      width: "100px",
      transform: "translateX(100px)",
    });
  });
});
