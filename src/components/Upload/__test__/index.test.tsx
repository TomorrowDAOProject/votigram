/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import Upload from '../index';
import * as canvasUtils from '@/utils/canvasUtils';
import * as useData from '@/hooks/useData';

// Mock utilities or hooks, similar to previous examples
vi.mock('@/utils/canvasUtils', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    getCroppedImg: vi.fn(),
  };
});

vi.mock('@/hooks/useData', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    uploadWithToken: vi.fn().mockResolvedValue({
      code: "20000",
      data: "http://example.com/someuploadedimage.png"
    }),
  };
});

describe('Upload Component', () => {
  beforeEach(() => {
    (canvasUtils.getCroppedImg as vi.Mock).mockResolvedValue(new Blob(['cropped'], { type: 'image/png' }));
  });

  it('should handle file upload without cropping', async () => {
    const mockOnFinish = vi.fn();
    render(<Upload needCrop={false} onFinish={mockOnFinish} />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Select the file input and simulate file selection
    const fileInput = screen.getByTestId('upload-btn');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for the uploadWithToken function to be called
    await waitFor(() => {
      expect(useData.uploadWithToken).toHaveBeenCalledTimes(1);
    });

    // Wait for the onFinish callback to be invoked
    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledWith("http://example.com/someuploadedimage.png");
    });
  });

  it('should handle file upload with cropping', async () => {
    render(<Upload needCrop={true} aspect={4 / 3} />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const fileInput = screen.getByTestId('upload-btn');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    // Simulate confirm button click
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(canvasUtils.getCroppedImg).toHaveBeenCalledTimes(0);
      expect(useData.uploadWithToken).toHaveBeenCalledTimes(1);
    });
  });
});