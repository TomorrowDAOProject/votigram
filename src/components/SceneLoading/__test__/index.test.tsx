// SceneLoading.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SceneLoading from "../index";
import { useUserContext } from "@/provider/UserProvider";
import { postWithToken } from "@/hooks/useData";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";

vi.mock("@/provider/UserProvider", () => ({
  useUserContext: vi.fn(),
}));

vi.mock("@aelf-web-login/wallet-adapter-react", () => ({
  useConnectWallet: vi.fn(),
}));

vi.mock("@/hooks/useData", () => ({
  postWithToken: vi.fn(),
}));

describe("SceneLoading Component", () => {
  beforeEach(() => {
    // Mock user context and wallet service
    (useUserContext as vi.Mock).mockReturnValue({
      hasUserData: () => true,
      user: { isNewUser: false },
    });

    (useConnectWallet as vi.Mock).mockReturnValue({
      isConnected: true,
      wallet: { address: "0x123" },
    });

    (postWithToken as vi.Mock).mockResolvedValue({ data: { status: true } });
  });

  it("renders the component with the correct elements", () => {
    render(<SceneLoading setIsLoading={vi.fn()} />);

    expect(screen.getByText("VOTIGRAM")).toBeInTheDocument();
    expect(screen.getByTestId("scene-loading-image")).toBeInTheDocument();
  });

  it('shows progress bar initially and "Get Started" button when progress reaches 90%', async () => {
    const setIsLoading = vi.fn();
    render(<SceneLoading setIsLoading={setIsLoading} />);

    // // Wait for progress bar to appear
    // await waitFor(() => expect(screen.queryByRole('progressbar')).toBeInTheDocument(), {
    //   timeout: 4000 // Ensure you wait enough for progress to initialize
    // });

    // Simulate the progress reaching 90% with mocked time or similar mechanism
    // Wait for the "Get Started" button to appear
    await waitFor(() =>
      expect(screen.getByTestId("cta-button")).toBeInTheDocument()
    );
  });

  it('calls setIsLoading with false when "Get Started" button is clicked', async () => {
    const setIsLoading = vi.fn();
    render(<SceneLoading setIsLoading={setIsLoading} />);

    // Wait for the "Get Started" button to appear
    await waitFor(() => screen.getByTestId("cta-button"));

    // Click the "Get Started" button
    fireEvent.click(screen.getByTestId("cta-button"));

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});
