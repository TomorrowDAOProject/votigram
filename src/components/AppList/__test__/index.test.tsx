import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import AppList from "../index";
import { VoteApp } from "@/types/app";

describe("AppList Component", () => {
  const mockItems: VoteApp[] = [
    { title: "App One", imageUrl: "url1", points: 100 },
    { title: "App Two", imageUrl: "url2", points: 200 },
  ];

  it("renders the title correctly", () => {
    render(<AppList title="Top Apps" items={mockItems} />);

    const titleElement = screen.getByText(/Top Apps/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct number of AppItem components", () => {
    render(<AppList title="Top Apps" items={mockItems} />);

    const appItems = screen.getAllByRole("img"); // Assuming AppItem has an image role
    expect(appItems).toHaveLength(mockItems.length);
  });

  it("renders AppItems with the arrow icon", () => {
    render(<AppList title="Top Apps" items={mockItems} />);

    mockItems.forEach((_, index) => {
      const arrowIcons = screen.getAllByTestId("arrow-icon");
      expect(arrowIcons[index]).toBeInTheDocument();
    });
  });
});
