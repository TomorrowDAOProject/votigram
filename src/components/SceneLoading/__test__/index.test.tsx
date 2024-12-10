// SceneLoading.test.tsx
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import SceneLoading from "../index"; // Adjust path as necessary
import "@testing-library/jest-dom";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";

// Mock the useUserContext hook
vi.mock("@/provider/UserProvider", () => ({
  useUserContext: vi.fn().mockReturnValue({
    hasUserData: vi.fn(() => false),
    user: { isNewUser: true },
  }),
}));

describe("SceneLoading Component", () => {
  const mockSetIsLoading = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers(); // Initialize fake timers
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders the initial view correctly", () => {
    render(<SceneLoading setIsLoading={mockSetIsLoading} />);

    // Check the initial progress bar width
    const motionDiv = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(motionDiv).toHaveStyle("width: 0%");

    // Ensure the "Get Started!" button is not initially visible
    expect(screen.queryByTestId("cta-button")).not.toBeInTheDocument();
  });

  // it('progresses over time and eventually displays the "Get Started!" button', async () => {
  //   render(<SceneLoading setIsLoading={mockSetIsLoading} />);
  //   vi.runAllTimers();
  //   await new Promise((r) => setTimeout(r, 2000));

  //   act(() => {
  //     for (let i = 0; i < 30; i++) {
  //       vi.advanceTimersByTime(1000); // Advance timer by 1 second per loop
  //     }
  //   });

  //   // Check that the "Get Started!" button is visible
  //   expect(screen.getByTestId("cta-button")).toBeInTheDocument();
  // });

  // it('calls setIsLoading when the "Get Started!" button is clicked', () => {
  //   render(<SceneLoading setIsLoading={mockSetIsLoading} />);

  //   act(() => {
  //     for (let i = 0; i < 30; i++) {
  //       vi.advanceTimersByTime(1000); // Advance timer for full progress
  //     }
  //   });

  //   const button = screen.getByTestId("cta-button");
  //   fireEvent.click(button);

  //   expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  // });

  // it("handles user data correctly when available", () => {
  //   // Mock a different return value for hasUserData for this test
  //   vi.mock("@/provider/UserProvider", () => ({
  //     useUserContext: () => ({
  //       hasUserData: vi.fn(() => true),
  //       user: { isNewUser: false },
  //     }),
  //   }));

  //   render(<SceneLoading setIsLoading={mockSetIsLoading} />);

  //   act(() => {
  //     for (let i = 0; i < 30; i++) {
  //       vi.advanceTimersByTime(1000); // Simulate sufficient time passing
  //     }
  //   });

  //   expect(screen.getByTestId("cta-button")).toBeInTheDocument();
  //   expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  // });
});
