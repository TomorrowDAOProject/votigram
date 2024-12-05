// DiscoveryHiddenGems.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiscoveryHiddenGems from "../index";
import { describe, it, expect, vi } from "vitest";

// Mocking AppItem
vi.mock("../../AppItem", () => ({
  default: () => <div data-testid="app-item-mock" />,
}));

describe("DiscoveryHiddenGems Component", () => {
  it("renders the component with the correct text", () => {
    render(<DiscoveryHiddenGems />);
    expect(screen.getByText("Discover Hidden Gems!")).toBeInTheDocument();
  });

  it("renders the AppItem component", () => {
    render(<DiscoveryHiddenGems />);
    expect(screen.getByTestId("app-item-mock")).toBeInTheDocument();
  });
});
