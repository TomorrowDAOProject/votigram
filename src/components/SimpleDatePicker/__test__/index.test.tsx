import { render, screen, fireEvent } from "@testing-library/react";
import SimpleDatePicker from "../index";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

describe("SimpleDatePicker", () => {
  it("renders correctly with default value", () => {
    const defaultValue = dayjs("2024-12-20");
    render(<SimpleDatePicker defaultValue={defaultValue} />);

    const dateDisplay = screen.getByText(dayjs(defaultValue).format("DD MMM"));
    expect(dateDisplay).toBeInTheDocument();
  });

  it("shows the current date if no value or defaultValue is provided", () => {
    render(<SimpleDatePicker />);

    const currentDate = dayjs().format("DD MMM");
    const dateDisplay = screen.getByText(currentDate);
    expect(dateDisplay).toBeInTheDocument();
  });

  it("renders the drawer when clicked and closes on confirm", () => {
    render(<SimpleDatePicker />);
  
    const datePickerTrigger = screen.getByRole("button", {
      name: /select date/i,
    });
    fireEvent.click(datePickerTrigger);
  
    const drawer = screen.getByRole("dialog");
    expect(drawer).toBeVisible();
  
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);
  
    // Verify the drawer is visually hidden
    expect(drawer).toHaveStyle("transform: translateY(100%)");
  });
  

  it("renders the drawer when clicked and closes on confirm", () => {
    render(<SimpleDatePicker />);

    const datePickerTrigger = screen.getByRole("button", {
      name: /select date/i,
    });
    fireEvent.click(datePickerTrigger);

    const drawer = screen.getByRole("dialog");
    expect(drawer).toBeVisible();
  });

  it("formats the date correctly for the current year and other years", () => {
    const dateInCurrentYear = dayjs();
    const dateInAnotherYear = dayjs("2023-12-25");

    const { rerender } = render(
      <SimpleDatePicker value={dateInCurrentYear} />
    );
    const currentYearDisplay = screen.getByText(dayjs(dateInCurrentYear).format("DD MMM"));
    expect(currentYearDisplay).toBeInTheDocument();

    rerender(<SimpleDatePicker value={dateInAnotherYear} />);
    const anotherYearDisplay = screen.getByText(dayjs(dateInAnotherYear).format("DD MMM YYYY"));
    expect(anotherYearDisplay).toBeInTheDocument();
  });
});
