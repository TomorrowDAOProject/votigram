// CheckboxGroup.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxGroup, { ICheckboxOption } from "../index"; // Adjust to your actual path
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { APP_CATEGORY } from "@/constants/discover";

// 测试用的 options 数组
const options: ICheckboxOption[] = [
  {
    value: APP_CATEGORY.NEW,
    label: "💰 New",
  },
  {
    value: APP_CATEGORY.GAME,
    label: "🎮 Game",
  },
  {
    value: APP_CATEGORY.EARN,
    label: "💰 Earn",
  },
];

describe("CheckboxGroup Component", () => {
  it("renders all checkbox options", () => {
    render(<CheckboxGroup options={options} onChange={() => {}} />);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("toggles checkbox option selection state on click", () => {
    render(<CheckboxGroup options={options} onChange={() => {}} />);

    const firstOption = screen.getByText(options[0].label).parentElement;

    // Ensure initial state is not selected
    expect(firstOption).not.toHaveClass("border-secondary");

    // Click to select
    fireEvent.click(firstOption!);
    expect(firstOption).toHaveClass("border-secondary");

    // Click again to deselect
    fireEvent.click(firstOption!);
    expect(firstOption).not.toHaveClass("border-secondary");
  });

  it("calls onChange with correct values", () => {
    const handleChange = vi.fn();

    render(<CheckboxGroup options={options} onChange={handleChange} />);

    const firstOption = screen.getByText(options[0].label);
    const secondOption = screen.getByText(options[1].label);

    // Select first option
    fireEvent.click(firstOption);
    expect(handleChange).toHaveBeenCalledWith([APP_CATEGORY.NEW]);

    // Select second option
    fireEvent.click(secondOption);
    expect(handleChange).toHaveBeenCalledWith([
      APP_CATEGORY.NEW,
      APP_CATEGORY.GAME,
    ]);

    // Deselect first option
    fireEvent.click(firstOption);
    expect(handleChange).toHaveBeenCalledWith([APP_CATEGORY.GAME]);
  });
});
