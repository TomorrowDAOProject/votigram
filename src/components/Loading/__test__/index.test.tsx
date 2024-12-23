// Loading.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Loading from '../index';

describe('Loading Component', () => {
  it('renders the loading spinner', () => {
    render(<Loading />);
    
    // Use getByTestId to find the spinner
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('flex justify-center items-center bg-black/40');
  });

  it('applies custom className', () => {
    render(<Loading className="custom-class" />);
    
    // Check if the custom class is applied
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toHaveClass('custom-class');
  });
});