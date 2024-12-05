import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import AppItem from "../index";

describe("AppItem Component", () => {
  it("renders with default props correctly", () => {
    render(<AppItem />);

    // Check that the image is rendered
    const imageElement = screen.getByTestId("app-item-icon");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg"
    );

    // Check that the title and description are rendered
    expect(screen.getByText("Capybare")).toBeInTheDocument();
    expect(
      screen.getByText(/A one\/2 liner sentence about the game\./i)
    ).toBeInTheDocument();

    // Check that the arrow is not rendered
    const arrowIcon = screen.queryByTestId("arrow-icon");
    expect(arrowIcon).not.toBeInTheDocument();
  });

  it("renders the arrow icon when showArrow is true", () => {
    render(<AppItem showArrow />);

    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toBeInTheDocument();
  });
});
