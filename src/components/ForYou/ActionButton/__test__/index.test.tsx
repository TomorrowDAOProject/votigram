// ActionButton.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionButton from "../index";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocking the Telegram WebApp interface
const mockNotificationOccurred = vi.fn();
beforeEach(() => {
  global.window.Telegram = {
    WebApp: {
      HapticFeedback: {
        notificationOccurred: mockNotificationOccurred,
        impactOccurred: vi.fn(),
        selectionChanged: vi.fn(),
      },
    },
  } as unknown as TelegramWebApp;
});

describe("ActionButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mock usage data before each test
  });

  it("renders all buttons correctly", () => {
    render(<ActionButton />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("triggers haptic feedback on like button click", () => {
    render(<ActionButton />);
    const likeButton = screen.getAllByRole("button")[0]; // Assuming the first button is the like button
    fireEvent.click(likeButton);

    // Check if the notificationOccurred function was called with "success"
    expect(mockNotificationOccurred).toHaveBeenCalledWith("success");
  });
});
