// ActionButton.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ActionButton from "../index"; // Adjust the import path as necessary
import "@testing-library/jest-dom";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";

// Initialize mocks before mock calls
const mockPostWithToken = vi.fn();
const mockNotificationOccurred = vi.fn();

// Mock the Confetti component
vi.mock("@/components/Confetti", () => ({
  __esModule: true,
  default: ({ onInit }: { onInit: (args: { confetti: any }) => void }) => {
    onInit({ confetti: vi.fn() });
    return <div data-testid="confetti-mock" />;
  },
}));

// Mock the postWithToken function
vi.mock("@/hooks/useData", () => ({
  postWithToken: vi.fn(),
}));

beforeEach(() => {
  // Set up any global mocks
  global.window.Telegram = {
    WebApp: {
      HapticFeedback: {
        notificationOccurred: mockNotificationOccurred,
      },
    },
  } as unknown as TelegramWebApp;
  vi.clearAllMocks();
});

describe("ActionButton Component", () => {
  const defaultProps = {
    alias: "test-alias",
    url: "https://example.com",
    totalLikes: 10,
    totalComments: 5,
    totalOpens: 3,
    updateOpenAppClick: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with initial counts", () => {
    render(<ActionButton {...defaultProps} />);
    expect(screen.getByText("10")).toBeInTheDocument(); // Likes
    expect(screen.getByText("5")).toBeInTheDocument(); // Comments
    expect(screen.getByText("3")).toBeInTheDocument(); // Opens
    expect(screen.getByTestId("confetti-mock")).toBeInTheDocument(); // Confetti mock presence
  });

  // it("increments like count and triggers confetti and notification on like button click", () => {
  //   render(<ActionButton {...defaultProps} />);

  //   const likeButton = screen.getAllByRole("button")[0];
  //   fireEvent.click(likeButton);
  //   expect(screen.getByTestId("like-label-testid")).toBeInTheDocument(); // Updated Likes

  //   act(() => {
  //     vi.advanceTimersByTime(3000);
  //   });

  //   expect(mockNotificationOccurred).toHaveBeenCalledWith("success");
  // });

  it("increments open count on open app button click", () => {
    render(<ActionButton {...defaultProps} />);

    const openAppButton = screen.getAllByRole("button")[2];
    fireEvent.click(openAppButton);
    expect(screen.getByText("4")).toBeInTheDocument(); // Updated Opens
    expect(defaultProps.updateOpenAppClick).toHaveBeenCalledWith(
      "test-alias",
      "https://example.com"
    );
  });
});
