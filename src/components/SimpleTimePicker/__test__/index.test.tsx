// SimpleTimePicker.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SimpleTimePicker from '../index'; // Adjust path as needed
import { describe, it, expect, vi } from 'vitest';

describe('SimpleTimePicker Component', () => {
  it('renders correctly when visible', () => {
    render(<SimpleTimePicker isVisible={true} />);
    
    expect(screen.getByTestId('hours-picker')).toBeVisible();
    expect(screen.getByTestId('minute-picker')).toBeVisible();
    expect(screen.getByTestId('period-picker')).toBeVisible();
  });

  it('does not render when not visible', () => {
    render(<SimpleTimePicker isVisible={false} />);
    
    expect(screen.queryByTestId('hours-picker')).toBeNull();
    expect(screen.queryByTestId('minute-picker')).toBeNull();
    expect(screen.queryByTestId('period-picker')).toBeNull();
  });

  it('calls onChange with formatted time on confirm', async () => {
    const mockOnChange = vi.fn();
    render(<SimpleTimePicker isVisible={true} onChange={mockOnChange} />);
    
    const user = userEvent.setup();

    // Use userEvent to change the pickers
    await user.click(screen.getByTestId('hour-3'));
    await user.click(screen.getByTestId('minute-15'));
    await user.click(screen.getByTestId('period-AM'));

    // Confirm selection
    await user.click(screen.getByText('Confirm'));

    expect(mockOnChange).toHaveBeenCalledWith('03:15');
  });

  it('correctly formats 12-hour period to 24-hour time', async () => {
    const mockOnChange = vi.fn();
    render(<SimpleTimePicker isVisible={true} onChange={mockOnChange} />);
    
    const user = userEvent.setup();

    // Select 12 PM
    await user.click(screen.getByTestId('hour-12'));
    await user.click(screen.getByTestId('minute-30'));
    await user.click(screen.getByTestId('period-PM'));

    // Confirm selection
    await user.click(screen.getByText('Confirm'));

    expect(mockOnChange).toHaveBeenCalledWith('12:30');
  });

  it('correctly handles midnight (12 AM)', async () => {
    const mockOnChange = vi.fn();
    render(<SimpleTimePicker isVisible={true} onChange={mockOnChange} />);
    
    const user = userEvent.setup();

    // Select 12 AM
    await user.click(screen.getByTestId('hour-12'));
    await user.click(screen.getByTestId('minute-00'));
    await user.click(screen.getByTestId('period-AM'));

    // Confirm selection
    await user.click(screen.getByText('Confirm'));

    expect(mockOnChange).toHaveBeenCalledWith('00:00');
  });
});