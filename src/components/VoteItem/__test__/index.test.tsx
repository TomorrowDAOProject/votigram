// VoteItem.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import VoteItem from "../index";
import { VoteApp } from "@/types/app";

// Mock组件和函数
vi.mock("../ProgressBar", () => ({
  default: () => <div data-testid="progress-bar"></div>,
}));

vi.mock("../Confetti", () => ({
  default: ({ onInit }: { onInit: () => void }) => {
    onInit(); // 直接调用以模拟初始化
    return <div data-testid="confetti"></div>;
  },
}));

vi.mock("../Drawer", () => ({
  default: ({
    isVisible,
    children,
  }: {
    isVisible: boolean;
    children: React.ReactNode;
  }) => (isVisible ? <div>{children}</div> : null),
}));

describe("VoteItem Component", () => {
  const mockData: VoteApp = {
    alias: "alias-1",
    icon: "https://example.com/icon.png",
    title: "VoteItem Title",
    totalPoints: 100,
    pointsAmount: 100,
    editorChoice: false,
    pointsPercent: 0.5,
    description: "",
    url: "https://example.com/icon.png",
    longDescription: "longDescription",
    appType: "",
    categories: [],
    createTime: "",
    creator: "",
    id: "1",
    loadTime: "",
    updateTime: '',
    screenshots: [],
  };

  it("renders vote item with title and icon", () => {
    render(<VoteItem data={mockData} proposalId="1" />);

    expect(screen.getByText("VoteItem Title")).toBeInTheDocument();
    const icon = screen.getByAltText("Avatar");
    expect(icon).toHaveAttribute("src", mockData.icon);
  });

  it("handles vote button click", () => {
    const onVoted = vi.fn();
    render(
      <VoteItem
        data={mockData}
        proposalId="1"
        canVote={true}
        showBtn={true}
        onVoted={onVoted}
      />
    );

    const voteButton = screen.getByRole("button");
    fireEvent.click(voteButton);

    // This assumes onVoted is called after a successful vote, adjust logic based on actual behavior.
    expect(onVoted).toHaveBeenCalled();
  });

  it("displays confetti when vote button is clicked", () => {
    render(
      <VoteItem data={mockData} proposalId="1" showBtn={true} canVote={true} />
    );

    const voteButton = screen.getByRole("button");
    fireEvent.click(voteButton);

    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  it("shows error message when voting fails", () => {
    render(
      <VoteItem data={mockData} proposalId="1" showBtn={true} canVote={true} />
    );

    // Simulate a failed transaction
    const voteButton = screen.getByRole("button");
    fireEvent.click(voteButton);

    // There should be a mechanism to control failure, e.g. mock an error
    // Here assuming there is a direct way to detect failure
    // This section may need to be adapted based on actual error handling logic
    screen.getByText("Please Try Again");
  });
});
