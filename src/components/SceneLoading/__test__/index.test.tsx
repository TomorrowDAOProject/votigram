// SceneLoading.test.tsx
import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SceneLoading from "../index";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock useUserContext hook
vi.mock("@/provider/UserProvider", () => ({
  useUserContext: () => ({
    hasUserData: () => false,
    user: {
      isNewUser: true,
    },
  }),
}));

describe("SceneLoading Component", () => {
  const mockSetIsLoading = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders the loading screen correctly with initial progress", () => {
    render(<SceneLoading setIsLoading={mockSetIsLoading} />);

    // Ensure "Get Started!" button is not initially visible
    expect(
      screen.queryByRole("button", { name: "Get Started!" })
    ).toBeInTheDocument();
  });

  it("eventually shows the Get Started button when progress is complete", () => {
    render(<SceneLoading setIsLoading={mockSetIsLoading} />);

    act(() => {
      vi.advanceTimersByTime(10000); // Simulate time passing to complete progress
    });

    expect(
      screen.getByRole("button", { name: "Get Started!" })
    ).toBeInTheDocument();
  });

  it("calls setIsLoading when Get Started is clicked and hasUserData is true", () => {
    // Adjust the mock for this specific test case
    vi.mock("@/provider/UserProvider", () => ({
      useUserContext: () => ({
        hasUserData: () => true, // Ensure hasUserData returns true
        user: {
          isNewUser: true,
        },
      }),
    }));

    render(<SceneLoading setIsLoading={mockSetIsLoading} />);

    act(() => {
      vi.advanceTimersByTime(10000); // Complete the progress
    });

    const button = screen.getByRole("button", { name: "Get Started!" });
    fireEvent.click(button);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });
});
