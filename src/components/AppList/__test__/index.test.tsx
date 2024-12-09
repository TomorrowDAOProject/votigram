import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import AppList from "../index";
import { voteAppListData } from "@/__mocks__/VoteApp";

describe("AppList Component", () => {
  it("renders the title correctly", () => {
    render(<AppList title="Top Apps" items={voteAppListData} />);

    const titleElement = screen.getByText(/Top Apps/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct number of AppItem components", () => {
    render(<AppList title="Top Apps" items={voteAppListData} />);

    const appItems = screen.getAllByRole("img"); // Assuming AppItem has an image role
    expect(appItems).toHaveLength(voteAppListData.length);
  });

  it("renders AppItems with the arrow icon", () => {
    render(<AppList title="Top Apps" items={voteAppListData} />);

    voteAppListData.forEach((_, index) => {
      const arrowIcons = screen.getAllByTestId("arrow-icon");
      expect(arrowIcons[index]).toBeInTheDocument();
    });
  });
});
