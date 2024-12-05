import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Navigation from "../index";
import { TAB_LIST } from "@/constants/navigation";

describe("Navigation Component", () => {
  const setup = (activeTab = TAB_LIST.HOME) => {
    const onMenuClick = vi.fn();
    render(<Navigation activeTab={activeTab} onMenuClick={onMenuClick} />);
    return onMenuClick;
  };

  it("renders the navigation component correctly", () => {
    setup();

    const homeIcon = screen.getByTestId("votigram-icon-navbar-home");
    const discoverIcon = screen.getByTestId("votigram-icon-navbar-for-you");
    const heartIcon = screen.getByTestId("votigram-icon-navbar-vote");
    const penIcon = screen.getByTestId("votigram-icon-navbar-task-profile");

    expect(homeIcon).toBeInTheDocument();
    expect(discoverIcon).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument();
    expect(penIcon).toBeInTheDocument();
  });

  it("positions the active tab indicator correctly", () => {
    setup(TAB_LIST.DISCOVER); // Assume DISCOVER is active
    const indicator = screen.getByRole("presentation"); // Use a role that fits design

    expect(indicator).toHaveStyle("transform: translateX(70px)"); // DISCOVER should translate once
  });

  it("calls onMenuClick with the correct tab when a tab is clicked", () => {
    const onMenuClick = setup();

    const homeTab = screen.getByTestId("home-tab");
    fireEvent.click(homeTab);
    expect(onMenuClick).toHaveBeenCalledWith(TAB_LIST.HOME);

    const discoverTab = screen.getByTestId("discover-tab");
    fireEvent.click(discoverTab);
    expect(onMenuClick).toHaveBeenCalledWith(TAB_LIST.DISCOVER);

    const heartTab = screen.getByTestId("heart-tab");
    fireEvent.click(heartTab);
    expect(onMenuClick).toHaveBeenCalledWith(TAB_LIST.HEART);

    const penTab = screen.getByTestId("pen-tab");
    fireEvent.click(penTab);
    expect(onMenuClick).toHaveBeenCalledWith(TAB_LIST.PEN);
  });
});
