// SimpleDatePicker.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import SimpleDatePicker from '../index';

// Mocking Drawer and DayPicker because they have external dependencies
vi.mock('../Drawer', () => ({
  default: ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => (
    <div>{isVisible ? children : null}</div>
  ),
}));

vi.mock('react-day-picker', () => ({
  DayPicker: ({ onSelect }: { onSelect: (date: Date) => void }) => (
    <div>
      <button onClick={() => onSelect(new Date('2023-10-01'))}>Select October 1st, 2023</button>
    </div>
  ),
}));

describe('SimpleDatePicker Component', () => {
  it('renders the DatePicker when visible', () => {
    render(<SimpleDatePicker isVisible={true} />);
    
    // Check if the confirm button is rendered when visible
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('does not render DatePicker when not visible', () => {
    render(<SimpleDatePicker isVisible={false} />);
    
    // Confirm button should not be present because the DatePicker is hidden
    expect(screen.queryByRole('button', { name: /confirm/i })).not.toBeInTheDocument();
  });

  it('calls onChange with formatted date when confirm is clicked', () => {
    const handleChange = vi.fn();

    render(<SimpleDatePicker isVisible={true} onChange={handleChange} />);

    // Simulate date selection
    fireEvent.click(screen.getByText('Select October 1st, 2023'));

    // Simulate confirm button click
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    expect(handleChange).toHaveBeenCalledWith('2023-10-01');
  });
});