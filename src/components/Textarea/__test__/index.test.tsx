// Textarea.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../index';

describe('Textarea Component', () => {
  it('renders with placeholder text', () => {
    render(<Textarea value="" onChange={() => {}} placeholder="Type here..." />);
    const textarea = screen.getByPlaceholderText('Type here...');
    expect(textarea).toBeInTheDocument();
  });

  it('updates character count and calls onChange on input', () => {
    const handleChange = vi.fn();
    render(<Textarea value="" onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    
    expect(handleChange).toHaveBeenCalledWith('Hello');
    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  it('respects maxLength, applies truncation properly, and displays warning when maxed out', () => {
    const maxLength = 10;
    const handleChange = vi.fn();
    render(<Textarea value="" onChange={handleChange} maxLength={maxLength} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'This is a long text' } });
    
    // Expect truncated value
    expect(handleChange).toHaveBeenCalledWith('This is a ');
    expect(textarea).toHaveValue('This is a ');
    
    const charCountElement = screen.getByText(`${maxLength}/${maxLength}`);
    expect(charCountElement).toBeInTheDocument();
    expect(charCountElement).toHaveClass('text-danger');
  });

  it('auto-resizes when input changes', () => {
    render(<Textarea value="Short" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');

    const initialHeight = textarea.style.height;
    fireEvent.change(textarea, { target: { value: 'This is a text with more content that should expand the textarea.' } });

    expect(textarea.style.height).not.toBe(initialHeight);
  });
});