// ImageCarousel.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ImageCarousel from "../index"; // Adjust the path as necessary
import "@testing-library/jest-dom"; // For extended assertions
import { describe, expect, it } from "vitest";

describe("ImageCarousel", () => {
  const items = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  it("renders without crashing", () => {
    render(<ImageCarousel items={items} />);
    expect(screen.getAllByRole("img").length).toBe(3);
  });

  it("renders correct number of slides", () => {
    render(<ImageCarousel items={items} />);
    const slides = screen.getAllByRole("img");
    expect(slides).toHaveLength(items.length);
  });

  it("renders images with correct src attributes", () => {
    render(<ImageCarousel items={items} />);
    items.forEach((item, index) => {
      const img = screen.getAllByRole("img")[index];
      expect(img).toHaveAttribute("src", item);
    });
  });
});
