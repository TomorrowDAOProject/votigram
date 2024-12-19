import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BackBtn from '../index';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('BackBtn Component', () => {
  it('should render the back button with correct classes and icon', () => {
    render(<BackBtn />);

    // Check button element
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-transparent p-0 m-0 w-[24px] h-[24px] leading-[24px] focus:outline-none'
    );

    // Check icon inside the button
    const icon = button.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('votigram-icon-back text-[24px] text-white');
  });

  it('should call navigate with -1 when button is clicked', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);

    render(<BackBtn />);

    // Simulate button click
    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Assert navigate is called with -1
    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
