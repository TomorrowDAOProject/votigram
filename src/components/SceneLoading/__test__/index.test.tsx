import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import SceneLoading from "../index";

describe("SceneLoading Component", () => {
  it("renders the VOTIGRAM title", () => {
    render(<SceneLoading />);
    const titleElement = screen.getByText(/VOTIGRAM/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the image", () => {
    render(<SceneLoading />);
    const imageElement = screen.getByTestId("scene-loading-image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://cdn.tmrwdao.com/votigram/assets/imgs/18B98C6FFC90.webp"
    );
  });

  it("renders the slogan", () => {
    render(<SceneLoading />);
    const sloganElement = screen.getByText((_, element) => {
      const hasText = (node: Element) =>
        node.textContent === "YOUR VOTE,YOUR CHOICE";
      const nodeHasText = element ? hasText(element) : false;
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });
    expect(sloganElement).toBeInTheDocument();
  });

  it("renders the progress bar", () => {
    render(<SceneLoading />);
    const progressBarContainer = screen.getByRole("progressbar");
    expect(progressBarContainer).toBeInTheDocument();
  });
});
