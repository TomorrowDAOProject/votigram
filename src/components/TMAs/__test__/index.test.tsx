// TMAs.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import TMAs from '../index';

// Mock your components
vi.mock('../ToggleSlider', () => ({
  default: ({ items, onChange }: { items: string[]; onChange: (index: number) => void }) => (
    <div>
      {items.map((item: string, index: number) => (
        <button key={item} onClick={() => onChange(index)}>
          {item}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('./components/Accumulative', () => ({
  default: ({ keyward, category }: { keyward: string; category: string }) => (
    <div data-testid="accumulative">{`Accumulative: ${keyward}, Category: ${category}`}</div>
  ),
}));

vi.mock('./components/Current', () => ({
  default: ({ keyward, category }: { keyward: string; category: string }) => (
    <div data-testid="current">{`Current: ${keyward}, Category: ${category}`}</div>
  ),
}));

vi.mock('../CategoryPillList', () => ({
  default: ({ onChange }: { onChange: (category: string) => void }) => (
    <div>
      <button onClick={() => onChange('Category1')}>Category1</button>
      <button onClick={() => onChange('Category2')}>Category2</button>
    </div>
  ),
}));

describe('TMAs Component', () => {
  it('renders all components correctly', () => {
    render(<TMAs scrollTop={0} />);

    expect(screen.getByText('Accumulative')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Category1')).toBeInTheDocument();
    expect(screen.getByTestId('accumulative')).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<TMAs scrollTop={0} />);

    // Initially should render Accumulative
    expect(screen.getByTestId('accumulative')).toBeInTheDocument();
    
    // Switch to Current
    fireEvent.click(screen.getByText('Current'));
    expect(screen.queryByTestId('accumulative')).not.toBeInTheDocument();
    expect(screen.getByTestId('current')).toBeInTheDocument();

    // Switch back to Accumulative
    fireEvent.click(screen.getByText('Accumulative'));
    expect(screen.getByTestId('accumulative')).toBeInTheDocument();
    expect(screen.queryByTestId('current')).not.toBeInTheDocument();
  });

  it('updates search keyword correctly', () => {
    render(<TMAs scrollTop={0} />);
    const input = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(screen.getByTestId('accumulative')).toHaveTextContent('Accumulative: hello, Category: ');
  });

  it('updates category correctly', () => {
    render(<TMAs scrollTop={0} />);

    fireEvent.click(screen.getByText('Category1'));
    expect(screen.getByTestId('accumulative')).toHaveTextContent('Category: Category1');
  });
});