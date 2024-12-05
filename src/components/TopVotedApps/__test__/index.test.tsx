import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import TopVotedApps from "../index";
import { VoteApp } from "@/types/app";

const mockItems: VoteApp[] = [
  {
    title: "App One",
    imageUrl: "app-one.png",
    points: 1500,
  },
  {
    title: "App Two",
    imageUrl: "app-two.png",
    points: 2500,
  },
  {
    title: "App Three",
    imageUrl: "app-three.png",
  },
];

describe("TopVotedApps Component", () => {
  it("renders the title", () => {
    render(<TopVotedApps items={mockItems} />);
    const titleElement = screen.getByText(/Weekly Top Voted Apps/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct number of items", () => {
    render(<TopVotedApps items={mockItems} />);
    const items = screen.getAllByRole("img");
    expect(items).toHaveLength(mockItems.length);
  });

  it("displays the correct image and points for each app", () => {
    render(<TopVotedApps items={mockItems} />);
    mockItems.forEach((item) => {
      const image = screen.getByAltText(item.title || "");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", item.imageUrl);

      const points = screen.getByTestId(`${item.title}-point`);
      expect(points.innerHTML).toBe((item.points || 0).toLocaleString());
    });
  });
});
