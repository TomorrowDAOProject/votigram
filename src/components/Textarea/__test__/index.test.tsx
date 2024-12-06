// Textarea.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../index';

describe('Textarea Component', () => {
  it('renders correctly with placeholder text', () => {
    render(<Textarea placeholder="Type here..." />);
    const textarea = screen.getByPlaceholderText('Type here...');
    expect(textarea).toBeInTheDocument();
  });

  it('updates text and character count on input', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(textarea).toHaveValue('Hello');
    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  it('does not allow input beyond maxLength', () => {
    render(<Textarea maxLength={10} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'This is a long text' } });

    // Even though we input a long text, it should be trimmed to the maxLength
    expect(textarea).toHaveValue('This is a ');
    expect(screen.getByText('10/10')).toBeInTheDocument();
  });

  it('calls onSubmit with text when submit button is clicked', () => {
    const handleSubmit = vi.fn();
    render(<Textarea onSubmit={handleSubmit} />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'Submit me' } });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith('Submit me');
  });

  it('disables submit button when text is empty', () => {
    render(<Textarea />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('enables submit button when there is text', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'Text' } });

    expect(button).not.toBeDisabled();
  });
});