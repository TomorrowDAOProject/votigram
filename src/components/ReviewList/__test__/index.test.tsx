// List.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import List, { ListItem } from '../index';

// Mock Item component
vi.mock('./components/Item', () => ({
  default: ({ data, className }: { data: ListItem; className?: string }) => (
    <div className={className}>
      {data.title}
    </div>
  ),
}));

describe('List Component', () => {
  it('displays empty state message when there are no items', () => {
    render(<List hasMore={false} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('calls loadData on mount', () => {
    const loadData = vi.fn();
    render(<List hasMore={true} loadData={loadData} />);
    expect(loadData).toHaveBeenCalled();
  });

  it('renders items when loadData adds them', () => {
    const loadData = (setItems: React.Dispatch<React.SetStateAction<ListItem[]>>) => {
      setItems([
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
      ]);
    };

    render(<List hasMore={false} loadData={loadData} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('shows "No more data" message when there are items but no more items to load', () => {
    const loadData = (setItems: React.Dispatch<React.SetStateAction<ListItem[]>>) => {
      setItems([{ id: 1, title: 'Item 1' }]);
    };

    render(<List hasMore={false} loadData={loadData} noMoreText="No more data" />);
    
    // Check that the no more data message appears
    expect(screen.getByText(/no more data/i)).toBeInTheDocument();
  });

  it('triggers loadData when scrolled to the bottom if there are more items to load', () => {
    const loadData = vi.fn((setItems, currentItems = []) => {
      setItems([...currentItems, { id: currentItems.length + 1, title: `Item ${currentItems.length + 1}` }]);
    });

    render(<List hasMore={true} loadData={loadData} />);
    const list = screen.getByRole('list'); // Ensure List component itself or its container has role="list"

    if (list) {
      // Forcing content height to be scrollable
      Object.defineProperty(list, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(list, 'clientHeight', { value: 500, writable: true });
      Object.defineProperty(list, 'scrollTop', { value: 0, writable: true });

      // Simulate scroll event
      fireEvent.scroll(list, { target: { scrollTop: 500 } });

      expect(loadData).toHaveBeenCalledTimes(2);
    } else {
      throw new Error("The list container was not found or does not have a suitable role.");
    }
  });
});